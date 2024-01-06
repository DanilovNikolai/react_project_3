import React from "react";
import styles from "./PizzaDivider.module.scss";
import pizzaIcon from "../../../assets/img/pizza-logo.svg";

const PizzaDivider = () => {
  return (
    <div className={styles.pizzaDivider}>
      <img src={pizzaIcon} alt="pizza-icon" />
      <img src={pizzaIcon} alt="pizza-icon" />
      <img src={pizzaIcon} alt="pizza-icon" />
    </div>
  );
};

export default PizzaDivider;
