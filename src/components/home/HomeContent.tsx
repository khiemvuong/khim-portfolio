"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import dynamic from 'next/dynamic';
import { 
  Cpu, 
  Terminal as TermIcon, 
  ChevronRight, 
  Code, 
  Layers, 
  FolderGit2, 
  Mail, 
  Palette,
  Download,
  Home,
  User,
  Globe,
  Zap,
  Menu,
  X
} from 'lucide-react';

// Components
import MagneticElement from '@/components/MagneticElement';
import HolographicAvatar from '@/components/HolographicAvatar';
import Typewriter from '@/components/Typewriter';
import OrbitalGrid from '@/components/OrbitalGrid';
import ProjectCarousel from '@/components/ProjectCarousel';
import TerminalContact from '@/components/TerminalContact';

// Dynamically import Spline to prevent SSR errors
const Spline = dynamic(
  () => import("@splinetool/react-spline"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-[300px] h-[300px] flex flex-col items-center justify-center text-neon-cyan font-mono text-xs tracking-widest uppercase animate-pulse">
        <Cpu className="w-8 h-8 mr-2 animate-spin text-neon-purple mb-3" />
        LOADING 3D INTERFACE...
      </div>
    )
  }
);

const SECTIONS = ['hero', 'about', 'tech', 'projects', 'contact'];

export default function HomeContent() {
  const [activeSection, setActiveSection] = useState('hero');
  const [glitchText, setGlitchText] = useState('KHIEM VUONG');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll Progress
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });
  const yParallax = useSpring(scrollY, { stiffness: 100, damping: 30 });
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    return yParallax.on("change", (latest) => {
      setOffsetY(latest);
    });
  }, [yParallax]);

  // Section observer for header and tab highlights
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;

      for (const section of SECTIONS) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cybernetic Glitch heading animation handler
  const handleHeadingHover = () => {
    const original = 'KHIEM VUONG';
    const chars = 'ABCDEFGHIKLMNOPQRSTUVWXYZ0123456789@#$%&*§+_';
    let iterations = 0;
    
    const interval = setInterval(() => {
      setGlitchText(() => 
        original.split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterations) return original[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      iterations += 1/3;
      if (iterations >= original.length) {
        clearInterval(interval);
        setGlitchText(original);
      }
    }, 25);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-[#e2e8f0] font-sans antialiased overflow-x-hidden select-text">
      {/* Scanline atmospheric overlays */}
      <div className="scanline-overlay absolute inset-0 opacity-15 pointer-events-none z-20" />
      <div className="fixed inset-0 border border-slate-900/40 pointer-events-none z-40 m-3 md:m-6" />

      {/* Top progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-linear-to-r from-neon-purple via-neon-pink to-neon-cyan z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Brand Identity / Logo — fixed top-right */}
      <div className="fixed top-4 right-6 z-40 flex items-center gap-3 bg-[#080816]/75 backdrop-blur-xl border border-neon-purple/20 px-4 py-2.5 rounded-lg pointer-events-auto hover:border-neon-cyan/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-300 select-none group/brand shadow-lg">
        {/* High-tech animated HUD Logo Icon */}
        <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
          {/* Rotating outer ring */}
          <div className="absolute inset-0 border border-dashed border-neon-cyan/40 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
          {/* Counter-rotating inner ring */}
          <div className="absolute inset-[3px] border border-dotted border-neon-pink/50 rounded-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
          {/* Glowing core dot */}
          <div className="w-1.5 h-1.5 bg-neon-purple rounded-full shadow-[0_0_8px_#A855F7] group-hover/brand:bg-neon-cyan group-hover/brand:shadow-[0_0_8px_#22D3EE] transition-all duration-300" />
        </div>
        
        <div className="flex flex-col text-left">
          <span 
            onMouseEnter={() => {
              handleHeadingHover();
            }}
            className="font-heading font-black text-xs tracking-wider text-white uppercase cursor-pointer flex items-center group-hover/brand:text-neon-cyan transition-colors"
          >
            {glitchText}<span className="text-neon-pink group-hover/brand:text-neon-cyan transition-colors">.</span>
          </span>
          <span className="font-mono text-[7px] text-slate-400 tracking-widest uppercase">
            ENG_ARCH.SYS
          </span>
        </div>

        {/* Status indicator tag */}
        <div className="flex items-center gap-1.5 bg-neon-cyan/5 border border-neon-cyan/20 px-2 py-0.5 rounded text-[8px] font-mono text-neon-cyan font-bold tracking-widest uppercase sm:flex">
          <span className="w-1 h-1 rounded-full bg-neon-cyan animate-pulse shadow-neon-cyan" />
          MERN_CORE
        </div>
      </div>

      {/* Cybernetic Right Sidebar Navigation (Desktop only) */}
      <nav className="md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-6 bg-[#070714]/70 backdrop-blur-lg border border-white/10 rounded-full py-7 px-3.5 shadow-2xl select-none group/sidebar">
        
        {/* Core HUD status element */}
        <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_8px_#22D3EE] mb-1" />
        
        {/* Vertical HUD connector line */}
        <div className="absolute top-12 bottom-28 w-px bg-linear-to-b from-neon-cyan/40 via-white/10 to-neon-purple/40 z-0 pointer-events-none" />
        
        {/* Navigation Items */}
        <div className="flex flex-col gap-5 relative z-10">
          {[
            { id: 'hero', label: 'HOME', icon: Home },
            { id: 'about', label: 'ABOUT', icon: User },
            { id: 'tech', label: 'SKILLS', icon: Cpu },
            { id: 'projects', label: 'PROJECTS', icon: FolderGit2 },
            { id: 'contact', label: 'CONTACT', icon: Mail }
          ].map(navItem => {
            const NavIcon = navItem.icon;
            const isActive = activeSection === navItem.id;
            return (
              <div key={navItem.id} className="relative flex items-center justify-center group/item">
                
                {/* Hover Slide-out Label Tooltip */}
                <div className="absolute right-12 whitespace-nowrap bg-[#070714]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-md text-[9px] font-mono uppercase tracking-widest font-black text-white pointer-events-none opacity-0 translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex items-center gap-1.5">
                  <span className="text-neon-pink">{'//'}</span>
                  {navItem.label}
                  {isActive && <span className="w-1 h-1 rounded-full bg-neon-cyan animate-ping" />}
                </div>

                {/* Vertical Dot/Icon Button */}
                <button
                  onClick={() => scrollToSection(navItem.id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 relative cursor-pointer ${
                    isActive 
                      ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-110' 
                      : 'bg-black/40 text-slate-400 border-white/5 hover:border-neon-cyan/40 hover:text-neon-cyan hover:scale-105'
                  }`}
                  aria-label={`Scroll to ${navItem.label}`}
                >
                  <NavIcon className="w-3.5 h-3.5" />
                  
                  {/* Outer target-lock ring on hover */}
                  <span className={`absolute -inset-1 rounded-full border border-dashed border-neon-cyan/40 opacity-0 scale-90 group-hover/item:opacity-100 group-hover/item:scale-100 transition-all duration-300 pointer-events-none ${isActive ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Separator */}
        <div className="w-4 h-px bg-white/10 my-1 z-10" />

        {/* Quick Action CTAs */}
        <div className="flex flex-col gap-3 relative z-10">
          {/* Resume CTA */}
          <div className="relative flex items-center justify-center group/item">
            <div className="absolute right-12 whitespace-nowrap bg-[#070714]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-md text-[9px] font-mono uppercase tracking-widest font-black text-white pointer-events-none opacity-0 translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 shadow-xl">
              Resume
            </div>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition cursor-pointer hover:scale-105"
            >
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Let's Connect CTA */}
          <div className="relative flex items-center justify-center group/item">
            <div className="absolute right-12 whitespace-nowrap bg-[#070714]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-md text-[9px] font-mono uppercase tracking-widest font-black text-white pointer-events-none opacity-0 translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 shadow-xl">
              Connect
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-9 h-9 rounded-full bg-neon-purple/15 border border-neon-purple/30 hover:border-neon-purple text-neon-purple flex items-center justify-center transition cursor-pointer hover:scale-105 shadow-[0_0_8px_rgba(168,85,247,0.2)]"
            >
              <Mail className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Floating HUD Dropdown Menu */}
      <div className="fixed right-6 bottom-6 z-40 md:hidden flex flex-col items-end gap-3 select-none">
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col items-center gap-4 bg-[#070714]/90 backdrop-blur-xl border border-white/10 rounded-full py-5 px-3 shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
            >
              {/* HUD Status Dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_8px_#22D3EE] mb-1" />

              {/* Navigation Items */}
              <div className="flex flex-col gap-4">
                {[
                  { id: 'hero', label: 'HOME', icon: Home },
                  { id: 'about', label: 'ABOUT', icon: User },
                  { id: 'tech', label: 'SKILLS', icon: Cpu },
                  { id: 'projects', label: 'PROJECTS', icon: FolderGit2 },
                  { id: 'contact', label: 'CONTACT', icon: Mail }
                ].map(navItem => {
                  const NavIcon = navItem.icon;
                  const isActive = activeSection === navItem.id;
                  return (
                    <button
                      key={navItem.id}
                      onClick={() => {
                        scrollToSection(navItem.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 relative cursor-pointer ${
                        isActive 
                          ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-110' 
                          : 'bg-black/40 text-slate-300 border-white/5 hover:border-neon-cyan/40 hover:text-neon-cyan'
                      }`}
                      aria-label={`Scroll to ${navItem.label}`}
                    >
                      <NavIcon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>

              {/* Separator */}
              <div className="w-4 h-px bg-white/10 my-0.5" />

              {/* Quick Action CTAs */}
              <div className="flex flex-col gap-3">
                {/* Resume CTA */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center transition cursor-pointer active:scale-95"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Download Resume"
                >
                  <Download className="w-4 h-4" />
                </a>

                {/* Let's Connect CTA */}
                <button
                  onClick={() => {
                    scrollToSection('contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-10 h-10 rounded-full bg-neon-purple/15 border border-neon-purple/30 text-neon-purple flex items-center justify-center transition cursor-pointer active:scale-95 shadow-[0_0_8px_rgba(168,85,247,0.2)]"
                  aria-label="Connect with me"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HUD Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-12 h-12 rounded-full bg-[#070714]/90 backdrop-blur-xl border border-white/10 hover:border-neon-cyan/40 text-neon-cyan flex items-center justify-center shadow-2xl transition-all active:scale-95 cursor-pointer z-50 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Absolute container holding the interactive 3D robot (outside section to prevent overflow clipping, cropped bottom to hide watermark) */}
      <div className="absolute top-0 left-0 right-0 h-screen z-0 flex justify-center items-center pointer-events-none select-none overflow-visible">
        <div className="w-[1400px] h-[1340px] shrink-0 flex items-center justify-center translate-y-[-30px] lg:translate-y-[-100px] scale-[1.12] relative overflow-hidden">
          <div className="w-full h-[1400px] absolute top-0 left-0">
            <Spline scene="https://prod.spline.design/Hoc-5P8xfjMh7imC/scene.splinecode" />
          </div>
        </div>
      </div>

      {/* SECTION 1: HERO */}
      <section 
        id="hero" 
        className="relative min-h-screen md:h-screen w-full flex flex-col justify-between pt-10 pb-12 md:pb-10 z-10 md:overflow-hidden"
      >
        {/* Hero text & layout */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full md:h-full flex flex-col justify-between pt-10 md:pt-6 pb-6 md:pb-4 relative z-10 grow">
          
          {/* Split symmetrical columns — 2a: keep layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 items-start w-full relative">
            
            {/* Left Column */}
            <div 
              style={{ transform: `translateY(${offsetY * 0.08}px)` }}
              className="flex flex-col gap-5 text-left md:max-w-[460px]"
            >
              <div className="inline-flex items-center gap-2 bg-white/3 border border-white/5 backdrop-blur-xl px-4 py-2 rounded-full w-max shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse shadow-neon-cyan" />
                <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-neon-cyan">
                  <Code className="w-3 h-3 inline mr-1" />CODE &amp; LOGIC
                </span>
              </div>

              <h1 className="font-heading font-black text-5xl sm:text-6xl lg:text-7.5xl text-white tracking-tighter leading-none select-none">
                ENGINEERING<br />WITH CODE.
              </h1>

              {/* 2b: Updated typewriter line */}
              <h2 className="font-mono text-base md:text-lg font-bold text-slate-400 mt-1 select-all h-8 flex items-center">
                <span>ROOT@SERVER:~$&nbsp;</span>
                <Typewriter 
                  words={['Full-Stack Engineer · MERN', 'Microservices · AI', 'UI/UX Pro-Max Architect']} 
                  typingSpeed={80}
                  deletingSpeed={30}
                />
              </h2>
            </div>

            {/* Right Column */}
            <div 
              style={{ transform: `translateY(${offsetY * 0.08}px)` }}
              className="flex flex-col gap-5 md:text-right md:items-end md:max-w-[440px] md:ml-auto"
            >
              <div className="inline-flex items-center gap-2 bg-white/3 border border-white/5 backdrop-blur-xl px-4 py-2 rounded-full w-max shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-pink animate-pulse shadow-neon-pink" />
                <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-neon-pink">
                  <Palette className="w-3 h-3 inline mr-1" />ART &amp; MOTION
                </span>
              </div>

              <h1 className="font-heading font-black text-5xl sm:text-6xl lg:text-7.5xl text-transparent bg-clip-text bg-linear-to-r from-neon-purple via-neon-pink to-neon-cyan tracking-tighter leading-none select-none">
                ELEVATING<br />WITH ART.
              </h1>
            </div>

          </div>

          {/* 2c: Bio paragraph — English, specific, real credentials */}
          <div className="w-full flex flex-col items-center justify-center text-center mt-10 md:mt-16 max-w-3xl mx-auto z-20">

            <p className="font-sans text-[15px] sm:text-base text-white leading-[1.7] font-normal">
              I&apos;m a full-stack engineer who builds production-grade systems and obsesses over every pixel. I architect scalable backends on Node.js/MongoDB and craft cinematic frontend experiences with React — from 60fps microinteractions to 3D web scenes. Currently completing my B.S. in Information Technology at UIT, with hands-on industry experience shipping Odoo ERP features at T4Tek.
            </p>

            {/* 2d: Tech stack strip */}
            <p className="font-mono text-sm font-bold text-neon-cyan/80 mt-4 tracking-wide">
              React · Node.js · MongoDB · Express · TypeScript · Docker · Next.js · Tailwind CSS · Redis · Git
            </p>

            {/* 2e: CTA buttons — added Download CV */}
            <div className="flex flex-wrap gap-4 mt-6 justify-center">
              <MagneticElement range={30} strength={0.3}>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="bg-white text-black font-mono text-[10px] font-black uppercase tracking-widest py-3.5 px-6 rounded-xl hover:bg-slate-200 transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] flex items-center gap-2 cursor-pointer"
                >
                  Explore Work <ChevronRight className="w-4 h-4" />
                </button>
              </MagneticElement>

              <MagneticElement range={30} strength={0.3}>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="border border-white/10 bg-white/3 hover:bg-white/8 hover:border-white/20 backdrop-blur-xl text-white font-mono text-[10px] font-black uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  Say Hello <Mail className="w-4 h-4 text-neon-cyan" />
                </button>
              </MagneticElement>

              <MagneticElement range={30} strength={0.3}>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-neon-pink/25 bg-neon-pink/5 hover:bg-neon-pink/10 hover:border-neon-pink/50 backdrop-blur-xl text-neon-pink font-mono text-[10px] font-black uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(236,72,153,0.1)] hover:shadow-[0_0_20px_rgba(236,72,153,0.25)]"
                >
                  <Download className="w-4 h-4" /> Download CV
                </a>
              </MagneticElement>
            </div>
          </div>


        </div>
      </section>

      {/* --- SECTION: KEY METRICS — Section 3 --- */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pt-12 pb-24">
        <div className="flex flex-col gap-2 border-b border-white/5 pb-6 mb-10 text-center md:text-left">
          <span className="font-mono text-[11px] text-neon-pink tracking-widest uppercase font-bold">KEY PERFORMANCE METRICS</span>
          <h2 className="font-heading font-black text-2xl md:text-3.5xl text-white uppercase tracking-wider">
            THE NUMBERS THAT DEFINE ME
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: 950+ TOEIC — 3a */}
          <div className="group relative flex flex-col bg-white/3 border border-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:bg-white/8 hover:border-white/15 hover:-translate-y-1.5 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-neon-cyan/0 to-neon-cyan/5 group-hover:to-neon-cyan/10 transition-all duration-300 pointer-events-none" />
            <div className="p-3 rounded-xl bg-white/3 border border-white/5 w-max mb-6">
              <Globe className="w-6 h-6 text-neon-cyan" />
            </div>
            <h3 className="font-heading font-black text-4xl lg:text-5xl text-white mb-2 tracking-tight">
              950+ TOEIC
            </h3>
            <span className="font-mono text-[11px] font-bold text-neon-cyan uppercase tracking-widest mb-4 block">
              Global Communication Ready
            </span>
            <p className="font-sans text-[15px] text-white/70 leading-[1.7] mt-2">
              No language barrier. Able to read advanced technical documentation, write engineering specs, and present solutions to international stakeholders in English.
            </p>
          </div>

          {/* Card 2: 3× Faster — 3b */}
          <div className="group relative flex flex-col bg-white/3 border border-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:bg-white/8 hover:border-white/15 hover:-translate-y-1.5 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-neon-pink/0 to-neon-pink/5 group-hover:to-neon-pink/10 transition-all duration-300 pointer-events-none" />
            <div className="p-3 rounded-xl bg-white/3 border border-white/5 w-max mb-6">
              <Zap className="w-6 h-6 text-neon-pink" />
            </div>
            <h3 className="font-heading font-black text-4xl lg:text-5xl text-white mb-2 tracking-tight">
              3× FASTER
            </h3>
            <span className="font-mono text-[11px] font-bold text-neon-pink uppercase tracking-widest mb-4 block">
              AI-Augmented Workflow
            </span>
            <p className="font-sans text-[15px] text-white/70 leading-[1.7] mt-2">
              Reduced feature development cycle from ~3 days to 1 day by integrating AI-assisted scaffolding (Antigravity + Claude) into daily engineering workflow — from boilerplate generation to code review.
            </p>
          </div>

          {/* Card 3: UI/UX Pro-Max — 3c */}
          <div className="group relative flex flex-col bg-white/3 border border-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:bg-white/8 hover:border-white/15 hover:-translate-y-1.5 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-neon-purple/0 to-neon-purple/5 group-hover:to-neon-purple/10 transition-all duration-300 pointer-events-none" />
            <div className="p-3 rounded-xl bg-white/3 border border-white/5 w-max mb-6">
              <Palette className="w-6 h-6 text-neon-purple" />
            </div>
            <h3 className="font-heading font-black text-4xl lg:text-5xl text-white mb-2 tracking-tight">
              UI/UX PRO-MAX
            </h3>
            <span className="font-mono text-[11px] font-bold text-neon-purple uppercase tracking-widest mb-4 block">
              Pixel-Perfect Execution
            </span>
            <p className="font-sans text-[15px] text-white/70 leading-[1.7] mt-2">
              Proficient in design systems from Figma to code. Implements cinematic micro-interactions, Spline 3D animations, and glassmorphism UI — making interfaces feel alive, not static.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 2: ABOUT — Section 4 */}
      <section id="about" className="min-h-screen md:h-screen w-full flex flex-col justify-center py-16 md:py-12 border-t border-slate-900/60 relative z-10 bg-black/30 backdrop-blur-sm md:overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 md:h-full flex flex-col justify-between gap-8 md:gap-6">
          
          {/* Section title HUD */}
          <div className="flex flex-col gap-1 shrink-0">
            <span className="font-mono text-[11px] text-neon-cyan tracking-widest uppercase flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" /> 01. GET TO KNOW ME
            </span>
            <h2 className="font-heading font-black text-3xl md:text-4.5xl text-white uppercase tracking-wider leading-tight">
              The AI-Augmented Engineer with a Designer&apos;s Soul
            </h2>
          </div>

          {/* Double split deck: Holographic Avatar vs Biography */}
          <div className="md:flex-1 md:min-h-0 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-2">
            
            {/* Holographic Avatar Card */}
            <div className="lg:col-span-4 flex justify-center select-none">
              <HolographicAvatar />
            </div>

            {/* Biography details & Skill tags — Section 4 */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* 4a: Main bio in English */}
              <div className="flex flex-col gap-6 font-sans text-[15px] sm:text-base text-white/70 leading-[1.7] max-w-3xl">
                <p>
                  I don&apos;t define myself as a coder who hides behind terminal commands. I&apos;m an <strong className="text-white font-bold">AI-Augmented Engineer</strong> — someone who harnesses artificial intelligence to amplify creativity and push performance to its ceiling.
                </p>
                {/* 4b: Three trait blocks in English */}
                <div className="space-y-4">
                  <div className="border-l-2 border-neon-cyan pl-4">
                    <span className="font-heading font-bold text-white block mb-1">UI/UX Pro-Max Thinking</span>
                    <p className="text-[15px] text-white/70">
                      Great UI isn&apos;t just beautiful UI. It&apos;s the smoothness of every micro-interaction, the physics of every scroll. Libraries like Framer Motion and Antigravity let me realize designs that feel cinematic and intentional.
                    </p>
                  </div>

                  <div className="border-l-2 border-neon-pink pl-4">
                    <span className="font-heading font-bold text-white block mb-1">Spline 3D Mastery</span>
                    <p className="text-[15px] text-white/70">
                      Integrating 3D motion into web spaces is what separates my products from the static. Every scene is crafted to create immersive, depth-driven visual experiences.
                    </p>
                  </div>

                  <div className="border-l-2 border-neon-purple pl-4">
                    <span className="font-heading font-bold text-white block mb-1">Global-Ready Communication</span>
                    <p className="text-[15px] text-white/70">
                      With 950+ TOEIC, I operate fluently in international environments — from reading deep technical documentation to pitching solutions to cross-border partners.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4c: Skill tag grid replacing percentage bars */}
              <div className="flex flex-col gap-4 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Frontend column */}
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] text-neon-cyan font-bold uppercase tracking-widest">Frontend</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['React.js (3 yrs)', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'HTML/CSS'].map(s => (
                        <span key={s} className="font-mono text-xs text-white/80 bg-white/5 border border-neon-cyan/20 px-2.5 py-1 rounded-lg">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Backend column */}
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] text-neon-pink font-bold uppercase tracking-widest">Backend &amp; Infra</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Node.js', 'Express.js', 'MongoDB', 'Redis', 'Docker', 'Microservices', 'REST APIs', 'Git/GitHub'].map(s => (
                        <span key={s} className="font-mono text-xs text-white/80 bg-white/5 border border-neon-pink/20 px-2.5 py-1 rounded-lg">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* AI & Tooling row */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] text-neon-purple font-bold uppercase tracking-widest">AI &amp; Tooling</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Cursor AI', 'Claude API', 'Spline 3D', 'Figma', 'Antigravity', 'Odoo 18', 'PostgreSQL'].map(s => (
                      <span key={s} className="font-mono text-xs text-white/80 bg-white/5 border border-neon-purple/20 px-2.5 py-1 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TECH STACK (ORBITAL GRID) */}
      <section id="tech" className="min-h-screen md:h-screen w-full flex flex-col justify-center py-16 md:py-12 border-t border-slate-900/60 relative z-10 bg-black/30 backdrop-blur-sm md:overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 md:h-full flex flex-col justify-between gap-8 md:gap-6">
          
          {/* Section title HUD */}
          <div className="flex flex-col gap-1 shrink-0">
            <span className="font-mono text-[11px] text-neon-pink tracking-widest uppercase flex items-center gap-1.5 font-bold">
              <Layers className="w-3.5 h-3.5" /> 02. MY TOOLKIT
            </span>
            <h2 className="font-heading font-black text-3xl md:text-4.5xl text-white uppercase tracking-wider">
              Modern tools I use to build scalable products.
            </h2>
          </div>

          <div className="w-full md:flex-1 md:min-h-0 flex items-center justify-center">
            <OrbitalGrid />
          </div>
        </div>
      </section>

      {/* SECTION 4: PROJECTS */}
      <section id="projects" className="min-h-screen md:h-screen w-full flex flex-col justify-center py-16 md:py-12 border-t border-slate-900/60 relative z-10 bg-black/45 backdrop-blur-sm md:overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 md:h-full flex flex-col justify-between gap-8 md:gap-6">
          
          {/* Section title HUD */}
          <div className="flex flex-col gap-1 shrink-0">
            <span className="font-mono text-[11px] text-neon-purple tracking-widest uppercase flex items-center gap-1.5 font-bold">
              <FolderGit2 className="w-3.5 h-3.5" /> 03. FEATURED WORK
            </span>
            <h2 className="font-heading font-black text-3xl md:text-4.5xl text-white uppercase tracking-wider">
              Real-world projects built with passion.
            </h2>
          </div>

          {/* Interactive 3D Project Carousel */}
          <div className="md:flex-1 md:min-h-0 w-full flex items-center justify-center">
            <ProjectCarousel />
          </div>
        </div>
      </section>

      {/* SECTION 5: CONTACT */}
      <section id="contact" className="min-h-screen md:h-screen w-full flex flex-col justify-center py-16 md:py-12 border-t border-slate-900/60 relative z-10 bg-black/30 backdrop-blur-sm md:overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 md:h-full flex flex-col justify-between gap-8 md:gap-6">
          
          {/* Section title HUD */}
          <div className="flex flex-col gap-1 shrink-0">
            <span className="font-mono text-[11px] text-neon-cyan tracking-widest uppercase flex items-center gap-1.5 font-bold">
              <TermIcon className="w-3.5 h-3.5" /> 04. STAY IN TOUCH
            </span>
            <h2 className="font-heading font-black text-3xl md:text-4.5xl text-white uppercase tracking-wider">
              Let&apos;s build something amazing together.
            </h2>
          </div>

          {/* Terminal Command Contact Prompt */}
          <div className="md:flex-1 md:min-h-0 w-full flex items-center justify-center">
            <TerminalContact />
          </div>
        </div>
      </section>
    </div>
  );
}
