import React, {useState} from 'react';
import {useAppDispatch} from "../../../../../hooks/reduxhooks.ts";
import styles from "../FormContent.module.scss";
import collectImg from "../../../../../assets/upload_collect.png";
import CustomInput from "../CustomInput.tsx";
import {addAnnouncement} from "../../../../../features/announcement/announcementSlice.ts";
interface PopUpAnnouncementProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}


const formFields = [
    {label: "Назва", name: "title", placeholder: "Введіть назву події"},
    {label: "Опис", name: "description", placeholder: "Що там буде відбуватися"},
    {label: "Дата початку події", name: "date_of_event", placeholder: "Коли розпочнется подія (рік-місяць-день)"},
];

interface FormData {
    file: File | null;
    title: string;
    description: string;
    date_of_event: string;

    [key: string]: string | File | null;
}

const AnnouncementPopUp: React.FC<PopUpAnnouncementProps> = ({visible, setVisible }) => {
      const [fileName, setFileName] = useState("Click to upload image");
    const [formData, setFormData] = useState<FormData>({
        file: null,
        title: "",
        description: "",
        date_of_event: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useAppDispatch();

    const formChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, files, value } = e.target as HTMLInputElement;

        if (name === "file" && files?.[0]) {
            setFormData({ ...formData, file: files[0] });
            setFileName(files[0].name);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const requiredFields = ["file", "title", "description", "date_of_event"];
        for (const field of requiredFields) {
            if (!formData[field]) {
                alert(`Заповніть поле ${field}`);
                return;
            }
        }
        setIsSubmitting(true);
        try {
            const data = new FormData();
            if (formData.file) data.append("image", formData.file);
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("dateOfEvent", formData.date_of_event);
            dispatch(addAnnouncement(data));
            setVisible(false);
        } catch (err) {
            console.error("Error while posting data", err);
            alert("Помилка під час відправки даних");
        } finally {
            setIsSubmitting(false);
            setFormData({
                file: null,
                title: "",
                description: "",
                date_of_event: ""
            });
            setFileName("Click to upload image");
        }
    };

    if (!visible) return null;

    return (
        <div className={styles.FormContent__overlay}>
            <div className={styles.FormContent__modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.FormContent__closeBtn} onClick={() => setVisible(false)}>Закрити</button>
                <form className={styles.FormContent__form} onSubmit={formSubmit}>
                    <div>
                        <label className={styles.FormContent__file} htmlFor="file">
                            <img className={styles.FormContent__img} src={collectImg} alt="img" />
                            <span>{fileName}</span>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={formChange}
                                style={{ display: "none" }}
                                required
                            />
                        </label>
                    </div>
                    <div className={styles.FormContent__modal__body}>
                        <div className={styles.FormContent__input}>
                            {formFields.map(({ label, name, placeholder }) => (
                                (
                                    <CustomInput
                                        key={name}
                                        label={label}
                                        name={name}
                                        placeholder={placeholder}
                                        value={typeof formData[name] === "string" ? formData[name] : ""}
                                        onChange={formChange}
                                    />
                                )
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


export default AnnouncementPopUp;