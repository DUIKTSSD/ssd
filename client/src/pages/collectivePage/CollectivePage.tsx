import React from 'react';
import CollectiveIntroduce from "../../components/collectivePage/introduce/CollectiveIntroduce.tsx";
import Header from "../../components/common/header/Header.tsx";
import Footer from "../../components/common/footer/Footer.tsx";

const CollectivePage: React.FC = () => {
    return (
        <>
            <Header/>
            <CollectiveIntroduce/>
            <Footer/>
        </>
    );
};

export default CollectivePage;