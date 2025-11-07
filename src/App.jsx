import React, { useEffect } from 'react';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import WhatWeBuild from './components/WhatWeBuild';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    // Smooth scrolling for internal links
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <FeaturedProjects />
      <WhatWeBuild />
      <Process />
      {/* Services deep dive sections could be added in subsequent iteration with media-heavy assets */}
      <Contact />
      <Footer />
    </div>
  );
}
