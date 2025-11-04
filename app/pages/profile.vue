<script setup lang="ts">
definePageMeta({
  layout: "editor",
});

const profile = useProfileStore();
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
        <legend class="sr-only">
          Profile Image
        </legend>
        <AppFormImageUpload
          id="profile-picture"
          name="profile-picture"
          label="Profile picture"
          accept="image/png, image/jpeg"
        />
      </fieldset>

      <fieldset>
        <legend class="sr-only">
          Profile Text Fields
        </legend>
        <ClientOnly>
          <AppFormTextField
            id="profileFirstName"
            v-model="profile.firstName"
            type="text"
            name="profileFirstName"
            label="First name"
            placeholder="e.g. John"
            autocomplete="given-name"
            :one-row-if-possible="true"
            :required="true"
          />
          <AppFormTextField
            id="profileLastName"
            v-model="profile.lastName"
            type="text"
            name="profileLastName"
            label="Last name"
            placeholder="e.g. Appleseed"
            autocomplete="family-name"
            :one-row-if-possible="true"
            :required="true"
          />
          <AppFormTextField
            id="profileEmail"
            v-model="profile.email"
            type="email"
            name="profileEmail"
            label="Email"
            placeholder="e.g. email@example.com"
            autocomplete="email"
            :one-row-if-possible="true"
          />
        </ClientOnly>
      </fieldset>
    </form>
  </AppEditorMain>
</template>

<style scoped>
form {
  padding: 0 var(--space-300) var(--space-300);
}

form > * + * {
  margin-block-start: var(--space-200);
}

fieldset {
  border: 0;
  background-color: var(--color-background-form-fieldset);
  border-radius: var(--br-500);
  padding: var(--space-300);
  margin-inline: 0;
}

fieldset > :not(legend) + * {
  margin-block-start: var(--space-100);
}

/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  form {
    padding: 0 var(--space-500) var(--space-500);
  }
}
</style>
