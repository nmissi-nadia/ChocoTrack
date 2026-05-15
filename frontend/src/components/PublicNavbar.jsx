import { Link, useLocation } from 'react-router-dom';
import { Cake, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function PublicNavbar() {
  const location = useLocation();
  const { cartItemCount } = useCart();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit' }}>
          <Cake className="brand-icon" style={{ color: 'var(--accent-caramel)' }} />
          <span>ChocoTrack</span>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${isActive('/')}`}>Accueil</Link>
        <Link to="/menu" className={`nav-link ${isActive('/menu')}`}>Notre Carte</Link>
        <Link to="/cart" className={`nav-link ${isActive('/cart')}`} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <ShoppingCart size={18} />
          <span>Panier</span>
          {cartItemCount > 0 && (
            <span style={{ 
              background: 'var(--accent-caramel)', 
              color: 'white', 
              borderRadius: '50%', 
              padding: '2px 6px', 
              fontSize: '0.75rem', 
              fontWeight: 'bold',
              marginLeft: '4px'
            }}>
              {cartItemCount}
            </span>
          )}
        </Link>
        <Link to="/admin-dashboard" className="nav-link" title="Espace Administrateur">
          <User size={18} />
        </Link>
      </div>
    </nav>
  );
}
