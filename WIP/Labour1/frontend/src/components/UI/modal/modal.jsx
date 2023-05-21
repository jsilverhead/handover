import React, { useEffect, useState } from 'react';
import cl from './modal.module.css';

function Modal({
  children,
  visible,
  setVisible,
  isPic,
  setIsPic,
  pictures,
  changePic,
  picIndex,
  totalPics,
}) {
  const classes = [cl.modal];

  if (visible) {
    classes.push(cl.active);
  }

  function closemodal() {
    setVisible(false);
    setIsPic(false);
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closemodal();
      }
    });
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', keyPush);
  }, [setIsPic]);

  function keyPush(e) {
    if (e.keyCode === 37) {
      if (picIndex <= 0) {
        return;
      } else {
        picIndex--;
        changePic(pictures[picIndex]);
      }
    }
    if (e.keyCode === 39) {
      if (picIndex >= totalPics - 1) {
        return;
      } else {
        picIndex++;
        changePic(pictures[picIndex]);
      }
    }
  }

  function handleTickLeft() {
    if (picIndex <= 0) {
      return;
    } else {
      picIndex--;
      console.log(picIndex);
      changePic(pictures[picIndex]);
    }
  }

  function handleTickRight() {
    if (picIndex >= totalPics - 1) {
      return;
    } else {
      picIndex++;
      console.log(picIndex);
      changePic(pictures[picIndex]);
    }
  }

  return (
    <div className={classes.join(' ')} onClick={closemodal}>
      <div
        className={!isPic ? cl.modalvisible : cl.modalvisible_pic}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className={!isPic ? cl.closemodal : cl.closemodal_pic}
          onClick={closemodal}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}

export default Modal;
