import React from 'react';
import pointer from '../location-sign.png';
import cl from './pointer.module.css';

function Pointer({map, address}) {
    return <a href={map} className={cl.address}><img src={pointer} className={cl.pointer} />{address}</a>
}

export default Pointer;