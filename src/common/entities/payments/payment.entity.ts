import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { schema } from '@/common/consts/index.const';

export const subscriptions = sqliteTable('subscriptions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id')
    .notNull()
    .references(() => schema.users.uid, { onDelete: 'no action' }),
  stripeSubscriptionId: text('stripe_subscription_id').unique().notNull(),
  stripePriceId: text('stripe_price_id').notNull(),
  stripeProductId: text('stripe_product_id').notNull(),
  status: text('status').notNull(),
  currentPeriodStart: text('current_period_start').notNull(),
  currentPeriodEnd: text('current_period_end').notNull(),
  trialStart: text('trial_start'),
  trialEnd: text('trial_end'),
  cancelAtPeriodEnd: integer('cancel_at_period_end', {
    mode: 'boolean',
  }).default(false),
  canceledAt: text('canceled_at'),
  endedAt: text('ended_at'),
  quantity: text('quantity').default('1'),
  currency: text('currency').notNull(),
  unitAmount: text('unit_amount'),
  billingCycleAnchor: text('billing_cycle_anchor').notNull(),
  collectionMethod: text('collection_method').notNull(),
  isLatest: integer('is_latest', { mode: 'boolean' }).default(false),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  metadata: text('metadata', { mode: 'json' }),
});

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(schema.users, {
    fields: [subscriptions.userId],
    references: [schema.users.uid],
  }),
}));

export type InsertSubscriptions = typeof subscriptions.$inferInsert;
export type SelectSubscriptions = typeof subscriptions.$inferSelect;
