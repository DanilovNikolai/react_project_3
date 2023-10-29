import React from "react";
// redux toolkit
import { useDispatch } from "react-redux";
import { removeItem } from "../../../redux/cart/slice";
import { CartItemProps } from "../../../redux/cart/types";
// styles
import style from "./ItemRemoveButton.module.scss";

interface ItemRemoveButtonProps {
  id: string;
  type: string;
  size: number;
}

const ItemRemoveButton: React.FC<ItemRemoveButtonProps> = ({
  id,
  type,
  size,
}) => {
  const dispatch = useDispatch();

  function handleClickRemove() {
    if (window.confirm("Are you sure You want to remove this item?")) {
      dispatch(removeItem({ id, type, size } as CartItemProps));
    }
  }

  return (
    <button onClick={handleClickRemove} className={style.root}>
      <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <rect fill="none" height="256" width="256" />
        <line
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
          x1="200"
          x2="56"
          y1="56"
          y2="200"
        />
        <line
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
          x1="200"
          x2="56"
          y1="200"
          y2="56"
        />
      </svg>
    </button>
  );
};

export default ItemRemoveButton;
