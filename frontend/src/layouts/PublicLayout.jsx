import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';

export default function PublicLayout() {
  return (
    <div className="app-container">
      <PublicNavbar />
      <main className="main-content" style={{ padding: 0, maxWidth: '100%' }}>
        <Outlet />
      </main>
      <footer style={{ background: 'var(--bg-card)', padding: '2rem', textAlign: 'center', borderTop: '1px solid var(--border-light)', marginTop: 'auto' }}>
        <p style={{ color: 'var(--text-muted)' }}>&copy; {new Date().getFullYear()} ChocoTrack - L'art de la pâtisserie. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
