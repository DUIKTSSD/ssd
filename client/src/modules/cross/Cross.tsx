import React, {ButtonHTMLAttributes} from 'react';
import styles from './cross.module.scss';


const Cross:React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({...props}) => {
    return (
        <button {...props} type="button" className={styles['cross-btn']}>
            <span className={styles['cross-btn-cross']}>
            </span>
        </button>
    );
};

export default Cross;