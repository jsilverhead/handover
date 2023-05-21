import React from 'react';
import { Link } from 'react-router-dom';

function NewPasswordSuccess() {
  return (
    <div className='mainspace'>
      <div className='authForm'>
        <h1>Успех</h1>
        <h2>Пароль восстановлен успешно!</h2>
        <h3>Для того чтобы разместить объявление авторизуйтесь</h3>
        <br />
        <Link to='/login'>
          <button className='filledBtn'>Авторизация</button>
        </Link>
      </div>
    </div>
  );
}

export default NewPasswordSuccess;
