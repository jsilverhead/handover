import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function LoginForm({ setVisible }) {
  function submitLogin(e) {
    e.preventDefault();
  }

  return (
    <form className='login'>
      <h1>Logging In</h1>
      <h3>Welcome to Rent A House</h3>
      <label htmlFor='userEmail' style={{ marginBottom: '5px' }}>
        Enter your email
      </label>
      <input id='userEmail' type='email' name='email' />
      <label
        htmlFor='userPassword'
        style={{ marginBottom: '5px', marginTop: '10px' }}
      >
        Enter your password
      </label>
      <input id='userPassword' type='password' name='password' />
      <div style={{ marginTop: '20px' }}>
        <button className='filledBtn' onClick={submitLogin}>
          Login
        </button>
      </div>
      <div className='additional'>
        <Link
          to='/registration'
          onClick={() => setVisible(false)}
          className='additionalLinks'
        >
          Don't have an account yet?
        </Link>
        <Link
          to='/passwordreminder'
          onClick={() => setVisible(false)}
          className='additionalLinks'
        >
          Forgotten your password?
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
