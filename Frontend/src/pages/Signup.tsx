import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';


function Signup() {

  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrors({
      username: '',
      email: '',
      password: '',
      password2: '',
    });

    if (form.password !== form.password2) {
      setErrors((prevErrors) => ({ ...prevErrors, password2: 'Passwords do not match' }));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/users/register/', form);
      console.log(form);
      console.log(response);
navigate('/');
    } catch (error) {
      console.error(error);
      setErrors((prevErrors) => ({ ...prevErrors, general: error.response.data.error }));
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  return (
    <div id="login-box">
      <div className="left">
        <h1>Sign up</h1>
        {/* {errors.general && <div className="error">{errors.general}</div>} */}
        <form>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} />
          {errors.username && <div className="error">{errors.username}</div>}
          <input type="text" name="email" placeholder="E-mail" onChange={handleChange} />
          {errors.email && <div className="error">{errors.email}</div>}
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          {errors.password && <div className="error">{errors.password}</div>}
          <input type="password" name="password2" placeholder="Retype password" onChange={handleChange} />
          {errors.password2 && <div className="error">{errors.password2}</div>}
        </form>
      </div>
      <div className="right">
        <span className="loginwith">
          Sign in with
          <br />
          social network
        </span>
        <button className="social-signin facebook">Log in with Facebook</button>
        <button className="social-signin twitter">Log in with Twitter</button>
        <button className="social-signin google">Log in with Google+</button>
        <input type="submit" name="signup_submit" value="Sign me up" onClick={handleSubmit} />
      </div>
      <div className="or">OR</div>
    </div>
  );
}

export default Signup;
