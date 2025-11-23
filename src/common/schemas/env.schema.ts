import * as z from 'zod';

export const EnvSchema = z.object({
  NODE_ENV: z.string().nonempty(),
});

export type EnvType = z.infer<typeof EnvSchema>;
