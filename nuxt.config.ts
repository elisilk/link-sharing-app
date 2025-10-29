// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/icon", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  eslint: {
    config: {
      standalone: false,
    },
  },
  icon: {
    customCollections: [
      {
        prefix: "my-icon",
        dir: "./app/assets/icons",
      },
    ],
  },

});
