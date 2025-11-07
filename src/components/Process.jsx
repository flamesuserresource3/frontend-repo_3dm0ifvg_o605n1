import React, { useEffect, useRef } from 'react';
import { Search, Palette, Code, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { title: 'Discover', icon: Search, desc: 'Research, insight, and alignment.' },
  { title: 'Design', icon: Palette, desc: 'Experience, visuals, and motion.' },
  { title: 'Develop', icon: Code, desc: 'Robust systems and integrations.' },
  { title: 'Deploy', icon: Rocket, desc: 'Launch, observe, and iterate.' },
];

export default function Process() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.process-item');
      gsap.from(items, {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });

      // draw lines
      const line = ref.current.querySelector('.line');
      gsap.fromTo(line, { scaleX: 0 }, {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'top 40%', scrub: true },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-[80vh] bg-black text-white py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">Process</h2>
          <p className="text-white/60 mt-3 max-w-2xl mx-auto">A clear path from idea to impact.</p>
        </div>
        <div className="relative">
          <div className="line absolute top-8 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400/60 to-purple-500/60 scale-x-0" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
            {steps.map(({ title, icon: Icon, desc }) => (
              <div key={title} className="process-item relative z-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center">
                <div className="mx-auto h-12 w-12 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-4">
                  <Icon className="text-cyan-300" size={22} />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-white/70 text-sm mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
