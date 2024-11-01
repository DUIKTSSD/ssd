import React from 'react';
import ProjectsCards from "../../../../modules/projects-create-cards_module/ProjectsCards.tsx";
import styles from "./projects-create-start.module.scss";
import {setEqualHeights} from "../../../../hooks/useEqualHeights"
import projects__create_img from "../../../../assets/projects__create-photo.svg";

const ProjectsCreateStart:React.FC = () => {

    const cardsData = [
        {id: 1, description: "Поділись своєю ідеєю та розкажи про свій винахід!"},
        {id: 2, description: "Знайди однодумців, які підтримають твою розробку, і разом змінюйте світ."},
        {id: 3, description: "Втілюй свої мрії та рухайся до успіху з тими, хто вірить у твою ідею!"}
    ]

    setEqualHeights('card')

    return (
        <div className={styles.projects__create}>
            <div className={styles.projects__create_container}>
                <h2 className={styles.projects__create_title}>Почни сьогодні</h2>
                <ProjectsCards cards={cardsData}/>
                <div className={styles.projects__create_subtitle_wrapper}>
                    <p className={styles.projects__create_subtitle}>
                        Створення власного проєкту — це можливість втілити свої найсміливіші мрії в реальність. Кожен
                        великий винахід починався з ідеї, яка здавалась неможливою.
                    </p>
                    <img className={styles.projects__create_img} src={projects__create_img} alt="img"/>
                </div>
            </div>
        </div>
    );
};

export default ProjectsCreateStart;