import React from 'react';
import FileDocumentsList from "./documentTypeSection/FileDocumentsList.tsx";
import LinkDocumentsList from "./documentTypeSection/LinkDocumentsList.tsx";


interface Props {
    section: "intro" | "useful-link" | "course-link";
}

const DocumentsList: React.FC<Props> = ({ section }) => {
    if (section === "intro") {
        return <FileDocumentsList />;
    } else {
        return <LinkDocumentsList section={section} />;
    }
};

export default DocumentsList;