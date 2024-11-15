import React from 'react';
import styles from "../headerTitleStyle/title.module.scss";

const TeamTitle = () => {
    return (
        <div className={styles.documentTitle}>
            <div className={styles.documentTitle__container}>
                <div className={styles.documentTitle__title}>
                    <h1>Колектив</h1>
                </div>
                <div className={styles.documentTitle__describe}>
                    <h3>Ми — команда, яка перетворює ідеї на результат!</h3>
                </div>
            </div>
        </div>
    );
};

export default TeamTitle;