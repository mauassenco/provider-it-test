import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GlobalStyles from './Globals';

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

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
            <main style={{ zIndex: '1', position: 'relative' }}>
              <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Router>

        {/* <SignInForm /> */}
        {/* <SignUpForm /> */}
      </>
    </ThemeProvider>
  );
}

export default App;
