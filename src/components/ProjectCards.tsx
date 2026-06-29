"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Star, GitFork, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { LiquidGlassCard } from './ui/liquid-weather-glass';

// Custom SVG Brand Icons
const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'AI Hybrid Chatbot E-Commerce System',
    description: 'Production-grade hybrid full-stack e-commerce marketplace powered by an AI Chatbot with a custom Hybrid Scoring Engine (lexical + semantic). Built on Node.js/MongoDB with Redis caching for sub-100ms response times.',
    category: 'Full Stack',
    tech: ['React', 'Node.js', 'MongoDB', 'Redis', 'Docker', 'AI Chatbot', 'Hybrid Search'],
    githubUrl: 'https://github.com/khiemvuong/e-commerce-saas',
    liveUrl: '#',
    imageUrl: '/project-image/e-commerce.png',
    statusBadge: 'Thesis Project · UIT 2025'
  },
  {
    id: '2',
    title: 'English Vocabulary & Part 5 Learning App',
    description: 'A serverless, offline-first English learning application designed for UIT students. All state, progress tracking, and custom vocab lists are managed locally via LocalStorage, offering zero-latency practice and part 5 mock tests.',
    category: 'Front-End',
    tech: ['React', 'LocalStorage', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    githubUrl: 'https://github.com/khiemvuong/English_Vocab',
    liveUrl: 'https://english-vocab-rho.vercel.app/',
    imageUrl: '/project-image/english-vocab.png',
    statusBadge: 'Self-contained App'
  },
  {
    id: '3',
    title: 'Layerz.vn — Digital Artisan Platform',
    description: 'Front-end design and full interface implementation for layerz.vn. Crafted high-fidelity interactive screens for Artisans showcase, Products catalogs, Brand Stories, and cybernetic Authentication (Login/Signup).',
    category: 'Front-End',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Responsive UI'],
    githubUrl: '#',
    liveUrl: 'https://layerz.vn/story',
    imageUrl: '/project-image/layerZ.png',
    statusBadge: 'Production Design'
  },
  {
    id: '4',
    title: 'OHAL Group — Corporate Website Redesign',
    description: 'Served as the Frontend Lead for the official corporate website redesign. Architected the project codebase structure, designed the overall UI/UX layout, managed task delegation among frontend developers, and handled direct client communication.',
    category: 'Front-End',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'UI/UX Design', 'Team Leadership'],
    githubUrl: '#',
    liveUrl: 'https://ohal.com.vn/',
    imageUrl: '/project-image/ohal.jpg',
    statusBadge: 'Frontend Lead'
  }
];

// Renders a high-tech SVG graphic based on image identifier to guarantee stunning display without load failures
export const renderProjectThumbnail = (type: string) => {
  if (type.startsWith('/') || type.endsWith('.png') || type.endsWith('.jpg') || type.endsWith('.jpeg')) {
    return (
      <div className="w-full aspect-1917/911 relative bg-[#0b0b18] overflow-hidden flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={type} 
          alt="Project Screenshot" 
          className="w-full h-full object-cover transition-transform duration-500" 
          loading="lazy"
        />
      </div>
    );
  }
  switch (type) {
    case 'concentric':
      return (
        <svg viewBox="0 0 100 60" fill="none" className="w-full h-full bg-[#0b0b18]">
          <rect width="100" height="60" fill="url(#bgGrad)" />
          <circle cx="50" cy="30" r="22" stroke="#A855F7" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
          <circle cx="50" cy="30" r="16" stroke="#22D3EE" strokeWidth="0.75" />
          <circle cx="50" cy="30" r="10" stroke="#EC4899" strokeWidth="0.5" strokeDasharray="6 2" />
          <path d="M 12 30 L 88 30" stroke="rgba(168,85,247,0.15)" strokeWidth="0.5" />
          <path d="M 50 4 L 50 56" stroke="rgba(34,211,238,0.15)" strokeWidth="0.5" />
        </svg>
      );
    case 'grid-telemetry':
      return (
        <svg viewBox="0 0 100 60" fill="none" className="w-full h-full bg-[#0b0b18]">
          <rect width="100" height="60" fill="url(#bgGrad)" />
          <g>
            <line x1="10" y1="0" x2="10" y2="60" stroke="rgba(34,211,238,0.08)" strokeWidth="0.5"/>
            <line x1="30" y1="0" x2="30" y2="60" stroke="rgba(34,211,238,0.08)" strokeWidth="0.5"/>
            <line x1="50" y1="0" x2="50" y2="60" stroke="rgba(34,211,238,0.12)" strokeWidth="0.5"/>
            <line x1="70" y1="0" x2="70" y2="60" stroke="rgba(34,211,238,0.08)" strokeWidth="0.5"/>
            <line x1="90" y1="0" x2="90" y2="60" stroke="rgba(34,211,238,0.08)" strokeWidth="0.5"/>
            <line x1="0" y1="15" x2="100" y2="15" stroke="rgba(34,211,238,0.08)" strokeWidth="0.5"/>
            <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(34,211,238,0.12)" strokeWidth="0.5"/>
            <line x1="0" y1="45" x2="100" y2="45" stroke="rgba(34,211,238,0.08)" strokeWidth="0.5"/>
          </g>
          <rect x="42" y="24" width="16" height="12" rx="2" fill="#0d0d1e" stroke="#EC4899" strokeWidth="1" />
          <path d="M 45 30 L 55 30" stroke="#22D3EE" strokeWidth="0.75" />
          <circle cx="50" cy="30" r="1.5" fill="#A855F7" />
        </svg>
      );
    case 'orbit':
      return (
        <svg viewBox="0 0 100 60" fill="none" className="w-full h-full bg-[#0b0b18]">
          <rect width="100" height="60" fill="url(#bgGrad)" />
          <ellipse cx="50" cy="30" rx="35" ry="15" stroke="#A855F7" strokeWidth="0.5" transform="rotate(-15 50 30)" opacity="0.6" />
          <ellipse cx="50" cy="30" rx="25" ry="10" stroke="#EC4899" strokeWidth="0.75" transform="rotate(15 50 30)" />
          <circle cx="50" cy="30" r="8" fill="#0c0c1e" stroke="#22D3EE" strokeWidth="1" />
          <circle cx="28" cy="24" r="2.5" fill="#EC4899" />
          <circle cx="72" cy="38" r="3" fill="#22D3EE" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 60" fill="none" className="w-full h-full bg-[#0b0b18]">
          <rect width="100" height="60" fill="url(#bgGrad)" />
          <path d="M10 40 Q 30 15, 50 35 T 90 20" stroke="#22D3EE" strokeWidth="1" strokeLinecap="round" />
          <path d="M10 45 Q 30 25, 50 45 T 90 35" stroke="#A855F7" strokeWidth="0.75" opacity="0.5" strokeLinecap="round" />
          <circle cx="50" cy="35" r="2" fill="#EC4899" />
        </svg>
      );
  }
};

export default function ProjectCards() {
  const [filter, setFilter] = useState<'All' | 'Front-End' | 'Back-End' | 'Full Stack'>('All');

  const filteredProjects = PROJECTS_DATA.filter(project => {
    if (filter === 'All') return true;
    return project.category === filter;
  });

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Dynamic Gradients for HUD SVG Thumbnails */}
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B0B1E" />
            <stop offset="100%" stopColor="#1E0B36" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Futuristic Filtering Controls */}
      <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
        {(['All', 'Front-End', 'Back-End', 'Full Stack'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`font-mono text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-300 relative cursor-pointer ${
              filter === cat
                ? 'bg-neon-purple/20 text-white border-neon-purple shadow-neon-purple/40'
                : 'bg-[#121228]/40 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {cat}
            {filter === cat && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
            )}
          </button>
        ))}
      </div>

      {/* Projects Grid Board */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map(project => (
            <LiquidGlassCard
              layout
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              draggable={true}
              borderRadius="12px"
              blurIntensity="xl"
              glowIntensity="xs"
              shadowIntensity="xs"
              className="relative overflow-hidden bg-[#12122b]/30 flex flex-col border border-neon-purple/15 hover:border-neon-purple/50 group transition duration-300 shadow-xl"
            >
              {/* Image/SVG Thumbnail with hover overlay */}
              <div className="relative video-cover-radius overflow-hidden border-b border-slate-900/60">
                {renderProjectThumbnail(project.imageUrl)}
                
                {/* Glow Scanner Overlay bar on card hover */}
                <div 
                  className="absolute top-0 left-0 w-full h-[2px] bg-neon-cyan opacity-0 group-hover:opacity-60 transition-opacity z-20"
                  style={{
                    animation: 'scanline 2s linear infinite',
                    boxShadow: '0 0 8px #22D3EE'
                  }}
                />

                {/* Dark Hover overlay with tech summary */}
                <div className="absolute inset-0 bg-[#080816]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-center p-5 text-center gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neon-cyan flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" /> telemetry online
                  </span>
                  <p className="text-slate-300 text-xs font-sans leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* GitHub Repo Metrics */}
                  {project.stats && (
                    <div className="flex justify-center gap-4 text-[10px] font-mono text-slate-400 mt-1">
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400" /> {project.stats.stars} Stars</span>
                      <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5 text-neon-pink" /> {project.stats.forks} Forks</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Contents */}
              <div className="p-5 flex flex-col grow justify-between gap-4 select-text">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <h3 className="font-heading font-black text-white text-base uppercase tracking-wider group-hover:text-neon-cyan transition-colors">{project.title}</h3>
                    <span className="font-mono text-[9px] uppercase font-bold text-neon-pink bg-neon-pink/10 border border-neon-pink/20 px-2 py-0.5 rounded">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs font-sans line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Technology Tags */}
                  <div className="flex gap-1.5 flex-wrap">
                    {project.tech.map(t => (
                      <span key={t} className="text-[9px] font-mono text-slate-300 bg-slate-900/60 border border-slate-800 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-2 border-t border-slate-900/60 pt-3 select-all">
                    <a
                      href={project.githubUrl === '#' || !project.githubUrl ? '/private-repo' : project.githubUrl}
                      target={project.githubUrl === '#' || !project.githubUrl ? undefined : '_blank'}
                      rel={project.githubUrl === '#' || !project.githubUrl ? undefined : 'noopener noreferrer'}
                      className="flex-1 flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase font-bold py-1.5 rounded border border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/80 text-slate-300 hover:text-white transition cursor-pointer"
                    >
                      <Github className="w-3.5 h-3.5" /> Source
                    </a>
                    <a
                      href={project.liveUrl === '#' || !project.liveUrl ? '/not-deployed' : project.liveUrl}
                      target={project.liveUrl === '#' || !project.liveUrl ? undefined : '_blank'}
                      rel={project.liveUrl === '#' || !project.liveUrl ? undefined : 'noopener noreferrer'}
                      className="flex-1 flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase font-bold py-1.5 rounded bg-linear-to-r from-neon-purple to-neon-pink text-white transition cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </LiquidGlassCard>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
