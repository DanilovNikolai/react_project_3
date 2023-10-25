import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// axios
import axios from "axios";

// styles
import "../scss/app.scss";

// components
import AddButton from "../components/UI/AddButton";
import BackButton from "../components/UI/BackButton";

// Redux Toolkit
import { Pizza } from "../redux/items/types";

const pizzaTypes: string[] = ["традиционное", "тонкое"];

const ProductCard: React.FC = () => {
  const [pizza, setPizza] = useState<Pizza>(null);
  const [activeType, setActiveType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://64f8cba7824680fd21800fd6.mockapi.io/pizzas/${id}`
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  return (
    <div className="container">
      <h1 className="product-card__title">{pizza?.title}</h1>
      <div className="product-card__container">
        <div className="product-card__content">
          <img src={pizza?.imageUrl} alt="" className="product-card__img" />
          <div className="pizza-block__selector">
            <ul>
              {pizza?.types.map((type: number) => (
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
              {pizza?.sizes.map((size: number, index: number) => (
                <li
                  key={size}
                  className={activeSize === index ? "active" : ""}
                  onClick={() => setActiveSize(index)}
                >
                  {size} см.
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="product-card__content">
          <h3>Описание:</h3>
          <p className="product-card__description">{pizza?.description}</p>
          <div className="product-card__bottom">
            <h4 className="product-card__price">
              Цена: {pizza?.price[activeSize]} ₽
            </h4>
            <AddButton
              id={pizza?.id}
              title={pizza?.title}
              size={pizza?.sizes[activeSize]}
              type={pizzaTypes[activeType]}
              imageUrl={pizza?.imageUrl}
              price={pizza?.price[activeSize]}
              priceId={pizza?.priceId[activeSize]}
            />
          </div>
          <BackButton />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
