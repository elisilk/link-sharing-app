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

  /* Nuxt UI */
  app: {
    head: {
      title: "Link-sharing app",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
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
