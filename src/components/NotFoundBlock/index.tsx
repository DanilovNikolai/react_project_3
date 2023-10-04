import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <h1 className={styles.root}>
      <div>😕</div>
      <div>Ничего не найдено</div>
    </h1>
  );
};

export default NotFoundBlock;
