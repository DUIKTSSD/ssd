import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxhooks.ts";
import styles from '../../components/adminPage/components/adminModeratorContent/adminModContent.module.scss'
import AdminPageTemplate from "../../components/adminPage/AdminPageTemplate.tsx";
import {fetchNewsToView} from "../../features/news/newsSlice.ts";
import AdminModContent from "../../components/adminPage/components/adminModeratorContent/AdminModContent.tsx";
import LoadBtn from "../../components/adminPage/modules/LoadBtn.tsx";
import NewsPopup from "../../components/adminPage/modules/newsPopup/NewsPopup.tsx";

const AdminNewsPage:React.FC = () => {
    const dispatch = useAppDispatch();
    const {news, loading, error} = useAppSelector(state => state.news)
    const [setPopUp, setPopUpState] = React.useState(false);

    useEffect(() => {
        dispatch(fetchNewsToView())
    }, [dispatch])

    useEffect(() => {
        console.log('Текущее состояние newsData:', news);
    }, [news]);


    return (
        <div className={styles.adminModContent}>
            {error && <h1>Error...</h1>}
            {loading && <h1>Loading...</h1>} {/*! TODO потом убрать нахуй этот adminModContent */}
            <AdminPageTemplate
                additional={
                <div className={styles.adminModContent__btns}>
                    <LoadBtn onClick={() => setPopUpState(true)}/>
                </div>}
                type="news"
                children={<AdminModContent contentType="news" data={news}/>}/>
            {setPopUp && (
                <NewsPopup onClose={() => setPopUpState(false)}/>
            )}
        </div>
    );
};

export default AdminNewsPage;