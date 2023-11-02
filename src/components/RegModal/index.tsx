import React, { useState } from "react";
// styles
import styles from "./RegModal.module.scss";
// redux toolkit
import { useDispatch } from "react-redux";
import { setUser } from "redux/user/slice";
// import { selectUser } from "redux/user/selectors";
// firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  OAuthCredential,
} from "firebase/auth";

interface RegModalProps {
  setRegModalActive: (arg: boolean) => void;
  isAuth: boolean;
  email: string;
}

const RegModal: React.FC<RegModalProps> = ({
  setRegModalActive,
  isAuth,
  email,
}) => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [nameValid, setNameValid] = useState<boolean>(false);
  // const [userData, setUserData] = useState(null);
  // const userInfo = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleRegButton = (e: React.FormEvent) => {
    e.preventDefault();

    const auth = getAuth();

    if (emailValid && passwordValid && nameValid) {
      createUserWithEmailAndPassword(auth, emailInput, passwordInput)
        .then(({ user }) => {
          if (user) {
            dispatch(
              setUser({
                username: nameInput,
                email: user.email,
                token: (user as unknown as OAuthCredential).accessToken,
                id: user.uid,
              })
            );
            localStorage.setItem(
              "user",
              JSON.stringify({
                username: nameInput,
                email: user.email,
                token: (user as unknown as OAuthCredential).accessToken,
                id: user.uid,
              })
            );
            // setUserData(user);
          }
        })
        .catch(console.error);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setNameInput(nameValue);
    setNameValid(
      nameValue.length >= 4 && /^[a-zA-Z_.-]+$/.test(nameValue) // Only letters, '_', '.', and '-'
    );
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmailInput(emailValue);
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPasswordInput(passwordValue);
    setPasswordValid(passwordValue.length >= 6);
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={() => setRegModalActive(false)}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {isAuth ? (
          <div className={styles.success}>
            Пользователь <span>{email}</span> успешно зарегестрирован!
          </div>
        ) : (
          <form className={styles.registrationForm} onClick={handleRegButton}>
            <h2>Регистрация</h2>
            <div>
              <label htmlFor="name">Имя:</label>
              <input
                type="text"
                value={nameInput}
                onChange={handleNameChange}
                id="name"
                className={
                  nameValid
                    ? styles.tooltipTop
                    : `${styles.tooltipTop} ${styles.invalidInput}`
                }
                title={
                  nameValid
                    ? "Valid Name"
                    : "Name must have at least 4 characters and contain only letters, '_', '.', or '-'"
                }
              />
            </div>
            <div>
              <label htmlFor="email">Логин:</label>
              <input
                type="email"
                placeholder="example@mail.ru"
                value={emailInput}
                onChange={handleEmailChange}
                id="email"
                className={emailValid ? "" : styles.invalidInput}
                title={emailValid ? "Valid Email" : "Invalid Email Format"}
              />
            </div>
            <div>
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                placeholder=""
                value={passwordInput}
                onChange={handlePasswordChange}
                id="password"
                className={passwordValid ? "" : styles.invalidInput}
                title={
                  passwordValid
                    ? "Valid Password"
                    : "Password must be at least 6 characters long"
                }
              />
            </div>
            <button disabled={!(emailValid && passwordValid && nameValid)}>
              Зарегестрироваться
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegModal;
