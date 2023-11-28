import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// components
import CartItem from "../../components/CartItem";
import CartEmpty from "../../components/CartEmpty";
import BackButton from "../../components/UI/BackButton";
import PayButton from "../../components/UI/PayButton";
import ClearCartButton from "../UI/ClearCartButton";
// Redux Toolkit
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../redux/cart/selectors";
import { selectUser } from "redux/user/selectors";
import { CartItemProps } from "../../redux/cart/types";
import { setBonus } from "redux/user/slice";
// styles
import styles from "./CartBlock.module.scss";
// utils
import { calcTotalPrice } from "utils/calcTotalPrice";
// hooks
import { useAuth } from "hooks/useAuth";

const CartBlock: React.FC = () => {
  const [bonusInput, setBonusInput] = useState("");
  const { items, totalPrice } = useSelector(selectCart);
  const { bonus } = useSelector(selectUser);
  const [isDisabledButton, setDisabledButton] = useState(false);
  const [newTotalPrice, setNewTotalPrice] = useState(totalPrice);
  const { isAuth } = useAuth();
  const totalCount = items.reduce(
    (sum: number, item: { count: number }) => item.count + sum,
    0
  );
  const dispatch = useDispatch();
  const parsedBonusInput = Number.parseInt(bonusInput, 10);

  useEffect(() => {
    JSON.parse(localStorage.getItem("bonus"))
      ? setNewTotalPrice(totalPrice - JSON.parse(localStorage.getItem("bonus")))
      : setNewTotalPrice(totalPrice);
    calcTotalPrice(items, parsedBonusInput);
  }, [newTotalPrice, totalPrice, items]);

  useEffect(() => {
    if (parsedBonusInput > bonus || bonusInput === "") {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [bonusInput]);

  const handleBonusSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      parsedBonusInput <= bonus &&
      totalPrice - parsedBonusInput >= (totalPrice / 100) * 30
    ) {
      const newBonus = bonus - parsedBonusInput;
      dispatch(setBonus(newBonus));
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      currentUser.bonus = newBonus;

      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      const bonusUsed = JSON.parse(localStorage.getItem("bonus"));

      if (bonusUsed) {
        localStorage.setItem(
          "bonus",
          JSON.stringify(bonusUsed + parsedBonusInput)
        );
      } else {
        localStorage.setItem("bonus", JSON.stringify(parsedBonusInput));
      }

      setNewTotalPrice(totalPrice - JSON.parse(localStorage.getItem("bonus")));
      setBonusInput("");
      console.log(bonus);
    }
  };

  const handleBonusRemoveButton = () => {
    const bonusUsed = JSON.parse(localStorage.getItem("bonus"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const totalBonus = bonusUsed + currentUser.bonus;
    dispatch(setBonus(totalBonus));
    currentUser.bonus = totalBonus;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.removeItem("bonus");
    setNewTotalPrice(totalPrice);
  };

  const handleBonusInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setBonusInput(value);
    }
  };

  if (items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.cart}>
        <div className={styles.top}>
          <h2 className={styles.title}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            Корзина
          </h2>
          <ClearCartButton />
        </div>
        <div className={styles.body}>
          {items &&
            items.map((item: CartItemProps, index) => (
              <CartItem key={item.id + index} {...item} />
            ))}
        </div>
        <div className={styles.bottom}>
          <div className={styles.details}>
            <div className={styles.totalCount}>
              Всего: <b>{totalCount} шт.</b>{" "}
            </div>
            <div className={styles.calculation}>
              <div>
                Сумма заказа: <b>{totalPrice} ₽</b>{" "}
              </div>
              {isAuth && (
                <>
                  <div className={styles.totalBonus}>
                    Всего бонусов: <b>{bonus}</b>
                  </div>
                  <div className={styles.bonusApply}>
                    <form onSubmit={handleBonusSubmit}>
                      <input
                        onChange={handleBonusInputChange}
                        value={bonusInput}
                        type="text"
                        pattern="\d*"
                        id="bonus"
                        placeholder="0"
                      />
                      <button
                        type="submit"
                        disabled={isDisabledButton}
                        className={styles.bonusButton}
                      >
                        <span>Применить бонусы</span>
                      </button>
                    </form>
                  </div>
                  {localStorage.getItem("bonus") && (
                    <div className={styles.bonusUsed}>
                      Применено <b>{totalPrice - newTotalPrice}</b> бонусов
                      <button
                        className={styles.removeButton}
                        onClick={handleBonusRemoveButton}
                      >
                        <svg
                          viewBox="0 0 256 256"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect fill="none" height="256" width="256" />
                          <line
                            fill="none"
                            stroke="#c8c8c8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                            x1="200"
                            x2="56"
                            y1="56"
                            y2="200"
                          />
                          <line
                            fill="none"
                            stroke="#c8c8c8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                            x1="200"
                            x2="56"
                            y1="200"
                            y2="56"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                  <div className={styles.finalPrice}>
                    Итого: <b>{newTotalPrice} ₽</b>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.buttons}>
            <Link to="/">
              <BackButton />
            </Link>
            <PayButton items={items} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartBlock;
