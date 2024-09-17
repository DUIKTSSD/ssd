import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import styles from "./navbar.module.scss";
import Hamburger from "../hamburger-menu_module/Hamburger";

const Navbar: React.FC = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div>
            <div className={styles.navbar}>
                <div className={styles.navbar__nav}>
                    <ul className={`${styles.navbar__items} ${isActive ? styles.navbar__items_active : ''}`}>
                        <li><Link to='/documentation'>Документація</Link></li>
                        <li><Link to='/projects'>Проєкти</Link></li>
                        <li><Link to='/gallery'>Галерея</Link></li>
                        <li><Link to='/news'>Новини</Link></li>
                        <li><Link to='/'>Про нас</Link></li>
                        <li><Link to='/contacts'>Контакти</Link></li>
                        <li><Link to='/team'>Колектив</Link></li>
                        <li><Link to='/login'>Логін</Link></li>
                        <li><Link to='/signup'>Реєстрація</Link></li>
                    </ul>
                </div>
                <Hamburger onClick={() => setIsActive(!isActive)} className={styles.navbar__burger} />
            </div>
        </div>
    );
};

export default Navbar;
