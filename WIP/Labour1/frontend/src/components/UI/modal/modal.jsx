import React from 'react';
import cl from './modal.module.css';

function Modal({children, visible, setVisible}) {

    const classes = [cl.modal];

    if (visible) {
        classes.push(cl.active);
    }

    return <div className={classes.join(' ')} onClick={() => setVisible(false)}>
        <div className={cl.modalvisible} onClick={e => e.stopPropagation()}>
            <span className={cl.closemodal} onClick={() => setVisible(false)}>&times;</span>
            {children}
        </div>
    </div>
}

export default Modal;