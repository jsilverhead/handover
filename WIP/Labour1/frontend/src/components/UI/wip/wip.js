import React from 'react';
import cl from './wip.module.css';
import wip from '../wip.png';

function Wip() {
  return (
    <div className={cl.wip}>
      <img src={wip} alt='Under Construction' />
      Ведутся работы. Этот функционал пока недоступен.
    </div>
  );
}

export default Wip;
