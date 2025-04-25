import React, {useRef} from 'react';
import {DocumentationsData} from "../../../../types/adminTypes.ts";
import styles from "../documentationContent.module.scss"
import RejectBtn from "../../../adminApproveBtns/RejectBtn.tsx";
import {
    deleteDocumentation,
} from "../../../../../../features/documentations/documentations.ts";
import {useAppDispatch} from "../../../../../../hooks/reduxhooks.ts";
import OpenLinkPDF from "../../../../../documentationPage/OpenLink.tsx";
import useDynamicGridColumns from "../../../../../../hooks/useDynamicGridColumns.ts";
import {useSearchParams} from "react-router-dom";
import Pagination from "../../../../../common/pagination/Pagination.tsx";



const AdminDocumentationsContent: React.FC<{ data: DocumentationsData[] , pageNumber: number,
  totalPages: number}> = ({data,pageNumber,totalPages}) => {
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
     const [, setSearchParams] = useSearchParams();
    const gridColumns = useDynamicGridColumns(containerRef, 'repeat(2, 1fr)');
    const deleteDoc = async(id:number) => {
            dispatch(deleteDocumentation(id));
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
                    <h6 className={styles.adminModContent__title}>{item.name}</h6>
                    <div className={styles.adminModContent__actions}>
                        <button className={styles.adminModContent__btnLink} onClick={() => {
                            OpenLinkPDF(item.file,item.name)
                        }
                        }>Переглянути</button>
                        <RejectBtn onReject={async () => {
                            await deleteDoc(item.id);
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
    export default AdminDocumentationsContent;
