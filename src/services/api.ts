import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

import { useAuthStore } from '@/store/auth.store'
import { useLoaderStore } from '@/store/loader.store'
import { logger } from '@/services/logger'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  timeout: 10000,
})

/**
 * REQUEST INTERCEPTOR
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const auth = useAuthStore()
    const loader = useLoaderStore()

    loader.show()

    if (auth.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`
    }

    logger.debug('API REQUEST', {
      method: config.method,
      url: config.url,
      params: config.params,
      data: config.data,
    })

    return config
  },

  (error: AxiosError) => {
    const loader = useLoaderStore()

    loader.hide()

    logger.error('API REQUEST ERROR', error)

    return Promise.reject(error)
  },
)

/**
 * RESPONSE INTERCEPTOR
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    const loader = useLoaderStore()

    loader.hide()

    logger.debug('API RESPONSE', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    })

    return response
  },

  (error: AxiosError) => {
    const loader = useLoaderStore()
    const auth = useAuthStore()

    loader.hide()

    logger.error('API RESPONSE ERROR', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    })

    /**
     * Token expirado ou inválido
     */
    if (error.response?.status === 401) {
      logger.warn('Unauthorized - logout triggered')
      auth.logout()
    }

    /**
     * Erro de servidor
     */
    if (error.response?.status === 500) {
      logger.error('Server error', error.response.data)
    }

    return Promise.reject(error)
  },
)

export default api