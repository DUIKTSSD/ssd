import React from 'react';
import NewsIntroduce from "../../components/newsPage/introduce/NewsIntroduce.tsx";
import Header from "../../components/common/header/Header.tsx";
import {useLocation} from "react-router-dom";
import {NewsData} from "../../components/adminPage/types/adminTypes.ts";
import SinglePost from "../../components/newsPage/post/SinglePost.tsx";
import Footer from "../../components/common/footer/Footer.tsx";

const NewsDetails:React.FC = () => {
    const location = useLocation();
    const newsData = location.state?.data as NewsData;
    return (
        <div className={'app'}>
            <Header/>
            <NewsIntroduce/>
            <SinglePost data={newsData}/>
            <Footer/>
        </div>
    );
};

export default NewsDetails;