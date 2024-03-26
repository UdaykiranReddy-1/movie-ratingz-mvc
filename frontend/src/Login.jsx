import React, { useState } from 'react';
import { FcRating } from "react-icons/fc";
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/users/validate?username=${username}&password=${password}`);
      if (response.ok) {
        const userId = await response.text(); // Assuming the server responds with the userId as plain text
        // Redirect to '/movies' with userId
        window.location.href = `/movies?userId=${userId}`;
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (

    <>
      <h1 className='loginhead'>MovieRatingZ</h1>
      <div className="login-wrapper">
        <div className="login-container">
          <h2 className='header'>Login</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <br />
            <button type="submit">Login</button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </>

  );
}

export default Login;
