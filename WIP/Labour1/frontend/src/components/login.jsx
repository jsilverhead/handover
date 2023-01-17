import React from 'react';
import '../App.css';

function LoginForm() {
  function submitLogin(e) {
    e.preventDefault();
  }

  return (
    <form className='login'>
      <label htmlFor='userEmail' style={{marginBottom: '5px'}}>Enter your email</label>
      <input id='userEmail' type='email' name='email' />
      <label htmlFor='userPassword' style={{marginBottom: '5px', marginTop: '10px'}}>Enter your password</label>
      <input id='userPassword' type='password' name='password' />
      <div style={{ marginTop: '20px' }}>
        <button className='filledBtn' onClick={submitLogin}>
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
