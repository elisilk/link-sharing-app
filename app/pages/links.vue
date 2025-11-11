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

const links = ref(clone(profile.links));

function handleAddNewLink() {
  profile.createLink();
}

function handleSave(event: SubmitEvent) {
  const form = event.target;

  // check if the entire form is valid
  if (!form || !(form instanceof HTMLFormElement) || form.checkValidity() === false) {
    // console.warn("Form --> invalid, so save cancelled");
    addToast("Changes not saved. Check the form for errors.", "my-icon:icon-changes-saved", false);
    return false;
  }

  // if all true, then submit the data to the server
  // console.warn("Form --> valid, so data was saved!");

  profile.links = clone(links.value);
  addToast("Your changes have been successfully saved!", "my-icon:icon-changes-saved", false);
}

profile.$subscribe((mutation, state) => {
  links.value = clone(state.links);
}, { deep: true });

/* drag and drop */

const linksContainer = useTemplateRef<HTMLDivElement>("links-container");

function customDragImage() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 50;

  const ctx = canvas.getContext("2d");
  if (!ctx)
    return null;

  ctx.lineWidth = 4;
  ctx.moveTo(0, 0);
  ctx.lineTo(50, 50);
  ctx.moveTo(0, 50);
  ctx.lineTo(50, 0);
  ctx.stroke();

  return canvas;
}

function handleDragStart(event: DragEvent, itemId: number) {
  if (!event.dataTransfer)
    return;
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemId", itemId.toString());

  const customImage = customDragImage();
  if (customImage)
    event.dataTransfer.setDragImage(customImage, 25, 25);

  const targetElement = event.currentTarget as HTMLElement;
  if (targetElement)
    targetElement.dataset.grabbed = "true";
}

function handleDragEnd(event: DragEvent) {
  const targetElement = event.currentTarget as HTMLElement;
  if (targetElement)
    targetElement.removeAttribute("data-grabbed");
}

function findDropIndex(yPos: number) {
  if (!linksContainer.value)
    return;

  for (const [index, item] of Array.from(linksContainer.value.children).entries()) {
    if (item.getBoundingClientRect().bottom >= yPos)
      return index;
  }

  return -1;
}

function onDrop(event: DragEvent) {
  if (!event.dataTransfer)
    return;
  const itemId = Number(event.dataTransfer.getData("itemId"));
  const newIndex = findDropIndex(event.clientY);
  // console.log(`Item ${itemId} / Y ${event.clientY} / new index = ${newIndex}`);
  if (newIndex === -1 || newIndex === undefined)
    return;
  profile.reorderLink(itemId, newIndex);
}
</script>

<template>
  <AppEditorMain @submit="handleSave">
    <template #title>
      Customize your links
    </template>

    <template #description>
      Add/edit/remove links below and then share all your profiles with the world!
    </template>

    <button
      class="btn btn-secondary add-new-link-btn"
      type="button"
      @click="handleAddNewLink"
    >
      + Add new link
    </button>

    <div v-if="profile.isEmpty" class="empty">
      <h2>Let's get you started</h2>
      <p>Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your profiles with everyone!</p>
      <img
        src="/illustration-empty.svg"
        alt=""
        width="250"
        height="161"
      >
    </div>

    <div
      v-else
      ref="links-container"
      class="links-container"
      @drop="onDrop($event)"
      @dragover.prevent
      @dragenter.prevent
    >
      <TransitionGroup>
        <AppEditorLink
          v-for="(link, index) in links"
          :key="link.id"
          v-model:platform="link.platform"
          v-model:url="link.url"
          :index="index + 1"
          @remove-link="profile.removeLink(link.id)"
          @dragstart="handleDragStart($event, link.id)"
          @dragend="handleDragEnd($event)"
        />
      </TransitionGroup>
    </div>
  </AppEditorMain>
</template>

<style scoped>
.add-new-link-btn {
  max-inline-size: calc(100% - 2 * var(--space-300));
  margin-inline: var(--space-300);
}

.empty {
  margin: var(--space-300);
  padding: var(--space-300);
  background-color: var(--color-background-links-empty);
  border-radius: var(--br-500);
  display: grid;
  grid-template-areas:
    "illustration"
    "heading"
    "description";
  justify-items: center;
  gap: var(--space-300);
  text-align: center;
}

.empty h2 {
  grid-area: heading;
}

.empty p {
  grid-area: description;
}

.empty img {
  grid-area: illustration;
}

.links-container {
  display: grid;
  gap: var(--space-300);
  padding: var(--space-300);
}

[data-grabbed="true"] {
  opacity: 0.2;
}

.v-move,
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.v-leave-active {
  position: absolute;
}

/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  .add-new-link-btn {
    max-inline-size: calc(100% - 2 * var(--space-500));
    margin-inline: var(--space-500);
  }

  .empty {
    margin: var(--space-300) var(--space-500) var(--space-500);
  }

  .links-container {
    padding: var(--space-300) var(--space-500) var(--space-500);
  }
}
</style>

<style>
.placeholder {
  border-radius: var(--br-500);
  background-color: var(--color-placeholder-background);
  border: var(--border-width) solid var(--color-placeholder-border);
}
</style>
