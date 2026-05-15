import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import PublicHome from './pages/public/PublicHome';
import PublicMenu from './pages/public/PublicMenu';
import PublicCart from './pages/public/PublicCart';

// Admin Pages
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Public Site Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<PublicHome />} />
            <Route path="menu" element={<PublicMenu />} />
            <Route path="cart" element={<PublicCart />} />
          </Route>

          {/* Admin Dashboard Routes */}
          <Route path="/admin-dashboard" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="orders" element={<OrdersPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
