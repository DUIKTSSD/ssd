import React, {useEffect, useRef, useState} from "react";
import ApproveBtn from "../../adminApproveBtns/ApproveBtn.tsx";
import RejectBtn from "../../adminApproveBtns/RejectBtn.tsx";
import {MemesData} from "../../../types/adminTypes.ts";
import styles from "../adminModContent.module.scss"
import {useAppDispatch,} from "../../../../../hooks/reduxhooks.ts";
import {approveMeme, fetchMemesToInspection, rejectMeme} from "../../../../../features/memes/memes.ts";
import useDynamicGridColumns from "../../../../../hooks/useDynamicGridColumns.ts";


const AdminMemesInspectionContent: React.FC<{ data: MemesData[] }> = ({data}) => {
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const gridColumns = useDynamicGridColumns(containerRef, 'repeat(3, 1fr)');
    const rejectingMeme = async (id: number) => {
        try {
            await dispatch(rejectMeme(id));
            console.log('Документация удалена:', id);
            dispatch(fetchMemesToInspection());
        } catch (err) {
            console.error('Failed to approve', err)
        }
    }
    const approvingMeme = async (id: number) => {
        try {
            await dispatch(approveMeme(id));
            console.log('Документация одобрено:', id);
            dispatch(fetchMemesToInspection());
        } catch (err) {
            console.error('Failed to approve', err)
        }
    }
    return (
        data.map(item => (
            <div style={{gridTemplateColumns: gridColumns, alignItems: 'center', padding: '10px'}}
                 ref={containerRef} key={item.id} className={styles.adminModContent__item__meme}>
                <img className={styles.adminModContent__img} src={`data:image/png;base64,${item.image}`} alt="Meme"/>
                <div>
                    <p >Username: {item.author.username}</p>
                    <p >Email: {item.author.email}</p>
                </div>
                <div className={styles.adminModContent__actions}>
                    <ApproveBtn onApprove={() => approvingMeme(item.id)}/>
                    <RejectBtn onReject={() => rejectingMeme(item.id)}/>
                </div>
            </div>
        ))
    );
};

export default AdminMemesInspectionContent;