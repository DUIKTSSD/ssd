import React, {useRef, useState} from 'react';
import styles from "../adminModContent.module.scss";
import RejectBtn from "../../adminApproveBtns/RejectBtn.tsx";
import {CollectivesData} from "../../../types/adminTypes.ts";
import PopUp from "../../../../../modules/popup/popUp.tsx";
import {useAppDispatch} from "../../../../../hooks/reduxhooks.ts";
import {deleteCollective, fetchCollectives} from "../../../../../features/collectives/collectives.ts";
import useDynamicGridColumns from "../../../../../hooks/useDynamicGridColumns.ts";

const AdminCollectivesContent: React.FC<{ data: CollectivesData[] }> = ({data}) => {
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<CollectivesData | null>(null);
    const gridColumns = useDynamicGridColumns(containerRef, 'repeat(3, 1fr)');

    const handleClosePopUp = () => {
        setSelectedProject(null);
    };

    const deleteLead = async (id: number) => {
        try {
            await dispatch(deleteCollective(id));
            console.log('Collective deleted:', id);
            await dispatch(fetchCollectives());
        } catch (err) {
            console.error('Failed to delete the collective:', err);
        }
    };
    return (
        <>
            {data.map(item => (
                <div
                    style={{gridTemplateColumns: gridColumns, alignItems: 'center', padding: '10px'}}
                    ref={containerRef}
                    key={item.id}
                    className={styles.adminModContent__item}
                >
                    <div className={styles.adminModContent__imageContainer}>
                        <img
                            className={styles.adminModContent__img__collective}
                            src={`data:image/png;base64,${item.image}`}
                            alt="User"
                        />
                        <p className={styles.adminModContent__role}>{item.inFact}</p>
                    </div>
                    <div className={styles.adminModContent__info}>
                        <p className={styles.adminModContent__name}>{item.name}</p>
                        <p className={styles.adminModContent__phone}>({item.phone})</p>
                        <p className={styles.adminModContent__group}>{item.duiktGroup}</p>
                    </div>
                    <div className={styles.adminModContent__actions}>
                        <button
                            onClick={() => setSelectedProject(item)}
                            className={styles.adminModContent__viewBtn}
                        >
                            View
                        </button>
                        <RejectBtn
                            onReject={() => deleteLead(item.id)}
                        />
                    </div>
                </div>
            ))}
            {selectedProject && (
                <PopUp title={"Інформація про Голову"} onClose={handleClosePopUp}>
                    <div className={styles.adminModContent__infoCollective}>
                        <p className={styles.adminModContent__infoCollective__name}> {selectedProject.name}</p>
                        <p className={styles.adminModContent__infoCollective__phone}>({selectedProject.phone})</p>
                        <p className={styles.adminModContent__infoCollective__group}>{selectedProject.duiktGroup}</p>
                        <div className={styles.adminModContent__infoCollective__image}>
                            <img src={`data:image/png;base64,${selectedProject.image}`} alt="Collective"/>
                        </div>
                        <p className={styles.adminModContent__infoCollective__specialty}> {selectedProject.specialty}</p>
                        <p className={styles.adminModContent__infoCollective__description}>{selectedProject.description}</p>
                        <p className={styles.adminModContent__infoCollective__inFact}>{selectedProject.inFact}</p>
                        {selectedProject.team ? (
                            <p className={styles.adminModContent__infoCollective__description}>
                                <h1 className={styles.adminModContent__infoCollective__name}>Команда</h1>
                                {selectedProject.team.split(',').map((item, index) => (
                                    <span key={index}>{item.trim()}<br/></span>
                                ))}
                            </p>
                        ) : null}
                    </div>
                </PopUp>
            )}
        </>
    );
};

export default AdminCollectivesContent;
