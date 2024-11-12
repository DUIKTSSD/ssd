import React, {useState} from 'react';
import {ProjectsData} from "../../../types/adminTypes";
import EmptyContent from "./EmptyContent.tsx";
import styles from '../adminModContent.module.scss'
import ApproveBtn from "../../adminApproveBtns/ApproveBtn";
import RejectBtn from "../../adminApproveBtns/RejectBtn";
import PopUp from "../../../../../modules/popup/popUp.tsx";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/reduxhooks";
import {setProjectApprovement, fetchProjectsToInspection} from "../../../../../features/projects/projectsSlice";

const AdminProjectsContent: React.FC = () => {
    const dispatch = useAppDispatch();
    const {loading, error, projects} = useAppSelector(state => state.projects);

    const [selectedProject, setSelectedProject] = useState<ProjectsData | null>(null);

    if (!projects || projects.length === 0) {
        return <EmptyContent/>;
    }

    const handleClosePopUp = () => {
        setSelectedProject(null);
    };

    const handleApproval = async (item: ProjectsData, isLegal: boolean) => {
        try {
            await dispatch(setProjectApprovement({id: item.id, isLegal}));
            dispatch(fetchProjectsToInspection());
        } catch (err) {
            console.error('Failed to approve', err);
        }
    };

    return (
        <div className={styles.adminModContent}>
            {error && <h1>Error: {error}</h1>}
            {loading && <h1>Loading...</h1>}
            {projects.map(item => (
                <div key={item.id} className={styles.adminModContent__item}>
                    <p className={styles.adminModContent__id}>{item.id}</p>
                    <p className={styles.adminModContent__title}>{item.title}</p>
                    <p className={styles.adminModContent__leader}>{item.leader.username}</p>
                    <button
                        onClick={() => setSelectedProject(item)}
                        className={styles.adminModContent__viewBtn}>
                        View
                    </button>
                    <div className={styles.adminModContent__actions}>
                        <ApproveBtn onApprove={() => handleApproval(item, true)}/>
                        <RejectBtn onReject={() => handleApproval(item, false)}/>
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