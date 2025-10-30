import { defineStore } from "pinia";

export type link = {
  order: number;
  platform: string;
  url: string;
};

export const useProfileStore = defineStore("profileStore", () => {
  const firstName = ref<string | null>("Eli");
  const lastName = ref<string | null>("Silk");
  const email = ref<string | null>("esilk@me.com");
  const links = ref<link[]>([
    { order: 1, platform: "GitHub", url: "https://github.com/elisilk/" },
    { order: 2, platform: "Frontend Mentor", url: "https://www.frontendmentor.io/profile/elisilk" },
  ]);

  return {
    firstName,
    lastName,
    email,
    links,
  };
});
