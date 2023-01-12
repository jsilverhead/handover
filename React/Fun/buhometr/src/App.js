import React, { useState } from 'react';
import './App.css';
import Buttons from './UI/Buttons';
import ProgressBar from './UI/ProgressBar';

function App() {
  const [count, setCount] = useState(0);

  function addCount() {
    if (count < 4) {
      setCount((prev) => prev + 0.5);
    }
  }

  return (
    <div className='centerall'>
      <h1>Аннечкин Бухометр</h1>
      <p>React Version</p>
      <ProgressBar />
      <p>Выпито: {count}л</p>
      <Buttons addcount={addCount} count={count} />
    </div>
  );
}

export default App;
