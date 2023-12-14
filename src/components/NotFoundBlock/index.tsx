import BackButton from "components/UI/BackButton";
// styles
import styles from "./NotFoundBlock.module.scss";
// react-router-dom
import { Link } from "react-router-dom";

const NotFoundBlock: React.FC = () => {
  return (
    <h1 className={styles.root}>
      <div>😕</div>
      <div>Ничего не найдено</div>
      <div className={styles.button}>
        <Link to="/">
          <BackButton />
        </Link>
      </div>
    </h1>
  );
};

export default NotFoundBlock;
