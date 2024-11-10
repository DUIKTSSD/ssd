import React, {useEffect, useState} from 'react';
import {ProjectsData} from "../../../types/adminTypes.ts";
import EmptyContent from "./EmptyContent.tsx";
import styles from "../adminModContent.module.scss";
import ApproveBtn from "../../adminApproveBtns/ApproveBtn.tsx";
import RejectBtn from "../../adminApproveBtns/RejectBtn.tsx";
import PopUp from "../modules/popUp.tsx";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/reduxhooks.ts";
import {setProjectApprovement} from "../../../../../features/projects/projectsSlice.ts";
import AddDocumentations from "../../adminAddBtns/AddDocumentations.tsx";

interface ModeratorContentProps {
    data: ProjectsData[] | null | undefined;
}


const AdminProjectsContent:React.FC<ModeratorContentProps> = ({data}) => {

    const dispatch = useAppDispatch();
    const {loading, error} = useAppSelector(state => state.projects);

    const [projects, setProjects] = useState<ProjectsData[] | []>(data || [])
    const [selectedProject, setSelectedProject] = useState<ProjectsData | null>()



    if(data) {
        useEffect(() => {
            setProjects(data)
        }, [data]);
    }

    if(!projects || projects.length === 0) {
        return <EmptyContent/>
    }

    const handleClosePopUp = () => {
        setSelectedProject(null)
    }

    const handleApproval = async(item: ProjectsData, isLegal: boolean) => {
        try {
            dispatch(setProjectApprovement({id: item.id, isLegal}))
            console.log('Done!', item.id)
        } catch(err) {
            console.error('Failed to approve', err)
        }
    }

    const handleClearProject = (item: ProjectsData) => {
        setProjects(prevState => prevState.filter(project => project.id !== item.id))
    }





    return (
        <div className={styles.adminModContent}>
            {error && <h1>Error: {error}</h1>}
            {loading && <h1>Loading...</h1>}
            {data ? data.map(item => (
                <div key={item.id} className={styles.adminModContent__item}>
                    <p className={styles.adminModContent__id}>{item.id}</p>
                    <p className={styles.adminModContent__title}>{item.title}</p>
                    <p className={styles.adminModContent__leader}>{item.leader.username}</p>
                    <button
                        onClick={() => setSelectedProject(item)}
                        className={styles.adminModContent__viewBtn}>Переглянути</button>
                    <div className={styles.adminModContent__actions}>
                        <ApproveBtn onApprove={() => {
                            handleApproval(item, true)
                            handleClearProject(item);
                        }
                        }/>
                        <RejectBtn onReject={() => {
                            handleApproval(item, false)
                            handleClearProject(item)
                        }
                        }/>
                    </div>
                </div>
            )) : <EmptyContent/>}

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