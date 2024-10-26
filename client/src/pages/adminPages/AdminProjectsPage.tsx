import React, {useEffect, useState} from 'react';
import {ProjectsData} from "../../components/adminPage/types/adminTypes.ts";
import AdminPageTemplate from "../../components/adminPage/AdminPageTemplate.tsx";
import AdminModContent from "../../components/adminPage/components/adminModeratorContent/AdminModContent.tsx";
import api from "../../api.ts";
import styles from "../../components/adminPage/components/adminModeratorContent/adminModContent.module.scss";
const AdminProjectsPage: React.FC = () => {
    const [projectsData, setProjectsData] = useState<ProjectsData[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('/projects/admin/toinspection');
            // Проверяем структуру ответа перед установкой в состояние
            console.log('Ответ от API:', response);

            // Если response это массив, используем его напрямую
            if (Array.isArray(response)) {
                setProjectsData(response);
            }
            // Если ни один из вариантов не подходит, логируем ошибку
            else {
                console.error('Неожиданный формат данных:', response);
            }
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    // Для отладки: отслеживаем изменения в projectsData
    useEffect(() => {
        console.log('Текущее состояние projectsData:', projectsData);
    }, [projectsData]);

    return (
        <div className={styles.adminModContent}>
            <AdminPageTemplate
                type="projects" // Для хэдэра
                children={<AdminModContent data={projectsData} contentType="projects"/>}
            />
        </div>
    );
};

export default AdminProjectsPage;