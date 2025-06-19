import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OtpVerification from './components/OtpVerification';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './redux/store';
import { useEffect, useState } from 'react';
import { authActions } from './redux/authSlice';
import { fetchUser } from './redux/userSlice';

function App() {
  const { darkMode } = useSelector((state: RootState) => state.darkMode);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    if (token && userId && role) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
      dispatch(fetchUser(userId));
    }
    setLoading(false);
  }, [])
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
          {loading ?
            (
              <Route
                path="/"
                element={<div className="flex items-center justify-center h-screen bg-body text-2xl">
                  <h1 className='text-heading-1'>Loading...</h1>
                </div>}
              />
            )
            : (
              <Route
                path="/"
                element={isLoggedIn ? <Hero /> : <OtpVerification />}
              />
            )}

        </Routes>
      </Router>
    </>
  )
}

export default App;

