import React from "react";
import ApproveBtn from "../../adminApproveBtns/ApproveBtn.tsx";
import RejectBtn from "../../adminApproveBtns/RejectBtn.tsx";
import styles from "../adminModContent.module.scss";
import {NewsData} from "../../../types/adminTypes.ts";

const AdminNewsContent: React.FC<{ data: NewsData[] }> = ({ data }) => {
  return (
    <>
      {data.map(item => (
        <div key={item.id} className={`${styles.adminModContent} ${styles.adminModContent__news}`}>
          <p>ID: {item.id}</p>
          <h3>News: {item.title}</h3>
          <p>Author: {item.author}</p>
          <p>{item.description}</p>
          <img src={item.image} alt="News thumbnail"/>
          <div className={styles.adminModContent__actions}>
            <ApproveBtn onApprove={() => item.isLegal = true}/>
            <RejectBtn onReject={() => item.isLegal = false}/>
          </div>
        </div>
      ))}
    </>
  );
};

export default AdminNewsContent;