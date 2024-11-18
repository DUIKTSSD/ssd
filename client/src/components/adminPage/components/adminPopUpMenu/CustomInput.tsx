import React from 'react';
import styles from "./FormContent.module.scss";

interface CustomInputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, name, type = "text", placeholder = "", value, onChange }) => {
    return (
            <div className={styles.FormContent}>
            <label className={styles.FormContent__input__label}>{label}</label>
            <input
                className={styles.FormContent__input__field}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            </div>
    );
};

export default CustomInput;