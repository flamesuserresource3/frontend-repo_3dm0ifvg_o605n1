import React, { useEffect, useRef } from 'react';
import { Rocket, Code, Palette, Search, Bot, Cog } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tilt } from './Tilt';

gsap.registerPlugin(ScrollTrigger);

const items = [
  { title: 'DApps', icon: Rocket, desc: 'Smart, secure, and scalable decentralized products.' },
  { title: 'Apps', icon: Cog, desc: 'iOS, Android, and desktop experiences that delight.' },
  { title: 'Websites', icon: Palette, desc: 'High-performance websites with cinematic polish.' },
  { title: 'Tokenization', icon: Search, desc: 'RWAs, fractional ownership, and on-chain liquidity.' },
  { title: 'AI Agents', icon: Bot, desc: 'Autonomous systems that reason, plan, and act.' },
  { title: 'Automation', icon: Code, desc: 'Data pipelines and integrations that scale operations.' },
];

export default function WhatWeBuild() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.service-card');
      gsap.from(cards, {
        x: (i) => (i % 2 === 0 ? -60 : 60),
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-[80vh] bg-[#070711] text-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">What We Build</h2>
          <p className="text-white/60 mt-3 max-w-2xl mx-auto">From tokenized assets to AI-driven platforms, we design and ship products end-to-end.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ title, icon: Icon, desc }) => (
            <Tilt key={title} className="service-card">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl hover:shadow-cyan-500/20 transition">
                <div className="h-10 w-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,240,255,0.25)]">
                  <Icon className="text-cyan-300" size={20} />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-white/70 mt-2 text-sm">{desc}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
