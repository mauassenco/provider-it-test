import styled from 'styled-components';

export const CustomInput = styled.input<{ hasError: boolean }>`
  padding: 0.8rem;
  border-radius: 0.4rem;
  color: #555;
  margin-top: 0.4rem;
  border: 1px solid #ccc;

  label {
    margin-top: 0.8rem;
  }

  p {
    color: red;
    font-size: 0.8rem;
    font-weight: bold;
    margin-top: 0.4rem;
  }

  &:focus {
    outline: 2px solid rgba(31, 216, 31, 0.75);
  }

  ${({ hasError }) => hasError && 'outline: 2px solid red;'}
`;

export const CustomInputLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
`;

export const CustomInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
`;

export const CustomErrorText = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.4rem;
  background-color: rgba(255, 0, 0, 0.3);
  width: fit-content;
  padding: 0 0.4rem;
`;
