import React, {useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./meme.module.scss";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/reduxhooks.ts";
import {addMemesToInspection, fetchMemesToApprove} from "../../../../../features/memes/memes.ts";
import UploadBtn from "./uploadBtn/UploadBtn.tsx";
import Swal from "sweetalert2";

const Meme: React.FC = () => {
  const dispatch = useAppDispatch();
  const {memes} = useAppSelector(state => state.memes);
  useEffect(() => {
    dispatch(fetchMemesToApprove());
  }, [dispatch]);
    const handleFileUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            await dispatch(addMemesToInspection(formData)).unwrap();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Мем завантажен, очікуйте',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Помилка',
                text: 'Неможливо завантажити мем. Спробуйте пізніше.',
            });
        }
    };
    return (
        <section className={styles.meme__section}>
            <div className={styles.meme__container}>
                <h3 className={styles.meme__title}>МЕМЧИКИ ТИЖНЯ :)</h3>
                <div className={styles.meme__swiperContainer}>
                    <Swiper
                        spaceBetween={30}
                        loop={true}
                        breakpoints={{
                            375: {slidesPerView: 1},
                            768: {slidesPerView: 2},
                            1440: {slidesPerView: 3},
                        }}
                    >
                        {memes.length ? (
                            memes.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <div className={styles.meme__slide}>
                                        <img src={`data:image/png;base64,${item.image}`} alt="Meme"/>
                                        <h4 className={styles.meme__slide_title}>{item.author.username}</h4>
                                    </div>
                                </SwiperSlide>
                            ))
                        ) : (
                            <p>Немає доступних мемів</p>
                        )}
                    </Swiper>
                </div>
            </div>
            <UploadBtn onFileUpload={handleFileUpload}/>
        </section>
    );
};

export default Meme;
