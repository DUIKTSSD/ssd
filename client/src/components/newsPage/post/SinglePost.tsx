import React from 'react';
import styles from './post.module.scss'
import {NewsData} from "../../adminPage/types/adminTypes.ts";
import {useNavigate} from "react-router-dom";
import IdeaFormBtn from "../../../modules/ideaFormBtn/ideaFormBtn.tsx";

interface PostProps {
    data: NewsData;
}

const SinglePost:React.FC<PostProps> = ({data}) => {

    const navigate = useNavigate();

    return (
        <div className={styles.post}>
            <div className={styles.post__container}>
                <h2 className={styles.post__title}>{data.text}</h2>
                <img className={styles.post__img} src={`data:image/jpeg;base64,${data.images[0].image}`} alt="img"/>
                <div className={styles.post__textWrapper}>
                    <p className={styles.post__text}>{data.title}</p>
                </div>
                <IdeaFormBtn
                    onClick={() => navigate(-1)} label="Повернутися">
                </IdeaFormBtn>
            </div>
        </div>
    );
};

export default SinglePost;