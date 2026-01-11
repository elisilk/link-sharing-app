import { relations } from "drizzle-orm";

import { profile } from "./profile";
import { profileLink } from "./profile-link";

export * from "./auth";
export * from "./profile";
export * from "./profile-link";
export * from "./profile-picture";

export const profileRelations = relations(profile, ({ many }) => ({
  links: many(profileLink),
}));

export const linkRelations = relations(profileLink, ({ one }) => ({
  profile: one(profile, { fields: [profileLink.profileId], references: [profile.id] }),
}));

export type SelectProfile = typeof profile.$inferSelect;
export type InsertProfile = typeof profile.$inferInsert;

export type SelectProfileLink = typeof profileLink.$inferSelect;
export type InsertProfileLink = typeof profileLink.$inferInsert;

export type SelectProfileWithLinks = SelectProfile & {
  links: SelectProfileLink[];
};
