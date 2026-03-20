import React from 'react';
import { Link } from 'react-router-dom';

// --- IMPORTING YOUR CUSTOM SVG ICONS FOR BG ANIMATION ---
import iconCorel from './assets/coreldraw-icon.svg';
import iconCanva from './assets/canva-icon.svg';
import iconFigma from './assets/figma-icon.svg';
import iconAdobe from './assets/adobe-photoshop-icon.svg';

function Home() {
  return (
    <>
      <style>{`
        /* --- GLOBAL SETUP --- */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body, html { width: 100%; min-height: 100vh; background-color: #05020a; color: white; overflow-x: hidden; scroll-behavior: smooth; }
        
        .page-wrapper { position: relative; width: 100%; min-height: 100vh; overflow: hidden; padding-bottom: 5rem; }

        /* --- AMBIENT NEON GLOWS --- */
        .glow-orb { position: absolute; border-radius: 50%; filter: blur(140px); opacity: 0.4; z-index: 0; pointer-events: none; }
        .orb-orange { width: 600px; height: 600px; background: #ff5e00; top: 10%; left: -10%; }
        .orb-purple { width: 700px; height: 700px; background: #9d00ff; top: 40%; right: -15%; }
        
        .grid-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 30px 30px; z-index: 1; pointer-events: none;
        }

        /* --- FLOATING BG ICONS --- */
        .floating-bg {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          z-index: 2; pointer-events: none; overflow: hidden;
        }
        .float-item {
          position: absolute; width: 60px; height: 60px;
          opacity: 0.1; filter: grayscale(100%) invert(1);
          animation: floatUp 20s linear infinite;
        }
        .fi-1 { left: 10%; animation-delay: 0s; }
        .fi-2 { left: 30%; animation-delay: 5s; animation-duration: 25s; }
        .fi-3 { left: 70%; animation-delay: 2s; animation-duration: 18s; }
        .fi-4 { left: 90%; animation-delay: 8s; }

        @keyframes floatUp {
          0% { transform: translateY(110vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.1; }
          90% { opacity: 0.1; }
          100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
        }

        /* --- NAVBAR --- */
        .navbar {
          position: sticky; top: 0; z-index: 100;
          display: grid; grid-template-columns: 1fr auto 1fr; 
          align-items: center; padding: 1.5rem 5%; background: transparent; 
        }
        .nav-logo { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; text-decoration: none; color: white; }
        .nav-center {
          display: flex; gap: 2rem; background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.7rem 2.2rem; 
          border-radius: 50px; backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
        }
        .nav-center a { color: rgba(255, 255, 255, 0.6); text-decoration: none; font-size: 0.95rem; transition: 0.3s; }
        .nav-center a:hover { color: #ffffff; text-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
        .nav-right { display: flex; justify-content: flex-end; align-items: center; gap: 1.5rem; }
        .contact-btn { background: white; color: black; padding: 0.6rem 1.6rem; border-radius: 50px; text-decoration: none; font-weight: 600; transition: 0.3s; }
        .contact-btn:hover { transform: scale(1.05); }

        /* --- HERO --- */
        .hero { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; text-align: center; margin-top: 6rem; }
        .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 7vw, 6rem); font-weight: 700; background: linear-gradient(to right, #fff, #a3a3a3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        /* --- ABOUT --- */
        .about-section { position: relative; z-index: 10; max-width: 1200px; margin: 10rem auto 5rem; padding: 0 5%; display: grid; grid-template-columns: 1fr 1.5fr; gap: 5rem; align-items: center; }
        .profile-container { position: relative; width: 100%; aspect-ratio: 4/5; border-radius: 30px; }
        .profile-container::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 30px; background: linear-gradient(135deg, rgba(255,94,0,0.5), rgba(157,0,255,0.5)); filter: blur(25px); opacity: 0.5; z-index: -1; }
        .profile-frame { width: 100%; height: 100%; border-radius: 20px; background: rgba(10, 5, 20, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px); display: flex; justify-content: center; align-items: center; }
        
        .bio-content { padding: 2rem; }
        .bio-content h2 { font-family: 'Playfair Display', serif; font-size: 3.5rem; margin-bottom: 0.5rem; }
        .bio-content h3 { font-size: 1rem; color: #ff5e00; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.5rem; }
        .bio-text { color: rgba(255, 255, 255, 0.7); line-height: 1.8; margin-bottom: 2rem; }

        /* --- SOCIAL LINKS --- */
        .social-links { display: flex; gap: 1.5rem; margin-bottom: 2.5rem; }
        .social-link { color: rgba(255, 255, 255, 0.4); text-decoration: none; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; transition: 0.3s; border-bottom: 1px solid transparent; padding-bottom: 2px; }
        .social-link:hover { color: white; border-color: #ff5e00; }

        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 2rem; }
        .stat-item h4 { font-size: 2.2rem; color: white; }
        .stat-item p { font-size: 0.75rem; color: rgba(255, 255, 255, 0.5); text-transform: uppercase; }

        @media (max-width: 1000px) { .navbar { grid-template-columns: 1fr 1fr; } .nav-center { display: none; } .about-section { grid-template-columns: 1fr; } }
      `}</style>

      <div className="page-wrapper">
        <div className="glow-orb orb-orange"></div>
        <div className="glow-orb orb-purple"></div>
        <div className="grid-overlay"></div>

        {/* FLOATING BACKGROUND ICONS */}
        <div className="floating-bg">
          <img src={iconAdobe} className="float-item fi-1" alt="" />
          <img src={iconFigma} className="float-item fi-2" alt="" />
          <img src={iconCanva} className="float-item fi-3" alt="" />
          <img src={iconCorel} className="float-item fi-4" alt="" />
        </div>

        <nav className="navbar">
          <div className="nav-left"><Link to="/" className="nav-logo">KK.</Link></div>
          <div className="nav-center">
            <Link to="/photoshop">Photoshop</Link>
            <Link to="/figma">Figma</Link>
            <Link to="/canva">Canva</Link>
            <Link to="/coreldraw">CorelDraw</Link>
          </div>
          <div className="nav-right">
            <a href="#about" className="resume-btn" style={{color: 'rgba(255,255,255,0.6)', textDecoration: 'none'}}>About</a>
            <a href="#contact" className="contact-btn">Let's Talk</a>
          </div>
        </nav>

        <header className="hero">
          <div style={{opacity: 0.6, fontSize: '0.8rem', letterSpacing: '0.4em', marginBottom: '1rem'}}>PORTFOLIO OVERVIEW</div>
          <h1>Visualizing Ideas.<br />Engineering Reality.</h1>
        </header>

        <section id="about" className="about-section">
          <div className="profile-container">
            <div className="profile-frame">
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>[ Photo Placeholder ]</span>
            </div>
          </div>

          <div className="bio-content">
            <h3>Lead Designer & Developer</h3>
            <h2>Kishore Kalash</h2>
            <p className="bio-text">
              Bridging the gap between high-end UI/UX design and advanced cybersecurity. 
              As the Co-Founder of eemonx, I focus on building digital experiences 
              that are as secure as they are beautiful.
            </p>

            {/* NEW SOCIAL LINKS SECTION */}
            <div className="social-links">
              <a href="https://linkedin.com/in/YOUR_USERNAME" target="_blank" className="social-link">LinkedIn</a>
              <a href="https://github.com/YOUR_USERNAME" target="_blank" className="social-link">GitHub</a>
              <a href="https://instagram.com/YOUR_USERNAME" target="_blank" className="social-link">Instagram</a>
              <a href="#" className="social-link">Portfolio</a>
            </div>
            
            <div className="stats-grid">
              <div className="stat-item"><h4>03+</h4><p>Years</p></div>
              <div className="stat-item"><h4>50+</h4><p>Projects</p></div>
              <div className="stat-item"><h4>100%</h4><p>Security</p></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;