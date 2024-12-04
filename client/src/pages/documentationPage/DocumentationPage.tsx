import Header from "../../components/common/header/Header.tsx";

import DocumentTitle from "../../components/documentationPage/TitleDocument/DocumentTitle.tsx";
import DocumentsList from "../../components/documentationPage/listDocuments/DocumentsList.tsx";
import Footer from "../../components/common/footer/Footer.tsx";
import {DocumentationsData} from "../../components/adminPage/types/adminTypes.ts";

interface DocumentationPageProps {
    data: DocumentationsData[]
}

const DocumentationPage = ({data}: DocumentationPageProps) => {
    return (
        <div>
            <Header/>
           <DocumentTitle/>
            <DocumentsList data={data}/>
            <Footer/>
        </div>
    );
};

export default DocumentationPage;