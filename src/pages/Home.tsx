import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// Redux Toolkit
import { useSelector } from "react-redux";
import { setFilters } from "../redux/filter/slice";
import { selectFilter } from "../redux/filter/selectors";
import { fetchPizzas } from "../redux/items/slice";
import { useAppDispatch } from "../redux/store";
import { selectItems } from "../redux/items/selectors";
import { SearchPizzaParams } from "../redux/items/types";
// qs
import qs from "qs";
// Components
import {
  Categories,
  Sort,
  PizzaBlock,
  PizzaSkeleton,
  Pagination,
} from "../components";

const sortTypesList: any = {
  0: ["rating", "desc"],
  1: ["rating", "asc"],
  2: ["price", "desc"],
  3: ["price", "asc"],
  4: ["title", "desc"],
  5: ["title", "asc"],
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // Redux Toolkit
  const { items, status } = useSelector(selectItems);
  const { categoryId, sortId, itemsPerPage, currentPage, searchValue } =
    useSelector(selectFilter);
  const dispatch = useAppDispatch(); // <-- useDispatch заменили на типизируемый useAppDispatch

  // При первом рендере проверяем, есть ли в URL строка с параметрами. Если есть, то сохраняем их в Redux Toolkit
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as SearchPizzaParams;
      dispatch(
        setFilters({
          categoryId: Number(params.categoryId),
          sortId: Number(params.sortId),
          itemsPerPage: Number(params.itemsPerPage),
          currentPage: Number(params.currentPage),
          searchValue: params.search,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Если был уже первый рендер, то при следующем рендере берем из Redux параметры и записываем их в URL
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortId,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortId, currentPage]);

  // Если был первый рендер, то запрашиваем items с бэк-энда
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      handleFetchItems();
    }

    isSearch.current = false;
  }, [categoryId, sortId, searchValue, currentPage]);

  // Фнукция с запросом items с бэк-энда
  async function handleFetchItems() {
    const category = categoryId ? `category=${categoryId}` : "";
    const sort = sortTypesList
      ? `sortBy=${sortTypesList[sortId][0]}&order=${sortTypesList[sortId][1]}`
      : "";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        category,
        sort,
        search,
        currentPage: String(currentPage),
        itemsPerPage: String(itemsPerPage),
      })
    );

    window.scrollTo(0, 0);
  }

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} />
          <Sort sortId={sortId} />
        </div>
        {status === "error" ? (
          <div
            style={{
              textAlign: "center",
              margin: "100px auto",
            }}
          >
            <h2 style={{ fontSize: "30px", fontWeight: "700" }}>
              Что-то пошло не так... :(
            </h2>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading"
              ? [...new Array(8)].map((_, index) => (
                  <PizzaSkeleton key={index} />
                ))
              : items.map((item: any) => (
                  <PizzaBlock {...item} key={item.id} />
                ))}
          </div>
        )}
        <Pagination itemsPerPage={itemsPerPage} currentPage={currentPage} />
      </div>
    </>
  );
};

export default Home;
