<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type { SelectProfileWithLinks } from "~~/server/db/schema/index";

import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MIN_DIMENSIONS = { width: 200, height: 200 };
const MAX_DIMENSIONS = { width: 6000, height: 6000 };
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]; // "image/webp"

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
  email: z.preprocess(
    value => (value === "" ? null : value), // Convert empty string to undefined
    z.email({ message: "Email is invalid" }).nullable(), // Now optional() works
  ),
  // email: z.string()
  //   .transform(e => e === "" ? undefined : e)
  //   .pipe(z.email("Invalid email").optional()),
  // email: z.email("Invalid email").optional(),
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
  firstName: profileDetailsModel.value?.firstName || "",
  lastName: profileDetailsModel.value?.lastName || "",
  email: profileDetailsModel.value?.email || "",
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

function handleRemoveCurrentPicture() {
  console.log("remove current picture");
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
          :help="`Image must be below ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height}px. Use PNG or JPG format.`"
          orientation="horizontal"
          :ui="{
            root: 'gap-4 sm:[&>*:last-child]:flex sm:[&>*:last-child]:gap-6 sm:[&>*:last-child]:items-center',
            help: 'mt-6 sm:mt-0 text-balance',
            error: 'sm:relative sm:translate-0 text-balance',
          }"
        >
          <div class="shrink-0 relative rounded-xl overflow-hidden w-37.5 h-37.5 sm:w-48.25 sm:h-48.25">
            <!-- picture overlay -->
            <div
              v-if="currentProfilePictureSrc || profileDetailsState.pictureFile"
              class="absolute z-2 inset-0 bg-black opacity-50"
            />
            <!-- current profile picture display -->
            <div
              v-if="currentProfilePictureSrc && !profileDetailsState.pictureFile"
            >
              <img
                :src="currentProfilePictureSrc"
                alt="current profile picture"
                class="absolute z-1 size-full object-cover"
              >
              <button
                type="button"
                aria-label="Remove erik-lucatero-d2MSDujJl2g-unsplash-resized.jpg"
                data-slot="base"
                class="font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-xs gap-1 text-inverted bg-inverted hover:bg-inverted/90 active:bg-inverted/90 disabled:bg-inverted aria-disabled:bg-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted p-0 rounded-full border-2 border-bg absolute z-4 top-1.5 end-1.5 cursor-pointer hover:text-white/75 hover:border-white/75"
                @click="handleRemoveCurrentPicture"
              >
                <UIcon
                  name="i-lucide-x"
                  class="size-4"
                  aria-hidden="true"
                />
              </button>
            </div>
            <!-- new profile picture upload and preview -->
            <UFileUpload
              v-model="profileDetailsState.pictureFile"
              :label="currentProfilePictureSrc || profileDetailsState.pictureFile ? 'Change Image' : '+ Upload Image'"
              icon="i-custom-icon-upload-image"
              accept="image/*"
              class="cursor-pointer static size-full bg-gray-100"
              :ui="{
                base: 'z-3 bg-transparent border-0',
                label: 'font-semibold text-white',
                fileTrailingButton: 'z-4 cursor-pointer top-1.5 end-1.5 hover:text-white/75 hover:border-white/75',
                avatar: 'bg-transparent size-10 rounded-0 *:text-white *:size-8',
              }"
            />
          </div>
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
