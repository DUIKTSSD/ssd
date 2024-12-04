import React from 'react';
import styles from './style.module.scss';
import { CollectivesData } from "../../adminPage/types/adminTypes.ts";
import { Link } from "react-router-dom";
import {setEqualHeights} from "../../../hooks/useEqualHeights.ts"

const Card: React.FC<CollectivesData> = (props) => {

     const addToRefs =setEqualHeights('card');

  return (
    <div
      ref={addToRefs}
      className={`${styles.card} card`} // Correct template literal syntax for className
    >
      <div className={styles['card-top']}>
        <h2 className={styles['card-title']}>{props.name}</h2>
        <h4 className={styles['card-phone']}>{props.phone}</h4>
        <p className={styles['card-group']}>{props.duiktGroup}</p>
      </div>
      <img
        className={styles['card-img']}
        src={`data:image/png;base64,${props.image}`} // Correct image source format
        alt="img"
      />
      <div className={styles['card-text']}>
        <p>{props.specialty}</p>
        <p>{props.description}</p>
      </div>
      <div className={styles['card-rank']}>
        <h3 className={styles['card-rank']}>{props.inFact}</h3>
      </div>
      {props.team ? (
        <Link to={"collective/"} />
      ) : null}
    </div>
  );
};

export default Card;
