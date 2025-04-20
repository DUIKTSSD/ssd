import React from 'react';
import styles from './post.module.scss'
import {AnnouncementData, } from "../../adminPage/types/adminTypes.ts";
import {useNavigate} from "react-router-dom";
import IdeaFormBtn from "../../../modules/ideaFormBtn/ideaFormBtn.tsx";

interface AnnouncementCardProps {
    data: AnnouncementData

}

const SingleAnnounce:React.FC<AnnouncementCardProps> = ({data}) => {

    const navigate = useNavigate();

    return (
        <div className={styles.post}>
            <div className={styles.post__container}>
                <h2 className={styles.post__title}>{data.title}</h2>
                <p>Відбудется: {data.dateOfEvent}</p>
                <img className={styles.post__img} src={`data:image/jpeg;base64,${data.image}`} alt="img"/>

                <span style={{color: "white"}}>-------------------------------</span>
                <div className={styles.post__textWrapper}>
                    <p className={styles.post__text}>{data.description}</p>

                </div>

                <IdeaFormBtn
                    onClick={() => navigate(-1)} label="Повернутися">
                </IdeaFormBtn>
            </div>
        </div>
    );
};

export default SingleAnnounce;