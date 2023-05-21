import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHouses } from '../redux/features/houses/houseSlice';
import { isAuthorized } from '../redux/features/auth/authSlice';
import Loading from '../components/UI/loading/loading';
import Filters from '../components/UI/filters/filters';
import HouseCard from '../components/UI/housecard/housecard';
import Pagination from '../components/UI/pagination/pagination';

function MainPage({ isMobile }) {
  const dispatch = useDispatch();
  const { houses } = useSelector((state) => state.houses);
  const isAuth = useSelector(isAuthorized);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const isLoading = houses.status === 'loading';
  const isError = houses.status === 'error';

  //connecting to a server
  useEffect(() => {
    loadFunctions();
    console.log(houses);
  }, []);

  async function loadFunctions() {
    try {
      const res = await dispatch(getHouses());
    } catch (error) {
      console.log(error);
    }
  }

  const lastHouseIndex = currentPage * itemsPerPage;
  const firstHouseIndex = lastHouseIndex - itemsPerPage;
  const houseList = houses.items.slice(firstHouseIndex, lastHouseIndex);

  return (
    <div
      className={
        isLoading || isError || houses.items === null
          ? 'mainspace_loading'
          : 'mainspace'
      }
    >
      {isError || houses.length === 0 ? (
        <p>Отсутствует соединение с сервером. Попробуйте позже.</p>
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
              ? houseList.map((house) => (
                  <HouseCard house={house} key={house.title} />
                ))
              : houseList.map(
                  (house, index) =>
                    index < 6 && <HouseCard house={house} key={house.title} />
                )}
          </div>
        </div>
      )}
      {isAuth ? (
        <Pagination
          totalItems={houses.items.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default MainPage;
