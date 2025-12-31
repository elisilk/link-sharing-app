import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const profile = sqliteTable("profile", {
  id: int().primaryKey({ autoIncrement: true }),
  email: text().unique(),
  firstName: text(),
  lastName: text(),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});
