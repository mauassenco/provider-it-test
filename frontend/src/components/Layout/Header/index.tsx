import { Link } from 'react-router-dom';
import * as Styles from './styles';
import { useLoginStore } from '../../../store/login';

const Header = () => {
  const { hasUser, isCreated, setHasUser, removeToken } = useLoginStore();

  const handleLogout = () => {
    removeToken();
    setHasUser(false);
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
            <li className={`${isCreated && 'hidden'}`}>
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
