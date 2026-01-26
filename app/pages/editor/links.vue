<script setup lang="ts">
import type { SelectProfileWithLinks } from "~~/server/db/schema/index";

definePageMeta({
  middleware: ["auth"],
  alias: ["/editor"],
  layout: "editor",
});

useSeoMeta({
  title: "Edit your profile links",
  ogTitle: "devlinks - Edit your profile links",
});

const toast = useToast();
const { data: profile } = useNuxtData<SelectProfileWithLinks>("profile");

type ProfileLinksForm = {
  id: number;
  platform: string;
  url: string;
  order: number;
  userId?: number;
};

const localProfileLinks = ref<ProfileLinksForm[]>(
  (profile.value && profile.value.links.length > 0)
    ? profile.value?.links.map(({ id, platform, url, order, userId }) => ({ id, platform, url, order, userId }))
    : [],
);

watch(profile, () => {
  // console.warn("global profile has changed", profile.value);
  localProfileLinks.value = (profile.value && profile.value.links.length > 0)
    ? profile.value?.links.map(({ id, platform, url, order, userId }) => ({ id, platform, url, order, userId }))
    : [];
}, { deep: true });

async function handleUpdate() {
  if (!profile.value) {
    return {
      status: "error",
      message: "User not logged in.",
    };
  }

  // Add (insert) the new links
  const newLinksToAdd = localProfileLinks.value.filter(link => !link.id);
  if (newLinksToAdd.length > 0) {
    newLinksToAdd.forEach((link) => {
      link.userId = profile.value?.userId;
    });

    try {
      const result = await $fetch(`/api/user/${profile.value.userId}/links`, {
        method: "POST",
        body: newLinksToAdd,
      });

      if (result.success) {
        await refreshNuxtData("profile");
        toast.add({
          title: "The new links were added!",
          icon: "i-custom-icon-changes-saved",
          color: "success",
        });
      }
      else {
        toast.add({
          title: "Something went wrong!",
          description: result.message,
          icon: "i-custom-icon-changes-saved",
          color: "error",
        });
      }
    }
    catch (error) {
      console.error(error);
      toast.add({
        title: "Error",
        description: "Something went wrong.",
        color: "error",
      });
    }
  }

  // Update the existing links
  const existingLinksToUpdate = localProfileLinks.value.filter(link => !!link.id);
  if (existingLinksToUpdate.length > 0) {
    try {
      // udpate the array of link items
      const result = await $fetch(`/api/user/${profile.value.userId}/links`, {
        method: "PUT",
        body: existingLinksToUpdate,
      });

      if (result.success) {
        await refreshNuxtData("profile");
        toast.add({
          title: "The existing links were updated!",
          icon: "i-custom-icon-changes-saved",
          color: "success",
        });
      }
      else {
        toast.add({
          title: "Something went wrong!",
          description: result.message,
          icon: "i-custom-icon-changes-saved",
          color: "error",
        });
      }
    }
    catch (error) {
      console.error(error);
      toast.add({
        title: "Error",
        description: "Something went wrong.",
        color: "error",
      });
    }
  }
}

async function handleRemoveLink(linkId: number) {
  if (!profile.value) {
    return {
      status: "error",
      message: "User not logged in.",
    };
  }

  try {
    const result = await $fetch(`/api/user/${profile.value.userId}/link/${linkId}`, {
      method: "DELETE",
    });
    if (result.success) {
      await refreshNuxtData("profile");
      toast.add({
        title: "The link was successfully deleted!",
        icon: "i-custom-icon-changes-saved",
        color: "success",
      });
    }
    else {
      toast.add({
        title: "Something went wrong!",
        description: result.message,
        icon: "i-custom-icon-changes-saved",
        color: "error",
      });
    }
  }
  catch (error) {
    console.error(error);
    toast.add({
      title: "Error",
      description: "Something went wrong.",
      color: "error",
    });
  }
}
</script>

<template>
  <AppFormProfileLinks
    v-model="localProfileLinks"
    @update:model-value="handleUpdate"
    @remove-link="handleRemoveLink"
  />
</template>
