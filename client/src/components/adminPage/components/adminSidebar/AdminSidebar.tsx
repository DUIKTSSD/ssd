import React, { useState } from 'react';
import styles from "./adminSidebar.module.scss";
import { Link } from "react-router-dom";
import logo from "../../../../assets/header__logo.svg";

const AdminSidebar: React.FC = () => {
    // Состояние для отслеживания открытия подменю "Меми"
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    // Функція для відкриття/закриття підменю
    const toggleSubmenu = (submenu: string) => {
        setOpenSubmenu(openSubmenu === submenu ? null : submenu); // Закриваємо, якщо вже відкрите
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
                    <li className={styles.adminSidebar__menu_item}>
                        <Link to="/admin/vacancies">Вакансії</Link>
                    </li>
                    <li className={styles.adminSidebar__menu_item}>
                        <Link to="/admin/announcement">Анонси</Link>
                    </li>
                    <li onClick={() => toggleSubmenu('memes')} className={styles.adminSidebar__menu_item}>
                        Меми
                    </li>
                    {openSubmenu === 'memes' && (
                        <ul>
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
                    <li onClick={() => toggleSubmenu('docs')} className={styles.adminSidebar__menu_item}>
                        Документації
                    </li>
                    {openSubmenu === 'docs' && (
                        <ul>
                            <li className={styles.adminSidebar__submenu_item}>
                                <Link to="/admin/docs/ssd">Самоврядування</Link>
                            </li>
                            <li className={styles.adminSidebar__submenu_item}>
                                <Link to="/admin/docs/useful-link">Корисні силки</Link>
                            </li>
                            <li className={styles.adminSidebar__submenu_item}>
                                <Link to="/admin/docs/course-link">Курси</Link>
                            </li>
                        </ul>
                    )}
                    <li onClick={() => toggleSubmenu('collective')} className={styles.adminSidebar__menu_item}>
                        Колектив
                    </li>
                    {openSubmenu === 'collective' && (
                        <ul>
                            <li className={styles.adminSidebar__submenu_item}>
                                <Link to="/admin/collective/leaders">Голови</Link>
                            </li>
                            <li className={styles.adminSidebar__submenu_item}>
                                <Link to="/admin/collective/department">Відділи</Link>
                            </li>
                        </ul>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AdminSidebar;
