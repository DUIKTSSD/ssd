import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxhooks.ts";
import AdminPageTemplate from "../../../components/adminPage/AdminPageTemplate.tsx";
import AdminModContent from "../../../components/adminPage/components/adminModeratorContent/AdminModContent.tsx";
import {fetchCollectives} from "../../../features/collectives/collectives.ts";

const AdminCollectivesLeadersPage = () => {
    const dispatch = useAppDispatch();
    const { collective, loading, error } = useAppSelector(state => state.collectives);
    useEffect(() => {
        dispatch(fetchCollectives());
    }, [dispatch]);

    useEffect(() => {
        console.log('Текущее состояние CollectivesData:', collective);
    }, [collective]);
    return (
        <div >
            <AdminPageTemplate type="collectivesLead"
                               children={<AdminModContent contentType="collectivesLead" data={collective}/>}/>
        </div>

    )
}

export default AdminCollectivesLeadersPage;