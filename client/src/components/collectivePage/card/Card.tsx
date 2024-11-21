import React from 'react';
import styles from './style.module.scss'
import {CollectivesData} from "../../adminPage/types/adminTypes.ts";
import {Link} from "react-router-dom";

const Card:React.FC<CollectivesData> = (props) => {


    return (
        <div className={styles.card}>
            <div className={styles['card-top']}>
                <h2 className={styles['card-title']}>{props.name}</h2>
                <h4 className={styles['card-phone']}>{props.phone}</h4>
                <p className={styles['card-group']}>{props.duiktGroup}</p>
            </div>
            <img className={styles['card-img']} src={`data:image:image/png;base64,${props.image}`} alt="img"/>
            <div className={styles['card-text']}>
                <p>{props.specialty}</p>
                <p>{props.description}</p>
            </div>
            <div className={styles['card-rank']}>
                <h3 className={styles['card-rank']}>{props.inFact}</h3>
            </div>
            {props.team ?(
                <Link to={"collective/"}/>
            ) : null}
        </div>
    );
};

export default Card;