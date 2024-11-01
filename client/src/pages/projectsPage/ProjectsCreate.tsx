import React from 'react';
import ProjectsCreateStart from "../../components/projectsPage/components/projectsCreate_start/ProjectsCreateStart.tsx";
import Header from "../../components/common/header/Header.tsx";
import PathSelection from "../../components/projectsPage/components/pathSelection_section/pathSelection.tsx";
import ProjectsCreateForms from "../../components/projectsPage/components/projectsCreate_forms/ProjectsCreateForms.tsx";
import Footer from "../../components/common/footer/Footer.tsx";

const ProjectsCreate:React.FC = () => {
    return (
        <div className="projects__create">
            <Header/>
            <PathSelection/>
            <ProjectsCreateStart/>
            <ProjectsCreateForms/>
            <Footer/>
        </div>
    );
};

export default ProjectsCreate;