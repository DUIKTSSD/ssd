import React, {useState} from 'react';
import {useAppDispatch} from "../../../../../hooks/reduxhooks.ts";
import styles from "../FormContent.module.scss";
import CustomInput from "../CustomInput.tsx";
import {addVacancy} from "../../../../../features/vacancies/vacanciesSlice.ts";
interface PopUpVacancyProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}


const formFields = [
    { label: "Назва", name: "title", placeholder: "Введіть назву вакансії" },
    { label: "Компанія", name: "company", placeholder: "Компанія, яка пропонує вакансію" },
    { label: "Місцезнаходження", name: "location", placeholder: "Місце роботи" },
    { label: "Тип зайнятості", name: "typeOfEmployment", placeholder: "Повна/неповна зайнятість" },
    { label: "Опис", name: "description", placeholder: "Опис вакансії" },
    { label: "Зарплата", name: "salary", placeholder: "Зарплата" },
    { label: "Посилання на вакансію", name: "urlJob", placeholder: "URL вакансії" }
];

interface FormData {
    title: string;
    company: string;
    location: string;
    typeOfEmployment: string;
    description: string;
    salary: string;
    urlJob: string;

    [key: string]: string;
}
const VacancyPopUp: React.FC<PopUpVacancyProps> = ({visible, setVisible }) => {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        company: "",
        location: "",
        typeOfEmployment: "",
        description: "",
        salary: "",
        urlJob: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useAppDispatch();

    const formChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const requiredFields = ["title", "company", "location", "typeOfEmployment", "description", "salary", "urlJob"];
        for (const field of requiredFields) {
            if (!formData[field]) {
                alert(`Заповніть поле ${field}`);
                return;
            }
        }

        setIsSubmitting(true);
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });
            dispatch(addVacancy(data));
            setVisible(false);
        } catch (err) {
            console.error("Error while posting data", err);
            alert("Помилка під час відправки даних");
        } finally {
            setIsSubmitting(false);
            setFormData({
                title: "",
                company: "",
                location: "",
                typeOfEmployment: "",
                description: "",
                salary: "",
                urlJob: ""
            });
        }
    };

    if (!visible) return null;

    return (
        <div className={styles.FormContent__overlay}>
            <div className={styles.FormContent__modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.FormContent__closeBtn} onClick={() => setVisible(false)}>Закрити</button>
                <form className={styles.FormContent__form} onSubmit={formSubmit}>
                    <div className={styles.FormContent__modal__body}>
                        <div className={styles.FormContent__input}>
                            {formFields.map(({ label, name, placeholder }) => (
                                <CustomInput
                                    key={name}
                                    label={label}
                                    name={name}
                                    placeholder={placeholder}
                                    value={formData[name]}
                                    onChange={formChange}
                                />
                            ))}
                        </div>
                    </div>
                    <button type="submit" className={styles.FormContent__myBtn} disabled={isSubmitting}>
                        {isSubmitting ? "Завантаження..." : "Відправити"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VacancyPopUp;