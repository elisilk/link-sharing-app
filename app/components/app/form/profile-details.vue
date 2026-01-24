<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type { SelectProfileWithLinks } from "~~/server/db/schema/index";

import * as z from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const MIN_DIMENSIONS = { width: 200, height: 200 };
const MAX_DIMENSIONS = { width: 1024, height: 1024 };
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0)
    return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

const profileDetailsSchema = z.object({
  firstName: z.string("Can't be empty").nonempty("Can't be empty"),
  lastName: z.string("Can't be empty").nonempty("Can't be empty"),
  email: z.string("Can't be empty").nonempty("Can't be empty").check(z.email("Invalid email")),
  pictureFile: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      if (!file)
        return true;
      return file.size <= MAX_FILE_SIZE;
    }, {
      message: `The image is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`,
    })
    .refine((file) => {
      if (!file)
        return true;
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, {
      message: "Please upload a valid image file (JPEG, PNG, or WebP).",
    })
    .refine(
      (file) => {
        if (!file)
          return true;
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const meetsDimensions
                = img.width >= MIN_DIMENSIONS.width
                  && img.height >= MIN_DIMENSIONS.height
                  && img.width <= MAX_DIMENSIONS.width
                  && img.height <= MAX_DIMENSIONS.height;
              resolve(meetsDimensions);
            };
            img.src = e.target?.result as string;
          };
          reader.readAsDataURL(file);
        });
      },
      {
        message: `The image dimensions are invalid. Please upload an image between ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} and ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} pixels.`,
      },
    ),
});

type ProfileDetailsSchema = z.output<typeof profileDetailsSchema>;
type PartialProfileDetailsSchema = Partial<ProfileDetailsSchema>;

const profileDetailsModel = defineModel<PartialProfileDetailsSchema>();

const profileDetailsState = reactive<Partial<ProfileDetailsSchema>>({
  firstName: profileDetailsModel.value?.firstName || undefined,
  lastName: profileDetailsModel.value?.lastName || undefined,
  email: profileDetailsModel.value?.email || undefined,
  pictureFile: profileDetailsModel.value?.pictureFile || undefined,
});

const { data: profile } = useNuxtData<SelectProfileWithLinks>("profile");

const config = useRuntimeConfig();

const currentProfilePictureSrc = computed<string | null>(() =>
  profile.value?.picture ? `${config.public.blobStorageUrl}/${config.public.blobStorageBase}/${profile.value?.picture}` : null,
);

function handleSubmit(event: FormSubmitEvent<ProfileDetailsSchema>) {
  // can't use the useForm composable because form data includes a File, which can't be stringified, so instead on submit just copy the form data back to the parent's v-model copy
  profileDetailsModel.value = { ...event.data };
}
</script>

<template>
  <UForm
    :schema="profileDetailsSchema"
    :state="profileDetailsState"
    class="h-full"
    novalidate
    @submit.prevent="handleSubmit"
  >
    <UCard
      class="h-full flex flex-col"
      :ui="{
        root: 'bg-default text-default rounded-xl',
        header: 'border-b-0 pt-6 px-6 pb-10 sm:pt-10 sm:px-10',
        body: 'flex-1 space-y-6 pt-0 pb-6 px-6 sm:pt-0 sm:pb-10 sm:px-10',
        footer: 'sm:px-10 sm:py-6',
      }"
      variant="soft"
    >
      <template #header>
        <h1 class="mb-2 text-gray-900 font-bold text-2xl sm:text-[2rem]">
          Profile Details
        </h1>
        <p>Add your details to create a personal touch to your profile.</p>
      </template>

      <div
        class="bg-grey-50 rounded-xl p-6"
      >
        <UFormField
          label="Profile picture"
          name="pictureFile"
          help="Image must be below 1024x1024px. Use PNG or JPG format."
          orientation="horizontal"
          :ui="{
            root: 'gap-4 sm:[&>*:last-child]:flex sm:[&>*:last-child]:gap-6 sm:[&>*:last-child]:items-center',
            help: 'mt-6 sm:mt-0',
            error: 'sm:relative sm:translate-0 text-balance',
          }"
        >
          <!-- display the current profile picture -->
          <img
            v-if="currentProfilePictureSrc"
            class="absolute w-37.5 h-37.5 sm:w-48.25 sm:h-48.25 rounded-xl translate-20 object-cover"
            :src="currentProfilePictureSrc"
            alt="current profile picture"
          >
          <!-- upload a new profile picture -->
          <UFileUpload
            v-model="profileDetailsState.pictureFile"
            label="+ Upload Image"
            icon="i-custom-icon-upload-image"
            accept="image/*"
            class="cursor-pointer"
          />
        </UFormField>
      </div>

      <div class="bg-grey-50 rounded-xl p-6 space-y-2 sm:space-y-4">
        <UFormField
          label="First name"
          name="firstName"
          orientation="horizontal"
          required
        >
          <UInput
            v-model="profileDetailsState.firstName"
            placeholder="e.g. John"
            autocomplete="given-name"
          />
        </UFormField>

        <UFormField
          label="Last name"
          name="lastName"
          orientation="horizontal"
          required
        >
          <UInput
            v-model="profileDetailsState.lastName"
            placeholder="e.g. Appleseed"
            autocomplete="family-name"
          />
        </UFormField>

        <UFormField
          label="Email"
          name="email"
          orientation="horizontal"
        >
          <UInput
            v-model="profileDetailsState.email"
            type="email"
            placeholder="e.g. email@example.com"
            autocomplete="email"
          />
        </UFormField>
      </div>

      <template #footer>
        <div class="sm:text-right">
          <UButton
            type="submit"
            label="Save"
            class="justify-center w-full sm:w-auto"
          />
        </div>
      </template>
    </UCard>
  </UForm>
</template>
