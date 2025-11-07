import React from 'react';
import { motion } from 'framer-motion';

const FadePanel = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ amount: 0.6, once: true }}
    transition={{ duration: 0.8, delay }}
    className="flex h-screen items-center justify-center px-6"
  >
    <div className="text-center">
      {children}
    </div>
  </motion.div>
);

export default function TextSequence() {
  return (
    <section className="relative w-full bg-black text-white">
      <FadePanel>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          If you can own it
        </h2>
      </FadePanel>

      <FadePanel delay={0.1}>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          You can tokenize it
        </h2>
      </FadePanel>
    </section>
  );
}
