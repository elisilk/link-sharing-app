<script setup lang="ts">
import type { SelectProfileWithLinks } from "~~/server/db/schema/index";

definePageMeta({
  middleware: ["auth"],
  alias: ["/editor"],
  layout: "editor",
});

const toast = useToast();
const { data: profile } = useNuxtData<SelectProfileWithLinks>("profile");

type ProfileLinksForm = {
  id: number;
  platform: string;
  url: string;
  order: number;
  profileId?: number;
  userId?: number;
};

const localProfileLinks = ref<ProfileLinksForm[]>(
  (profile.value && profile.value.links.length > 0)
    ? profile.value?.links.map(({ id, platform, url, order, profileId, userId }) => ({ id, platform, url, order, profileId, userId })).sort((a, b) => a.order - b.order)
    : [],
);

watch(profile, () => {
  // console.warn("global profile has changed", profile.value);
  localProfileLinks.value = (profile.value && profile.value.links.length > 0)
    ? profile.value?.links.map(({ id, platform, url, order, profileId, userId }) => ({ id, platform, url, order, profileId, userId })).sort((a, b) => a.order - b.order)
    : [];
}, { deep: true });

async function handleUpdate() {
  // Add (insert) the new links
  const newLinksToAdd = localProfileLinks.value.filter(link => !link.id);
  if (newLinksToAdd.length > 0) {
    newLinksToAdd.forEach((link) => {
      link.userId = profile.value?.userId;
      link.profileId = profile.value?.id;
    });
    // console.table(newLinksToAdd);
    try {
      const result = await $fetch(`/api/links`, {
        method: "POST",
        body: newLinksToAdd,
      });

      if (result.success) {
        refreshNuxtData("profile");
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
  // console.table(existingLinksToUpdate);
  if (existingLinksToUpdate.length > 0) {
    try {
    // updating just one link item
    // const result = await $fetch(`/api/link/${existingLinksToUpdate[0]?.id}`, {
    //   method: "PUT",
    //   body: existingLinksToUpdate[0],
    // });

      // udpating an array of link items
      const result = await $fetch(`/api/links`, {
        method: "PUT",
        body: existingLinksToUpdate,
      });

      if (result.success) {
        refreshNuxtData("profile");
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
  try {
    const result = await $fetch(`/api/link/${linkId}`, {
      method: "DELETE",
    });
    if (result.success) {
      refreshNuxtData("profile");
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
