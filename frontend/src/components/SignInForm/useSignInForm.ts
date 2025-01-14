import axios from 'axios';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema } from './schema';
import type { LoginDataProps } from './types';
import { useLoginStore } from '../../store/login';

const LOGIN_URL = '/auth';

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

  const handleUserLogin = async (data: LoginDataProps) => {
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setIsloading(true);
      signIn(data.email);
      setTimeout(() => {
        setIsloading(false);
      }, 1000);
      console.log(response);
    } catch (error) {
      console.log(error);
      //Somente para testes, uma vez que não temos o backend
      setIsloading(true);
      // setAuth(true);
      signIn(data.email);
      setTimeout(() => {
        setIsloading(false);
      }, 1000);
      console.log(data);
    }
  };
  return {
    isLoading,
    errors,
    hasUser,
    setHasUser,
    signIn,
    handleUserLogOut,
    handleUserLogin,
    handleSubmit,
    register,
  };
};
