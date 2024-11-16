import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxhooks.ts";
import {fetchCollectives} from "../../../features/collectives/collectives.ts";
import AdminPageTemplate from "../../../components/adminPage/AdminPageTemplate.tsx";
import styles from "../../../components/adminPage/components/adminModeratorContent/adminModContent.module.scss";
import AddDocumentations from "../../../components/adminPage/components/adminAddBtns/AddDocumentations.tsx";
import AdminModContent from "../../../components/adminPage/components/adminModeratorContent/AdminModContent.tsx";
import PopUpCollective from "../../../components/adminPage/components/adminPopUpMenu/PopUpCollective.tsx";

const AdminCollectivesDepartmentPage = () => {
    const dispatch = useAppDispatch();
    const [setPopUp, setPopUpState] = React.useState(false);
    const { collective, loading, error } = useAppSelector(state => state.collectives);
    const filteredCollective = collective.withCommand;
    useEffect(() => {
        dispatch(fetchCollectives());
    }, [dispatch]);

    useEffect(() => {
        console.log('Текущее состояние CollectivesData:', collective);
    }, [collective]);
    return (
        <div >
            {error && <h1>Error: {error}</h1>}
            {loading && <h1>Loading...</h1>}
            <AdminPageTemplate type="collectivesDepartment"
                               additional={
                                   <div className={styles.adminModContent__btns}>
                                       <AddDocumentations title="Додати" onClick={() => setPopUpState(true)}/>
                                   </div>}
                               children={<AdminModContent contentType="collectivesDepartment" data={filteredCollective}/>}/>
            {setPopUp && (
                <PopUpCollective team={true}visible={setPopUp} setVisible={setPopUpState} />
            )}
        </div>


    )

}

export default AdminCollectivesDepartmentPage;