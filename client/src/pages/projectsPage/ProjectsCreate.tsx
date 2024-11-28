import React from 'react';
import ProjectsCreateStart from "../../components/projectsPage/components/projectsCreate_start/ProjectsCreateStart.tsx";
import Header from "../../components/common/header/Header.tsx";
import PathPick from "../../modules/PathPick/PathPick.tsx";
import ProjectsCreateForms from "../../components/projectsPage/components/projectsCreate_forms/ProjectsCreateForms.tsx";
import Footer from "../../components/common/footer/Footer.tsx";
import {PathPickProps} from "../../modules/PathPick/types.ts";


const ProjectsCreate:React.FC = () => {

   const PathPickProps: PathPickProps = {
        title: 'Твоя ідея може стати наступним проривом!',
        titleHighlight: 'Настав час діяти!',
        subtitle: 'ВИБЕРИ СВІЙ ШЛЯХ',
        btnTitle: 'Створити проєкт',
        btnLabel: 'Створити проєкт',
        btnLabel2: 'Вступити в проєкт',
        btnUrl: '/projects/create',
        btnUrl2: '/projects/join'
    }

    return (
        <div className="projects__create">
            <Header/>
            <PathPick {...PathPickProps}/>
            <ProjectsCreateStart/>
            <ProjectsCreateForms/>
            <Footer/>
        </div>
    );
};

export default ProjectsCreate;