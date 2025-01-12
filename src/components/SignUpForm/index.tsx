import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

import FormContainer from './../Layout/FormContainer';
import CustomInput from '../CustomInput';

type SignUpDataProps = z.infer<typeof signUpSchema>;

const signUpSchema = z
  .object({
    newUser: z.object({
      name: z.string().min(3, 'Nome muito curto'),
      email: z.string().email('Email inválido'),
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

const SignUpForm = () => {
  const [birthDate, setBirthDate] = useState('');

  const handleInputChange = (e: { target: { value: string } }) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedBirthDate = value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2');
    setBirthDate(formattedBirthDate);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpDataProps>({
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      newUser: {
        name: '',
        email: '',
        birth: '',
        password: '',
        passwordConfirmation: '',
      },
    },
  });

  const handleNewUserSubmit = (data: SignUpDataProps) => {
    console.log(data);
  };

  console.log({ errors });

  return (
    <FormContainer>
      <div>
        <form onSubmit={handleSubmit(handleNewUserSubmit)}>
          <h2>Cadastro</h2>

          <CustomInput
            {...register('newUser.name')}
            placeholder="Digite seu nome"
            label="Nome"
            helpertext={errors.newUser?.name?.message}
          />

          <CustomInput
            {...register('newUser.email')}
            placeholder="Digite seu email"
            label="Email"
            helpertext={errors.newUser?.email?.message}
          />

          <CustomInput
            {...register('newUser.birth')}
            placeholder="Digite sua data de nascimento (dd/mm/aaaa)"
            label="Data de nascimento"
            helpertext={errors.newUser?.birth?.message}
            onChange={handleInputChange}
            value={birthDate}
            maxLength={10}
          />

          <CustomInput
            {...register('newUser.password')}
            placeholder="Crie uma senha"
            label="Senha"
            helpertext={errors.newUser?.password?.message}
          />

          <CustomInput
            {...register('newUser.passwordConfirmation')}
            placeholder="Repita a senha criada"
            label="Confirme a senha"
            helpertext={errors.newUser?.passwordConfirmation?.message}
          />

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </FormContainer>
  );
};

export default SignUpForm;
