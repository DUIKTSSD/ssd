import React from 'react';
import styles from './btns.module.scss'


const DeleteBtn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({...props}) => {
    return (
        <button {...props} className={`${styles.btn__delete} ${styles.btn}`}>
            ВИДАЛИТИ
        </button>
    );
};

export default DeleteBtn;