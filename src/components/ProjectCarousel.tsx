"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { PROJECTS_DATA, renderProjectThumbnail } from '@/components/ProjectCards';
import { LiquidGlassCard } from '@/components/ui/liquid-weather-glass';
import { Project } from '@/types';

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectCarousel() {

  
  const rotationRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; baseRotation: number } | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);

  const items = PROJECTS_DATA;
  const radius = 380;
  const anglePerItem = 360 / items.length;

  // Direct DOM rotation loop using requestAnimationFrame (60fps, 0 React re-renders)
  useEffect(() => {
    let frameId: number;
    const rotate = () => {
      if (!isDraggingRef.current && !isHoveredRef.current) {
        rotationRef.current += 0.05; // 0.05 degrees per frame
        if (spinnerRef.current) {
          spinnerRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
        }
      }
      frameId = requestAnimationFrame(rotate);
    };
    frameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('a, button')) return;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, baseRotation: rotationRef.current };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    rotationRef.current = dragStartRef.current.baseRotation + dx * 0.35;
    if (spinnerRef.current) {
      spinnerRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    dragStartRef.current = null;
  }, []);

  const renderCard = (project: Project, opacity: number) => (
    <LiquidGlassCard
      draggable={false}
      borderRadius="16px"
      blurIntensity="xl"
      glowIntensity="xs"
      shadowIntensity="xs"
      className="w-full h-full relative overflow-hidden bg-[#12122b]/40 flex flex-col border border-neon-purple/20 hover:border-neon-purple/50 group transition duration-300 shadow-2xl select-text"
    >
      {/* SVG Thumbnail */}
      <div className="relative video-cover-radius overflow-hidden border-b border-slate-900/60 select-none pointer-events-none">
        {renderProjectThumbnail(project.imageUrl)}
        <div
          className="absolute top-0 left-0 w-full h-[2px] bg-neon-cyan opacity-0 group-hover:opacity-60 transition-opacity z-20"
          style={{ animation: 'scanline 2s linear infinite', boxShadow: '0 0 8px #22D3EE' }}
        />
      </div>

      {/* Card Contents */}
      <div className="p-4 flex flex-col justify-between grow gap-2.5">
        <div className="flex flex-col gap-1.5 text-left">
          <div className="flex justify-between items-start gap-1">
            <h3 className="font-heading font-black text-white text-[13px] uppercase tracking-wider group-hover:text-neon-cyan transition-colors line-clamp-1">
              {project.title}
            </h3>
            <span className="font-mono text-[7px] uppercase font-bold text-neon-pink bg-neon-pink/10 border border-neon-pink/20 px-1.5 py-0.5 rounded whitespace-nowrap">
              {project.category}
            </span>
          </div>
          <p className="text-slate-400 text-[10px] font-sans leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* Technology Tags */}
          <div className="flex gap-1 flex-wrap">
            {project.tech.slice(0, 4).map(t => (
              <span key={t} className="text-[7.5px] font-mono text-slate-300 bg-slate-900/60 border border-slate-800 px-1.5 py-0.5 rounded">
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[7.5px] font-mono text-slate-500 bg-slate-900/40 border border-slate-800/60 px-1.5 py-0.5 rounded">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* GitHub Stats or Status Badge */}
          {project.stats ? (
            <div className="flex gap-3 text-[8.5px] font-mono text-slate-400 border-t border-slate-900/40 pt-2 select-none">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400" /> {project.stats.stars} Stars
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-3 h-3 text-neon-pink" /> {project.stats.forks} Forks
              </span>
            </div>
          ) : project.statusBadge ? (
            <div className="border-t border-slate-900/40 pt-2 select-none">
              <span className="text-[8.5px] font-mono text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20 px-2 py-0.5 rounded">
                {project.statusBadge}
              </span>
            </div>
          ) : null}

          {/* Action buttons */}
          <div className="flex items-center gap-2 border-t border-slate-900/40 pt-2">
            <a
              href={project.githubUrl === '#' || !project.githubUrl ? '/private-repo' : project.githubUrl}
              target={project.githubUrl === '#' || !project.githubUrl ? undefined : '_blank'}
              rel={project.githubUrl === '#' || !project.githubUrl ? undefined : 'noopener noreferrer'}
              className="flex-1 flex items-center justify-center gap-1 font-mono text-[9px] uppercase font-bold py-1.5 rounded border border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/80 text-slate-300 hover:text-white transition cursor-pointer"
              style={{ pointerEvents: opacity < 0.8 ? 'none' : 'auto' }}
            >
              <Github className="w-3 h-3" /> Source
            </a>
            <a
              href={project.liveUrl === '#' || !project.liveUrl ? '/not-deployed' : project.liveUrl}
              target={project.liveUrl === '#' || !project.liveUrl ? undefined : '_blank'}
              rel={project.liveUrl === '#' || !project.liveUrl ? undefined : 'noopener noreferrer'}
              className="flex-1 flex items-center justify-center gap-1 font-mono text-[9px] uppercase font-bold py-1.5 rounded bg-linear-to-r from-neon-purple to-neon-pink text-white transition cursor-pointer"
              style={{ pointerEvents: opacity < 0.8 ? 'none' : 'auto' }}
            >
              <ExternalLink className="w-3 h-3" /> Live
            </a>
          </div>
        </div>
      </div>
    </LiquidGlassCard>
  );

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Hidden SVG defs for thumbnails */}
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="bgGrad-carousel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B0B1E" />
            <stop offset="100%" stopColor="#1E0B36" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Drag hint */}
      <p className="text-[13px] font-mono text-slate-400/80 uppercase tracking-widest select-none">
        Drag to rotate · Hover to pause
      </p>

      {/* 3D Carousel Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[460px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: '2000px' }}
        onMouseLeave={() => { 
          isHoveredRef.current = false;
          isDraggingRef.current = false;
          dragStartRef.current = null; 
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          ref={spinnerRef}
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'none'
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;

            return (
              <div
                key={item.id}
                className="absolute w-[320px] h-[390px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-160px',
                  marginTop: '-195px',
                  transformStyle: 'preserve-3d',
                }}
                onMouseEnter={() => {
                  isHoveredRef.current = true;
                }}
                onMouseLeave={() => {
                  isHoveredRef.current = false;
                }}
              >
                {renderCard(item, 1)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
