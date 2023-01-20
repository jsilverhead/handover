import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getHouses } from '../redux/features/houses/houseSlice';
import Loading from '../components/UI/loading/loading';
import Pointer from '../components/UI/pointer/pointer';

function MainPage() {

  const dispatch = useDispatch();
  const { houses } = useSelector((state) => state.houses);

  const isLoading = houses.status === 'loading';
  const isError = houses.status === 'error';

  //connecting to a server
  useEffect(() => {
    dispatch(getHouses());
  }, []);

  return (
    <div className='mainpage'>
      <div className='filters'>
        <div className='fhat'>SEARCH & FILTERS</div>
        <div className='search'>
          <input placeholder='Search' className='searchInp'></input>
        </div>
        <div className='prices'>
          <div className='rows'>
            <label htmlFor='pricemin'>Price starts at:</label>
            <input id='pricemin' min={0} className='minmax' />
          </div>
          <div className='rows'>
            <label htmlFor='pricemax'>Price ends at:</label>
            <input id='pricemax' className='minmax' />
          </div>
        </div>
        <div className='spaces'>
          <div className='rows'>
            <label htmlFor='spacemin'>Space starts at:</label>
            <input id='spacemin' min={0} className='minmax' />
          </div>
          <div className='rows'>
            <label htmlFor='spacemax'>Space ends at:</label>
            <input id='spacemax' className='minmax' />
          </div>
        </div>
        <div className='types'>
          <label htmlFor='qartertype'>Quarters Type:</label>
          <select id='quartertype' onChange={(e) => console.log(e.target.value)}>
            <option value='all'>All</option>
            <option value='estate'>Estate</option>
            <option value='hotel'>Hotel Rooms</option>
            <option value='flat'>Flats</option>
          </select>
        </div>
      </div>
      {isError ? <p>Nothing found</p> : isLoading ? (
        <Loading />
      ) : (
        <div className='cards'>
          {houses.items.map((house) => (
            <div key={house.title} className='housecard'>
              <Link to={'/' + house._id} id={house._id}><img alt={house.title} src={house.picture} className='himg' /></Link>
              <div>
                <Link to={'/' + house._id} className='houselink' id={house._id}><h3>{house.title}</h3></Link>
                <Pointer address={house.address} map={house.googleurl} />
                <p><span style={{ fontWeight: 'bold' }}>Price:</span> ${house.price} per night</p>
                <p><span style={{ fontWeight: 'bold' }}>Size:</span> {house.space} Sqm</p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>About: </span>
                  {house.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MainPage;
