import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 100%;
  margin-top: 10rem;

  > div {
    border: 1px solid #ccc;
    box-shadow: 0 2px 3px #ccc;
    border-radius: 0.4rem;
    width: 80%;
    max-width: 24rem;
    padding: 2.4rem;
    margin: 2.4rem auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  h2 {
    align-self: center;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  button {
    width: 70%;
    height: 2.8rem;
    border-radius: 0.4rem;
    cursor: pointer;
    align-self: center;
    margin-top: 2.8rem;
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
  }
`;
