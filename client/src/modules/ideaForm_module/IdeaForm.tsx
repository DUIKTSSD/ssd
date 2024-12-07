import React, { useState } from 'react';
import styles from "./ideaForm.module.scss";
import IdeaFormBtn from "../ideaFormBtn/ideaFormBtn.tsx";
import Swal from "sweetalert2";
import {addProject} from "../../features/projects/projectsSlice.ts";
import {useAppDispatch} from "../../hooks/reduxhooks.ts";

interface FormData {
    title: string,
    technologyStack: string,
    mainText: string,
    wishes: string,
    phoneNumber: string,
    telegramProfile: string
}

const IdeaForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<FormData>({
        title: '',
        technologyStack: '',
        mainText: '',
        wishes: '',
        phoneNumber: '',
        telegramProfile: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
 const result = await Swal.fire({
      title: 'Ви впевнені?',
      text: 'Це дію не можна буде скасувати!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Так, завантажити!',
      cancelButtonText: 'Відмінити',
    });
 if (result.isConfirmed) {
    try {
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => formDataToSend.append(key, value));
        await dispatch(addProject(formDataToSend)).unwrap();
        await Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Проект завантажен, очікуйте',
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        await Swal.fire({
            icon: 'error',
            title: 'Помилка',
            html: String(err).replace(/,/g, '<br/>') ,
        });
      }
    }

    };

    return (
        <form onSubmit={handleSubmit} className={styles.ideaForm}>
            <div className={styles.ideaForm__fieldWrapper}>
                <input
                    type="text"
                    id="projectName"
                    name="title" // Corrected to match FormData interface
                    placeholder="Назва проекту"
                    value={formData.title}
                    onChange={handleChange}
                    className={styles.ideaForm__input}
                />
            </div>

            <div className={styles.ideaForm__fieldWrapper}>
                <label htmlFor="technologies" className={styles.ideaForm__label}>Технології</label>
                <textarea
                    id="technologies"
                    name="technologyStack" // Corrected to match FormData interface
                    placeholder="Розкажи трішки про технології"
                    value={formData.technologyStack}
                    onChange={handleChange}
                    className={styles.ideaForm__textArea}
                />
            </div>

            <div className={styles.ideaForm__fieldWrapper}>
                <label htmlFor="projectInfo" className={styles.ideaForm__label}>Інформація про проект</label>
                <textarea
                    id="projectInfo"
                    name="mainText" // Corrected to match FormData interface
                    placeholder="Опиши свій проект"
                    value={formData.mainText}
                    onChange={handleChange}
                    className={styles.ideaForm__textArea}
                />
            </div>

            <div className={styles.ideaForm__fieldWrapper}>
                <label htmlFor="preferences" className={styles.ideaForm__label}>Побажання</label>
                <textarea
                    id="preferences"
                    name="wishes" // Corrected to match FormData interface
                    placeholder="Скільки учасників тобі треба..."
                    value={formData.wishes}
                    onChange={handleChange}
                    className={styles.ideaForm__textArea}
                />
            </div>

            <div className={styles.ideaForm__fieldWrapper}>
                <input
                    type="text"
                    id="phone"
                    name="phoneNumber" // Corrected to match FormData interface
                    placeholder="Номер телефону"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={styles.ideaForm__input}
                />
            </div>

            <div className={styles.ideaForm__fieldWrapper}>
                <input
                    type="text"
                    id="telegram"
                    name="telegramProfile" // Corrected to match FormData interface
                    placeholder="Профіль в телеграмі"
                    value={formData.telegramProfile}
                    onChange={handleChange}
                    className={styles.ideaForm__input}
                />
            </div>

            <IdeaFormBtn label="Відправити" />
        </form>
    );
};

export default IdeaForm;
