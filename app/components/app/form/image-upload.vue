<script setup lang="ts">
import attrAccept from "attr-accept";

const props = withDefaults(
  defineProps<{
    id: string;
    name: string;
    label: string;
    accept?: string[];
    maxMb?: number;
    maxWidth?: number;
    maxHeight?: number;
  }>(),
  {
    accept: () => ["image/*"],
    maxMb: 5,
    maxWidth: 1024,
    maxHeight: 1024,
  },
);

const model = defineModel<string>();

const imageFile = ref<File>();
const isDragging = ref(false);

function fileSizeIsTooBig(file: File) {
  return file.size > props.maxMb * 1024 * 1024;
}

async function fileDimensionsAreTooBig(file: File) {
  try {
    const { width, height } = await getImageDimensions(file);
    return width > props.maxWidth || height > props.maxHeight;
  }
  catch (error) {
    console.error(error);
  }
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      URL.revokeObjectURL(objectUrl);
      resolve({ width, height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not load image"));
    };

    img.src = objectUrl;
  });
}

async function handleImageFileSelect(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input || !input.files || input.files.length === 0)
    return;

  const file = input.files[0];

  // file validity checks
  if (!file) {
    console.error(`Image upload no file chosen`);
    return;
  }
  if (!attrAccept(file, props.accept)) {
    console.error(`Image upload not an acceptable file type: ${file.type}`);
    return;
  }
  if (fileSizeIsTooBig(file)) {
    console.error(`Image upload file size is too big: ${file.size}`);
    return;
  }
  if (await fileDimensionsAreTooBig(file)) {
    const { width, height } = await getImageDimensions(file);
    console.error(`Image upload dimensions are too big: ${width}x${height}`);
    return;
  }

  const formData = new FormData();
  formData.append(file.name, file);

  const response = await fetch("api/upload", {
    method: "POST",
    body: formData,
  });

  const data = (await response.json()) as {
    files: { filename: string; url: string }[];
  };

  model.value = data.files[0]?.url;

  imageFile.value = file;
}

const imagePreview = computed<string | null>((oldPreview) => {
  // clean up old preview
  if (oldPreview)
    URL.revokeObjectURL(oldPreview);

  // return the new preview url
  if (imageFile.value?.type.startsWith("image")) {
    return URL.createObjectURL(imageFile.value);
  }
  else if (model.value) {
    return model.value;
  }
  else {
    return null;
  }
});

const imagePreviewBackgroundStyle = computed(() => {
  if (imagePreview.value)
    return { backgroundImage: `url(${imagePreview.value})` };
  else return undefined;
});

// cleanup
onUnmounted(() => {
  if (imagePreview.value)
    URL.revokeObjectURL(imagePreview.value);
});
</script>

<template>
  <div class="outer">
    <div class="inner">
      <div class="label">
        {{ label }}
      </div>

      <label
        :class="{ active: isDragging }"
        @dragenter="isDragging = true"
        @dragover="isDragging = true"
        @dragleave="isDragging = false"
        @drop="isDragging = false"
      >
        <input
          :id="id"
          :name="name"
          type="file"
          :accept="accept.join(',')"
          @change="handleImageFileSelect"
        >

        <div
          v-if="imagePreview"
          class="with-preview"
          :style="imagePreviewBackgroundStyle"
        >
          <Icon class="icon" name="my-icon:icon-upload-image" />
          <span>Change Image</span>
        </div>
        <div v-else>
          <Icon class="icon" name="my-icon:icon-upload-image" />
          <span>+ Upload Image</span>
        </div>
      </label>

      <p class="instructions">
        Image must be below 1024x1024px. Use PNG or JPG format.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* base containers */

.outer {
  container-type: inline-size;
}

.inner {
  --input-size: var(--input-size-image-upload-sm);
  display: grid;
  gap: var(--space-200);
}

.instructions {
  margin-block-start: var(--space-100);
  font-size: var(--fs-200);
}

label {
  cursor: pointer;
  position: relative;
  overflow: hidden;

  display: grid;
  align-items: center;

  aspect-ratio: 1 / 1;
  inline-size: var(--input-size);
  block-size: auto;
  background-color: var(--color-input-image-background);
  border-radius: var(--br-500);
}

input[type="file"] {
  cursor: pointer;
  position: absolute;
  opacity: 0;
  inset: 0;
  z-index: 2;
}

label > div {
  block-size: 100%;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: var(--space-100);

  font-weight: var(--fw-semibold);
  color: var(--color-input-image-text);
}

label > div.with-preview {
  color: var(--color-input-image-exists-text);

  background-size: cover;
  background-position-y: center;
  background-repeat: no-repeat;
  border-image: linear-gradient(hsl(var(--color-black) / 0.5), hsl(var(--color-black) / 0.5)) fill 1;
}

.icon {
  block-size: var(--icon-size-lg);
  inline-size: var(--icon-size-lg);
}

label.active,
label:has(input:focus-visible) {
  outline: none;
  border: var(--border-width) solid var(--color-input-active);
  box-shadow: var(--shadow-input-field);
}

/* container queries */

@container (min-width: 37.25rem) {
  .inner {
    --input-size: var(--input-size-image-upload-lg);
    grid-template-columns: minmax(auto, var(--input-size-label-inline-max)) var(--input-size) 1fr;
    align-items: center;
  }

  .instructions {
    margin-block-start: 0;
    margin-inline-start: var(--space-100);
  }
}
</style>
