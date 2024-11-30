import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import styles from "./news.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/reduxhooks.ts";
import { fetchNewsToView } from "../../../../../features/news/newsSlice.ts";

import "../../../../../styles/modules/swiper-wrapper_fix.scss";
import 'swiper/scss';
import 'swiper/scss/pagination';

const News:React.FC = () => {
    const dispatch = useAppDispatch();
    const { news }  = useAppSelector(state => state.news);

    useEffect(() => {
        dispatch(fetchNewsToView());
    }, [dispatch]);


    return (
        <section className={styles.news__section}>
            <div className={styles.news__container}>
                <h3 className={styles.news__title}>НОВИНИ</h3>
                <div className={styles.news__swiper_container}>
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={30}
                        slidesPerView={3}
                        loop={true}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 40
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 50
                            },
                        }}>
                        {news.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className={styles.news__slide}>
                                    <img 
                                        src={`data:image/png;base64, ${item.images[0].image}`}
                                        alt={item.text || "news image"} 
                                        loading="lazy"
                                    />
                                    <p>{item.text}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default News;