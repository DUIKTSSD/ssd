import React from 'react';
import styles from "./adminModContent.module.scss";
import {GalleryData, MemesData, NewsData, ProjectsData} from "../../types/adminTypes.ts";
import ApproveBtn from "../adminApproveBtns/ApproveBtn.tsx";
import RejectBtn from "../adminApproveBtns/RejectBtn.tsx";


export type ModeratorContent = ProjectsData | NewsData | MemesData | GalleryData

interface ModeratorContentProps {
    data: ModeratorContent;
}
const AdminModContent:React.FC<ModeratorContentProps> = ({data}) => {

    switch (data.type) {
        case "gallery":
            return (
            <div className={styles.adminModContact__gallery}>
                <p>{data.id}</p>
                <p>{data.owner}</p>
                <div className={styles.adminModContact__actions}>
                    <ApproveBtn onApprove={data.onApprove}/>
                    <RejectBtn onReject={data.onReject}/>
                </div>
            </div>
        )
        case "memes":
            return (
            <div className={styles.adminModContact__memes}>
                <p>{data.id}</p>
                <p>{data.owner}</p>
                <div className={styles.adminModContact__actions}>
                    <ApproveBtn onApprove={data.onApprove}/>
                    <RejectBtn onReject={data.onReject}/>
                </div>
            </div>
        )
        case "news":
            return (
            <div className={styles.adminModContact__news}>
                <p>{data.id}</p>
                <h3>News: {data.title}</h3>
                <p>{data.description}</p>
                <div className={styles.adminModContact__actions}>
                    <ApproveBtn onApprove={data.onApprove}/>
                    <RejectBtn onReject={data.onReject}/>
                </div>
            </div>
        )
        case "projects":
            return (
            <div className={styles.adminModContact__projects}>
                <p>{data.id}</p>
                <h3>Project: {data.title}</h3>
                <p>Tech Stack: {data.technologyStack}</p>
                <p>Description: {data.mainText}</p>
                <div className={styles.adminModContact__actions}>
                    <ApproveBtn onApprove={data.onApprove}/>
                    <RejectBtn onReject={data.onReject}/>
                </div>
            </div>
        )
        default:
            return null
    }
};

export default AdminModContent;