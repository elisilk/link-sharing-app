<script setup lang="ts">
import type { SelectProfileWithLinks } from "~~/server/db/schema/index";

definePageMeta({
  middleware: ["auth"],
  layout: "editor",
});

const toast = useToast();
const { user } = useUserSession();
const { data: profile } = useNuxtData<SelectProfileWithLinks>("profile");

const localProfileDetails = ref({
  id: profile.value?.id || undefined,
  firstName: profile.value?.firstName || "",
  lastName: profile.value?.lastName || "",
  email: profile.value?.email || "",
});

async function handleUpdate() {
  try {
    const result = await $fetch(`/api/profile/${user.value?.id}`, {
      method: "PUT",
      body: localProfileDetails.value,
    });
    if (result.success) {
      refreshNuxtData("profile");
      toast.add({
        title: "Your changes have been successfully saved!",
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
  <AppFormProfileDetails v-model="localProfileDetails" @update:model-value="handleUpdate" />
</template>
