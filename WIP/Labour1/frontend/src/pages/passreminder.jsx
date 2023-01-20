import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PassReminder() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function submitReminder() {
    try {
      console.log('I remind password');
      setMessage('Password reminder sent');
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  }
  return (
    <div className='container'>
      <form className='registration' onSubmit={(e) => e.preventDefault()}>
        <div>
          <h1>Remind your password</h1>
          <h3>Please enter your data</h3>
          <label htmlFor='email'>Enter your email</label>
          <input
            id='email'
            className='input'
            value={email}
            placeholder='email@email.com'
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ marginTop: '15px' }}>
            <button className='filledBtn' onClick={submitReminder}>
              Remind Password
            </button>
          </div>
          <Link className='additionalLinks'>Don't have an account yet?</Link>
          <p>{message}</p>
        </div>
      </form>
    </div>
  );
}

export default PassReminder;
