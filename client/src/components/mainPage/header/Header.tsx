import Navbar from "../../../modules/navbar_module/Navbar.tsx";

import styles from './header.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <Navbar/>
        </header>
    );
};

export default Header;