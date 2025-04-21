import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxhooks.ts";
import {useNavigate} from "react-router-dom";
import styles from "./vacancies.module.scss";
import Loader from "../../../modules/loader/Loader.tsx";
import {fetchVacanciesToView} from "../../../features/vacancies/vacanciesSlice.ts";
import VacanciesCard from "../card/VacanciesCard.tsx";
const VacanciesList: React.FC   = () => {
     const dispatch = useAppDispatch();
  const { vacancies, loading, error } = useAppSelector((state) => state.vacancies);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchVacanciesToView());
  }, [dispatch]);
  return (
    <div className={styles.swiper}>
      <div className={styles.swiper__container}>
          {error && <h1>Error: {error}</h1>}
            {loading && <Loader/>}
                {vacancies.length > 0 ? (
                vacancies.map((item) => (
                  <div key={item.id} onClick={() => navigate(`/vacancies/view/${item.id}`,
                            { state: { data: item } })}
                  >
                      <VacanciesCard data={item}  />
                  </div>
                )) ): (
                <p className={styles.form__container}>Документів не знайдено</p>
            )}
              </div>
    </div>
  );
};

export default VacanciesList;