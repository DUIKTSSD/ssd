import React, { useEffect, useState } from 'react';
import { NewsData } from '../../adminPage/types/adminTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import NewsCard from '../card/NewsCard';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks';
import { fetchNewsToView } from '../../../features/news/newsSlice';
import styles from './styles.module.scss';

import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
const NewsSwiper: React.FC = () => {
  const dispatch = useAppDispatch();
  const { news, loading, error } = useAppSelector((state) => state.news);
  const [newsChunks, setNewsChunk] = useState<NewsData[][]>([])

  useEffect(() => {
    dispatch(fetchNewsToView());
  }, [dispatch]);


  useEffect(() => {
    const chunkedNews = []
    for(let i = 0; i < news.length; i+=7) {
      chunkedNews.push(news.slice(i, i + 7))
    }

    setNewsChunk(chunkedNews)
  }, [news]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (newsChunks.length === 0) {
    return <div>No projects available</div>;
  }


  return (
    <div className={styles.swiper}>
      <div className={styles.swiper__container}>
        <Swiper
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={30}
          loop={true}
        >
          {newsChunks.map((chunk, index) => (
            <SwiperSlide key={index}>
              <div className={`${styles['grid-layout']} ${
                  styles[`grid-layout--${chunk.length}`]
              }`}>
                {chunk.map((item, i) => (
                  <div key={i}
                      className={styles['grid-item']}>
                    <NewsCard data={item} />
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewsSwiper;