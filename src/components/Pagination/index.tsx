import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
// Redux Toolkit
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/filter/slice";

type PaginationProps = { itemsPerPage: number; currentPage: number };

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  currentPage,
}) => {
  const dispatch = useDispatch();

  const pageCount = Math.ceil(23 / itemsPerPage);

  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
