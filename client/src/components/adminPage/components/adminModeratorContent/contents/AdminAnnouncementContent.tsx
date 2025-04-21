import React, {useRef, useState} from 'react';
import {AnnouncementData} from "../../../types/adminTypes.ts";
import useDynamicGridColumns from "../../../../../hooks/useDynamicGridColumns.ts";
import styles from "../adminModContent.module.scss";
import RejectBtn from "../../adminApproveBtns/RejectBtn.tsx";
import {useAppDispatch} from "../../../../../hooks/reduxhooks.ts";
import {deleteAnnouncement} from "../../../../../features/announcement/announcementSlice.ts";
import PopUp from "../../../../../modules/popup/popUp.tsx";

const AdminAnnouncementContent: React.FC<{ data: AnnouncementData[] }> = ({data}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridColumns = useDynamicGridColumns(containerRef, 'repeat(4, 1fr)');
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementData | null>(null)
     const dispatch = useAppDispatch();
     const deleteannouncement = async(id:number) => {
            dispatch(deleteAnnouncement(id));
            console.log('анонос видален:', id);
    }
    return (
        <div className={styles.adminModContent}>
            {data.map(item => (
                <div style={{gridTemplateColumns: gridColumns, alignItems: 'center', padding: '10px'}}
                     ref={containerRef} key={item.id} className={styles.adminModContent__item}>
                    <img className={styles.adminModContent__img}
                         src={`data:image/png;base64,${item.image}`}
                         alt="Анонос"/>
                    <h6 className={styles.adminModContent__title}>{item.title}</h6>
                    <h6 className={styles.adminModContent__dateOfEvent}>{item.dateOfEvent}</h6>
                    <div className={styles.adminModContent__textWrapper}>
                        <button onClick={() => {
                            setSelectedAnnouncement(item)
                        }} className={styles.adminModContent__viewBtn}>View
                        </button>
                        <RejectBtn onReject={async () => {
                            await deleteannouncement(item.id);
                        }
                        }/>
                    </div>
                </div>
            ))}
            {selectedAnnouncement && (
            <PopUp title='Announcement' onClose={() => setSelectedAnnouncement(null)}>
                <div>
                    <p>{selectedAnnouncement.title}</p>
                    <p><img src={`data:image/png;base64,${selectedAnnouncement.image}`} alt={""}/></p>
                    <p>{selectedAnnouncement.description}</p>
                    <p>{selectedAnnouncement.dateOfEvent}</p>
                </div>
            </PopUp>
)}
        </div>
    );
};

export default AdminAnnouncementContent;