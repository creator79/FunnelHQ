import React, { useState, useEffect, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GetBooks from './components/GetBooks';
import Books from './components/Books';
import LoginPage from './components/Email';
import SignupPage from './components/Signup';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the token is present in local storage
    const token = localStorage.getItem("token");
    if (token) {
      // You might want to validate the token here (e.g., check expiration)
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const PrivateRoute = ({ element, ...props }: { element: ReactNode }) => {
    return isLoggedIn ? element : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={() => setLoggedIn(true)} />} />
        <Route path="/home" element={<PrivateRoute element={<GetBooks />} />} />
        <Route path="/team" element={<PrivateRoute element={<Books />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
