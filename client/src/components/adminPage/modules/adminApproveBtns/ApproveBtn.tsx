import React from 'react';
import styles from './btn.module.scss';

interface ApproveBtnProps {
    onApprove: () => void;
}

const ApproveBtn:React.FC<ApproveBtnProps> = ({onApprove}) => {
    return (
        <button onClick={onApprove} className={`${styles.btn} ${styles.btn__approve}`}>Approve</button>
    );
};


export default ApproveBtn;