import React, { useEffect, useRef, Suspense } from 'react';
import Spline from '@splinetool/react-spline';

// Ultra-clean, single token that spins exactly with your scroll direction
export default function Hero() {
  const sectionRef = useRef(null);
  const coinRef = useRef(null);
  const angleRef = useRef(0);
  const lastYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const rafRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastYRef.current; // positive when scrolling down
      lastYRef.current = y;

      // Map scroll delta to rotation degrees. Small multiplier for tight control.
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
    <section ref={sectionRef} className="relative h-[140vh] w-full bg-black">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center">
        <div
          ref={coinRef}
          className="relative aspect-square w-[min(58vmin,520px)] max-w-[86vw] will-change-transform"
          style={{ transform: 'perspective(1200px) rotateX(8deg) rotateY(0deg)', transformStyle: 'preserve-3d' }}
        >
          {/* Soft, subtle aura that never blocks interaction */}
          <div className="pointer-events-none absolute -inset-10 rounded-full bg-white/3 blur-[64px]" />

          {/* Token surface */}
          <div className="absolute inset-0 overflow-hidden rounded-full shadow-[0_30px_100px_-20px_rgba(255,255,255,0.15)]">
            <Suspense fallback={<div className="h-full w-full bg-black" />}> 
              <Spline scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Gentle background accents, do not interfere with Spline */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-16 h-40 w-40 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute bottom-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>
    </section>
  );
}
