import React from 'react';
import {useNavigate} from "react-router-dom";
import {CollectivesData} from "../../adminPage/types/adminTypes.ts";
import styles from './style.module.scss'
import Card from "../card/Card.tsx";
import IdeaFormBtn from "../../../modules/ideaFormBtn/ideaFormBtn.tsx";


interface CollectiveItemProps {
    data: CollectivesData;
}

const CollectiveItem:React.FC<CollectiveItemProps> = ({data}) => {
    const navigate = useNavigate();
    const team = []
    if(data.team) {
         team.push(...data.team.split(','));
    }


    return (
        <div className={styles.item}>
            <div className={styles['item-wrapper']}>
                <Card {...data}></Card>

                <h3 className={styles['item-title']}>Команда</h3>
                <div className={styles['team-wrapper']}>
                    {team.map((item, key) => (
                        <p key={key} className={styles['team-item']}>
                            {item}
                        </p>
                    ))}
                </div>

                <IdeaFormBtn label="Повернутися" onClick={() => navigate(-1)}></IdeaFormBtn>
            </div>
        </div>
    );
};

export default CollectiveItem;