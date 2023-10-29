import React, { useState } from "react";
// styles
import styles from "./LoginButton.module.scss";

const LoginButton: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {};
  console.log(setIsLoggedIn);

  return (
    <button onClick={handleLogin} className={styles.loginButton}>
      <span>{isLoggedIn ? "Выйти" : "Войти"}</span>
    </button>
  );
};

export default LoginButton;
