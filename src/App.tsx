import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import "./scss/app.scss";

import Home from "./pages/Home";

import MainLayout from "./layouts/MainLayout";

const Cart = lazy(() => import(/*webpackChunkName: "Cart" */ "./pages/Cart"));
const ProductCard = lazy(
  () => import(/*webpackChunkName: "ProductCard" */ "./pages/ProductCard")
);
const NotFound = lazy(
  () => import(/*webpackChunkName: "NotFound" */ "./pages/NotFound")
);

function App() {
  return (
    <Routes>
      <Route path="/react_project_3" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <ProductCard />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
