import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxhooks.ts";
import styles from './projectsjoin.module.scss';
import { ProjectsData } from "../../../adminPage/types/adminTypes.ts";
import ProjectCard from "./projectsJoin__card/projectCard.tsx";
import { fetchProjectsToView } from "../../../../features/projects/projectsSlice.ts";

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/grid';
import Popup from "./projectsJoin__card/ProjectPopup.tsx";
import {useSearchParams} from "react-router-dom";
import Pagination from "../../../common/pagination/Pagination.tsx";

const ProjectsJoinSwiper: React.FC = () => {
    const dispatch = useAppDispatch();
    const { projects,totalPages, number, loading, error } = useAppSelector(state => state.projects);
     const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = parseInt(searchParams.get('pageNumber') || '1', 10) - 1;
    const [projectData, setProjectsData] = useState<ProjectsData[]>(projects || []);
    const [activeSlide, setActiveSlide] = useState<number | null>(null);
      const handlePageChange = (page: number) => {
       setSearchParams({ pageNumber: (page + 1).toString() });
    };
    useEffect(() => {
        dispatch(fetchProjectsToView(pageNumber));
    }, [dispatch,pageNumber]);

    useEffect(() => {
        setProjectsData(projects);
    }, [projects]);

    const handleSlideClick = (id: number) => {
        setActiveSlide(id === activeSlide ? null : id);
    };

    const closePopup = () => {
        setActiveSlide(null)
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
                        {projects.map((project: ProjectsData) => (
                            <div
                                className={styles.swiperSlide}
                                key={project.id}
                                onClick={() => handleSlideClick(project.id)}
                            >
                                <ProjectCard data={project}
                                    onExtend={() => {
                                        setActiveSlide(project.id)
                                    }}
                                />
                            </div>
                        ))}
                    {activeSlide && (
                          <Popup
                            onClose={closePopup}
                            data={projectData.find(p => p.id === activeSlide) ?? null} // Use null or a default value if undefined
                        />
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

export default ProjectsJoinSwiper;


