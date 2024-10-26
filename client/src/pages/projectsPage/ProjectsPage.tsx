import React from 'react';
import Header from "../../components/common/header/Header"
import ProjectsPageComponent from "../../components/projectsPage/Main.tsx";
const ProjectsPage:React.FC = () => {
    return (
        <div>
            <Header/>
            <ProjectsPageComponent/>
        </div>
    );
};

export default ProjectsPage;