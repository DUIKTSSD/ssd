import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./meme.module.scss";

import firstMeme from "../../../../../assets/meme__section_mem-1.png";
import secondMeme from "../../../../../assets/meme__section_mem-2.png";
import thirdMeme from "../../../../../assets/meme__section_meme-3.png";
import fourthMeme from "../../../../../assets/introduce_section-logo.png";
import React from "react";

const Meme: React.FC = () => {
    return (
        <section className={styles.meme__section}>
            <div className={styles.meme__container}>
                <h3 className={styles.meme__title}>
                    МЕМЧИКИ ТИЖНЯ:)
                </h3>

                <div className={styles.meme__swiperContainer}>
                    <Swiper
                    spaceBetween={30}
                    loop={true}
                    breakpoints={{
                        375: {
                           slidesPerView: 1
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1440: {
                          slidesPerView: 3,
                          spaceBetween: 30
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
                        <SwiperSlide>
                            <div className={styles.meme__slide}>
                                <img src={fourthMeme} alt="img"/>
                                <h4 className={styles.meme__slide_title}>#author</h4>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <button className={styles.meme__uploadBtn}>
                    Нехай світ оцінить твій гумор:)
                </button>
            </div>
        </section>
    );
};

export default Meme;