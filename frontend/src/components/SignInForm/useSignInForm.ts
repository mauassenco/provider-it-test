import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema } from './schema';
import type { LoginDataProps } from './types';
import { useLoginStore } from '../../store/login';
import { api } from '../../services/axiosClient';

export const useSignInForm = () => {
  const { isLoading, hasUser, setIsloading, setHasUser } = useLoginStore();

  const signIn = (email: string, token: string) => {
    localStorage.setItem('user_token', JSON.stringify({ email, token }));
    setHasUser(true);
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
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
      signIn(loginData.email, response.data.token);
      console.log(response);
    } catch (error) {
      console.error('Erro ao logar o usuário:', error);
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
