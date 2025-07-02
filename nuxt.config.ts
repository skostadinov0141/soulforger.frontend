// https://nuxt.com/docs/api/configuration/nuxt-config
import { DefaultPreset } from './themes/default';

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate',
    '@primevue/nuxt-module',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
  ],
  imports: {
    dirs: [
      'composables/**',
    ],
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost:3001/api',
    },
  },
  compatibilityDate: '2024-04-03',
  eslint: {
    config: {
      stylistic: true,
    },
  },
  primevue: {
    options: {
      theme: {
        preset: DefaultPreset,
        options: {
          darkModeSelector: '.app-dark',
        },
      },
    },
  },
});
