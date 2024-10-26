import React, { useState } from 'react';
import styles from "./pathSelection.module.scss";
import GoToBtn from "./GoToBtn";
import ConnectionLines from "./connection_module/ConnectionLines.tsx";

const PathSelection: React.FC = () => {
    const [subtitle, setSubtitle] = useState<HTMLHeadingElement | null>(null);
    const [buttons, setButtons] = useState<HTMLDivElement | null>(null);

    return (
        <>
            <div className={styles.pathSelection}>
                <div className={styles.pathSelection__container}>
                    <div className={styles.pathSelection__title}>
                        <h1>
                            Твоя ідея може стати наступним проривом!
                            <p className={styles.pathSelection__title_highlight}>
                                Настав час діяти!
                            </p>
                        </h1>
                    </div>
                    <div className={styles.pathSelection__buttons_wrapper}>
                        <h3
                            ref={setSubtitle}
                            className={styles.pathSelection__subtitle}
                        >
                            ВИБЕРИ СВІЙ ШЛЯХ
                        </h3>
                        <ConnectionLines
                            subtitle={subtitle}
                            buttons={buttons}
                        />
                        <div
                            ref={setButtons}
                            className={`${styles.pathSelection__buttons} ${styles.pathSelection__buttons_medium}`}
                        >
                            <GoToBtn url="/projectsCreation" label="Створити проєкт"/>
                            <GoToBtn url="/projectsJoin" label="Вступити в проєкт"/>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`${styles.pathSelection__buttons} ${styles.pathSelection__buttons_low}`}
            >
                <GoToBtn url="/projectsCreation" label="Створити проєкт"/>
                <h3 className={styles.pathSelection__subtitle_mobile}>ВИБЕРИ СВІЙ ШЛЯХ</h3>
                <GoToBtn url="/projectsJoin" label="Вступити в проєкт"/>
            </div>
        </>
    );
}

export default PathSelection;