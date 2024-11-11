import React, {useEffect} from "react";
import AdminPageTemplate from "../../../components/adminPage/AdminPageTemplate.tsx";
import AdminModContent from "../../../components/adminPage/components/adminModeratorContent/AdminModContent.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxhooks.ts";
import {fetchMemesToApprove} from "../../../features/memes/memes.ts";
const AdminMemesApprovePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const {memes, loading, error} = useAppSelector(state => state.memes);

    useEffect(() => {
        dispatch(fetchMemesToApprove())
    }, [dispatch]);
    useEffect(() => {
        console.log('Текущее состояние MemesData:', memes);
    }, [memes]);


    return (
        <div >
            <AdminPageTemplate type="memesApprove"
                               children={<AdminModContent contentType="memesApprove" data={memes}/>}/>
        </div>

    )
}

export default AdminMemesApprovePage;