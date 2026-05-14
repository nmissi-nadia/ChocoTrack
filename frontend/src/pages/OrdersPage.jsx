import { useState, useEffect } from 'react';
import apiClient from '../api/client';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get('orders/');
        setOrders(response.data);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING': return <span className="badge pending">En attente</span>;
      case 'PREPARING': return <span className="badge preparing">En préparation</span>;
      case 'COMPLETED': return <span className="badge completed">Terminée</span>;
      case 'CANCELLED': return <span className="badge cancelled">Annulée</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Commandes</h1>

      {loading ? (
        <p>Chargement des commandes...</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Client</th>
                <th>Date</th>
                <th>Total</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>Aucune commande.</td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: '500' }}>#{order.id}</td>
                    <td>{order.customer_name}</td>
                    <td>{new Date(order.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                    <td style={{ fontWeight: 'bold' }}>{order.total_price} €</td>
                    <td>{getStatusBadge(order.status)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
