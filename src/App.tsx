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
const Layout = lazy(() => import("./pages/front/Layout"));

const Store = lazy(() => import("./pages/front/StorePage"));

const Detail = lazy(() => import("./pages/front/ProductPage"));
const Order = lazy(() => import("./pages/front/OrderPage"));
const OrderDetail = lazy(() => import("./pages/front/OrderDetailPage"));
const Mail = lazy(() => import("./pages/front/ContactPage"));
function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="admin/*" element={<DashBoard />}>
          <Route path="products" element={<AdminProducts />} />
          <Route path="edit_product/:id" element={<EditProduct />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="orders" element={<AdminOrder />} />
        </Route>
        <Route path="*" element={<Layout />}>
          <Route path="products/:category" element={<Store />} />
          <Route path="check-order" element={<OrderDetail />}>
            <Route path=":id" element={<OrderDetail />} />
          </Route>
          <Route path="product/:id" element={<Detail />} />
          <Route path="mail" element={<Mail />} />
        </Route>
        <Route path="order" element={<Order />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
