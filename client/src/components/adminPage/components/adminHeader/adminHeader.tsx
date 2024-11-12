import React, {useEffect, useRef, useState} from 'react';
import AdminSearch from "./adminSearch/AdminSearch.tsx";
import styles from './adminHeader.module.scss';

interface adminHeaderBase {
    type: "news" | "gallery" | "memes" | "projects",
}

interface NewsHeader extends adminHeaderBase {
    type: "news",
}

interface MemesHeader extends adminHeaderBase {
    type: "memes",
}

interface GalleryHeader extends adminHeaderBase {
    type: "gallery",
}

interface ProjectsHeader extends adminHeaderBase {
    type: "projects",
}


export type ProjectTypeHeader = ProjectsHeader | GalleryHeader | MemesHeader | NewsHeader;

const AdminHeader:React.FC<ProjectTypeHeader> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [gridTemplate, setGridTemplate] = useState<string>('')

    useEffect(() => {
        if(containerRef.current) {
            const itemCount = containerRef.current.childElementCount;
            setGridTemplate(`repeat(${itemCount}, 1fr)`)
        }
    }, [props.type]);

    return (
        <div className={styles.adminHeader}>
            <div className={styles.adminHeader__title_container}>
                <h3 className={styles.adminHeader__title}>{props.type}</h3>
                <AdminSearch/>
            </div>
            <div ref={containerRef} className={styles.adminHeader__container}
            style={{
                gridTemplateColumns: gridTemplate
            }}>
                {props.type === "projects" && (
                    <>
                        <span className={styles.adminHeader__item}>№</span>
                        <span className={styles.adminHeader__item}>Title</span>
                        <span className={styles.adminHeader__item}>Leader</span>
                        <span className={styles.adminHeader__item}>Info</span>
                        <span className={styles.adminHeader__item}>Action</span>
                    </>
                )}
                {props.type === "news" && (
                    <>
                        <span className={styles.adminHeader__item}>Photo</span>
                        <span className={styles.adminHeader__item}>Title</span>
                        <span className={styles.adminHeader__item}>About</span>
                    </>
                )}
                {props.type === "memes" && (
                    <>
                        <span className={styles.adminHeader__item}>№</span>
                        <span className={styles.adminHeader__item}>Mem</span>
                        <span className={styles.adminHeader__item}>Author</span>
                        <span className={styles.adminHeader__item}>Action</span>
                    </>
                )}
                {props.type === "gallery" && (
                    <>
                        <span className={styles.adminHeader__item}>№</span>
                        <span className={styles.adminHeader__item}>Photo</span>
                        <span className={styles.adminHeader__item}>Author</span>
                        <span className={styles.adminHeader__item}>Action</span>
                    </>
                )}
            </div>
        </div>
    )
};

export default AdminHeader;