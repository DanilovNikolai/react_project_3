import React from "react";
import styles from "./SuccessPaymentBlock.module.scss";
import smileFace from "../../assets/img/cart_happy_face_emoji_emotion_smile_icon.svg";
import { Link } from "react-router-dom";
import getRandomOrder from "../../utils/getRandomOrderNumber";

const SuccessPaymentBlock = () => {
  const randomOrder = getRandomOrder(1, 100);

  return (
    <h2 className={styles.root}>
      <div>
        <img src={smileFace} alt="smile_face" />
      </div>
      <div>Ура! Оплата прошла успешно!</div>
      <div>Номер вашего заказа <span>#{randomOrder}</span></div>
      <div>Ваш заказ уже начинают готовить!</div>
      <div><span>Приятного аппетита!</span></div>
      <Link to="/react_project_3">
        <button className="button button--outline button--add">
          <span>Назад к покупкам</span>
        </button>
      </Link>
    </h2>
  );
};

export default SuccessPaymentBlock;
