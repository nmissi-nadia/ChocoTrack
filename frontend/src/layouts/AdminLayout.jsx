import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function AdminLayout() {
  return (
    <div className="app-container" style={{ background: '#F8F9FA' }}>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
