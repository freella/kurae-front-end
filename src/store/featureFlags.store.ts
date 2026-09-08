import { defineStore } from 'pinia'
import { featureFlags } from '@/config/featureFlags'

export const useFeatureFlagsStore = defineStore('featureFlags', {
  state: () => ({
    flags: { ...featureFlags }
  }),

  actions: {
    enable(flag: keyof typeof featureFlags) {
      this.flags[flag] = true
    },

    disable(flag: keyof typeof featureFlags) {
      this.flags[flag] = false
    },

    isEnabled(flag: keyof typeof featureFlags) {
      return this.flags[flag]
    }
  }
})