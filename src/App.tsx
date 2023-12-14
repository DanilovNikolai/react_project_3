import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import "./scss/app.scss";

import Home from "./pages/Home";
import Loader from "./components/UI/Loader";
import MainLayout from "./layouts/MainLayout";
import Contacts from "./pages/Contacts";
import AboutUs from "pages/AboutUs";
import AboutCompany from "pages/AboutCompany";

const Cart = lazy(() => import(/*webpackChunkName: "Cart" */ "./pages/Cart"));
const ProductCard = lazy(
  () => import(/*webpackChunkName: "ProductCard" */ "./pages/ProductCard")
);
const NotFound = lazy(
  () => import(/*webpackChunkName: "NotFound" */ "./pages/NotFound")
);
const SuccessPayment = lazy(
  () => import(/*webpackChunkName: "SuccessPayment" */ "./pages/SuccessPayment")
);
const CancelPayment = lazy(
  () => import(/*webpackChunkName: "CancelPayment" */ "./pages/CancelPayment")
);
const Orders = lazy(
  () => import(/*webpackChunkName: "Orders" */ "./pages/Orders")
);

function App() {
  useEffect(() => {
    document.title = "ПодкреPIZZA";
  }, []);

  return (
    <Routes>
      <Route path="" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<Loader />}>
              <ProductCard />
            </Suspense>
          }
        />
        <Route path="/about/" element={<AboutCompany />}>
          <Route path="contacts" element={<Contacts />} />
          <Route path="about_us" element={<AboutUs />} />
        </Route>
        <Route
          path="/success_payment"
          element={
            <Suspense fallback={<Loader />}>
              <SuccessPayment />
            </Suspense>
          }
        />
        <Route
          path="/cancel_payment"
          element={
            <Suspense fallback={<Loader />}>
              <CancelPayment />
            </Suspense>
          }
        />
        <Route
          path="/orders"
          element={
            <Suspense fallback={<Loader />}>
              <Orders />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
