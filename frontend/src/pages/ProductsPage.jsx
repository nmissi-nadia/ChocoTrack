import { useState, useEffect } from 'react';
import apiClient from '../api/client';
import { Plus } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('products/');
        setProducts(response.data);
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Nos Pâtisseries</h1>
        <button className="btn btn-primary">
          <Plus size={18} /> Ajouter un produit
        </button>
      </div>

      {loading ? (
        <p>Chargement des produits...</p>
      ) : (
        <div className="grid-cards">
          {products.length === 0 ? (
            <p>Aucun produit trouvé.</p>
          ) : (
            products.map(product => (
              <div key={product.id} className="card">
                <h3 style={{ marginBottom: '0.5rem' }}>{product.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', height: '40px', overflow: 'hidden' }}>
                  {product.description || 'Aucune description.'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--accent-hover)' }}>
                    {product.price} €
                  </span>
                  <span style={{ fontSize: '0.85rem', color: product.stock > 0 ? 'var(--text-muted)' : '#dc3545' }}>
                    {product.stock > 0 ? `En stock: ${product.stock}` : 'Rupture'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
