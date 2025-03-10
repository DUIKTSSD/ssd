import styles from '../../headerTitleStyle/title.module.scss';
import React from "react";

const DocumentTitle:React.FC  = () => {
    return (
        <div className={styles.documentTitle}>
            <div className={styles.documentTitle__container}>
                <div className={styles.documentTitle__title}>
                    <h1>Документація</h1>
                </div>
                <div className={styles.documentTitle__describe}>
                    <h3>Документація університету: усе, що потрібно, в одному місці!</h3>
                </div>
            </div>
        </div>
    );
}

export default DocumentTitle;