// styles
import styles from "./Footer.module.scss";
// react-router
import { Link } from "react-router-dom";
// icons
import phoneLogoFooter from "../../assets/img/footer_phone.svg";

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.phone}>
          <img width="25" src={phoneLogoFooter} alt="Phone logo" />
          <a href="tel:+7(777)7777">
            <h2>+ 7 (777) 77 77</h2>
          </a>
        </div>
        <div className={styles.menuList}>
          <Link to="/about/about_us">О компании</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
