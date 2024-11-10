import React from 'react';
import {DocumentationsData} from "../../../types/adminTypes.ts";
import styles from "./documentationContent.module.scss"
import RejectBtn from "../../adminApproveBtns/RejectBtn.tsx";
import {
    deleteDocumentations, fetchDocumentations,
} from "../../../../../features/documentations/documentations.ts";
import {useAppDispatch} from "../../../../../hooks/reduxhooks.ts";
import OpenLinkPDF from "../../../../documentationPage/OpenLinkPDF.tsx";



const AdminDocumentationsContent: React.FC<{ data: DocumentationsData[] }> = ({data}) => {
    const dispatch = useAppDispatch();
    const deleteDocumentaion = async(id: DocumentationsData) => {
        try {
            await dispatch(deleteDocumentations(id)); // вызовите экшн удаления
            console.log('Документация удалена:', id);
            dispatch(fetchDocumentations());
        } catch(err) {
            console.error('Failed to approve', err)
        }
    }
    return (
        <div className={styles.adminModContent}>
            {data.map(item => (
                <div key={item.id} className={styles.adminModContent__item}>
                    <p className={styles.adminModContent__id}>{item.id}</p>
                    <h6 className={styles.adminModContent__title}>{item.name}</h6>
                    <div className={styles.adminModContent__actions}>
                        <button className={styles.adminModContent__btnLink} onClick={() => {
                            OpenLinkPDF(item.file)
                        }
                        }>Переглянути</button>
                        <RejectBtn onReject={() => {
                            deleteDocumentaion(item.id);
                        }
                        }/>
                    </div>
                    {/*<button onClick={() => handleOpenPdf(item.file)}>Переглянути</button>*/}
                    {/*<button>Видалити файл</button>*/}
                </div>
            ))}
        </div>
    )}
    export default AdminDocumentationsContent;
