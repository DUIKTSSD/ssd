import React, { useEffect} from "react";
import AdminPageTemplate from "../../../components/adminPage/AdminPageTemplate.tsx";
import AdminModContent from "../../../components/adminPage/components/adminModeratorContent/AdminModContent.tsx";
import styles from "../../../components/adminPage/components/adminModeratorContent/adminModContent.module.scss";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxhooks.ts";
import {fetchMemesToInspection} from "../../../features/memes/memes.ts";

const AdminMemesInspectionPage: React.FC = () => {
   const dispatch = useAppDispatch();
   const {memes, loading, error} = useAppSelector(state => state.memes);
   useEffect(() => {
         dispatch(fetchMemesToInspection())

   }, [dispatch]);

   useEffect(() => {
      console.log('Текущее состояние MemesData:', memes);
   }, [memes]);

   return (
       <div className={styles.adminModContent}>
          {loading }
              <AdminPageTemplate
                  type="memesInspection"
                  children={<AdminModContent data={memes} contentType="memesInsc" />}
              />

       </div>
   );
};

export default AdminMemesInspectionPage;
