import React from 'react';

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0e] text-white/70 py-8 text-sm">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© 2024 TokenizeTheWorld.xyz</p>
        <nav className="flex gap-4">
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">GitHub</a>
          <a href="#" className="hover:text-white">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
