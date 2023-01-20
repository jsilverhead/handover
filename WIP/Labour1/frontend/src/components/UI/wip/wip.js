import React from 'react';
import cl from './wip.module.css';
import wip from '../wip.png';

function Wip() {
  return (
    <div className={cl.wip}>
      <img src={wip} alt='Under Construction' />
      This area is under construction. Please come again later.
    </div>
  );
}

export default Wip;
