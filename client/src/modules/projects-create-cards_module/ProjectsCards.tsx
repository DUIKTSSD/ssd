import React from 'react';
import styles from "./projectsCards.module.scss";

interface Card {
    id: number,
    description: string
}

interface ProjectsCardsProps {
    cards: Card[]
}

const ProjectsCards:React.FC<ProjectsCardsProps> = ({cards}) => {


    return (
        <div className={styles.cardsWrapper}>
            {cards.map((card) => (
                <div key={card.id} className={`${styles.cardsWrapper__card} card`}>
                    <h3 className={styles.numberBadge}>{card.id}</h3>
                    <p className={styles.cardsWrapper__text}>{card.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ProjectsCards;