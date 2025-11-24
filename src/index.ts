import { configureOpenApi } from '@/common/lib/configure-open-api';
import { createApp } from '@/common/lib/create-app';
import { App } from '@/common/types/index.types';
import { otpController } from '@/otp/otp.controller';

const app = createApp();
configureOpenApi(app);

const routes: {
  path: string;
  app: App;
}[] = [{ path: '/otp', app: otpController }];

routes.forEach((route) => {
  app.route(route.path, route.app);
});

export default app;
