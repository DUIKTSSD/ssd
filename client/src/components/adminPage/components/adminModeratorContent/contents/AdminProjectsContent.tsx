import React from 'react';
import {ProjectsData} from "../../../types/adminTypes.ts";
import EmptyContent from "./EmptyContent.tsx";
import styles from "../adminModContent.module.scss";
import ApproveBtn from "../../adminApproveBtns/ApproveBtn.tsx";
import RejectBtn from "../../adminApproveBtns/RejectBtn.tsx";
import api from "../../../../../api.ts";

interface ModeratorContentProps {
    data: ProjectsData[] | null | undefined;
}


const AdminProjectsContent:React.FC<ModeratorContentProps> = ({data}) => {

    if(!data || data.length === 0) {
        return <EmptyContent/>
    }



    return (
        <div className={styles.adminModContent}>
            {data.map(item => (
                <div key={item.id} className={styles.adminModContent__item}>
                    <p className={styles.adminModContent__id}>{item.id}</p>
                    <p className={styles.adminModContent__tite}>{item.title}</p>
                    <p className={styles.adminModContent__leader}>{item.leader.username}</p>
                    <p className={styles.adminModContent__info}>{item.mainText}</p>
                    <div className={styles.adminModContent__actions}>
                        <ApproveBtn onApprove={() => {api.adminApprove(`/projects/admin/setislegal/${item.id}?isLegal=true`, item)}}/>
                        <RejectBtn onReject={() => {api.adminApprove(`/projects/admin/setislegal/${item.id}?isLegal=false`, item)}}/>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminProjectsContent;