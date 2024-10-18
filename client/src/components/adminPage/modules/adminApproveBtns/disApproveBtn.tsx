import React from 'react';
import styles from "./btn.module.scss";

const DisApproveBtn:React.FC = () => {
    return (
        <button className={`${styles.btn} ${styles.btn__reject}`}>Reject</button>
    );
};

export default DisApproveBtn;