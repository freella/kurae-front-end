import api from './api'

interface LoginPayload {
  email: string
  password: string
}

interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    name: string
    email: string
  }
}

export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await api.post<AuthResponse>('/auth/login', payload)
    return data
  },

  async refresh(refreshToken: string) {
    const { data } = await api.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    })
    return data
  },

  async logout() {
    await api.post('/auth/logout')
  },
}