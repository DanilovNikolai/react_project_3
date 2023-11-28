import React, { useState } from "react";
// styles
import styles from "./LoginModal.module.scss";
// redux toolkit
import { useDispatch } from "react-redux";
import { setBonus, setUser } from "../../redux/user/slice";
// firebase
import {
  OAuthCredential,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
// types
import { userSliceState } from "redux/user/types";
import { setCart } from "redux/cart/slice";

interface LoginModalProps {
  setLoginModalActive: (arg: boolean) => void;
  setRegModalActive: (arg: boolean) => void;
  username: string;
}

const LoginModal: React.FC<LoginModalProps> = ({
  setLoginModalActive,
  setRegModalActive,
}) => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleLoginForm = (e: React.FormEvent) => {
    e.preventDefault();

    const auth = getAuth();

    signInWithEmailAndPassword(auth, emailInput, passwordInput)
      .then(({ user }) => {
        setError(null);

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userData = users.find(
          (user: userSliceState) => user.email === emailInput
        );

        if (userData) {
          const currentUser: userSliceState = {
            username: userData.username,
            email: userData.email,
            token: userData.accessToken,
            id: userData.uid,
            cart: userData.cart,
            bonus: userData.bonus,
          };

          localStorage.setItem("currentUser", JSON.stringify(currentUser));

          dispatch(
            setUser({
              username: currentUser.username,
              email: user.email,
              token: (user as unknown as OAuthCredential).accessToken,
              id: user.uid,
              cart: currentUser.cart,
              bonus: currentUser.bonus,
            })
          );
          dispatch(setCart(currentUser.cart));
          dispatch(setBonus(currentUser.bonus));
        } else {
          setError("Неправильный логин или пароль. Попробуйте ещё раз.");
        }
      })
      .catch((error) => {
        setError("Неправильный логин или пароль. Попробуйте ещё раз.");
        console.error(error);
      });
  };

  const handleRegClick = () => {
    setLoginModalActive(false);
    setRegModalActive(true);
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={() => setLoginModalActive(false)}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form className={styles.registrationForm} onSubmit={handleLoginForm}>
          <h2>Уже есть аккаунт?</h2>
          <div>
            <label htmlFor="email">Логин:</label>
            <input
              type="email"
              placeholder="example@mail.ru"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              placeholder=""
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              id="password"
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit">Войти</button>
          <div className={styles.registerBlock}>
            <p>
              Или <span onClick={handleRegClick}>зарегистрируйтесь</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
