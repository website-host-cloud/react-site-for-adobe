import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- IMPORT YOUR LOCAL PHOTO HERE ---
// Replace 'your-photo.jpg' with your actual image filename
import myProfilePhoto from './assets/me.jpeg'; 

const GITHUB_USER = "website-host-cloud"; 
const REPO_NAME = "Designer";         

// Mapped array to handle Display Name vs exact GitHub Folder Name
const CATEGORIES = [
  { display: 'Photoshop', folder: 'Photoshop' }, // Change folder to 'photoshop' if lowercase on GitHub
  { display: 'Figma', folder: 'Figma' },
  { display: 'Canva', folder: 'Canva' },
  { display: 'CorelDraw', folder: 'Coreldraw' }
];

function Home() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null); // Track rate limits/errors
  
  // Set default category
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  
  // Stats state
  const [stats, setStats] = useState({ Photoshop: 0, Figma: 0, Canva: 0, Coreldraw: 0 });

  // 1. Fetch current category designs
  useEffect(() => {
    const fetchDesigns = async () => {
      setLoading(true);
      setApiError(null);
      try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/contents/${activeCategory.folder}`);
        const data = await response.json();

        // Check for GitHub API Rate Limiting
        if (data.message && data.message.includes("rate limit")) {
           setApiError("GitHub API Rate Limit reached. Please wait a bit.");
           setDesigns([]);
        } else if (Array.isArray(data)) {
          const imageFiles = data.filter(file => /\.(jpe?g|png|gif|svg|webp)$/i.test(file.name));
          setDesigns(imageFiles);
        } else {
          setDesigns([]);
        }
      } catch (error) {
        console.error("Error fetching designs:", error);
        setApiError("Network error. Could not fetch designs.");
        setDesigns([]);
      }
      setLoading(false);
    };

    fetchDesigns();
  }, [activeCategory]);

  // 2. Fetch Category Counts on initial load
  useEffect(() => {
    const fetchInitialData = async () => {
      const newStats = { Photoshop: 0, Figma: 0, Canva: 0, Coreldraw: 0 };
      
      await Promise.all(CATEGORIES.map(async (cat) => {
        try {
          const res = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/contents/${cat.folder}`);
          const data = await res.json();
          if (Array.isArray(data)) {
            newStats[cat.folder] = data.filter(file => /\.(jpe?g|png|gif|svg|webp)$/i.test(file.name)).length;
          }
        } catch(e) { 
          console.error(`Error fetching count for ${cat.display}`, e); 
        }
      }));
      
      // Only update if we didn't get blocked by rate limits (indicated by 0 across the board if empty)
      setStats(newStats);
    };

    fetchInitialData();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Playfair+Display:wght@700&display=swap');

        /* --- GLOBAL SETUP (Fixes Horizontal Shift) --- */
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        html, body { width: 100%; max-width: 100vw; background-color: #05020a; color: white; overflow-x: hidden; }
        
        .page-wrapper { position: relative; width: 100%; min-height: 100vh; padding-bottom: 5rem; overflow-x: hidden; }

        /* --- AMBIENT BG --- */
        .glow-orb { position: absolute; border-radius: 50%; filter: blur(140px); opacity: 0.3; z-index: 0; pointer-events: none; }
        .orb-orange { width: 500px; height: 500px; background: #ff5e00; top: 10%; left: -10%; }
        .orb-purple { width: 600px; height: 600px; background: #9d00ff; bottom: 10%; right: -10%; }
        .grid-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 30px 30px; z-index: 1; pointer-events: none; }

        /* --- NAVBAR --- */
        .navbar { position: sticky; top: 0; z-index: 100; display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 5%; backdrop-filter: blur(15px); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .nav-logo { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: white; text-decoration: none; }
        
        .nav-center { display: flex; gap: 0.5rem; background: rgba(255, 255, 255, 0.03); padding: 0.4rem; border-radius: 50px; border: 1px solid rgba(255,255,255,0.1); }
        .cat-btn { padding: 0.6rem 1.4rem; border-radius: 50px; border: none; background: transparent; color: rgba(255,255,255,0.5); cursor: pointer; transition: 0.3s; font-size: 0.85rem; }
        .cat-btn.active { background: white; color: black; font-weight: 600; }

        /* --- HERO --- */
        .hero { position: relative; z-index: 10; text-align: center; margin: 5rem 0; }
        .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 6vw, 5rem); line-height: 1.1; margin-bottom: 1rem; }
        
        /* --- MASONRY GALLERY --- */
        .gallery-section { position: relative; z-index: 10; max-width: 1400px; margin: 0 auto; padding: 0 5%; min-height: 300px; }
        .image-grid { columns: 3; column-gap: 1.5rem; }
        
        @media (max-width: 1024px) { .image-grid { columns: 2; } }
        @media (max-width: 768px) { .image-grid { columns: 1; } }
        
        .design-card { position: relative; border-radius: 20px; overflow: hidden; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1.5rem; break-inside: avoid; transition: 0.4s ease; }
        .design-card:hover { transform: translateY(-8px); border-color: #ff5e00; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        
        .design-card img { width: 100%; height: auto; display: block; transition: 0.5s; }
        .design-card:hover img { transform: scale(1.03); }

        .card-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 1.5rem; background: linear-gradient(transparent, rgba(0,0,0,0.9)); opacity: 0; transition: 0.3s; }
        .design-card:hover .card-info { opacity: 1; }

        /* --- LOADING SHIMMER --- */
        .shimmer { height: 300px; background: linear-gradient(90deg, #0a0a0a 25%, #1a1a1a 50%, #0a0a0a 75%); background-size: 200% 100%; animation: loading 1.5s infinite; margin-bottom: 1.5rem; border-radius: 20px; }
        @keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        /* --- ABOUT SECTION --- */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; }
        .stat-item h4 { font-size: 2rem; color: white; }
        .stat-item p { font-size: 0.7rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1px; margin-top: 5px;}

        @media (max-width: 850px) { .nav-center { display: none; } .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; } }
      `}</style>

      <div className="page-wrapper">
        <div className="glow-orb orb-orange"></div>
        <div className="glow-orb orb-purple"></div>
        <div className="grid-overlay"></div>

        <nav className="navbar">
          <Link to="/" className="nav-logo">KK.</Link>
          <div className="nav-center">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat.display} 
                className={`cat-btn ${activeCategory.display === cat.display ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.display}
              </button>
            ))}
          </div>
          <a href="#about" className="cat-btn active" style={{textDecoration: 'none'}}>Let's Talk</a>
        </nav>

        <header className="hero">
          <p style={{color: '#ff5e00', letterSpacing: '0.4em', fontSize: '0.75rem', marginBottom: '1rem'}}>LATEST CREATIONS</p>
          <h1>Visualizing Ideas.<br/>Engineering Reality.</h1>
        </header>

        <main className="gallery-section">
          {loading ? (
            <div className="image-grid">
              {[1, 2, 3].map(n => <div key={n} className="shimmer"></div>)}
            </div>
          ) : (
            <>
              {apiError && (
                 <div style={{textAlign: 'center', padding: '2rem', color: '#ff5e00', border: '1px solid #ff5e00', borderRadius: '10px', marginBottom: '2rem'}}>
                    <p>{apiError}</p>
                 </div>
              )}
              
              <div className="image-grid">
                {designs.map((file, index) => (
                  <div key={index} className="design-card">
                    <img src={file.download_url} alt={file.name} loading="lazy" />
                    <div className="card-info">
                      <p style={{fontSize: '0.9rem', fontWeight: '600'}}>{file.name.replace(/\.[^/.]+$/, "")}</p>
                      <a href={file.html_url} target="_blank" rel="noreferrer" style={{color: '#ff5e00', fontSize: '0.75rem', textDecoration: 'none'}}>View Source →</a>
                    </div>
                  </div>
                ))}
              </div>

              {!apiError && designs.length === 0 && (
                <div style={{textAlign: 'center', padding: '5rem', opacity: 0.5}}>
                  <p>No designs found in the "{activeCategory.folder}" folder.</p>
                </div>
              )}
            </>
          )}
        </main>

        {/* Bio Section */}
        <section id="about" style={{maxWidth: '1200px', margin: '10rem auto 0', padding: '0 5%', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 10}}>
           
           {/* Text & Stats */}
           <div style={{flex: 1, minWidth: '300px'}}>
              <h3 style={{color: '#ff5e00', fontSize: '0.9rem', marginBottom: '1rem', letterSpacing: '2px', textTransform: 'uppercase'}}>About Me</h3>
              <h2 style={{fontFamily: 'Playfair Display', fontSize: '3.5rem', marginBottom: '1.5rem'}}>Kishore Kalash</h2>
              <p style={{lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: '1rem'}}>
                Bridging the gap between high-end UI/UX design and advanced cybersecurity. 
                As the Co-Founder of Eemon X, I focus on building digital experiences 
                that are as secure as they are beautiful.
              </p>
              
              {/* Dynamic GitHub Stats */}
              <div className="stats-grid">
                 <div className="stat-item"><h4>{stats.Photoshop || 0}</h4><p>Photoshop</p></div>
                 <div className="stat-item"><h4>{stats.Figma || 0}</h4><p>Figma</p></div>
                 <div className="stat-item"><h4>{stats.Canva || 0}</h4><p>Canva</p></div>
                 <div className="stat-item"><h4>{stats.Coreldraw || 0}</h4><p>CorelDraw</p></div>
              </div>
           </div>

           {/* Profile Picture Frame (Fixed Cropping) */}
           <div style={{
               flex: 1, 
               minWidth: '300px', 
               background: 'rgba(255,255,255,0.03)', 
               borderRadius: '30px', 
               border: '1px solid rgba(255,255,255,0.1)', 
               overflow: 'hidden',
               boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
               display: 'flex',
               /* Removed fixed height to allow image to scale naturally */
           }}>
              <img 
                src={myProfilePhoto} 
                alt="Kishore Kalash" 
                style={{ 
                  width: '100%', 
                  height: 'auto', /* Allows image to retain natural aspect ratio */
                  display: 'block' 
                }} 
              />
           </div>
        </section>
      </div>
    </>
  );
}

export default Home;