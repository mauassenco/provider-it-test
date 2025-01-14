import { InputHTMLAttributes, forwardRef, useId } from 'react';

// Styles
import * as Styles from './styles';

type CustomInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helpertext?: string;
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ type = 'text', name = '', label = '', helpertext = '', ...props }, ref) => {
    const inputId = useId();

    return (
      <Styles.CustomInputContainer>
        <Styles.CustomInputLabel htmlFor={inputId}>{label}</Styles.CustomInputLabel>
        <Styles.CustomInput id={inputId} type={type} name={name} ref={ref} {...props} helpertext={helpertext} />
        {helpertext && <Styles.CustomErrorText>{helpertext}</Styles.CustomErrorText>}
      </Styles.CustomInputContainer>
    );
  },
);

export default CustomInput;
