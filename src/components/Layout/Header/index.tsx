import { Link } from 'react-router-dom';
import * as Styles from './styles';

const Header = () => {
  return (
    <Styles.HeaderContainer>
      <nav>
        <ul>
          <li>
            <Link to="/signin">Login</Link>
          </li>
          <li>
            <Link to="/signup">Cadastro</Link>
          </li>
        </ul>
      </nav>
    </Styles.HeaderContainer>
  );
};

export default Header;
