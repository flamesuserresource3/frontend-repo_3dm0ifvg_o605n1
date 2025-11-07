import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isMobile;
}

// Lightweight starfield canvas (dynamic density for mobile)
const Starfield = ({ density = 5000 }) => {
  const isMobile = useIsMobile();
  const stars = useMemo(() => {
    const count = isMobile ? Math.min(500, Math.floor(density / 10)) : density;
    const arr = new Array(count).fill(0).map(() => ({
      x: Math.random(),
      y: Math.random(),
      s: Math.random() * 1.2 + 0.2,
      sp: Math.random() * 0.4 + 0.1,
    }));
    return arr;
  }, [density, isMobile]);

  useEffect(() => {
    const canvas = document.getElementById('starfield-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      frame += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const x = star.x * canvas.width;
        let y = (star.y * canvas.height + frame * star.sp) % canvas.height;
        ctx.globalAlpha = 0.6 + Math.sin((i + frame * 0.02)) * 0.2;
        ctx.fillRect(x, y, star.s, star.s);
      }
      requestAnimationFrame(render);
    };

    const id = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(id);
    };
  }, [stars]);

  return (
    <canvas
      id="starfield-canvas"
      className="absolute inset-0 w-full h-full"
      aria-hidden
    />
  );
};

export default function Hero() {
  const [phase, setPhase] = useState('line1');

  useEffect(() => {
    const t = setTimeout(() => setPhase('line2'), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <Starfield density={5000} />

      <div className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full" />}> 
          <Spline
            scene="https://prod.spline.design/N8g2VNcx8Rycz93J/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </Suspense>
      </div>

      {/* Color glow overlays (non-blocking) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      {/* Text overlay */}
      <div className="relative z-10 flex h-screen w-full items-center justify-center px-6">
        <div className="text-center select-none">
          <AnimatePresence mode="wait">
            {phase === 'line1' ? (
              <motion.h1
                key="l1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
              >
                If you can own it
              </motion.h1>
            ) : (
              <motion.h1
                key="l2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
              >
                You can tokenize it
              </motion.h1>
            )}
          </AnimatePresence>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-4 text-sm sm:text-base text-white/70"
          >
            Web3 products, AI systems, and tokenized experiences.
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="h-10 w-6 rounded-full border border-white/40 flex items-start justify-center p-1"
        >
          <span className="block h-2 w-1 rounded-full bg-white/70" />
        </motion.div>
      </div>
    </section>
  );
}
