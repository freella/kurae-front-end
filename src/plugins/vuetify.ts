import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

//tema escuro
const media = window.matchMedia('(prefers-color-scheme: dark)')

export const vuetify = createVuetify({

  //tema escuro 2
theme: {
        defaultTheme: media.matches ? 'dark' : 'light',
        themes: {
          light: {
            colors: {
              primary: '#1867C0',
              secondary: '#5CBBF6',
              background: '#F9FAFB',
             surface: '#FFFFFF',
             text: '#111827',
             middle: '#665185'
            },
          },
          dark: {
            colors: {
              primary: '#fbbbfb',
              secondary: '#d081f4',
              background: '#200637',
              surface: '#341e3b',
              text: '#f5f1f9',
              middle: '#c2ade1'
            },
          },
        },
    },

  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

//ouvinte para checar se precisa trocar tema
media.addEventListener('change', (e) => {
    vuetify.theme.global.name.value = e.matches ? 'dark' : 'light'
})