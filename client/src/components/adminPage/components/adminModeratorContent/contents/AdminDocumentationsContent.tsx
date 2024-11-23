import React, {useRef} from 'react';
import {DocumentationsData} from "../../../types/adminTypes.ts";
import styles from "./documentationContent.module.scss"
import RejectBtn from "../../adminApproveBtns/RejectBtn.tsx";
import {
    deleteDocumentation,
} from "../../../../../features/documentations/documentations.ts";
import {useAppDispatch} from "../../../../../hooks/reduxhooks.ts";
import OpenLinkPDF from "../../../../documentationPage/OpenLinkPDF.tsx";
import useDynamicGridColumns from "../../../../../hooks/useDynamicGridColumns.ts";



const AdminDocumentationsContent: React.FC<{ data: DocumentationsData[] }> = ({data}) => {
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const gridColumns = useDynamicGridColumns(containerRef, 'repeat(2, 1fr)');
    const deleteDoc = async(id) => {
            dispatch(deleteDocumentation(id));
            console.log('Документация удалена:', id);
    }
    return (
        <div className={styles.adminModContent}>
            {data.map(item => (
                <div  style={{gridTemplateColumns: gridColumns, alignItems: 'center', padding: '10px'}}
                      ref={containerRef}  key={item.id} className={styles.adminModContent__item}>
                    <h6 className={styles.adminModContent__title}>{item.name}</h6>
                    <div className={styles.adminModContent__actions}>
                        <button className={styles.adminModContent__btnLink} onClick={() => {
                            OpenLinkPDF(item.file,item.name)
                        }
                        }>Переглянути</button>
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
    export default AdminDocumentationsContent;
