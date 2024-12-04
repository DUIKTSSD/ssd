import AdminProjectsContent from "./contents/AdminProjectsContent.tsx";
import styles from "./adminModContent.module.scss"
import React, {JSX} from "react";
import EmptyContent from "./contents/EmptyContent.tsx";
import {
    GalleryData,
    ProjectsData,
    NewsData,
    MemesData,
    DocumentationsData,
    CollectivesData
} from "../../types/adminTypes.ts";
// import AdminNewsContent from "./contents/AdminNewsContent.tsx";
// import AdminGalleryContent from "./contents/AdminGalleryContent.tsx";
import AdminMemesInspectionContent from "./contents/AdminMemesInspectionContent.tsx";
import AdminDocumentationsContent from "./contents/AdminDocumentationsContent.tsx";
import AdminMemesApproveContent from "./contents/AdminMemesApproveContent.tsx";
import AdminNewsContent from "./contents/AdminNewsContent.tsx";
import AdminCollectivesContent from "./contents/AdminCollectivesContent.tsx";


type ContentType = GalleryData | ProjectsData | NewsData | MemesData|CollectivesData | DocumentationsData

interface ModeratorContentProps {
    data: ContentType[],
    contentType: string
}
//! TODO убрать эту хуйню
const AdminModContent: React.FC<ModeratorContentProps> = ({ data, contentType }) => {
    if (!data || data.length === 0) {
        return <EmptyContent/>;
    }

    const contentMap: { [key: string]: () => JSX.Element } = {
        // gallery: () => <AdminGalleryContent data={data as GalleryData[]}/>,

        memesInsc: () => <AdminMemesInspectionContent data={data as MemesData[]}/>,
        memesApprove: () => <AdminMemesApproveContent data={data as MemesData[]}/>,
        documentations: () => <AdminDocumentationsContent data={data as unknown as DocumentationsData[]}/>,
        news: () => <AdminNewsContent data={data as NewsData[]}/>,
        projects: () => <AdminProjectsContent data={data as ProjectsData[]}/>,
        collectivesLead:()=><AdminCollectivesContent data={data as CollectivesData[]}/>,
        collectivesDepartment: () => <AdminCollectivesContent data={data as CollectivesData[]}/>

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