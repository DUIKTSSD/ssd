import React, {useEffect, useState} from 'react';
import styles from '../documents.module.scss';
import {useAppDispatch, useAppSelector} from '../../../../hooks/reduxhooks.ts';
import {DocumentationsData} from '../../../adminPage/types/adminTypes.ts';
import arrow from '../../../../assets/Arrow (1).png'
import {fetchDocumentations} from "../../../../features/documentations/documentations.ts";
import OpenLinkPDF from "../../OpenLink.tsx";
import {getIconType} from "../../fileIconTypes.ts";
const FileDocumentsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const {documentations, loading, error} = useAppSelector(state => state.documentations);


    const [documentationsData, setDocumentationsData] = useState<DocumentationsData[]>(documentations || []);

    useEffect(() => {
        dispatch(fetchDocumentations());
    }, [dispatch]);

    useEffect(() => {
        setDocumentationsData(documentations);
    }, [documentations]);

    return (
        <div className={styles.form}>
            {error && <h1>Error: {error}</h1>}
            {loading && <h1>Loading...</h1>}
            {documentationsData.length > 0 ? (
                documentationsData.map((item) => (
                    <div key={item.id} className={styles.form__container}>
                        <img src={arrow} alt="arrowImg"/>
                        <img className={styles.form__img}
                             src={getIconType(item.file)}
                             alt="file-icon"
                        />
                        <div onClick={() => OpenLinkPDF(item.file, item.name)}
                             className={styles.form__title}>{item.name}</div>
                    </div>

                ))
            ) : (
                <p>No documents available</p>
            )}
        </div>
    );
};

export default FileDocumentsList;
