import React, { useState } from "react";
// styles
import styles from "./RegModal.module.scss";
// redux toolkit
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "redux/user/slice";
import { selectCart } from "redux/cart/selectors";
import { clearItems } from "redux/cart/slice";
// firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  OAuthCredential,
} from "firebase/auth";
// types
import { userSliceState } from "redux/user/types";

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
  const [emailError, setEmailError] = useState<string>("");
  const [isMessageVisible, setMessageVisible] = useState(false);
  const { items } = useSelector(selectCart);

  const dispatch = useDispatch();

  const handleUserCreate = (cart) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, emailInput, passwordInput)
      .then(async ({ user }) => {
        if (user) {
          const userData: userSliceState = {
            username: nameInput,
            email: user.email,
            token: (user as unknown as OAuthCredential).accessToken,
            id: user.uid,
            cart: cart,
          };

          const users = JSON.parse(localStorage.getItem("users") || "[]");
          users.push(userData);
          localStorage.setItem("users", JSON.stringify(users));
          localStorage.setItem("currentUser", JSON.stringify(userData));

          dispatch(setUser(userData));
        }
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setEmailError("Этот email уже используется!");
        } else {
          console.error(error.message);
        }
      });
  };

  const handleRegForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (emailValid && passwordValid && nameValid) {
      if (items.length === 0) {
        handleUserCreate(JSON.parse(localStorage.getItem("cart")));
      } else {
        setMessageVisible(true);
      }
    }
  };

  const handleNoTransferButton = () => {
    handleUserCreate([]);
    dispatch(clearItems());
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setNameInput(nameValue);
    setNameValid(nameValue.length >= 4 && /^[a-zA-Z_.-]+$/.test(nameValue));
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
            Пользователь <span>{email}</span> успешно зарегистрирован!
          </div>
        ) : (
          <form className={styles.registrationForm} onSubmit={handleRegForm}>
            {!isMessageVisible ? (
              <>
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
                        Не менее 4 символов! Разрешены: латинские буквы, '_',
                        '.', или '-'
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
                  {emailError ? (
                    <p className={styles.regError}>{emailError}</p>
                  ) : (
                    ""
                  )}
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
                        Почта должна иметь следующий формат: a@b.c Допустимы
                        только латинские буквы!
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
                <button
                  type="submit"
                  disabled={!(emailValid && passwordValid && nameValid)}
                >
                  Зарегистрироваться
                </button>
              </>
            ) : (
              <div className={styles.cartTransferMessage}>
                <p>У вас в корзине уже находятся товары.</p>
                <p> Хотите их перенести после регистрации?</p>
                <div className={styles.buttons}>
                  <button
                    onClick={() =>
                      handleUserCreate(JSON.parse(localStorage.getItem("cart")))
                    }
                  >
                    <span>Да</span>
                  </button>
                  <button onClick={handleNoTransferButton}>
                    <span>Нет</span>
                  </button>
                </div>
                {emailError ? (
                  <p className={styles.regError}>{emailError}</p>
                ) : (
                  ""
                )}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default RegModal;
