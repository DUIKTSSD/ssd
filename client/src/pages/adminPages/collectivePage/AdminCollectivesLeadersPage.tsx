import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxhooks.ts";
import AdminPageTemplate from "../../../components/adminPage/AdminPageTemplate.tsx";
import AdminModContent from "../../../components/adminPage/components/adminModeratorContent/AdminModContent.tsx";
import {fetchCollectives} from "../../../features/collectives/collectives.ts";
import styles from "../../../components/adminPage/components/adminModeratorContent/adminModContent.module.scss";
import AddDocumentations from "../../../components/adminPage/components/adminAddBtns/AddDocumentations.tsx";
import PopUpCollective from "../../../components/adminPage/components/adminPopUpMenu/PopUpCollective.tsx";

const AdminCollectivesLeadersPage = () => {
    const dispatch = useAppDispatch();
    const [popUp, setPopUp] = useState(false); // Fixed state naming and added type
    const {collective, loading, error} = useAppSelector(state => state.collectives);
    const filteredCollective = collective.withoutCommand;
    useEffect(() => {
        dispatch(fetchCollectives());
    }, [dispatch]);
    useEffect(() => {
        console.log('Текущее состояние CollectivesData:', filteredCollective);
    }, [filteredCollective]);
    return (
        <div>
            {error && <h1>Error: {error}</h1>}
            {loading && <h1>Loading...</h1>}
            <AdminPageTemplate type="collectivesLead"
                               additional={
                                   <div className={styles.adminModContent__btns}>
                                       <AddDocumentations title="Додати" onClick={() => setPopUp(true)}/>
                                   </div>}
                               children={<AdminModContent contentType="collectivesLead" data={filteredCollective}/>}/>
            {popUp && (
                <PopUpCollective team={false} visible={popUp} setVisible={setPopUp}/>
            )}
        </div>


    )

}

export default AdminCollectivesLeadersPage;