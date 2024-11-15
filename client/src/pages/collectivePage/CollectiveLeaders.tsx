import React from 'react';
import CollectivePage from "./CollectivePage.tsx";
import Header from "../../components/common/header/Header.tsx";
import CollectiveIntroduce from "../../components/collectivePage/introduce/CollectiveIntroduce.tsx";
import Footer from "../../components/common/footer/Footer.tsx";

const CollectiveLeaders:React.FC = () => {
    return (
        <>
            <Header/>
            <CollectiveIntroduce/>

            <Footer/>
        </>
    );
};

export default CollectiveLeaders;