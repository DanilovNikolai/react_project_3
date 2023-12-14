import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// styles
import styles from "./SuccessPaymentBlock.module.scss";
// icons
import smileFace from "../../assets/img/cart_happy_face_emoji_emotion_smile_icon.svg";
// utils
import getRandomOrder from "../../utils/getRandomOrderNumber";
// components
import BackButton from "components/UI/BackButton";
// redux toolkit
import { useDispatch, useSelector } from "react-redux";
import { clearItems } from "../../redux/cart/slice";
import { selectCart } from "redux/cart/selectors";
import { addOrder, setBonus } from "redux/user/slice";
// types
import { userSliceState } from "redux/user/types";
// hooks
import { useAuth } from "hooks/useAuth";

const SuccessPaymentBlock: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPrice } = useSelector(selectCart);
  const { pathname } = useLocation();
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const numberOfOrderRef = useRef(getRandomOrder(1, 100));
  const didMountRef = useRef(
    localStorage.getItem("didMount") === "true" ? true : false
  );
  const bonusForOrderRef = useRef(Math.round(totalPrice / 100));

  useEffect(() => {
    const now = new Date();
    const date = now.toLocaleDateString("en-GB");
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (pathname === "/success_payment") {
      if (didMountRef.current) {
        localStorage.removeItem("didMount");
        navigate("/");
      } else {
        dispatch(clearItems());
        if (!isAuth) {
          localStorage.removeItem("cart");
        } else {
          const currentUser = JSON.parse(localStorage.getItem("currentUser"));
          currentUser.bonus += bonusForOrderRef.current;
          const userOrder = {
            date,
            time,
            numberOfOrder: numberOfOrderRef.current,
            totalPrice: totalPrice,
            bonusForOrder: bonusForOrderRef.current,
            items: currentUser.cart,
            status: "Оплачен",
          };
          currentUser.cart = [];
          currentUser.orders.push(userOrder);
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          dispatch(addOrder(userOrder));
          localStorage.removeItem("bonus");
          const userEmail = currentUser.email;

          const users = JSON.parse(localStorage.getItem("users"));
          const updatedUsers = users.map((user: userSliceState) => {
            if (user.email === userEmail) {
              user.bonus = currentUser.bonus;
              dispatch(setBonus(currentUser.bonus));
              user.cart = [];
              user.orders.push(userOrder);
            }
            return user;
          });
          localStorage.setItem("users", JSON.stringify(updatedUsers));
        }

        didMountRef.current = true;
        localStorage.setItem("didMount", "true");
      }
    }
  }, []);

  const handleRemoveDidMount = () => {
    localStorage.removeItem("didMount");
  };

  return (
    <h2 className={styles.root}>
      <div>
        <img src={smileFace} alt="smile_face" />
      </div>
      <div>Ура! Оплата прошла успешно!</div>
      <div>
        Номер вашего заказа: <span>{numberOfOrderRef.current}</span>
      </div>
      {isAuth && (
        <div>
          Вы получили бонусов за заказ: <span>{bonusForOrderRef.current}</span>
        </div>
      )}
      <div>Ваш заказ уже начинают готовить!</div>
      <div>
        <span>Приятного аппетита!</span>
      </div>
      <div className={styles.button}>
        <Link to="/">
          <BackButton onRemoveDidMount={handleRemoveDidMount} />
        </Link>
      </div>
    </h2>
  );
};

export default SuccessPaymentBlock;
