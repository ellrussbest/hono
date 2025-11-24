import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { schema } from '@/common/consts/index.const';

export const emergencyContact = sqliteTable('emergency_contact', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phoneNumber: text('phone_number').notNull(),
  isDeleted: integer('is_deleted', { mode: 'boolean' }).notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => schema.users.uid),
});

export type InsertEmergencyContact = typeof emergencyContact.$inferInsert;
export type SelectEmergencyContact = typeof emergencyContact.$inferSelect;
