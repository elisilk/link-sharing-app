import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { profile } from "./profile";

export const profilePicture = sqliteTable("profilePicture", {
  id: int().primaryKey({ autoIncrement: true }),
  key: text().notNull(),
  profileId: int().notNull().references(() => profile.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});
