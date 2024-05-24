import styles from './footer.module.scss'
import React from "react"
import footerLogoImg from "../../assets/footer_logo.svg"
import instagramLogoImg from "../../assets/instagram_logo.svg"
import telegramLogoImg from "../../assets/telegram_logo.svg"
import tiktokLogoImg from "../../assets/tiktok_logo.svg"
import smsLogoImg from "../../assets/sms_logo.svg"
import phoneLogoImg from "../../assets/phone_logo.svg"
const Footer = () => {
    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.footer__logo}>
                    <img src={footerLogoImg} alt={"Footer Logo"}/>
                </div>
                <div className={styles.footer__information}>
                    <div className={styles.footer__information_socialmedia}>
                        <h2 className={styles.footer__text}>Social Media</h2>
                        <ul>
                            <li className={styles.footer__information_item}><img src={instagramLogoImg} alt={"Instagram Logo"}/><p className={styles.footer__text}>@duikt_info</p></li>
                            <li className={styles.footer__information_item}><img src={telegramLogoImg} alt={"Telegram Logo"}/><p className={styles.footer__text}>@duikt_info</p></li>
                            <li className={styles.footer__information_item}><img src={tiktokLogoImg} alt={"Tiktok Logo"}/><p className={styles.footer__text}>@duikt_info</p></li>
                        </ul>
                    </div>
                    <div className={styles.footer__information_socialmedia}>
                        <h2 className={styles.footer__text}>Contacts</h2>
                        <ul>
                            <li className={styles.footer__information_item}><img src={smsLogoImg} alt={"SMS Logo"}/><p className={styles.footer__text}>@duikt_info</p></li>
                            <li className={styles.footer__information_item}><img src={phoneLogoImg} alt={"Phone Logo"}/><p className={styles.footer__text}>+380-099-786-46-78</p></li>
                            <li className={styles.footer__information_item}><img src={phoneLogoImg} alt={"Phone Logo"}/><p className={styles.footer__text}>+380-099-786-46-78</p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
