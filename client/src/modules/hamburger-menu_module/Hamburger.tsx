import React from 'react';

import styles from './hamburger-menu.module.scss';

interface Props {
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

type HamburgerProps = {
    className?: string;
}



const Hamburger: React.FC<HamburgerProps & Props> = ({className, onClick}) => {
    return (
        <div className={className} onClick={onClick}>
            <nav className={styles.navbar}>
                <div className={styles.hamMenu}>
                    <span className={styles.hamMenu__item}></span>
                    <span className={styles.hamMenu__item}></span>
                    <span className={styles.hamMenu__item}></span>
                </div>
            </nav>
        </div>

    );
};

export default Hamburger;