import React from 'react';

import * as Styles from './styles';
type FormContainerProps = {
  children: React.ReactNode;
};

const FormContainer = ({ children }: FormContainerProps) => {
  return <Styles.FormContainer>{children}</Styles.FormContainer>;
};

export default FormContainer;
