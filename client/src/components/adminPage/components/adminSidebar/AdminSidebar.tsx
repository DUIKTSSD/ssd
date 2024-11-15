import React, { useState } from 'react';
import styles from "./adminSidebar.module.scss";
import { Link } from "react-router-dom";
import logo from "../../../../assets/header__logo.svg";

const AdminSidebar: React.FC = () => {
    // Состояние для отслеживания открытия подменю "Меми"
    const [isMemesSubmenuOpen, setIsMemesSubmenuOpen] = useState(false);
    const [isCollectiveSubmenuOpen, setIsCollectiveSubmenuOpen] = useState(false);

    // Функция для переключения состояния подменю
    const toggleMemesSubmenu = () => {
        setIsMemesSubmenuOpen(!isMemesSubmenuOpen);
    };
    const toggleCollectiveSubmenu = () => {
        setIsCollectiveSubmenuOpen(!isMemesSubmenuOpen);
    };
    return (
        <div className={styles.adminSidebar}>
            <div className={styles.adminSidebar__header}>
                <img className={styles.adminSidebar__header_logo} src={logo} alt="logo" />
                <h3 className={styles.adminSidebar__header_title}>Admin Panel</h3>
            </div>
            <div className={styles.adminSidebar__menu_container}>
                <h4 className={styles.adminSidebar__menu_title}>Menu</h4>
                <ul className={styles.adminSidebar__menu}>
                    <li className={styles.adminSidebar__menu_item}>
                        <Link to="/admin/projects">Проєкти</Link>
                    </li>
                    <li onClick={toggleMemesSubmenu} className={styles.adminSidebar__menu_item}>
                            Меми</li>
                        {isMemesSubmenuOpen && (
                            <ul >
                                <li className={styles.adminSidebar__submenu_item}>
                                    <Link to="/admin/memes/approve">Одобрені меми</Link>
                                </li>
                                <li className={styles.adminSidebar__submenu_item}>
                                    <Link to="/admin/memes/inspection">Меми на перевірці</Link>
                                </li>
                            </ul>
                        )}
                    <li className={styles.adminSidebar__menu_item}>
                        <Link to="/admin/news">Новини</Link>
                    </li>
                    <li className={styles.adminSidebar__menu_item}>
                        <Link to="/admin/docs">Документації</Link>
                    </li>
                    <li onClick={toggleCollectiveSubmenu} className={styles.adminSidebar__menu_item}>
                        Колектив</li>
                    {isCollectiveSubmenuOpen && (
                        <ul >
                            <li className={styles.adminSidebar__submenu_item}>
                                <Link to="/admin/collective/leaders">Голови</Link>
                            </li>
                            <li className={styles.adminSidebar__submenu_item}>
                                <Link to="/admin/collective/sections">Відділи</Link>
                            </li>
                        </ul>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AdminSidebar;
