import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import videoSource from './assets/bg.mp4'; 

// --- IMPORTING YOUR CUSTOM SVG ICONS ---
import iconCorel from './assets/coreldraw-icon.svg';
import iconCanva from './assets/canva-icon.svg';
import iconFigma from './assets/figma-icon.svg';
import iconAdobe from './assets/adobe-photoshop-icon.svg';

function Intro() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // --- NAVIGATION LOGIC ---
  const handleWheel = (e) => {
    if (e.deltaY > 20 && !isTransitioning) {
      triggerNavigation();
    }
  };

  let touchStartY = 0;
  const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
  const handleTouchMove = (e) => {
    if (touchStartY - e.touches[0].clientY > 30 && !isTransitioning) {
      triggerNavigation();
    }
  };

  const triggerNavigation = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/home');
    }, 800);
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body, html, #root { width: 100%; height: 100%; background-color: #000; overflow: hidden; }
        
        .intro-section {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #000;
          transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
        }

        .page-fade-out {
          opacity: 0;
          transform: translateY(-50px);
        }
        
        .background-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          opacity: 0.3; /* Darkened slightly so background icons pop */
        }

        /* --- FLOATING BACKGROUND ICONS --- */
        .floating-bg-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          pointer-events: none; /* Stops them from blocking clicks */
          overflow: hidden;
        }

        .float-icon {
          position: absolute;
          bottom: -100px;
          width: 80px;
          height: 80px;
          opacity: 0;
          filter: grayscale(100%) opacity(0.15); /* Makes them subtle and premium */
          animation: floatUpBg 15s linear infinite;
        }

        /* Different starting positions and delays for the background floaters */
        .float-1 { left: 15%; animation-delay: 1s; animation-duration: 18s; }
        .float-2 { left: 45%; animation-delay: 6s; animation-duration: 14s; }
        .float-3 { left: 75%; animation-delay: 2s; animation-duration: 20s; }
        .float-4 { left: 85%; animation-delay: 10s; animation-duration: 16s; }
        
        .overlay-content {
          position: relative;
          z-index: 3;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .title-name {
          font-family: 'Playfair Display', serif;
          background: linear-gradient(to right, #ffffff 20%, #888888 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: clamp(2.5rem, 6vw, 6rem); 
          font-weight: 700;
          margin-bottom: 0.5rem;
          opacity: 0;
          filter: drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.8));
          animation: cinematicExpand 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          animation-delay: 0.2s;
        }
        
        .title-role {
          font-family: 'Montserrat', sans-serif;
          color: rgba(255, 255, 255, 0.7);
          font-size: clamp(0.7rem, 2vw, 1.2rem);
          letter-spacing: 0.5em;
          font-weight: 300;
          text-transform: uppercase;
          opacity: 0;
          animation: fadeUp 1.5s ease-out forwards;
          animation-delay: 1.2s;
        }

        /* --- THE GLASS DOCK --- */
        .glass-dock {
          margin-top: 2.5rem;
          padding: 1rem 2.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50px; 
          backdrop-filter: blur(12px); 
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          gap: 2.5rem;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
          opacity: 0;
          animation: fadeUp 1s ease-out forwards;
          animation-delay: 2s; 
          overflow: hidden; 
        }
        
        /* UPDATED: FOR SVG IMAGES */
        .design-icon {
          width: 35px; /* Size of the SVG in the dock */
          height: 35px;
          object-fit: contain;
          cursor: pointer;
          filter: grayscale(30%) brightness(0.8);
          
          /* The rapid rise and hold from the bottom */
          opacity: 0;
          animation: logoRise 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; 
          
          transition: all 0.3s ease-in-out;
        }
        
        .design-icon:hover {
          filter: grayscale(0%) brightness(1.2); /* Colors pop on hover! */
          transform: translateY(-6px) scale(1.15);
          filter: drop-shadow(0px 10px 12px rgba(255, 255, 255, 0.4));
        }

        .scroll-container {
          position: absolute;
          bottom: 30px;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          opacity: 0;
          animation: fadeIn 1s ease forwards 4s;
          cursor: pointer;
        }

        .scroll-mouse {
          width: 26px;
          height: 42px;
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          display: flex;
          justify-content: center;
          padding-top: 6px;
        }

        .scroll-wheel {
          width: 4px;
          height: 8px;
          background-color: white;
          border-radius: 2px;
          animation: scrollBounce 2s infinite;
        }

        .scroll-text {
          font-family: 'Montserrat', sans-serif;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          animation: pulseText 2s infinite;
        }
        
        /* --- KEYFRAMES --- */
        @keyframes cinematicExpand {
          0% { transform: scale(1.1); filter: blur(15px); letter-spacing: -0.05em; opacity: 0; }
          100% { transform: scale(1); filter: blur(0px); letter-spacing: 0.15em; opacity: 1; }
        }
        
        @keyframes fadeUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes fadeIn { to { opacity: 1; } }

        @keyframes scrollBounce {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(15px); opacity: 0; }
        }

        @keyframes pulseText {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }

        /* Glass Dock Logo Rise */
        @keyframes logoRise {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        /* Background Floating Animation */
        @keyframes floatUpBg {
          0% { transform: translateY(100vh) rotate(0deg) scale(0.8); opacity: 0; }
          10% { opacity: 0.15; }
          90% { opacity: 0.15; }
          100% { transform: translateY(-20vh) rotate(360deg) scale(1.2); opacity: 0; }
        }
      `}</style>

      <section 
        className={`intro-section ${isTransitioning ? 'page-fade-out' : ''}`}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* 1. BACKGROUND VIDEO */}
        <video autoPlay loop muted playsInline className="background-video">
          <source src={videoSource} type="video/mp4" />
        </video>

        {/* 2. FLOATING BACKGROUND ICONS */}
        <div className="floating-bg-container">
          <img src={iconAdobe} className="float-icon float-1" alt="" />
          <img src={iconFigma} className="float-icon float-2" alt="" />
          <img src={iconCanva} className="float-icon float-3" alt="" />
          <img src={iconCorel} className="float-icon float-4" alt="" />
        </div>

        {/* 3. MAIN CONTENT */}
        <div className="overlay-content">
          <h1 className="title-name">KISHORE KALASH</h1>
          <p className="title-role">DESIGNER & DEVELOPER</p>
          
          {/* THE GLASS DOCK WITH CUSTOM SVGS */}
          <div className="glass-dock">
            <img src={iconAdobe} className="design-icon" style={{ animationDelay: '2.4s' }} alt="Adobe" />
            <img src={iconFigma} className="design-icon" style={{ animationDelay: '2.6s' }} alt="Figma" />
            <img src={iconCanva} className="design-icon" style={{ animationDelay: '2.8s' }} alt="Canva" />
            <img src={iconCorel} className="design-icon" style={{ animationDelay: '3.0s' }} alt="CorelDraw" />
          </div>
        </div>

        {/* 4. SCROLL TO NAVIGATE */}
        <div className="scroll-container" onClick={triggerNavigation}>
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span className="scroll-text">SCROLL DOWN</span>
        </div>
      </section>
    </>
  );
}

export default Intro;