import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxhooks.ts";
import AdminPageTemplate from "../../../components/adminPage/AdminPageTemplate.tsx";
import AdminModContent from "../../../components/adminPage/components/adminModeratorContent/AdminModContent.tsx";
import {fetchCollectives} from "../../../features/collectives/collectives.ts";
import styles from "../../../components/adminPage/components/adminModeratorContent/adminModContent.module.scss";
import AddDocumentations from "../../../components/adminPage/components/adminAddBtns/AddDocumentations.tsx";
import PopUpCollective from "../../../components/adminPage/components/adminPopUpMenu/PopUpCollective.tsx";

const AdminCollectivesLeadersPage = () => {
    const dispatch = useAppDispatch();
    const [setPopUp, setPopUpState] = React.useState(false);
    const { collective, loading, error } = useAppSelector(state => state.collectives);
    const filteredCollective = collective.withoutCommand;
    useEffect(() => {
        dispatch(fetchCollectives());
    }, [dispatch]);
    useEffect(() => {
        console.log('Текущее состояние CollectivesData:', filteredCollective);
    }, [collective]);
    return (
        <div >
            {error && <h1>Error: {error}</h1>}
            {loading && <h1>Loading...</h1>}
            <AdminPageTemplate type="collectives"
                               additional={
                <div className={styles.adminModContent__btns}>
                    <AddDocumentations title="Додати" onClick={() => setPopUpState(true)}/>
                </div>}
                               children={<AdminModContent contentType="collectivesLead" data={filteredCollective}/>}/>
            {setPopUp && (
                <PopUpCollective team='' visible={setPopUp} setVisible={setPopUpState} />
            )}
        </div>


    )

}

export default AdminCollectivesLeadersPage;