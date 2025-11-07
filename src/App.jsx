import React, { useEffect } from 'react';
import Hero from './components/Hero';
import TextSequence from './components/TextSequence';
import FeaturedProjects from './components/FeaturedProjects';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Centered, single-token hero with scroll-driven spin */}
      <Hero />

      {/* Sequential message reveal */}
      <TextSequence />

      {/* Featured projects grid */}
      <FeaturedProjects />

      {/* Footer */}
      <Footer />
    </div>
  );
}
