import React, { useState } from 'react';
import api from "../../../../api/api.ts";
import {fetchDocumentations} from "../../../../features/documentations/documentations.ts";
import {useAppDispatch} from "../../../../hooks/reduxhooks.ts";
import styles from './FormContent.module.scss'
import pdf from '../../../../assets/pdf.png'
interface FormData {
    file: File | null;
    name: string;
}
const AddDocMenu = ({ visible, setVisible }) => {
    const [formData, setFormData] = useState<FormData>({
        file: null,
        name: '',
    });

        const [fileName, setFileName] = useState("Click to upload image");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target;
        if (name === 'file' && files ) {
            const file = files[0];
            setFileName(file.name); // Зберігаємо ім'я файлу
            setFormData({ ...formData, file });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const dispatch = useAppDispatch();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!formData.file || !formData.name) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
            const response = await api.post('/document/admin/add', formData, {

                headers: {
                    'Content-Type': 'multipart/form-data', // Указываем тип контента для отправки файлов
                },

            });
            dispatch(fetchDocumentations());
            console.log('Response:', response);
            setVisible(false); // Закрыть модалку после успешной отправки
            formData.name="";
            formData.file=null;
            setFileName("Click to upload image")
        } catch (err) {
            console.error('Error while posting data', err);
        }
    };

    if (!visible) return null; // Если модалка не видна, не рендерим компонент.
    return (
        <div className={styles.FormContent__overlay} onClick={() => setVisible(false)}>
            <div className={styles.FormContent__modal}onClick={(e) => e.stopPropagation()}>
                <button className={styles.FormContent__closeBtn} onClick={() => setVisible(false)}>Закрыть</button>
                <form className={styles.FormContent__form}onSubmit={handleSubmit}>
                    <div >
                        <label className={styles.FormContent__file} htmlFor="file">
                            <div>
                                <img src={pdf}/>
                            </div>
                            <div className="text">
                                <span>{fileName}</span>
                            </div>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={handleChange}
                                required
                                style={{display: "none"}} // Скрываем стандартное поле ввода файла
                            />
                        </label>
                    </div>
                    <div>
                    </div>
                    <div  className={styles.FormContent__modal__body}>
                        <div className={styles.FormContent__input}>
                            <label className={styles.FormContent__input__label}>Имя</label>
                            <input className={styles.FormContent__input__field}
                                   type="text"
                                   id="name"
                                   name="name"
                                   value={formData.name}
                                   onChange={handleChange}
                                   required/>
                        </div>
                    </div>

                    <button type="submit"className={styles.FormContent__myBtn}>Отправить</button>
                </form>
            </div>
        </div>
    );
};

export default AddDocMenu;
