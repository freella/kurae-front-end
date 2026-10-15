import { defineStore } from 'pinia'

interface LoaderState {
  loading: boolean
}

export const useLoaderStore = defineStore('loader', {
  state: (): LoaderState => ({
    loading: false,
  }),
  actions: {
    show() {
      this.loading = true
    },
    hide() {
      this.loading = false
    },
  },
})
