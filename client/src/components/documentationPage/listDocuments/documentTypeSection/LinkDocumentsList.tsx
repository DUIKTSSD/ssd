import React, { useEffect, useState } from 'react';
import styles from '../documents.module.scss';
import arrow from '../../../../assets/Arrow (1).png';
import { DocumentationLinksData } from "../../../adminPage/types/adminTypes.ts";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxhooks.ts";
import {fetchCourseLinks, fetchUsefulLinks} from "../../../../features/documentations/documentationLinks.ts";
import Loader from "../../../../modules/loader/Loader.tsx";
import {useSearchParams} from "react-router-dom";
import Pagination from "../../../common/pagination/Pagination.tsx";

interface Props {
    section: "useful-link" | "course-link";
}

const LinkDocumentsList: React.FC<Props> = ({ section }) => {
    const dispatch = useAppDispatch();
    const { documentationsLinks,totalPages, number, loading, error } = useAppSelector(state => state.documentationLinks);
const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = parseInt(searchParams.get('pageNumber') || '1', 10) - 1;
    const handlePageChange = (page: number) => {
       setSearchParams({ pageNumber: (page + 1).toString() });
    };
    const [links, setLinks] = useState<DocumentationLinksData[]>([]);

    useEffect(() => {
        if (section === "useful-link") {
            dispatch(fetchUsefulLinks(pageNumber));
        } else {
            dispatch(fetchCourseLinks(pageNumber));
        }
    }, [dispatch, section,pageNumber]);

    useEffect(() => {
        setLinks(documentationsLinks || []);
    }, [documentationsLinks]);

    return (
        <div className={styles.form}>
            {error && <h1>Error: {error}</h1>}
            {loading && <Loader/>}
            {links.length > 0 ? (
                links.map((item) => (
                    <div key={item.id} className={styles.form__container}>
                        <img src={arrow} alt="arrowImg"/>
                        <a href={item.url } target="_blank"  rel="noopener noreferrer" title="Перейти"><p className={styles.form__title}>{item.description}</p></a>
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

export default LinkDocumentsList;