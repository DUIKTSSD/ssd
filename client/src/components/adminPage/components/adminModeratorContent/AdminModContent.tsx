import AdminProjectsContent from "./contents/AdminProjectsContent.tsx";
import styles from "./adminModContent.module.scss"
import React, {JSX} from "react";
import EmptyContent from "./contents/EmptyContent.tsx";
import {GalleryData, ProjectsData, NewsData, MemesData} from "../../types/adminTypes.ts";
// import AdminNewsContent from "./contents/AdminNewsContent.tsx";
// import AdminGalleryContent from "./contents/AdminGalleryContent.tsx";
import AdminMemesContent from "./contents/AdminMemesContent.tsx";


type ContentType = GalleryData | ProjectsData | NewsData | MemesData

interface ModeratorContentProps {
    data: ContentType[],
    contentType: string
}

const AdminModContent: React.FC<ModeratorContentProps> = ({ data, contentType }) => {
    if (!data || data.length === 0) {
        return <EmptyContent/>;
    }

    const contentMap: { [key: string]: () => JSX.Element } = {
    // gallery: () => <AdminGalleryContent data={data as GalleryData[]}/>,
    memes: () => <AdminMemesContent data={data as MemesData[]}/>,
    // news: () => <AdminNewsContent data={data as NewsData[]}/>,
    projects: () => <AdminProjectsContent data={data as ProjectsData[]}/>
    };

    const ContentComponent = contentMap[contentType];

    if (!ContentComponent) {
        return <EmptyContent />;
    }
    return (
        <div className={styles.adminModContact}>
            <ContentComponent />
        </div>
    );
};

export default AdminModContent