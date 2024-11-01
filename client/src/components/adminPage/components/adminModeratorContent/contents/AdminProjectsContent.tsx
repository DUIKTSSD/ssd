import React, {useState} from 'react';
import {ProjectsData} from "../../../types/adminTypes.ts";
import EmptyContent from "./EmptyContent.tsx";
import styles from "../adminModContent.module.scss";
import ApproveBtn from "../../adminApproveBtns/ApproveBtn.tsx";
import RejectBtn from "../../adminApproveBtns/RejectBtn.tsx";
import PopUp from "../modules/popUp.tsx";
import api from "../../../../../api.ts";
interface ModeratorContentProps {
    data: ProjectsData[] | null | undefined;
}


const AdminProjectsContent:React.FC<ModeratorContentProps> = ({data}) => {

    const [selectedProject, setSelectedProject] = useState<ProjectsData | null>(null)

    if(!data || data.length === 0) {
        return <EmptyContent/>
    }

    const handleClosePopUp = () => {
        setSelectedProject(null)
    }

    const handleApproval = async(item: ProjectsData, isLegal: boolean) => {
        const response = await api.adminApprove(`/projects/admin/setislegal/${item.id}?isLegal=${isLegal}`, item)
    }



    return (
        <div className={styles.adminModContent}>
            {data.map(item => (
                <div key={item.id} className={styles.adminModContent__item}>
                    <p className={styles.adminModContent__id}>{item.id}</p>
                    <p className={styles.adminModContent__title}>{item.title}</p>
                    <p className={styles.adminModContent__leader}>{item.leader.username}</p>
                    <button
                        onClick={() => setSelectedProject(item)}
                        className={styles.adminModContent__viewBtn}>Переглянути</button>
                    <div className={styles.adminModContent__actions}>
                        <ApproveBtn onApprove={handleApproval(item, true)}/>
                        <RejectBtn onReject={handleApproval(item, false)}/>
                    </div>
                </div>
            ))}

            {selectedProject && (
                <PopUp title={`Project ${selectedProject.title}`} onClose={handleClosePopUp}>
                    <div className={styles.adminModContent__infoContent}>
                        <b>Description:</b>
                        <p>{selectedProject.mainText}</p>

                        <b>Tech Stack:</b>
                        <p>{selectedProject.technologyStack}</p>

                        <b>Wishes:</b>
                        <p>{selectedProject.wishes}</p>

                        <b>Phone number:</b>
                        <p>{selectedProject.phoneNumber}</p>

                        <b>Telegram:</b>
                        <p>{selectedProject.telegramProfile}</p>
                    </div>
                </PopUp>
            )}
        </div>
    );
};

export default AdminProjectsContent;