import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RegistrationAttempt } from '../redux/features/auth/authSlice';
import Loading from '../components/UI/loading/loading';
import ReCAPTCHA from 'react-google-recaptcha';

function Registration() {
  const [verified, setVerified] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
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
    const res = await dispatch(RegistrationAttempt(values));
    if (res.payload.message === 'success') {
      setVerified(false);
      navigate('/success', { replace: true });
    } else {
      console.log(`Ошибка ${res.payload.message}`);
      setServerMessage(res.payload.message);
    }
  }

  function onCaptcha(value) {
    console.log('Captcha value:', value);
    setVerified(true);
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
            })}
          />
          <label htmlFor='phone'>Номер телефона</label>
          <input
            className={errors.phone ? 'error' : 'input'}
            type='tel'
            name='phone'
            placeholder='88005553535'
            {...register('phone', {
              required: 'Пожалуйста, введите номер телефона',
              pattern: {
                value:
                  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                message: 'Пожалуйста, введите корректный номер телефона',
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
            <li>{serverMessage}</li>
          </ul>
        </form>
      )}
    </div>
  );
}

export default Registration;
