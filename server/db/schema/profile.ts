import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";

export const profile = sqliteTable("profile", {
  id: int().primaryKey({ autoIncrement: true }),
  email: text().unique(),
  firstName: text(),
  lastName: text(),
  picture: text(),
  userId: int().notNull().references(() => user.id, { onDelete: "cascade" }),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});
