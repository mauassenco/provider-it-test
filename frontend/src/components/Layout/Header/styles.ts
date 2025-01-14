import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.secondary};

  display: flex;
  align-items: center;
  justify-content: end;
  border: 1px solid #ccc;
  box-shadow: 0 2px 3px #ccc;
  border-radius: 0.4rem;
  padding: 1rem 2rem;
  margin-bottom: 4rem;

  .hidden {
    display: none;
  }

  nav {
    ul {
      display: flex;
      list-style: none;
      padding: 0;

      li {
        margin-left: 1.8rem;
        border: 1px solid #000;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
        border-radius: 0.4rem;
        padding: 0.6rem 1rem;
        background-color: ${({ theme }) => theme.colors.primary};
      }

      a {
        text-decoration: none;
        color: #000;
        font-weight: bold;
      }
    }
  }
`;
