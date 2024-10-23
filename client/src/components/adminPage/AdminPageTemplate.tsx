import React from 'react';
import AdminSidebar from "./modules/adminSidebar/AdminSidebar";
import styles from "./admin.module.scss";
import AdminHeader from "./modules/adminHeader/adminHeader";

interface AdminPageTemplateProps {
    type: "news" | "gallery" | "memes" | "projects";
    children: React.ReactNode;
}

const AdminPageTemplate: React.FC<AdminPageTemplateProps> = ({ type, children }) => {
    return (
        <div className={styles.admin}>
            <AdminSidebar />
            <div className={styles.admin__content}>
                <AdminHeader type={type} />
                <div className={styles.admin__contentBody}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminPageTemplate;