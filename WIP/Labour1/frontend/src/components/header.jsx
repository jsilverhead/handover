import React from 'react';
import logo from './UI/logo.png';
import account from './UI/account.png';
import { Link } from 'react-router-dom';

function Header({ setModal }) {
  const noAuth = true;
  return (
    <div className='header'>
      <div className='headerInner'>
      <div className='logo'>
        <Link to='/'>
          <img src={logo} />
        </Link>
      </div>
      <div className='menu'>
        {noAuth ? (
          <div>
            <button className='hollowBtn' onClick={() => setModal(true)}>Login</button>
            <Link to='/registration'>
              <button className='filledBtn'>Registration</button>
            </Link>
          </div>
        ) : (
          <div className='accountBtn'>
            <img src={account} />
          </div>
        )}
        </div>
        </div>
    </div>
  );
}

export default Header;
