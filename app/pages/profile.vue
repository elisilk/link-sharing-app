<script setup lang="ts">
definePageMeta({
  layout: "editor",
});

const { addToast } = useToastNotifications();
const profile = useProfileStore();

/* Vue Form Component Pattern */

function clone(obj: object) {
  return JSON.parse(JSON.stringify(obj));
}

const details = ref(clone(profile.details));

function handleSave() {
  profile.details = clone(details.value);
  addToast("Your changes have been successfully saved!", "my-icon:icon-changes-saved", false);
}

profile.$subscribe((mutation, state) => {
  details.value = clone(state.details);
}, { deep: true });
</script>

<template>
  <AppEditorMain @submit="handleSave">
    <template #title>
      Profile Details
    </template>

    <template #description>
      Add your details to create a personal touch to your profile.
    </template>

    <div class="inputs">
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
            v-model="details.firstName"
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
            v-model="details.lastName"
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
            v-model="details.email"
            type="email"
            name="profileEmail"
            label="Email"
            placeholder="e.g. email@example.com"
            autocomplete="email"
            :one-row-if-possible="true"
          />
        </ClientOnly>
      </fieldset>
    </div>
  </AppEditorMain>
</template>

<style scoped>
.inputs {
  padding: 0 var(--space-300) var(--space-300);
}

.inputs > * + * {
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
  .inputs {
    padding: 0 var(--space-500) var(--space-500);
  }
}
</style>
