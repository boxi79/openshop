import isNil from 'lodash/isNil';
import { axiosInstance as axios } from './axios.config';

const isProd = false;
export class Logger {
  static sendLog({ level = 'warn', error, message = '' }) {
    if (!isProd) return;
    axios({
      method: 'post',
      url: '/log',
      baseURL: '/',
      data: {
        level,
        message,
        error,
        type: 'client',
        userAgent: (window.navigator || {}).userAgent || 'unknown',
        timestamp: new Date().getTime(),
      },
    });
  }

  static error({ error, message }) {
    let parsedError;
    if (error instanceof Error) {
      parsedError = error.toString();
    } else if (!isNil(error)) {
      parsedError = JSON.stringify(error);
    }
    Logger.sendLog({ level: 'error', error: parsedError, message });
  }

  static warn({ message }) {
    Logger.sendLog({ level: 'warn', message });
  }
}
