import React, { useState } from "react";
// styles
import styles from "./PayButton.module.scss";
// Stripe
import { loadStripe } from "@stripe/stripe-js";
// types
import { CartSliceState } from "../../../redux/cart/types";

const PayButton: React.FC<CartSliceState> = ({ items }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const stripe = loadStripe(
    "pk_test_51O2zWiBhVdtjeDVTvHu127iOs4AxovXtzgFOTYFzzjN8kK2BIg0GtZ7EwIUhSGguXsfeOA4LtxrDgwHNDY5lTUxZ002qykvVpI"
  );

  async function handlePayClick() {
    setIsProcessing(true);

    try {
      const stripeInstance = await stripe;

      const lineItems = items.map((item) => ({
        price: item.priceId,
        quantity: item.count,
      }));

      const response = await stripeInstance.redirectToCheckout({
        lineItems: lineItems,
        mode: "payment",
        successUrl:
          "https://danilovnikolai.github.io/react_project_3/#/success_payment",
        cancelUrl: "https://danilovnikolai.github.io/react_project_3/#/",
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      onClick={handlePayClick}
      className={`${styles.payButton} ${isProcessing ? styles.processing : ""}`}
    >
      <span>{isProcessing ? "Подождите..." : "Оплатить сейчас"}</span>
    </button>
  );
};

export default PayButton;
