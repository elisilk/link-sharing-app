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

  /* storage */
  nitro: {
    storage: {
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
