import React from 'react';
import PathSelection from "../../components/projectsPage/components/pathSelection_section/pathSelection.tsx";
import Header from "../../components/common/header/Header.tsx";
import ProjectsJoinSwiper from "../../components/projectsPage/components/projectsJoin__projects/projectsJoinSwiper.tsx";

const ProjectsJoin: React.FC = () => {
    return (
        <div>
            <Header/>
            <PathSelection/>
            <ProjectsJoinSwiper/>
        </div>
    );
};

export default ProjectsJoin;