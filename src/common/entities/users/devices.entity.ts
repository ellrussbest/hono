import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { schema } from '@/common/consts/index.const';

export const devices = sqliteTable('devices', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  deviceId: text('device_id').notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).notNull(),
  deviceName: text('device_name').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => schema.users.uid),
});

export type InsertDevices = typeof devices.$inferInsert;
export type SelectDevices = typeof devices.$inferSelect;
