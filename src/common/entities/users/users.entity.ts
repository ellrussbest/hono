import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { schema } from '@/common/consts/index.const';

export interface UserAuthData {
  provider: string;
  refreshToken: string;
  token?: string;
  type: string;
}

export const users = sqliteTable('firebase_user', {
  uid: text('uid').primaryKey().notNull(),
  email: text('email').unique().notNull(),
  name: text('name'),
  stripeCustomerId: text('stripe_customer_id'),
  fcmToken: text('fcm_token'),
  emailVerified: integer('email_verified', { mode: 'boolean' }).default(false),
  emailVerifiedAt: text('email_verified_at'),
  auth: text('auth', { mode: 'json' }).$type<UserAuthData>(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const userRelations = relations(users, ({ many }) => ({
  credentials: many(schema.credentials),
  subscriptions: many(schema.subscriptions),
  otps: many(schema.otps),
}));

export type InsertUsers = typeof users.$inferInsert;
export type SelectUsers = typeof users.$inferSelect;
