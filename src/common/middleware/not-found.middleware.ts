import type { NotFoundHandler } from 'hono';

import { NOT_FOUND_CODE } from '@/common/consts/http/http-status-codes.const';
import { NOT_FOUND_MESSAGE } from '@/common/consts/http/http-status-messages.const';

export const notFound: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `${NOT_FOUND_MESSAGE} - ${c.req.path}`,
    },
    NOT_FOUND_CODE,
  );
};
