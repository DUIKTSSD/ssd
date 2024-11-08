import React, { useEffect, useState } from 'react';
import { NewsData } from '../../adminPage/types/adminTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import NewsCard from '../card/NewsCard';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks';
import { fetchNewsToView } from '../../../features/news/newsSlice';
import styles from './styles.module.scss';

const NewsSwiper: React.FC = () => {
  const dispatch = useAppDispatch();
  const { news, loading, error } = useAppSelector((state) => state.news);

  const [newsData, setNewsData] = useState<NewsData[]>(news || []);

  useEffect(() => {
    dispatch(fetchNewsToView());
  }, [dispatch]);

  useEffect(() => {
    setNewsData(news);
  }, [news]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (newsData.length === 0) {
    return <div>No projects available</div>;
  }

  const newsChunks = [];
  for (let i = 0; i < newsData.length; i += 7) {
    newsChunks.push(newsData.slice(i, i + 7));
  }

  return (
    <div className={styles.swiper}>
      <div className={styles.swiper__container}>
        <Swiper
          slidesPerView={1}
          slidesPerGroup={Math.min(newsData.length, 7)}
          spaceBetween={30}
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