import React from 'react';
import styles from "./FormContent.module.scss";

interface CustomInputProps {
    label: string;
    name: string;
    placeholder: string;
    value?: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, name, placeholder, value, onChange,required }) => {
    return (
            <div className={styles.FormContent}>
            <label className={styles.FormContent__input__label}>{label}</label>
            <input
                className={styles.FormContent__input__field}
                type={"text"}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
            </div>
    );
};

export default CustomInput;