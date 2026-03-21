'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const PARTICLE_COUNT = 50;
    const CONNECT_DISTANCE = 130;
    const MOUSE_RADIUS = 180;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    }

    function initParticles() {
      if (!canvas) return;
      const particles: Particle[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x, y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.8,
          alpha: Math.random() * 0.4 + 0.15,
        });
      }
      particlesRef.current = particles;
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const scrollY = window.scrollY;
      const mouseAbsY = mouse.y + scrollY;

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;

        const dx = p.baseX - p.x;
        const dy = p.baseY - p.y;
        p.vx += dx * 0.0005;
        p.vy += dy * 0.0005;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouseAbsY;
        const dist = Math.sqrt(mdx * mdx + mdy * mdy);
        const nearMouse = dist < MOUSE_RADIUS && dist > 0;

        if (nearMouse) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (mdx / dist) * force * 0.6;
          p.vy += (mdy / dist) * force * 0.6;
        }

        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Neon glow — outer halo
        const glowAlpha = nearMouse
          ? p.alpha * 1.5 * ((MOUSE_RADIUS - dist) / MOUSE_RADIUS + 0.5)
          : p.alpha * 0.4;
        const glowSize = nearMouse ? p.size * 6 : p.size * 4;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
        gradient.addColorStop(0, `rgba(139, 92, 246, ${glowAlpha})`);
        gradient.addColorStop(0.4, `rgba(139, 92, 246, ${glowAlpha * 0.3})`);
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = nearMouse
          ? `rgba(196, 167, 255, ${Math.min(p.alpha * 2.5, 0.9)})`
          : `rgba(139, 92, 246, ${p.alpha})`;
        ctx.fill();
      }

      // Connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DISTANCE) {
            const lineAlpha = (1 - dist / CONNECT_DISTANCE) * 0.08;
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      if (canvas) {
        canvas.height = document.documentElement.scrollHeight;
      }
    });
    resizeObserver.observe(document.body);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
