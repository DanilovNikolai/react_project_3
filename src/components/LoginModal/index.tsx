import React from "react";
import styles from "./LoginModal.module.scss";

interface LoginModalProps {
  onCloseModal: () => void;
  isActive: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ onCloseModal, isActive }) => {
  console.log(isActive);
  
  return (
    <div className={styles.modalOverlay} onClick={onCloseModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form className={styles.registrationForm}>
          <h2>Уже есть аккаунт?</h2>
          <div>
            <label htmlFor="">Логин:</label>
            <input type="email" placeholder="example@mail.ru" />
          </div>
          <div>
            <label htmlFor="">Пароль:</label>
            <input type="password" placeholder="" />
          </div>
          <button type="submit">Войти</button>
          <div className={styles.registerBlock}>
            <p>Новый пользователь?</p>
            <button>Зарегестрироваться</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
