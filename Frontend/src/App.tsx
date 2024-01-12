import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GetBooks from './components/GetBooks';
import Books from './components/Books';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';

// Higher-order component to protect routes
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const isLoggedIn = sessionStorage.getItem('token') !== null;

  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    return <Navigate to="/" />;
  }

  // Render the protected route
  return <>{element}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Use the ProtectedRoute component for protected routes */}
        <Route
          path="/home"
          element={<ProtectedRoute element={<GetBooks />} />}
        />
        <Route
          path="/books"
          element={<ProtectedRoute element={<Books />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
