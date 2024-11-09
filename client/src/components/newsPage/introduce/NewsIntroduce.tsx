import React from 'react';
import styles from './introduce.module.scss'

interface IntroduceProps {
    subtitle: string;
}

const NewsIntroduce:React.FC<IntroduceProps> = ({subtitle}) => {
    return (
        <div className={styles.introduce}>
            <div className={styles.introduce__container}>
                <div className={styles.introduce__title_wrapper}>
                    <h1 className={styles.introduce__title}>Новини</h1>
                </div>
                <div className={styles.introduce__subtitle}>
                    <p>{subtitle}</p>
                </div>
            </div>
        </div>
    );
};

export default NewsIntroduce;