import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OtpVerification from './components/OtpVerification';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import { useEffect } from 'react';

function App() {
  const { darkMode } = useSelector((state: RootState) => state.darkMode);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          {isLoggedIn ?
            <Route
              path="/"
              element={<Hero />}
            /> :
            <Route path="/login" element={<OtpVerification />} />
          }

        </Routes>
      </Router>
    </>
  )
}

export default App
