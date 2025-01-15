import { z } from 'zod';

const customEmailValidation = (message: string) =>
  z.string().refine(
    (value) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(value);
    },
    {
      message,
    },
  );

export const signUpSchema = z
  .object({
    name: z.string().min(3, 'Nome muito curto'),
    email: customEmailValidation('Email inválido ou com caracteres inválidos'),
    birth: z.string().min(8, 'Data inválida').max(10),
    password: z.string().regex(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/), {
      message: 'A senha deve ter no mínimo: 8 digitos, 1 numero e 1 caracter especial',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['newUser', 'confirmPassword'],
  });
