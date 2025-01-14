import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema } from './schema';
import type { LoginDataProps } from './types';
import { useLoginStore } from '../../store/login';
import { api } from '../../services/axiosClient';

export const useSignInForm = () => {
  const { isLoading, hasUser, setIsloading, setHasUser } = useLoginStore();

  const signIn = (email: string) => {
    const token = Math.random().toString(36).substring(2);
    localStorage.setItem('user_token', JSON.stringify({ email, token }));
    setHasUser(true);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginDataProps>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
  });

  const handleUserLogOut = () => {
    localStorage.removeItem('user_token');
    setHasUser(false);
  };

  const loginUser = async (loginData: LoginDataProps): Promise<void> => {
    try {
      const response = await api.post('/auth', loginData);
      console.log('Usuário logado com sucesso:', response.data);
      setIsloading(true);
      signIn(loginData.email);
      setTimeout(() => {
        setIsloading(false);
      }, 1000);
      console.log(response);
    } catch (error) {
      console.error('Erro ao logar o usuário:', error);
      //Somente para testes, uma vez que não temos o backend
      setIsloading(true);
      signIn(loginData.email);
      setTimeout(() => {
        setIsloading(false);
      }, 1000);
    }
  };
  return {
    isLoading,
    errors,
    hasUser,
    setHasUser,
    signIn,
    handleUserLogOut,
    loginUser,
    handleSubmit,
    register,
  };
};
