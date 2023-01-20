import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Modal from '../components/UI/modal/modal';
import Loading from '../components/UI/loading/loading';
import Pointer from '../components/UI/pointer/pointer';
import server from '../utilites/connection';
import Wip from '../components/UI/wip/wip';

function Card({ isLoading }) {
  const { id } = useParams();
  const [quarters, setQuarters] = useState({});
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchQuarters();
  }, []);

  async function fetchQuarters() {
    try {
      const res = await server.get(`/${id}`);
      setQuarters(res.data);
    } catch (error) {
      setError(`An error occured: ${error}`);
    }
  }

  return (
    <div>
      <Modal visible={modal} setVisible={setModal}>
        <Wip />
      </Modal>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className='innercard'>
          <img src={quarters.picture} className='innerpic' />
          <div className='innerinfo'>
            <h3>{quarters.title}</h3>
            <Pointer map={quarters.googleurl} address={quarters.address} />
            <p>Price: <span style={{fontWeight: 'bold'}}>${quarters.price}</span> per night</p>
            <p>Space: {quarters.space} Sqm</p>
            <p>About: {quarters.desc}</p>
          </div>
          <div className='additional'>
                <Link to='/'><button className='hollowBtn'>Back to quarters</button></Link>
            <button className='filledBtn' onClick={() => setModal(true)}>Rent Now</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
