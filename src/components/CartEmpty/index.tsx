import { Link } from "react-router-dom";
// icons
import emptyCartImg from "../../assets/img/empty-cart.png";
// styles
import styles from "./CartEmpty.module.scss";
// components
import BackButton from "../UI/BackButton";

const CartEmpty: React.FC = () => {
  return (
    <div className={styles.cartEmpty}>
      <h2>
        Корзина пустая <br />
        <span>😕</span>
      </h2>
      <p>
        Вероятнее всего, вы ещё не заказывали пиццу.
        <br />
        Чтобы заказать пиццу, перейдите на главную страницу.
      </p>
      <img src={emptyCartImg} alt="Empty cart" />
      <Link to="/">
        <BackButton />
      </Link>
    </div>
  );
};

export default CartEmpty;
