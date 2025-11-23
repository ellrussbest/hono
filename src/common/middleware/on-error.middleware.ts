import type { ErrorHandler } from 'hono';

import type { ContentfulStatusCode } from 'hono/utils/http-status';

import {
  INTERNAL_SERVER_ERROR_CODE,
  OK_CODE,
} from '@/common/consts/http/http-status-codes.const';

export const onError: ErrorHandler = (err, c) => {
  const currentStatus =
    'status' in err ? err.status : c.newResponse(null).status;
  const statusCode =
    currentStatus !== OK_CODE
      ? (currentStatus as ContentfulStatusCode)
      : INTERNAL_SERVER_ERROR_CODE;

  const env = c.env.NODE_ENV;
  return c.json(
    {
      message: err.message,

      stack: env === 'production' ? undefined : err.stack,
    },
    statusCode,
  );
};
