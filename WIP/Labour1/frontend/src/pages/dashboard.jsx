import React, { useEffect } from 'react';
import { isAuthorized } from '../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../redux/features/auth/authSlice';
import { Navigate, Link } from 'react-router-dom';
import userIcon from '../components/UI/user.png';
import Loading from '../components/UI/loading/loading';
import { useState } from 'react';

function Dashboard() {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthorized);
  //const user = useSelector((state) => state.auth.userLogin.data);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  setTimeout(() => {
    setIsLoading(false);
  }, 200);

  useEffect(() => {
    uploadUserData();
  }, []);

  async function uploadUserData() {
    try {
      const res = await dispatch(getUserInfo());

      if (res) {
        setUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={isLoading ? 'mainspace_loading' : 'mainspace'}>
      {isLoading ? (
        <Loading children={'Собираем данные'} />
      ) : isAuth ? (
        <div className='authForm'>
          <h1>Личный кабинет</h1>
          <h3>Добро пожаловать</h3>
          <img src={userIcon} className='userIcon' alt='You' />
          <p>Имя: {user.data.userName}</p>
          <p>Email: {user.data.email}</p>
          <p>Телефон: {user.data.phone}</p>
          <br />
          <Link to='/changedata'>
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
