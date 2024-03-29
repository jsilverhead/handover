import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthorized, UpdateUser } from '../redux/features/auth/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import userIcon from '../components/UI/user.png';
import Loading from '../components/UI/loading/loading';

function ChangeData() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = useSelector(isAuthorized);
  const user = useSelector((state) => state.auth.userLogin.data);
  const navigate = useNavigate();

  setTimeout(() => {
    setIsLoading(false);
  }, 200);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  async function submitUpdate(values) {
    try {
      const res = await dispatch(UpdateUser(values));
      if (!res.payload) {
        console.log('Error');
      }
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={isLoading ? 'mainspace_loading' : 'mainspace'}>
      {isLoading ? (
        <Loading children={'Загружаем форму'} />
      ) : isAuth ? (
        <form className='authForm' onSubmit={handleSubmit(submitUpdate)}>
          <h1>Личный кабинет</h1>
          <h3>Изменить данные</h3>
          <img src={userIcon} className='userIcon' alt='You' />
          <label htmlFor='userName'>Ваше имя</label>
          <input
            className={errors.name ? 'error' : 'input'}
            name='userName'
            id='userName'
            defaultValue={user.data.userName}
            {...register('userName', {
              required: 'Пожалуйста, введите имя',
              minLength: {
                value: 2,
                message: 'Имя не должно быть менее 2 символов',
              },
            })}
          />
          <label htmlFor='email'>Email</label>
          <input
            className={errors.email ? 'error' : 'input'}
            name='email'
            id='email'
            defaultValue={user.data.email}
            {...register('email', {
              required: 'Пожалуйста, введите email',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Пожалуйста, введите корректный email',
              },
            })}
          />
          <label htmlFor='phone'>Телефон</label>
          <input
            className={errors.phone ? 'error' : 'input'}
            type='tel'
            name='phone'
            defaultValue={user.data.phone}
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
            })}
          />
          <label htmlFor='password'>Пароль</label>
          <input
            className={errors.password ? 'error' : 'input'}
            type='password'
            name='password'
            id='password'
            {...register('password', {
              required: 'Пожалуйста, введите пароль',
              minLength: {
                value: 8,
                message: 'Пароль должен состоять из 8 и более символов',
              },
            })}
          />
          <label htmlFor='repeat_password'>Повторите пароль</label>
          <input
            className={errors.password_repeat ? 'error' : 'input'}
            type='password'
            name='password_repeat'
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
          <br />
          <button type='submit' className='filledBtn'>
            Принять
          </button>
          <ul className='errorList'>
            <li>{errors.email?.message}</li>
            <li>{errors.password?.message}</li>
            <li>{errors.phone?.message}</li>
            <li>{errors.userName?.message}</li>
            <li>{errors.password_repeat?.message}</li>
          </ul>
        </form>
      ) : (
        <Navigate to='/' />
      )}
    </div>
  );
}

export default ChangeData;
