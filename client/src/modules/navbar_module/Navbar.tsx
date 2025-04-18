import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import styles from "./navbar.module.scss";
import Hamburger from "../hamburger-menu_module/Hamburger.tsx";
import headerLogo from "../../assets/header_logo.svg";
import NavbarItem from "./menuItem/NavbarItem.tsx";
import UserStatus from "./UserStatus.tsx";

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
                {menuItems.map((item) => {
                    const isItemActive =
                        item.path === "/"
                            ? location.pathname === "/" // Подсвечиваем "Про нас" только если путь строго "/"
                            : location.pathname.startsWith(item.path); // Для остальных путей проверяем начало строки
                    return (
                        <NavbarItem
                            key={item.path}
                            path={item.path}
                            label={item.label}
                            isActive={isItemActive}
                            onClick={() => setIsActive(false)}
                        />
                    );
                })}
            </ul>
            <UserStatus/>
        </div>
    );
};

export default Navbar;
