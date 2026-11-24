import api from './api'

export interface LeadPayload {
  name: string
  email: string
  message: string
  phone?: string
  privacy_accepted: boolean
  privacy_policy_version?: string
  website?: string
  turnstile_token?: string
}

export interface LeadCreateResponse {
  message: string
}

export const leadService = {
  async create(payload: LeadPayload): Promise<LeadCreateResponse> {
    // Coleta mínima: envia apenas os campos efetivamente preenchidos/necessários
    const sanitizedPayload: LeadPayload = {
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      message: payload.message.trim(),
      privacy_accepted: payload.privacy_accepted,
    }

    if (payload.phone?.trim()) {
      sanitizedPayload.phone = payload.phone.trim()
    }
    if (payload.privacy_policy_version) {
      sanitizedPayload.privacy_policy_version = payload.privacy_policy_version
    }
    if (payload.website) {
      sanitizedPayload.website = payload.website
    }
    if (payload.turnstile_token) {
      sanitizedPayload.turnstile_token = payload.turnstile_token
    }

    const { data } = await api.post<LeadCreateResponse>('/api/leads/', sanitizedPayload)
    return data
  },
}
