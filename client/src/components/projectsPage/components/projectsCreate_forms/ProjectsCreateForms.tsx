import React from 'react';
import styles from "./project-create-forms.module.scss"
import IdeaForm from "../../../../modules/ideaForm_module/IdeaForm.tsx";


const ProjectsCreateForms:React.FC = () => {
    return (
        <div className={styles.form}>
            <div className={styles.form__wrapper}>
                <h2 className={styles.form__title}>Поділись своєю ідеєю</h2>
                <IdeaForm/>
            </div>
        </div>
    );
};

export default ProjectsCreateForms;