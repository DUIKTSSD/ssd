import React, { useEffect, useState } from 'react'; // Added useState
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxhooks.ts";
import { fetchCollectives } from "../../../features/collectives/collectives.ts";
import AdminPageTemplate from "../../../components/adminPage/AdminPageTemplate.tsx";
import styles from "../../../components/adminPage/components/adminModeratorContent/adminModContent.module.scss";
import AddDocumentations from "../../../components/adminPage/components/adminAddBtns/AddDocumentations.tsx";
import AdminModContent from "../../../components/adminPage/components/adminModeratorContent/AdminModContent.tsx";
import PopUpCollective from "../../../components/adminPage/components/adminPopUpMenu/PopUpCollective.tsx";

const AdminCollectivesDepartmentPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [popUp, setPopUp] = useState(false); // Fixed state naming and added type
    const { collective, loading, error } = useAppSelector(state => state.collectives);
    const filteredCollective = collective.withCommand || []; // Added fallback to prevent undefined

    useEffect(() => {
        dispatch(fetchCollectives());
    }, [dispatch]);

    useEffect(() => {
        console.log('Текущее состояние CollectivesData:', collective);
    }, [collective]);

    return (
        <div>
            {error && <h1>Error: {error}</h1>}
            {loading && <h1>Loading...</h1>}
            <AdminPageTemplate
                type="collectivesDepartment"
                additional={
                    <div className={styles.adminModContent__btns}>
                        <AddDocumentations title="Додати" onClick={() => setPopUp(true)}/>
                    </div>
                }
                children={<AdminModContent contentType="collectivesDepartment" data={filteredCollective}/>}
            />
            {popUp && (
                <PopUpCollective
                    visible={popUp}
                    setVisible={setPopUp}
                />
            )}
        </div>
    );
}

export default AdminCollectivesDepartmentPage;