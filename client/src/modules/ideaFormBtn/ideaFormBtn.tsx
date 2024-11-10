import React from 'react';
import styles from "./btn.module.scss"

interface IdeaFormBtn extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
}

const IdeaFormBtn: React.FC<IdeaFormBtn>  = ({label, ...props}) => {
    return (
        <button type="submit" className={styles.btn} {...props}>{label}</button>
    );
};

export default IdeaFormBtn;