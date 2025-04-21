import Header from "../../components/common/header/Header.tsx";
import Footer from "../../components/common/footer/Footer.tsx";
import VacancyIntroduce from "../../components/vacancyPage/introduce/VacancyIntroduce.tsx";
import VacanciesList from "../../components/vacancyPage/list/VacanciesList.tsx";


const Vacancies = () => {
    return (
        <div className={'app'}>
            <Header/>
            <VacancyIntroduce/>
            <VacanciesList/>
            <Footer/>
        </div>
    );
};

export default Vacancies;