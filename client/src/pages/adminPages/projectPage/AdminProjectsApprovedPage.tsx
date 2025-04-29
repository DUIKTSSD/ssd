import React, {useEffect} from 'react';
import AdminPageTemplate from "../../../components/adminPage/AdminPageTemplate.tsx";
import AdminModContent from "../../../components/adminPage/components/adminModeratorContent/AdminModContent.tsx";
import styles from "../../../components/adminPage/components/adminModeratorContent/adminModContent.module.scss";
import {fetchProjectsToView} from "../../../features/projects/projectsSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxhooks.ts"
import {useSearchParams} from "react-router-dom";

const AdminProjectsApprovedPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const {projects, loading,totalPages, number, error} = useAppSelector(state => state.projects);
    const [searchParams] = useSearchParams();
    const pageNumber = parseInt(searchParams.get('pageNumber') || '1', 10) - 1;
    useEffect(() => {
        dispatch(fetchProjectsToView(pageNumber))
    }, [dispatch,pageNumber]);


    // Для отладки: отслеживаем изменения в projectsData
    useEffect(() => {
        console.log('Текущее состояние projectsData:', projects);
    }, [projects]);

    return (
        <div className={styles.adminModContent}>
            {error && <h1>Error: {error}</h1>}
            {loading && <h1>Loading...</h1>}
            <AdminPageTemplate
                type="projectsApprove" // Для хэдэра
                children={<AdminModContent data={projects} contentType="projectsApprove" pageNumber={number} totalPages={totalPages}/>}
            />
        </div>
    );
};

export default AdminProjectsApprovedPage;