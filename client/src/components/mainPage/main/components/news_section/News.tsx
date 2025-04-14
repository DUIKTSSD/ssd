import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./news.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/reduxhooks.ts";
import { fetchNewsToView } from "../../../../../features/news/newsSlice.ts";
import "../../../../../styles/modules/swiper-wrapper_fix.scss";
import 'swiper/scss';
import 'swiper/scss/pagination';
import {useNavigate} from "react-router-dom";



const News: React.FC = () => {
    const dispatch = useAppDispatch();
    const { news } = useAppSelector(state => state.news);
const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchNewsToView());
    }, [dispatch]);

    return (
        <section className={styles.news__section}>
            <div className={styles.news__container}>
                <h3 className={styles.news__title}>НОВИНИ</h3>
                <div className={styles.news__swiper_container}>
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={3}
                        loop={true}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 40,
                            },
                            1440: {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            },
                        }}>
                        {news.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className={styles.news__slide} onClick={() => navigate(`/news/view/${item.id}`,
                            { state: { data: item } })}>
                                    <img
                                        src={`data:image/png;base64, ${item.images[0].image}`}
                                        alt={item.text || "news image"}
                                        loading="lazy"
                                    />
                                    <h1>{item.title}</h1>
                                    <span style={{color:"white"} }>-------------------------------</span>
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
