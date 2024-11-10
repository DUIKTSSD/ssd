import React, {useEffect} from 'react';
import AdminPageTemplate from "../../components/adminPage/AdminPageTemplate.tsx";
import AdminModContent from "../../components/adminPage/components/adminModeratorContent/AdminModContent.tsx";
import styles from "../../components/adminPage/components/adminModeratorContent/adminModContent.module.scss";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxhooks"
import { fetchDocumentations} from "../../features/documentations/documentations.ts";

const AdminDocumentationsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const {documentations, loading, error} = useAppSelector(state => state.documentations);

    useEffect(() => {
        dispatch(fetchDocumentations())
    }, [dispatch]);


    useEffect(() => {
        console.log('Текущее состояние documentationData:', documentations);
    }, [documentations]);

    return (
        <div className={styles.adminModContent}>
            {error && <h1>Error: {error}</h1>}
            {loading && <h1>Loading...</h1>}
            <AdminPageTemplate
                type="documentations" // Для хэдэра
                children={<AdminModContent data={documentations} contentType="documentations"/>}
            />
        </div>
    );
};

export default AdminDocumentationsPage;