import React, { useState, useEffect } from 'react';
import Loading from '../components/UI/loading/loading';
import Pointer from '../components/UI/pointer/pointer';
import server from '../utilites/connection';

function Card({ cardData, loading }) {
  const [innerData, setInnerData] = useState({});
  useEffect(() => {
    getInnerData(cardData);
  }, []);

  async function getInnerData(cardData) {
    try {
      loading(true);
      console.log(cardData._id)
      const res = await server.get(`/${cardData._id}`, {params: {id: cardData._id}});
      setInnerData(res.data);
      console.log(innerData);
    } catch (e) {
      console.log(`An error occured1: ${e}`);
    } finally {
      loading(false);
    }
  }

  return <div className='innercard'>{innerData.title}</div>;
}

export default Card;
