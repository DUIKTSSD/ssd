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
import {useNavigate} from "react-router-dom";

const NewsSwiper: React.FC = () => {
  const dispatch = useAppDispatch();
  const { news, loading, error } = useAppSelector((state) => state.news);
  const [newsChunks, setNewsChunk] = useState<NewsData[][]>([])
  const [chunkedSize, setChunkedSize] = useState<number>(7);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNewsToView());
  }, [dispatch]);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setChunkedSize(1);
    } else if (width < 1440) {
      setChunkedSize(2);
    } else {
      setChunkedSize(7);
    }
  }, [news, newsChunks]);

  useEffect(() => {
    const chunkedNews = []
    for(let i = 0; i < news.length; i+=chunkedSize) {
      chunkedNews.push(news.slice(i, i + chunkedSize))
    }

    setNewsChunk(chunkedNews)
  }, [news]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (news.length === 0) {
    return <div>No projects available</div>;
  }


  return (
    <div className={styles.swiper}>
      <div className={styles.swiper__container}>
        <Swiper
          autoHeight={true}
          className={styles.newsSwiper}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={30}
          loop={true}
          navigation={false}
          pagination={{ clickable: true }}
        >
          {newsChunks.map((chunk, index) => (
            <SwiperSlide key={index}>
              <div className={`${styles['grid-layout']} ${
                  styles[`grid-layout--${chunk.length}`]
              }`}>
                {chunk.map((item) => (
                  <div key={item.id}
                      className={styles['grid-item']}
                        onClick={() => navigate(`/news/view/${item.id}`,
                            { state: { data: item } })}
                  >
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