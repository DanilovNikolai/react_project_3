import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../../redux/cart/slice";
import { CartItem } from "../../../redux/cart/types";
import { selectCartItemById } from "../../../redux/cart/selectors";
import { useState } from "react";

const pizzaTypes: string[] = ["тонкое", "традиционное"];

export type AddButtonProps = {
  id: string,
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
};

const AddButton: React.FC<AddButtonProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
}) => {
  const dispatch = useDispatch();
  const foundItem = useSelector(selectCartItemById(id));
  const [activeType] = useState<number>(0);
  const [sizeType] = useState<number>(0);

  const handleAddItem = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      size: sizes[sizeType],
      type: pizzaTypes[activeType],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <button
      onClick={handleAddItem}
      className="button button--outline button--add"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
          fill="white"
        />
      </svg>
      <span>Добавить</span>
      {foundItem && <i>{foundItem?.count}</i>}
    </button>
  );
};

export default AddButton;
