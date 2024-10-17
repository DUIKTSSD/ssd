import React from 'react';
import AdminSearch from "./adminSearch/AdminSearch.tsx";
import styles from './adminHeader.module.scss';

interface adminHeaderBase {
    type: "news" | "gallery" | "memes" | "projects",
    id: number,
    action: string
}

interface NewsHeader extends adminHeaderBase {
    type: "news",
    photoTitle: string,
    description: string,
}

interface MemesHeader extends adminHeaderBase {
    type: "memes",
    photoTitle: string,
    author: string,
}

interface GalleryHeader extends adminHeaderBase {
    type: "gallery",
    photoTitle: string,
    author: string
}

interface ProjectsHeader extends adminHeaderBase {
    type: "projects",
    title: string,
    author: string,
    projectInfo: string

}


type ProjectTypeHeader = ProjectsHeader | GalleryHeader | MemesHeader | NewsHeader;

const AdminHeader:React.FC<ProjectTypeHeader> = (props) => {

    if(props.type === "projects") {
        return (
            <div className={styles.adminHeader}>
                <div className={styles.adminHeader__title_container}>
                    <h3 className={styles.adminHeader__title}>{props.type}</h3>
                    <AdminSearch/>
                </div>
                <div className={styles.adminHeader__container}>
                    <span className={styles.adminHeader__item}>{props.id}</span>
                    <span className={styles.adminHeader__item}>{props.title}</span>
                    <span className={styles.adminHeader__item}>{props.author}</span>
                    <span className={styles.adminHeader__item}>{props.projectInfo}</span>
                    <span className={styles.adminHeader__item}>{props.action}</span>
                </div>
            </div>
        )
    }
    if (props.type === "news") {
        return (
            <div className={styles.adminHeader}>
                <AdminSearch/>
                <div className={styles.adminHeader__container}>
                    <span className={styles.adminHeader__item}>{props.id}</span>
                    <span className={styles.adminHeader__item}>{props.photoTitle}</span>
                    <span className={styles.adminHeader__item}>{props.description}</span>
                    <span className={styles.adminHeader__item}>{props.action}</span>
                </div>
            </div>
        )
    }
    if (props.type === "gallery") {
        return (
            <div className={styles.adminHeader}>
                <AdminSearch/>
                <div className={styles.adminHeader__container}>
                    <span className={styles.adminHeader__item}>{props.id}</span>
                    <span className={styles.adminHeader__item}>{props.photoTitle}</span>
                    <span className={styles.adminHeader__item}>{props.author}</span>
                    <span className={styles.adminHeader__item}>{props.action}</span>
                </div>
            </div>
        )
    }
    if (props.type === "memes") {
        return (
            <div className={styles.adminHeader}>
                <AdminSearch/>
                <div className={styles.adminHeader__container}>
                    <span className={styles.adminHeader__item}>{props.id}</span>
                    <span className={styles.adminHeader__item}>{props.photoTitle}</span>
                    <span className={styles.adminHeader__item}>{props.author}</span>
                    <span className={styles.adminHeader__item}>{props.action}</span>
                </div>
            </div>
        )
    }

};

export default AdminHeader;