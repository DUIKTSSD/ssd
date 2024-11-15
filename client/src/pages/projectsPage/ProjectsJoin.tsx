import React from 'react';
import PathPick from "../../modules/PathPick/PathPick.tsx";
import Header from "../../components/common/header/Header.tsx";
import ProjectsJoinSwiper from "../../components/projectsPage/components/projectsJoin__projects/projectsJoinSwiper.tsx";
import Footer from "../../components/common/footer/Footer.tsx";
import {PathPickProps} from "../../modules/PathPick/types.ts";

const ProjectsJoin: React.FC = () => {
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
        <div>
            <Header/>
            <PathPick {...PathPickProps}/>
            <ProjectsJoinSwiper/>
            <Footer/>
        </div>
    );
};

export default ProjectsJoin;