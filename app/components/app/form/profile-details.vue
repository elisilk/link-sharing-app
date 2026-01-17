<script setup lang="ts">
import * as z from "zod";

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
        header: 'border-b-0',
        body: 'flex-1 space-y-6',
      }"
      variant="soft"
    >
      <template #header>
        <h1 class="text-5xl font-bold">
          Profile Details
        </h1>
        <p>Add your details to create a personal touch to your profile.</p>
      </template>

      <UFieldGroup orientation="vertical">
        <UFormField label="Profile picture" name="picture">
          <UFileUpload />
          <UIcon name="i-custom-icon-upload-image" />
          <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
        </UFormField>
      </UFieldGroup>

      <UFieldGroup orientation="vertical">
        <UFormField label="First name" name="firstName">
          <UInput
            v-model="profileDetailsForm.firstName"
            placeholder="e.g. John"
            autocomplete="given-name"
            class="w-full"
            required
          />
        </UFormField>

        <UFormField label="Last name" name="lastName">
          <UInput
            v-model="profileDetailsForm.lastName"
            placeholder="e.g. Appleseed"
            autocomplete="family-name"
            class="w-full"
            required
          />
        </UFormField>

        <UFormField label="Email" name="email">
          <UInput
            v-model="profileDetailsForm.email"
            type="email"
            placeholder="e.g. email@example.com"
            autocomplete="email"
            class="w-full"
            required
          />
        </UFormField>
      </UFieldGroup>

      <template #footer>
        <div class="text-right">
          <UButton
            type="submit"
            label="Save"
            class="w-full justify-center sm:w-auto"
          />
        </div>
      </template>
    </UCard>
  </UForm>
</template>
