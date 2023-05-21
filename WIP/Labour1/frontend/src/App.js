import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { checkAuth, isAuthorized } from './redux/features/auth/authSlice';
import LoginForm from './pages/login';
import ChangeData from './pages/changedata';
import MainPage from './pages/main';
import Registration from './pages/registration';
import Header from './components/header';
import PassReminder from './pages/passreminder';
import './App.css';
import Card from './pages/card';
import SuccessRegistration from './pages/successregister';
import Dashboard from './pages/dashboard';
import KeyCheckForm from './pages/keycheck';
import NewPassword from './pages/newpassword';
import NewPasswordSuccess from './pages/newpasswordsuccess';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  const isAuth = useSelector(isAuthorized);

  const [modal, setModal] = useState(false); // modal window

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.screen.availWidth < 600) {
      setIsMobile(true);
    } else {
    }
  }, []);

  return (
    <BrowserRouter>
      <header>
        <Header setModal={setModal} />
      </header>
      <Routes>
        <Route path='/' element={<MainPage isMobile={isMobile} />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/passwordreminder' element={<PassReminder />} />
        <Route path={`/:id`} element={<Card />} />
        <Route path='/success' element={<SuccessRegistration />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/changedata' element={<ChangeData />} />
        <Route path='/success' element={<SuccessRegistration />} />
        <Route path='/keycheck/:id' element={<KeyCheckForm />} />
        <Route path='/newpassword/:id' element={<NewPassword />} />
        <Route path='/newpassword/success' element={<NewPasswordSuccess />} />
      </Routes>
      <footer>
        <span>Created by JSilverhead</span>
      </footer>
    </BrowserRouter>
  );
}

export default App;
