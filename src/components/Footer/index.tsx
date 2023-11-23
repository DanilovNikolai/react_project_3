// styles
import styles from "./Footer.module.scss";
// react-router
import { Link } from "react-router-dom";
// icons
import pizzaLogoFooter from "../../assets/img/pizza-logo3.svg";

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img width="25" src={pizzaLogoFooter} alt="Pizza logo" />
          <h1>Dudu Pizza</h1>
        </div>
      </div>
      <div className={styles.menuList}>
        <Link to="/about">Контакты</Link>
        <Link to="/">О нас</Link>
        <Link to="/">Вакансии</Link>
      </div>
    </div>
  );
};

export default Footer;
