import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const habits = sqliteTable('habits', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  frequency: text('frequency').notNull(), // e.g., 'daily', 'weekly'
  color: text('color'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }), // Sync soft deletes
});

export const completions = sqliteTable('completions', {
  id: text('id').primaryKey(),
  habitId: text('habit_id').notNull(),
  date: text('date').notNull(), // ISO YYYY-MM-DD
  value: integer('value'), // For quantifiable habits like 'Read 20 pages'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
