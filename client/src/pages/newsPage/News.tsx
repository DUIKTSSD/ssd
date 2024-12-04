import React from 'react';
import Header from "../../components/common/header/Header.tsx";
import NewsIntroduce from "../../components/newsPage/introduce/NewsIntroduce.tsx";
import NewsSwiper from "../../components/newsPage/swiper/newsSwiper.tsx";
import Footer from "../../components/common/footer/Footer.tsx";

const News:React.FC = () => {
    return (
        <div className={'app'}>
            <Header/>
            <NewsIntroduce/>
            <NewsSwiper/>
            <Footer/>
        </div>
    );
};

export default News;