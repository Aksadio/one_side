import React, { useEffect, useRef } from 'react';

interface RainCanvasProps {
  enabled: boolean;
  reducedMotion: boolean;
}

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

export const RainCanvas: React.FC<RainCanvasProps> = ({ enabled, reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const dropCount = Math.min(180, Math.max(40, Math.floor((width * height) / 8000)));
    const drops: RainDrop[] = Array.from({ length: dropCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: 16 + Math.random() * 24,
      speed: 7 + Math.random() * 5,
      opacity: 0.12 + Math.random() * 0.2,
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const renderStaticGlassDrops = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(205, 220, 238, 0.14)';
      ctx.lineWidth = 1;
      for (const d of drops) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1.5, d.y + d.length * 0.65);
        ctx.stroke();
      }
    };

    if (reducedMotion) {
      renderStaticGlassDrops();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    const renderLoop = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        ctx.strokeStyle = `rgba(210, 224, 240, ${d.opacity})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1.8, d.y + d.length);
        ctx.stroke();

        d.y += d.speed;
        d.x -= 0.5;

        if (d.y > height + 20) {
          d.y = -25;
          d.x = Math.random() * (width + 40);
        }
      }

      animationFrameId = window.requestAnimationFrame(renderLoop);
    };

    animationFrameId = window.requestAnimationFrame(renderLoop);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled, reducedMotion]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    />
  );
};
