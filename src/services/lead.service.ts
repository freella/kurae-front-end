import api from './api'

interface LeadPayload {
  name: string
  email: string
}

export const leadService = {
  async create(payload: LeadPayload) {
    const { data } = await api.post('/api/leads/', payload)
    return data
  },
}