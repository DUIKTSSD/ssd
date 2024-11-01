import React, {useEffect, useState} from "react";
import AdminPageTemplate from "../../components/adminPage/AdminPageTemplate.tsx";
import AdminModContent from "../../components/adminPage/components/adminModeratorContent/AdminModContent.tsx";
import {MemesData} from "../../components/adminPage/types/adminTypes.ts";
import api from "../../api.ts";
import styles from "../../components/adminPage/components/adminModeratorContent/adminModContent.module.scss";
const AdminMemesPage: React.FC = () => {
   const [memesData, setMemesData] = useState<MemesData[]>([])

   useEffect(() => {
      fetchData()
   }, []);

   const fetchData = async() => {
      try {
         const response = await api.get('/memes/admin/memetoinspection')

         console.log('Api response: ', response)

         if(Array.isArray(response)) {
            setMemesData(response)
         } else {
            console.error('Fuck, error', response)
         }
      } catch(err) {
         console.error('Error while getting data', err)
      }
   }

   return (
       <div className={styles.adminModContent}>
       <AdminPageTemplate type="memes"
                          children={<AdminModContent contentType="memes" data={memesData}/>}/>
       </div>

   )
}

export default AdminMemesPage;