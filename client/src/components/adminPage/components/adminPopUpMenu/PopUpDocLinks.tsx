import React, {useState} from "react";
import {useAppDispatch} from "../../../../hooks/reduxhooks.ts";
import styles from "./FormContent.module.scss";
import {addCourseLinks, addUsefulLinks} from "../../../../features/documentations/documentationLinks.ts";

interface PopUpDocProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    section: "useful" | "course";
}

interface FormData {
    url: string;
    description: string;

}

const PopUpDocLinks: React.FC<PopUpDocProps> = ({visible, setVisible,section}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({url: "", description: ""});
    const dispatch = useAppDispatch();

    const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            setFormData({...formData, [name]: value});
        };
    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.url || !formData.description) {
            alert("Будь ласка, заповніть усі поля");
            return;
        }
        setIsSubmitting(true);
        try {
            const data = {
                url: formData.url,
                description: formData.description,
            };
            if (section === "useful") {
                await dispatch(addUsefulLinks(data));
            } else {
                await dispatch(addCourseLinks(data));
            }
            setVisible(false);
        } catch (err) {
            console.error("Error while submitting the form", err);
            alert("Виникла помилка при відправленні документа");
        } finally {
            setIsSubmitting(false);
            setFormData({url: "", description: ""});  // Скидаємо форму після відправки
        }
    }
 if (!visible) return null;
        return (
            <div className={styles.FormContent__overlay} onClick={() => setVisible(false)}>
                <div className={styles.FormContent__modal} onClick={(e) => e.stopPropagation()}>
                    <button className={styles.FormContent__closeBtn} onClick={() => setVisible(false)}>
                        Закрити
                    </button>
                    <form className={styles.FormContent__form} onSubmit={formSubmit}>
                        <div className={styles.FormContent__modal__body}>
                            <div className={styles.FormContent__input}>
                                <label className={styles.FormContent__input__label}>URL</label>
                                <input
                                    className={styles.FormContent__input__field}
                                    type="url"
                                    id="url"
                                    name="url"
                                    value={formData.url}
                                    onChange={formChange}
                                    placeholder="Введіть URL"
                                    required
                                />
                            </div>
                            <div className={styles.FormContent__input}>
                                <label className={styles.FormContent__input__label}>Опис</label>
                                <input
                                    className={styles.FormContent__input__field}
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={formChange}
                                    placeholder="Введіть опис"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className={styles.FormContent__myBtn} disabled={isSubmitting}>
                            {isSubmitting ? "Відправка..." : "Відправити"}
                        </button>
                    </form>
                </div>
            </div>
        );
    };
export default PopUpDocLinks;
