import React from "react";
import styles from "./SuccessPaymentBlock.module.scss";
import smileFace from "../../assets/img/cart_happy_face_emoji_emotion_smile_icon.svg";
import { Link } from "react-router-dom";

const SuccessPaymentBlock = () => {
  return (
    <h1 className={styles.root}>
      <div>{smileFace}</div>
      <div>Ура! Оплата прошла успешно!</div>
      <div>Ваш заказ уже начинают готовить!</div>
      <Link to="/react_project_3">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </h1>
  );
};

export default SuccessPaymentBlock;
