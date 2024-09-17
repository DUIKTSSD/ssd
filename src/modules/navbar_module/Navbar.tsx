import React, { useState } from 'react';
import styles from "./navbar.module.scss";
import Hamburger from "../hamburger-menu_module/Hamburger";

const Navbar:React.FC = () => {

    const [isActive, setIsActive] = useState(false);

    return (
        <div>
            <div className={styles.navbar}>
                <div className={styles.navbar__nav}>
                    <ul className={`${styles.navbar__items} ${isActive ? styles.navbar__items_active : ''}`}>
                    <li><a href={`/documentation`}>Документація</a></li>
                    <li><a href={`/projects`}>Проєкти</a></li>
                    <li><a href={`/gallery`}>Галерея</a></li>
                    <li><a href={`/news`}>Новини</a></li>
                    <li><a href={`/`}>Про нас</a></li>
                    <li><a href={`/contacts`}>Контакти</a></li>
                    <li><a href={`/team`}>Колектив</a></li>
                    <li><a href={`/login`}>Логін</a></li>
                    <li><a href={`/signup`}>Реєстрація</a></li>
                </ul>
            </div>
            <Hamburger onClick={() => setIsActive(!isActive)} className={styles.navbar__burger}/>
        </div>
    </div>
)
};

export default Navbar;