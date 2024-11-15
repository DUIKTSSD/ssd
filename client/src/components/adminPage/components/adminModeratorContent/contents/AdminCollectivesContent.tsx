import React from 'react';
import {useAppDispatch} from "../../../../../hooks/reduxhooks.ts";
import {fetchMemesToApprove, rejectApproveMeme} from "../../../../../features/memes/memes.ts";
import styles from "../adminModContent.module.scss";
import RejectBtn from "../../adminApproveBtns/RejectBtn.tsx";
import {CollectivesData} from "../../../types/adminTypes.ts";

const AdminCollectivesContent : React.FC <{data: CollectivesData[]}> = ({ data}) => {

    return (
        <div>
            {data.map(item => (
                <div key={item.id} className={styles.adminModContent__item}>
                    <div className={styles.adminModContent__imageContainer}>
                        <img
                            className={styles.adminModContent__img}
                            src={`data:image/png;base64,${item.image}`}
                            alt="User"
                        />
                        <button className={styles.adminModContent__role}>{item.inFact}</button>
                    </div>
                    <div className={styles.adminModContent__info}>
                        <p className={styles.adminModContent__name}>{item.name}</p>
                        <p className={styles.adminModContent__phone}>({item.phone})</p>
                        <p className={styles.adminModContent__group}>{item.duiktGroup}</p>
                    </div>
                    <div className={styles.adminModContent__actions}>
                        <button className={styles.adminModContent__viewButton}>Переглянути</button>
                        <button className={styles.adminModContent__deleteButton} onClick={() => rejectingMeme(item.id)}>
                            Видалити
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminCollectivesContent;