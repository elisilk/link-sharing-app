import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { profile } from "./profile";

export const profileLink = sqliteTable("profileLink", {
  id: int().primaryKey({ autoIncrement: true }),
  platform: text().notNull(),
  url: text().notNull(),
  order: int().notNull(),
  profileId: int().notNull().references(() => profile.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});
