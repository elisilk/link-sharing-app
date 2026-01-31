import "./server/utils/env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@pinia/nuxt",
    "nuxt-auth-utils",
  ],

  /* app config */
  app: {
    head: {
      titleTemplate: "devlinks - %s",
      title: "devlinks",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      meta: [
        {
          name: "description",
          content: "For developers to have a single place to share their multiple developer profiles across the web.",
        },
        {
          property: "og:description",
          content: "For developers to have a single place to share their multiple developer profiles across the web.",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:image",
          content: "https://link-sharing-app-eight-nu.vercel.app/link-sharing-app-share-image.png",
        },
        {
          property: "og:image:width",
          content: "1200",
        },
        {
          property: "og:image:height",
          content: "630",
        },
      ],
    },
  },

  /* Nuxt UI */
  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false,
  },
  icon: {
    customCollections: [{
      prefix: "custom",
      dir: "./app/assets/icons",
    }],
  },

  /* environment variables */
  runtimeConfig: {
    public: {
      blobStorageUrl: "",
      blobStorageBase: "",
    },
  },

  /* storage */
  nitro: {
    storage: {
      uploads: {
        driver: "vercel-blob",
        access: "public",
        base: "uploads",
      },
    },
    devStorage: {
      uploads: {
        driver: "fs",
        base: "./public/uploads",
      },
    },
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  imports: {
    dirs: [
      "server/db/schema",
    ],
  },
});
