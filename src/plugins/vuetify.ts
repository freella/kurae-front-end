import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import type { ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

/**
 * Paleta oficial Kurae — espelho do bloco @theme em src/assets/main.css.
 * O Vuetify só aceita hex (não aceita var()), então qualquer alteração de cor
 * deve ser feita nos dois arquivos.
 * A tipografia (Surgena / Sora) é aplicada em main.css, não aqui.
 */
const palette = {
  // Destaque / logo
  'cyan-neon': '#2ef8fd',
  'cyan-vibrant': '#16defd',
  turquoise: '#5dfced',
  'sky-electric': '#04bcfd',

  // Fundos / superfícies
  'deep-blue': '#04152b',
  petrol: '#073b53',
  'dark-blue': '#011656',
  graphite: '#151c25',
  'deep-teal': '#01383d',
  navy: '#205fbe',

  // Texto claro (fora da paleta oficial — confirmar com o design)
  ice: '#eef7fa',
}

const kuraeTheme: ThemeDefinition = {
  dark: true,
  colors: {
    ...palette,

    primary: palette['cyan-vibrant'],
    'on-primary': palette['deep-blue'],
    secondary: palette['sky-electric'],
    'on-secondary': palette['deep-blue'],
    accent: palette.turquoise,
    'on-accent': palette['deep-blue'],
    highlight: palette['cyan-neon'],

    background: palette['deep-blue'],
    'on-background': palette.ice,
    surface: palette.petrol,
    'on-surface': palette.ice,
    'surface-variant': palette.graphite,
    'on-surface-variant': palette.ice,
    outline: palette.navy,

    // Estados: não existem na paleta oficial; iguais aos defaults dark do Vuetify
    error: '#cf6679',
    warning: '#fb8c00',
    success: '#4caf50',
    info: '#2196f3',
  },
}

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'kurae',
    themes: {
      kurae: kuraeTheme,
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