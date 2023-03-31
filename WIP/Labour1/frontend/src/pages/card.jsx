import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthorized } from '../redux/features/auth/authSlice';
import Modal from '../components/UI/modal/modal';
import Loading from '../components/UI/loading/loading';
import Pointer from '../components/UI/pointer/pointer';
import server from '../utilites/connection';
import Wip from '../components/UI/wip/wip';
import Slider from '../components/UI/slider/slider';

function Card() {
  const { id } = useParams();
  const [quarters, setQuarters] = useState({});
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);
  const isAuth = useSelector(isAuthorized);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
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
    <div className={isLoading ? 'mainspace_loading' : 'mainspace'}>
      <Modal visible={modal} setVisible={setModal}>
        <Wip />
      </Modal>
      {isLoading ? (
        <Loading children={'Собираем данные'} />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className='innercard'>
          <img src={quarters.picture} className='innerpic' />
          <div className='innerinfo'>
            <h3>{quarters.title}</h3>
            <Slider>
              {quarters.additional.map((element) => (
                <div className='slider_photo'>
                  <img src={element} className='slider_img' />
                </div>
              ))}
            </Slider>
            <br />
            <Pointer map={quarters.googleurl} address={quarters.address} />
            <p style={{ fontWeight: 'bold' }}>
              Цена:{' '}
              <span style={{ fontWeight: 'normal' }}>
                ${quarters.price} за ночь
              </span>
            </p>
            <p style={{ fontWeight: 'bold' }}>
              Площадь:{' '}
              <span style={{ fontWeight: 'normal' }}>{quarters.space} Квм</span>
            </p>
            <p style={{ fontWeight: 'bold' }}>
              О жилье:{' '}
              <span style={{ fontWeight: 'normal' }}>{quarters.desc}</span>
            </p>
          </div>
          <div className={isAuth ? 'additional' : 'additional_logout'}>
            <Link to='/'>
              <button className='hollowBtn'>К списку жилья</button>
            </Link>
            {isAuth ? (
              <button className='filledBtn' onClick={() => setModal(true)}>
                Написать арендодателю
              </button>
            ) : (
              <span>
                <Link to='/login'>Авторизируйтесь</Link> что бы написать
                сообщения арендодателю
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
