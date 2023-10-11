import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddButton from "../UI/AddButton";

const pizzaTypes: string[] = ["тонкое", "традиционное"];

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number[];
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const [activeType, setActiveType] = useState<number>(0);
  const [sizeType, setSizeType] = useState<number>(0);
  const [priceValue, setPriceValue] = useState<number>(0);

  useEffect(() => {
    setPriceValue(price[0]);
  }, []);

  const handlePriceAndSize = (index: number): void => {
    setSizeType(index);
    setPriceValue(price[index]);
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/react_project_3/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                key={type}
                className={activeType === type ? "active" : ""}
                onClick={() => setActiveType(type)}
              >
                {pizzaTypes[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={size}
                className={sizeType === index ? "active" : ""}
                onClick={() => handlePriceAndSize(index)}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{priceValue} ₽</div>
          <AddButton
            title={title}
            price={price}
            imageUrl={imageUrl}
            sizes={sizes}
            id={id}
            activeType={activeType}
            sizeType={sizeType}
          />
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
