import Main from "../../components/mainPage/main/Main.tsx";
import Footer from "../../components/common/footer/Footer.tsx";
import React from "react";
import Header from "../../components/common/header/Header.tsx";


const MainPage:React.FC = () => {
    return (
        <div className="app">
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
};

export default MainPage;