import React from 'react';
import Header from "../../components/common/header/Header.tsx";

import Footer from "../../components/common/footer/Footer.tsx";
import TeamTitle from "../../components/teamPage/TeamTitle.tsx";
import TeamList from "../../components/teamPage/TeamList.tsx";

const TeamPage = () => {
    return (
        <div>
            <Header/>
            <TeamTitle/>
            <TeamList/>
            <Footer/>
        </div>
    );
};

export default TeamPage;