import React, { memo } from 'react';
import { ProjectsData } from "../../../../adminPage/types/adminTypes";
import styles from './projectscard.module.scss';

interface ProjectCardProps {
    data: ProjectsData;
    onExtend: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = memo(({ data, onExtend }) => {
    const {
        title,
        mainText,
        wishes,
    } = data;

    return (
        <div className={styles.card}>
            <div className={styles.card__overlay}></div>
            <div className={styles.card__content}>
                <h1 className={styles.card__title}>{title}</h1>
                <p className={styles.card__description}>{mainText}</p>
                <h4 className={styles.card__wishesTitle}>Побажання</h4>
                <p className={styles.card__wishes}>{wishes}</p>

                <button
                    onClick={onExtend}
                    className={styles.card__details}
                    aria-label="Show project details"
                >
                    Переглянути
                </button>
            </div>
        </div>
    );
});

export default ProjectCard;
