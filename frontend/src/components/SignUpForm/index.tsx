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
            {...register('name')}
            placeholder="Digite seu nome"
            label="Nome"
            helpertext={errors.name?.message}
          />

          <CustomInput
            {...register('email')}
            placeholder="Digite seu email"
            label="Email"
            helpertext={errors.email?.message}
          />

          <CustomInput
            {...register('birth')}
            placeholder="Digite sua data de nascimento (dd/mm/aaaa)"
            label="Data de nascimento"
            helpertext={errors.birth?.message}
            onChange={handleInputChange}
            value={birthDate}
            maxLength={10}
          />

          <CustomInput
            {...register('password')}
            placeholder="Crie uma senha"
            label="Senha"
            type="password"
            helpertext={errors.password?.message}
          />

          <CustomInput
            {...register('confirmPassword')}
            placeholder="Repita a senha criada"
            label="Confirme a senha"
            type="password"
            helpertext={errors.confirmPassword?.message}
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
