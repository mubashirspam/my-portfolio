'use client';

import { useState, useEffect, useRef, useCallback, type ReactNode, type JSX } from 'react';

// ─── Helper ───
function PreviewWrapper({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative w-full h-full overflow-hidden rounded-xl ${className}`}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════
// GAMES
// ═══════════════════════════════════════════

function SnakePreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = 10;
    let snake = [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }];
    let food = { x: 12, y: 8 };
    let dir = { x: 1, y: 0 };
    const cols = Math.floor(canvas.width / size);
    const rows = Math.floor(canvas.height / size);

    const interval = setInterval(() => {
      const head = { x: (snake[0].x + dir.x + cols) % cols, y: (snake[0].y + dir.y + rows) % rows };
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
      } else {
        snake.pop();
      }
      // Auto-turn toward food
      if (Math.random() < 0.3) {
        const dx = food.x - head.x;
        const dy = food.y - head.y;
        if (Math.abs(dx) > Math.abs(dy)) dir = { x: dx > 0 ? 1 : -1, y: 0 };
        else dir = { x: 0, y: dy > 0 ? 1 : -1 };
      }

      ctx.fillStyle = '#0a0b14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Grid lines
      ctx.strokeStyle = 'rgba(124,58,237,0.08)';
      for (let i = 0; i < cols; i++) {
        ctx.beginPath(); ctx.moveTo(i * size, 0); ctx.lineTo(i * size, canvas.height); ctx.stroke();
      }
      for (let i = 0; i < rows; i++) {
        ctx.beginPath(); ctx.moveTo(0, i * size); ctx.lineTo(canvas.width, i * size); ctx.stroke();
      }
      // Snake
      snake.forEach((s, i) => {
        const alpha = 1 - i * 0.06;
        ctx.fillStyle = `rgba(124,58,237,${Math.max(0.3, alpha)})`;
        ctx.fillRect(s.x * size + 1, s.y * size + 1, size - 2, size - 2);
      });
      // Food
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(food.x * size + size / 2, food.y * size + size / 2, size / 2 - 1, 0, Math.PI * 2);
      ctx.fill();
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <PreviewWrapper>
      <canvas ref={canvasRef} width={200} height={150} className="w-full h-full" />
    </PreviewWrapper>
  );
}

function PuzzlePreview() {
  const tiles = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4, 2, 8, 16, 0];
  const colors: Record<number, string> = {
    0: 'rgba(148,163,184,0.1)', 2: '#eee4da', 4: '#ede0c8', 8: '#f2b179',
    16: '#f59563', 32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72',
    256: '#edcc61', 512: '#edc850', 1024: '#edc53f', 2048: '#edc22e',
  };
  return (
    <PreviewWrapper>
      <div className="grid grid-cols-4 gap-1 p-2 h-full bg-[#bbada0] rounded-xl">
        {tiles.map((t, i) => (
          <div key={i} className="rounded-md flex items-center justify-center font-bold text-xs"
            style={{ backgroundColor: colors[t] || '#cdc1b4', color: t > 4 ? '#fff' : '#776e65', animation: t === 2048 ? 'fp-pulse 1.5s infinite' : undefined }}>
            {t > 0 ? t : ''}
          </div>
        ))}
      </div>
    </PreviewWrapper>
  );
}

function FlappyPreview() {
  const [birdY, setBirdY] = useState(50);
  const frameRef = useRef(0);

  useEffect(() => {
    let y = 50;
    let vy = 0;
    const interval = setInterval(() => {
      vy += 0.5;
      y += vy;
      if (y > 85) { y = 50; vy = -4; }
      if (y < 10) { vy = 1; }
      if (frameRef.current % 40 === 0) vy = -4;
      frameRef.current++;
      setBirdY(y);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <PreviewWrapper className="bg-gradient-to-b from-sky-400 to-sky-200">
      {/* Pipes */}
      {[30, 65].map((x, i) => (
        <div key={i} className="absolute" style={{
          left: `${x}%`, top: 0, bottom: 0, width: '12%',
          animation: 'fp-pipe-scroll 3s linear infinite',
          animationDelay: `${i * -1.5}s`,
        }}>
          <div className="absolute top-0 w-full bg-green-500 rounded-b-md" style={{ height: `${25 + i * 15}%` }} />
          <div className="absolute bottom-0 w-full bg-green-500 rounded-t-md" style={{ height: `${35 - i * 10}%` }} />
        </div>
      ))}
      {/* Bird */}
      <div className="absolute w-5 h-4 rounded-full bg-yellow-400 border-2 border-yellow-600 transition-all duration-100"
        style={{ left: '25%', top: `${birdY}%`, transform: `rotate(${Math.min(30, Math.max(-30, birdY - 50))}deg)` }}>
        <div className="absolute -right-1 top-0.5 w-2 h-1.5 bg-orange-400 rounded-r" />
      </div>
      {/* Ground */}
      <div className="absolute bottom-0 w-full h-[8%] bg-yellow-700" />
    </PreviewWrapper>
  );
}

function MemoryPreview() {
  const [flipped, setFlipped] = useState<number[]>([]);
  const icons = ['★', '♦', '♣', '♥', '★', '♦', '♣', '♥'];

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setFlipped(prev => {
        if (prev.length >= 4) return [idx % 8];
        return [...prev, idx % 8];
      });
      idx++;
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <PreviewWrapper>
      <div className="grid grid-cols-4 gap-1.5 p-2 h-full">
        {icons.map((icon, i) => (
          <div key={i} className="rounded-lg flex items-center justify-center text-lg font-bold transition-all duration-500"
            style={{
              backgroundColor: flipped.includes(i) ? 'rgba(124,58,237,0.15)' : 'rgba(148,163,184,0.15)',
              transform: flipped.includes(i) ? 'rotateY(0deg)' : 'rotateY(180deg)',
              color: flipped.includes(i) ? 'var(--accent-color)' : 'transparent',
              border: '1px solid rgba(148,163,184,0.2)',
            }}>
            {icon}
          </div>
        ))}
      </div>
    </PreviewWrapper>
  );
}

function BrickPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let ballX = 100, ballY = 100, dx = 2, dy = -2;
    const paddleW = 50;
    let paddleX = 75;
    let paddleDir = 1;
    const bricks: { x: number; y: number; alive: boolean; color: string }[] = [];
    const colors = ['#f43f5e', '#f97316', '#eab308', '#22c55e', '#3b82f6'];
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 6; c++)
        bricks.push({ x: c * 33 + 2, y: r * 14 + 10, alive: true, color: colors[r % 5] });

    const interval = setInterval(() => {
      ballX += dx; ballY += dy;
      if (ballX <= 4 || ballX >= 196) dx = -dx;
      if (ballY <= 4) dy = -dy;
      if (ballY >= 135 && ballX >= paddleX && ballX <= paddleX + paddleW) dy = -dy;
      if (ballY >= 150) { ballY = 100; dy = -2; }
      paddleX += paddleDir * 1.5;
      if (paddleX <= 0 || paddleX >= 150) paddleDir *= -1;
      bricks.forEach(b => {
        if (b.alive && ballX >= b.x && ballX <= b.x + 31 && ballY >= b.y && ballY <= b.y + 12) {
          b.alive = false; dy = -dy;
        }
      });
      if (bricks.every(b => !b.alive)) {
        bricks.forEach(b => b.alive = true);
      }

      ctx.fillStyle = '#0a0b14';
      ctx.fillRect(0, 0, 200, 150);
      bricks.forEach(b => {
        if (!b.alive) return;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, 31, 12);
      });
      ctx.fillStyle = '#7c3aed';
      ctx.fillRect(paddleX, 140, paddleW, 6);
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(ballX, ballY, 4, 0, Math.PI * 2);
      ctx.fill();
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <PreviewWrapper>
      <canvas ref={canvasRef} width={200} height={150} className="w-full h-full" />
    </PreviewWrapper>
  );
}

function TicTacPreview() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const stepRef = useRef(0);

  useEffect(() => {
    const moves = [4, 0, 2, 6, 1, 3, 7, 5, 8];
    const interval = setInterval(() => {
      setBoard(prev => {
        if (stepRef.current >= moves.length) {
          stepRef.current = 0;
          return Array(9).fill(null);
        }
        const next = [...prev];
        next[moves[stepRef.current]] = stepRef.current % 2 === 0 ? 'X' : 'O';
        stepRef.current++;
        return next;
      });
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <PreviewWrapper>
      <div className="grid grid-cols-3 gap-1 p-3 h-full">
        {board.map((cell, i) => (
          <div key={i} className="rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-300"
            style={{
              border: '1px solid rgba(148,163,184,0.2)',
              backgroundColor: cell ? 'rgba(124,58,237,0.08)' : 'transparent',
              color: cell === 'X' ? 'var(--accent-color)' : '#f43f5e',
            }}>
            {cell}
          </div>
        ))}
      </div>
    </PreviewWrapper>
  );
}

function WhackPreview() {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(Math.floor(Math.random() * 6));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <PreviewWrapper>
      <div className="grid grid-cols-3 gap-2 p-3 h-full items-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center justify-end">
            <div className="text-xl transition-all duration-200"
              style={{ transform: active === i ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0)', opacity: active === i ? 1 : 0 }}>
              🐹
            </div>
            <div className="w-full h-3 bg-amber-800 rounded-full mt-1" />
          </div>
        ))}
      </div>
    </PreviewWrapper>
  );
}

function ColorTapPreview() {
  const colors = ['#f43f5e', '#3b82f6', '#22c55e', '#eab308'];
  const [target, setTarget] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTarget(Math.floor(Math.random() * 4));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <PreviewWrapper>
      <div className="flex flex-col items-center justify-center h-full gap-3 p-3">
        <p className="text-[10px] text-muted-foreground font-medium">TAP THIS COLOR</p>
        <div className="w-8 h-8 rounded-full transition-colors duration-300 shadow-lg" style={{ backgroundColor: colors[target] }} />
        <div className="flex gap-2">
          {colors.map((c, i) => (
            <div key={i} className="w-6 h-6 rounded-lg cursor-pointer transition-transform hover:scale-110"
              style={{ backgroundColor: c, boxShadow: i === target ? '0 0 10px ' + c : undefined }} />
          ))}
        </div>
      </div>
    </PreviewWrapper>
  );
}

// ═══════════════════════════════════════════
// 3D & ANIMATION
// ═══════════════════════════════════════════

function CubePreview() {
  return (
    <PreviewWrapper>
      <div className="w-full h-full flex items-center justify-center" style={{ perspective: '300px' }}>
        <div className="relative" style={{
          width: 60, height: 60,
          transformStyle: 'preserve-3d',
          animation: 'fp-cube-rotate 4s linear infinite',
        }}>
          {[
            { transform: 'translateZ(30px)', bg: 'rgba(124,58,237,0.7)' },
            { transform: 'rotateY(180deg) translateZ(30px)', bg: 'rgba(59,130,246,0.7)' },
            { transform: 'rotateY(90deg) translateZ(30px)', bg: 'rgba(34,197,94,0.7)' },
            { transform: 'rotateY(-90deg) translateZ(30px)', bg: 'rgba(244,63,94,0.7)' },
            { transform: 'rotateX(90deg) translateZ(30px)', bg: 'rgba(234,179,8,0.7)' },
            { transform: 'rotateX(-90deg) translateZ(30px)', bg: 'rgba(168,85,247,0.7)' },
          ].map((face, i) => (
            <div key={i} className="absolute inset-0 border border-white/30 rounded-md backdrop-blur-sm"
              style={{ transform: face.transform, backgroundColor: face.bg }} />
          ))}
        </div>
      </div>
    </PreviewWrapper>
  );
}

function ParticlePreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    type P = { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number };
    let particles: P[] = [];
    let frame = 0;

    function burst(cx: number, cy: number) {
      const hue = Math.random() * 360;
      for (let i = 0; i < 40; i++) {
        const angle = (Math.PI * 2 * i) / 40 + Math.random() * 0.3;
        const speed = 1 + Math.random() * 3;
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color: `hsl(${(hue + i * 8) % 360}, 80%, 60%)`,
          size: 1.5 + Math.random() * 2,
        });
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(10,11,20,0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.life -= 0.015;
        if (p.life > 0) {
          ctx!.globalAlpha = p.life;
          ctx!.fillStyle = p.color;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx!.fill();
        }
      });
      ctx.globalAlpha = 1;
      particles = particles.filter(p => p.life > 0);
      if (frame % 80 === 0) burst(40 + Math.random() * 120, 30 + Math.random() * 80);
      frame++;
      requestAnimationFrame(animate);
    }
    burst(100, 75);
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <PreviewWrapper>
      <canvas ref={canvasRef} width={200} height={150} className="w-full h-full" />
    </PreviewWrapper>
  );
}

function LiquidPreview() {
  return (
    <PreviewWrapper>
      <div className="flex items-center justify-center h-full">
        <div className="relative w-16 h-16 rounded-full border-2 border-blue-400/50 overflow-hidden">
          <div className="absolute bottom-0 w-full bg-blue-400/80" style={{
            height: '65%', animation: 'fp-wave 2s ease-in-out infinite',
            borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%',
          }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-blue-300">65%</span>
          </div>
        </div>
      </div>
    </PreviewWrapper>
  );
}

function OrbitPreview() {
  return (
    <PreviewWrapper>
      <div className="flex items-center justify-center h-full">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white shadow-lg shadow-white/50" />
          </div>
          {[
            { size: '100%', color: 'cyan', dur: '3s', delay: '0s' },
            { size: '75%', color: '#a855f7', dur: '2.5s', delay: '-0.5s' },
            { size: '50%', color: '#f43f5e', dur: '2s', delay: '-1s' },
          ].map((ring, i) => (
            <div key={i} className="absolute rounded-full border"
              style={{
                width: ring.size, height: ring.size,
                top: `${(100 - parseFloat(ring.size)) / 2}%`,
                left: `${(100 - parseFloat(ring.size)) / 2}%`,
                borderColor: ring.color,
                boxShadow: `0 0 10px ${ring.color}, inset 0 0 10px ${ring.color}`,
                opacity: 0.6,
                animation: `fp-orbit ${ring.dur} linear infinite`,
                animationDelay: ring.delay,
              }}>
              <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: ring.color, boxShadow: `0 0 8px ${ring.color}` }} />
            </div>
          ))}
        </div>
      </div>
    </PreviewWrapper>
  );
}

function BlobPreview() {
  return (
    <PreviewWrapper>
      <div className="flex items-center justify-center h-full">
        <div style={{
          width: 80, height: 80,
          background: 'linear-gradient(135deg, #7c3aed, #3b82f6, #06b6d4)',
          animation: 'fp-blob-morph 4s ease-in-out infinite',
          filter: 'blur(0px)',
        }} />
      </div>
    </PreviewWrapper>
  );
}

function HoloPreview() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  return (
    <PreviewWrapper>
      <div ref={cardRef} className="w-full h-full flex items-center justify-center p-4" onMouseMove={handleMove}>
        <div className="w-full h-full rounded-xl relative overflow-hidden transition-transform duration-200"
          style={{
            transform: `perspective(400px) rotateY(${(pos.x - 0.5) * 20}deg) rotateX(${-(pos.y - 0.5) * 20}deg)`,
            background: `linear-gradient(${pos.x * 360}deg, #7c3aed, #3b82f6, #22c55e, #eab308, #f43f5e)`,
            boxShadow: '0 10px 40px rgba(124,58,237,0.3)',
          }}>
          <div className="absolute inset-0 rounded-xl"
            style={{
              background: `radial-gradient(circle at ${pos.x * 100}% ${pos.y * 100}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
            }} />
          <div className="relative z-10 flex items-center justify-center h-full">
            <span className="text-white font-bold text-sm tracking-widest drop-shadow-lg">HOLOGRAPHIC</span>
          </div>
        </div>
      </div>
    </PreviewWrapper>
  );
}

function FlipCardPreview() {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setIsFlipped(f => !f), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PreviewWrapper>
      <div className="flex items-center justify-center h-full" style={{ perspective: '400px' }}>
        <div className="relative w-20 h-28 transition-transform duration-700"
          style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)' }}>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex flex-col items-center justify-center gap-1 backface-hidden border border-white/20">
            <div className="text-2xl">💎</div>
            <span className="text-white text-[10px] font-bold">FLUTTER</span>
          </div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex flex-col items-center justify-center gap-1 border border-white/20"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <span className="text-white text-[10px] font-bold text-center px-2">Details &amp; Specs</span>
            <div className="text-lg">🔧</div>
          </div>
        </div>
      </div>
    </PreviewWrapper>
  );
}

function AuroraPreview() {
  return (
    <PreviewWrapper className="bg-[#0a0b14]">
      <div className="absolute inset-0">
        <div className="absolute rounded-full opacity-40 blur-2xl" style={{
          width: '60%', height: '60%', top: '10%', left: '10%',
          background: 'radial-gradient(circle, #7c3aed, transparent)',
          animation: 'fp-aurora-1 6s ease-in-out infinite',
        }} />
        <div className="absolute rounded-full opacity-30 blur-2xl" style={{
          width: '50%', height: '50%', bottom: '10%', right: '10%',
          background: 'radial-gradient(circle, #3b82f6, transparent)',
          animation: 'fp-aurora-2 5s ease-in-out infinite',
        }} />
        <div className="absolute rounded-full opacity-30 blur-2xl" style={{
          width: '40%', height: '40%', top: '30%', right: '30%',
          background: 'radial-gradient(circle, #22c55e, transparent)',
          animation: 'fp-aurora-3 7s ease-in-out infinite',
        }} />
      </div>
    </PreviewWrapper>
  );
}

// ═══════════════════════════════════════════
// UI EFFECTS
// ═══════════════════════════════════════════

function GlassPreview() {
  return (
    <PreviewWrapper className="bg-gradient-to-br from-violet-600 to-blue-500">
      <div className="absolute top-[-20%] right-[-10%] w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-20 h-20 rounded-full bg-white/10" />
      <div className="flex items-center justify-center h-full">
        <div className="w-[85%] rounded-xl p-3 backdrop-blur-md" style={{
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.25)',
        }}>
          <p className="text-white text-[10px] font-bold mb-2 text-center">Sign In</p>
          <div className="space-y-1.5">
            <div className="h-5 rounded-md bg-white/10 border border-white/20" />
            <div className="h-5 rounded-md bg-white/10 border border-white/20" />
            <div className="h-5 rounded-md bg-purple-400/60 flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">LOGIN</span>
            </div>
          </div>
        </div>
      </div>
    </PreviewWrapper>
  );
}

function NeuTogglePreview() {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setIsOn(v => !v), 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <PreviewWrapper>
      <div className="flex items-center justify-center h-full" style={{ backgroundColor: '#e0e5ec' }}>
        <div className="relative w-16 h-8 rounded-full transition-all duration-300 cursor-pointer"
          style={{
            backgroundColor: '#e0e5ec',
            boxShadow: isOn
              ? 'inset 3px 3px 6px #b8bec7, inset -3px -3px 6px #ffffff'
              : '3px 3px 6px #b8bec7, -3px -3px 6px #ffffff',
          }}
          onClick={() => setIsOn(!isOn)}>
          <div className="absolute top-1 w-6 h-6 rounded-full transition-all duration-300"
            style={{
              left: isOn ? '34px' : '2px',
              backgroundColor: isOn ? '#22c55e' : '#e0e5ec',
              boxShadow: '2px 2px 4px #b8bec7, -1px -1px 3px #ffffff',
            }} />
        </div>
      </div>
    </PreviewWrapper>
  );
}

function AnimNavPreview() {
  const [active, setActive] = useState(0);
  const icons = ['⌂', '⚲', '♥', '◉'];

  useEffect(() => {
    const interval = setInterval(() => setActive(a => (a + 1) % 4), 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <PreviewWrapper>
      <div className="flex flex-col justify-end h-full pb-2 px-2">
        <div className="flex justify-around items-center h-10 rounded-2xl bg-surface/90 border border-border backdrop-blur-sm">
          {icons.map((icon, i) => (
            <div key={i} className="flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: active === i ? 'rgba(124,58,237,0.15)' : 'transparent',
                color: active === i ? 'var(--accent-color)' : 'var(--muted-fg)',
              }}>
              <span className="text-sm">{icon}</span>
              {active === i && <span className="text-[8px] font-bold">{['Home', 'Find', 'Likes', 'Me'][i]}</span>}
            </div>
          ))}
        </div>
      </div>
    </PreviewWrapper>
  );
}

function ParallaxPreview() {
  return (
    <PreviewWrapper>
      <div className="relative h-full overflow-hidden">
        {[
          { color: 'from-blue-500/40 to-blue-600/40', y: '10%', speed: '4s' },
          { color: 'from-green-500/40 to-green-600/40', y: '35%', speed: '3s' },
          { color: 'from-orange-500/40 to-orange-600/40', y: '60%', speed: '5s' },
        ].map((layer, i) => (
          <div key={i} className={`absolute left-3 right-3 h-[28%] rounded-xl bg-gradient-to-r ${layer.color} backdrop-blur-sm border border-white/10`}
            style={{
              top: layer.y,
              animation: `fp-parallax-float ${layer.speed} ease-in-out infinite`,
              animationDelay: `${i * -0.7}s`,
            }}>
            <div className="p-2">
              <div className="w-8 h-1 rounded bg-white/30 mb-1" />
              <div className="w-12 h-1 rounded bg-white/20" />
            </div>
          </div>
        ))}
      </div>
    </PreviewWrapper>
  );
}

function TypewriterPreview() {
  const [text, setText] = useState('');
  const words = ['Flutter Dev', 'UI Engineer', 'Mobile Expert'];
  const wordRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = words[wordRef.current];
      if (!deletingRef.current) {
        charRef.current++;
        setText(current.substring(0, charRef.current));
        if (charRef.current >= current.length) {
          setTimeout(() => { deletingRef.current = true; }, 1000);
        }
      } else {
        charRef.current--;
        setText(current.substring(0, charRef.current));
        if (charRef.current <= 0) {
          deletingRef.current = false;
          wordRef.current = (wordRef.current + 1) % words.length;
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <PreviewWrapper>
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground mb-1">Hello, I&apos;m a</p>
          <p className="text-sm font-bold text-accent">
            {text}<span className="animate-pulse">|</span>
          </p>
        </div>
      </div>
    </PreviewWrapper>
  );
}

function ShimmerPreview() {
  return (
    <PreviewWrapper>
      <div className="p-3 space-y-2">
        <div className="h-16 rounded-lg" style={{ background: 'linear-gradient(90deg, rgba(148,163,184,0.1) 25%, rgba(148,163,184,0.2) 50%, rgba(148,163,184,0.1) 75%)', backgroundSize: '200% 100%', animation: 'fp-shimmer 1.5s infinite' }} />
        <div className="h-3 w-3/4 rounded" style={{ background: 'linear-gradient(90deg, rgba(148,163,184,0.1) 25%, rgba(148,163,184,0.2) 50%, rgba(148,163,184,0.1) 75%)', backgroundSize: '200% 100%', animation: 'fp-shimmer 1.5s infinite 0.2s' }} />
        <div className="h-3 w-1/2 rounded" style={{ background: 'linear-gradient(90deg, rgba(148,163,184,0.1) 25%, rgba(148,163,184,0.2) 50%, rgba(148,163,184,0.1) 75%)', backgroundSize: '200% 100%', animation: 'fp-shimmer 1.5s infinite 0.4s' }} />
        <div className="h-3 w-2/3 rounded" style={{ background: 'linear-gradient(90deg, rgba(148,163,184,0.1) 25%, rgba(148,163,184,0.2) 50%, rgba(148,163,184,0.1) 75%)', backgroundSize: '200% 100%', animation: 'fp-shimmer 1.5s infinite 0.6s' }} />
      </div>
    </PreviewWrapper>
  );
}

function RipplePreview() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = idRef.current++;
      setRipples(prev => [...prev.slice(-3), { id, x: 30 + Math.random() * 40, y: 30 + Math.random() * 40 }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 800);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PreviewWrapper>
      <div className="flex items-center justify-center h-full">
        <div className="relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 overflow-hidden cursor-pointer">
          <span className="relative z-10 text-white text-xs font-bold">Tap Me</span>
          {ripples.map(r => (
            <div key={r.id} className="absolute rounded-full bg-white/30"
              style={{
                left: `${r.x}%`, top: `${r.y}%`,
                width: 4, height: 4,
                transform: 'translate(-50%, -50%)',
                animation: 'fp-ripple 0.8s ease-out forwards',
              }} />
          ))}
        </div>
      </div>
    </PreviewWrapper>
  );
}

function GradientRevealPreview() {
  return (
    <PreviewWrapper>
      <div className="flex items-center justify-center h-full">
        <p className="text-sm font-extrabold text-center leading-tight px-3"
          style={{
            background: 'linear-gradient(90deg, var(--accent-color) 0%, #3b82f6 30%, #06b6d4 60%, rgba(148,163,184,0.3) 80%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'fp-gradient-sweep 3s ease-in-out infinite',
          }}>
          Flutter is Beautiful
        </p>
      </div>
    </PreviewWrapper>
  );
}

// ═══════════════════════════════════════════
// TOOLS & WIDGETS
// ═══════════════════════════════════════════

function BMIPreview() {
  const [angle, setAngle] = useState(-90);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(a => {
        const target = -90 + Math.random() * 180;
        return a + (target - a) * 0.1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const bmi = ((angle + 90) / 180 * 30 + 10).toFixed(1);

  return (
    <PreviewWrapper>
      <div className="flex flex-col items-center justify-center h-full gap-1">
        <svg width="80" height="50" viewBox="0 0 80 50">
          <path d="M 5 45 A 35 35 0 0 1 75 45" fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth="6" strokeLinecap="round" />
          <path d="M 5 45 A 35 35 0 0 1 75 45" fill="none" stroke="url(#bmiGrad)" strokeWidth="6" strokeLinecap="round"
            strokeDasharray="110" strokeDashoffset={110 - (parseFloat(bmi) - 10) / 30 * 110} />
          <defs>
            <linearGradient id="bmiGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          <line x1="40" y1="45" x2={40 + Math.cos((angle * Math.PI) / 180) * 28} y2={45 + Math.sin((angle * Math.PI) / 180) * 28}
            stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" style={{ transition: 'all 0.3s' }} />
          <circle cx="40" cy="45" r="3" fill="var(--accent-color)" />
        </svg>
        <span className="text-sm font-bold text-accent">{bmi}</span>
        <span className="text-[8px] text-muted-foreground">BMI</span>
      </div>
    </PreviewWrapper>
  );
}

function StopwatchPreview() {
  const [ms, setMs] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setMs(m => m + 30), 30);
    return () => clearInterval(interval);
  }, []);

  const fmt = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };

  return (
    <PreviewWrapper>
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <p className="text-lg font-bold font-mono text-accent tabular-nums">{fmt(ms)}</p>
        <div className="flex gap-1">
          {['Start', 'Lap', 'Reset'].map(label => (
            <span key={label} className="px-2 py-0.5 text-[8px] rounded-full bg-accent-subtle text-accent border border-accent font-bold">
              {label}
            </span>
          ))}
        </div>
      </div>
    </PreviewWrapper>
  );
}

function WeatherPreview() {
  return (
    <PreviewWrapper className="bg-gradient-to-br from-blue-400 to-sky-300">
      <div className="flex flex-col justify-between h-full p-3 text-white">
        <div className="flex items-center gap-0.5 text-[9px] opacity-80">
          <span>📍</span> San Francisco
        </div>
        <div className="flex items-center gap-2">
          <span className="text-3xl" style={{ animation: 'fp-float 3s ease-in-out infinite' }}>⛅</span>
          <span className="text-3xl font-light">22°</span>
        </div>
        <div className="flex justify-between text-[8px] opacity-80">
          <span>💧 65%</span>
          <span>💨 12km/h</span>
        </div>
      </div>
    </PreviewWrapper>
  );
}

function PalettePreview() {
  const [colors] = useState(() => {
    const base = Math.random() * 360;
    return Array.from({ length: 5 }, (_, i) =>
      `hsl(${(base + i * 35) % 360}, ${60 + i * 5}%, ${50 + i * 3}%)`
    );
  });

  return (
    <PreviewWrapper>
      <div className="flex h-full">
        {colors.map((c, i) => (
          <div key={i} className="flex-1 flex items-end justify-center pb-2 transition-all hover:flex-[2]" style={{ backgroundColor: c }}>
            <span className="text-[7px] text-white font-mono drop-shadow-lg opacity-80">{c.slice(0, 12)}</span>
          </div>
        ))}
      </div>
    </PreviewWrapper>
  );
}

function MarkdownPreview() {
  return (
    <PreviewWrapper>
      <div className="flex h-full text-[8px]">
        <div className="flex-1 p-2 bg-[#1e1e2e] text-green-400 font-mono leading-relaxed overflow-hidden">
          <p># Hello</p>
          <p>## Flutter</p>
          <p>**bold** text</p>
          <p>- item 1</p>
          <p>- item 2</p>
        </div>
        <div className="w-px bg-border" />
        <div className="flex-1 p-2 leading-relaxed overflow-hidden">
          <p className="text-sm font-bold">Hello</p>
          <p className="text-xs font-bold">Flutter</p>
          <p><strong className="font-bold">bold</strong> text</p>
          <ul className="list-disc list-inside">
            <li>item 1</li>
            <li>item 2</li>
          </ul>
        </div>
      </div>
    </PreviewWrapper>
  );
}

function ExpensePreview() {
  const data = [
    { pct: 27, color: '#f43f5e', label: 'Food' },
    { pct: 12, color: '#3b82f6', label: 'Transport' },
    { pct: 21, color: '#22c55e', label: 'Shopping' },
    { pct: 30, color: '#f97316', label: 'Bills' },
    { pct: 10, color: '#a855f7', label: 'Other' },
  ];

  let offset = 0;
  const segments = data.map(d => {
    const seg = { ...d, offset };
    offset += d.pct;
    return seg;
  });

  return (
    <PreviewWrapper>
      <div className="flex items-center justify-center h-full gap-3 p-2">
        <svg width="60" height="60" viewBox="0 0 36 36">
          {segments.map((seg, i) => (
            <circle key={i} cx="18" cy="18" r="14" fill="none" stroke={seg.color} strokeWidth="5"
              strokeDasharray={`${seg.pct} ${100 - seg.pct}`}
              strokeDashoffset={-seg.offset}
              style={{ animation: `fp-donut-grow 1s ease-out ${i * 0.15}s both` }} />
          ))}
        </svg>
        <div className="space-y-0.5">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-[7px] text-muted-foreground">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrapper>
  );
}

// ═══════════════════════════════════════════
// EXPORT MAP
// ═══════════════════════════════════════════

export const previewComponents: Record<string, () => JSX.Element> = {
  'snake-game': SnakePreview,
  '2048-puzzle': PuzzlePreview,
  'flappy-bird': FlappyPreview,
  'memory-match': MemoryPreview,
  'brick-breaker': BrickPreview,
  'tic-tac-toe': TicTacPreview,
  'whack-a-mole': WhackPreview,
  'color-tap': ColorTapPreview,
  '3d-cube': CubePreview,
  'particle-explosion': ParticlePreview,
  'liquid-fill': LiquidPreview,
  'neon-orbits': OrbitPreview,
  'morphing-blob': BlobPreview,
  'holographic-card': HoloPreview,
  '3d-flip-card': FlipCardPreview,
  'aurora-bg': AuroraPreview,
  'glassmorphism': GlassPreview,
  'neumorphic-toggle': NeuTogglePreview,
  'animated-nav': AnimNavPreview,
  'parallax-cards': ParallaxPreview,
  'typewriter': TypewriterPreview,
  'shimmer-skeleton': ShimmerPreview,
  'ripple-button': RipplePreview,
  'gradient-reveal': GradientRevealPreview,
  'bmi-calculator': BMIPreview,
  'stopwatch': StopwatchPreview,
  'weather-card': WeatherPreview,
  'color-palette': PalettePreview,
  'markdown-preview': MarkdownPreview,
  'expense-chart': ExpensePreview,
};
