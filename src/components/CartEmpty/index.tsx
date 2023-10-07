import emptyCartImg from "../../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
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
      <Link to="/react_project_3" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
