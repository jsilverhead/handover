import React, { useState } from 'react';
import residence from '../residence.svg';
import house from '../house.svg';
import hotel from '../hotel.svg';
import cl from './filter.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getHouses } from '../../../redux/features/houses/houseSlice';
import { filterHouses } from '../../../redux/features/houses/houseSlice';

function Filters({ maxPrice, maxSpace, isMobile }) {
  const [visibleFilters, setVisibleFilters] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  function applyFilter(values) {
    try {
      dispatch(filterHouses(values));
    } catch (e) {
      console.log('Error:', e);
      return;
    }
  }

  async function eraseFilters() {
    try {
      const res = await dispatch(getHouses());
    } catch (error) {
      console.log('Error:', error);
    }
  }

  function displayFilters() {
    if (isMobile) {
      if (visibleFilters === false) {
        setVisibleFilters(true);
      } else {
        setVisibleFilters(false);
      }
    } else {
      return;
    }
  }

  return (
    <div className={cl.filters}>
      <div className={cl.fhat} onClick={() => displayFilters()}>
        <span>ПОИСК & ФИЛЬТРЫ</span>
        <span className={cl.showFilters}>
          {!visibleFilters ? 'развернуть ▼' : 'свернуть ▲'}
        </span>
      </div>
      <div
        className={!visibleFilters ? cl.filters_inner : cl.filters_inner_open}
      >
        <form onSubmit={handleSubmit(applyFilter)}>
          <div className={cl.search}>
            <div className={cl.fsection}>
              <span className={cl.labels}>Поиск</span>
            </div>
            <input
              id='search'
              placeholder='Поиск'
              className={cl.searchInp}
              {...register('searchQuery')}
            ></input>
          </div>
          <div className={cl.fsection}>
            <span className={cl.labels}>Цена</span>
          </div>
          <div className={cl.prices}>
            <div className={cl.rows}>
              <label htmlFor='pricemin' className={cl.labels}>
                От:
              </label>
              <input
                id='pricemin'
                min={0}
                className={cl.minmax}
                defaultValue={0}
                {...register(
                  'priceMin',
                  {
                    required: 'Поле не может быть пустым',
                  },
                  { min: 0 },
                  { max: maxPrice }
                )}
              />
            </div>
            <div className={cl.rows}>
              <label htmlFor='pricemax' className={cl.labels}>
                До:
              </label>
              <input
                id='pricemax'
                className={cl.minmax}
                defaultValue={maxPrice ? maxPrice : 0}
                {...register(
                  'priceMax',
                  { required: 'Поле не может быть пустым' },
                  { min: 0 },
                  { max: maxPrice }
                )}
              />
            </div>
          </div>
          <div className={cl.fsection}>
            <span className={cl.labels}>Площадь</span>
          </div>
          <div className={cl.spaces}>
            <div className={cl.rows}>
              <label htmlFor='spacemin' className={cl.labels}>
                От:
              </label>
              <input
                id='spacemin'
                className={cl.minmax}
                defaultValue={0}
                {...register(
                  'spaceMin',
                  { required: 'Поля не может быть пустым' },
                  { min: 0 },
                  { max: maxSpace }
                )}
              />
            </div>
            <div className={cl.rows}>
              <label htmlFor='spacemax' className={cl.labels}>
                До:
              </label>
              <input
                id='spacemax'
                className={cl.minmax}
                defaultValue={maxSpace ? maxSpace : 0}
                {...register(
                  'spaceMax',
                  { required: 'Поле не может быть пустым' },
                  { min: 0 },
                  { max: maxSpace }
                )}
              />
            </div>
          </div>
          <div className={cl.types}>
            <div className={cl.fsection}>
              <span className={cl.labels}>Тип жилья</span>
            </div>
            <div className={cl.pickhouse}>
              <label>
                <input
                  type='checkbox'
                  name='flat'
                  {...register('flat')}
                  defaultChecked
                />
                <img
                  src={residence}
                  title='Квартиры'
                  className={cl.housetype}
                />
              </label>
              <label>
                <input
                  type='checkbox'
                  name='estate'
                  {...register('estate')}
                  defaultChecked
                />
                <img src={house} title='Дома' className={cl.housetype} />
              </label>
              <label>
                <input
                  type='checkbox'
                  name='hotel'
                  {...register('hotel')}
                  defaultChecked
                />
                <img src={hotel} title='Гостинцы' className={cl.housetype} />
              </label>
            </div>
            <br />
            <button
              className='filledBtn'
              type='submit'
              onClick={(e) => e.preventDefault}
            >
              Применить
            </button>
            <br />
            <button className='hollowBtn' onClick={eraseFilters}>
              Сбросить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Filters;
