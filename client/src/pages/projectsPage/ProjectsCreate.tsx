import React from 'react';
import ProjectsCreateStart from "../../components/projectsPage/components/projectsCreate_start/ProjectsCreateStart.tsx";
import Header from "../../components/common/header/Header.tsx";
import PathSelection from "../../components/projectsPage/components/pathSelection_section/pathSelection.tsx";

const ProjectsCreate:React.FC = () => {
    return (
        <div className="projects__create">
            <Header/>
            <PathSelection/>
            <ProjectsCreateStart/>
        </div>
    );
};

export default ProjectsCreate;