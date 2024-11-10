import React from 'react';
import styles from "../adminApproveBtns/btn.module.scss";
interface AddBtnProps {
    onAdd: () => void;
    title: string;
}
const AddDocumentations:React.FC<AddBtnProps> = ({ onAdd, title }) => {
    return (
        <div>
            <button onClick={onAdd}
                    className={`${styles.btn} ${styles.btn__add}`}>
                {title}
            </button>
        </div>
    );
};

export default AddDocumentations;