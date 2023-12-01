import React from "react";
import styles from "./CancelPaymentBlock.module.scss";

const CancelPaymentBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        😕 <br />
        К сожалению, заказ не был оплачен.
        <br />
        Попробуйте снова.
      </h1>
    </div>
  );
};

export default CancelPaymentBlock;
