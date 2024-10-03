import { de } from 'vuetify/locale';
import type { VOptions } from 'vuetify-nuxt-module';
import colors from 'vuetify/util/colors';

export const vuetifyOptions: VOptions = {
  locale: {
    locale: 'de',
    messages: { de },
  },
  defaults: {
    VTextField: {
      variant: 'solo-filled',
      hideDetails: 'auto',
      density: 'comfortable',
    },
    VAutocomplete: {
      variant: 'solo-filled',
      hideDetails: 'auto',
      density: 'comfortable',
    },
    VSelect: {
      variant: 'solo-filled',
      hideDetails: 'auto',
      density: 'comfortable',
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.blue.darken2,
          surface: colors.grey.lighten5,
          background: colors.grey.lighten4,
          secondary: colors.lightBlue.darken1,
          accent: colors.orange.base,
          error: colors.red.lighten1,
          warning: colors.amber.lighten1,
          info: colors.cyan.lighten1,
          success: colors.lightGreen.lighten1,
        },
      },
      dark: {
        dark: false,
        colors: {
          primary: colors.blue.darken2,
          surface: colors.grey.darken4,
          background: '#121212',
          secondary: colors.lightBlue.darken1,
          accent: colors.orange.base,
          error: colors.red.lighten1,
          warning: colors.amber.lighten1,
          info: colors.cyan.lighten1,
          success: colors.lightGreen.lighten1,
        },
      },
    },
  },
};
