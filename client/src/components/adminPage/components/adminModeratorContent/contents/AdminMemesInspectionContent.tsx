import React, {useState} from "react";
import ApproveBtn from "../../adminApproveBtns/ApproveBtn.tsx";
import RejectBtn from "../../adminApproveBtns/RejectBtn.tsx";
import { MemesData} from "../../../types/adminTypes.ts";
import styles from "./memeContent.module.scss";
import {useAppDispatch, } from "../../../../../hooks/reduxhooks.ts";
import {approveMeme, fetchMemesToInspection, rejectMeme} from "../../../../../features/memes/memes.ts";


const AdminMemesInspectionContent: React.FC <{data: MemesData[]}> = ({ data }) => {
  const dispatch = useAppDispatch();
  const rejectingMeme = async (id: number) => {
    try {
      await dispatch(rejectMeme(id));
      console.log('Документация удалена:', id);
      dispatch(fetchMemesToInspection());
    } catch(err) {
      console.error('Failed to approve', err)
    }
  }
  const approvingMeme = async (id: number) => {
    try {
      await dispatch(approveMeme(id));
      console.log('Документация одобрено:', id);
      dispatch(fetchMemesToInspection());
    } catch(err) {
      console.error('Failed to approve', err)
    }
  }
  console.log(location)
  return (
            data.map(item => (
                <div key={item.id} className={`${styles.adminModContent__item} ${styles.adminModContent__memes}`}>
                  <p className={styles.adminModContent__id}>ID: {item.id}</p>
                  <img className={styles.adminModContent__img} src={`data:image/png;base64,${item.image}`} alt="Meme" />
                  <div>
                    <p className={styles.adminModContent__author}>Username: {item.author.username}</p>
                    <p className={styles.adminModContent__author_email}>Email: {item.author.email}</p>
                  </div>
                  <div className={styles.adminModContent__actions}>
                    <ApproveBtn onApprove={() => approvingMeme(item.id)} />
                    <RejectBtn onReject={() => rejectingMeme(item.id)} />
                  </div>
                </div>
            ))
  );
};

export default AdminMemesInspectionContent;