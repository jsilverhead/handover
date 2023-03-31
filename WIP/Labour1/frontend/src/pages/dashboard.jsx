import React from 'react';
import { isAuthorized } from '../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import userIcon from '../components/UI/user.png';
import Loading from '../components/UI/loading/loading';
import { useState } from 'react';

function Dashboard({ userData }) {
  const isAuth = useSelector(isAuthorized);
  const user = useSelector((state) => state.auth.userLogin.data);
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 200);

  return (
    <div className={isLoading ? 'mainspace_loading' : 'mainspace'}>
      {isLoading ? (
        <Loading children={'Собираем данные'} />
      ) : isAuth ? (
        <div className='authForm'>
          <h1>Личный кабинет</h1>
          <h3>Добро пожаловать</h3>
          <img src={userIcon} className='userIcon' alt='You' />
          <p>Имя: {user.userName}</p>
          <p>Email: {user.email}</p>
          <p>Телефон: {user.phone}</p>
          <br />
          <Link to='/changedata' onClick={() => userData(user)}>
            <button className='hollowBtn'>Изменить данные</button>
          </Link>
        </div>
      ) : (
        <Navigate to='/' />
      )}
    </div>
  );
}

export default Dashboard;
