import React, {ButtonHTMLAttributes} from 'react';
import styles from './btns.module.scss'


const LoadBtn:React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({...props}) => {
    return (
        <button {...props} className={`${styles.btn__load} ${styles.btn}`}>
            ЗАВАНТАЖИТИ
        </button>
    );
};

export default LoadBtn;