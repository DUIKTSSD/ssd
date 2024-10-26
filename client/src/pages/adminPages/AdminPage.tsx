import React from 'react';
import AdminSidebar from "../../components/adminPage/components/adminSidebar/AdminSidebar.tsx";
import styles from "./additional.module.scss"

const AdminPage:React.FC = () => {
    return (
        <div className={styles.full}>
            <AdminSidebar/>
        </div>
    );
};

export default AdminPage;