import { type SQLiteDatabase } from 'expo-sqlite';
import { getTableCreationQueries } from './schema';

export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  try {
    const queries = getTableCreationQueries();
    
    // Execute all table creation statements synchronously before app renders
    queries.forEach((query: string) => {
      db.execSync(query);
    });
    
    console.log('Database schema checked/initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database schema:', error);
  }
};
