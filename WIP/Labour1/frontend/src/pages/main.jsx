import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHouses } from '../redux/features/houses/houseSlice';
import { isAuthorized } from '../redux/features/auth/authSlice';
import Loading from '../components/UI/loading/loading';
import Filters from '../components/UI/filters/filters';
import HouseCard from '../components/UI/housecard/housecard';

function MainPage({ isMobile }) {
  const dispatch = useDispatch();
  const { houses } = useSelector((state) => state.houses);
  const isAuth = useSelector(isAuthorized);
  const [pages, setPages] = useState([]);

  const isLoading = houses.status === 'loading';
  const isError = houses.status === 'error';

  //connecting to a server
  useEffect(() => {
    loadFunctions();
  }, []);

  async function loadFunctions() {
    try {
      const res = await dispatch(getHouses());
      // counting pages
      for (let i = 0; i < res.payload.length / 6; i++) {
        pages.push(i + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(houses);

  return (
    <div
      className={
        isLoading || isError || houses.length === 0
          ? 'mainspace_loading'
          : 'mainspace'
      }
    >
      {isError || houses.length === 0 ? (
        <p>Ничего не найдено, попробуйте другой запрос.</p>
      ) : isLoading ? (
        <Loading children={'Подбираем дома'} />
      ) : (
        <div className='mainpage'>
          <Filters
            maxSpace={houses.maxspace}
            maxPrice={houses.maxprice}
            isMobile={isMobile}
          />
          <div className='cards'>
            {isAuth
              ? houses.items.map((house) => (
                  <HouseCard house={house} key={house.title} />
                ))
              : houses.items.map(
                  (house, index) =>
                    index < 6 && <HouseCard house={house} key={house.title} />
                )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
