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
        <Link to="/admin-dashboard" className={`nav-link ${isActive('/admin-dashboard')}`}>
          <LayoutDashboard size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
          Tableau de bord
        </Link>
        <Link to="/admin-dashboard/products" className={`nav-link ${isActive('/admin-dashboard/products')}`}>
          <Cake size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
          Produits
        </Link>
        <Link to="/admin-dashboard/orders" className={`nav-link ${isActive('/admin-dashboard/orders')}`}>
          <ShoppingBag size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
          Commandes
        </Link>
        <Link to="/" className="nav-link" title="Retour au site public" style={{ borderLeft: '1px solid var(--border-light)', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
          Site Public
        </Link>
      </div>
    </nav>
  );
}
