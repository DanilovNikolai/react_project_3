import React from "react";
// styles
import styles from "./BackButton.module.scss";

interface BackButtonProps {
  onRemoveDidMount?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onRemoveDidMount }) => {
  return (
    <div className={styles.root}>
      <button className={styles.button} onClick={onRemoveDidMount}>
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 13L1 6.93015L6.86175 1"
            stroke="#D3D3D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <span>Вернуться назад</span>
      </button>
    </div>
  );
};

export default BackButton;
