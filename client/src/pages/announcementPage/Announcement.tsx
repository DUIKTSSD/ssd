import Header from "../../components/common/header/Header.tsx";
import Footer from "../../components/common/footer/Footer.tsx";
import AnnouncementIntroduce from "../../components/announcementPage/introduce/AnnouncementIntroduce.tsx";
import AnnouncementList from "../../components/announcementPage/list/AnnouncementList.tsx";

const Announcement = () => {
    return (
        <div className={'app'}>
            <Header/>
            <AnnouncementIntroduce/>
            <AnnouncementList/>
            <Footer/>
        </div>
    );
};

export default Announcement;