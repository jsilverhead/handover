import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RegistrationAttempt } from '../redux/features/auth/authSlice';
import Loading from '../components/UI/loading/loading';
import ReCAPTCHA from 'react-google-recaptcha';
import server from '../utilites/connection';

function Registration() {
  const [verified, setVerified] = useState(false);
  const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);
  const [isDuplicatePhone, setIsDuplicatePhone] = useState(false);
  const [serverMessage1, setServerMessage1] = useState('');
  const [serverMessage2, setServerMessage2] = useState('');
  const status = useSelector((state) => state.auth.newUser);
  const isLoading = status.status === 'loading';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      phone: '',
      password: '',
    },
    mode: 'onChange',
  });

  async function submitRegister(values) {
    if (isDuplicateEmail === true || !isDuplicatePhone === true) {
      const res = await dispatch(RegistrationAttempt(values));
      console.log(res);
      if (res.payload.data.code === 200) {
        setVerified(false);
        navigate('/success', { replace: true });
      } else {
        return;
      }
    } else {
      return;
    }
  }

  function onCaptcha() {
    setVerified(true);
  }

  async function duplicateEmail(e) {
    console.log('checking', e.target.value);
    const res = await server.post('auth/checkemail', { email: e.target.value });
    if (res.data.code === 403 || res.data.code === 500) {
      setIsDuplicateEmail(true);
      setServerMessage1(res.data.message);
    } else {
      setIsDuplicateEmail(false);
      setServerMessage1('');
    }
  }
  async function duplicatePhone(e) {
    const res = await server.post('auth/checkphone', { phone: e.target.value });
    if (res.data.code === 403 || res.data.code === 500) {
      setIsDuplicatePhone(true);
      console.log(isDuplicatePhone);
      setServerMessage2(res.data.message);
    } else {
      setIsDuplicatePhone(false);
      console.log(isDuplicatePhone);
      setServerMessage2('');
    }
  }

  return (
    <div className={isLoading ? 'mainspace_loading' : 'mainspace'}>
      {isLoading ? (
        <Loading children={'Отправляю данные'} />
      ) : (
        <form className='authForm' onSubmit={handleSubmit(submitRegister)}>
          <div style={{ textAlign: 'center' }}>
            <h1>Регистрация</h1>
            <h3>Добро пожаловать на Rent A House</h3>
          </div>
          <label htmlFor='name'>Ваше Имя</label>
          <input
            className={errors.name ? 'error' : 'input'}
            type='text'
            name='name'
            placeholder='John Doe'
            {...register('userName', {
              required: 'Пожалуйста введите Ваше имя',
              minLength: {
                value: 2,
                message: 'Имя не должно быть менее 2х символов',
              },
            })}
          />
          <label htmlFor='email'>Ваш email</label>
          <input
            className={errors.email ? 'error' : 'input'}
            type='email'
            name='email'
            placeholder='email@email.com'
            {...register('email', {
              required: 'Пожалуйста введите email',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Пожалуйста введите корректный email',
              },
              onChange: (e) => {
                duplicateEmail(e);
              },
            })}
          />
          <label htmlFor='phone'>Номер телефона</label>
          <input
            className={errors.phone ? 'error' : 'input'}
            type='tel'
            name='phone'
            placeholder='+71112223333'
            {...register('phone', {
              required: 'Пожалуйста, введите номер телефона',
              minLength: {
                value: 12,
                message: 'Номер телефона должен состоять из 11 цифр (+7)',
              },
              pattern: {
                value:
                  /^(\+7)?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                message: 'Пожалуйста, введите корректный номер телефона (+7)',
              },
              onChange: (e) => {
                duplicatePhone(e);
              },
            })}
          />
          <label htmlFor='password'>{`Пароль (8 символов)`}</label>
          <input
            className={errors.password ? 'error' : 'input'}
            type='password'
            name='phone'
            placeholder='Password'
            {...register('password', {
              required: 'Пожалуйста укажите пароль',
              minLength: {
                value: 8,
                message: 'Пароль должен состоять из 8 и более символов',
              },
            })}
          />
          <label htmlFor='repeatpass'>Повтор пароля</label>
          <input
            className={errors.password_repeat ? 'error' : 'input'}
            type='password'
            name='password_repeat'
            placeholder='Repeat password'
            {...register('password_repeat', {
              required: 'Пожалуйста повторите пароль',
              minLength: {
                value: 8,
                message: 'Пароль должен состоять из 8 и более символов',
              },
              validate: (val) => {
                if (watch('password') !== val) {
                  return 'Пароли не совпадают';
                }
              },
            })}
          />
          <div
            style={{
              marginTop: '15px',
            }}
          >
            <ReCAPTCHA
              sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
              onChange={onCaptcha}
              type='image'
            />
            <br />
            <button className='filledBtn' type='submit' disabled={!verified}>
              Зарегистрироваться
            </button>
          </div>
          <ul className='errorList'>
            <li>{errors.email?.message}</li>
            <li>{errors.password?.message}</li>
            <li>{errors.phone?.message}</li>
            <li>{errors.userName?.message}</li>
            <li>{errors.password_repeat?.message}</li>
            <li>{serverMessage1}</li>
            <li>{serverMessage2}</li>
          </ul>
        </form>
      )}
    </div>
  );
}

export default Registration;
