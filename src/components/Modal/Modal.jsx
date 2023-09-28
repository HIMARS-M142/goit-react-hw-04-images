import React, { useEffect } from 'react';
import css from '../Styles.module.css';

export const Modal = ({ onBackdropClose, modalImage, onEscClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onEscClose);
    return () => {
      window.removeEventListener('keydown', onEscClose);
    };
  });
  return (
    <div onMouseDown={onBackdropClose} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={modalImage} alt="" />
      </div>
    </div>
  );
};
