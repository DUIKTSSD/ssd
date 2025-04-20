import {useAppDispatch, useAppSelector} from "../../../hooks/reduxhooks.ts";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styles from "../../announcementPage/list/announce.module.scss";
import {fetchAnnouncementToViewAll} from "../../../features/announcement/announcementSlice.ts";
import AnnouncementCard from "../card/AnnouncementCard.tsx";
import Loader from "../../../modules/loader/Loader.tsx";

const AnnouncementList: React.FC  = () => {
   const dispatch = useAppDispatch();
  const { announcement, loading, error } = useAppSelector((state) => state.announcement);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAnnouncementToViewAll());
  }, [dispatch]);
  return (
    <div className={styles.swiper}>
      <div className={styles.swiper__container}>
          {error && <h1>Error: {error}</h1>}
            {loading && <Loader/>}
                {announcement.length > 0 ? (
                announcement.map((item) => (
                  <div key={item.id} onClick={() => navigate(`/announcement/view/${item.id}`,
                            { state: { data: item } })}
                  >
                      <AnnouncementCard data={item}  />
                  </div>
                )) ): (
                <p className={styles.form__container}>Документів не знайдено</p>
            )}
              </div>
    </div>
  );
};

export default AnnouncementList;