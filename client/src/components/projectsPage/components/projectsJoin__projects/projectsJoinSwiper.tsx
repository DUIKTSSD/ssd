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

const ProjectsJoinSwiper: React.FC = () => {
    const dispatch = useAppDispatch();
    const { projects, loading, error } = useAppSelector(state => state.projects);
    const [projectData, setProjectsData] = useState<ProjectsData[]>(projects || []);

    useEffect(() => {
        dispatch(fetchProjectsToView());
    }, [dispatch]);

    useEffect(() => {
        if (projects.length > 0) {
            setProjectsData(projects);
        }
    }, [projects]);


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
                    className={styles.swiper}
                    modules={[Grid, Navigation, Pagination]}
                    slidesPerView={1}
                    pagination
                    navigation
                    loop={true}
                    spaceBetween={30}
                    grid={{
                        rows: 3,
                    }}
                    >
                    {projectData.map((project: ProjectsData) => (
                        <SwiperSlide className={styles.swiperSlide} key={project.id}>
                            <ProjectCard data={project} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProjectsJoinSwiper;
