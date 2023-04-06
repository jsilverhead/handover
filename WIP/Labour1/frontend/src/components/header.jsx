import React, { useState } from 'react';
import logo from './UI/logo.png';
import logout from './UI/logout.png';
import account from './UI/account.png';
import Modal from './UI/modal/modal';
import { Link } from 'react-router-dom';
import { isAuthorized } from '../redux/features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/features/auth/authSlice';
import burgermenu from './UI/menu.png';

function Header() {
  const isAuth = useSelector(isAuthorized);
  const dispatch = useDispatch();
  const [headerModal, setHeaderModal] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  function confirmLogout() {
    dispatch(logOut());
    window.localStorage.removeItem('token');
    setHeaderModal(false);
  }
  return (
    <div className='header'>
      <div className='headerInner'>
        <div className='logo'>
          <Link to='/'>
            <img src={logo} />
          </Link>
        </div>
        <nav>
          {isAuth ? (
            <div className='menu'>
              <div className='accountBtn'>
                <Link to='/dashboard'>
                  <img src={account} title='Личный кабинет' />
                </Link>
              </div>
              <div className='accountBtn'>
                <img
                  title='Выход'
                  src={logout}
                  onClick={() => setHeaderModal(true)}
                />
              </div>
            </div>
          ) : (
            <div className='menu'>
              <div className='twobuttons'>
                <Link to='/login'>
                  <button className='hollowBtn'>Вход</button>
                </Link>
                <Link to='/registration'>
                  <button className='filledBtn'>Регистрация</button>
                </Link>
              </div>
              <div
                className='burger'
                onClick={() => {
                  !menuVisible ? setMenuVisible(true) : setMenuVisible(false);
                }}
              >
                <img src={burgermenu} />
              </div>
              <div className={menuVisible ? 'burger_display' : 'burger_hide'}>
                <Link className='burger_link' to='/login'>
                  Вход
                </Link>
                <Link className='burger_link' to='/registration'>
                  Регистрация
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
      <Modal visible={headerModal} setVisible={setHeaderModal}>
        <div style={{ padding: '20px' }}>
          <p style={{ textAlign: 'center' }}>Вы уверены что хотите выйти?</p>
          <div className='twobuttons'>
            <button className='hollowBtn' onClick={confirmLogout}>
              Выйти
            </button>
            <button className='filledBtn' onClick={() => setHeaderModal(false)}>
              Остаться
            </button>
          </div>
          <div className='exitModal'>
            <span
              style={{ marginRight: '50px', fontWeight: 'bold' }}
              onClick={confirmLogout}
            >
              Выход
            </span>
            <span
              style={{ marginLeft: '50px', fontWeight: 'bold' }}
              onClick={() => setHeaderModal(false)}
            >
              Остаться
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Header;
