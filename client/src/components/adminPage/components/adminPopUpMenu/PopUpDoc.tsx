import React, { useState } from "react";
import {addDocumentation} from "../../../../features/documentations/documentations.ts";
import { useAppDispatch } from "../../../../hooks/reduxhooks.ts";
import styles from "./FormContent.module.scss";
import pdf from "../../../../assets/pdf.png";

interface PopUpDocProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const PopUpDoc: React.FC<PopUpDocProps> = ({ visible, setVisible }) => {
    const [fileName, setFileName] = useState("Click to upload file");
    const [formData, setFormData] = useState({ file: null as File | null, name: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useAppDispatch();
    const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files, value } = e.target;

        if (name === "file" && files?.[0]) {
            setFormData({ ...formData, file: files[0] });
            setFileName(files[0].name);
        } else {
            setFormData({ ...formData, name: value });
        }
    };
    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.file || !formData.name) {
            alert("Будь ласка, заповніть усі поля");
            return;
        }

        setIsSubmitting(true);

        try {
            const data = new FormData();
            data.append("file", formData.file);
            data.append("name", formData.name);
            dispatch(addDocumentation(data))
            setVisible(false);
        }
        finally {
            setIsSubmitting(false);
            setFormData({ file: null, name: "" });
            setFileName("Click to upload file");
        }
    };
    if (!visible) return null;
    return (
        <div className={styles.FormContent__overlay} onClick={() => setVisible(false)}>
            <div className={styles.FormContent__modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.FormContent__closeBtn} onClick={() => setVisible(false)}>Закрити</button>
                <form className={styles.FormContent__form} onSubmit={formSubmit}>
                    <div>
                        <label className={styles.FormContent__file} htmlFor="file">
                                <img src={pdf} alt="PDF"/>
                                <span>{fileName}</span>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                accept=".pdf"
                                onChange={formChange}
                                style={{display: "none"}}
                                required
                            />
                        </label>
                    </div>
                    <div className={styles.FormContent__modal__body}>
                        <div className={styles.FormContent__input}>
                            <label className={styles.FormContent__input__label}>Назва Документа</label>
                            <input className={styles.FormContent__input__field}
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={formChange}
                                placeholder="Введіть назву документа"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className={styles.FormContent__myBtn}>Відправити</button>
                </form>
            </div>
        </div>
    );
};
export default PopUpDoc;
