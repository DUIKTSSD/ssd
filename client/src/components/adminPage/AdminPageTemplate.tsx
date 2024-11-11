import React from 'react';
import AdminSidebar from "./components/adminSidebar/AdminSidebar.tsx";
import styles from "./admin.module.scss";
import AdminHeader from "./components/adminHeader/adminHeader.tsx";


interface AdminPageTemplateProps {
    type: "news" | "gallery" | "memesInspection" |"memesApprove" | "projects"|"documentations";
    children: React.ReactNode;
}

const AdminPageTemplate: React.FC<AdminPageTemplateProps> = ({ type, children }) => {
    return (
        <div className={styles.admin}>
            <AdminSidebar />
            <div className={styles.admin__content}>
                <AdminHeader type={type}/>
                <div className={styles.admin__contentBody}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminPageTemplate;