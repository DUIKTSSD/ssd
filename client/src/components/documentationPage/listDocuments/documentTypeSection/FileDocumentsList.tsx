import React, {useEffect, useState} from 'react';
import styles from '../documents.module.scss';
import {useAppDispatch, useAppSelector} from '../../../../hooks/reduxhooks.ts';
import {DocumentationsData} from '../../../adminPage/types/adminTypes.ts';
import arrow from '../../../../assets/Arrow (1).png'
import {fetchDocumentations} from "../../../../features/documentations/documentations.ts";
import OpenLinkPDF from "../../OpenLink.tsx";
import {getIconType} from "../../fileIconTypes.ts";
import Loader from "../../../../modules/loader/Loader.tsx";
import Pagination from "../../../common/pagination/Pagination.tsx";
import {useSearchParams} from "react-router-dom";
const FileDocumentsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const {documentations,totalPages, number, loading, error} = useAppSelector(state => state.documentations);
 const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = parseInt(searchParams.get('pageNumber') || '1', 10) - 1;
    const handlePageChange = (page: number) => {
       setSearchParams({ pageNumber: (page + 1).toString() });
    };

    const [documentationsData, setDocumentationsData] = useState<DocumentationsData[]>(documentations || []);

    useEffect(() => {
        dispatch(fetchDocumentations(pageNumber));
    }, [dispatch,pageNumber]);

    useEffect(() => {
        setDocumentationsData(documentations);
    }, [documentations]);

    return (
        <div className={styles.form}>
            {error && <h1>Error: {error}</h1>}
            {loading && <Loader/>}
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
                <p className={styles.form__container}>Документів не знайдено</p>
            )}
             {totalPages > 1 && (
    <Pagination
        currentPage={number}
        totalPages={totalPages}
        onPageChange={handlePageChange}
    />
)}
        </div>
    );
};

export default FileDocumentsList;
