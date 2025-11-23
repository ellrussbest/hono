import { app } from '@/app';

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default app;
