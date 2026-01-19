export default defineAppConfig({
  ui: {
    colors: {
      primary: "purple",
      secondary: "blue",
      neutral: "grey",
    },
    button: {
      variants: {
        size: {
          xs: {
            leadingIcon: "size-3",
          },
        },
      },
    },
    formField: {
      slots: {
        label: "text-xs",
        error: "text-xs text-right sm:mt-0 sm:mr-4 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2",
      },
      variants: {
        required: {
          true: {
            label: "after:ms-0 after:text-inherit",
          },
        },
        orientation: {
          vertical: {
            container: "mt-2",
          },
          horizontal: {
            root: "flex-col gap-2 place-items-stretch sm:flex-row sm:gap-4 sm:place-items-baseline sm:justify-normal sm:[&>*:last-child]:flex-1 sm:[&>*:last-child]:m-w-0",
            wrapper: "w-60",
          },
        },
      },
    },
    input: {
      slots: {
        root: "w-full",
        base: ["rounded-lg focus:shadow-(--shadow-purple-600) placeholder:opacity-50"],
      },
      variants: {
        size: {
          md: {
            base: "text-base p-4 gap-4",
            leading: "ps-4",
            trailing: "pe-4",
            leadingIcon: "size-4",
          },
        },
      },
      compoundVariants: [
        {
          leading: true,
          size: "md",
          class: "ps-12",
        },
      ],
    },
    select: {
      slots: {
        base: ["w-full rounded-lg focus:shadow-(--shadow-purple-600)"],
      },
      variants: {
        size: {
          md: {
            base: "p-4 text-base gap-4",
            leading: "ps-4",
            trailing: "pe-4",
            leadingIcon: "size-4",
            trailingIcon: "size-3 group-data-[state=open]:rotate-180 transition-transform duration-200",
          },
        },
      },
      compoundVariants: [
        {
          leading: true,
          size: "md",
          class: "ps-12",
        },
        {
          trailing: true,
          size: "md",
          class: "pe-11",
        },
      ],
    },
    fileUpload: {
      slots: {
        root: "w-37.5 h-37.5 sm:w-48.25 sm:h-48.25 shrink-0",
        base: [
          "bg-gray-100 border-0 rounded-xl",
        ],
        label: "text-primary font-semibold",
      },
      variants: {
        variant: {
          area: {
            wrapper: "p-2",
            base: "p-0",
          },
        },
      },
    },
  },
});
