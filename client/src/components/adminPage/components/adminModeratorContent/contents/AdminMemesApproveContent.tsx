import React from "react";
import styles from "../adminModContent.module.scss"
import ApproveBtn from "../../adminApproveBtns/ApproveBtn.tsx";
import RejectBtn from "../../adminApproveBtns/RejectBtn.tsx";
import {MemesData} from "../../../types/adminTypes.ts";

import {useAppDispatch,} from "../../../../../hooks/reduxhooks.ts";
import {fetchMemesToApprove, rejectApproveMeme} from "../../../../../features/memes/memes.ts";

const AdminMemesContent: React.FC <{data: MemesData[]}> = ({ data}) => {
    const dispatch = useAppDispatch();
    const rejectingMeme = async (id: number) => {
        try {
            await dispatch(rejectApproveMeme(id));
            console.log('Мем удален:', id);
            dispatch(fetchMemesToApprove());
        } catch(err) {
            console.error('Failed to approve', err)
        }
    }
    return (
        data.map(item => (
            <div key={item.id} className={styles.adminModContent__item__meme}>
                <p className={styles.adminModContent__id}>ID: {item.id}</p>
                <img className={styles.adminModContent__img} src={`data:image/png;base64,${item.image}`} alt="Meme"/>
                <div>
                    <p className={styles.adminModContent__author}>Username: {item.author.username}</p>
                    <p className={styles.adminModContent__author}>Email: {item.author.email}</p>
                </div>
                <div className={styles.adminModContent__actions}>
                    <RejectBtn onReject={() => rejectingMeme(item.id)}/>
                </div>
            </div>
        ))
    );
};

export default AdminMemesContent;