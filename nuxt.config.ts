// https://nuxt.com/docs/api/configuration/nuxt-config

import {vuetifyOptions} from "./vuetify";

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', '@nuxt/eslint'],
  vuetify:{
    vuetifyOptions: vuetifyOptions
  }
})