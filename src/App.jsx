import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProductList from "./pages/products/ProductList.jsx";
import ProductForm from "./pages/products/ProductForm.jsx";
import OrderList from "./pages/orders/OrderList.jsx";
import OrderNew from "./pages/orders/OrderNew.jsx";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Rota pública */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
      />

      {/* Rotas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Products - somente admin */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id/edit" element={<ProductForm />} />

          {/* Orders */}
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/new" element={<OrderNew />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}
