import { useState, useCallback, useEffect } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { ProjectsData } from "../components/adminPage/types/adminTypes.ts";
import { useAppDispatch, useAppSelector } from './reduxhooks.ts'; // Added import
import { fetchProjectsToView } from '../features/projects/projectsSlice'; // Added import for the fetch action

// Remove this line as it's not a valid type declaration
// const typeGrid = typeof Grid

interface SwiperGrid {
    updateSlides: () => void;
}

interface SwiperWithGrid extends SwiperType {
    grid?: SwiperGrid; // Made grid optional
}

interface UseProjectsSwiperReturn {
    activeProjectId: number | null;
    swiperInstance: SwiperWithGrid | null;
    loading: boolean;
    error: string | null;
    projects: ProjectsData[];
    handleProjectExpand: (projectId: number) => void;
    handleProjectCollapse: () => void;
    handleSwiperInit: (swiper: SwiperWithGrid) => void;
}

export const useProjectsSwiper = (): UseProjectsSwiperReturn => {
    const dispatch = useAppDispatch();
    const { projects, loading, error } = useAppSelector(state => state.projects);
    const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
    const [swiperInstance, setSwiperInstance] = useState<SwiperWithGrid | null>(null);

    useEffect(() => {
        dispatch(fetchProjectsToView());
    }, [dispatch]);

    const updateSwiperLayout = useCallback(() => {
        if (swiperInstance) {
            // Используем requestAnimationFrame для синхронизации с отрисовкой
            requestAnimationFrame(() => {
                swiperInstance.update();
                try {
                    swiperInstance.grid?.updateSlides();
                } catch (e) {
                    console.error('Failed to update grid:', e);
                }
            });
        }
    }, [swiperInstance]);

    const handleProjectExpand = useCallback((projectId: number) => {
        setActiveProjectId(prev => prev === projectId ? null : projectId);
        updateSwiperLayout();
    }, [updateSwiperLayout]);

    const handleProjectCollapse = useCallback(() => {
        setActiveProjectId(null);
        updateSwiperLayout();
    }, [updateSwiperLayout]);

    const handleSwiperInit = useCallback((swiper: SwiperWithGrid) => {
        setSwiperInstance(swiper);
        requestAnimationFrame(() => {
            try {
                swiper.grid?.updateSlides();
            } catch (e) {
                console.error('Failed to initialize grid:', e);
            }
        });
    }, []);

    return {
        activeProjectId,
        swiperInstance,
        loading,
        error,
        projects,
        handleProjectExpand,
        handleProjectCollapse,
        handleSwiperInit
    };
};
