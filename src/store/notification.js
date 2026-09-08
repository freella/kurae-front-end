import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    show: false,
    message: '',
    color: 'success',
  }),

  actions: {
    success(message) {
      this.message = message
      this.color = 'success'
      this.show = true
    },
    error(message) {
      this.message = message
      this.color = 'error'
      this.show = true
    },
    close() {
      this.show = false
    },
  },
})