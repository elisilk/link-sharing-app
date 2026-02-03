<script setup lang="ts">
import type { SelectProfileWithLinks } from "#server/db/schema/index";

import { FetchError } from "ofetch";

type UploadedFile = {
  filename: string;
  url: string;
};

definePageMeta({
  middleware: ["auth"],
  layout: "editor",
});

useSeoMeta({
  title: "Edit your profile details",
  ogTitle: "devlinks - Edit your profile details",
});

const toast = useToast();
const { data: profile } = useNuxtData<SelectProfileWithLinks>("profile");
const loading = ref<boolean>(false);

const localProfileDetails = ref({
  firstName: profile.value?.firstName || "",
  lastName: profile.value?.lastName || "",
  email: profile.value?.email || "",
  newPictureFile: undefined,
  deleteOldPictureFile: false,
});

async function uploadNewPicture(newPicture: File) {
  if (!profile.value) {
    return {
      status: "error",
      message: "User not logged in.",
    };
  }

  // prepare the file as form data to send to the upload API
  const formData = new FormData();
  formData.append(newPicture.name, newPicture);

  // make the API call
  try {
    const response = await $fetch<{ files: UploadedFile[] }>(`/api/user/${profile.value.userId}/picture/`, {
      method: "POST",
      body: formData,
    });
    if (response) {
      return {
        status: "success",
        data: response.files,
      };
    }
    else {
      return {
        status: "error",
        message: "Something went wrong. Try again.",
      };
    }
  }
  catch (error) {
    if (error instanceof FetchError) {
      console.error("Fetch error:", error.statusText);
    }
    else {
      console.error("Unknown error", error);
    }
  }
}

async function deleteOldPicture() {
  if (!profile.value) {
    return {
      status: "error",
      message: "User not logged in.",
    };
  }

  try {
    const deletePictureResult = await $fetch(`/api/user/${profile.value.userId}/picture/`, {
      method: "DELETE",
      body: {
        filename: profile.value.picture,
      },
    });
    if (deletePictureResult) {
      toast.add({
        title: "Old picture successfully deleted!",
        icon: "i-custom-icon-changes-saved",
        color: "success",
      });
    }
  }
  catch (error) {
    console.error("old picture file NOT deleted:", profile.value.picture, error);
    if (error instanceof FetchError) {
      toast.add({ title: "Error Deleting Old Picture", description: error.data.message, color: "error" });
    }
    else {
      toast.add({ title: "Error Deleting Old Picture", description: "Something went wrong.", color: "error" });
    }
  }
}

async function handleUpdate() {
  loading.value = true;

  if (!profile.value) {
    return {
      status: "error",
      message: "User not logged in.",
    };
  }

  let newPicture;

  // prepare and upload the profile picture
  if (localProfileDetails.value.newPictureFile) {
    // process the new picture file
    const processedNewPicture = await preProcessNewPicture(localProfileDetails.value.newPictureFile);

    // upload the (processed) new picture file
    const result = await uploadNewPicture(processedNewPicture);

    if (result && result.data && result.data.length > 0) {
      newPicture = result.data[0]?.filename;

      // delete the old picture file
      if (profile.value.picture) {
        await deleteOldPicture();
      }
    }
  }
  else {
    if (localProfileDetails.value.deleteOldPictureFile) {
      // delete the old picture file
      if (profile.value.picture) {
        await deleteOldPicture();
      }
      newPicture = null;
    }
  }

  // update the profile details
  try {
    const updateProfileResult = await $fetch(`/api/user/${profile.value.userId}/profile/`, {
      method: "PATCH",
      body: {
        ...localProfileDetails.value,
        picture: newPicture,
      },
    });
    if (updateProfileResult.success) {
      await refreshNuxtData("profile");

      toast.add({
        title: "Your changes have been successfully saved!",
        icon: "i-custom-icon-changes-saved",
        color: "success",
      });

      // reset the new picture file
      localProfileDetails.value.newPictureFile = undefined;
      localProfileDetails.value.deleteOldPictureFile = false;
    }
    else {
      toast.add({
        title: "Something went wrong!",
        description: updateProfileResult.message,
        icon: "i-custom-icon-changes-saved",
        color: "error",
      });
    }
  }
  catch (error) {
    console.error("profile NOT updated:", error);
    if (error instanceof FetchError) {
      toast.add({ title: "Error Updating Profile", description: error.data.message, color: "error" });
    }
    else {
      toast.add({ title: "Error Updating Profile", description: "Something went wrong.", color: "error" });
    }
  }

  loading.value = false;
}
</script>

<template>
  <AppFormProfileDetails
    v-model="localProfileDetails"
    :loading
    @update:model-value="handleUpdate"
  />
</template>
