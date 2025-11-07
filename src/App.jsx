import React, { useEffect } from 'react';
import Hero from './components/Hero';
import TextSequence from './components/TextSequence';
import FeaturedProjects from './components/FeaturedProjects';

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 1) Fullscreen 3D cover that spins as you scroll, no text overlay */}
      <Hero />

      {/* 2) After some scroll, present the two-line message sequentially */}
      <TextSequence />

      {/* 3) Teaser projects (we'll refine next) */}
      <FeaturedProjects />
    </div>
  );
}
