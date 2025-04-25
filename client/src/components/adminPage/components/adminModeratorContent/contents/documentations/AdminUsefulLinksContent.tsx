import React, {useRef} from 'react';
import {DocumentationLinksData} from "../../../../types/adminTypes.ts";
import styles from "../documentationContent.module.scss"
import RejectBtn from "../../../adminApproveBtns/RejectBtn.tsx";
import {useAppDispatch} from "../../../../../../hooks/reduxhooks.ts";
import useDynamicGridColumns from "../../../../../../hooks/useDynamicGridColumns.ts";
import {deleteUsefulLinks} from "../../../../../../features/documentations/documentationLinks.ts";
import {useSearchParams} from "react-router-dom";
import Pagination from "../../../../../common/pagination/Pagination.tsx";



const AdminUsefulLinksContent: React.FC<{ data: DocumentationLinksData[], pageNumber: number,
  totalPages: number }> = ({data,pageNumber, totalPages}) => {
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
     const [, setSearchParams] = useSearchParams();
    const gridColumns = useDynamicGridColumns(containerRef, 'repeat(2, 1fr)');
    const deleteLink = async(id:number) => {
            dispatch(deleteUsefulLinks(id));
            console.log('Документация удалена:', id);
    }
    const handlePageChange = (page: number) => {
       setSearchParams({ pageNumber: (page + 1).toString() });
    };
    return (
        <div className={styles.adminModContent}>
            {data.map(item => (
                <div  style={{gridTemplateColumns: gridColumns, alignItems: 'center', padding: '10px'}}
                      ref={containerRef}  key={item.id} className={styles.adminModContent__item}>
                    <h6 className={styles.adminModContent__title}>{item.description}</h6>
                    <div className={styles.adminModContent__actions}>
                        <button className={styles.adminModContent__btnLink} onClick={() => {
                            window.open(item.url, '_blank', 'noopener,noreferrer')
                        }
                        }>Перейти</button>
                        <RejectBtn onReject={async () => {
                            await deleteLink(item.id);
                        }
                        }/>
                    </div>
                </div>
            ))}
             <Pagination
        currentPage={pageNumber}
        totalPages={totalPages}
        onPageChange={handlePageChange}
    />
        </div>
    )
}
    export default AdminUsefulLinksContent;
