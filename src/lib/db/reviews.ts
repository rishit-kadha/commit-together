import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const weeklyReviews = sqliteTable('weekly_reviews', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  weekStartDate: text('week_start_date').notNull(), // ISO YYYY-MM-DD
  score: integer('score'), // Subjective rating 1-10
  reflectionNotes: text('reflection_notes'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});
