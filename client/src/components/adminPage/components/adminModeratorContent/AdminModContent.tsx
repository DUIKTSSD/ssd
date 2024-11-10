import AdminProjectsContent from "./contents/AdminProjectsContent.tsx";
import styles from "./adminModContent.module.scss"
import React, {JSX} from "react";
import EmptyContent from "./contents/EmptyContent.tsx";
import {GalleryData, ProjectsData, NewsData, MemesData, DocumentationsData} from "../../types/adminTypes.ts";
// import AdminNewsContent from "./contents/AdminNewsContent.tsx";
// import AdminGalleryContent from "./contents/AdminGalleryContent.tsx";
import AdminMemesContent from "./contents/AdminMemesContent.tsx";
import AdminDocumentationsPage from "../../../../pages/adminPages/AdminDocumentationsPage.tsx";
import AdminDocumentationsContent from "./contents/AdminDocumentationsContent.tsx";


type ContentType = GalleryData | ProjectsData | NewsData | MemesData| DocumentationsData

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
    documentations: () => <AdminDocumentationsContent data={data as DocumentationsData[]}/>,
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