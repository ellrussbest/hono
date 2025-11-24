import { Scalar } from '@scalar/hono-api-reference';

import { App } from '@/common/types/index.types';

import packageJSON from '~/package.json';

export function configureOpenApi(app: App) {
  app.doc('/', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Ifkafin Backend',
      description: 'Ifkafin Backend APIs',
    },
  });

  app.get(
    '/api',
    Scalar({
      url: '/',
      pageTitle: 'Ifkafin Backend APIs',
      theme: 'bluePlanet',
    }),
  );
}
