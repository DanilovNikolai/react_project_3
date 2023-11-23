import { useEffect, useState } from "react";
// react-router
import { useParams, useNavigate, Link } from "react-router-dom";
// styles
import styles from "./ProductCardBlock.module.scss";
import "../../scss/app.scss";
// axios
import axios from "axios";
// components
import AddButton from "../../components/UI/AddButton";
import BackButton from "../../components/UI/BackButton";
import PizzaSelector from "../UI/PizzaSelector";
// Redux Toolkit
import { Pizza } from "../../redux/items/types";

const pizzaTypes: string[] = ["традиционное", "тонкое"];

const ProductCardBlock: React.FC = () => {
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
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{pizza?.title}</h1>
      <div className={styles.container}>
        <div className={styles.content}>
          <img src={pizza?.imageUrl} alt="" className={styles.img} />
          <PizzaSelector
            pizza={pizza}
            activeType={activeType}
            setActiveType={setActiveType}
            activeSize={activeSize}
            setActiveSize={setActiveSize}
            pizzaTypes={pizzaTypes}
          />
        </div>
        <div className={styles.content}>
          <h3>Описание:</h3>
          <p className={styles.description}>{pizza?.description}</p>
          <div className={styles.bottom}>
            <h4 className={styles.price}>Цена: {pizza?.price[activeSize]} ₽</h4>
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
        </div>
      </div>
      <Link to="/">
        <BackButton />
      </Link>
    </div>
  );
};

export default ProductCardBlock;
