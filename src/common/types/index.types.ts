import type { ConsolaInstance, LogType } from 'consola';

import type { EnvType } from '@/common/schemas/env.schema';

export type LogCriticality = 'low' | 'medium' | 'high' | 'critical';

export interface LogPayload {
  level: LogType;
  criticality: LogCriticality;
  message: string;
  meta?: Record<string, unknown>;
  request?: any;
  response?: any;
}

export type LogInterceptor = (payload: LogPayload) => void | Promise<void>;

export interface LoggerOptions {
  intercept?: LogInterceptor;
  includeBody?: boolean;
}

export interface AppBindings {
  Bindings: EnvType;
  //   Variables: {};
}

declare module 'hono' {
  interface Context {
    log: ConsolaInstance;
  }
}
