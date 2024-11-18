import React, {useEffect} from 'react';
import Header from "../../components/common/header/Header.tsx";
import CollectiveIntroduce from "../../components/collectivePage/introduce/CollectiveIntroduce.tsx";
import Footer from "../../components/common/footer/Footer.tsx";
import CSwiper from "../../components/collectivePage/swiper/CSwiper.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxhooks.ts";
import {fetchCollectives} from "../../features/collectives/collectives.ts";
import styles from './styles.module.scss';

const CollectiveLeaders:React.FC = () => {
    const {collective} = useAppSelector(state => state.collectives);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCollectives())
    }, [dispatch]);



    return (
        <div className={styles.team}>
             <Header/>
            <CollectiveIntroduce/>
            <CSwiper data={collective.withoutCommand}/>
            <Footer/>
        </div>
    );
};

export default CollectiveLeaders;