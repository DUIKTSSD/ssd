import React from 'react';
import {PathPickProps} from "../../../modules/PathPick/types.ts";
import PathPick from "../../../modules/PathPick/PathPick.tsx";

const CollectiveIntroduce:React.FC = () => {

    const PathPickProps: PathPickProps = {
        title: "Подивись на колектив",
        titleHighlight: "Органів Студентського самоврядування",
        btnLabel: "Голови ОСС",
        btnLabel2: "Вiддiли ОСС",
        btnTitle: "Обери кого хочешь побачити",
        btnUrl: "/collective/leaders",
        btnUrl2: "/collective/departments",
        subtitle: 'Обери кого хочеш побачити',
    }

    return (
        <PathPick {...PathPickProps}/>
    );
};

export default CollectiveIntroduce;