import React, { useRef} from "react";
import styles from "../adminModContent.module.scss"
import RejectBtn from "../../adminApproveBtns/RejectBtn.tsx";
import {MemesData} from "../../../types/adminTypes.ts";

import {useAppDispatch,} from "../../../../../hooks/reduxhooks.ts";
import useDynamicGridColumns from "../../../../../hooks/useDynamicGridColumns.ts";
import {rejectMeme} from "../../../../../features/memes/memes.ts";

const AdminMemesContent: React.FC <{data: MemesData[]}> = ({ data}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridColumns = useDynamicGridColumns(containerRef, 'repeat(3, 1fr)');
    const dispatch = useAppDispatch();
    const rejectingMeme = async (id: number) => {
        try {
            await dispatch(rejectMeme(id));
            console.log('Мем удален:', id);
        } catch(err) {
            console.error('Failed to approve', err)
        }
    }


    return (
        data.map(item => (
            <div  style={{gridTemplateColumns: gridColumns, alignItems: 'center', padding: '10px'}}
                  ref={containerRef}
                  key={item.id} className={styles.adminModContent__item__meme}>
                <img className={styles.adminModContent__img} src={`data:image/png;base64,${item.image}`} alt="Meme"/>
                <div className={styles.adminModContent}>
                    <p>Username: {item.author.username}</p>
                    <p>Email: {item.author.email}</p>
                </div>
                <div className={styles.adminModContent__actions}>
                    <RejectBtn onReject={() => rejectingMeme(item.id)}/>
                </div>
            </div>
        ))
    );
};

export default AdminMemesContent;