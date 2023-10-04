import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setCategoryId } from "../redux/filter/slice";

const categories: string[] = [
  "Все",
  "Мясные",
  "Вегетарианские",
  "Сырные",
  "Острые",
  "Наш выбор",
];

const Categories: React.FC<{ categoryId: number }> = React.memo(
  ({ categoryId }) => {
    const dispatch = useDispatch();

    const handleChangeCategory = useCallback((idx: number): void => {
      dispatch(setCategoryId(idx));
    }, []);

    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, index) => (
            <li
              key={index}
              className={categoryId === index ? "active" : ""}
              onClick={() => handleChangeCategory(index)}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
