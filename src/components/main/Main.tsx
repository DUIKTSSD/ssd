import Introduce from "./introduce_section/Introduce";
import VideoPlayer from "./videoplayer_section/VideoPlayer";
import News from "./news_section/News.tsx";
import Meme from "./meme_section/Meme.tsx";

const Main = () => {
    return (
        <main>
            <Introduce/>
            <VideoPlayer/>
            <News/>
            <Meme/>
        </main>

    );
};

export default Main;