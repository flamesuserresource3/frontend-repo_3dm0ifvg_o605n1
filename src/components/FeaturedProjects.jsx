import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from './Tilt';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'DeFi Wallet OS',
    desc: 'Hardware-grade security, zero-friction UX.',
  },
  {
    title: 'Tokenized Realty',
    desc: 'Fractional ownership with instant liquidity.',
  },
  {
    title: 'AI Market Maker',
    desc: 'Autonomous pricing and risk engines.',
  },
];

export default function FeaturedProjects() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.proj-card');
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          rotateX: -8,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
          delay: i * 0.1,
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-black text-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h3 className="text-2xl sm:text-4xl font-bold mb-12">Featured Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Tilt key={p.title}>
              <div className="proj-card rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h4 className="text-xl font-semibold">{p.title}</h4>
                <p className="text-white/70 mt-2">{p.desc}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
