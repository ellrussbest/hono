import type { MiddlewareHandler } from 'hono';

import type { LogType } from 'consola';
import consola from 'consola';
import { differenceInMilliseconds } from 'date-fns';

import type {
  LogCriticality,
  LogPayload,
  LoggerOptions,
} from '@/common/types/index.types';

export function createLogger(options: LoggerOptions = {}): MiddlewareHandler {
  const intercept = options.intercept;
  const log = consola.withTag('http');

  return async (c, next) => {
    c.log = consola;
    let requestBody: any;
    const isDevelopment = c.env.NODE_ENV === 'development';
    const method = c.req.method;

    if (method !== 'GET' && method !== 'HEAD') {
      const contentType = c.req.header('Content-Type');
      if (contentType?.includes('application/json')) {
        try {
          requestBody = await c.req.json();
        } catch (e) {
          log.warn('Could not parse request body as JSON:', e);
          requestBody = { _body_parsing_error: true };
        }
      }
    }

    const start = new Date();
    await next();
    const end = new Date();
    const duration = differenceInMilliseconds(end, start);
    const status = c.res.status;

    const criticality: LogCriticality =
      status >= 500
        ? 'critical'
        : status >= 400
          ? 'high'
          : status >= 300
            ? 'medium'
            : 'low';

    const level: LogType =
      status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info';

    const message = `${c.req.method} ${c.req.path} → ${status} (${duration}ms)`;

    const shouldIncludeDetails =
      criticality === 'high' || criticality === 'critical';

    const requestHeaders = shouldIncludeDetails
      ? Object.fromEntries(c.req.raw.headers.entries())
      : undefined;

    const responseHeaders = shouldIncludeDetails
      ? Object.fromEntries(c.res.headers.entries())
      : undefined;

    const requestBodyForLog =
      shouldIncludeDetails && requestBody !== undefined
        ? requestBody
        : undefined;

    const payload: LogPayload = {
      level,
      criticality,
      message,
      meta: {
        method: c.req.method,
        path: c.req.path,
        status,
        duration: `${duration}ms`,
      },
      request: {
        method: c.req.method,
        path: c.req.path,
        url: c.req.url,
        ...(requestHeaders && { headers: requestHeaders }),
        ...(requestBodyForLog && { body: requestBodyForLog }),
      },
      response: {
        status: c.res.status,
        statusText: c.res.statusText,
        ...(responseHeaders && { headers: responseHeaders }),
      },
    };

    let logData: string | LogPayload;
    if (isDevelopment) {
      logData = JSON.stringify(payload, null, 2);
    } else {
      logData = payload;
    }

    log[level](payload.message, logData);

    if (intercept) {
      await intercept(payload);
    }
  };
}
