import { defineStore } from "pinia";

export type link = {
  id: number;
  platform: string;
  url: string;
};

export const useProfileStore = defineStore("profileStore", () => {
  const firstName = ref<string | null>("Ben");
  const lastName = ref<string | null>("Wright");
  const email = ref<string | null>("ben@example.com");
  const links = ref<link[]>([
    { id: 1, platform: "GitHub", url: "https://github.com/benwright/" },
    { id: 3, platform: "LinkedIn", url: "https://www.linkedin.com/in/benwright/" },
    { id: 2, platform: "YouTube", url: "https://www.youtube.com/@benwright" },
    /* { id: 4, platform: "Frontend Mentor", url: "https://www.frontendmentor.io/profile/elisilk" }, */
  ]);

  // Getters: Computed properties based on state
  const fullName = computed(() => `${firstName.value ?? ""} ${lastName.value ?? ""}`.trim());
  const numLinks = computed(() => links.value.length);
  const isEmpty = computed(() => links.value.length === 0);
  const getLinkByName = computed(() => (name: string) => {
    return links.value.find(link => link.platform === name);
  });

  // Actions: Functions to modify the state
  function removeLink(id: number) {
    links.value = links.value.filter(link => link.id !== id);
  }

  return {
    firstName,
    lastName,
    email,
    links,
    fullName,
    numLinks,
    isEmpty,
    getLinkByName,
    removeLink,
  };
});
