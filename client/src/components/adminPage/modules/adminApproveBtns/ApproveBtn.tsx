import React from 'react';
import styles from './btn.module.scss';


const ApproveBtn:React.FC = () => {
    return (
        <button className={`${styles.btn} ${styles.btn__approve}`}>Approve</button>
    );
};


export default ApproveBtn;