import {useAppDispatch, useAppSelector} from "../../../../../hooks/reduxhooks.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import styles from "./announcement.module.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import {fetchAnnouncementToView} from "../../../../../features/announcement/announcementSlice.ts";

const Announcement: React.FC = () => {
    const dispatch = useAppDispatch();
    const { announcement } = useAppSelector(state => state.announcement);
const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchAnnouncementToView());
    }, [dispatch]);

    return (
        <section className={styles.announcement__section}>
            <div className={styles.announcement__container}>
                <h3 className={styles.announcement__title}>АНОНСИ</h3>
                <div className={styles.announcement__swiper_container}>
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
                        {announcement.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className={styles.announcement__slide} onClick={() => navigate(`/announcement/view/${item.id}`,
                            { state: { data: item } })}>
                                    <img
                                        src={`data:image/png;base64, ${item.image}`}
                                        alt={item.title || "news image"}
                                        loading="lazy"
                                    />
                                    <h1>{item.title}</h1>
                                    <span style={{color:"white"} }>-------------------------------</span>
                                    <p>{item.description}</p>
                                    <p>(Початок :{item.dateOfEvent})</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Announcement;
