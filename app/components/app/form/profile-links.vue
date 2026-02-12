<script setup lang="ts">
import { AppConfirmDialog } from "#components";
import draggable from "vuedraggable";

import * as z from "zod";

defineProps<{
  loading: boolean;
}>();

const emit = defineEmits(["removeLink"]);

const REGEX_PROTOCOL = /^https:?$/;

const profileLinkSchema = z.object({
  id: z.any(),
  // platform: z.string("Can't be empty").nonempty("Can't be empty"),
  platform: z.enum(PlatformNames).optional(),
  url: z.string("Can't be empty").trim().nonempty("Can't be empty").check(z.url({ error: "Please check the URL" })),
  order: z.any(),
  userId: z.any(),
}).refine(
  (data) => {
    if (!URL.canParse(data.url))
      return false;
    const url = new URL(data.url);
    // const regexHostname = findPlatformHostnameRegex(data.platform);
    const regexHostname = data.platform ? platforms[data.platform]?.hostnameRegex : null;
    return REGEX_PROTOCOL.test(url.protocol)
      && regexHostname && regexHostname.test(url.hostname);
  },
  {
    message: "Please check the URL",
    path: ["url"],
  },
);

type ProfileLinkSchema = z.output<typeof profileLinkSchema>;
type PartialProfileLinkSchema = Partial<ProfileLinkSchema>;

const modelValue = defineModel<PartialProfileLinkSchema[]>();

const { form: profileLinksForm, handleSubmit } = useForm<PartialProfileLinkSchema[]>([], modelValue);

const toast = useToast();

function maxLinkItemOrder(links: PartialProfileLinkSchema[]) {
  // extract valid numeric orders only
  const orders = links
    .map(link => link.order)
    .filter(order => typeof order === "number");

  // if no valid orders, then return default of 0
  if (orders.length === 0)
    return 0;

  // return the highest order value
  return Math.max(...orders);
}

function normalizeLinkOrder(links: PartialProfileLinkSchema[]) {
  if (links.length === 0)
    return;
  return links.map((link, index) => ({
    ...link,
    order: index + 1,
  }));
}

function normalizeProfileLinksOrder() {
  profileLinksForm.value = normalizeLinkOrder(profileLinksForm.value) || [];
}

/* Add Link */

function handleAddLink() {
  // add a new link to the local array
  profileLinksForm.value.push({
    id: null,
    platform: "github",
    url: "",
    order: maxLinkItemOrder(profileLinksForm.value) + 1,
    userId: null,
  });
  toast.add({
    title: "A new link was added!",
    icon: "i-custom-icon-changes-saved",
    color: "success",
  });
}

/* Remove Link + Confirmation Modal */

const overlay = useOverlay();
const modal = overlay.create(AppConfirmDialog);

async function handleRemoveLink(linkIndex: number) {
  const instance = modal.open({
    title: "Are you sure?",
    description: "If you confirm, deleting this link can't be undone.",
    confirm: "Yes, I'm sure",
    cancel: "No, cancel",
  });

  const confirmDelete = await instance.result;

  if (confirmDelete) {
    // check if index out of bounds
    if (linkIndex < 0 || linkIndex >= profileLinksForm.value.length)
      return;

    const linkToDelete = profileLinksForm.value[linkIndex];

    if (!linkToDelete)
      return;

    if (linkToDelete.id === null) {
      // a new link that hasn't yet been saved to the state
      // so just splice it from the local copy of the links array
      profileLinksForm.value.splice(linkIndex, 1);
    }
    else {
      // an already-saved link in the state
      // so bubble it up and remove it using an API call
      emit("removeLink", linkToDelete.id);
    }
    toast.add({
      title: "The link was removed!",
      icon: "i-custom-icon-changes-saved",
      color: "success",
    });
  }
}

/* Drag and Drop */

const linksContainer = useTemplateRef("linksContainer");

/* Platforms List/Options + Utils */

const platformItems = Object.entries(platforms).map(([platformKey, platformValues]) => {
  return {
    value: platformKey,
    label: platformValues.label,
    icon: platformValues.icon,
  };
});
</script>

<template>
  <UForm
    :state="profileLinksForm"
    class="h-full"
    novalidate
    @submit.prevent="handleSubmit"
  >
    <UCard
      class="h-full flex flex-col"
      :ui="{
        root: 'bg-default text-default rounded-xl',
        header: 'border-b-0 p-6 sm:p-10',
        body: 'flex-1 space-y-6 pt-0 pb-6 px-6 sm:pt-0 sm:pb-10 sm:px-10',
        footer: 'sm:px-10 sm:py-6',
      }"
      variant="soft"
    >
      <template #header>
        <h1 class="mb-2 text-gray-900 font-bold text-2xl sm:text-[2rem]">
          Customize your links
        </h1>
        <p>Add/edit/remove links below and then share all your profiles with the world!</p>
      </template>

      <UButton
        variant="outline"
        label="+ Add new link"
        class="font-semibold h-10 sm:h-14 w-full justify-center mb-6 cursor-pointer"
        :disabled="loading"
        @click="handleAddLink"
      />

      <div v-if="profileLinksForm.length === 0" class="text-center p-6 rounded-xl bg-gray-50 min-h-119.75 grid content-center justify-items-center">
        <img
          src="/illustration-empty.svg"
          alt="Empty set of links"
          width="250"
          height="161"
          class="mx-auto mb-10"
        >
        <h2>Let’s get you started</h2>
        <p class="mt-6 max-w-122">
          Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!
        </p>
      </div>

      <fieldset
        ref="linksContainer"
        :disabled="loading"
        class="space-y-6"
      >
        <legend class="sr-only">
          Profile links
        </legend>

        <draggable
          v-model="profileLinksForm"
          item-key="id"
          class="space-y-6"
          handle=".drag-and-drop-handle"
          @end="normalizeProfileLinksOrder()"
        >
          <template #item="{ element, index }">
            <UForm
              :name="`${index}`"
              :schema="profileLinkSchema"
              class="bg-gray-50 rounded-xl p-4 sm:p-6 space-y-4"
              nested
            >
              <div class="flex items-center gap-2">
                <UButton
                  icon="i-custom-icon-drag-and-drop"
                  size="xs"
                  color="neutral"
                  variant="ghost"
                  class="p-0 drag-and-drop-handle cursor-grab outline-primary outline-offset-4 active:cursor-grabbing active:bg-transparent active:text-primary hover:bg-transparent hover:text-primary focus-visible:bg-transparent focus-visible:text-primary focus-visible:outline-solid focus-visible:outline-2"
                />
                <span class="font-bold">Link #{{ Number(index) + 1 }}</span>
                <UButton
                  label="Remove"
                  color="neutral"
                  variant="ghost"
                  class="ms-auto p-0 cursor-pointer outline-primary outline-offset-4 active:bg-transparent active:text-primary hover:bg-transparent hover:text-primary focus-visible:bg-transparent focus-visible:text-primary focus-visible:outline-solid focus-visible:outline-2"
                  @click="handleRemoveLink(index)"
                />
              </div>

              <UFormField
                label="Platform"
                name="platform"
              >
                <USelect
                  v-model="element.platform"
                  :items="platformItems"
                  :icon="element.platform ? platforms[element.platform as keyof typeof platforms]?.icon : undefined"
                  trailing-icon="i-custom-icon-chevron-down"
                  required
                />
              </UFormField>

              <UFormField
                label="Link"
                name="url"
              >
                <UInput
                  v-model="element.url"
                  icon="i-custom-icon-link"
                  :placeholder="element.platform ? platforms[element.platform as keyof typeof platforms]?.placeholder : undefined"
                  type="url"
                  required
                />
              </UFormField>
            </UForm>
          </template>
        </draggable>
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

<style scoped>
.sortable-ghost {
  opacity: 0.1;
  border: 1px dashed var(--color-grey-950);
}

.sortable-drag {
  border: 1px dashed var(--color-primary);
}
</style>
