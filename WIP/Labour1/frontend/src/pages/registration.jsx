import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/features/auth/authSlice';
import '../App.css';
import cl from './registration.module.css';

function Registration() {
  const [newUser, setNewUser] = useState({
    userName: '',
    email: '',
    phone: '',
    password: '',
  });

  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState([]);

  function submit(e) {
    console.log(newUser)
    try {
      dispatch(createUser(newUser));
      setNewUser({
        userName: '',
        email: '',
        phone: '',
        password: '',
      });
    } catch (e) {}
  }

  // ДИМА, ДОБАВЬ В СТРЕЛОЧНУЮ ФУНКЦИЮ ФУНКЦИЮ И ТАМ ПРОВЕРЯЙ, А ЕСЛИ ОК ТО ПУШ ЗНАЧЕНИЕ

  return (
    <div className='container'>
      <form className='registration' onSubmit={(e) => e.preventDefault()}>
        <div>
          <h1>Registration</h1>
          <h3>Welcome to Rent A House</h3>
          </div>
        <label htmlFor='name'>Your name</label>
        <input
          className='input'
          id='name'
          value={newUser.userName}
          type='text'
          name='name'
          placeholder='John Doe'
          onChange={(e) => setNewUser({...newUser, userName: e.target.value })}
          required
        />
        <label htmlFor='email'>Your email</label>
        <input
          className='input'
          id='email'
          value={newUser.email}
          type='email'
          name='email'
          placeholder='email@email.com'
          onChange={(e) => setNewUser({...newUser, email: e.target.value })}
          required
        />
        <label htmlFor='phone'>Your phone number</label>
        <input
          className='input'
          id='phone'
          value={newUser.phone}
          type='tel'
          name='phone'
          placeholder='88005553535'
          onChange={(e) => setNewUser({...newUser, phone: e.target.value })}
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          className='input'
          id='password'
          value={newUser.password}
          type='password'
          name='phone'
          placeholder='Password'
          minLength={8}
          onChange={(e) => setNewUser({...newUser, password: e.target.value })}
          required
        />
        {/* <label htmlFor='repeatpass'>Repeat Password</label>
        <input
          className='input'
          id='repeatpass'
          type='password'
          name='phone'
          placeholder='Password'
          minLength={8}
          required
        /> */}
        <div style={{ marginTop: '15px' }}>
          <button className='filledBtn' onClick={submit} type='submit'>
            Submit Registration
          </button>
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
