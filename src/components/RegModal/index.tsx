import React, { useState } from "react";
// styles
import styles from "./RegModal.module.scss";
// redux toolkit
import { useDispatch } from "react-redux";
import { setUser } from "redux/user/slice";
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
            <div className={styles.inputBody}>
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
              />
              {!nameValid && (
                <div className={styles.tooltip}>
                  <div className={styles.tooltipMessage}>
                    <svg
                      height="52"
                      viewBox="0 0 60.031 52"
                      width="60.031"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs></defs>
                      <path
                        d="M214.413,746a4.455,4.455,0,0,1-3.84-2.166,4.249,4.249,0,0,1,0-4.334l25.572-43.331a4.483,4.483,0,0,1,7.679,0L269.4,739.5a4.249,4.249,0,0,1,0,4.334,4.452,4.452,0,0,1-3.84,2.166H214.413ZM240,706a4,4,0,0,0-4,4v16a4,4,0,0,0,8,0V710A4,4,0,0,0,240,706Zm0,36a4,4,0,1,0-4-4A4,4,0,0,0,240,742Z"
                        id="attention"
                        transform="translate(-209.969 -694)"
                      />
                    </svg>
                    Не менее 4 символов! Разрешены: латинские буквы, '_', '.',
                    или '-'
                  </div>
                </div>
              )}
            </div>
            <div className={styles.inputBody}>
              <label htmlFor="email">Логин:</label>
              <input
                type="email"
                placeholder="example@mail.ru"
                value={emailInput}
                onChange={handleEmailChange}
                id="email"
                className={emailValid ? "" : styles.invalidInput}
              />
              {!emailValid && (
                <div className={styles.tooltip}>
                  <div className={styles.tooltipMessage}>
                    <svg
                      height="52"
                      viewBox="0 0 60.031 52"
                      width="60.031"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs></defs>
                      <path
                        d="M214.413,746a4.455,4.455,0,0,1-3.84-2.166,4.249,4.249,0,0,1,0-4.334l25.572-43.331a4.483,4.483,0,0,1,7.679,0L269.4,739.5a4.249,4.249,0,0,1,0,4.334,4.452,4.452,0,0,1-3.84,2.166H214.413ZM240,706a4,4,0,0,0-4,4v16a4,4,0,0,0,8,0V710A4,4,0,0,0,240,706Zm0,36a4,4,0,1,0-4-4A4,4,0,0,0,240,742Z"
                        id="attention"
                        transform="translate(-209.969 -694)"
                      />
                    </svg>
                    Почта должна иметь следующий формат: a@b.c Допустимы только
                    латинские буквы!
                  </div>
                </div>
              )}
            </div>
            <div className={styles.inputBody}>
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                placeholder=""
                value={passwordInput}
                onChange={handlePasswordChange}
                id="password"
                className={passwordValid ? "" : styles.invalidInput}
              />
              {!passwordValid && (
                <div className={styles.tooltip}>
                  <div className={styles.tooltipMessage}>
                    <svg
                      height="52"
                      viewBox="0 0 60.031 52"
                      width="60.031"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs></defs>
                      <path
                        d="M214.413,746a4.455,4.455,0,0,1-3.84-2.166,4.249,4.249,0,0,1,0-4.334l25.572-43.331a4.483,4.483,0,0,1,7.679,0L269.4,739.5a4.249,4.249,0,0,1,0,4.334,4.452,4.452,0,0,1-3.84,2.166H214.413ZM240,706a4,4,0,0,0-4,4v16a4,4,0,0,0,8,0V710A4,4,0,0,0,240,706Zm0,36a4,4,0,1,0-4-4A4,4,0,0,0,240,742Z"
                        id="attention"
                        transform="translate(-209.969 -694)"
                      />
                    </svg>
                    Не менее 6 символов!
                  </div>
                </div>
              )}
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
