import { useState, useEffect } from 'react';
import apiClient from '../api/client';
import { Package, ShoppingBag } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    // In a real app we might have a dedicated dashboard endpoint
    // For now we'll fetch both to get counts
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          apiClient.get('products/'),
          apiClient.get('orders/')
        ]);
        
        const products = productsRes.data;
        const orders = ordersRes.data;
        
        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          pendingOrders: orders.filter(o => o.status === 'PENDING').length
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1>Bienvenue chez ChocoTrack</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Aperçu de l'activité de votre pâtisserie.
      </p>

      <div className="grid-cards" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-cream)', borderRadius: '12px' }}>
            <Package size={32} color="var(--accent-caramel)" />
          </div>
          <div>
            <h3 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Produits au catalogue</h3>
            <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'var(--font-serif)' }}>{stats.totalProducts}</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-cream)', borderRadius: '12px' }}>
            <ShoppingBag size={32} color="var(--accent-caramel)" />
          </div>
          <div>
            <h3 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Commandes Totales</h3>
            <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'var(--font-serif)' }}>{stats.totalOrders}</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #D4A373' }}>
          <div>
            <h3 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Commandes en attente</h3>
            <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'var(--font-serif)' }}>{stats.pendingOrders}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
