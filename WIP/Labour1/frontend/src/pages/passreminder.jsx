import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordRequest } from '../redux/features/auth/authSlice';
import ReCAPTCHA from 'react-google-recaptcha';
import Loading from '../components/UI/loading/loading';

function PassReminder() {
  const [verified, setVerified] = useState(false);
  const status = useSelector((state) => state.auth.updatePassword);
  const isLoading = status.queryStatus;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  function onCaptcha() {
    setVerified(true);
  }

  async function submitPassRequest(values) {
    try {
      const res = await dispatch(PasswordRequest(values));
      if (res.payload.status === 200) {
        setVerified(false);
        navigate(`/keycheck/${res.payload.data.id}`, { replace: true });
      }
    } catch (error) {
      console.log(`Password Request Failed: ${error}`);
    }
  }

  return (
    <div className={isLoading ? 'mainspace_loading' : 'mainspace'}>
      {isLoading ? (
        <Loading children={'Загружаем форму'} />
      ) : (
        <form className='authForm' onSubmit={handleSubmit(submitPassRequest)}>
          <div style={{ textAlign: 'center' }}>
            <h1>Восстановление пароля</h1>
            <h3>Пожалуйста введите данные</h3>
            <p>Обязательно проверьте правильность ввода данных</p>
          </div>
          <label htmlFor='email'>Email</label>
          <input
            className={errors.email ? 'error' : 'input'}
            name='email'
            id='email'
            type='email'
            placeholder='email@email.com'
            {...register('email', {
              required: 'Пожалуйста введите email',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Пожалуйста введите корректный email',
              },
            })}
          />
          <div style={{ marginTop: '15px' }}>
            <ReCAPTCHA
              sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
              onChange={onCaptcha}
            />
            <br />
            <button className='filledBtn' type='submit' disabled={!verified}>
              Восстановить пароль
            </button>
            <ul className='errorList'>
              <li>{errors.email?.message}</li>
            </ul>
          </div>
          <Link to='/registration' className='additionalLinks'>
            Ещё нет аккаунта?
          </Link>
        </form>
      )}
    </div>
  );
}

export default PassReminder;
