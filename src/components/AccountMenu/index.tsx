import React, { useEffect, useRef, useState } from "react";
// styles
import styles from "./AccountMenu.module.scss";
// redux toolkit
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setBonus } from "redux/user/slice";
import { selectUser } from "redux/user/selectors";
// components
import CartButton from "components/UI/CartButton";
// react-router-dom
import { Link } from "react-router-dom";

interface PersonalAccountProps {
  username: string | null | undefined;
}

const AccountMenu: React.FC<PersonalAccountProps> = ({ username }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const AccountRef = useRef<HTMLDivElement>(null);
  const { bonus } = useSelector(selectUser);

  useEffect(() => {
    const handleAccountClick = (event: MouseEvent) => {
      if (
        AccountRef.current &&
        !event.composedPath().includes(AccountRef.current)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleAccountClick);

    return () => document.removeEventListener("click", handleAccountClick);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogOff = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const currentUserBonus = currentUser.bonus;
    const usedBonus = JSON.parse(localStorage.getItem("bonus"));

    dispatch(setBonus(currentUserBonus + usedBonus));
    dispatch(removeUser());
    localStorage.removeItem("currentUser");
    localStorage.removeItem("didMount");
    localStorage.removeItem("bonus");
  };

  return (
    <div className={styles.root} ref={AccountRef}>
      <div className={styles.userTitle} onClick={toggleMenu}>
        <svg
          height="20px"
          version="1.1"
          viewBox="0 0 20 20"
          width="20px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title />
          <g
            fill="none"
            fillRule="evenodd"
            id="Icons"
            stroke="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
          >
            <g
              id="Group"
              stroke="#fff"
              strokeWidth="2"
              transform="translate(-2.000000, -2.000000)"
            >
              <g id="Shape">
                <path d="M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z" />
                <path d="M12,15 C9.790861,15 8,13.209139 8,11 C8,8.790861 9.790861,7 12,7 C14.209139,7 16,8.790861 16,11 C16,13.209139 14.209139,15 12,15 Z" />
                <path d="M6.5,19 C7.68547654,17 9.52010602,16 12.0038885,16 C14.482246,16 16.3142832,16.9956366 17.5,18.9869097" />
              </g>
            </g>
          </g>
        </svg>
        <span>{username}</span>
      </div>
      {menuOpen && (
        <div className={styles.menu}>
          <p className={styles.bonus}>
            Всего бонусов: <span>{bonus}</span>
          </p>
          <Link to="/cart">
            <p className={styles.cart}>
              <CartButton />
            </p>
          </Link>
          <ul className={styles.list}>
            <li>Личный кабинет</li>
            <Link to="/orders">
              <li>История заказов</li>
            </Link>
            <li onClick={handleLogOff}>Выйти</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
