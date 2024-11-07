import React from 'react';
import { ProjectsData } from "../../../../adminPage/types/adminTypes";
import styles from './projectscard.module.scss';

interface ProjectCardProps {
    data: ProjectsData;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
    const {
        leader,
        title,
        mainText,
        technologyStack,
        wishes,
        telegramProfile,
        phoneNumber
    } = data;


    return (
        <div className={`${styles.card} card`}>
            <div className={styles.card__userInfo}>
                <p>Лідер: {leader.username}</p>
                <p>Телефон: {phoneNumber}</p>
                <p>Telegram: {telegramProfile}</p>
            </div>
            <div className={styles.card__projectInfo}>
                <div className={styles.card__titleWrapper}>
                    <h3 className={styles.card__title}>{title}</h3>
                    <p>{mainText}</p>
                </div>
                <div className={styles.card__wishesWrapper}>
                    <h4>Побажання</h4>
                    <p>{wishes}</p>
                </div>
            </div>
            <span className={styles.card__details}>Тикни для подробиць</span>
        </div>
    );
};

export default ProjectCard;

