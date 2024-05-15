import React, { useState } from 'react';
import styles from "./navbar.module.scss";
import Hamburger from "../hamburger-menu_module/Hamburger";


const Navbar = () => {

    const [isActive, setIsActive] = useState(false);

    return (
        <div>
            <div className={styles.navbar}>
                <div className={styles.navbar__nav}>
                    <ul className={`${styles.navbar__items} ${isActive ? styles.navbar__items_active : ''}`}>
                    <li><a href="#">Документація</a></li>
                    <li><a href="#">Проєкти</a></li>
                    <li><a href="#">Галерея</a></li>
                    <li><a href="#">Новини</a></li>
                    <li><a href="#">Про нас</a></li>
                    <li><a href="#">Контакти</a></li>
                    <li><a href="#">Колектив</a></li>
                </ul>
            </div>
            <Hamburger onClick={() => setIsActive(!isActive)} className={styles.navbar__burger}/>
        </div>
    </div>
)
};

export default Navbar;