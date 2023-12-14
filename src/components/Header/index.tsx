import { useState } from "react";
// icons
import pizzaLogoHeader from "../../assets/img/pizza-logo.svg";
// react-router-dom
import { Link, useLocation } from "react-router-dom";
// components
import LoginModal from "../LoginModal";
import RegModal from "../RegModal";
import Search from "../Search";
import CartButton from "../UI/CartButton";
import LoginButton from "../UI/LoginButton";
import AccountMenu from "components/AccountMenu";
// styles
import styles from "./Header.module.scss";
import { useAuth } from "hooks/useAuth";

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { isAuth, username, email } = useAuth();
  const [isLoginModalActive, setLoginModalActive] = useState<boolean>(false);
  const [isRegModalActive, setRegModalActive] = useState<boolean>(false);

  return (
    <div className={styles.header}>
      {isAuth ? <AccountMenu username={username} /> : ""}
      <div
        className={
          !isAuth ? styles.container : `${styles.container} ${styles.topOffset}`
        }
      >
        <Link to="/">
          <div
            className={styles.logo}
            onClick={() => localStorage.removeItem("didMount")}
          >
            <img width="50" src={pizzaLogoHeader} alt="Pizza_logo" />
            <div>
              <h1>
                Подкре<span>Pizza</span>
              </h1>
              <p>
                Всегда великолепно,
                <br />
                никогда не жирно :)
              </p>
            </div>
          </div>
        </Link>
        <div className={styles.main}>
          {pathname === "/" && <Search />}
          <div className={styles.buttons}>
            {!isAuth && (
              <LoginButton
                setLoginModalActive={setLoginModalActive}
                isAuth={isAuth}
                username={username}
              />
            )}
            {!isAuth && (
              <Link to="/cart">
                <CartButton />
              </Link>
            )}
          </div>
        </div>
      </div>
      {isLoginModalActive && !isAuth ? (
        <LoginModal
          setLoginModalActive={setLoginModalActive}
          setRegModalActive={setRegModalActive}
          username={username}
        />
      ) : null}
      {isRegModalActive ? (
        <RegModal
          setRegModalActive={setRegModalActive}
          isAuth={isAuth}
          email={email}
        />
      ) : null}
    </div>
  );
};

export default Header;
