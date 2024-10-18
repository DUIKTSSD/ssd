import React from 'react';
import AdminSidebar from "./modules/adminSidebar/AdminSidebar.tsx";
import styles from "./admin.module.scss";
import AdminHeader from "./modules/adminHeader/adminHeader.tsx";
import AdminModContent, {ModeratorContent} from "./modules/adminModeratorContent/AdminModContent.tsx";

interface AdminPageTemplateProps {
    type: "news" | "gallery" | "memes" | "projects"

    moderatorData: ModeratorContent;
}



const AdminPageTemplate:React.FC<AdminPageTemplateProps> = ({type, moderatorData}) => {
    return (
        <div className={styles.admin}>
            <AdminSidebar/>
            <div className={styles.admin__content}>
                <AdminHeader type={type}/>
                <AdminModContent data={moderatorData}/>
            </div>
        </div>
    );
};

export default AdminPageTemplate;