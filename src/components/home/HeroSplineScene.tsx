"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Cpu } from 'lucide-react';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <HeroVisualFallback label="Loading 3D interface" />,
});

function HeroVisualFallback({ label }: { label: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute h-[360px] w-[360px] rounded-full border border-neon-cyan/20 bg-neon-cyan/5 blur-sm" />
      <div className="absolute h-[260px] w-[260px] rounded-full border border-dashed border-neon-purple/30 animate-spin motion-reduce:animate-none" style={{ animationDuration: '28s' }} />
      <div className="absolute h-[180px] w-[180px] rounded-full border border-dotted border-neon-pink/30 animate-spin motion-reduce:animate-none" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />
      <div className="relative flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#070714]/50 px-6 py-5 text-center backdrop-blur-md">
        <Cpu className="h-8 w-8 text-neon-cyan" />
        <span className="font-mono text-[10px] font-black uppercase tracking-widest text-neon-cyan/80">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function HeroSplineScene() {
  const [canLoadSpline, setCanLoadSpline] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
    );

    if (!mediaQuery.matches) return;

    const timeoutId = window.setTimeout(() => {
      setCanLoadSpline(true);
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 h-screen z-0 flex justify-center items-center pointer-events-none select-none overflow-visible">
      <div className="relative flex h-[760px] w-[760px] shrink-0 items-center justify-center overflow-hidden opacity-70 md:h-[980px] md:w-[980px] lg:h-[1340px] lg:w-[1400px] lg:translate-y-[-100px] lg:scale-[1.08] lg:opacity-100">
        {canLoadSpline ? (
          <div className="absolute top-0 left-0 h-[1400px] w-full">
            <Spline scene="https://prod.spline.design/Hoc-5P8xfjMh7imC/scene.splinecode" />
          </div>
        ) : (
          <HeroVisualFallback label="Visual system ready" />
        )}
      </div>
    </div>
  );
}
