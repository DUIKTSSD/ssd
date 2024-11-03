
import styles from "./videoplayer.module.scss";

const VideoPlayer = () => {

    const mapSrc =
       "https://www.google.com/maps/embed?pb=!4v1730486248486!6m8!1m7!1sCAoSLEFGMVFpcE5YUEcyeExqZHNobjQ5bVAtNHNWb1dQOVV6b2x2VjBtQ0FPNWRR!2m2!1d50.4287109749007!2d30.47604644259248!3f0!4f10!5f0.7820865974627469";


    return (
        <section className={styles.videoPlayer}>
            <div className={styles.videoPlayer__title}>
                <h3>ХОЧЕШ СТАТИ ЧАСТИНОЇ НАШОЇ ДРУЖНЬОЇ РОДИНИ??
                    ШУКАЙ НАС ТУТ </h3>
            </div>
            <div className={styles.videoPlayer}>
                <iframe src={mapSrc}
                        width="600"
                        height="450"
                        style={{border: 0, zIndex: 2}}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>

        </section>
    );
};

export default VideoPlayer;