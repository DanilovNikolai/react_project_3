import pizzaLogoHeader from "../assets/img/pizza-logo.svg";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import CartLabel from "./CartLabel";

const Header: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={pizzaLogoHeader} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <div className="container__main">
          {pathname !== "/cart" && <Search />}
          <CartLabel />
        </div>
      </div>
    </div>
  );
};

export default Header;
