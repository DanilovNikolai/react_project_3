import React, { useState } from "react";
// styles
import styles from "./LoginModal.module.scss";
// redux toolkit
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user/slice";
// firebase
import {
  OAuthCredential,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface LoginModalProps {
  setLoginModalActive: (arg: boolean) => void;
  setRegModalActive: (arg: boolean) => void;
  username: string;
}

const LoginModal: React.FC<LoginModalProps> = ({
  setLoginModalActive,
  setRegModalActive,
  username,
}) => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loginClicked, setLoginClicked] = useState(false);
  const dispatch = useDispatch();

  const handleLoginButton = (e: React.FormEvent) => {
    e.preventDefault();

    const auth = getAuth();

    signInWithEmailAndPassword(auth, emailInput, passwordInput)
      .then(({ user }) => {
        setError(null);
        dispatch(
          setUser({
            username: username,
            email: user.email,
            token: (user as unknown as OAuthCredential).accessToken,
            id: user.uid,
          })
        );
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
        <form className={styles.registrationForm} onClick={handleLoginButton}>
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
          {loginClicked && error && <div className={styles.error}>{error}</div>}
          <button onClick={() => setLoginClicked(true)}>Войти</button>
          <div className={styles.registerBlock}>
            <p>
              Или <span onClick={handleRegClick}>зарегестрируйтесь</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
