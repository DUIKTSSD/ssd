import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./meme.module.scss";
import api from "../../../../../api/api.ts";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/reduxhooks.ts";
import { fetchMemesToApprove } from "../../../../../features/memes/memes.ts";
import { MemesData } from "../../../../adminPage/types/adminTypes.ts";

interface Form {
    file: File | null;
}

const Meme: React.FC<{ data: MemesData[] }> = ({ data }) => {
    const [btnText, setBtnText] = useState("Нехай світ оцінить твій гумор :)");
    const [uploadStatus, setUploadStatus] = useState("");
    const [formData, setFormData] = useState<Form>({ file: null });
    const dispatch = useAppDispatch();
    const { memes } = useAppSelector((state) => state.memes);
    const [memesData, setMemesData] = useState<MemesData[]>(data || []);

    useEffect(() => {
        dispatch(fetchMemesToApprove());
    }, [dispatch]);

    useEffect(() => {
        setMemesData(memes);
    }, [memes]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setFormData({ file });

            try {
                const response = await api.post("/memes/add", new FormData().append("file", file), {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                console.log("File uploaded:", response.data);
                setUploadStatus("Файл завантажений, очікуйте на одобрення");
            } catch (err) {
                console.error("Upload error:", err);
                setUploadStatus("Файл не завантажений");
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
                            <p>No memes available</p>
                        )}
                    </Swiper>
                </div>
            </div>
            <div className={styles.meme__btncontainer}>
                <button
                    className={styles.meme__uploadBtn}
                    onMouseEnter={() => {
                        setBtnText("ЗАВАНТАЖИТИ");
                        setUploadStatus("");
                    }}
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
