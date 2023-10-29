import React from "react";
// styles
import styles from "./LoginButton.module.scss";

interface LoginButtonProps {
  onModalToggle: () => void;
  isLoggedIn: boolean;
  isModalActive: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  onModalToggle,
  isLoggedIn,
}) => {
  return (
    <button onClick={onModalToggle} className={styles.loginButton}>
      <span>{isLoggedIn ? "Выйти" : "Войти"}</span>
    </button>
  );
};

export default LoginButton;
