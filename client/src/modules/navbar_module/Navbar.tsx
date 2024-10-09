import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import styles from "./navbar.module.scss";
import Hamburger from "../hamburger-menu_module/Hamburger.tsx";
import headerLogo from "../../assets/header__logo.svg";

const Navbar: React.FC = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div>
            <div className={styles.navbar}>
                 <Hamburger onClick={() => setIsActive(!isActive)} className={styles.navbar__burger}/>
                <img className={styles.navbar__logo} src={headerLogo} alt="logo"/>
                <ul className={`${styles.navbar__items} ${isActive ? styles.navbar__items_active : ''}`}>
                    <li className={styles.navbar__item}><Link to='/documentation'>Документація</Link></li>
                    <li className={styles.navbar__item}><Link to='/projects'>Проєкти</Link></li>
                    <li className={styles.navbar__item}><Link to='/gallery'>Галерея</Link></li>
                    <li className={styles.navbar__item}><Link to='/news'>Новини</Link></li>
                    <li className={styles.navbar__item}><Link to='/'>Про нас</Link></li>
                    <li className={styles.navbar__item}><Link to='/contacts'>Контакти</Link></li>
                    <li className={styles.navbar__item}><Link to='/team'>Колектив</Link></li>
                </ul>
                <button className={styles.navbar__auth_btn}>
                    <Link to="/signup">Вхід/Реєстрація</Link>
                </button>

            </div>
        </div>
    );
};

export default Navbar;
