// icons
import pizzaLogoHeader from "../../assets/img/pizza-logo3.svg";
// react-router-dom
import { Link, useLocation } from "react-router-dom";
// components
import Search from "../Search";
// components
import CartButton from "../UI/CartButton";
import LoginButton from "../UI/LoginButton";
// styles
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link to="/react_project_3/">
          <div className={styles.logo}>
            <img width="50" src={pizzaLogoHeader} alt="Pizza_logo" />
            <div>
              <h1>Dudu Pizza</h1>
              <p>
                Всегда великолепно,
                <br />
                никогда не жирно :)
              </p>
            </div>
          </div>
        </Link>
        <div className={styles.main}>
          {pathname !== "/react_project_3/cart" &&
            pathname !== "/react_project_3/about" &&
            !pathname.includes("/react_project_3/pizza") && <Search />}
          <div className={styles.buttons}>
            <LoginButton />
            <Link to="/react_project_3/cart">
              <CartButton />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
