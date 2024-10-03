// https://nuxt.com/docs/api/configuration/nuxt-config

import { vuetifyOptions } from './vuetify';
import { eslintConfig } from './eslint';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module',
    '@nuxt/eslint',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate',
  ],
  vuetify: {
    vuetifyOptions: vuetifyOptions,
  },
  eslint: {
    config: eslintConfig,
  },
});
