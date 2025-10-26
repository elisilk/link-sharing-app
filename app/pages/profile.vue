<script setup lang="ts">
definePageMeta({
  layout: "editor",
});
</script>

<template>
  <AppEditorMain>
    <template #title>
      Profile Details
    </template>

    <template #description>
      Add your details to create a personal touch to your profile.
    </template>

    <form>
      <fieldset>
        <AppFormImageUpload
          id="profile-picture"
          name="profile-picture"
          label="Profile picture"
          accept="image/png, image/jpeg"
        />
      </fieldset>

      <fieldset>
        <ClientOnly>
          <AppFormTextField
            id="profileFirstName"
            type="text"
            name="profileFirstName"
            label="First name"
            placeholder="e.g. John"
            autocomplete="given-name"
            :required="true"
          />
          <AppFormTextField
            id="profileLastName"
            type="text"
            name="profileLastName"
            label="Last name"
            placeholder="e.g. Appleseed"
            autocomplete="family-name"
            :required="true"
          />
          <AppFormTextField
            id="profileEmail"
            type="email"
            name="profileEmail"
            label="Email"
            placeholder="e.g. email@example.com"
            autocomplete="email"
          />
        </ClientOnly>
      </fieldset>
    </form>
  </AppEditorMain>
</template>

<style scoped>
form > * + * {
  margin-block-start: var(--space-200);
}

fieldset {
  border: 0;
  background-color: hsl(var(--color-grey-50));
  border-radius: var(--br-500);
  padding: var(--space-300);
  margin-inline: 0;
}

fieldset > * + * {
  margin-block-start: var(--space-100);
}
</style>
