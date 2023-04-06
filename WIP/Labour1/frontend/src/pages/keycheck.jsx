import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { KeyCheck } from '../redux/features/auth/authSlice';
import Loading from '../components/UI/loading/loading';

function KeyCheckForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const keyData = useSelector((state) => state.auth.updatePassword);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isErr = keyData.errors;
  const isLoading = keyData.queryStatus === 'loading';

  console.log(isErr);

  async function submitKeyheck(values) {
    try {
      const res = await dispatch(KeyCheck(values));
      if (res.payload.status === 200) {
        navigate(`/newpassword/${id}`, { replace: true });
      }
    } catch (error) {
      console.log(`KeyCheckFailed: ${error}`);
      console.log(isErr);
    }
  }

  return (
    <div className={isLoading ? 'mainspace_loading' : 'mainspace'}>
      {isLoading ? (
        <Loading children={'Проверяем данные'} />
      ) : (
        <form className='authForm' onSubmit={handleSubmit(submitKeyheck)}>
          <div style={{ textAlign: 'center' }}>
            <h1>Восстановление пароля</h1>
            <h3>Пожалуйста введите ключ безопасности</h3>
            <p>Обязательно проверьте правильность ввода данных</p>
          </div>
          <input
            type='hidden'
            value={id}
            {...register('id', { required: 'Нельзя удалять id' })}
          />
          <label htmlFor='key'>Секретный код</label>
          <input
            className={errors.key ? 'error' : 'input'}
            type='text'
            id='key'
            name='key'
            placeholder='Секретный код'
            {...register('key', {
              required: 'Пожалуйста введите ключ',
              minLength: {
                value: 7,
                message: 'Секретный код должен состоять из 7 символов',
              },
            })}
          ></input>
          <br />
          <button className='filledBtn' type='submit'>
            Ввести код
          </button>
          <ul className='errorList'>
            <li>{errors.key?.message}</li>
            <li>{isErr ? isErr : ''}</li>
          </ul>
        </form>
      )}
    </div>
  );
}

export default KeyCheckForm;
