import { defineStore } from "pinia";

export type link = {
  order: number;
  platform: string;
  url: string;
};

export const useProfileStore = defineStore("profileStore", () => {
  const firstName = ref<string | null>("Ben");
  const lastName = ref<string | null>("Wright");
  const email = ref<string | null>("ben@example.com");
  const links = ref<link[]>([
    { order: 1, platform: "GitHub", url: "https://github.com/benwright/" },
    { order: 2, platform: "YouTube", url: "https://www.youtube.com/@benwright" },
    { order: 3, platform: "LinkedIn", url: "https://www.linkedin.com/in/benwright/" },
    /* { order: 4, platform: "Frontend Mentor", url: "https://www.frontendmentor.io/profile/elisilk" }, */
  ]);

  return {
    firstName,
    lastName,
    email,
    links,
  };
});
