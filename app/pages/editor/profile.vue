<script setup lang="ts">
import type { SelectProfileWithLinks } from "~~/server/db/schema/index";

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
const { user } = useUserSession();
const { data: profile } = useNuxtData<SelectProfileWithLinks>("profile");

const localProfileDetails = ref({
  firstName: profile.value?.firstName || "",
  lastName: profile.value?.lastName || "",
  email: profile.value?.email || "",
  pictureFile: undefined,
});

async function uploadNewPicture(newPicture: File) {
  // prepare the file as form data to send to the upload API
  const formData = new FormData();
  formData.append(newPicture.name, newPicture);

  // make the API call
  try {
    const response = await $fetch<{ files: UploadedFile[] }>(`/api/user/${user.value?.id}/picture/`, {
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
      console.error("Fetch error:", error.statusMessage);
    }
    else {
      console.error("Unknown error", error);
    }
  }
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    // Ensure the file is an image
    if (!file.type.startsWith("image/")) {
      reject(new Error("File is not an image."));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const img = new Image();

      img.onload = () => {
        // Access the natural dimensions of the image
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };

      img.onerror = () => {
        reject(new Error("Could not load image."));
      };

      // The result is the data URL of the image
      if (event.target && typeof event.target.result === "string") {
        img.src = event.target.result;
      }
      else {
        reject(new Error("FileReader could not read file."));
      }
    };

    reader.onerror = () => {
      reject(new Error("FileReader error."));
    };

    // Read the image file as a Data URL (Base64 string)
    reader.readAsDataURL(file);
  });
}

const FINAL_DIMENSIONS = { width: 400, height: 400 };

async function preProcessNewPicture(newPicture: File) {
  const { width, height } = await getImageDimensions(newPicture);

  // Resize image
  let resizedImage;
  if (width > height) {
    const resizeWidth = Math.min(FINAL_DIMENSIONS.width, width);
    resizedImage = await createImageBitmap(newPicture, {
      resizeWidth,
    });
  }
  else {
    const resizeHeight = Math.min(FINAL_DIMENSIONS.height, height);
    resizedImage = await createImageBitmap(newPicture, {
      resizeHeight,
    });
  }

  // Convert image to JPEG
  const canvas = new OffscreenCanvas(resizedImage.width, resizedImage.height);
  canvas.getContext("bitmaprenderer")?.transferFromImageBitmap(resizedImage);
  const newPictureProcessedBlob = await canvas.convertToBlob({
    type: "image/jpeg",
    quality: 0.9,
  });

  // Convert back to a File
  const newPictureProcessed = new File([newPictureProcessedBlob], `${newPicture.name}.jpg`, {
    type: "image/jpeg",
  });

  // return newPicture;
  return newPictureProcessed;
}

async function handleUpdate() {
  let newPicture;

  // prepare and upload the profile picture
  if (localProfileDetails.value.pictureFile) {
    // console.log("picture file included:", (localProfileDetails.value.pictureFile as File).name);

    // process the new picture file
    const processedNewPicture = await preProcessNewPicture(localProfileDetails.value.pictureFile);

    // upload the (processed) new picture file
    const result = await uploadNewPicture(processedNewPicture);

    if (result && result.data && result.data.length > 0) {
      newPicture = result.data[0]?.filename;

      // delete the old picture file
      if (user.value?.id && profile.value?.picture) {
        try {
          const deletePictureResult = await $fetch(`/api/user/${user.value.id}/picture/`, {
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
        }
      }
    }
  }

  // update the profile details
  try {
    const updateProfileResult = await $fetch(`/api/user/${user.value?.id}/profile/`, {
      method: "PUT",
      body: {
        ...localProfileDetails.value,
        picture: newPicture,
      },
    });
    if (updateProfileResult.success) {
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
        description: updateProfileResult.message,
        icon: "i-custom-icon-changes-saved",
        color: "error",
      });
    }
  }
  catch (error) {
    console.error(error);
    if (error instanceof FetchError) {
      toast.add({ title: "Error Updating Profile", description: error.data.message, color: "error" });
    }
    else {
      toast.add({ title: "Error Updating Profile", description: "Something went wrong.", color: "error" });
    }
  }
}
</script>

<template>
  <AppFormProfileDetails v-model="localProfileDetails" @update:model-value="handleUpdate" />
</template>
