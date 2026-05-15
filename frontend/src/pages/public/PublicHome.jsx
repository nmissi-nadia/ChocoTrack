import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PublicHome() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(rgba(62, 39, 35, 0.6), rgba(62, 39, 35, 0.6)), url("https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80") center/cover', 
        color: 'white', 
        padding: '6rem 2rem', 
        borderRadius: '24px',
        textAlign: 'center',
        marginBottom: '4rem'
      }}>
        <h1 style={{ color: 'white', fontSize: '3.5rem', marginBottom: '1rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          L'Art de la Pâtisserie
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem', opacity: 0.9 }}>
          Découvrez nos créations uniques, préparées chaque jour avec passion et des ingrédients d'exception.
        </p>
        <Link to="/menu" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
          Voir notre Carte <ChevronRight size={20} />
        </Link>
      </section>

      {/* About Section */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--accent-caramel)' }}>Notre Histoire</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            ChocoTrack est né de la passion pour le chocolat et la pâtisserie fine. Chaque gâteau raconte une histoire, chaque bouchée est une expérience.
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            Nous sélectionnons rigoureusement nos fèves de cacao et nos ingrédients pour vous offrir des saveurs authentiques et inoubliables.
          </p>
        </div>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Pâtisseries ChocoTrack" 
            style={{ width: '100%', borderRadius: '24px', boxShadow: 'var(--shadow-md)' }}
          />
        </div>
      </section>
    </div>
  );
}
