import { LogLevel } from '@/utils/logLevels'

const isDev = import.meta.env.DEV

const log = (level: LogLevel, message: string, data?: any) => {

  const logEntry = {
    level,
    message,
    data,
    timestamp: new Date().toISOString()
  }

  if (isDev) {
    console[level === LogLevel.ERROR ? 'error' : 'log'](logEntry)
  }

}

export const logger = {

  info(message: string, data?: any) {
    log(LogLevel.INFO, message, data)
  },

  warn(message: string, data?: any) {
    log(LogLevel.WARN, message, data)
  },

  error(message: string, data?: any) {
    log(LogLevel.ERROR, message, data)
  },

  debug(message: string, data?: any) {
    if (import.meta.env.DEV) {
      log(LogLevel.DEBUG, message, data)
    }
  }

}