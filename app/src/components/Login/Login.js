import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
  const response = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return { token: data.token };
}

async function signupUser(credentials) {
  return fetch('http://localhost:8080/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json());
}

export default function AuthForm({ setToken }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let response;
      if (isLoginMode) {
        response = await loginUser({ username, password });
      } else {
        response = await signupUser({ username, password, email });
      }

      if (response.token) {
        const token = response.token;
        setToken(token);
      } else {
        setError('Incorrect Password');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    // Reset form fields when switching modes
    setUsername('');
    setPassword('');
    setEmail('');
    setError('');
  };

  return (
    <div className="login-wrapper">
      <h1>{isLoginMode ? 'Please Log In' : 'Create an Account'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input 
            type="text" 
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        
        {!isLoginMode && (
          <label>
            <p>Email</p>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
        )}
        
        <label>
          <p>Password</p>
          <input 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>

        {error && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            {error}
          </div>
        )}

        <div>
          <button type="submit">
            {isLoginMode ? 'Log In' : 'Sign Up'}
          </button>
        </div>
      </form>

      <div style={{ marginTop: '15px' }}>
        <button 
          onClick={toggleMode}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'blue', 
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
        >
          {isLoginMode 
            ? 'Need an account? Sign Up' 
            : 'Already have an account? Log In'}
        </button>
      </div>
    </div>
  );
}

AuthForm.propTypes = {
  setToken: PropTypes.func.isRequired
};