import React from 'react';
import styles from "./admin.module.scss"
import AdminSidebar from "./modules/adminSidebar/AdminSidebar.tsx";


const AdminPage: React.FC = () => {
    return (
        <div className={styles.admin}>
            <AdminSidebar/>
        </div>
    );
};

export default AdminPage;