import styles from './footer.module.scss';
import React from "react";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            {/*!!! Оберни все в контейнер, посмотри другие компоненты.*/}
            <div className={styles.footer__logo}>
                {/* Ссылки каритнок выноси в переменные. Посмотри другие компоненты. */}
                
                <img src={"/src/assets/footer_logo.svg"} alt={"Footer Logo"}/>
            </div>
            <div className={styles.footer__information}>
                <div className={styles.footer__information_socialmedia}>
                    <h2 className={styles.footer__text}>Social Media</h2>
                    {/*!!! Делай списком, итемы пишками, без ссылок.*/}
                    <div className={styles.footer__information_socialmedia_item}>
                        <img src={"/src/assets/instagram_logo.svg"} alt={"Instagram Logo"}/>
                        <a className={styles.footer__text} href={"#"}>@duikt_info</a>
                    </div>
                    <div className={styles.footer__information_socialmedia_item}>
                        <img src={"/src/assets/telegram_logo.svg"} alt={"Telegram Logo"}/>
                        <a className={styles.footer__text} href={"#"}>@duikt_info</a>
                    </div>
                    <div className={styles.footer__information_socialmedia_item}>
                        <img src={"/src/assets/tiktok_logo.svg"} alt={"Tiktok Logo"}/>
                        <a className={styles.footer__text} href={"#"}>@duikt_info</a>
                    </div>
                </div>
                <div className={styles.footer__information_contacts}>
                    <h2 className={styles.footer__text}>Contacts</h2>
                    <div className={styles.footer__information_contacts_item}>
                        <img src={"/src/assets/sms_logo.svg"} alt={"Email Logo"}/>
                        <a className={styles.footer__text} href={"#"}>@duikt_info</a>
                    </div>
                    <div className={styles.footer__information_contacts_item}>
                        <img src={"/src/assets/phone_logo.svg"} alt={"Phone Logo"}/>
                        <a className={styles.footer__text} href={"#"}>+380-099-786-46-78</a>
                    </div>
                    <div className={styles.footer__information_contacts_item}>
                        <img src={"/src/assets/phone_logo.svg"} alt={"Phone Logo"}/>
                        <a className={styles.footer__text} href={"#"}>+380-099-786-46-78</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
