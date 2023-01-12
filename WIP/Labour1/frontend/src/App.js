import React, { useState, useEffect, useMemo } from 'react';
import connection from './components/connection';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/login';
import Modal from './components/UI/modal/modal';
import MainPage from './pages/main';
import Registration from './pages/registration';
import './App.css';
import Header from './components/header';
import Card from './pages/card';

function App() {
  const [modal, setModal] = useState(false); // modal window
  const [isLoading, setIsLoading] = useState(false); // loading rotation
  const [housedata, setHouseData] = useState([]);
  const [carddata, setCardData] = useState({});
  const cardLink = useMemo(() => {
    return { ...carddata };
  }, [carddata, setCardData]);

  //connecting to a server
  useEffect(() => {
    fetchHouses();
  }, []);

  useEffect(() => {}, [carddata, setCardData]);

  async function fetchHouses() {
    try {
      setIsLoading(true);
      const res = await connection.get('/');
      setHouseData(res.data);
    } catch (e) {
      console.log(`An error occured1: ${e}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BrowserRouter>
      <Header setModal={setModal} />
      <Modal visible={modal} setVisible={setModal}>
        <LoginForm />
      </Modal>
      <Routes>
        <Route
          path='/'
          element={
            <MainPage
              loading={isLoading}
              housedata={housedata}
              setHouses={setHouseData}
              cardData={setCardData}
            />
          }
        />
        <Route path='/registration' element={<Registration />} />
        <Route
          path={'/' + cardLink._id}
          element={<Card cardData={carddata} loading={setIsLoading} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
