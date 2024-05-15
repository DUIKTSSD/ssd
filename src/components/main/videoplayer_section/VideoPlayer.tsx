import React from 'react';

import styles from "./videoplayer.module.scss";

const VideoPlayer = () => {
    return (
        <section className={styles.videoPlayer}>
            <div className={styles.videoPlayer__title}>
                <h3>ХОЧЕШ СТАТИ ЧАСТИНОЇ НАШОЇ ДРУЖНЬОЇ РОДИНИ??
                    ШУКАЙ НАС ТУТ </h3>
            </div>
            <div className={styles.videoPlayer__videoContainer}>
                <video className={styles.videoPLayer__player} autoPlay loop>
                    <source src="../../../assets/video.mp3" type="video/mp3"></source>
                </video>
            </div>
        </section>
    );
};

export default VideoPlayer;