import React from 'react';
import {Link} from "react-router-dom";
import styles from "./pathSelection.module.scss";

interface GoToBtnProps {
    url: string,
    label: string
    isActive: boolean
}

const GoToBtn: React.FC<GoToBtnProps> = ({url, label, isActive}) => {
    return (
        <Link to={url}>
            <button className={`${styles.pathSelection__btn} ${isActive ? styles.pathSelection__btnActive : ""}`}>{label}</button>
        </Link>

    );
};

export default GoToBtn;