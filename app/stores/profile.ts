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
    { id: 4, platform: "Frontend Mentor", url: "https://www.frontendmentor.io/profile/elisilk" },
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

  function reorderLink(id: number, newIndex: number) {
    // if new index is out of bounds, then do nothing
    if (newIndex < 0 || newIndex > links.value.length - 1)
      return;
    // find the index of the current element to be reordered
    const currentIndex = links.value.findIndex(item => item.id === id);
    // if not found, then do nothing
    if (currentIndex === -1)
      return;
    // remove that element from the array
    const [removedItem] = links.value.splice(currentIndex, 1) as [link];
    // replace that element at the new index
    links.value.splice(newIndex, 0, removedItem);
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
    reorderLink,
  };
});
