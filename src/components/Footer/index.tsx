import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
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
        <Link to="about">Контакты</Link>
        <Link to="/react_project_3">О нас</Link>
        <Link to="/react_project_3">Вакансии</Link>
      </div>
    </div>
  );
};

export default Footer;
