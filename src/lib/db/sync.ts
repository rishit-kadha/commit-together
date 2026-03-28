import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const syncQueue = sqliteTable('sync_queue', {
  id: text('id').primaryKey(),
  tableName: text('table_name').notNull(),
  operation: text('operation').notNull(), // 'INSERT', 'UPDATE', 'DELETE'
  recordId: text('record_id').notNull(), // The ID of the record in its original table
  payload: text('payload'), // JSON serialized data representation
  retryCount: integer('retry_count').default(0).notNull(), // To implement exponential backoff
  lastAttemptedAt: integer('last_attempted_at', { mode: 'timestamp' }),
  status: text('status').default('PENDING').notNull(), // 'PENDING' or 'FAILED'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
