import React from "react";
import ApproveBtn from "../../adminApproveBtns/ApproveBtn.tsx";
import RejectBtn from "../../adminApproveBtns/RejectBtn.tsx";
import {MemesData} from "../../../types/adminTypes.ts";
import styles from "../adminModContent.module.scss";

const AdminMemesContent: React.FC <{data: MemesData[]}> = ({ data}) => {
  return (
    <>
      {data.map(item => (
        <div key={item.id} className={`${styles.adminModContent__item} ${styles.adminModContent__memes}`}>
          <p className={styles.adminModContent__id}>{item.id}</p>
          <img className={styles.adminModContent__img} src={`data:image/png;base64,${item.image}`} alt="Meme"/>
          <div>
            <p className={styles.adminModContent__author}>Username: {item.author.username}</p>
            <p className={styles.adminModContent__author_emai}>Email: {item.author.email}</p>
          </div>
          <div className={styles.adminModContent__actions}>
            <ApproveBtn onApprove={() => item.isLegal = true}/>
            <RejectBtn onReject={() => item.isLegal = false}/>
          </div>
        </div>
      ))}
    </>
  );
};

export default AdminMemesContent;