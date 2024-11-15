import React from 'react';
import styles from "../adminApproveBtns/btn.module.scss";
interface AddBtnProps {
    onClick: () => void;
    title: string;
}
const AddDocumentations:React.FC<AddBtnProps> = ({ onClick, title }) => {
    return (
        <div>
            <button onClick={onClick}
                    className={`${styles.btn} ${styles.btn__add}`}>
                {title}
            </button>
        </div>
    );
};

export default AddDocumentations;