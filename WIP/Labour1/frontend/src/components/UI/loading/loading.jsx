import React from 'react';
import cl from './loading.module.css';

function Loading({ children }) {
  return (
    <div className={cl.loading_screen}>
      <div className={cl.loading}></div>
      <span className={cl.blinking_text}>{children}</span>
    </div>
  );
}

export default Loading;
