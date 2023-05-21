import React, { useEffect, useRef, useState } from 'react';
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
  const [pic, setPic] = useState('');
  const [isPic, setIsPic] = useState(false);
  const totalPics = useRef(0);
  const index = useRef(0);
  const [x1, setX1] = useState(null);
  const [x2, setX2] = useState(null);

  function handleTouch(e) {
    const onTouch = e.touches[0];
    setX1(onTouch.screenX);
  }
  function handleMove(e) {
    if (x1 === null) {
      console.log(x1);
      return false;
    }
    setX2(e.touches[0].screenX);
  }
  function handleStop(e) {
    let xDiff = x2 - x1;
    console.log(xDiff);

    if (xDiff > 0) {
      index.current++;
      setPic(quarters.additional[index.current]);
    } else {
      index.current--;
      setPic(quarters.additional[index.current]);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
    fetchQuarters();
  }, []);

  async function fetchQuarters() {
    try {
      const res = await server.get(`/${id}`);
      setQuarters(res.data);
      totalPics.current = res.data.additional.length;
    } catch (error) {
      setError(`An error occured: ${error}`);
    }
  }

  function showPic(e) {
    index.current = e.target.id;
    for (let i = 0; i <= quarters.additional.length; i++) {
      if (i == e.target.id) {
        setPic(quarters.additional[i]);
        setIsPic(true);
        setModal(true);
      }
    }
  }

  return (
    <div className={isLoading ? 'mainspace_loading' : 'mainspace'}>
      {!isPic ? (
        <Modal visible={modal} setVisible={setModal}>
          <Wip />
        </Modal>
      ) : (
        <Modal
          visible={modal}
          setVisible={setModal}
          isPic={isPic}
          setIsPic={setIsPic}
          pictures={quarters.additional}
          changePic={setPic}
          picIndex={index.current}
          totalPics={totalPics.current}
        >
          <img
            src={pic}
            className='greatPic'
            onTouchStart={handleTouch}
            onTouchMove={handleMove}
            onTouchEnd={handleStop}
          />
        </Modal>
      )}
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
              {quarters.additional.map((element, index) => (
                <div className='slider_photo' key={element}>
                  <img
                    src={element}
                    className='slider_img'
                    id={index}
                    onClick={showPic}
                  />
                </div>
              ))}
            </Slider>
            <br />
            <Pointer map={quarters.googleurl} address={quarters.address} />
            <br />
            <br />
            <p style={{ fontWeight: 'bold' }}>
              Цена:{' '}
              <span style={{ fontWeight: 'normal' }}>
                ${quarters.price} в месяц
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
              <span style={{ marginTop: '15px' }}>
                <Link to='/login'>Авторизируйтесь</Link> чтобы написать
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
