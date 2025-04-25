import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxhooks.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import styles from "./vacancies.module.scss";
import Loader from "../../../modules/loader/Loader.tsx";
import {fetchVacanciesToView} from "../../../features/vacancies/vacanciesSlice.ts";
import VacanciesCard from "../card/VacanciesCard.tsx";
import Pagination from "../../common/pagination/Pagination.tsx";

const VacanciesList: React.FC = () => {
    const dispatch = useAppDispatch();
    const {vacancies, totalPages, number, loading, error} = useAppSelector((state) => state.vacancies);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = parseInt(searchParams.get('pageNumber') || '1', 10) - 1;
    const handlePageChange = (page: number) => {
       setSearchParams({ pageNumber: (page + 1).toString() });
    };
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchVacanciesToView(pageNumber));
    }, [dispatch,pageNumber]);
    return (
        <div className={styles.swiper}>
            <div className={styles.swiper__container}>
                {error && <h1>Error: {error}</h1>}
                {loading && <Loader/>}
                {vacancies.length > 0 ? (
                    vacancies.map((item) => (
                        <div key={item.id} onClick={() => navigate(`/vacancies/view/${item.id}`,
                            {state: {data: item}})}
                        >
                            <VacanciesCard data={item}/>
                        </div>
                    ))) : (
                    <p className={styles.form__container}>Документів не знайдено</p>
                )}
        </div>
    {totalPages > 1 && (
    <Pagination
        currentPage={number}
        totalPages={totalPages}
        onPageChange={handlePageChange}
    />
)}
        </div>
    );
};

export default VacanciesList;