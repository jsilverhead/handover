import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAttempt, isAuthorized } from '../redux/features/auth/authSlice';

function LoginForm({ setVisible }) {
  const isAuth = useSelector(isAuthorized);
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: {errors, isValid} } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange'
  })

  function submitLogin(values) {
    dispatch(LoginAttempt(values));
  }

  if (isAuth) {
    setVisible(false);
  }

  return (

    <form className='login' onSubmit={handleSubmit(submitLogin)}>
      <h1>Logging In</h1>
      <h3>Welcome to Rent A House</h3>
      <label htmlFor='userEmail' style={{ marginBottom: '5px' }}>
        Enter your email
      </label>
      <input id='userEmail' type='email' name='email' {... register('email', {required: 'Please fill in the email'})} />
      <label
        htmlFor='userPassword'
        style={{ marginBottom: '5px', marginTop: '10px' }}
      >
        Enter your password
      </label>
      <input id='userPassword' type='password' name='password' {...register('password', {required: 'Please fill in the password'})} />
      <div style={{ marginTop: '20px' }}>
        <button type='submit' className='filledBtn'>
          Login
        </button>
      </div>
      <ul className='errorList'>
        <li>{errors.email?.message}</li>
        <li>{errors.password?.message}</li>
      </ul>
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
