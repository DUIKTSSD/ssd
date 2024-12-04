import {Link} from "react-router-dom";
import styles from "../navbar.module.scss"

interface NavbarItemProps {
    path: string,
    label: string,
    isActive: boolean,
    onClick: () => void
}
const NavbarItem: React.FC<NavbarItemProps> = ({ path, label, isActive, onClick }) => {
 return (
        <li
            className={`${styles.navbar__item} ${
                isActive ? styles.navbar__item__active : ""
            }`}
        >
            <Link to={path} onClick={onClick}>
                {label}
                <span className={styles.navbar__arrow}>→</span>
            </Link>
        </li>
    );
};

export default NavbarItem;