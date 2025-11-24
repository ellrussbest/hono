import { createRoute, z } from '@hono/zod-openapi';

import { StatusCodes } from 'http-status-codes';

import { createController } from '@/common/lib/create-app';
import {
  jsonContent,
  jsonContentOneOf,
} from '@/common/utils/json-content.util';

const otpController = createController();

otpController.openapi(
  createRoute({
    tags: ['Otp'],
    method: 'get',
    path: '/hello',
    responses: {
      [StatusCodes.OK]: jsonContent({
        description: 'Test API',
        schema: z.object({
          message: z.string(),
        }),
      }),
    },
  }),
  (c) => {
    return c.json(
      {
        message: 'Hello world',
      },
      StatusCodes.OK,
    );
  },
);

otpController.openapi(
  createRoute({
    tags: ['Otp'],
    method: 'get',
    path: '/goodbye',
    responses: {
      [StatusCodes.OK]: jsonContentOneOf({
        description: 'Test Api',
        schemas: [
          z.object({
            message: z.string(),
          }),
          z.object({
            msg: z.string(),
          }),
        ],
      }),
    },
  }),
  (c) => {
    return c.json({
      message: 'Goodbye world',
    });
  },
);

export { otpController };
