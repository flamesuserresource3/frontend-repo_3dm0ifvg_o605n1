import React, { useEffect, useRef } from 'react';

// Lightweight Matrix-style background using canvas. GPU-friendly and subtle by default.
export default function TechBackground({ opacity = 0.12, speed = 0.8, density = 0.9 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const colsRef = useRef([]);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });

    let dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas.parentElement || document.body;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Recalculate columns
      const fontSize = 14; // px
      const cols = Math.ceil(w / fontSize);
      colsRef.current = new Array(cols).fill(0).map((_, i) => ({
        x: i * fontSize,
        y: Math.random() * h,
        speed: (0.5 + Math.random()) * speed,
      }));
      ctx.font = `${fontSize}px "IBM Plex Sans", ui-monospace, SFMono-Regular, monospace`;
    };

    const draw = (time) => {
      const { clientWidth: w, clientHeight: h } = canvas.parentElement || document.body;
      // Fade canvas slightly to create trailing effect
      ctx.fillStyle = `rgba(0,0,0,${Math.min(0.12 + (1 - density) * 0.2, 0.3)})`;
      ctx.fillRect(0, 0, w, h);

      // Glow grid lines (very subtle)
      ctx.strokeStyle = `rgba(0, 255, 200, ${opacity * 0.35})`;
      ctx.lineWidth = 1;
      const grid = 64;
      for (let x = 0; x < w; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Matrix rain characters
      ctx.fillStyle = `rgba(0,255,160,${opacity})`;
      const chars = '01∀∴∑ΞΞ≡░▒▓©¤§☰';
      const fontSize = 14;
      ctx.font = `${fontSize}px "IBM Plex Sans", ui-monospace, SFMono-Regular, monospace`;

      colsRef.current.forEach((c) => {
        const ch = chars[(Math.random() * chars.length) | 0];
        ctx.fillText(ch, c.x, c.y);
        c.y += c.speed + (Math.sin((tRef.current + c.x) * 0.002) + 1) * 0.5;
        if (c.y > h + 20) c.y = -20;
      });

      tRef.current = time;
      rafRef.current = requestAnimationFrame(draw);
    };

    const onResize = () => {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      resize();
    };

    resize();
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [opacity, speed, density]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 block w-full h-full"
      aria-hidden
    />
  );
}
