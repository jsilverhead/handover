import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/login';
import Modal from './components/UI/modal/modal';
import MainPage from './pages/main';
import Registration from './pages/registration';
import Header from './components/header';
import PassReminder from './pages/passreminder';
import './App.css';
import Card from './pages/card';

function App() {
  const [modal, setModal] = useState(false); // modal window

  return (
    <BrowserRouter>
      <Header setModal={setModal} />
      <Modal visible={modal} setVisible={setModal}>
        <LoginForm setVisible={setModal} />
      </Modal>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/passwordreminder' element={<PassReminder />} />
        <Route path={`/:id`} element={<Card />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
