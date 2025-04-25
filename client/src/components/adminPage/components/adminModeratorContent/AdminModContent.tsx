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
    CollectivesData, DocumentationLinksData, AnnouncementData, VacanciesData
} from "../../types/adminTypes.ts";
// import AdminNewsContent from "./contents/AdminNewsContent.tsx";
// import AdminGalleryContent from "./contents/AdminGalleryContent.tsx";
import AdminMemesInspectionContent from "./contents/AdminMemesInspectionContent.tsx";
import AdminDocumentationsContent from "./contents/documentations/AdminDocumentationsContent.tsx";
import AdminMemesApproveContent from "./contents/AdminMemesApproveContent.tsx";
import AdminNewsContent from "./contents/AdminNewsContent.tsx";
import AdminCollectivesContent from "./contents/AdminCollectivesContent.tsx";
import AdminUsefulLinksContent from "./contents/documentations/AdminUsefulLinksContent.tsx";
import AdminAnnouncementContent from "./contents/AdminAnnouncementContent.tsx";
import AdminVacancyContent from "./contents/vacancy/AdminVacancyContent.tsx";


type ContentType = GalleryData | ProjectsData | NewsData | MemesData | CollectivesData |AnnouncementData|VacanciesData| DocumentationsData|DocumentationLinksData

interface ModeratorContentProps {
    data: ContentType[],
    contentType: string,
    pageNumber?: number,
    totalPages?: number
}

//! TODO убрать эту хуйню
const AdminModContent: React.FC<ModeratorContentProps> = ({data, contentType, pageNumber, totalPages}) => {
    if (!data || data.length === 0) {
        return <EmptyContent/>;
    }

    const contentMap: { [key: string]: () => JSX.Element } = {
        memesInsc: () => <AdminMemesInspectionContent data={data as MemesData[]}/>,
        memesApprove: () => <AdminMemesApproveContent data={data as MemesData[]}/>,
        documentations: () => <AdminDocumentationsContent data={data as unknown as DocumentationsData[]} pageNumber={pageNumber!} totalPages={totalPages!}/>,
        docLinks:()=><AdminUsefulLinksContent data={data as unknown as DocumentationLinksData[]} pageNumber={pageNumber!} totalPages={totalPages!}/>,
        announcement:()=><AdminAnnouncementContent data={data as unknown as AnnouncementData[]}/>,
        vacancies: () => <AdminVacancyContent data={data as VacanciesData[]} pageNumber={pageNumber!} totalPages={totalPages!} />,
        news: () => <AdminNewsContent data={data as NewsData[]}/>,
        projects: () => <AdminProjectsContent data={data as ProjectsData[]}/>,
        collectivesLead: () => <AdminCollectivesContent data={data as CollectivesData[]}/>,
        collectivesDepartment: () => <AdminCollectivesContent data={data as CollectivesData[]}/>

    };

    const ContentComponent = contentMap[contentType];

    if (!ContentComponent) {
        return <EmptyContent/>;
    }
    return (
        <div className={styles.adminModContact}>
            <ContentComponent/>
        </div>
    );
};

export default AdminModContent