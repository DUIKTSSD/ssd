import React, {useEffect} from 'react';
import AdminPageTemplate from "../../../components/adminPage/AdminPageTemplate.tsx";
import AdminModContent from "../../../components/adminPage/components/adminModeratorContent/AdminModContent.tsx";
import styles from "../../../components/adminPage/components/adminModeratorContent/adminModContent.module.scss";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxhooks.ts"
import { fetchDocumentations} from "../../../features/documentations/documentations.ts";
import AddDocumentations from "../../../components/adminPage/components/adminAddBtns/AddDocumentations.tsx";
import PopUpDoc from "../../../components/adminPage/components/adminPopUpMenu/PopUpDoc.tsx";
import {useSearchParams} from "react-router-dom";

const AdminDocumentationsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const {documentations,totalPages, number, loading, error} = useAppSelector(state => state.documentations);
    const [setPopUp, setPopUpState] = React.useState(false);
        const [searchParams] = useSearchParams();
    const pageNumber = parseInt(searchParams.get('pageNumber') || '1', 10) - 1;
    useEffect(() => {
        dispatch(fetchDocumentations(pageNumber))
    }, [dispatch,pageNumber]);


    useEffect(() => {
        console.log('Текущее состояние documentationData:', documentations);
    }, [documentations]);

    return (
        <div className={styles.adminModContent}>
            {error && <h1>Error: {error}</h1>}
            {loading && <h1>Loading...</h1>}
            <AdminPageTemplate
                additional={
                    <div className={styles.adminModContent__btns}>
                        <AddDocumentations title="Додати" onClick={() => setPopUpState(true)}/>
                    </div>}
                type="documentations"
                children={<AdminModContent data={documentations} contentType="documentations"  pageNumber={number} totalPages={totalPages}/>}/>
                {setPopUp && (
                    <PopUpDoc visible={setPopUp} setVisible={setPopUpState} />
                )}
        </div>
    );
};

export default AdminDocumentationsPage;