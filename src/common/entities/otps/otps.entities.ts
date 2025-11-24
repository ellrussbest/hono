import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { schema } from '@/common/consts/index.const';

export const otps = sqliteTable('user_otp', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  code: text('code').notNull(),
  email: text('email').notNull(),
  verified: integer('verified', { mode: 'boolean' }).default(false),
  used: integer('used', { mode: 'boolean' }).default(false),
  expiresAt: text('expires_at').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
  userId: text('user_id')
    .notNull()
    .references(() => schema.users.uid, { onDelete: 'cascade' }),
});

export const otpsRelations = relations(otps, ({ one }) => ({
  user: one(schema.users, {
    fields: [otps.userId],
    references: [schema.users.uid],
  }),
}));

export type InsertOtp = typeof otps.$inferInsert;
export type SelectOtp = typeof otps.$inferSelect;
