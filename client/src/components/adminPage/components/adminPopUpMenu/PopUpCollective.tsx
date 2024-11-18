import React, {useState} from "react";
import {useAppDispatch} from "../../../../hooks/reduxhooks.ts";
import styles from "./FormContent.module.scss";
import collectImg from "../../../../assets/upload_collect.png";
import {addCollective, fetchCollectives} from "../../../../features/collectives/collectives.ts";
import CustomInput from "./CustomInput.tsx";

interface PopUpCollectiveProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const formFields = [
    {label: "ПІБ", name: "name", placeholder: "Введіть ім'я"},
    {label: "Номер телефону", name: "phone", placeholder: "Введіть номер телефону"},
    {label: "Група", name: "group", placeholder: "Введіть групу"},
    {label: "Спеціальність", name: "specialty", placeholder: "Введіть спеціальність"},
    {label: "Характеристика", name: "description", placeholder: "Введіть характеристику"},
    {label: "Посада", name: "inFact", placeholder: "Введіть посаду"},
    {label: "Команда", name: "team", placeholder: "Введіть команду", optional: true},
];

const PopUpCollective: React.FC<PopUpCollectiveProps> = ({team, visible, setVisible}) => {
    const [fileName, setFileName] = useState("Click to upload image");
    const [formData, setFormData] = useState({
        file: null as File | null,
        name: "",
        phone: "",
        group: "",
        specialty: "",
        description: "",
        inFact: "",
        team: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useAppDispatch();
    const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files, value} = e.target;

        if (name === "file" && files?.[0]) {
            setFormData({...formData, file: files[0]});
            setFileName(files[0].name);
        } else {
            setFormData({...formData, [name]: value});
        }
    };
    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const requiredFields = ["file", "name", "phone", "group", "specialty", "description", "inFact"];
        for (const field of requiredFields) {
            if (!formData[field]) {
                alert(`Заповніть поле ${field}`);
                return;
            }
        }
        if (team && formData.team === "") {
            alert("Заповніть колектив");
            return;
        }
        setIsSubmitting(true);
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "file" && value instanceof File) {
                    data.append("image", value);
                } else if (value) {
                    data.append(key, value);
                }
            });
            dispatch(addCollective(data))
            dispatch(fetchCollectives())
            setVisible(false);
        } catch (err) {
            console.error("Error while posting data", err);
            alert("error");
        } finally {
            setIsSubmitting(false);
            setFormData(Object.fromEntries(Object.keys(formData).map(key => [key, key === "file" ? null : ""])));
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
                            <img className={styles.FormContent__img} src={collectImg} alt="img"/>
                            <span>{fileName}</span>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={formChange}
                                style={{display: "none"}}
                                required
                            />
                        </label>
                    </div>
                    <div className={styles.FormContent__modal__body}>
                        <div className={styles.FormContent__input}>
                            {formFields.map(({label, name, placeholder, optional}) => (
                                (optional && !team) ? null : (
                                    <CustomInput
                                        key={name}
                                        label={label}
                                        name={name}
                                        placeholder={placeholder}
                                        value={formData[name] || ""}
                                        onChange={formChange}
                                        required={!optional}
                                    />
                                )
                            ))}
                        </div>
                    </div>
                    <button type="submit" className={styles.FormContent__myBtn}>Відправити</button>
                </form>
            </div>
        </div>
    );
};
export default PopUpCollective;
