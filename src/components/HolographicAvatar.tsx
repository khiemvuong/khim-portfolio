"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';


import { LiquidGlassCard } from './ui/liquid-weather-glass';

export default function HolographicAvatar() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pendingCoordsRef = useRef({ rx: 0, ry: 0, px: 50, py: 50 });
  const [coords, setCoords] = useState({ rx: 0, ry: 0, px: 50, py: 50 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    // Disable tilt on mobile
    if (window.innerWidth < 768) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation between -12 and 12 degrees
    const rx = ((y / height) - 0.5) * -24;
    const ry = ((x / width) - 0.5) * 24;

    // Position of flash gradient
    const px = (x / width) * 100;
    const py = (y / height) * 100;

    pendingCoordsRef.current = { rx, ry, px, py };
    if (frameRef.current) return;

    frameRef.current = requestAnimationFrame(() => {
      setCoords(pendingCoordsRef.current);
      frameRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    setCoords({ rx: 0, ry: 0, px: 50, py: 50 });
  };

  return (
    <div className="w-full flex justify-center py-6">
      <LiquidGlassCard
        ref={cardRef}
        draggable={false}
        borderRadius="16px"
        blurIntensity="xl"
        glowIntensity="xs"
        shadowIntensity="xs"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${coords.rx}deg) rotateY(${coords.ry}deg)`,
          transition: isHovered ? 'none' : 'transform 0.5s ease',
        }}
        className="relative w-[280px] md:w-[320px] bg-[#12122b]/30 p-6 border border-neon-purple/20 shadow-2xl group cursor-pointer overflow-hidden animate-none"
      >
        {/* Holographic light reflection glare overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-color-dodge opacity-0 group-hover:opacity-60 z-10"
          style={{
            background: `radial-gradient(circle at ${coords.px}% ${coords.py}%, rgba(34, 211, 238, 0.4) 0%, rgba(168, 85, 247, 0.2) 30%, transparent 65%)`
          }}
        />

        {/* Matrix grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(168,85,247,0.04)_50%)] bg-size-[100%_4px] pointer-events-none" />

        {/* Framing brackets */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-neon-cyan" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-neon-pink" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-neon-purple" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-neon-cyan" />

        {/* Profile Image & Glitch Effect */}
        <div className="relative w-full aspect-295/413 rounded-xl overflow-hidden bg-[#0A0A15]/80 border border-neon-purple/30 flex items-center justify-center">
          {/* Cybernetic HUD overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_55%,rgba(13,13,26,0.95)_100%)] z-10" />

          {/* Actual Avatar Image */}
          <Image
            src="/project-image/avt.png"
            alt="Khiem Vuong Avatar"
            fill
            sizes="(max-width: 768px) 280px, 320px"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 relative z-0"
          />

          {/* Animated HUD Overlay Rings on top of image */}
          <div className="absolute inset-6 border border-dashed border-neon-cyan/25 rounded-full pointer-events-none z-10 animate-spin origin-center" style={{ animationDuration: '40s' }} />
          <div className="absolute inset-10 border border-dotted border-neon-pink/35 rounded-full pointer-events-none z-10 animate-spin origin-center" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />

          {/* Glitch Overlay scanline bar */}
          <div 
            className="absolute top-0 left-0 w-full h-[3px] bg-neon-cyan/60 blur-[1px] opacity-70 z-20"
            style={{
              animation: 'scanline 4s linear infinite',
              boxShadow: '0 0 10px #22D3EE'
            }}
          />

          {/* Telemetry data box overlay */}
          <div className="absolute bottom-2 left-2 bg-[#06060f]/90 px-2 py-0.5 border border-neon-cyan/20 rounded text-[8px] font-mono text-neon-cyan z-20">
            SYS_REF: MERN_PROT_X01
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-5 text-center" style={{ transform: 'translateZ(30px)' }}>
          <div className="inline-block bg-neon-purple/15 text-neon-purple border border-neon-purple/30 rounded-full px-3 py-0.5 text-xs font-mono font-semibold tracking-wider uppercase mb-2">
            MERN Stack Specialist
          </div>
          
          <h3 className="font-heading font-black text-xl text-white tracking-wide uppercase transition-colors duration-300 group-hover:text-neon-cyan">
            KHIEM VUONG
          </h3>
          
          <p className="text-slate-400 font-mono text-xs mt-1">
            MERN_ARCHITECT.EXE
          </p>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
