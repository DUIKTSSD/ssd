import React, { useEffect, useState } from 'react';
import styles from '../documents.module.scss';
import arrow from '../../../../assets/Arrow (1).png';
import { DocumentationLinksData } from "../../../adminPage/types/adminTypes.ts";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxhooks.ts";
import {fetchCourseLinks, fetchUsefulLinks} from "../../../../features/documentations/documentationLinks.ts";

interface Props {
    section: "useful-link" | "course-link";
}

const LinkDocumentsList: React.FC<Props> = ({ section }) => {
    const dispatch = useAppDispatch();
    const { documentationsLinks, loading, error } = useAppSelector(state => state.documentationLinks);

    const [links, setLinks] = useState<DocumentationLinksData[]>([]);

    useEffect(() => {
        if (section === "useful-link") {
            dispatch(fetchUsefulLinks());
        } else {
            dispatch(fetchCourseLinks());
        }
    }, [dispatch, section]);

    useEffect(() => {
        setLinks(documentationsLinks || []);
    }, [documentationsLinks]);

    return (
        <div className={styles.form}>
            {error && <h1>Error: {error}</h1>}
            {loading && <h1>Loading...</h1>}
            {links.length > 0 ? (
                links.map((item) => (
                    <div key={item.id} className={styles.form__container}>
                        <img src={arrow} alt="arrowImg"/>
                        <a href={item.url } target="_blank"  rel="noopener noreferrer" title="Перейти"><p className={styles.form__title}>{item.description}</p></a>
                    </div>
                ))
            ) : (
                <p>No links available</p>
            )}
        </div>
    );
};

export default LinkDocumentsList;