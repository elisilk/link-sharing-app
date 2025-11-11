import { defineStore } from "pinia";

export type details = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  pictureUrl: string | null;
};

export type link = {
  id: number;
  platform: string;
  url: string;
};

export const useProfileStore = defineStore("profileStore", () => {
  const details = ref<details>({
    firstName: null,
    lastName: null,
    email: null,
    pictureUrl: null,
  });
  const links = ref<link[]>([]);

  // Getters: Computed properties based on state
  const fullName = computed(() => `${details.value.firstName ?? ""} ${details.value.lastName ?? ""}`.trim());
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
    details,
    links,
    fullName,
    numLinks,
    isEmpty,
    getLinkByName,
    removeLink,
    reorderLink,
  };
});

/* a filled in example default values

  const details = ref<details>({
    firstName: "Ben",
    lastName: "Wright",
    email: "ben@example.com",
    pictureUrl: "/uploads/1762789221836-erik-lucatero-d2MSDujJl2g-unsplash-resized.jpg",
  });
  const links = ref<link[]>([
    { id: 1, platform: "GitHub", url: "https://github.com/benwright/" },
    { id: 3, platform: "LinkedIn", url: "https://www.linkedin.com/in/benwright/" },
    { id: 2, platform: "YouTube", url: "https://www.youtube.com/@benwright" },
    { id: 4, platform: "Frontend Mentor", url: "https://www.frontendmentor.io/profile/benwright" },
  ]);

*/
