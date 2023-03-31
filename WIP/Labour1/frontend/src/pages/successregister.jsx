import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../components/UI/loading/loading';

function SuccessRegistration() {
  const status = useSelector((state) => state.auth.updatePassword);
  const isLoading = status.queryStatus === 'loading';

  return (
    <div className={isLoading ? 'mainspace_loading' : 'mainspace'}>
      {isLoading ? (
        <Loading children={'Завершаем процесс'} />
      ) : (
        <div className='authForm'>
          <h1>Success!</h1>
          <h2>Добро пожаловать Rent A House</h2>
          <h3>Now you can start housing</h3>
          <Link to='/'>Find quarters</Link>
        </div>
      )}
    </div>
  );
}

export default SuccessRegistration;
