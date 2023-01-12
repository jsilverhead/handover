import React from 'react';
import '../App.css';

function LoginForm() {
  function submitLogin(e) {
    e.preventDefault();
  }

  return (
    <form className='login'>
      <label htmlFor='email' style={{marginBottom: '5px'}}>Enter your email</label>
      <input id='email' type='email' name='email' />
      <label htmlFor='password' style={{marginBottom: '5px', marginTop: '10px'}}>Enter your password</label>
      <input id='password' type='password' name='password' />
      <div style={{ marginTop: '20px' }}>
        <button className='filledBtn' onClick={submitLogin}>
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
