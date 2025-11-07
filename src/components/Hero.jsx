import React, { Suspense, useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

// Centered, single-token hero: sticky section with scroll-driven spin
export default function Hero() {
  const [progress, setProgress] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
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

  // Elegant spin: 0 -> 360deg over the pin, slight X tilt for depth
  const rotateY = progress * 360;
  const rotateX = 8; // constant subtle tilt

  return (
    <section ref={wrapperRef} className="relative h-[150vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        {/* Token container: centered and responsively sized */}
        <div
          className="relative aspect-square w-[min(60vmin,520px)] max-w-[85vw] will-change-transform"
          style={{
            transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/6 to-white/0 blur-sm pointer-events-none" />
          <div className="absolute -inset-6 rounded-full bg-yellow-400/5 blur-3xl pointer-events-none" />

          <div className="absolute inset-0 rounded-full overflow-hidden shadow-[0_30px_120px_-20px_rgba(255,215,0,0.25)]">
            <Suspense fallback={<div className="w-full h-full bg-black" />}>
              <Spline
                scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode"
                style={{ width: '100%', height: '100%' }}
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Background embellishments that do not block the Spline */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-10 left-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 h-80 w-80 translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>
    </section>
  );
}
