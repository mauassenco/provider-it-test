import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GlobalStyles from './Globals';

import Signin from './pages/Signin';
import Signup from './pages/Signup';

import Header from './components/Layout/Header';

const theme = {
  colors: {
    primary: '#fefefe',
    secondary: '#ebfbff',
    dark: '#003333',
  },
  mobile: '768px',
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Router>
          <div>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </main>
          </div>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
