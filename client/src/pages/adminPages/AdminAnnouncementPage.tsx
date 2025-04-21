import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxhooks.ts";
import styles from "../../components/adminPage/components/adminModeratorContent/adminModContent.module.scss";
import AdminPageTemplate from "../../components/adminPage/AdminPageTemplate.tsx";
import AddDocumentations from "../../components/adminPage/components/adminAddBtns/AddDocumentations.tsx";
import AdminModContent from "../../components/adminPage/components/adminModeratorContent/AdminModContent.tsx";
import {fetchAnnouncementToViewAll} from "../../features/announcement/announcementSlice.ts";
import AnnouncementPopUp
    from "../../components/adminPage/components/adminPopUpMenu/announcementPopup/AnnouncementPopUp.tsx";

const AdminAnnouncementPage = () => {
     const dispatch = useAppDispatch();
    const {announcement, loading, error} = useAppSelector(state => state.announcement);
    const [setPopUp, setPopUpState] = React.useState(false);
    useEffect(() => {
        dispatch(fetchAnnouncementToViewAll())
    }, [dispatch]);
      useEffect(() => {
        console.log('Текущее состояние documentationData:', announcement);
    }, [announcement]);
    return (
        <div className={styles.adminModContent}>
            {error && <h1>Error: {error}</h1>}
            {loading && <h1>Loading...</h1>}
            <AdminPageTemplate
                additional={
                    <div className={styles.adminModContent__btns}>
                        <AddDocumentations title="Додати" onClick={() => setPopUpState(true)}/>
                    </div>}
                type="announcement"
                children={<AdminModContent data={announcement} contentType="announcement"/>}/>
            {setPopUp && (
                <AnnouncementPopUp visible={setPopUp} setVisible={setPopUpState}/>
            )}
        </div>
    );
};

export default AdminAnnouncementPage;