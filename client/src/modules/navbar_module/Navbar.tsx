import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import styles from "./navbar.module.scss";
import Hamburger from "../hamburger-menu_module/Hamburger.tsx";
import headerLogo from "../../assets/header__logo.svg";
import NavbarItem from "./menuItem/NavbarItem.tsx";

const Navbar: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();
    const menuItems = [
        {path: "/documentations", label: "Документація"},
        {path: "/projects", label: "Проєкти"},
        {path: "/news", label: "Новини"},
        {path: "/", label: "Про нас"},
        {path: "/collective", label: "Колектив"},
    ];
    return (
        <div className={styles.navbar}>
            <Hamburger isActive={isActive} onClick={() => setIsActive(!isActive)} className={styles.navbar__burger}/>
            <Link to={"/"}> <img className={styles.navbar__logo} src={headerLogo} alt="logo"/></Link>
            <ul className={`${styles.navbar__items} ${isActive ? styles.navbar__items_active : ''}`}>
                {menuItems.map((item) => (
                    <NavbarItem
                        key={item.path}
                        path={item.path}
                        label={item.label}
                        isActive={location.pathname === item.path}
                        onClick={() => setIsActive(false)}
                    />
                ))}
            </ul>
            <Link to="/signup">
                <button className={styles.navbar__auth_btn}>
                    Вхід/Реєстрація
                </button>
            </Link>
        </div>
    );
};

export default Navbar;
