
import Header from "../../components/common/header/Header.tsx";

import DocumentTitle from "../../components/documentationPage/TitleDocument/DocumentTitle.tsx";
import DocumentsList from "../../components/documentationPage/listDocuments/DocumentsList.tsx";
import Footer from "../../components/common/footer/Footer.tsx";



const DocumentationPage = () => {
    return (
        <div>
            <Header/>
           <DocumentTitle/>
            <DocumentsList />
            <Footer/>
        </div>
    );
};

export default DocumentationPage;