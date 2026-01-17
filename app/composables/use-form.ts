import type { ModelRef } from "vue";

export function useForm<T>(defaultValue: T, modelValue?: ModelRef<T | null | undefined>) {
  // create the local copy
  const form = ref<T>(clone(modelValue?.value) || defaultValue);

  // add support for no v-model provided with a conditional
  if (modelValue) {
    // still supporting data change coming DOWN from the parent
    watch(modelValue, () => {
      form.value = clone(modelValue.value);
    }, { deep: true });
  }

  function clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }

  function handleSubmit() {
    // console.log("handling submit", modelValue);
    if (!modelValue)
      return; // also required if no v-model
    modelValue.value = clone(form.value);
  }

  // expose the local data and the submit function to the form component
  return {
    form,
    handleSubmit,
  };
}
