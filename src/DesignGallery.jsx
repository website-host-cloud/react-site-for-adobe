// CRITICAL: You must import useEffect and useState like this
import React, { useEffect, useState } from 'react'; 
import { client, getOptimizedImage } from './contentfulClient';
import { Link } from 'react-router-dom';

function DesignGallery() {
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const filters = ['all', 'photoshop', 'figma', 'canva', 'coreldraw'];

  useEffect(() => {
    // This fetches data from Contentful
    client.getEntries({ 
      content_type: 'project' // Ensure this matches your "Content Type ID" exactly
    })
    .then((response) => {
      console.log("Data Received:", response.items);
      setAllProjects(response.items);
      setFilteredProjects(response.items);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Contentful Error:", err);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(allProjects);
    } else {
      const filtered = allProjects.filter(p => 
        p.fields.tool?.toLowerCase() === activeFilter
      );
      setFilteredProjects(filtered);
    }
  }, [activeFilter, allProjects]);

  return (
    <div style={styles.container}>
      <style>{`
        .filter-btn { transition: all 0.4s ease; border: 1px solid rgba(255,255,255,0.1); }
        .filter-btn.active { 
          background: #ffffff !important; 
          color: #000000 !important; 
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
        }
        .project-card { transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); cursor: pointer; }
        .project-card:hover { transform: translateY(-10px); }
        .project-card:hover img { transform: scale(1.1); filter: brightness(0.5); }
        .project-card:hover .overlay { opacity: 1 !important; transform: translateY(0) !important; }
        
        .loader {
          width: 40px; height: 40px; border: 3px solid rgba(255,255,255,0.1);
          border-top: 3px solid #ff5e00; border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <nav style={styles.nav}>
        <Link to="/home" style={styles.backBtn}>← RETURN</Link>
        <div style={styles.header}>
          <h2 style={styles.title}>Design Gallery</h2>
          <p style={styles.tagline}>{filteredProjects.length} Projects Loaded</p>
        </div>
      </nav>

      <div style={styles.filterBar}>
        {filters.map(f => (
          <button 
            key={f} 
            className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
            style={styles.filterBtn}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={styles.center}><div className="loader"></div></div>
      ) : (
        <div style={styles.grid}>
          {filteredProjects.map((project) => (
            <div key={project.sys.id} className="project-card" style={styles.card}>
              <div style={styles.imageBox}>
                {project.fields.mainImage?.fields?.file?.url ? (
                  <img 
                    src={getOptimizedImage(project.fields.mainImage.fields.file.url)} 
                    alt={project.fields.title} 
                    style={styles.img} 
                  />
                ) : (
                  <div style={styles.noImg}>No Image Asset</div>
                )}
                
                <div className="overlay" style={styles.overlay}>
                  <span style={styles.badge}>{project.fields.tool}</span>
                  <h3 style={styles.cardTitle}>{project.fields.title}</h3>
                  <p style={styles.cardDesc}>{project.fields.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredProjects.length === 0 && (
        <div style={styles.center}>
          <p style={{opacity: 0.4}}>No entries found in Contentful for "{activeFilter}".</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#05020a', color: 'white', padding: '4rem 6%' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' },
  backBtn: { color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em' },
  header: { textAlign: 'right' },
  title: { fontFamily: 'Playfair Display', fontSize: '3rem' },
  tagline: { fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)', marginTop: '5px' },
  filterBar: { display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '5rem', position: 'sticky', top: '2rem', zIndex: 100 },
  filterBtn: { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', padding: '10px 25px', borderRadius: '50px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold', backdropFilter: 'blur(10px)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2.5rem' },
  card: { borderRadius: '24px', overflow: 'hidden', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)' },
  imageBox: { position: 'relative', width: '100%', height: '450px', overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.8s ease' },
  noImg: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#333' },
  overlay: { position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '2.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', opacity: 0, transition: 'all 0.5s ease', transform: 'translateY(20px)' },
  badge: { background: '#ff5e00', padding: '4px 12px', borderRadius: '50px', fontSize: '0.6rem', fontWeight: 'bold', marginBottom: '10px', display: 'inline-block' },
  cardTitle: { fontSize: '1.8rem', fontFamily: 'Playfair Display', marginBottom: '5px' },
  cardDesc: { fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' },
  center: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }
};

export default DesignGallery;