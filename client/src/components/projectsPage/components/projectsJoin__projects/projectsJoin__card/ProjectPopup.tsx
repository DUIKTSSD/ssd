import React from 'react';
import styles from './popup.module.scss'
import {ProjectsData} from "../../../../adminPage/types/adminTypes.ts";

interface PopupProps {
    onClose: () => void;
    data: ProjectsData | null;

}


const Popup: React.FC<PopupProps> = ({onClose, data}) => {
    if (!data) {
        return null;
    }
    const {
        technologyStack,
        wishes,
        telegramProfile,
        mainText,
        leader,
        title,
        phoneNumber
    } = data

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <h2 className={styles.card__title}>{title}</h2>
                <div className={styles.card__wrapper}>
                    <p className={styles.card__leader}>
                        <strong>Project Leader: </strong>
                        {leader.username}
                    </p>
                    <p className={styles.card__details}>
                        <strong>Description: </strong>
                        {mainText}
                    </p>
                    <p className={styles.card__technologies}>
                        <strong>Technologies: </strong>
                        {technologyStack}
                    </p>
                    <p className={styles.card__wishes}>
                        <strong>Wishes: </strong>
                        {wishes}
                    </p>
                    <div className={styles.card__contacts}>
                        <h3 className={styles.card__contacts_title}>Contact Information: </h3>
                        <p>Telegram: {telegramProfile}</p>
                        <p>Phone: {phoneNumber}</p>
                    </div>
                </div>
                <h3 className={styles.card__subtitle}>
                    Join my project team!
                </h3>
                <div className={styles.closeBtn__wrapper}>
                    <button onClick={onClose} className={styles.closeBtn}>Exit</button>
                </div>
            </div>

        </div>
    );
};

export default Popup;