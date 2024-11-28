import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import Card from "../card/Card.tsx";
import {CollectivesData} from "../../adminPage/types/adminTypes.ts";
import styles from './style.module.scss'
import {useNavigate} from "react-router-dom";

interface CSwiperProps {
    data: CollectivesData[];
}

const CSwiper:React.FC<CSwiperProps> = ({data}) => {

    const navigate = useNavigate();

    return (
        <div className={styles['swiper-wrapper']}>
        <Swiper
            className={styles.swiper}
            slidesPerView={1}
            spaceBetween={10}
            navigation
            pagination={{ clickable: true }}

        >
            {data.map((item) => (
                <SwiperSlide
                    onClick={item.team ? () => navigate(`/collective/departments/${item.id}`,
                        {state: {data: item}}) : undefined}
                    className={styles.slide}
                    key={item.id}>
                    <Card
                        {...item}/>
                </SwiperSlide>
            ))}
        </Swiper>
        </div>
    );
};

export default CSwiper;