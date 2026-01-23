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
        error: "text-xs text-right sm:mt-0 sm:mr-4 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2",
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
        root: "w-37.5 h-37.5 sm:w-48.25 sm:h-48.25 shrink-0 rounded-xl bg-gray-100",
        base: [
          "rounded-xl bg-transparent border-0 z-1 text-primary hover:text-primary/75 focus-visible:text-primary/75 data-[dragging=true]:text-primary/75 hover:bg-inverted",
        ],
        icon: "text-inherit size-10",
        label: "font-semibold text-inherit",
        file: "z-0 rounded-xl after:rounded-xl after:absolute after:inset-0 after:bg-black after:opacity-50",
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
