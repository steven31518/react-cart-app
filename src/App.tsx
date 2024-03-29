import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
const Loading = lazy(() => import("./components/LoadingPage"));
const Home = lazy(() => import("./pages/Home"));
const DashBoard = lazy(() => import("./pages/admin/DashBoard"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProductsPage"));
const AdminCoupons = lazy(() => import("./pages/admin/AdminCouponsPage"));
const AdminOrder = lazy(() => import("./pages/admin/AdminOrdersPage"));
const Login = lazy(() => import("./pages/LoginPage"));
const EditProduct = lazy(() => import("./pages/admin/EditProductPage"));
const Layout = lazy(() => import("./pages/front/Layout"));
const Store = lazy(() => import("./pages/front/StorePage"));
const Detail = lazy(() => import("./pages/front/ProductPage"));

const OrderDetail = lazy(() => import("./pages/front/OrderDetailPage"));
const Mail = lazy(() => import("./pages/front/ContactPage"));
const OrderCheck = lazy(() => import("./pages/check/OrderCheckPage"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="login" element={<Login />} />

        <Route path="admin/*" element={<DashBoard />}>
          <Route path="products" element={<AdminProducts />} />
          <Route path="edit_product/:id" element={<EditProduct />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="orders" element={<AdminOrder />} />
        </Route>
        <Route path="*" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Store />} />
          <Route path="products/:category" element={<Store />} />
          <Route path="search" element={<OrderDetail />} />
          <Route path="product/:id" element={<Detail />} />
          <Route path="email" element={<Mail />} />
        </Route>
        <Route path="order" element={<OrderCheck />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
