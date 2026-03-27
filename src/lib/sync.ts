import { SQLiteDatabase } from 'expo-sqlite';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LAST_SYNC_PUSH = 'commit_together_last_sync_push';
const LAST_SYNC_PULL = 'commit_together_last_sync_pull';

// Helper to pull generic tables matching the user
async function pullTable(db: SQLiteDatabase, tableName: string, userUid: string, lastPull: number) {
  try {
    const snapshot = await firestore()
      .collection(tableName)
      // Only get documents modified since our last pull
      .where('updated_at', '>', lastPull)
      // Note: Group tables might not have user_id natively indexed in the root, but for v1 habits/logs do
      .get();

    if (snapshot.empty) return;

    // Use a transaction for fast local inserts
    await db.withTransactionAsync(async () => {
      for (const doc of snapshot.docs) {
        const data = doc.data();
        
        // Ensure data strictly applies to this user (for generic tables)
        if (data.user_id && data.user_id !== userUid) continue;

        // Basic SQLite Upsert using REPLACE INTO
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        const values = Object.values(data);
        
        // We include 'id' inside data automatically because we set it when pushing
        await db.runAsync(
          `INSERT OR REPLACE INTO ${tableName} (${columns}) VALUES (${placeholders})`,
          values
        );
      }
    });

    console.log(`[SyncEngine] Pulled ${snapshot.size} remote changes for ${tableName} into local SQLite.`);
  } catch (err) {
    console.error(`[SyncEngine] Failed pulling ${tableName}:`, err);
  }
}

// Helper to push generic local tables to Firestore
async function pushTable(db: SQLiteDatabase, tableName: string, lastPush: number) {
  try {
    const rows: any[] = await db.getAllAsync(
      `SELECT * FROM ${tableName} WHERE updated_at > ?`,
      [lastPush]
    );

    if (rows.length === 0) return;

    // Batch write to Firestore for network efficiency
    const batch = firestore().batch();
    
    for (const row of rows) {
      if (!row.id) continue;
      
      const docRef = firestore().collection(tableName).doc(row.id);
      batch.set(docRef, row, { merge: true }); // Merge correctly overwrites primitive fields
    }

    await batch.commit();
    console.log(`[SyncEngine] Pushed ${rows.length} local changes from ${tableName} to Firebase.`);
  } catch (err) {
    console.error(`[SyncEngine] Failed pushing ${tableName}:`, err);
  }
}

export const syncWithFirestore = async (db: SQLiteDatabase | null, userUid: string | undefined | null) => {
  if (!db || !userUid) return;

  try {
    // 1. Recover Timestamp Progress
    const lastPullStr = await AsyncStorage.getItem(LAST_SYNC_PULL);
    const lastPushStr = await AsyncStorage.getItem(LAST_SYNC_PUSH);
    
    // We default to 0 to pull their entire history down upon fresh login
    const lastPull = lastPullStr ? parseInt(lastPullStr, 10) : 0; 
    const lastPush = lastPushStr ? parseInt(lastPushStr, 10) : 0;
    
    const syncStartTime = Date.now();

    console.log(`[SyncEngine] Beginning Sync Cycle... -> User: ${userUid}`);

    // ===========================
    // 2. PULL: Firebase -> SQLite
    // ===========================
    // We prioritize PULL first so we merge external changes before pushing our own
    await pullTable(db, 'habits', userUid, lastPull);
    await pullTable(db, 'habit_logs', userUid, lastPull);
    
    // ===========================
    // 3. PUSH: SQLite -> Firebase
    // ===========================
    await pushTable(db, 'habits', lastPush);
    await pushTable(db, 'habit_logs', lastPush);
    
    // Note: We leave Groups & GroupMembers off this automated sync, as pub-sub fetching is preferred for Group dynamics.

    // 4. Record new sync epoch timestamps
    await AsyncStorage.setItem(LAST_SYNC_PULL, syncStartTime.toString());
    await AsyncStorage.setItem(LAST_SYNC_PUSH, syncStartTime.toString());

    console.log(`[SyncEngine] Finished Sync Cycle Successfully.`);
  } catch (error) {
    console.error('[SyncEngine] Critical Sync Failure:', error);
  }
};
