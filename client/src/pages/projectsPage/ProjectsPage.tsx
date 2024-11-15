import React from 'react';
import Header from "../../components/common/header/Header"
import PathPick from "../../modules/PathPick/PathPick.tsx";
import {PathPickProps} from "../../modules/PathPick/types.ts";

const ProjectsPage:React.FC = () => {
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
        </div>
    );
};

export default ProjectsPage;