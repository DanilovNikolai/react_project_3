import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import "./scss/app.scss";

import Home from "./pages/Home";
import Loader from "./components/UI/Loader";
import MainLayout from "./layouts/MainLayout";

const Cart = lazy(() => import(/*webpackChunkName: "Cart" */ "./pages/Cart"));
const ProductCard = lazy(
  () => import(/*webpackChunkName: "ProductCard" */ "./pages/ProductCard")
);
const NotFound = lazy(
  () => import(/*webpackChunkName: "NotFound" */ "./pages/NotFound")
);
const About = lazy(
  () => import(/*webpackChunkName: "About" */ "./pages/About")
);
const SuccessPayment = lazy(
  () => import(/*webpackChunkName: "SuccessPayment" */ "./pages/SuccessPayment")
);

function App() {
  return (
    <Routes>
      <Route path="/react_project_3/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<Loader />}>
              <ProductCard />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<Loader />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="success_payment"
          element={
            <Suspense fallback={<Loader />}>
              <SuccessPayment />
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
