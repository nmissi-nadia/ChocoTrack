import { Link, useLocation } from 'react-router-dom';
import { Cake, ShoppingBag, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Cake className="brand-icon" style={{ color: 'var(--accent-caramel)' }} />
        ChocoTrack
      </div>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${isActive('/')}`}>
          <LayoutDashboard size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
          Tableau de bord
        </Link>
        <Link to="/products" className={`nav-link ${isActive('/products')}`}>
          <Cake size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
          Produits
        </Link>
        <Link to="/orders" className={`nav-link ${isActive('/orders')}`}>
          <ShoppingBag size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
          Commandes
        </Link>
      </div>
    </nav>
  );
}
