import { Link } from 'react-router-dom';
import * as Styles from './styles';
import { useLoginStore } from '../../../store/login';

const Header = () => {
  const { hasUser, setIsCreated, setHasUser, removeToken } = useLoginStore();

  const handleLogout = () => {
    removeToken();
    setHasUser(false);
    setIsCreated(false);
  };

  return (
    <Styles.HeaderContainer>
      <nav>
        {hasUser ? (
          <ul>
            <li>
              <Link to="/signin" onClick={handleLogout}>
                Sair
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/signin" onClick={handleLogout}>
                Login
              </Link>
            </li>
            {/* <li className={`${isCreated && 'hidden'}`}> */}
            <li>
              <Link to="/signup" onClick={handleLogout}>
                Cadastro
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </Styles.HeaderContainer>
  );
};

export default Header;
