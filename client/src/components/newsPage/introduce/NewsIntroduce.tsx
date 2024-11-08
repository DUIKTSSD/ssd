import React from 'react';
import styles from './introduce.module.scss'


const NewsIntroduce:React.FC = () => {
    return (
        <div className={styles.introduce}>
            <div className={styles.introduce__container}>
                <div className={styles.introduce__title_wrapper}>
                    <h1 className={styles.introduce__title}>Новини</h1>
                </div>
                <div className={styles.introduce__subtitle}>
                    <p>Не пропусти головне! Читай останні новини,
 відчуй енергію студентських заходів та дізнавайся про досягнення наших студентів!</p>
                </div>
            </div>
        </div>
    );
};

export default NewsIntroduce;