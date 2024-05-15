import Introduce from "./introduce_section/Introduce";
import VideoPlayer from "./videoplayer_section/VideoPlayer";
import News from "./news_section/News.tsx";

const Main = () => {
    return (
        <main>
            <Introduce/>
            <VideoPlayer/>
            <News/>
        </main>

    );
};

export default Main;