import React, { useEffect, useRef, Suspense } from 'react';
import Spline from '@splinetool/react-spline';
import TechBackground from './TechBackground';

// Clean hero: one centered token, static by default. Spins only when user scrolls.
export default function Hero() {
  const coinRef = useRef(null);
  const angleRef = useRef(0);
  const lastYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const rafRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastYRef.current; // positive when scrolling down
      lastYRef.current = y;

      // Map scroll delta to rotation degrees with gentle sensitivity
      angleRef.current -= dy * 0.35; // down scroll spins clockwise, up spins counter
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = 0;
          const angle = angleRef.current;
          if (coinRef.current) {
            coinRef.current.style.transform = `perspective(1200px) rotateX(8deg) rotateY(${angle}deg)`;
          }
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-[140vh] w-full bg-black overflow-hidden">
      {/* Subtle, techy background */}
      <TechBackground />

      <div className="sticky top-0 flex h-screen w-full items-center justify-center">
        <div
          ref={coinRef}
          className="relative aspect-square w-[min(58vmin,520px)] max-w-[86vw] will-change-transform"
          style={{ transform: 'perspective(1200px) rotateX(8deg) rotateY(0deg)', transformStyle: 'preserve-3d' }}
        >
          {/* Soft aura that never blocks interaction */}
          <div className="pointer-events-none absolute -inset-14 rounded-full bg-emerald-400/10 blur-[88px]" />

          {/* Token surface - single Spline, fills container */}
          <div className="absolute inset-0 overflow-hidden rounded-full shadow-[0_30px_100px_-20px_rgba(0,255,200,0.25)]">
            <Suspense fallback={<div className="h-full w-full bg-black" />}> 
              <Spline scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Gentle radial vignette to avoid \"peephole\" look */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,190,0.06)_0%,rgba(0,0,0,0.0)_42%,rgba(0,0,0,0.55)_100%)]" />
      </div>
    </section>
  );
}
