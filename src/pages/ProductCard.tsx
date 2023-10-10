import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../scss/app.scss";
import AddButton from "../components/UI/AddButton";

const pizzaTypes: string[] = ["тонкое", "традиционное"];

const ProductCard: React.FC = () => {
  const [pizza, setPizza] = useState<{
    id: string;
    imageUrl: string;
    title: string;
    price: number[];
    description: string;
    sizes: number[];
    types: number[];
  }>();
  const [activeType, setActiveType] = useState<number>(0);
  const [sizeType, setSizeType] = useState<number>(0);
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
                  className={sizeType === index ? "active" : ""}
                  onClick={() => setSizeType(index)}
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
            <h4 className="product-card__price">от {pizza?.price} ₽</h4>
            <AddButton {...pizza} />
          </div>
          <Link to="/react_project_3">
            <button className="button button--outline button--add">
              <span>Назад</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
