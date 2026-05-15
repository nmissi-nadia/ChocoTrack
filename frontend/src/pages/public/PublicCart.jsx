import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import apiClient from '../../api/client';
import { Trash2, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PublicCart() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!customerName || cart.length === 0) return;

    setLoading(true);
    try {
      const orderData = {
        customer_name: customerName,
        items: cart.map(item => ({
          product: item.product.id,
          quantity: item.quantity
        }))
      };

      await apiClient.post('orders/', orderData);
      setSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Erreur lors de la commande:", error);
      alert("Une erreur est survenue lors de la commande.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <CheckCircle size={64} color="var(--accent-caramel)" style={{ margin: '0 auto 1rem' }} />
        <h1 style={{ marginBottom: '1rem' }}>Commande confirmée !</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Merci {customerName}. Votre commande est en cours de préparation.
        </p>
        <Link to="/menu" className="btn btn-primary">Retour à la carte</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>Votre Panier</h1>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '1.5rem' }}>Votre panier est désespérément vide.</p>
          <Link to="/menu" className="btn btn-primary">Découvrir nos pâtisseries</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem', alignItems: 'start' }}>
          {/* Cart Items */}
          <div>
            {cart.map(item => (
              <div key={item.product.id} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem 0', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: '#F0EBE1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                  🍰
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem' }}>{item.product.name}</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>{item.product.price} € / unité</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-light)', borderRadius: '99px', overflow: 'hidden' }}>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} style={{ border: 'none', background: 'none', padding: '0.25rem 0.75rem', cursor: 'pointer' }}>-</button>
                    <span style={{ padding: '0 0.5rem', fontWeight: '500' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ border: 'none', background: 'none', padding: '0.25rem 0.75rem', cursor: 'pointer' }}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} style={{ border: 'none', background: 'none', color: '#dc3545', cursor: 'pointer', padding: '0.5rem' }}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Form */}
          <div className="card" style={{ position: 'sticky', top: '100px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Résumé</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Sous-total</span>
              <span>{cartTotal.toFixed(2)} €</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.4rem', fontWeight: 'bold' }}>
              <span>Total</span>
              <span style={{ color: 'var(--accent-caramel)' }}>{cartTotal.toFixed(2)} €</span>
            </div>

            <form onSubmit={handleSubmitOrder}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Votre Nom</label>
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Jean Dupont"
                  required
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', fontFamily: 'var(--font-sans)' }}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading || !customerName}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {loading ? 'Traitement...' : <>Valider la commande <ArrowRight size={18} /></>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
