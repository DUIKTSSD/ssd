import Header from "../../components/common/header/Header.tsx";
import Footer from "../../components/common/footer/Footer.tsx";
import VacancyIntroduce from "../../components/vacancyPage/introduce/VacancyIntroduce.tsx";
import { VacanciesData} from "../../components/adminPage/types/adminTypes.ts";
import {useLocation} from "react-router-dom";
import SingleVacancy from "../../components/vacancyPage/post/SingleVacancy.tsx";

const VacanciesDetails = () => {
     const location = useLocation();
    const vacanciesData = location.state?.data as VacanciesData;
    return (
        <div className={'app'}>
            <Header/>
            <VacancyIntroduce/>
            <SingleVacancy data={vacanciesData}/>
            <Footer/>
        </div>
    );
};

export default VacanciesDetails;