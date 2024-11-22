import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./news.module.scss";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/reduxhooks.ts";
import {fetchNewsToView} from "../../../../../features/news/newsSlice.ts";

import "../../../../../styles/modules/swiper-wrapper_fix.scss";
import 'swiper/scss';
import {useEffect} from "react";

// const images = [] // Задаток на майбутнє
// images.push()


const News = () => {
    const dispatch = useAppDispatch();
    const news = useAppSelector(state => state.news.news);
    useEffect(() => {
        dispatch(fetchNewsToView());
    }, []);

    return (
        <section className={styles.news__section}>
            <div className={styles.news__container}>
                <h3 className={styles.news__title}>НОВИНИ</h3>
                <div className={styles.news__swiper_container}>
                    <Swiper
                    spaceBetween={30}
                    slidesPerView={3}
                    loop={true}
                    onSwiper={(swiper) => console.log(swiper)}
                    breakpoints={{
                        375: {
                           slidesPerView: 1
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1440: {
                          slidesPerView: 3,
                          spaceBetween: 50
                        }
                    }}>
                        {news.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className={styles.news__slide}>
                                    <img src={`data:image/png;base64,${item.images}`} alt="news"/>
                                    <p>{item.text}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                        {/*<SwiperSlide>*/}

                        {/*    <div className={styles.news__slide}>*/}
                        {/*        <img src={firstSlideImg} alt="news"/>*/}
                        {/*        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque distinctio eveniet explicabo fugit ipsam iure magnam maiores necessitatibus nesciunt nostrum nulla obcaecati, omnis perferendis repellat soluta, suscipit tempora voluptatibus.</p>*/}
                        {/*    </div>*/}
                        {/*</SwiperSlide>*/}
                        {/*<SwiperSlide>*/}
                        {/*    <div className={styles.news__slide}>*/}
                        {/*        <img src={secondSlideImg} alt="img"/>*/}
                        {/*        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda commodi consequuntur earum eveniet fuga ipsum iste maxime nihil, nostrum placeat possimus quasi quod suscipit vel voluptate? Aliquid atque nostrum tenetur.</p>*/}
                        {/*    </div>*/}
                        {/*</SwiperSlide>*/}
                        {/*<SwiperSlide>*/}
                        {/*    <div className={styles.news__slide}>*/}
                        {/*        <img src={thirdSlideImg} alt="img"/>*/}
                        {/*        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, doloribus dolorum, ducimus, eaque harum illum iste iusto modi nobis perspiciatis placeat quisquam ratione reiciendis tempore voluptatum? Aspernatur excepturi id iure.</p>*/}
                        {/*    </div>*/}
                        {/*</SwiperSlide>*/}
                        {/*<SwiperSlide>*/}
                        {/*    <div className={styles.news__slide}>*/}
                        {/*        <img src={thirdSlideImg} alt="img"/>*/}
                        {/*        <p>meowm meow meow</p>*/}
                        {/*    </div>*/}
                        {/*</SwiperSlide>*/}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default News;