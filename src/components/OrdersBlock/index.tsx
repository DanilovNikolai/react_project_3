import React, { useState } from "react";
// styles
import styles from "./OrdersBlock.module.scss";
// redux toolkit
import { useSelector } from "react-redux";
import { selectUser } from "redux/user/selectors";

const OrdersBlock = () => {
  const { orders } = useSelector(selectUser);
  const [isVisibleArray, setIsVisibleArray] = useState(
    new Array(orders.length).fill(false)
  );

  const handleOrderVisible = (index) => {
    const updatedVisibility = [...isVisibleArray];
    updatedVisibility[index] = !updatedVisibility[index];
    setIsVisibleArray(updatedVisibility);
  };

  return (
    <div className="content">
      <div className={styles.root}>
        <h2>История заказов</h2>
        <ul className={styles.list}>
          {orders.map((order, index) => (
            <li
              key={index}
              onClick={() => handleOrderVisible(index)}
              className={styles.order}
            >
              <div className={styles.orderTitle}>
                <span>
                  Номер заказа: <b>{order.numberOfOrder}</b>
                </span>
                <div>
                  <span>
                    Дата: <b>{order.date}</b>
                  </span>
                  <span>
                    Время: <b>{order.time}</b>
                  </span>
                </div>
              </div>
              {isVisibleArray[index] && (
                <div className={styles.items}>
                  {order.items.map((item, itemIndex) => (
                    <div className={styles.item} key={itemIndex}>
                      <div className={styles.itemMain_1}>
                        <div>
                          <img src={item.imageUrl} alt="" />
                        </div>
                        <div className={styles.itemInfo}>
                          <b>{item.title}</b>
                          <div>
                            {item.size} см, {item.type} тесто
                          </div>
                        </div>
                      </div>
                      <div className={styles.itemMain_2}>
                        <div className={styles.itemPrice}>
                          <b>{item.price} ₽</b>
                        </div>
                        <div className={styles.itemCount}>
                          <b>{item.count} шт.</b>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className={styles.bonus}>
                Получено бонусов за заказ: <b>{order.bonusForOrder}</b>
              </div>
              <div className={styles.totalPrice}>
                Сумма заказа: <b>{order.totalPrice}</b>
              </div>
              <div className={styles.orderStatus}>
                Статус заказа: <span>Оплачен</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrdersBlock;
