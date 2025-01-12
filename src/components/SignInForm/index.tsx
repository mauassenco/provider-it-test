import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import CustomInput from '../CustomInput';
import FormContainer from './../Layout/FormContainer';

type LoginDataProps = z.infer<typeof loginSchema>;

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha muito curta'),
});

const SignInForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginDataProps>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
  });

  return (
    <FormContainer>
      <div>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <h2>Login</h2>
          <CustomInput
            {...register('email')}
            type="email"
            placeholder="Digite seu email"
            label="Email"
            helpertext={errors.email?.message}
          />
          <CustomInput
            {...register('password')}
            type="password"
            placeholder="Digite sua senha"
            label="Senha"
            helpertext={errors.password?.message}
          />

          <button type="submit">Entrar</button>
        </form>
      </div>
    </FormContainer>
  );
};

export default SignInForm;
