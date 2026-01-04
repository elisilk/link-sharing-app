export default defineAppConfig({
  ui: {
    colors: {
      primary: "purple",
      secondary: "blue",
      neutral: "grey",
    },
    card: { },
    input: {
      slots: {
        base: ["rounded-lg"],
      },
      variants: {
        size: {
          md: {
            base: "p-4",
          },
        },
      },
    },
    formField: {
      slots: {
        error: "mt-0 mr-4 absolute right-0 top-1/2 -translate-y-1/2",
      },
    },
  },
});
