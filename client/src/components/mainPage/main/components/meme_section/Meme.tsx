import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./meme.module.scss";
import React, {useEffect, useState} from "react";
import api from "../../../../../api/api.ts";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/reduxhooks.ts";
import {MemesData} from "../../../../adminPage/types/adminTypes.ts";
import {fetchMemesToApprove} from "../../../../../features/memes/memes.ts";
interface Form {
    file: File | null;
}


const Meme: React.FC<{ data: MemesData[] }> = ({data}) => {
    const [nameBtn ,setNameBtn]=useState("Нехай світ оцінить твій гумор :)")
    const [formData, setFormData] = useState<Form>({
        file: null,
    });
    const [uploadStatus, setUploadStatus] = useState(""); // Новий стан для відображення статусу
    const dispatch = useAppDispatch();
    const { memes} = useAppSelector(state => state.memes);

    const [memesData, setMemesData] = useState<MemesData[]>(data || []);
    useEffect(() => {
        dispatch(fetchMemesToApprove());
    }, [dispatch]);

    useEffect(() => {
        setMemesData(memes);
    }, [memes]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (!file.type.startsWith("image/")) {
                return;
            }
            setFormData({ file });
            const data = new FormData();
            data.append('file', file);
            try {
                const response = await api.post('/memes/add', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                console.log("File upload successful:", response.data);

                setUploadStatus("Файл завантажений , очікуйте на одобрення")
            } catch (err) {
                console.error("Error uploading file:", err);
                setUploadStatus("Файл не завантажений")
            }}
    };
    const handleButtonClick = () => {

        document.getElementById("fileInput").click();
    };
    return (
        <section className={styles.meme__section}>
            <div className={styles.meme__container}>
                <h3 className={styles.meme__title}>
                    МЕМЧИКИ ТИЖНЯ:)
                </h3>

                <div className={styles.meme__swiperContainer}>
                    <Swiper
                        spaceBetween={30}
                        loop={true}
                        breakpoints={{
                            375: {
                                slidesPerView: 1
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1440: {
                                slidesPerView: 3,
                                spaceBetween: 30
                            }
                        }}
                    >
                        {memesData.length > 0 ? (
                            memesData.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <div className={styles.meme__slide}>
                                        <img  src={`data:image/png;base64,${item.image}`} alt="Meme"/>
                                        <h4  className={styles.meme__slide_title}>{item.author.username}</h4>
                                    </div>

                                </SwiperSlide>
                            ))
                        ) : (
                            <p>No documents available</p>
                        )}


                    </Swiper>
                </div>

            </div>
            <div className={styles.meme__btncontainer}>
                <button
                    className={styles.meme__uploadBtn}
                    onMouseEnter={() => {
                        setNameBtn("ЗАВАНТАЖИТИ")
                        setUploadStatus("")
                    }}
                    onMouseLeave={() => {
                        setNameBtn("Нехай світ оцінить твій гумор :)")

                    }}
                    onClick={handleButtonClick} // При нажатии на кнопку запускается handleButtonClick
                >
                    {nameBtn}
                </button>
                <p>{uploadStatus}</p>
                <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{display: "none"}} // Скрываем стандартное поле ввода файла
                    onChange={handleFileUpload} // Обработчик загрузки файла
                />
            </div>
        </section>
    );
};

export default Meme;