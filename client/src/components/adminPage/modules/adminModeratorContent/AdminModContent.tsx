import React from 'react';
import styles from "./adminModContent.module.scss";
import {

    GalleryData,
    MemesData,
    NewsData,
    ProjectsData
} from "../../types/adminTypes";

type ContentItem = GalleryData | MemesData | NewsData | ProjectsData;

interface ModeratorContentProps {
    data: ContentItem[] | null | undefined;
}

const AdminModContent: React.FC<ModeratorContentProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className={styles.adminModContact__empty}>
                No content to moderate
            </div>
        );
    }

    const renderContent = (item: ContentItem) => {
        if (!item) return null;

        switch (item.type) {
            case "gallery":
                return (
                    <div key={item.id} className={styles.adminModContact__gallery}>
                        <p>ID: {item.id}</p>
                        <p>Owner: {item.owner}</p>
                        <img src={item.image} alt="Gallery item" />
                        <div className={styles.adminModContact__actions}>

                        </div>
                    </div>
                );

            case "memes":
                return (
                    <div key={item.id} className={styles.adminModContact__memes}>
                        <p>ID: {item.id}</p>
                        <p>Owner: {item.owner}</p>
                        <img src={item.image} alt="Meme" />
                        <div className={styles.adminModContact__actions}>

                        </div>
                    </div>
                );

            case "news":
                return (
                    <div key={item.id} className={styles.adminModContact__news}>
                        <p>ID: {item.id}</p>
                        <h3>News: {item.title}</h3>
                        <p>Author: {item.author}</p>
                        <p>{item.description}</p>
                        <img src={item.image} alt="News thumbnail" />
                        <div className={styles.adminModContact__actions}>

                        </div>
                    </div>
                );

            case "projects":
                return (
                    <div key={item.id} className={styles.adminModContact__projects}>
                        <p>ID: {item.id}</p>
                        <h3>Project: {item.title}</h3>
                        <p>Tech Stack: {item.technologyStack}</p>
                        <p>Description: {item.mainText}</p>
                        <p>Wishes: {item.wishes}</p>
                        <div className={styles.adminModContact__actions}>

                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className={styles.adminModContact}>
            {data.map(item => renderContent(item))}
        </div>
    );
};

export default AdminModContent;