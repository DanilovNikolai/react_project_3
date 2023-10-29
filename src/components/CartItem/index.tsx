// redux toolkit
import { CartItemProps } from "../../redux/cart/types";
// components
import ItemCounter from "../UI/ItemCounter";
import ItemRemoveButton from "../UI/ItemRemoveButton";
// styles
import styles from "./CartItem.module.scss";

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  price,
  size,
  type,
  imageUrl,
  count,
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.img}>
        <img src={imageUrl} alt="Pizza" />
      </div>
      <div className={styles.info}>
        <h3>{title}</h3>
        <p>
          {type} тесто, {size} см.
        </p>
      </div>
      <div className={styles.block}>
        <ItemCounter id={id} type={type} size={size} count={count} />
        <div className={styles.price}>
          <b>{price * count} ₽</b>
        </div>
      </div>
      <ItemRemoveButton id={id} type={type} size={size} />
    </div>
  );
};

export default CartItem;
