import React from 'react';
import { VacanciesData} from "../../adminPage/types/adminTypes.ts";
import {useNavigate} from "react-router-dom";
import styles from "./post.module.scss";
import IdeaFormBtn from "../../../modules/ideaFormBtn/ideaFormBtn.tsx";
interface VacanciesCardProps {
    data: VacanciesData;

}
const SingleVacancy:React.FC<VacanciesCardProps> = ({data}) => {
    const navigate = useNavigate();
  const {
       title,
       company,
       location,
       typeOfEmployment,
       description,
      salary,
      urlJob
    } = data;
    return (
        <div className={styles.card}>
            <div className={styles.card__container}>
                <div className={styles.card__overlay}>
                    <h1 className={styles.card__title}>{title}</h1>
                        <p className={styles.card__price}>Зарплата: {salary} </p>
                        <p className={styles.card__type}>Тип зайнятости: {typeOfEmployment}</p>
                        <p className={styles.card__company}>Назва компанії: {company}</p>
                        <p className={styles.card__location}>Місце розташування : {location}</p>
                    <h1 className={styles.card__workdescription}>Опис вакансії</h1>
                    <p className={styles.card__description}>{description}</p>
                    <p>Подати заявку можна тут : <a href={urlJob}
                                                   target="_blank"
                                                   rel="noopener noreferrer"
                                                   className={styles.card__link}>
                        Перейти
                    </a></p>
                    <div className={styles.card__button}>
                        <IdeaFormBtn
                            onClick={() => navigate(-1)}
                        label="Повернутися"
                    /></div>
                </div>
            </div>
        </div>
    );
};

export default SingleVacancy;