import React, {useState} from 'react';
import styles from "./pathSelection.module.scss";
import GoToBtn from "./GoToBtn.tsx";
import ConnectionLines from "./connection_module/ConnectionLines.tsx";
import {PathPickProps} from "./types.ts";
import {useLocation} from "react-router-dom";

const PathPick: React.FC<PathPickProps> = (props) => {
    const [subtitle, setSubtitle] = useState<HTMLHeadingElement | null>(null);
    const [buttons, setButtons] = useState<HTMLDivElement | null>(null);
    const location = useLocation();
    return (
        <>
            <div className={styles.pathSelection}>
                <div className={styles.pathSelection__container}>
                    <div className={styles.pathSelection__title}>
                        <h1>
                            {props.title}
                            <p className={styles.pathSelection__title_highlight}>
                                {props.titleHighlight}
                            </p>
                        </h1>
                    </div>
                    <div className={styles.pathSelection__buttons_wrapper}>
                        <h3
                            ref={setSubtitle}
                            className={styles.pathSelection__subtitle}
                        >
                            {props.subtitle}
                        </h3>
                        <ConnectionLines
                            subtitle={subtitle}
                            buttons={buttons}
                        />
                        <div
                            ref={setButtons}
                            className={`${styles.pathSelection__buttons} ${styles.pathSelection__buttons_medium}`}
                        >
                            <GoToBtn url={props.btnUrl}
                                     label={props.btnLabel}
                                     isActive={location.pathname === props.btnUrl}/>
                            <GoToBtn url={props.btnUrl2}
                                     label={props.btnLabel2}
                                     isActive={location.pathname === props.btnUrl2}/>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`${styles.pathSelection__buttons} ${styles.pathSelection__buttons_low}`}
            >
                <GoToBtn url={props.btnUrl} label={props.btnLabel} isActive={location.pathname === props.btnUrl}/>
                <h3 className={styles.pathSelection__subtitle_mobile}>{props.subtitle} </h3>
                <GoToBtn url={props.btnUrl2} label={props.btnLabel2}  isActive={location.pathname === props.btnUrl2}/>
            </div>
        </>
    );
};

export default PathPick;