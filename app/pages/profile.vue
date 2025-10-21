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
        <label for="profile-picture">Profile picture</label>
        <input
          id="profile-picture"
          type="file"
          name="profile-picture"
          accept="image/png, image/jpeg"
        >
        <p>+ Upload Image</p>
        <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
      </fieldset>

      <fieldset>
        <div>
          <label for="first-name">First name*</label>
          <input
            id="first-name"
            type="text"
            name="first-name"
            placeholder="e.g. John"
            required
          >
          <p>Can’t be empty</p>
        </div>

        <div>
          <label for="last-name">Last name*</label>
          <input
            id="last-name"
            type="text"
            name="last-name"
            placeholder="e.g. Appleseed"
            required
          >
          <p>Can’t be empty</p>
        </div>

        <div>
          <label for="email">Email*</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="e.g. email@example.com"
          >
        </div>
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
}

fieldset > * + * {
  margin-block-start: var(--space-100);
}

input[type="file"] {
  inline-size: 100%;
}
</style>
