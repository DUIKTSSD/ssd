import React from 'react';
import {NewsData} from "../../adminPage/types/adminTypes.ts";

import styles from './card.module.scss'

interface NewsCardProps {
    data: NewsData
}

const NewsCard:React.FC<NewsCardProps> = ({data}) => {
    const {
        createdAt,
        image,
        text,
    } = data;


    return (
        <div className={styles.card}>
            <img className={styles.card__img} src={`data:image/jpeg;base64,${image}`} alt="img"/>
            <div className={styles.card__textWrapper}>
                <span className={styles.card__date}>{createdAt}</span>
                <h3 className={styles.card__title}>Title</h3>
                <p className={styles.card__text}>{text}</p>
            </div>
        </div>
    );
};

export default NewsCard;