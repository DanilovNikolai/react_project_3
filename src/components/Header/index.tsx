import pizzaLogoHeader from "../../assets/img/pizza-logo3.svg";
import { Link, useLocation } from "react-router-dom";
import Search from "../Search";
import CartLabel from "../CartLabel";

const Header: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="header">
      <div className="container">
        <Link to="/react_project_3/">
          <div className="header__logo">
            <img width="50" src={pizzaLogoHeader} alt="Pizza logo" />
            <div>
              <h1>Dudu Pizza</h1>
              <p>
                Всегда великолепно,
                <br />
                никогда не жирно :)
              </p>
            </div>
          </div>
        </Link>
        <div className="container__main">
          {pathname !== "/react_project_3/cart" && <Search />}
          <CartLabel />
        </div>
      </div>
    </div>
  );
};

export default Header;
