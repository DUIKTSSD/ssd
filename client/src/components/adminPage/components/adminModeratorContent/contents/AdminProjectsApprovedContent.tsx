import React, {useEffect, useRef, useState} from 'react';
import {ProjectsData} from "../../../types/adminTypes.ts";
import EmptyContent from "./EmptyContent.tsx";
import styles from "../adminModContent.module.scss";
import RejectBtn from "../../adminApproveBtns/RejectBtn.tsx";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/reduxhooks.ts";
import {deleteProject,} from "../../../../../features/projects/projectsSlice.ts";
import PopUp from "../../../../../modules/popup/popUp.tsx";
import {useSearchParams} from "react-router-dom";
import Pagination from "../../../../common/pagination/Pagination.tsx";

interface ModeratorContentProps {
    data: ProjectsData[] | null | undefined;
    pageNumber: number,
    totalPages: number
}


const AdminProjectsApprovedContent:React.FC<ModeratorContentProps> = ({data ,pageNumber,totalPages}) => {

    const dispatch = useAppDispatch();
    const {loading, error} = useAppSelector(state => state.projects);
     const [, setSearchParams] = useSearchParams();
    const [projects, setProjects] = useState<ProjectsData[] | []>(data || [])
    const [selectedProject, setSelectedProject] = useState<ProjectsData | null>()
   const containerRef = useRef<HTMLDivElement>(null);
     const handlePageChange = (page: number) => {
       setSearchParams({ pageNumber: (page + 1).toString() });
    };

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

    const handleApproval = async(item: ProjectsData) => {
        try {
            dispatch(deleteProject(item.id))
            console.log('Done!', item.id)
        } catch(err) {
            console.error('Failed to approve', err)
        }
    }

    const handleClearProject = (item: ProjectsData) => {
        setProjects(prevState => prevState.filter(project => project.id !== item.id))
    }
    return (
        <div ref={containerRef} className={styles.adminModContent}>
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
                        <RejectBtn onReject={() => {
                            handleApproval(item)
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
             <Pagination
        currentPage={pageNumber}
        totalPages={totalPages}
        onPageChange={handlePageChange}
    />
        </div>
    );
};

export default AdminProjectsApprovedContent;