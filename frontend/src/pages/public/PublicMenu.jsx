import { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { useCart } from '../../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function PublicMenu() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('products/');
        // Ne garder que les produits disponibles et en stock
        setProducts(response.data.filter(p => p.is_available && p.stock > 0));
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--accent-caramel)' }}>Notre Carte</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Commandez vos pâtisseries préférées en quelques clics.</p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Chargement des délices...</p>
      ) : (
        <div className="grid-cards">
          {products.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Aucun produit disponible pour le moment.</p>
          ) : (
            products.map(product => (
              <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '200px', backgroundColor: '#F0EBE1', borderRadius: '12px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Placeholder for product image */}
                  <span style={{ fontSize: '4rem' }}>🍰</span>
                </div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>{product.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>
                  {product.description || 'Une délicieuse création de la maison.'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.4rem', color: 'var(--text-dark)' }}>
                    {product.price} €
                  </span>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => addToCart(product)}
                    style={{ padding: '0.5rem 1rem' }}
                  >
                    <ShoppingCart size={18} /> Ajouter
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
