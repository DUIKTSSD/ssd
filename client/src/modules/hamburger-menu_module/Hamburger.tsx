import React from 'react';
import styles from './hamburger-menu.module.scss';

interface Props {
    isActive: boolean;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

type HamburgerProps = {
    className?: string;
}

const Hamburger: React.FC<HamburgerProps & Props> = ({isActive,className, onClick}) => {
    return (
        <div className={className} onClick={onClick}>
            <nav className={styles.navbar}>
                <div
                    className={`${styles.hamMenu} ${
                        isActive ? styles.hamMenu_active : ""
                    }`}
                >
                    <span className={styles.hamMenu__item}></span>
                    <span className={styles.hamMenu__item}></span>
                    <span className={styles.hamMenu__item}></span>
                </div>
            </nav>
        </div>
    );

};

export default Hamburger;
