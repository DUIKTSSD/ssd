import React from 'react';
import {Link} from "react-router-dom";
import styles from "./pathSelection.module.scss";

interface GoToBtnProps {
    url: string,
    label: string
}

const GoToBtn:React.FC<GoToBtnProps> = ({url, label}) => {
    return (
        <Link to={url}><button className={styles.pathSelection__btn}>{label}</button></Link>
    );
};

export default GoToBtn;