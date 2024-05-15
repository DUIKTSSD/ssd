import React from 'react';
import Introduce from "./introduce_section/Introduce";
import VideoPlayer from "./videoplayer_section/VideoPlayer";
import {isMainThread} from "node:worker_threads";

const Main = () => {
    return (
        <main>
            <Introduce/>
            <VideoPlayer/>
        </main>

    );
};

export default Main;