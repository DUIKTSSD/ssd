import React, {useEffect} from 'react';
import Header from "../../components/common/header/Header.tsx";
import CollectiveIntroduce from "../../components/collectivePage/introduce/CollectiveIntroduce.tsx";
import CSwiper from "../../components/collectivePage/swiper/CSwiper.tsx";
import Footer from "../../components/common/footer/Footer.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxhooks.ts";
import {fetchCollectives} from "../../features/collectives/collectives.ts";


const CollectiveDep:React.FC = () => {
    const {collective} = useAppSelector(state => state.collectives);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCollectives())
    }, [dispatch]);

    return (
        <>
            <Header/>
            <CollectiveIntroduce/>
            <CSwiper data={collective.withCommand}/>
            <Footer/>
        </>
    );
};

export default CollectiveDep;