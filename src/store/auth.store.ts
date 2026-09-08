import { defineStore } from 'pinia'
import { authService } from '@/services/auth.service'

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    // convenience alias used by api.ts and other modules
    token: (state) => state.accessToken,
  },

  actions: {
    async login(payload: { email: string; password: string }) {
      const data = await authService.login(payload)

      this.user = data.user
      this.accessToken = data.accessToken
      this.refreshToken = data.refreshToken

      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
    },

    async logout() {
      this.user = null
      this.accessToken = null
      this.refreshToken = null

      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    },

    async refresh() {
      if (!this.refreshToken) return

      const data = await authService.refresh(this.refreshToken)

      this.accessToken = data.accessToken
      this.refreshToken = data.refreshToken

      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
    },
  },
})