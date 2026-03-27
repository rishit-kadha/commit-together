import { SQLiteDatabase } from 'expo-sqlite';
import { getFirestore, collection, query, where, getDocs, writeBatch, doc } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LAST_SYNC_PUSH = 'commit_together_last_sync_push';
const LAST_SYNC_PULL = 'commit_together_last_sync_pull';

async function pullTable(sqlite: SQLiteDatabase, tableName: string, userUid: string, lastPull: number) {
  try {
    const db = getFirestore();
    
    // Updated to Firebase v22 Modular API
    const q = query(
      collection(db, tableName),
      where('updated_at', '>', lastPull)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) return;

    await sqlite.withTransactionAsync(async () => {
      for (const document of snapshot.docs) {
        const data = document.data();
        
        if (data.user_id && data.user_id !== userUid) continue;

        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        const values = Object.values(data);
        
        await sqlite.runAsync(
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

async function pushTable(sqlite: SQLiteDatabase, tableName: string, lastPush: number) {
  try {
    const rows: any[] = await sqlite.getAllAsync(
      `SELECT * FROM ${tableName} WHERE updated_at > ?`,
      [lastPush]
    );

    if (rows.length === 0) return;

    const db = getFirestore();
    const batch = writeBatch(db);
    
    for (const row of rows) {
      if (!row.id) continue;
      
      // Updated to Firebase v22 Modular API
      const docRef = doc(db, tableName, row.id);
      batch.set(docRef, row, { merge: true });
    }

    await batch.commit();
    console.log(`[SyncEngine] Pushed ${rows.length} local changes from ${tableName} to Firebase.`);
  } catch (err) {
    console.error(`[SyncEngine] Failed pushing ${tableName}:`, err);
  }
}

export const syncWithFirestore = async (sqlite: SQLiteDatabase | null, userUid: string | undefined | null) => {
  if (!sqlite || !userUid) return;

  try {
    const lastPullStr = await AsyncStorage.getItem(LAST_SYNC_PULL);
    const lastPushStr = await AsyncStorage.getItem(LAST_SYNC_PUSH);
    
    const lastPull = lastPullStr ? parseInt(lastPullStr, 10) : 0; 
    const lastPush = lastPushStr ? parseInt(lastPushStr, 10) : 0;
    
    const syncStartTime = Date.now();

    console.log(`[SyncEngine] Beginning Sync Cycle... -> User: ${userUid}`);

    await pullTable(sqlite, 'habits', userUid, lastPull);
    await pullTable(sqlite, 'habit_logs', userUid, lastPull);
    
    await pushTable(sqlite, 'habits', lastPush);
    await pushTable(sqlite, 'habit_logs', lastPush);
    
    await AsyncStorage.setItem(LAST_SYNC_PULL, syncStartTime.toString());
    await AsyncStorage.setItem(LAST_SYNC_PUSH, syncStartTime.toString());

    console.log(`[SyncEngine] Finished Sync Cycle Successfully.`);
  } catch (error) {
    console.error('[SyncEngine] Critical Sync Failure:', error);
  }
};
