<script setup lang="ts">
import type { SelectProfileWithLinks } from "#server/db/schema/index";
import type { FormSubmitEvent } from "@nuxt/ui";

import * as z from "zod";

defineProps<{
  loading: boolean;
}>();

const profileDetailsSchema = z.object({
  firstName: z.string("Can't be empty").trim().nonempty("Can't be empty"),
  lastName: z.string("Can't be empty").trim().nonempty("Can't be empty"),
  email: z.union([
    z.literal(""),
    z.string().trim().check(z.email("Email is invalid")).toLowerCase(),
  ]).optional(),
  newPictureFile: z
    .instanceof(File)
    .optional()
    .refine((file: File | undefined) => {
      if (!file)
        return true;
      return file.size <= PICTURE_MAX_FILE_SIZE;
    }, {
      message: `The image is too large. Please choose an image smaller than ${formatBytes(PICTURE_MAX_FILE_SIZE)}.`,
    })
    .refine((file: File | undefined) => {
      if (!file)
        return true;
      return PICTURE_ACCEPTED_TYPES.includes(file.type);
    }, {
      message: `Please upload a valid image file (${formattedPictureAcceptedTypes}).`,
    })
    .refine(
      (file: File | undefined) => {
        if (!file)
          return true;
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const meetsDimensions
                = img.width >= PICTURE_MIN_DIMENSIONS.width
                  && img.height >= PICTURE_MIN_DIMENSIONS.height
                  && img.width <= PICTURE_MAX_DIMENSIONS.width
                  && img.height <= PICTURE_MAX_DIMENSIONS.height;
              resolve(meetsDimensions);
            };
            img.src = e.target?.result as string;
          };
          reader.readAsDataURL(file);
        });
      },
      {
        message: `The image dimensions are invalid. Please upload an image between ${PICTURE_MIN_DIMENSIONS.width}x${PICTURE_MIN_DIMENSIONS.height} and ${PICTURE_MAX_DIMENSIONS.width}x${PICTURE_MAX_DIMENSIONS.height} pixels.`,
      },
    ),
  deleteOldPictureFile: z.boolean(),
});

type ProfileDetailsSchema = z.output<typeof profileDetailsSchema>;
type PartialProfileDetailsSchema = Partial<ProfileDetailsSchema>;

const profileDetailsModel = defineModel<PartialProfileDetailsSchema>();

const profileDetailsState = reactive<Partial<ProfileDetailsSchema>>({
  firstName: profileDetailsModel.value?.firstName || "",
  lastName: profileDetailsModel.value?.lastName || "",
  email: profileDetailsModel.value?.email || "",
  newPictureFile: profileDetailsModel.value?.newPictureFile || undefined,
  deleteOldPictureFile: profileDetailsModel.value?.deleteOldPictureFile || false,
});

watch(profileDetailsModel, () => {
  profileDetailsState.firstName = profileDetailsModel.value?.firstName || "";
  profileDetailsState.lastName = profileDetailsModel.value?.lastName || "";
  profileDetailsState.email = profileDetailsModel.value?.email || "";
  profileDetailsState.newPictureFile = profileDetailsModel.value?.newPictureFile || undefined;
  profileDetailsState.deleteOldPictureFile = profileDetailsModel.value?.deleteOldPictureFile || false;
}, { deep: true });

const { data: profile } = useNuxtData<SelectProfileWithLinks>("profile");

const config = useRuntimeConfig();

const currentProfilePictureSrc = computed<string | null>(() =>
  profile.value?.picture ? `${config.public.blobStorageUrl}/${config.public.blobStorageBase}/${profile.value?.picture}` : null,
);

function handleSubmit(event: FormSubmitEvent<ProfileDetailsSchema>) {
  // Can't use the useForm composable because form data includes a File, which can't be stringified. So instead, on submit, just copy the form data back to the parent's v-model copy.
  profileDetailsModel.value = { ...event.data };
}

function handleRemoveCurrentPicture() {
  // console.log("remove current picture");
  profileDetailsState.deleteOldPictureFile = true;
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

      <fieldset
        :disabled="loading"
        class="@container bg-grey-50 rounded-xl p-6"
      >
        <UFormField
          label="Profile picture"
          name="newPictureFile"
          :help="`Image must be below ${PICTURE_MAX_DIMENSIONS.width}x${PICTURE_MAX_DIMENSIONS.height}px. Use PNG or JPG format.`"
          orientation="horizontal"
          :ui="{
            root: '@xs:[&>*:last-child]:flex @xs:[&>*:last-child]:gap-6 @xs:[&>*:last-child]:items-center',
            label: 'mb-4 @xs:mb-0',
            help: 'text-pretty mt-6 @xs:mt-0',
            error: 'text-left mt-6 text-pretty @xs:relative @xs:translate-0 @xs:mt-0 @xs:mr-0',
          }"
        >
          <div class="shrink-0 relative w-37.5 h-37.5 @xs:w-48.25 @xs:h-48.25">
            <!-- picture overlay -->
            <div
              v-if="(currentProfilePictureSrc && !profileDetailsState.deleteOldPictureFile) || profileDetailsState.newPictureFile"
              class="absolute z-2 inset-0 bg-black opacity-50  rounded-xl"
            />

            <!-- current profile picture display -->
            <div
              v-if="currentProfilePictureSrc && !profileDetailsState.newPictureFile && !profileDetailsState.deleteOldPictureFile"
            >
              <img
                :src="currentProfilePictureSrc"
                alt="current profile picture"
                class="absolute z-1 size-full object-cover  rounded-xl"
              >
              <UButton
                icon="i-lucide-x"
                variant="ghost"
                color="neutral"
                size="sm"
                aria-label="Remove picture"
                class="absolute z-4 top-1.5 end-1.5 cursor-pointer rounded-full p-0 bg-inverted text-white/50 border-white/50 border-2 ring-primary hover:bg-inverted/90 hover:text-white hover:border-white focus-visible:bg-inverted/90 focus-visible:text-white focus-visible:border-white focus-visible:ring-2"
                @click="handleRemoveCurrentPicture"
              />
            </div>

            <!-- new profile picture upload and preview -->
            <UFileUpload
              v-model="profileDetailsState.newPictureFile"
              :label="(currentProfilePictureSrc && !profileDetailsState.deleteOldPictureFile) || profileDetailsState.newPictureFile ? 'Change Image' : '+ Upload Image'"
              icon="i-custom-icon-upload-image"
              accept="image/*"
              class="cursor-pointer static size-full rounded-xl bg-gray-100 hover:bg-gray-200 has-focus:bg-gray-200"
              :ui="{
                base: 'z-3 bg-transparent border-0 rounded-xl focus:shadow-(--shadow-purple-600)',
                label: [
                  'font-semibold',
                  (currentProfilePictureSrc && !profileDetailsState.deleteOldPictureFile) || profileDetailsState.newPictureFile ? 'text-white' : 'text-primary',
                ],
                fileTrailingButton: 'z-4 cursor-pointer top-1.5 end-1.5 text-white/50 border-white/50 ring-primary hover:text-white hover:border-white focus-visible:bg-inverted/90 focus-visible:text-white focus-visible:border-white focus-visible:outline-0 focus-visible:ring-2',
                avatar: [
                  'bg-transparent rounded-xl size-10 *:size-8',
                  (currentProfilePictureSrc && !profileDetailsState.deleteOldPictureFile) || profileDetailsState.newPictureFile ? '*:text-white' : '*:text-primary',
                ],
              }"
            />
          </div>
        </UFormField>
      </fieldset>

      <fieldset
        :disabled="loading"
        class="@container bg-grey-50 rounded-xl p-6"
      >
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
      </fieldset>

      <template #footer>
        <div class="sm:text-right">
          <UButton
            type="submit"
            :loading
            :disabled="loading"
            :label="loading ? undefined : 'Save'"
            class="justify-center w-full sm:w-auto"
          />
        </div>
      </template>
    </UCard>
  </UForm>
</template>
