import React from 'react';
import styles from "./btn.module.scss";

interface RejectBtnProps {
    onReject: () => void;
}

const RejectBtn:React.FC<RejectBtnProps> = ({onReject}) => {


    return (
        <button onClick={onReject} className={`${styles.btn} ${styles.btn__reject}`}>Видалити</button>
    );
};

export default RejectBtn;