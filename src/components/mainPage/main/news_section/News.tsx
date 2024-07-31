import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./news.module.scss";
import firstSlideImg from "../../../../assets/news_slide-1.png"
import secondSlideImg from "../../../../assets/news_slide-2.png"
import thirdSlideImg from "../../../../assets/news_slide-3.png"

import "../../../../styles/modules/swiper-wrapper_fix.scss";
import 'swiper/scss';

// const images = [] // Задаток на майбутнє
// images.push()


const News = () => {
    return (
        <section className={styles.news__section}>
            <div className={styles.news__container}>
                <h3 className={styles.news__title}>НОВИНИ</h3>
                <div className={styles.news__swiper_container}>
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
                          spaceBetween: 50
                        }
                    }}>
                        <SwiperSlide>
                            <div className={styles.news__slide}>
                                <img src={firstSlideImg} alt="news"/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque distinctio eveniet explicabo fugit ipsam iure magnam maiores necessitatibus nesciunt nostrum nulla obcaecati, omnis perferendis repellat soluta, suscipit tempora voluptatibus.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={styles.news__slide}>
                                <img src={secondSlideImg} alt="img"/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda commodi consequuntur earum eveniet fuga ipsum iste maxime nihil, nostrum placeat possimus quasi quod suscipit vel voluptate? Aliquid atque nostrum tenetur.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={styles.news__slide}>
                                <img src={thirdSlideImg} alt="img"/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, doloribus dolorum, ducimus, eaque harum illum iste iusto modi nobis perspiciatis placeat quisquam ratione reiciendis tempore voluptatum? Aspernatur excepturi id iure.</p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default News;