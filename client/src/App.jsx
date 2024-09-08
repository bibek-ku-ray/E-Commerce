import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminFeatures from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<AuthLayout/>}>
          <Route path="login" element={<AuthLogin/>}/>
          <Route path="register" element={<AuthRegister/>}/>
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="dashboard" element={<AdminDashboard/>}/>
          <Route path="features" element={<AdminFeatures/>}/>
          <Route path="orders" element={<AdminOrders/>}/>
          <Route path="products" element={<AdminProducts/>}/>          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
