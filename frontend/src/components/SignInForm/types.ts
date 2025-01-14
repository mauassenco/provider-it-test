import type { z } from 'zod';
import type { loginSchema } from './schema';

export type LoginDataProps = z.infer<typeof loginSchema>;

export type AuthType = {
  email: string;
  password: string;
};
