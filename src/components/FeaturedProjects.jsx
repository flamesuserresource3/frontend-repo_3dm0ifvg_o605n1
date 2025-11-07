import React, { useEffect, useRef } from 'react';
import { Tilt } from './Tilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { name: 'Citadelle.city', tagline: 'RWA Tokenization', tags: ['DApp', 'Web3', 'RWA'], color: 'from-cyan-400 to-purple-500' },
  { name: 'Fracta.city', tagline: 'Fractional Real Estate', tags: ['DApp', 'Tokenization'], color: 'from-emerald-400 to-cyan-400' },
  { name: 'Escrutinio Electoral', tagline: 'Gov Transparency', tags: ['Government', 'Web App'], color: 'from-amber-400 to-pink-500' },
  { name: 'Foodlabs', tagline: 'Crypto Food Delivery', tags: ['App', 'Crypto', 'Fintech'], color: 'from-red-400 to-orange-500' },
  { name: 'Vulcanox', tagline: 'Next-Gen Software', tags: ['Software', 'Innovation'], color: 'from-indigo-400 to-fuchsia-500' },
];

const ProjectCard = ({ item, idx }) => (
  <Tilt className="w-[420px] max-w-[90vw]">
    <div
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl shadow-cyan-500/5 hover:shadow-cyan-500/20 transition will-change-transform">
      <div className={`h-1.5 w-24 rounded-full bg-gradient-to-r ${item.color} mb-4`} />
      <h3 className="text-2xl font-semibold">{item.name}</h3>
      <p className="text-white/70 mt-1">{item.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">
            {t}
          </span>
        ))}
      </div>
    </div>
  </Tilt>
);

export default function FeaturedProjects() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.fp-card');
      cards.forEach((card, i) => {
        const speed = 0.5 + i * 0.15;
        gsap.fromTo(
          card,
          { x: 200 + i * 60, y: 200 + i * 40, rotate: 8 - i * 3, opacity: 0 },
          {
            x: -200 + i * 30,
            y: -80 - i * 30,
            rotate: -8 + i * 2,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );

        // Curved arc upward
        gsap.to(card, {
          y: `-=${80 + i * 20}`,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'center center',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Parallax speed
        gsap.to(card, {
          xPercent: -20 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[120vh] w-full overflow-hidden bg-gradient-to-b from-black via-black to-[#070711] flex items-center">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.08),transparent_60%)]" />
      <div className="container mx-auto px-6">
        <div className="relative grid gap-10">
          {projects.map((p, i) => (
            <div key={p.name} className="fp-card">
              <ProjectCard item={p} idx={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
