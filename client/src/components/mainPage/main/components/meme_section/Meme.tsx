import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./meme.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/reduxhooks.ts";
import {addMemesToInspection, fetchMemesToApprove} from "../../../../../features/memes/memes.ts";
import { MemesData } from "../../../../adminPage/types/adminTypes.ts";
import Swal from 'sweetalert2';

const Meme: React.FC<{ data: MemesData[] }> = ({ data }) => {
    const [btnText, setBtnText] = useState("Нехай світ оцінить твій гумор :)");
    const [uploadStatus, setUploadStatus] = useState("");
    const dispatch = useAppDispatch();
    const { memes } = useAppSelector((state) => state.memes);
    const [memesData, setMemesData] = useState<MemesData[]>(data || []);

    // Получаем данные о мемах при монтировании компонента
    useEffect(() => {
        dispatch(fetchMemesToApprove());
    }, [dispatch]);

    // Обновляем данные о мемах при изменении state
    useEffect(() => {
        setMemesData(memes);
    }, [memes]);

    // Функция загрузки файла
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
           const result=await Swal.fire({
                title: 'Ви впевнені?',
                text: "Це дію не можна буде скасувати!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Так, завантажити!',
                cancelButtonText: 'Відмінити',
            });
            if (result.isConfirmed) {
                try {
                    const formData = new FormData();
                    formData.append("file", file);
                    dispatch(addMemesToInspection(formData));
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Мем завантажен, очікуйте",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Ошибка",
                        text: "Неможливо завантажити мем. Спробуйте пізніше.",
                    });
                }
            }
            else{
                console.log("Завантаження відминено");
                return;
            }
        }
    };
    const triggerFileInput = () => document.getElementById("fileInput")?.click();

    return (
        <section className={styles.meme__section}>
            <div className={styles.meme__container}>
                <h3 className={styles.meme__title}>МЕМЧИКИ ТИЖНЯ :)</h3>
                <div className={styles.meme__swiperContainer}>
                    <Swiper
                        spaceBetween={30}
                        loop={true}
                        breakpoints={{
                            375: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1440: { slidesPerView: 3 },
                        }}
                    >
                        {memesData.length ? (
                            memesData.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <div className={styles.meme__slide}>
                                        <img src={`data:image/png;base64,${item.image}`} alt="Meme" />
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
            <div className={styles.meme__btncontainer}>
                <button
                    className={styles.meme__uploadBtn}
                    onMouseEnter={() => setBtnText("ЗАВАНТАЖИТИ")}
                    onMouseLeave={() => setBtnText("Нехай світ оцінить твій гумор :)")}
                    onClick={triggerFileInput}
                >
                    {btnText}
                </button>
                <p>{uploadStatus}</p>
                <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                />
            </div>
        </section>
    );
};

export default Meme;
