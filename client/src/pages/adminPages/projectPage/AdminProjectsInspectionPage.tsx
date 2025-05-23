import React, {useEffect} from 'react';
import AdminPageTemplate from "../../../components/adminPage/AdminPageTemplate.tsx";
import AdminModContent from "../../../components/adminPage/components/adminModeratorContent/AdminModContent.tsx";
import styles from "../../../components/adminPage/components/adminModeratorContent/adminModContent.module.scss";
import {fetchProjectsToInspection} from "../../../features/projects/projectsSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxhooks.ts"

const AdminProjectsInspectionPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const {projects, loading, error} = useAppSelector(state => state.projects);

    useEffect(() => {
        dispatch(fetchProjectsToInspection())
    }, [dispatch]);


    // Для отладки: отслеживаем изменения в projectsData
    useEffect(() => {
        console.log('Текущее состояние projectsData:', projects);
    }, [projects]);

    return (
        <div className={styles.adminModContent}>
            {error && <h1>Error: {error}</h1>}
            {loading && <h1>Loading...</h1>}
            <AdminPageTemplate
                type="projectsInspection" // Для хэдэра
                children={<AdminModContent data={projects} contentType="projects"/>}
            />
        </div>
    );
};

export default AdminProjectsInspectionPage;