import React from "react";
// styles
import styles from "./AboutCompanyBlock.module.scss";
// react-router-dom
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

const AboutCompanyBlock = () => {
  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <NavLink to="about_us" className={({isActive}) => isActive ? styles.active : ""}>
          <div>О нас</div>
        </NavLink>
        <NavLink to="contacts" className={({isActive}) => isActive ? styles.active : ""}>
          <div>Контакты</div>
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default AboutCompanyBlock;
