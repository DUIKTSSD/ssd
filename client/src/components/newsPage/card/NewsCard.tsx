import React from 'react';
import {NewsData} from "../../adminPage/types/adminTypes.ts";

import styles from './card.module.scss'

interface NewsCardProps {
    data: NewsData
}

const NewsCard:React.FC<NewsCardProps> = ({data}) => {
    const {
        createdAt,
        images,
        text,
    } = data;

    function newDateString(createdAt: string) {
        const date = new Date(createdAt);
        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    }


    return (
        <div className={styles.card}>
            <img className={styles.card__img} src={`data:image/jpeg;base64,${data.files[0]}`} alt="img"/>
            <div className={styles.card__textWrapper}>
                <span className={styles.card__date}>{newDateString(createdAt)}</span>
                <h3 className={styles.card__title}>Title</h3>
                <p className={styles.card__text}>{text}</p>
            </div>
        </div>
    );
};

export default NewsCard;