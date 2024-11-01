import React, {useEffect, useState} from 'react';
import AdminPageTemplate from "../../components/adminPage/AdminPageTemplate.tsx";
import {ProjectsData} from "../../components/adminPage/types/adminTypes.ts";
import api from "../../api.ts";


const ProjectsPage:React.FC = () => {
    const [moderatorData, setModeratorData] = useState<ProjectsData[] | null>([]);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async() => {
        try {
            setIsLoading(true)
            const projects: ProjectsData[] | null = await api.get('/projects/admin/toinspection')
            setModeratorData(projects)
        } catch(err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div>
            {moderatorData ? (
                moderatorData.map((item) => (
                    <AdminPageTemplate key={item.id} type="projects" moderatorData={{
                        type: "projects",
                        title: item.title,
                        mainText: item.mainText,
                        technologyStack: item.technologyStack,
                        wishes: item.wishes,
                        id: item.id,
                        onApprove: () => {
                            console.log('Project approved!');
                        },
                        onReject: () => {
                            console.log('Project rejected!');
                        }
                    }}/>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProjectsPage;