import React from 'react';
import Header from "../../components/common/header/Header.tsx";
import IntroduceSection from "../../modules/introduce/IntroduceSection.tsx";
import CollectiveItem from "../../components/collectivePage/item/CollectiveItem.tsx";
import {useLocation} from "react-router-dom";
import Footer from "../../components/common/footer/Footer.tsx";

const CollectiveItemDetails:React.FC = () => {

    const location = useLocation();
    const data = location.state?.data;

    return (
        <div className={'app'}>
            <Header/>
            <IntroduceSection title="Колектив" subtitle="Про нашого кабанчика"/>
            <CollectiveItem data={data || {}}/>
            <Footer/>
        </div>
    );
};

export default CollectiveItemDetails;