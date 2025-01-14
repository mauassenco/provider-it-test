import { useSignInForm } from './useSignInForm';

import { Link } from 'react-router-dom';

import CustomInput from '../CustomInput';
import FormContainer from './../Layout/FormContainer';
import Spinner from '../Layout/Spinner/Spinner';
import OutContainer from '../Layout/OutContainer';
import { useEffect } from 'react';

const SignInForm = () => {
  const { isLoading, errors, hasUser, register, loginUser, handleUserLogOut, handleSubmit, setHasUser } =
    useSignInForm();

  useEffect(() => {
    const usersStorage = JSON.parse(localStorage.getItem('user_token') as string);
    if (usersStorage) {
      setHasUser(true);
    } else {
      setHasUser(false);
    }
  }, []);

  return hasUser ? (
    <FormContainer>
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <OutContainer>
          <h2>Logado com sucesso</h2>
          <Link to="/" onClick={handleUserLogOut}>
            Sair
          </Link>
        </OutContainer>
      )}
    </FormContainer>
  ) : (
    <FormContainer>
      <div>
        <form onSubmit={handleSubmit(loginUser)}>
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
        <OutContainer>
          <p>Não tem uma conta ? </p>
          <Link to="/signup">Criar conta</Link>
        </OutContainer>
      </div>
    </FormContainer>
  );
};

export default SignInForm;
