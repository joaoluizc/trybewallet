import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/actions';

const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z.]+/i;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [pswdIsValid, setPswdIsValid] = useState(false);

  const handleEmailChange = (email: string) => {
    setUserCredentials({
      ...userCredentials,
      email,
    });
    if (email.match(emailRegex)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };

  const handlePswdChange = (password: string) => {
    setUserCredentials({
      ...userCredentials,
      password,
    });
    if (password.length >= 6) {
      setPswdIsValid(true);
    } else {
      setPswdIsValid(false);
    }
  };

  const handleLogin = () => {
    dispatch(setUser({ email: userCredentials.email }));
    navigate('/carteira');
  };

  return (
    <div className="background-overlay">
      <img src="src/img/piggybank.png" alt="piggybank" className="piggybank-img" />
      <div className="login-container">
        <h1 className="login-title-trybe">
          Trybe
          <span className="login-title-wallet">Wallet</span>
        </h1>
        <label
          className="email-label"
        >
          E-mail
          <input
            className="email-input"
            type="text"
            placeholder="e-mail"
            data-testid="email-input"
            value={ userCredentials.email }
            onChange={ (e) => handleEmailChange(e.target.value) }
          />
        </label>
        <label
          className="pswd-label"
        >
          Password
          <input
            className="pswd-input"
            type="password"
            placeholder="password"
            data-testid="password-input"
            value={ userCredentials.password }
            onChange={ (e) => handlePswdChange(e.target.value) }
          />
        </label>
        <button
          className="login-btn"
          type="button"
          onClick={ () => handleLogin() }
          disabled={ !(emailIsValid && pswdIsValid) }
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
