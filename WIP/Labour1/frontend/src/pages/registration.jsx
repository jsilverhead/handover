import axios from 'axios';
import React, { useState } from 'react';
import '../App.css';
import cl from './registration.module.css';

function Registration({ users, createUsers }) {
  const [validationErrors, setValidationErrors] = useState([]);

  function submit(e) {
    e.preventDefault();
  }
  
  // ДИМА, ДОБАВЬ В СТРЕЛОЧНУЮ ФУНКЦИЮ ФУНКЦИЮ И ТАМ ПРОВЕРЯЙ, А ЕСЛИ ОК ТО ПУШ ЗНАЧЕНИЕ

  return (
    <div className='container'>
      <form className='registration'>
        <div style={{justifyContent: 'center'}}>
          <h1>Registration</h1>
          </div>
        <label htmlFor='name'>Your name</label>
        <input
          className='input'
          id='name'
          type='text'
          name='name'
          placeholder='John Doe'
          required
        />
        <label htmlFor='email'>Your email</label>
        <input
          className='input'
          id='email'
          type='email'
          name='email'
          placeholder='email@email.com'
          required
        />
        <label htmlFor='phone'>Your phone number</label>
        <input
          className='input'
          id='phone'
          type='tel'
          name='phone'
          placeholder='88005553535'
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          className='input'
          id='password'
          type='password'
          name='phone'
          placeholder='Password'
          minLength={8}
          required
        />
        <label htmlFor='repeatpass'>Repeat Password</label>
        <input
          className='input'
          id='repeatpass'
          type='password'
          name='phone'
          placeholder='Password'
          minLength={8}
          required
        />
        <div style={{marginTop: '15px'}}>
          <button className='filledBtn' onClick={submit} type='submit'>Submit Registration</button>
        </div>
        <div id='errors' className={cl.errorlist}>
          {validationErrors.length !== 0 ? (
            validationErrors.map((e) => <p key={e + 1}>{e}</p>)
          ) : (
            <span></span>
          )}
        </div>
      </form>
    </div>
  );
}

export default Registration;
