<script setup lang="ts">
import * as z from "zod";

// const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
// const MIN_DIMENSIONS = { width: 200, height: 200 };
// const MAX_DIMENSIONS = { width: 4096, height: 4096 };
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// function formatBytes(bytes: number, decimals = 2) {
//   if (bytes === 0)
//     return "0 Bytes";
//   const k = 1024;
//   const dm = decimals < 0 ? 0 : decimals;
//   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
// }

const profileDetailsSchema = z.object({
  id: z.any(),
  firstName: z.string("Can't be empty").nonempty("Can't be empty"),
  lastName: z.string("Can't be empty").nonempty("Can't be empty"),
  email: z.string("Can't be empty").nonempty("Can't be empty").check(z.email("Invalid email")),
});

type ProfileDetailsSchema = z.output<typeof profileDetailsSchema>;
type PartialProfileDetailsSchema = Partial<ProfileDetailsSchema>;

const modelValue = defineModel<PartialProfileDetailsSchema>();

const { form: profileDetailsForm, handleSubmit } = useForm<PartialProfileDetailsSchema>({
  id: undefined,
  email: "",
  firstName: "",
  lastName: "",
}, modelValue);
</script>

<template>
  <UForm
    :schema="profileDetailsSchema"
    :state="profileDetailsForm"
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

      <div class="bg-grey-50 rounded-xl p-6">
        <UFormField
          label="Profile picture"
          name="picture"
          help="Image must be below 1024x1024px. Use PNG or JPG format."
          orientation="horizontal"
          :ui="{
            root: 'gap-4 sm:[&>*:last-child]:flex sm:[&>*:last-child]:gap-6 sm:[&>*:last-child]:items-center',
            help: 'mt-6 sm:mt-0',
          }"
        >
          <UFileUpload
            label="+ Upload Image"
            icon="i-custom-icon-upload-image"
            accept="image/*"
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
            v-model="profileDetailsForm.firstName"
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
            v-model="profileDetailsForm.lastName"
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
            v-model="profileDetailsForm.email"
            type="email"
            placeholder="e.g. email@example.com"
            autocomplete="email"
          />
        </UFormField>
      </div>

      <template #footer>
        <div class="text-right">
          <UButton
            type="submit"
            label="Save"
            class="font-semibold h-14 w-full justify-center sm:w-auto sm:px-6"
          />
        </div>
      </template>
    </UCard>
  </UForm>
</template>
