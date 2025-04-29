import React, {useEffect, useRef, useState} from 'react';
import AdminSearch from "./adminSearch/AdminSearch.tsx";
import styles from './adminHeader.module.scss';

interface adminHeaderBase {
    type: "news" | "gallery" | "memesInspection" |"memesApprove"| "projectsApprove"|"projectsInspection"|"documentations"|"usefulLinks"|"announcement"|"vacancies"|"courseLinks"|"collectivesLead"|"collectivesDepartment",
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
interface CollectivesHeader extends adminHeaderBase {
    type: "collectivesLead" | "collectivesDepartment";
}
interface GalleryHeader extends adminHeaderBase {
    type: "gallery",
}

interface ProjectsHeader extends adminHeaderBase {
    type: "projectsInspection" |"projectsApprove"
}
interface VacanciesHeader extends adminHeaderBase {
    type: "vacancies",
}
interface AnnouncementHeader extends adminHeaderBase {
    type: "announcement",
}
interface DocumentationHeader extends adminHeaderBase {
    type: "documentations"|"usefulLinks"|"courseLinks",
}


export type ProjectTypeHeader = ProjectsHeader | GalleryHeader |AnnouncementHeader|VacanciesHeader| MemesInspectionHeader | MemesApproveHeader|NewsHeader|DocumentationHeader|CollectivesHeader;

const AdminHeader:React.FC<ProjectTypeHeader> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [gridTemplate, setGridTemplate] = useState<string>('')

    useEffect(() => {
        if(containerRef.current) {
            const itemCount = containerRef.current.childElementCount;
            setGridTemplate(`repeat(${itemCount}, 1fr)`)
            console.log(containerRef)
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
                {(props.type === 'projectsInspection' || props.type === 'projectsApprove') && (
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
                {props.type === "gallery" && (
                    <>
                        <span className={styles.adminHeader__item}>№</span>
                        <span className={styles.adminHeader__item}>Photo</span>
                        <span className={styles.adminHeader__item}>Author</span>
                        <span className={styles.adminHeader__item}>Action</span>
                    </>
                )}
                {props.type === 'memesInspection' && (
                    <>
                        <span className={styles.adminHeader__item}>Mem</span>
                        <span className={styles.adminHeader__item}>Author</span>
                        <span className={styles.adminHeader__item}>Action</span>
                    </>
                )}
                {props.type === 'memesApprove' && (
                    <>
                        <span className={styles.adminHeader__item}>Mem</span>
                        <span className={styles.adminHeader__item}>Author</span>
                        <span className={styles.adminHeader__item}>Action</span>
                    </>

                )}
                {props.type === 'vacancies' && (
                    <>
                        <span className={styles.adminHeader__item}>Info</span>
                        <span className={styles.adminHeader__item}>Action</span>
                    </>

                )}
                {props.type === 'announcement' && (
                    <>
                        <span className={styles.adminHeader__item}>img</span>
                        <span className={styles.adminHeader__item}>Назва</span>
                        <span className={styles.adminHeader__item}>Відбудится</span>
                        <span className={styles.adminHeader__item}>Дії</span>
                    </>

                )}
                {(props.type === 'documentations' || props.type === 'usefulLinks'|| props.type === 'courseLinks') && (
                    <>
                        <span className={styles.adminHeader__item}>title</span>
                        <span className={styles.adminHeader__item}>Action</span>
                    </>
                )}
                {(props.type === 'collectivesLead' || props.type === 'collectivesDepartment') && (
                    <>
                        <span className={styles.adminHeader__item}>Фото</span>
                        <span className={styles.adminHeader__item}>Інформація</span>
                        <span className={styles.adminHeader__item}>Action</span>
                    </>
                )}
            </div>
        </div>
    )
};

export default AdminHeader;