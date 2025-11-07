import React, { Suspense, useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

// Sticky, scroll-reactive hero that shows only the 3D coin cover
export default function Hero() {
  const [progress, setProgress] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight; // the scrollable distance inside wrapper
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Map scroll progress to a subtle 3D-like spin (rotate the canvas for performance safety)
  const rotateY = progress * 540; // degrees across the pin duration

  return (
    // Wrapper is taller than the viewport so the inner sticky panel stays fixed for a while
    <section ref={wrapperRef} className="relative h-[180vh] w-full bg-black overflow-visible">
      <div className="sticky top-0 h-screen w-full">
        <div
          className="relative h-full w-full will-change-transform"
          style={{ transform: `perspective(1200px) rotateY(${rotateY}deg)`, transformStyle: 'preserve-3d' }}
        >
          <Suspense fallback={<div className="w-full h-full bg-black" />}> 
            <Spline
              scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
          </Suspense>

          {/* Non-blocking soft glows for depth; won't interfere with Spline interactions */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
