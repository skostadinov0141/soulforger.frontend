// https://nuxt.com/docs/api/configuration/nuxt-config
import {DefaultPreset} from "./themes/default";

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate',
    '@primevue/nuxt-module',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
  ],
  primevue: {
    options: {
      theme: {
        preset: DefaultPreset,
        options: {
          darkModeSelector: '.app-dark',
        }
      }
    }
  },
});