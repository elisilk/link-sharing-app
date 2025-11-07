<script setup lang="ts">
const props = defineProps<{
  index: number | undefined;
}>();
const model = defineModel<string | undefined>();

const findPlatform = (name: string | undefined) => platforms.find(platform => platform.name === name);

const selectedPlatform = computed(() => findPlatform(model.value));

const id = computed(() => `link${props.index}-platform`);
const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function closeDropdown() {
  isOpen.value = false;
}

function handleKeyPress(event: KeyboardEvent) {
  // TODO: implement this
  // - ArrowDown
  // - ArrowUp
  // - Escape
  // - Enter
  // - Tab
  console.warn("Need to handle key press:", event.key);
}

const selectElement = useTemplateRef<HTMLInputElement>("select-element");

useClickOutside(selectElement, closeDropdown);

function handleOptionSelect(event: MouseEvent) {
  const targetElement = event.currentTarget as HTMLInputElement;

  // find and set the new selected platform
  if (targetElement.dataset.name) {
    const newSelectedPlatform = findPlatform(targetElement.dataset.name);
    if (newSelectedPlatform) {
      model.value = newSelectedPlatform.name;
    }
  }

  // hide the dropdown
  toggleDropdown();
};
</script>

<template>
  <div class="outer">
    <div class="select-container">
      <div class="select-label">
        Platform
      </div>
      <div
        :id="id"
        ref="select-element"
        class="select"
      >
        <button
          type="button"
          role="combobox"
          aria-label="Platform select button"
          aria-haspopup="listbox"
          :aria-expanded="isOpen"
          aria-controls="select-dropdown"
          class="select-button"
          @click="toggleDropdown"
          @keypress="handleKeyPress"
          @keydown.up.prevent="handleKeyPress"
          @keydown.down.prevent="handleKeyPress"
        >
          <div v-if="selectedPlatform" class="selected-value">
            <Icon :name="`my-icon:${selectedPlatform.icon}`" />
            {{ selectedPlatform.name }}
          </div>
          <Icon name="my-icon:icon-chevron-down" class="arrow" />
        </button>
        <ul v-if="isOpen" class="select-dropdown">
          <li
            v-for="platform in platforms"
            :key="platform.name"
            :data-name="platform.name"
            :class="{ selected: selectedPlatform && platform.name === selectedPlatform.name }"
            @click="handleOptionSelect"
          >
            <Icon :name="`my-icon:${platform.icon}`" />
            {{ platform.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outer {
  container-type: inline-size;
}

.select-container {
  display: grid;
  gap: var(--space-100);
}

.select-label {
  font-size: var(--fs-200);
}

.select {
  position: relative;
  display: inline-block;
  inline-size: 100%;
  color: var(--color-input-text);
}

.select-button {
  inline-size: 100%;
  background-color: var(--color-input-dropdown-background);
  padding: var(--space-200);
  border-radius: var(--br-400);
  border: var(--border-width) solid var(--color-input-border);

  display: flex;
  align-items: center;
}

.select-button:hover,
.select-button:focus-visible {
  outline: none;
  border: var(--border-width) solid var(--color-input-active);
  box-shadow: var(--shadow-input-field);
}

.arrow {
  margin-inline-start: auto;
  inline-size: var(--icon-size-xs);
  transition: transform 0.4s ease-in-out;
}

.select-button[aria-expanded="true"] .arrow {
  transform: rotate(180deg);
}

.selected-value {
  display: flex;
  gap: var(--space-200);
  align-items: center;
}

.select-dropdown {
  z-index: 1;
  position: absolute;
  top: 100%;
  left: 0;
  inline-size: 100%;
  border: 1px solid var(--color-input-border);
  border-radius: var(--br-400);
  background-color: var(--color-input-dropdown-background);
  list-style: none;
  padding-inline: var(--space-200);
  box-shadow: var(--shadow-input-dropdown);
  max-block-size: var(--input-size-dropdown-block-max);
  overflow-block: auto;
}

.select-dropdown::-webkit-scrollbar {
  width: var(--space-100);
}

.select-dropdown::-webkit-scrollbar-track {
  background: var(--color-input-dropdown-scrollbar-track);
  border-radius: var(--br-600);
}

.select-dropdown::-webkit-scrollbar-thumb {
  background: var(--color-input-dropdown-scrollbar-thumb);
  border-radius: var(--br-600);
}

.select-dropdown li {
  padding-block: var(--space-200);
  cursor: pointer;
  border-block-end: var(--border-width) solid var(--color-input-border);

  display: flex;
  gap: var(--space-200);
  align-items: center;
}

.select-dropdown li:last-child {
  border-block-end: 0;
}

/* Highlight the selected option */
.select-dropdown li.selected {
  color: var(--color-input-active);
}

.select-dropdown li:hover,
.select-dropdown li:focus {
  color: var(--color-input-active);
  background-color: var(--color-input-dropdown-active-background);
}

@container (min-width: 25rem) {
  .select-label {
    font-size: var(--fs-400);
  }
}
</style>
