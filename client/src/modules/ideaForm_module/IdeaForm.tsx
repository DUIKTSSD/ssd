import React, {useState} from 'react';
import styles from "./ideaForm.module.scss";
import IdeaFormBtn from "../ideaFormBtn/ideaFormBtn.tsx";
import api from "../../api.ts";

interface FormData {
    title: string,
    technologyStack: string,
    mainText: string,
    wishes: string,
    phoneNumber: string,
    telegramProfile: string
}

const IdeaForm:React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        technologyStack: '',
        mainText: '',
        wishes: '',
        phoneNumber: '',
        telegramProfile: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()

        try {
            if(formData) {
                console.log('Data accepted!')
            }

            const response = await api.post('/projects/add', formData)
            console.log(response.data)

        } catch(err) {
            console.error('Error while posting data', err)
        }
    }

return (
    <form onSubmit={handleSubmit} className={styles.ideaForm}>

        <div className={styles.ideaForm__fieldWrapper}>
            <input
                type="text"
                id="projectName"
                name="projectName"
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
                name="technologies"
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
                name="projectInfo"
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
                name="preferences"
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
                name="phone"
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
                name="telegram"
                placeholder="Профіль в телеграмі"
                value={formData.telegramProfile}
                onChange={handleChange}
                className={styles.ideaForm__input}
            />
        </div>

        <IdeaFormBtn label="Відправити"/>
    </form>
);

};

export default IdeaForm;