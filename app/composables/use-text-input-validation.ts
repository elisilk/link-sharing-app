// interface ValidityState {
//   badInput: boolean;
//   customError: boolean;
//   patternMismatch: boolean;
//   rangeOverflow: boolean;
//   rangeUnderflow: boolean;
//   stepMismatch: boolean;
//   tooLong: boolean;
//   tooShort: boolean;
//   typeMismatch: boolean;
//   valid: boolean;
//   valueMissing: boolean;
// }

// type validityKeys = keyof ValidityState;
type errorTypes = keyof ValidityState | "unknown" | null;

const validityProperties: Array<keyof ValidityState> = [
  "badInput",
  "customError",
  "patternMismatch",
  "rangeOverflow",
  "rangeUnderflow",
  "stepMismatch",
  "tooLong",
  "tooShort",
  "typeMismatch",
  /* "valid", */
  "valueMissing",
];

// type ValidityMessages = Array<Partial<Record<keyof ValidityState, string>>>;

export type errorMessagesType = Partial<Record<keyof ValidityState, string>>;

export function useTextInputValidation(inputRefId: string, errors: errorMessagesType) {
  const thisInput = useTemplateRef<HTMLInputElement>(toValue(inputRefId));
  const errorMessages = toValue(errors);

  // A dummy reactive value to trigger the reevaluation of computed properties
  const updated = ref<number>(0);

  // flag if the input has been interacted with yet
  const dirty = ref<boolean>(false);

  // currently evaluated errors on the input
  const error = ref<errorTypes>(null);

  // reactive function to return a particular input's current error message
  const errorMessage = computed<string | null | undefined>(() => {
    if (error.value === null)
      return "No error found";
    if (error.value === "unknown")
      return "An unknown error was found";
    if (errorMessages[error.value] === undefined)
      return `Error: ${error.value}`;
    return errorMessages[error.value];
  });

  // reactive function to check if this input is currently invalid
  const isInvalid = computed(
    () => !!thisInput.value && !!updated.value && dirty.value && !thisInput.value.validity.valid,
  );

  const isValid = computed(() => !isInvalid.value);

  function identifyError(): errorTypes {
    if (!thisInput.value || !thisInput.value.validity)
      return null;

    if (thisInput.value.validity.valid)
      return null;

    // special case where can be both 'badInput' and 'valueMissing', so choosing to return 'badInput' first
    if (thisInput.value.validity.badInput)
      return "badInput";

    for (const key of validityProperties) {
      if (thisInput.value.validity[key])
        return key;
    }

    return "unknown";
  }

  // remove any existing errors
  function resetErrors() {
    error.value = null;
  }

  // check if input is valid and then add/delete that input's error messages to the global list of currently evaluated errors
  function validate() {
    // if not yet mounted
    if (!thisInput.value || !thisInput.value.validity)
      return;

    // update dummy trigger so that computed properties are also updated
    updated.value++;

    // input now interacted with
    dirty.value = true;

    isValid.value
      ? resetErrors() // input is valid, so clear error
      : (error.value = identifyError()); // input not valid, so save the error type
  }

  return {
    isValid,
    isInvalid,
    errorMessage,
    resetErrors,
    validate,
  };
}
