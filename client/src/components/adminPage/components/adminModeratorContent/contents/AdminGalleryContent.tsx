//! В разработке

// import {GalleryData} from "../../../types/adminTypes.ts";
// import React from "react";
// import ApproveBtn from "../../adminApproveBtns/ApproveBtn.tsx";
// import RejectBtn from "../../adminApproveBtns/RejectBtn.tsx";
// import styles from "../adminModContent.module.scss";
//
// const AdminGalleryContent: React.FC<{ data: GalleryData[] }> = (({data}) => {
//     return (
//         <>
//             {data.map(item => (
//                 <div key={item.id} className={`${styles.adminModContent} ${styles.adminModContent__gallery}`}>
//                     <p>ID: {item.id}</p>
//                     <p>Owner: {item.owner}</p>
//                     <img src={item.image} alt="Gallery item"/>
//                     <div className={styles.adminModContent__actions}>
//                         <ApproveBtn onApprove={() => item.isLegal = true}/>
//                         <RejectBtn onReject={() => item.isLegal = false}/>
//                     </div>
//                 </div>
//             ))}
//         </>
//     );
// });
//
// export default AdminGalleryContent;