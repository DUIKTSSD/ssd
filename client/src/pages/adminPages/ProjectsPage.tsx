import React, {useEffect, useState} from 'react';
import AdminPageTemplate from "../../components/adminPage/AdminPageTemplate.tsx";
import {ProjectsData} from "../../components/adminPage/types/adminTypes.ts";


const ProjectsPage:React.FC = () => {
    const [moderatorData, setModeratorData] = useState<ProjectsData | null>(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch('/api/projects')
                if(!response.ok) {
                    throw new Error("Network response is not ok")
                }
                const data: ProjectsData = await response.json()

                setModeratorData({
                    type: "projects",
                    id: data.id,
                    title: data.title,
                    owner: data.owner,
                    description: data.description,
                    onApprove: () => {
                        console.log('Project approved', data.id)
                    },
                    onReject: () => {
                        console.log("Project rejected", data.id)
                    }
                })
            } catch (e) {
                console.log("Error fetching data", e)
            }
        };

        fetchData();
    }, [])

    return (
        <div>
            {moderatorData ? (
                <AdminPageTemplate type="projects" moderatorData={moderatorData}/>
                ) : (
                    <p>Loading...</p>
                )}
        </div>
    );
};

export default ProjectsPage;