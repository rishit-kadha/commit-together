import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';

export const groups = sqliteTable('groups', {
  id: text('id').primaryKey(), // Firebase string ID
  name: text('name').notNull(),
  description: text('description'),
  ownerId: text('owner_id').notNull(),
  imageUrl: text('image_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const groupMembers = sqliteTable('group_members', {
  groupId: text('group_id').notNull(),
  userId: text('user_id').notNull(),
  role: text('role').notNull().default('member'), // E.g., 'admin' or 'member'
  joinedAt: integer('joined_at', { mode: 'timestamp' }).notNull(),
}, (table) => {
  return [
    primaryKey({ columns: [table.groupId, table.userId] })
  ];
});

export const groupActivity = sqliteTable('group_activity', {
  id: text('id').primaryKey(),
  groupId: text('group_id').notNull(),
  userId: text('user_id').notNull(),
  userName: text('user_name').notNull(), // Denormalised for easier feed rendering without joins
  habitId: text('habit_id').notNull(),
  habitName: text('habit_name').notNull(), // Denormalised 
  actionType: text('action_type').notNull(), // E.g., 'completed'
  timestamp: integer('timestamp', { mode: 'timestamp' }).notNull(),
});
