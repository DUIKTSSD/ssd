import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import Card from "../card/Card.tsx";
import {CollectivesData} from "../../adminPage/types/adminTypes.ts";
import styles from './style.module.scss'


interface CSwiperProps {
    data: CollectivesData[];
}

const CSwiper:React.FC<CSwiperProps> = ({data}) => {


    return (
        <Swiper
            className={styles.swiper}
            slidesPerView={1}
            spaceBetween={10}
            navigation
            pagination={{ clickable: true }}

        >
            {data.map((item) => (
                <SwiperSlide
                    className={styles.slide}
                    key={item.id}>
                    <Card {...item}/>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default CSwiper;