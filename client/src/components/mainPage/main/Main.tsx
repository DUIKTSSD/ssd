import Introduce from "./components/introduce_section/Introduce.tsx";
import VideoPlayer from "./components/videoplayer_section/VideoPlayer.tsx";
import News from "./components/news_section/News.tsx";
import Meme from "./components/meme_section/Meme.tsx";

const Main = () => {
    return (
        <main style={{
            background: "#09002B"
        }}>
            <Introduce/>
            <News/>
            <Meme/>
            {/*<VideoPlayer/>*/}
        </main>

    );
};

export default Main;