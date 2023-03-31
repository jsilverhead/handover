import React from 'react';
import { Link } from 'react-router-dom';
import Pointer from '../pointer/pointer';

function HouseCard({ house }) {
  return (
    <div key={house.title} className='housecard'>
      <Link to={'/' + house._id} id={house._id}>
        <img alt={house.title} src={house.picture} className='himg' />
      </Link>
      <div>
        <Link to={'/' + house._id} className='houselink' id={house._id}>
          <h3>{house.title}</h3>
        </Link>
        <Pointer address={house.address} map={house.googleurl} />
        <p>
          <span style={{ fontWeight: 'bold' }}>Цена:</span> ${house.price} за
          ночь
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>Площадь:</span> {house.space} Квм
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>О жилье: </span>
          {house.desc}
        </p>
      </div>
    </div>
  );
}

export default HouseCard;
