import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./meme.module.scss";
import "../../../styles/modules/swiper-wrapper_fix.scss";

import firstMeme from "../../../assets/meme__section_mem-1.png";
import secondMeme from "../../../assets/meme__section_mem-2.png";
import thirdMeme from "../../../assets/meme__section_meme-3.png";

const Meme = () => {
    return (
        <section className={styles.meme__section}>
            <div className={styles.meme__container}>
                <h3 className={styles.meme__title}>
                    МЕМ тижня)
                </h3>

                <div className={styles.meme__swiperContainer}>
                    <Swiper
                     spaceBetween={30}
                    slidesPerView={3}
                    loop={true}
                    onSlideChange={() => console.log('meow')}
                    onSwiper={(swiper) => console.log(swiper)}
                    breakpoints={{
                        375: {
                           slidesPerView: 1
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        968: {
                            spaceBetween: 30,
                        },
                        1280: {
                          slidesPerView: 3,
                          spaceBetween: 80
                        }
                        }}
                    >
                        <SwiperSlide>
                            <div className={styles.meme__slide}>
                                <img src={firstMeme} alt="img"></img>
                                <h4 className={styles.meme__slide_title}>#Author</h4>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={styles.meme__slide}>
                                <img src={secondMeme} alt="img"></img>
                                <h4 className={styles.meme__slide_title}>#Author</h4>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={styles.meme__slide}>
                                <img src={thirdMeme} alt="img"></img>
                                <h4 className={styles.meme__slide_title}>#Author</h4>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Meme;