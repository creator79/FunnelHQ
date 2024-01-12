import React, { useState } from 'react';
import "./Login.css";
import Image from "../assets/Images/img.png";
import { useNavigate } from 'react-router-dom';

function Login({ }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
 e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success === 1) {
        // Login successful
        setMessage(data.message);
        sessionStorage.setItem('token', data.token);
      alert("Login Successful");
        navigate('/home');

      } else {
        // Login failed
        setMessage(data.message);
        sessionStorage.setItem('token', '');
        alert("Login Failed");
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  const handleNavigate = () => {
    navigate('/signup');
  };

  return (
    <div className="Main-container">
      <div className="container-login">
        <div className="wrap-login">
          <div className="login-pic">
            <img src={Image} alt="IMG" />
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <span className="login-form-title">Login</span>
            <div className="wrap-input">
              <input
                type="text"
                className="input"
                name="email"
                placeholder="Email"
                required=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input" />
              <span className="symbol-input">
                <i className="fa fa-envelope" aria-hidden="true" />
              </span>
            </div>
            <div className="wrap-input">
              <input
                type="password"
                className="input"
                name="pass"
                placeholder="Password"
                required=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" />
              <span className="symbol-input">
                <i className="fa fa-lock" aria-hidden="true" />
              </span>
            </div>
            <div className="login-form-btn-container">
              <button className="login-form-btn" type="submit">Login</button>
            </div>
            <div className="text-center p-t-1">
              <span className="txt1">Forgot</span>
              <a href="#" className="txt2">
                {" "}
                Username / Password ?
              </a>
            </div>
            <div className="text-center p-t-2" onClick={handleNavigate}>
              <a href="#" className="txt2">
                Create Your Account{" "}
                <i className="fa fa-long-arrow-right " aria-hidden="true" />
              </a>
            </div>
            <div className="text-center p-t-2">
              <span>{message}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
