import React from 'react';
import styles from "./adminSidebar.module.scss"
import {Link} from "react-router-dom";
import logo from "../../../../assets/header__logo.svg";

const AdminSidebar: React.FC = () => {
    return (
        <div className={styles.adminSidebar}>
            <div className={styles.adminSidebar__header}>
                <img className={styles.adminSidebar__header_logo} src={logo} alt="logo"/>
                <h3 className={styles.adminSidebar__header_title}>Admin Panel</h3>
            </div>
            <div className={styles.adminSidebar__menu_container}>
                <h4 className={styles.adminSidebar__menu_title}>Menu</h4>
                <ul className={styles.adminSidebar__menu}>
                    <li className={styles.adminSidebar__menu_item}><Link to="/admin/projects">Проєкти</Link></li>
                    <li className={styles.adminSidebar__menu_item}><Link to="/admin/gallery">Галерея</Link></li>
                    <li className={styles.adminSidebar__menu_item}><Link to="/admin/memes">Меми</Link></li>
                    <li className={styles.adminSidebar__menu_item}><Link to="/admin/news">Новини</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default AdminSidebar;