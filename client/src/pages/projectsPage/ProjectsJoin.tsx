import React from 'react';
import PathSelection from "../../components/projectsPage/components/pathSelection_section/pathSelection.tsx";
import Header from "../../components/common/header/Header.tsx";
import ProjectsJoinSwiper from "../../components/projectsPage/components/projectsJoin__projects/projectsJoinSwiper.tsx";
import Footer from "../../components/common/footer/Footer.tsx";

const ProjectsJoin: React.FC = () => {
    return (
        <div>
            <Header/>
            <PathSelection/>
            <ProjectsJoinSwiper/>
            <Footer/>
        </div>
    );
};

export default ProjectsJoin;