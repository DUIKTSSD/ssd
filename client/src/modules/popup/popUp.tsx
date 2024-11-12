import React, {ReactNode, useEffect} from 'react';
import styles from "./popUp.module.scss";

interface PopUpProps {
    title: string;
    children: ReactNode;
    onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ title, children, onClose }) => {

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if(event.key === 'Escape') {
                onClose()
            }
        }

        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handleEscKey)

        return () => {
            document.body.style.overflow = 'unset'
            window.removeEventListener('keydown', handleEscKey)
        }
    }, [onClose]);

    return (
        <div className={styles.popUp}>
            <div className={styles.popUp__header}>
                {title}
                <div
                    className={styles.popUp__header_exit}
                    role="button"
                    tabIndex={0}
                    onClick={onClose}
                >
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className={styles.popUp__content}>
                {children}
            </div>
        </div>
    );
};

export default PopUp;