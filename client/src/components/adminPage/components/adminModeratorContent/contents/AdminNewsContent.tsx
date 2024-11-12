// ! В разработке не лезь блять я сам

import React, {useEffect, useRef, useState} from "react";
import styles from "../adminModContent.module.scss";
import {NewsData} from "../../../types/adminTypes.ts";
import DeleteBtn from "../../../modules/DeleteBtn.tsx";
import PopUp from "../../../../../modules/popup/popUp.tsx";
import {useAppDispatch} from "../../../../../hooks/reduxhooks.ts";
import {deleteNews} from "../../../../../features/news/newsSlice.ts";

interface AdminNewsContentProps {
    data: NewsData[];
}

const AdminNewsContent: React.FC<AdminNewsContentProps> = ({ data }) => {

    const dispatch = useAppDispatch()
    const containerRef = useRef<HTMLDivElement>(null);
    const [gridColumns, setGridColumns] = useState<string>('')
    const [selectedProject, setSelectedProject] = useState<NewsData | null>(null)

    useEffect(() => {
        const itemCount = containerRef.current?.childElementCount;

         setGridColumns(`repeat(${itemCount}, 1fr)`);
    }, []);

  return (
    <>
      {data.map(item => (
        <div ref={containerRef}
             key={item.id}
             className={`${styles.adminModContent} ${styles.adminModContent__news}`}
             style={{gridTemplateColumns: gridColumns, alignItems: 'center'}}
        >
            <img className={styles.adminModContent__img} src={`data:image/png;base64,${item.image}`} alt="News thumbnail"/>
            <p className={styles.adminModContent__title}>{item.title}</p>
            <div className={styles.adminModContent__textWrapper}>
                <button onClick={() => {
                    setSelectedProject(item)
                }} className={styles.adminModContent__viewBtn}>View</button>
                <DeleteBtn onClick={() => {
                    dispatch(deleteNews(item.id))
                }}/>
            </div>
        </div>
      ))}
        {selectedProject && (
            <PopUp title='News' onClose={() => setSelectedProject(null)}>
                <div>
                    <p>{selectedProject.title}</p>
                    <p>{selectedProject.text}</p>
                </div>
            </PopUp>
        )}
    </>
  );
};

export default AdminNewsContent;