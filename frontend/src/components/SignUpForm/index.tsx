import { Link } from 'react-router-dom';

import { useSignUpForm } from './useSignUpForm';

import FormContainer from './../Layout/FormContainer';
import CustomInput from '../CustomInput';
import Spinner from '../Layout/Spinner/Spinner';
import OutContainer from '../Layout/OutContainer';

const SignUpForm = () => {
  const {
    isCreated,
    isLoading,
    birthDate,
    errors,
    register,
    setIsCreated,
    createUser,
    handleInputChange,
    handleSubmit,
  } = useSignUpForm();

  return isCreated ? (
    <FormContainer>
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <OutContainer>
            <h2>Cadastro criado com sucesso</h2>
            <Link to="/signin" onClick={() => setIsCreated(false)}>
              Acessar
            </Link>
          </OutContainer>
        )}
      </div>
    </FormContainer>
  ) : (
    <FormContainer>
      <div>
        <form onSubmit={handleSubmit(createUser)}>
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
            type="password"
            helpertext={errors.newUser?.password?.message}
          />

          <CustomInput
            {...register('newUser.passwordConfirmation')}
            placeholder="Repita a senha criada"
            label="Confirme a senha"
            type="password"
            helpertext={errors.newUser?.passwordConfirmation?.message}
          />

          <button type="submit">Cadastrar</button>
        </form>

        <OutContainer>
          <p>Já possui uma conta ? </p>
          <Link to="/signin">Acessar</Link>
        </OutContainer>
      </div>
    </FormContainer>
  );
};

export default SignUpForm;
