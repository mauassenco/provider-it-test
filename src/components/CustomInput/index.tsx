import { InputHTMLAttributes, forwardRef, useId } from 'react';

// Styles
import * as Styles from './styles';

type CustomInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helpertext?: string;
  hasError?: boolean;
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ type = 'text', name = '', label = '', helpertext = '', ...props }, ref) => {
    const inputId = useId();
    const hasError = helpertext.length > 0;

    return (
      <Styles.CustomInputContainer>
        <Styles.CustomInputLabel htmlFor={inputId}>{label}</Styles.CustomInputLabel>
        <Styles.CustomInput id={inputId} type={type} name={name} ref={ref} {...props} hasError={hasError} />
        {hasError && <Styles.CustomErrorText>{helpertext}</Styles.CustomErrorText>}
      </Styles.CustomInputContainer>
    );
  },
);

export default CustomInput;
