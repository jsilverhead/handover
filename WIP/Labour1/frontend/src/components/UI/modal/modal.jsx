import React from 'react';
import cl from './modal.module.css';

function Modal({ children, visible, setVisible, isPic, setIsPic }) {
  const classes = [cl.modal];

  if (visible) {
    classes.push(cl.active);
  }

  function closemodal() {
    setVisible(false);
    setIsPic(false);
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
