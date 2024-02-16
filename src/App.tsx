import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const DashBoard = lazy(() => import("./pages/admin/DashBoard"));
const AdminProducts = lazy(
  () => import("./pages/admin/prodocts/AdminProductsPage")
);
const AdminCoupons = lazy(
  () => import("./pages/admin/coupons/AdminCouponsPage")
);
const AdminOrder = lazy(() => import("./pages/admin/orders/AdminOrdersPage"));
const Login = lazy(() => import("./pages/LoginPage"));

const EditProduct = lazy(
  () => import("./pages/admin/prodocts/EditProductPage")
);
function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<DashBoard />}>
          <Route path="products" element={<AdminProducts />} />
          <Route path="edit/:id" element={<EditProduct />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="orders" element={<AdminOrder />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
