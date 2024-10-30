import styles from './footer.module.scss'
import instagramLogoImg from "../../../assets/instagram_logo.svg"
import telegramLogoImg from "../../../assets/telegram_logo.svg"
import tiktokLogoImg from "../../../assets/tiktok_logo.svg"
import smsLogoImg from "../../../assets/sms_logo.svg"
import footerLogo from "../../../assets/footer_logo.svg";
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <div className={styles.footer__information}>
                    <div className={styles.footer__information_socialmedia}>
                        <ul>
                            <li className={styles.footer__information_item}><img src={instagramLogoImg}
                                                                                 alt={"Instagram Logo"}/>
                                <p className={styles.footer__text}>@duikt_info</p></li>
                            <li className={styles.footer__information_item}><img src={telegramLogoImg}
                                                                                 alt={"Telegram Logo"}/>
                                <p className={styles.footer__text}>@duikt_info</p></li>

                        </ul>
                    </div>
                    <ul className={styles.footer__information_anotherSocialMedia}>
                        <li className={styles.footer__information_item}><img src={tiktokLogoImg}
                                                                             alt={"Tiktok Logo"}/>
                            <p className={styles.footer__text}>@duikt_info</p></li>

                        <li className={styles.footer__information_item}><img src={smsLogoImg} alt={"SMS Logo"}/><p
                            className={styles.footer__text}>@duikt_info</p></li>
                    </ul>
                    <img className={styles.footer__logo} src={footerLogo} alt="logo"/>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
