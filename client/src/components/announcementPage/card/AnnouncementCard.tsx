import React from 'react';
import styles from "../../announcementPage/card/announceCard.module.scss";
import {AnnouncementData} from "../../adminPage/types/adminTypes.ts";
interface AnnouncementCardProps {
    data: AnnouncementData

}
const AnnouncementCard:React.FC<AnnouncementCardProps> = ({data}) => {
   const {
       dateOfEvent,
        image,
        title,
        description,
    } = data;




    return (
        <div className={styles.card}>
            <img className={styles.card__img} src={`data:image/jpeg;base64,${image}`} alt="img"/>
            <div className={styles.card__overlay}>
                <div className={styles.card__content}>
                    <h3 className={styles.card__title}>{title}</h3>
                    <p className={styles.card__description}>{description}</p>
                    <span className={styles.card__date}>Відбудется : {dateOfEvent}</span>
                </div>
            </div>
        </div>
    );
};
export default AnnouncementCard;