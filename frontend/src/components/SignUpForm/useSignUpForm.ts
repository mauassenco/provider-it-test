import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { signUpSchema } from './schema';
import type { SignUpFormProps, SignUpProps } from './types';
import { useLoginStore } from '../../store/login';
import { api } from '../../services/axiosClient';

export const useSignUpForm = () => {
  const [birthDate, setBirthDate] = useState('');
  const { isLoading, isCreated, setIsCreated, setIsloading } = useLoginStore();

  // const handleInputChange = (e: { target: { value: string } }) => {
  const handleInputChange = (e: { target: { value: string } }) => {
    //ChangeEvent<HTMLInputElement>}) => {
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
  } = useForm<SignUpFormProps>({
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

  const createUser = async (formData: { newUser: SignUpProps }): Promise<void> => {
    try {
      const response = await api.post('/register', formData);

      setIsloading(true);
      setIsCreated(true);
      setTimeout(() => {
        setIsloading(false);
      }, 1000);
      console.log('Usuário cadastrado com sucesso:', response.data);
      console.log(response);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      //Somente para testes, uma vez que não temos o backend
      // setIsloading(true);
      // setIsCreated(true);
      // setTimeout(() => {
      //   setIsloading(false);
      // }, 1000);
    }
  };
  return {
    birthDate,
    isLoading,
    isCreated,
    errors,
    // setAuth,
    setIsCreated,
    createUser,
    handleInputChange,
    handleSubmit,
    register,
  };
};
