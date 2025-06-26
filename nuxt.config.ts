// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate',
    '@primevue/nuxt-module',
  ],
  primevue: {
    /* Configuration */
  },
});
