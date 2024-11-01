import React from 'react';
import styles from "./btn.module.scss"

interface IdeaFormBtn {
    label: string
}

const IdeaFormBtn:React.FC<IdeaFormBtn> = ({label}) => {
    return (
        <button type="submit" className={styles.btn}>{label}</button>
    );
};

export default IdeaFormBtn;