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
      compoundVariants: [
        {
          color: "primary",
          variant: "solid",
          class: "font-semibold h-14 px-6 rounded-lg cursor-pointer active:shadow-(--shadow-purple-600)",
        },
        {
          color: "primary",
          variant: "outline",
          class: "font-semibold h-14 px-6 rounded-lg cursor-pointer active:shadow-(--shadow-purple-600)",
        },
      ],
    },
    formField: {
      slots: {
        label: "text-xs",
        error: "text-xs text-right",
        help: "text-xs",
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
            error: "sm:mt-0 sm:mr-4 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2",
          },
          horizontal: {
            root: "flex-col gap-2 items-stretch not-first:mt-2 @xs:flex-row @xs:gap-4 @xs:items-center @xs:not-first:mt-4 @xs:[&>*:first-child]:flex-none @xs:[&>*:first-child]:w-60 @xs:[&>*:last-child]:flex-auto",
            error: "@xs:mt-0 @xs:mr-4 @xs:absolute @xs:right-0 @xs:top-1/2 @xs:-translate-y-1/2",
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
  },
});
