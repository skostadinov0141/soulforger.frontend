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
    '@nuxtjs/i18n',
  ],
  imports: {
    dirs: [
      'composables/**',
    ],
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost:3001',
    },
  },
  compatibilityDate: '2024-04-03',
  eslint: {
    config: {
      stylistic: true,
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'de', name: 'Deutsch', file: 'de.json' },
    ],
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
