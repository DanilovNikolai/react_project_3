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
      <Link to="about">Контакты</Link>
    </div>
  );
};

export default Footer;
