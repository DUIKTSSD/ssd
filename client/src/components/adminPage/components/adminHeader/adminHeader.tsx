import React, {useState} from 'react';
import AdminSearch from "./adminSearch/AdminSearch.tsx";
import styles from './adminHeader.module.scss';
import AddDocumentations from "../adminAddBtns/AddDocumentations.tsx";
import AddDocMenu from "../adminAddMenu/AddDocMenu.tsx";

interface adminHeaderBase {
    type: "news" | "gallery" | "memesInspection" |"memesApprove"| "projects"|"documentations",
}

interface NewsHeader extends adminHeaderBase {
    type: "news",
}

interface MemesInspectionHeader extends adminHeaderBase {
    type: "memesInspection",
}
interface MemesApproveHeader extends adminHeaderBase {
    type: "memesApprove",
}

interface GalleryHeader extends adminHeaderBase {
    type: "gallery",
}

interface ProjectsHeader extends adminHeaderBase {
    type: "projects",
}
interface DocumentationHeader extends adminHeaderBase {
    type: "documentations",
}


export type ProjectTypeHeader = ProjectsHeader | GalleryHeader | MemesInspectionHeader | MemesApproveHeader|NewsHeader|DocumentationHeader;

const AdminHeader:React.FC<ProjectTypeHeader> = (props) => {

    const [modal, setModal] = useState(false);
    if(props.type === "projects") {
        return (
            <div className={styles.adminHeader}>
                <div className={styles.adminHeader__title_container}>
                    <h3 className={styles.adminHeader__title}>{props.type}</h3>
                    <AdminSearch/>
                </div>
                <div className={styles.adminHeader__container}>
                    <span className={styles.adminHeader__item}>№</span>
                    <span className={styles.adminHeader__item}>Title</span>
                    <span className={styles.adminHeader__item}>Project Leader</span>
                    <span className={styles.adminHeader__item}>Project Info</span>
                    <span className={styles.adminHeader__item}>Action</span>
                </div>
            </div>
        )
    }
    if (props.type === "news") {
        return (
            <div className={styles.adminHeader}>
                <div className={styles.adminHeader__title_container}>
                    <h3 className={styles.adminHeader__title}>{props.type}</h3>
                    <AdminSearch/>
                </div>
                <div className={styles.adminHeader__container}>
                    <span className={styles.adminHeader__item}>№</span>
                    <span className={styles.adminHeader__item}>Photo</span>
                    <span className={styles.adminHeader__item}>About</span>
                    <span className={styles.adminHeader__item}>Action</span>
                </div>
            </div>
        )
    }
    if (props.type === "gallery") {
        return (
            <div className={styles.adminHeader}>
                <div className={styles.adminHeader__title_container}>
                    <h3 className={styles.adminHeader__title}>{props.type}</h3>
                    <AdminSearch/>
                </div>
                <div className={styles.adminHeader__container}>
                    <span className={styles.adminHeader__item}>№</span>
                    <span className={styles.adminHeader__item}>Photo</span>
                    <span className={styles.adminHeader__item}>Author</span>
                    <span className={styles.adminHeader__item}>Action</span>
                </div>
            </div>
        )
    }
    if (props.type === "memesInspection") {
        return (
            <div className={styles.adminHeader}>
                <div className={styles.adminHeader__title_container}>
                    <h3 className={styles.adminHeader__title}>{props.type}</h3>
                </div>
                <div className={styles.adminHeader__container__meme}>
                    <span className={styles.adminHeader__item}>№</span>
                    <span className={styles.adminHeader__item}>Mem</span>
                    <span className={styles.adminHeader__item}>Author</span>
                    <span className={styles.adminHeader__item}>Action</span>
                </div>
            </div>
        )
    }
    if (props.type === "memesApprove") {
        return (
            <div className={styles.adminHeader}>
                <div className={styles.adminHeader__title_container}>
                    <h3 className={styles.adminHeader__title}>{props.type}</h3>
                </div>
                <div className={styles.adminHeader__container__meme}>
                    <span className={styles.adminHeader__item}>№</span>
                    <span className={styles.adminHeader__item}>Mem</span>
                    <span className={styles.adminHeader__item}>Author</span>
                    <span className={styles.adminHeader__item}>Action</span>
                </div>
            </div>
        )
    }
    if (props.type === "documentations") {
        return (
            <div className={styles.adminHeader}>
                <div className={styles.adminHeader__title_container}>
                    <h3 className={styles.adminHeader__title}>{props.type}</h3>
                    <AddDocumentations title="Додати"
                                       onAdd={() => setModal(true)}
                    />
                    <AddDocMenu visible={modal} setVisible={setModal} />
                    <AdminSearch/>

                </div>

                <div className={styles.adminHeader__containerDoc}>
                    <span className={styles.adminHeader__item}>№</span>
                    <span className={styles.adminHeader__item}>title</span>
                    <span className={styles.adminHeader__item}>Action</span>
                </div>
            </div>
        )
    }

};

export default AdminHeader;