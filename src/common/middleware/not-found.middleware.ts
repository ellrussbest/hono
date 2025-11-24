import type { NotFoundHandler } from 'hono';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const notFound: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `${StatusCodes.NOT_FOUND} - ${c.req.path}`,
    },
    ReasonPhrases.NOT_FOUND,
  );
};
