import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/UI/loading/loading';
import { fetchNewPassword } from '../redux/features/auth/authSlice';

function NewPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.updatePassword);
  const isLoading = status.queryStatus === 'loading';
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function submitNewPassword(values) {
    try {
      const res = await dispatch(fetchNewPassword(values));
      if (res.payload.status === 200) {
        navigate('/newpassword/success', { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={isLoading ? 'mainspace_loading' : 'mainspace'}>
      {isLoading ? (
        <Loading children={'Проверяем ключ'} />
      ) : (
        <form className='authForm' onSubmit={handleSubmit(submitNewPassword)}>
          <div style={{ textAlign: 'center' }}>
            <h1>Восстановление пароля</h1>
            <h3>Пожалуйста введите новый пароль</h3>
            <p>Обязательно проверьте правильность ввода данных</p>
          </div>
          <input
            type='hidden'
            value={id}
            {...register('id', { required: 'Нельзя удалять id' })}
          />
          <label htmlFor='key'>Новый пароль</label>
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Введине новый пароль'
            {...register('password', {
              required: 'Пожалуйста введите пароль',
              minLength: {
                value: 8,
                message: 'Пароль должен состоять из 8 и более символов',
              },
            })}
          ></input>
          <label>Повторите пароль</label>
          <input
            type='password'
            id='repeat_password'
            name='repeat_password'
            placeholder='Повторите пароль'
            {...register('repeat_password', {
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
          <button className='filledBtn' type='submit'>
            Ввести код
          </button>
          <ul className='errorList'>
            <li>{errors.password?.message}</li>
            <li>{errors.repeat_password?.message}</li>
          </ul>
        </form>
      )}
    </div>
  );
}

export default NewPassword;
