
import Header from "../../components/common/header/Header.tsx";
import Footer from "../../components/common/footer/Footer.tsx";
import AnnouncementIntroduce from "../../components/announcementPage/introduce/AnnouncementIntroduce.tsx";
import SingleAnnounce from "../../components/announcementPage/post/SingleAnnounce.tsx";
import {useLocation} from "react-router-dom";
import {AnnouncementData} from "../../components/adminPage/types/adminTypes.ts";

const AnnouncementDetails = () => {
   const location = useLocation();
    const announceData = location.state?.data as AnnouncementData;
    return (
        <div className={'app'}>
            <Header/>
            <AnnouncementIntroduce/>
            <SingleAnnounce data={announceData}/>
            <Footer/>
        </div>
    );
};

export default AnnouncementDetails;