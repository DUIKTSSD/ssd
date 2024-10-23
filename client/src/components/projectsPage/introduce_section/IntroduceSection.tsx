import React from 'react';
import styles from "./introduce.module.scss";

const IntroduceSection:React.FC = () => {
    return (
        <div className={styles.introduce}>
            <div className={styles.introduce__container}></div>
            <div className={styles.introduce__title}>
                <h1>Твоя ідея може стати наступним проривом! Настав час діяти!</h1>
            </div>

        </div>
    );
}

export default IntroduceSection;