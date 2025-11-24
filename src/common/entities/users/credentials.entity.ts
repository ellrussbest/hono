import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

import { schema } from '@/common/consts/index.const';

export const credentials = sqliteTable(
  'credentials',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    broker: text('broker').notNull(),
    key: text('key').notNull(),
    secret: text('secret').notNull(),
    accountID: text('account_id'),
    emailVerified: integer('email_verified', { mode: 'boolean' }).default(
      false,
    ),
    emailVerifiedAt: text('email_verified_at'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    data: text('data', { mode: 'json' }),
    userId: text('user_id')
      .notNull()
      .references(() => schema.users.uid, { onDelete: 'cascade' }),
  },
  (table) => [unique('user_id_broker').on(table.userId, table.broker)],
);

export const credentialRelations = relations(credentials, ({ one }) => ({
  user: one(schema.users, {
    fields: [credentials.userId],
    references: [schema.users.uid],
  }),
}));

export type InsertCredentials = typeof credentials.$inferInsert;
export type SelectCredentials = typeof credentials.$inferSelect;
