import Header from "../../header/Header";

import styles from './introduce.module.scss';

const Introduce = () => {
    return (
        <section className={styles.introduce__section}>
            <Header/>
            <div className={styles.introduce__section_textBlock}>
                <div className={styles.introduce__section_title}>
                    <p className={styles.introduce__logo}>SSD</p>
                    <h3>Крокуй разом зі Студентським Самоврядуванням ДУІКТ</h3>
                </div>
                <div className={styles.introduce__section_subtitle}>
                    <p>
                        Студентське самоврядування Державного університету інформаційно-комунікаційних
                        технологій - активна група, що представляє інтереси студентів,
                        організовує події та ініціативи,
                        сприяючи розвитку студентської громади та взаємодії з університетською адміністрацією.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Introduce;