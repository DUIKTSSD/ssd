import React, {useEffect} from 'react';
import AdminPageTemplate from "../../../components/adminPage/AdminPageTemplate.tsx";
import AdminModContent from "../../../components/adminPage/components/adminModeratorContent/AdminModContent.tsx";
import styles from "../../../components/adminPage/components/adminModeratorContent/adminModContent.module.scss";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxhooks"
import AddDocumentations from "../../../components/adminPage/components/adminAddBtns/AddDocumentations.tsx";
import {fetchUsefulLinks} from "../../../features/documentations/documentationLinks.ts";
import PopUpDocLinks from "../../../components/adminPage/components/adminPopUpMenu/PopUpDocLinks.tsx";

const AdminUsefulLinksPage: React.FC = () => {
    const dispatch = useAppDispatch();
      const { documentationsLinks, loading, error } = useAppSelector(state => state.documentationLinks);
    const [setPopUp, setPopUpState] = React.useState(false);
    useEffect(() => {
        dispatch(fetchUsefulLinks())
    }, [dispatch]);


    useEffect(() => {
        console.log('Текущее состояние documentationData:', documentationsLinks);
    }, [documentationsLinks]);

    return (
        <div className={styles.adminModContent}>
            {error && <h1>Error: {error}</h1>}
            {loading && <h1>Loading...</h1>}
            <AdminPageTemplate
                additional={
                    <div className={styles.adminModContent__btns}>
                        <AddDocumentations title="Додати" onClick={() => setPopUpState(true)}/>
                    </div>}
                type="usefulLinks"
                children={<AdminModContent data={documentationsLinks} contentType="docLinks" />}/>
                {setPopUp && (
                    <PopUpDocLinks visible={setPopUp} setVisible={setPopUpState} section={"useful"} />
                )}
        </div>
    );
};

export default AdminUsefulLinksPage;