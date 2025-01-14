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
    newUser: z.object({
      name: z.string().min(3, 'Nome muito curto'),
      email: customEmailValidation('Email inválido ou com caracteres inválidos'),
      birth: z.string().min(8, 'Data inválida').max(10),
      password: z.string().regex(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/), {
        message: 'A senha deve ter no mínimo: 8 digitos, 1 numero e 1 caracter especial',
      }),
      passwordConfirmation: z.string(),
    }),
  })
  .refine((data) => data.newUser.password === data.newUser.passwordConfirmation, {
    message: 'As senhas não conferem',
    path: ['newUser', 'passwordConfirmation'],
  });

// email: z
//   .string()
//   .email({ message: 'Email inválido' })
//   .regex(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), {
//     message: "somente letras, números, '@', '.', '-' e '_' permitidos",
//   }),
