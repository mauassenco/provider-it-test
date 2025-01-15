import type { z } from 'zod';
import type { signUpSchema } from './schema';

export type SignUpFormProps = z.infer<typeof signUpSchema>;

export type SignUpProps = {
  name: string;
  email: string;
  birth: string;
  password: string;
  confirmPassword: string;
};
