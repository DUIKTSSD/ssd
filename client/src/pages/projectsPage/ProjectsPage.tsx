import React from 'react';
import Header from "../../components/common/header/Header"
import PathSelection from "../../components/projectsPage/components/pathSelection_section/pathSelection.tsx";
const ProjectsPage:React.FC = () => {
    return (
        <div>
            <Header/>
            <PathSelection/>
        </div>
    );
};

export default ProjectsPage;