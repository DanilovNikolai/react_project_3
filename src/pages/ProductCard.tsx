import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../scss/app.scss";

const ProductCard: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
    description: string;
  }>();
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

  if (!pizza) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    <div className="container">
      <h1 className="product-card__title">{pizza?.title}</h1>
      <div className="product-card__container">
        <img src={pizza?.imageUrl} alt="" className="product-card__img" />
        <div className="product-card__content">
          <h3>Описание:</h3>
          <p className="product-card__description">{pizza?.description}</p>
          <h4 className="product-card__price">от {pizza?.price} ₽</h4>
          <Link to="/react_project_3/">
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
