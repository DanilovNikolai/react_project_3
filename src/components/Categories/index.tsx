import React, { useCallback } from "react";
// redux toolkit
import { useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage } from "../../redux/filter/slice";
// styles
import styles from "./Categories.module.scss";

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
      dispatch(setCurrentPage(1));
    }, []);

    return (
      <div className={styles.categories}>
        <ul>
          {categories.map((categoryName, index) => (
            <li
              key={index}
              className={categoryId === index ? styles.active : ""}
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
