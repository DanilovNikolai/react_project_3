import React, { useState } from "react";
// react-router
import { Link } from "react-router-dom";
// components
import AddButton from "../UI/AddButton";
import PizzaSelector from "../UI/PizzaSelector";
// styles
import styles from "./PizzaBlock.module.scss";
// types
import { Pizza } from "../../redux/items/types";

const pizzaTypes: string[] = ["традиционное", "тонкое"];

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number[];
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
  priceId: string[];
  pizza: Pizza;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  priceId,
  pizza,
}) => {
  const [activeType, setActiveType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Link to={`/react_project_3/pizza/${id}`}>
          <img className={styles.image} src={imageUrl} alt="Pizza" />
          <h4 className={styles.title}>{title}</h4>
        </Link>
        <PizzaSelector
          pizza={pizza}
          activeType={activeType}
          setActiveType={setActiveType}
          activeSize={activeSize}
          setActiveSize={setActiveSize}
          pizzaTypes={pizzaTypes}
        />
        <div className={styles.bottom}>
          <div className={styles.price}>{pizza?.price[activeSize]} ₽</div>
          <AddButton
            id={id}
            title={title}
            price={price[activeSize]}
            imageUrl={imageUrl}
            size={sizes[activeSize]}
            type={pizzaTypes[activeType]}
            priceId={priceId[activeSize]}
          />
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
