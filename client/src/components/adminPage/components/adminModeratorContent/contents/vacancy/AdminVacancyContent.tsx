import React, {useRef, useState} from 'react';
import useDynamicGridColumns from "../../../../../../hooks/useDynamicGridColumns.ts";
import {VacanciesData} from "../../../../types/adminTypes.ts";
import {useAppDispatch} from "../../../../../../hooks/reduxhooks.ts";
import styles from "./adminVacancy.module.scss";
import RejectBtn from "../../../adminApproveBtns/RejectBtn.tsx";
import PopUp from "../../../../../../modules/popup/popUp.tsx";
import {deleteVacancy} from "../../../../../../features/vacancies/vacanciesSlice.ts";

const AdminVacancyContent: React.FC<{ data: VacanciesData[] }> = ({data}) => {
 const containerRef = useRef<HTMLDivElement>(null);
    const gridColumns = useDynamicGridColumns(containerRef, 'repeat(2, 1fr)');
    const [selectedVacancy, setSelectedVacancy] = useState<VacanciesData | null>(null)
     const dispatch = useAppDispatch();
     const deletevacancy = async(id:number) => {
            dispatch(deleteVacancy(id));
            console.log('Вакансія видалена:', id);
    }
    return (
        <div>
            {data.map(item => (
                <div style={{gridTemplateColumns: gridColumns, alignItems: 'left', padding: '10px'}}
                     ref={containerRef} key={item.id} className={styles.card__item}>
                    <div className={styles.card}>
                        <div className={styles.card__overlay}>
                            <div className={styles.card__content}>
                                <h1 className={styles.card__title}>{item.title}</h1>
                                <div className={styles.card__flex}>
                                    <p className={styles.card__price}>{item.salary}</p>
                                    <p className={styles.card__type}>({item.typeOfEmployment})</p>
                                </div>
                                <div className={styles.card__flex}>
                                    <p className={styles.card__company}>{item.company}</p>
                                    <p className={styles.card__location}>{item.location}</p>
                                </div>
                                <p className={styles.card__description}>{item.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card__textWrapper}>
                        <button onClick={() => {
                            setSelectedVacancy(item)
                        }} className={styles.card__viewBtn}>View
                        </button>
                        <RejectBtn onReject={async () => {
                            await deletevacancy(item.id);
                        }
                        }/>
                    </div>
                </div>
            ))}
            {selectedVacancy && (
                <PopUp title='Announcement' onClose={() => setSelectedVacancy(null)}>
                    <div className={styles.details}>
                        <div className={styles.details__container}>
                            <div className={styles.details__overlay}>
                                <h1 className={styles.details__title}>{selectedVacancy.title}</h1>
                                <p className={styles.details__price}>Зарплата: {selectedVacancy.salary} </p>
                                <p className={styles.details__type}>Тип зайнятости: {selectedVacancy.typeOfEmployment}</p>
                                <p className={styles.details__company}>Назва компанії: {selectedVacancy.company}</p>
                                <p className={styles.details__location}>Місце розташування : {selectedVacancy.location}</p>
                                <h1 className={styles.details__workdescription}>Опис вакансії</h1>
                                <p className={styles.details__description}>{selectedVacancy.description}</p>
                                <p>Подати заявку можна тут : <a href={selectedVacancy.urlJob}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={styles.details__link}>
                                    {selectedVacancy.urlJob}
                                </a></p>
                            </div>
                        </div>
                    </div>
                </PopUp>
            )}
        </div>
    );
};
export default AdminVacancyContent;