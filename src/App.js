import "./App.css";
import { Routes, Route,Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public
import Home from "./pages/Home";
import Product from "./components/Product/index.js";
import Contact from "./components/Contact/index.js";

// Product Detail
import ProductDetail from "./pages/ProductDetail/ProductDetail.js";

// Static Details


// Admin
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard.js";
import ProductManagement from "./pages/Admin/ProductManagement.js";
import ProductDetailManagement from "./pages/Admin/ProductDetailManagement/ProductDetailManagement.js";

// PrivateRoute
import PrivateRoute from "./routes/PrivateRoute.js";

function App() {
  return (
    <div className="App">
     <Navbar />

      <Routes>
        {/* ==================== PUBLIC ROUTES ==================== */}
        <Route path="/" element={<Home />} />
        <Route path="/san-pham" element={<Product />} />
        <Route path="/lien-he" element={<Contact />} />

 

        {/* Dynamic Detail */}
        <Route path="/san-pham/:slug" element={<ProductDetail />} />

        {/* ==================== ADMIN ROUTES ==================== */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Dashboard chính */}
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } />

        {/* Hỗ trợ cả /admin/dashboard */}
        <Route path="/admin/dashboard" element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } />

        <Route path="/admin/products" element={
          <PrivateRoute>
            <ProductManagement />
          </PrivateRoute>
        } />

        <Route path="/admin/product-details" element={
          <PrivateRoute>
            <ProductDetailManagement />
          </PrivateRoute>
        } />

        {/* Redirect nếu vào route admin không tồn tại */}
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;