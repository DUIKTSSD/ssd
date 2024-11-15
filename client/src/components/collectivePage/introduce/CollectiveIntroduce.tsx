import React from 'react';
import {PathPickProps} from "../../../modules/PathPick/types.ts";
import PathPick from "../../../modules/PathPick/PathPick.tsx";

const CollectiveIntroduce:React.FC = () => {

    const PathPickProps: PathPickProps = {
        title: "Подивись на наш чудовий колектив",
        titleHighlight: "Niggers Attacking",
        btnLabel: "Голови",
        btnLabel2: "Вiддiли",
        btnTitle: "Обери кого хочешь побачити",
        btnUrl: "/collective/leaders",
        btnUrl2: "/collective/departments",
        subtitle: 'Обери niggers'
    }

    return (
        <PathPick {...PathPickProps}/>
    );
};

export default CollectiveIntroduce;