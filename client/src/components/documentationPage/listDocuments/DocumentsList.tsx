import React, { useEffect, useState } from 'react';
import styles from './documents.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks.ts';
import { DocumentationsData } from '../../adminPage/types/adminTypes.ts';
import pdfImage from '../../../assets/pdf.png';
import arrow from '../../../assets/Arrow (1).png'
import {fetchDocumentations} from "../../../features/documentations/documentations.ts";
import AdminDocumentationsContent from "../../adminPage/components/adminModeratorContent/contents/AdminDocumentationsContent.tsx";
import OpenLinkPDF from "../OpenLinkPDF.tsx";

interface DocumentsListProps {
    data: DocumentationsData[];
}

const DocumentsList: React.FC<DocumentsListProps> = ({ data }) => {
    const dispatch = useAppDispatch();
    const { documentations, loading, error } = useAppSelector(state => state.documentations);

    const [documentationsData, setDocumentationsData] = useState<DocumentationsData[]>(data || []);

    useEffect(() => {
        dispatch(fetchDocumentations());
    }, [dispatch]);

    useEffect(() => {
        // Sync the Redux store data to local state when documentations change
        setDocumentationsData(documentations);
    }, [documentations]);



    return (
        <div className={styles.form}>
            {documentationsData.length > 0 ? (
                documentationsData.map((item) => (
                    <div className={styles.form__container}>
                        <img src={arrow}/>
                        <img className={styles.form__src}src={pdfImage}/>
                        <div onClick={()=>OpenLinkPDF(item.file)} className={styles.form__title}>{item.name}</div>
                    </div>

                ))
            ) : (
                <p>No documents available</p>
            )}
        </div>
    );
};

export default DocumentsList;
