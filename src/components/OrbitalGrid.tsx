"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Server, 
  Code, 
  Layers, 
  ShieldCheck, 
  Box, 
  GitBranch, 
  Palette, 
  Terminal,
  Cpu,
  LucideIcon
} from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  connections: string[];
}

export default function OrbitalGrid() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [radius, setRadius] = useState(280);

  const techs: TechItem[] = useMemo(() => [
    {
      id: 'nextjs',
      name: 'Next.js',
      icon: Layers,
      color: '#22D3EE', // neon cyan
      connections: ['react', 'typescript'],
    },
    {
      id: 'react',
      name: 'React.js',
      icon: Code,
      color: '#22D3EE',
      connections: ['typescript', 'tailwind', 'nextjs'],
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      icon: ShieldCheck,
      color: '#EC4899', // neon pink
      connections: ['react', 'nextjs'],
    },
    {
      id: 'node',
      name: 'Node.js',
      icon: Terminal,
      color: '#A855F7', // neon purple
      connections: ['typescript', 'docker'],
    },
    {
      id: 'express',
      name: 'Express.js',
      icon: Server,
      color: '#EC4899',
      connections: ['react', 'node'],
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      icon: Database,
      color: '#A855F7',
      connections: ['express', 'node'],
    },
    {
      id: 'docker',
      name: 'Docker',
      icon: Box,
      color: '#A855F7',
      connections: ['node'],
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      icon: Palette,
      color: '#22D3EE',
      connections: ['react'],
    },
    {
      id: 'git',
      name: 'Git & GitHub',
      icon: GitBranch,
      color: '#EC4899',
      connections: ['docker'],
    }
  ], []);

  const containerRef = useRef<HTMLDivElement>(null);

  // Update radius dynamically based on the actual container dimensions (ensures no overflow)
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;
      
      // Reserve 110px vertically (node radius + bottom label height)
      const maxRadiusByHeight = Math.max(80, Math.floor((containerHeight - 110) / 2));
      // Reserve 90px horizontally (node radius left & right)
      const maxRadiusByWidth = Math.max(80, Math.floor((containerWidth - 90) / 2));
      
      let targetRadius = 280;
      if (containerWidth < 640) {
        targetRadius = 130;
      } else if (containerWidth < 768) {
        targetRadius = 170;
      } else if (containerWidth < 1024) {
        targetRadius = 210;
      }

      setRadius(Math.min(targetRadius, maxRadiusByHeight, maxRadiusByWidth));
    };

    handleResize();
    
    if (typeof window !== 'undefined' && containerRef.current) {
      const observer = new ResizeObserver(() => {
        handleResize();
      });
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const calculateNodePosition = useCallback((index: number, total: number) => {
    const angle = (index / total) * 360;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    return { x, y, angle };
  }, [radius]);

  // Connection lines generation (Static coordinates inside rotating wrapper, shown only on hover)
  const connectionLines = useMemo(() => {
    const lines: Array<{
      id: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      color: string;
    }> = [];

    if (!hoveredTech) return lines;

    const sourceIndex = techs.findIndex(t => t.id === hoveredTech);
    if (sourceIndex === -1) return lines;

    const { x: x1, y: y1 } = calculateNodePosition(sourceIndex, techs.length);
    const sourceItem = techs[sourceIndex];
    const connectedIds = new Set<string>();
    sourceItem.connections.forEach(id => connectedIds.add(id));
    techs.forEach(t => {
      if (t.connections.includes(hoveredTech)) {
        connectedIds.add(t.id);
      }
    });

    connectedIds.forEach(connId => {
      const connIndex = techs.findIndex(t => t.id === connId);
      if (connIndex !== -1) {
        const { x: x2, y: y2 } = calculateNodePosition(connIndex, techs.length);
        lines.push({
          id: `${hoveredTech}-${connId}`,
          x1,
          y1,
          x2,
          y2,
          color: sourceItem.color
        });
      }
    });

    return lines;
  }, [hoveredTech, techs, calculateNodePosition]);

  return (
    <div 
      className="w-full h-[380px] sm:h-[450px] md:h-full flex items-center justify-center relative select-none overflow-hidden bg-transparent"
      ref={containerRef}
    >
      {/* Central orbit container */}
      <div 
        className="relative w-full max-w-4xl h-full flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        {/* Static Background Orbit Ring */}
        <svg 
          viewBox={`-${radius + 50} -${radius + 50} ${(radius + 50) * 2} ${(radius + 50) * 2}`} 
          className="absolute pointer-events-none z-0"
          style={{ width: `${(radius + 50) * 2}px`, height: `${(radius + 50) * 2}px` }}
        >
          <circle 
            cx="0" 
            cy="0" 
            r={radius} 
            stroke="rgba(255, 255, 255, 0.15)" 
            strokeWidth="2" 
            fill="none" 
          />
        </svg>

        {/* Central Core Reactor */}
        <div className="absolute w-28 h-28 rounded-full bg-[#05050e]/90 border border-neon-cyan/30 flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(34,211,238,0.25)] select-none">
          <div className="absolute inset-[-12px] rounded-full border-2 border-dashed border-neon-purple/20" />
          <div 
            className="absolute inset-[-6px] rounded-full border border-dotted border-neon-pink/40" 
            style={{ animation: 'spin 15s linear infinite reverse' }} 
          />
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-neon-cyan/40" />
          <div className="absolute inset-4 rounded-full bg-linear-to-br from-neon-purple/20 via-neon-pink/20 to-neon-cyan/20 blur-xs animate-pulse" />
          <div className="relative z-10 flex flex-col items-center gap-1">
            <Cpu className="w-6 h-6 text-neon-cyan drop-shadow-[0_0_8px_#22D3EE] animate-pulse" />
            <span className="text-[8px] font-mono font-black tracking-[0.25em] text-neon-pink">CORE</span>
            <span className="text-[6px] font-mono text-slate-500 uppercase tracking-widest">ACTIVE</span>
          </div>
        </div>

        {/* Rotating orbit container wrapper (purely CSS driven rotation) */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            animation: 'orbit-spin 120s linear infinite',
          }}
        >
          {/* Static SVG for Connection Lines inside the rotating container */}
          <svg 
            viewBox={`-${radius + 50} -${radius + 50} ${(radius + 50) * 2} ${(radius + 50) * 2}`} 
            className="absolute pointer-events-none z-0"
            style={{ width: `${(radius + 50) * 2}px`, height: `${(radius + 50) * 2}px` }}
          >
            <AnimatePresence>
              {connectionLines.map(line => (
                <motion.line
                  key={line.id}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={line.color}
                  strokeWidth={2}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    filter: `drop-shadow(0 0 6px ${line.color})`
                  }}
                />
              ))}
            </AnimatePresence>
          </svg>

          {/* Floating Nodes */}
          {techs.map((t, index) => {
            const position = calculateNodePosition(index, techs.length);
            const isHovered = hoveredTech === t.id;
            const IconComponent = t.icon;

            return (
              <div
                key={t.id}
                onMouseEnter={() => setHoveredTech(t.id)}
                onMouseLeave={() => setHoveredTech(null)}
                className="absolute transition-opacity duration-300 select-none"
                suppressHydrationWarning
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                  zIndex: 100,
                }}
              >
                {/* Node Icon Circle (counter-rotated to stay upright) */}
                <div 
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px] rounded-full flex items-center justify-center transition-all duration-300 ${
                    isHovered 
                      ? 'bg-[#1e1e3f] text-white scale-125 border-2 shadow-lg' 
                      : 'bg-[#1a1a35]/90 text-slate-300 border-2 border-slate-700/50'
                  }`}
                  style={{
                    borderColor: isHovered ? t.color : 'rgba(168, 85, 247, 0.25)',
                    boxShadow: isHovered ? `0 0 20px ${t.color}90` : 'none',
                    transformStyle: 'preserve-3d',
                    animation: 'orbit-icon-spin-reverse 120s linear infinite',
                  }}
                >
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />

                  {/* Dashed outer spinner on Hover */}
                  {isHovered && (
                    <div 
                      className="absolute inset-[-8px] rounded-full border-2 border-dashed animate-spin"
                      style={{ 
                        borderColor: t.color,
                        animationDuration: '6s'
                      }} 
                    />
                  )}
                </div>

                {/* Label text placed below node (counter-rotated to stay upright) */}
                <div
                  className={`
                    absolute top-16 sm:top-[72px] lg:top-20 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-[13px] font-mono font-medium tracking-widest uppercase
                    transition-all duration-300
                    ${isHovered ? "text-neon-cyan" : "text-white/75"}
                  `}
                  style={{
                    animation: 'orbit-spin-reverse 120s linear infinite',
                  }}
                >
                  {t.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
