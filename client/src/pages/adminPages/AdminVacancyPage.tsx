import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxhooks.ts";
import styles from "../../components/adminPage/components/adminModeratorContent/adminModContent.module.scss";
import AdminPageTemplate from "../../components/adminPage/AdminPageTemplate.tsx";
import AddDocumentations from "../../components/adminPage/components/adminAddBtns/AddDocumentations.tsx";
import AdminModContent from "../../components/adminPage/components/adminModeratorContent/AdminModContent.tsx";
import {fetchVacanciesToView} from "../../features/vacancies/vacanciesSlice.ts";
import VacancyPopUp from "../../components/adminPage/components/adminPopUpMenu/vacancyPopUp/VacancyPopUp.tsx";

const AdminVacancyPage = () => {
   const dispatch = useAppDispatch();
    const {vacancies, loading, error} = useAppSelector(state => state.vacancies);
    const [setPopUp, setPopUpState] = React.useState(false);
    useEffect(() => {
        dispatch(fetchVacanciesToView())
    }, [dispatch]);
      useEffect(() => {
        console.log('Текущее состояние documentationData:', vacancies);
    }, [vacancies]);
    return (
        <div className={styles.adminModContent}>
            {error && <h1>Error: {error}</h1>}
            {loading && <h1>Loading...</h1>}
            <AdminPageTemplate
                additional={
                    <div className={styles.adminModContent__btns}>
                        <AddDocumentations title="Додати" onClick={() => setPopUpState(true)}/>
                    </div>}
                type="vacancies"
                children={<AdminModContent data={vacancies} contentType="vacancies"/>}/>
            {setPopUp && (
                <VacancyPopUp visible={setPopUp} setVisible={setPopUpState}/>
            )}
        </div>
    );
};

export default AdminVacancyPage;