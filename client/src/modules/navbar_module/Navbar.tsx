import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import styles from "./navbar.module.scss";
import Hamburger from "../hamburger-menu_module/Hamburger.tsx";
import headerLogo from "../../assets/header__logo.svg";

const Navbar: React.FC = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={styles.navbar}>
             <Hamburger onClick={() => setIsActive(!isActive)} className={styles.navbar__burger}/>
            <img className={styles.navbar__logo} src={headerLogo} alt="logo"/>
            <ul className={`${styles.navbar__items} ${isActive ? styles.navbar__items_active : ''}`}>
                <li className={styles.navbar__item}><Link to="/documentations">Документація
                    <span className={styles.navbar__arrow}>→</span></Link></li>
                <li className={styles.navbar__item}><Link to="/projects">Проєкти
                    <span className={styles.navbar__arrow}>→</span></Link></li>
                <li className={styles.navbar__item}><Link to="/news">Новини
                    <span className={styles.navbar__arrow}>→</span></Link></li>
                <li className={styles.navbar__item}><Link to="/">Про нас
                    <span className={styles.navbar__arrow}>→</span></Link></li>
                <li className={styles.navbar__item}><Link to="/collective">Колектив
                    <span className={styles.navbar__arrow}>→</span></Link></li>
            </ul>
             <Link to="/signup"><button className={styles.navbar__auth_btn}>
               Вхід/Реєстрація
            </button></Link>
        </div>
    );
};

export default Navbar;
