import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxhooks.ts";
import styles from './projectsjoin.module.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import { ProjectsData } from "../../../adminPage/types/adminTypes.ts";
import ProjectCard from "./projectsJoin__card/projectCard.tsx";
import { fetchProjectsToView } from "../../../../features/projects/projectsSlice.ts";
import { Navigation, Pagination, Grid } from "swiper/modules";

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/grid';
import Popup from "./projectsJoin__card/popup.tsx";
import ProjectExtendedContent from "./projectsJoin__card/projectExtendedContent.tsx";

const ProjectsJoinSwiper: React.FC = () => {
    const dispatch = useAppDispatch();
    const { projects, loading, error } = useAppSelector(state => state.projects);
    const [projectData, setProjectsData] = useState<ProjectsData[]>(projects || []);
    const [activeSlide, setActiveSlide] = useState<number | null>(null);
    const [isActiveSwiper, setIsActiveSwiper] = useState(true)

    useEffect(() => {
        dispatch(fetchProjectsToView());
    }, [dispatch]);

    useEffect(() => {
        setProjectsData(projects);
    }, [projects]);

    const handleSlideClick = (id: number) => {
        setActiveSlide(id === activeSlide ? null : id);
    };

    const closePopup = () => {
        setActiveSlide(null)
        setIsActiveSwiper(true)
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (projectData.length === 0) {
        return <div>No projects available</div>;
    }

    return (
        <div className={styles.projects}>
                <div className={styles.projects__container}>
                    <Swiper
                        allowTouchMove={true}
                        className={styles.swiper}
                        modules={[Grid, Navigation, Pagination]}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        navigation
                        loop={false}
                        spaceBetween={30}
                        grid={{
                            rows: 3
                        }}
                        onSwiper={(swiper) => swiper.update()}
                    >
                        {projects.map((project: ProjectsData) => (
                            <SwiperSlide
                                className={styles.swiperSlide}
                                key={project.id}
                                onClick={() => handleSlideClick(project.id)}
                            >
                                <ProjectCard data={project}
                                    onExtend={() => {
                                        setIsActiveSwiper(false)
                                        setActiveSlide(project.id)
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {activeSlide && (
                        <Popup onClose={closePopup} data= {projectData.find(p => p.id === activeSlide)}/> //!TODO ПОТОМ ПОФИКСИТЬ ТИПЫ И КЛИКИ
                    )}
                </div>
        </div>
    );
};

export default ProjectsJoinSwiper;


