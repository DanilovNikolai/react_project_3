import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// styles
import styles from "./SuccessPaymentBlock.module.scss";
// icons
import smileFace from "../../assets/img/cart_happy_face_emoji_emotion_smile_icon.svg";
// utils
import getRandomOrder from "../../utils/getRandomOrderNumber";
// components
import BackButton from "components/UI/BackButton";
// redux toolkit
import { useDispatch } from "react-redux";
import { clearItems } from "../../redux/cart/slice";

const SuccessPaymentBlock: React.FC = () => {
  const randomOrder = getRandomOrder(1, 100);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/react_project_3/success_payment") {
      dispatch(clearItems());
      const data = localStorage.getItem("currentUser");
      const currentUser = JSON.parse(data);
      currentUser.cart = [];
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, []);

  return (
    <h2 className={styles.root}>
      <div>
        <img src={smileFace} alt="smile_face" />
      </div>
      <div>Ура! Оплата прошла успешно!</div>
      <div>
        Номер вашего заказа <span>#{randomOrder}</span>
      </div>
      <div>Ваш заказ уже начинают готовить!</div>
      <div>
        <span>Приятного аппетита!</span>
      </div>
      <Link to="/react_project_3">
        <BackButton />
      </Link>
    </h2>
  );
};

export default SuccessPaymentBlock;
