import React, {useEffect, useState} from 'react';
import AdminPageTemplate from "../../components/adminPage/AdminPageTemplate.tsx";
import {ProjectsData} from "../../components/adminPage/types/adminTypes.ts";


const ProjectsPage:React.FC = () => {
    const [moderatorData, setModeratorData] = useState<ProjectsData | null>(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch('http://localhost:8080/api/projects')
                if(!response.ok) {
                    throw new Error("Network response is not ok")
                }
                const data: ProjectsData = await response.json()

                setModeratorData({
                    type: "projects",
                    mainText: data.mainText,
                    technologyStack: data.technologyStack,
                    wishes: data.wishes,
                    id: data.id,
                    title: data.title,

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
        // <AdminPageTemplate type="projects" moderatorData={{
        //     type: "projects",
        //     owner: "anton",
        //     id: 1,
        //     title: "nigger",
        //     description: "meow meow meow",
        //     onApprove: () => {console.log("meow")},
        //     onReject: () => {console.log('meow')}
        // }}/>
    );
};

export default ProjectsPage;