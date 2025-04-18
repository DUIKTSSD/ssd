
import Header from "../../components/common/header/Header.tsx";

import DocumentTitle from "../../components/documentationPage/TitleDocument/DocumentTitle.tsx";
import DocumentsList from "../../components/documentationPage/listDocuments/DocumentsList.tsx";
import Footer from "../../components/common/footer/Footer.tsx";
import {useNavigate} from "react-router-dom";
import DocNavButtons from "../../components/documentationPage/docNavButtons/DocNavButtons.tsx";
import {useValidatedSection} from "../../hooks/useValidatedDocumentSection.ts";



const DocumentationPage = () => {
    const section = useValidatedSection();
  const navigate = useNavigate();

  const handleChange = (newSection:string) => {
    navigate(`/documentations/${newSection}`);
  };
    return (
        <div>
            <Header/>
            <DocumentTitle/>
            <DocNavButtons current={section} onChange={handleChange}/>

            <DocumentsList section={section} />
            <Footer/>
        </div>
    );
};

export default DocumentationPage;