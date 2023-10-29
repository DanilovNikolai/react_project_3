import React from "react";
// styles
import styles from "./PizzaSelector.module.scss";
// types
import { Pizza } from "../../../redux/items/types";

interface PizzaSelectorProps {
  pizza: Pizza;
  activeType: number;
  activeSize: number;
  pizzaTypes: string[];
  setActiveType: (type: number) => void;
  setActiveSize: (size: number) => void;
  handlePriceAndSize?: (index: number) => void;
}

const PizzaSelector: React.FC<PizzaSelectorProps> = ({
  pizza,
  activeType,
  activeSize,
  pizzaTypes,
  setActiveType,
  setActiveSize,
}) => {
  return (
    <div className={styles.selector}>
      <ul>
        {pizza?.types.map((type: number) => (
          <li
            key={type}
            className={activeType === type ? styles.active : ""}
            onClick={() => setActiveType(type)}
          >
            {pizzaTypes[type]}
          </li>
        ))}
      </ul>
      <ul>
        {pizza?.sizes.map((size: number, index: number) => (
          <li
            key={size}
            className={activeSize === index ? styles.active : ""}
            onClick={() => setActiveSize(index)}
          >
            {size} см.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PizzaSelector;
