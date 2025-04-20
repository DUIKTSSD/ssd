import styles from "../../headerTitleStyle/title.module.scss";

const AnnouncementIntroduce = () => {
    return (
        <div className={styles.documentTitle}>
            <div className={styles.documentTitle__container}>
                <div className={styles.documentTitle__title}>
                    <h1>Анонси</h1>
                </div>
                <div className={styles.documentTitle__describe}>
                    <h3>Анонси університету: усе, що буде, в одному місці!</h3>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementIntroduce;