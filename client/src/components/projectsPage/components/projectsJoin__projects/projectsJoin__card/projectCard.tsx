import React, { memo, useState } from 'react';
import { ProjectsData } from "../../../../adminPage/types/adminTypes";
import styles from './projectscard.module.scss';

interface ProjectCardProps {
    data: ProjectsData;
    onExtend: () => void; // Accepts a component or any renderable content
}

const ProjectCard: React.FC<ProjectCardProps> = memo(({ data, onExtend }) => {
    const {
        leader,
        title,
        mainText,
        wishes,
        telegramProfile,
        phoneNumber,
    } = data;

    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <div className={`${styles.card}`}>
            <div className={styles.card__userInfo}>
                <p>Leader: {leader.username}</p>
                <p>Phone: {phoneNumber}</p>
                <p>Telegram: {telegramProfile}</p>
            </div>
            <div className={styles.card__projectInfo}>
                <div className={styles.card__titleWrapper}>
                    <h3 className={styles.card__title}>{title}</h3>
                    <p>{mainText}</p>
                </div>
                <div className={styles.card__wishesWrapper}>
                    <h4>Wishes</h4>
                    <p>{wishes}</p>
                </div>
            </div>
            <button
                onClick={onExtend}
                className={styles.card__details}
                aria-label="Show project details" // !TODO ПЕРЕДЕЛАТЬ СТИЛИ (С ДИЗАЙНЕРОМ)
            >
                Переглянути
            </button>
        </div>
    );
});

export default ProjectCard;

