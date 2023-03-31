import React, { useState, useEffect, Children, cloneElement } from 'react';
import left from '../left.png';
import right from '../right.png';
import cl from './slider.module.css';

function Slider({ children }) {
  const [pages, setPages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [x1, setX1] = useState(null);
  const [x2, setX2] = useState(null);
  const [xPos, setXPos] = useState(null);

  const slideWidth = 125;

  useEffect(() => {
    setPages(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: {
            height: '100%',
            maxWidth: `${slideWidth}px`,
            minWidth: `${slideWidth}px`,
          },
        });
      })
    );
  }, []);
  function moveLeft() {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + 375;

      return Math.min(newOffset, 0);
    });
  }
  function moveRight() {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - 375;

      const maxOffset = -(slideWidth * (pages.length - 3));

      return Math.max(newOffset, maxOffset);
    });
  }
  function handleTouch(e) {
    const onTouch = e.touches[0];
    setX1(onTouch.screenX);
  }
  function handleMove(e) {
    if (x1 === null) {
      console.log(x1);
      return false;
    }
    setX2(e.touches[0].screenX);

    let xDiff = x2 - x1;
    setOffset(() => {
      if (xDiff < 0) return Math.max(xDiff, -380);
      else return Math.min(xDiff, 0);
    });
  }
  return (
    <div className={cl.slider_container}>
      <img src={left} className={cl.navigation} onClick={moveLeft} />
      <div
        className={cl.slider_window}
        onTouchStart={handleTouch}
        onTouchMove={handleMove}
      >
        <div
          className={cl.slider_items}
          style={{ transform: `translateX(${offset}px)` }}
        >
          {pages}
        </div>
      </div>
      <img src={right} className={cl.navigation} onClick={moveRight} />
    </div>
  );
}

export default Slider;
