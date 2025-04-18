import styles from './loader.module.scss';
import React from "react";
const Loader: React.FC = () => {
  return (
      <div className={styles.wrapper}>
      <div className={styles.spinner}>
          <div className={styles.spinner1}></div>
      </div>
      </div>
  );
}
export default Loader;
