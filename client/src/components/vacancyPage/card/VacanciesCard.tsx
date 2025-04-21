import React from 'react';
import { VacanciesData} from "../../adminPage/types/adminTypes.ts";
import styles from "./vacanciesCard.module.scss";
interface VacanciesCardProps {
    data: VacanciesData;

}
const VacanciesCard:React.FC<VacanciesCardProps> = ({data}) => {
   const {
       title,
       company,
       location,
       salary,
       typeOfEmployment,
       description,
    } = data;

    return (
        <div className={styles.card}>
            <div className={styles.card__overlay}>
                <div className={styles.card__content}>
                    <h1 className={styles.card__title}>{title}</h1>
                    <div className={styles.card__flex}>
                        <p className={styles.card__price}>{salary}</p>
                        <p  className={styles.card__type}>({typeOfEmployment})</p>
                    </div>
                    <div className={styles.card__flex}>
                        <p className={styles.card__company}>{company}</p>
                        <p className={styles.card__location}>{location}</p>
                    </div>
                    <p className={styles.card__description}>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default VacanciesCard;