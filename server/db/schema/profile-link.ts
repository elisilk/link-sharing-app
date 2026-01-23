import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";

export const profileLink = sqliteTable("profileLink", {
  id: int().primaryKey({ autoIncrement: true }),
  platform: text().notNull(),
  url: text().notNull(),
  order: int().notNull(),
  userId: int().notNull().references(() => user.id, { onDelete: "cascade" }),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});
