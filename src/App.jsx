import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Intro from './Intro.jsx';
import Home from './Home.jsx';
import DesignGallery from './DesignGallery.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/home" element={<Home />} />
      {/* Both /gallery and specific tools go to the unified gallery */}
      <Route path="/gallery" element={<DesignGallery />} />
      <Route path="/photoshop" element={<DesignGallery />} />
      <Route path="/figma" element={<DesignGallery />} />
      <Route path="/canva" element={<DesignGallery />} />
      <Route path="/coreldraw" element={<DesignGallery />} />
    </Routes>
  );
}

export default App;