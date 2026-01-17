<script setup lang="ts">
import * as z from "zod";

const profileLinkSchema = z.object({
  id: z.any(),
  platform: z.string("Can't be empty").nonempty("Can't be empty"),
  url: z.string("Can't be empty").nonempty("Can't be empty").check(z.url("Please check the URL")),
  order: z.any(),
});

type ProfileLinkSchema = z.output<typeof profileLinkSchema>;
type PartialProfileLinkSchema = Partial<ProfileLinkSchema>;

const modelValue = defineModel<PartialProfileLinkSchema[]>();

const { form: profileLinksForm, handleSubmit } = useForm<PartialProfileLinkSchema[]>([], modelValue);

const toast = useToast();

function maxLinkItemOrder(links: PartialProfileLinkSchema[]) {
  if (links.length === 0)
    return 0;
  return links.reduce((prevMax, currentItem) => currentItem.order > prevMax ? currentItem.order : prevMax, -Infinity);
}

function handleAddLink() {
  // add a new link to the local array
  profileLinksForm.value.push({
    id: undefined,
    platform: "",
    url: "",
    order: maxLinkItemOrder(profileLinksForm.value) + 1,
  });
  toast.add({
    title: "A new link was added!",
    icon: "i-custom-icon-changes-saved",
    color: "success",
  });
}

function handleRemoveLink(linkId: number) {
  toast.add({
    title: `The link was removed! (${linkId})`,
    icon: "i-custom-icon-changes-saved",
    color: "success",
  });
}

const platformItems = platforms.map((platform) => {
  return {
    label: platform.name,
    value: platform.name,
    icon: platform.icon,
  };
});

function findPlatformIcon(platformName: string | undefined) {
  if (!platformName)
    return null;
  const platform = platforms.find(item => item.name === platformName);
  if (!platform)
    return null;
  return platform.icon;
}
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
        header: 'border-b-0',
        body: 'flex-1 space-y-6',
      }"
      variant="soft"
    >
      <template #header>
        <h1 class="text-5xl font-bold">
          Customize your links
        </h1>
        <p>Add/edit/remove links below and then share all your profiles with the world!</p>
      </template>

      <UButton
        variant="outline"
        label="+ Add new link"
        class="w-full justify-center mb-6"
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

      <UForm
        v-for="link, count in profileLinksForm"
        :key="link.id"
        :name="`${count}`"
        :schema="profileLinkSchema"
        class="bg-gray-50 rounded-xl p-4 sm:p-6"
        nested
      >
        <div class="flex items-center">
          <UButton
            variant="ghost"
            icon="i-custom-icon-drag-and-drop"
            class="xs"
          />
          <span>Link #{{ count + 1 }}</span>
          <UButton
            label="Remove"
            variant="ghost"
            class="ms-auto"
            @click="handleRemoveLink(link.id)"
          />
        </div>

        <UFormField
          label="Platform"
          name="platform"
        >
          <USelect
            v-model="link.platform"
            :items="platformItems"
            :icon="findPlatformIcon(link.platform)"
            class="w-full"
            :ui="{
              base: 'py-4',
            }"
            required
          />
        </UFormField>

        <UFormField
          label="Link"
          name="url"
        >
          <UInput
            v-model="link.url"
            type="url"
            class="w-full"
            required
          />
        </UFormField>
      </UForm>

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
