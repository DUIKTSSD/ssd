import React, {useRef} from 'react';
import {DocumentationLinksData} from "../../../../types/adminTypes.ts";
import styles from "../documentationContent.module.scss"
import RejectBtn from "../../../adminApproveBtns/RejectBtn.tsx";
import {useAppDispatch} from "../../../../../../hooks/reduxhooks.ts";
import useDynamicGridColumns from "../../../../../../hooks/useDynamicGridColumns.ts";
import {deleteCourseLinks} from "../../../../../../features/documentations/documentationLinks.ts";



const AdminCourseLinks: React.FC<{ data: DocumentationLinksData[] }> = ({data}) => {
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const gridColumns = useDynamicGridColumns(containerRef, 'repeat(2, 1fr)');
    const deleteDoc = async(id:number) => {
            dispatch(deleteCourseLinks(id));
            console.log('Документация удалена:', id);
    }
    return (
        <div className={styles.adminModContent}>
            {data.map(item => (
                <div  style={{gridTemplateColumns: gridColumns, alignItems: 'center', padding: '10px'}}
                      ref={containerRef}  key={item.id} className={styles.adminModContent__item}>
                    <h6 className={styles.adminModContent__title}>{item.description}</h6>
                    <div className={styles.adminModContent__actions}>
                        <button className={styles.adminModContent__btnLink} onClick={() => {
                            window.open(item.url, '_blank', 'noopener,noreferrer')
                        }
                        }>Перейти</button>
                        <RejectBtn onReject={async () => {
                            await deleteDoc(item.id);
                        }
                        }/>
                    </div>
                </div>
            ))}
        </div>
    )
}
    export default AdminCourseLinks;
