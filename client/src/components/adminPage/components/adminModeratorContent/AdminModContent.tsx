import AdminProjectsContent from "./contents/AdminProjectsContent.tsx";
import React, {JSX} from "react";
import EmptyContent from "./contents/EmptyContent.tsx";
import {GalleryData, ProjectsData, NewsData, MemesData} from "../../types/adminTypes.ts";
// import AdminNewsContent from "./contents/AdminNewsContent.tsx";
// import AdminGalleryContent from "./contents/AdminGalleryContent.tsx";
import AdminMemesContent from "./contents/AdminMemesContent.tsx";
import AdminNewsContent from "./contents/AdminNewsContent.tsx";


type ContentType = GalleryData | ProjectsData | NewsData | MemesData

interface ModeratorContentProps {
    data: ContentType[],
    contentType: string
}
//! TODO Потом переписать нахуй ( этот компонент не нужен )
const AdminModContent: React.FC<ModeratorContentProps> = ({ data, contentType }) => {
    if (!data || data.length === 0) {
        return <EmptyContent/>;
    }

    const contentMap: { [key: string]: () => JSX.Element } = {
    // gallery: () => <AdminGalleryContent data={data as GalleryData[]}/>,
    memes: () => <AdminMemesContent data={data as MemesData[]}/>,
    news: () => <AdminNewsContent data={data as NewsData[]}/>,
    projects: () => <AdminProjectsContent data={data as ProjectsData[]}/>
    };

    const ContentComponent = contentMap[contentType];

    if (!ContentComponent) {
        return <EmptyContent />;
    }
    return (
        <>
            <ContentComponent />
        </>

    );
};

export default AdminModContent