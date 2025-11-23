import { OpenAPIHono } from '@hono/zod-openapi';

import consola from 'consola';

import { createLogger } from '@/common/middleware/logger.middleware';
import { notFound } from '@/common/middleware/not-found.middleware';
import { onError } from '@/common/middleware/on-error.middleware';
import { EnvSchema } from '@/common/schemas/env.schema';
import type { AppBindings } from '@/common/types/index.types';

const app = new OpenAPIHono<AppBindings>();

app.use('*', async (c, next) => {
  try {
    EnvSchema.parse(c.env);
    await next();
  } catch {
    return c.json({ error: 'Server Configuration Error' }, 500);
  }
});
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

export { app };
