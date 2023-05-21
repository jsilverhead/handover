import React from 'react';
import '../App.css';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAttempt, isAuthorized } from '../redux/features/auth/authSlice';
import { useState } from 'react';
import Loading from '../components/UI/loading/loading';

function LoginForm({ setVisible }) {
  const isAuth = useSelector(isAuthorized);
  const status = useSelector((state) => state.auth.userLogin);
  const isLoading = status.status === 'loading';
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const [isError, setIsError] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isValidated, setIsValidated] = useState(true);

  async function submitLogin(values) {
    const res = await dispatch(LoginAttempt(values));
    console.log(res.payload);
    if (!res.payload) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 1000);
    }
    if (res.payload.code > 200) {
      setIsValidated(false);
      setServerError(res.payload.message);
    }
    if ('token' in res.payload.data) {
      window.localStorage.setItem('token', res.payload.data.token);
    }
  }

  if (isAuth) {
    return <Navigate to='/' />;
  }

  if (isError) {
    return (
      <div className='mainspace'>
        <p>Ошибка сервера. Повторите запрос позже.</p>
      </div>
    );
  } else
    return (
      <div className={isLoading ? 'mainspace_loading' : 'mainspace'}>
        {isLoading ? (
          <Loading children={'Проверяем данные'} />
        ) : (
          <form className='authForm' onSubmit={handleSubmit(submitLogin)}>
            <div style={{ textAlign: 'center' }}>
              <h1>Вход в систему</h1>
              <h3>Добро пожаловать на Rent A House</h3>
            </div>
            <label htmlFor='userEmail'>Введите Email</label>
            <input
              className={errors.email ? 'error' : 'input'}
              id='userEmail'
              type='email'
              name='email'
              {...register('email', {
                required: 'Please fill in the email',
                onChange: () => setIsValidated(true),
              })}
            />
            <label htmlFor='userPassword'>Введи пароль</label>
            <input
              className={errors.password ? 'error' : 'input'}
              id='userPassword'
              type='password'
              name='password'
              {...register('password', {
                required: 'Please fill in the password',
                minLength: {
                  value: 8,
                  message: 'Пароль должен содержать не менее 8 символов',
                },
                onChange: () => setIsValidated(true),
              })}
            />
            <div style={{ marginTop: '20px' }}>
              <button
                type='submit'
                className='filledBtn'
                disabled={isValidated === false}
              >
                Войти
              </button>
            </div>
            <ul className='errorList'>
              <li>{errors.email?.message}</li>
              <li>{errors.password?.message}</li>
              <li>{isValidated ? '' : serverError}</li>
            </ul>
            <div className='additional'>
              <Link
                to='/registration'
                onClick={() => setVisible(false)}
                className='additionalLinks'
              >
                Нет аккаунта Rent A House?
              </Link>
              <Link
                to='/passwordreminder'
                onClick={() => setVisible(false)}
                className='additionalLinks'
              >
                Забыли пароль?
              </Link>
            </div>
          </form>
        )}
      </div>
    );
}

export default LoginForm;
