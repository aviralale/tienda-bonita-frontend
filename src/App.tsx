import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import CustomersPage from "./pages/CustomersPage";
import PromoCodesPage from "./pages/PromoCodesPage";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/promo-codes" element={<PromoCodesPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
