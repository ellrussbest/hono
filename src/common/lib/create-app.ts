import { OpenAPIHono } from '@hono/zod-openapi';

import consola from 'consola';

import { createLogger } from '@/common/middleware/logger.middleware';
import { notFound } from '@/common/middleware/not-found.middleware';
import { onError } from '@/common/middleware/on-error.middleware';
import type { AppBindings } from '@/common/types/index.types';

export function createController() {
  return new OpenAPIHono<AppBindings>({ strict: false });
}

export function createApp() {
  const app = createController();

  app.notFound(notFound);
  app.onError(onError);
  app.use(
    createLogger({
      intercept: async (payload) => {
        if (payload.criticality === 'critical') {
          consola.error('Critical error', payload.message);
        }
      },
    }),
  );

  return app;
}
