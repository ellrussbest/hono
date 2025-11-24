import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const popularAssets = sqliteTable('popular_assets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  symbol: text('symbol').notNull(),
  region: text('region'),
  data: text('data'),
});

export type InsertPopularAssets = typeof popularAssets.$inferInsert;
export type SelectPopularAssets = typeof popularAssets.$inferSelect;
