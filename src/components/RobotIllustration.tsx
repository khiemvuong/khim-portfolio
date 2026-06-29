"use client";

import { motion } from 'motion/react';

export default function RobotIllustration() {
  return (
    <div className="relative w-full h-[320px] md:h-[450px] flex items-center justify-center select-none">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Holographic scanner rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] border border-dashed border-neon-cyan/20 rounded-full flex items-center justify-center opacity-40 pointer-events-none"
      >
        <div className="w-[85%] h-[85%] border border-dotted border-neon-purple/30 rounded-full" />
      </motion.div>
  
      {/* Outer telemetry circles */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px] border border-dashed border-neon-pink/10 rounded-full pointer-events-none"
      />
  
      {/* Floating Robot Figure */}
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 1, -1, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative z-10 w-[200px] md:w-[280px] h-auto cursor-grab active:cursor-grabbing"
      >
        <svg viewBox="0 0 300 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]">
          {/* Signal path waves */}
          <path d="M50 120 C 30 110, 30 90, 50 80" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" opacity="0.5">
            <animate attributeName="stroke-dasharray" values="0 50; 50 0; 0 50" dur="2.5s" repeatCount="indefinite" />
          </path>
          <path d="M250 120 C 270 110, 270 90, 250 80" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" opacity="0.5">
            <animate attributeName="stroke-dasharray" values="0 50; 50 0; 0 50" dur="3s" repeatCount="indefinite" />
          </path>
  
          {/* Golden Ears/Atari Antennas */}
          <rect x="80" y="55" width="6" height="30" rx="3" fill="#A855F7" />
          <rect x="214" y="55" width="6" height="30" rx="3" fill="#A855F7" />
          <circle cx="83" cy="50" r="5" fill="#22D3EE" className="animate-pulse" />
          <circle cx="217" cy="50" r="5" fill="#EC4899" className="animate-pulse" />
  
          {/* Connective neck */}
          <rect x="135" y="145" width="30" height="20" rx="4" fill="#0D0D12" stroke="#312E81" strokeWidth="2" />
          <line x1="140" y1="155" x2="160" y2="155" stroke="#A855F7" strokeWidth="2" />
  
          {/* MAIN HEAD PANEL */}
          <rect x="90" y="70" width="120" height="85" rx="24" fill="#0F0F23" stroke="rgba(168,85,247,0.5)" strokeWidth="4" />
          
          {/* Holographic Glowing Visor */}
          <rect x="102" y="85" width="96" height="40" rx="14" fill="#06060F" stroke="#22D3EE" strokeWidth="2" />
          
          {/* Dynamic LED Matrix nodes inside Visor */}
          <g>
            {/* Visualizer bars */}
            <rect x="115" y="98" width="6" height="14" rx="2" fill="#22D3EE">
              <animate attributeName="height" values="8;18;8;12;8" dur="1s" repeatCount="indefinite" />
              <animate attributeName="y" values="101;96;101;99;101" dur="1s" repeatCount="indefinite" />
            </rect>
            <rect x="127" y="94" width="6" height="22" rx="2" fill="#22D3EE">
              <animate attributeName="height" values="14;24;14;18;14" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="y" values="98;93;98;96;98" dur="1.2s" repeatCount="indefinite" />
            </rect>
            <rect x="139" y="92" width="6" height="26" rx="2" fill="#EC4899">
              <animate attributeName="height" values="10;26;18;26;10" dur="0.8s" repeatCount="indefinite" />
              <animate attributeName="y" values="100;92;96;92;100" dur="0.8s" repeatCount="indefinite" />
            </rect>
            {/* Core focus eye */}
            <circle cx="162" cy="105" r="7" fill="#A855F7" />
            <circle cx="162" cy="105" r="3" fill="#FFF" className="animate-ping" />
            
            <rect x="178" y="94" width="6" height="14" rx="2" fill="#22D3EE">
              <animate attributeName="height" values="6;20;12;16;6" dur="0.9s" repeatCount="indefinite" />
              <animate attributeName="y" values="102;95;99;97;102" dur="0.9s" repeatCount="indefinite" />
            </rect>
            <rect x="190" y="100" width="6" height="10" rx="2" fill="#22D3EE">
              <animate attributeName="height" values="8;14;8;10;8" dur="1.3s" repeatCount="indefinite" />
              <animate attributeName="y" values="101;98;101;100;101" dur="1.3s" repeatCount="indefinite" />
            </rect>
          </g>
  
          {/* Glitch Overlay Text for extra sci-fi vibe */}
          <text x="140" y="142" fill="#22D3EE" fontSize="7" fontFamily="monospace" letterSpacing="1" opacity="0.7">MERN_SYS</text>
  
          {/* CHEST / TORSO */}
          <path d="M95 165 C75 165, 80 280, 110 285 L190 285 C220 280, 225 165, 205 165 Z" fill="#12122A" stroke="rgba(168,85,247,0.4)" strokeWidth="3" />
          
          {/* Reactor/Power Core */}
          <circle cx="150" cy="215" r="28" fill="#0C0C1E" stroke="#EC4899" strokeWidth="2" />
          <circle cx="150" cy="215" r="20" fill="#0A0A15" stroke="#22D3EE" strokeWidth="2" strokeDasharray="6 3">
            <animateTransform attributeName="transform" type="rotate" from="0 150 215" to="360 150 215" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="150" cy="215" r="10" fill="#A855F7" />
          <circle cx="150" cy="215" r="14" fill="none" stroke="#FFF" strokeWidth="2" opacity="0.3" className="animate-pulse" />
  
          {/* Shoulder joints */}
          <circle cx="78" cy="185" r="12" fill="#090915" stroke="#A855F7" strokeWidth="1.5" />
          <circle cx="222" cy="185" r="12" fill="#090915" stroke="#A855F7" strokeWidth="1.5" />
  
          {/* Left Arm (Floating and attached by tubes) */}
          <path d="M 66 185 Q 40 210, 50 245" stroke="#22D3EE" strokeWidth="4" strokeLinecap="round" />
          <rect x="38" y="240" width="22" height="35" rx="8" fill="#101026" stroke="#22D3EE" strokeWidth="2" />
          {/* Cyan repulsor */}
          <circle cx="49" cy="268" r="4" fill="#22D3EE" className="animate-pulse" />
  
          {/* Right Arm (Holding holographic tablet/code pane) */}
          <path d="M 234 185 Q 260 210, 250 245" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" />
          <rect x="240" y="240" width="22" height="35" rx="8" fill="#101026" stroke="#EC4899" strokeWidth="2" />
          {/* Pink claw */}
          <path d="M 244 275 L 240 282 M 258 275 L 262 282" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
  
          {/* Holographic glowing lines below body */}
          <line x1="120" y1="300" x2="180" y2="300" stroke="#22D3EE" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
          <line x1="130" y1="310" x2="170" y2="310" stroke="#A855F7" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
          <line x1="142" y1="318" x2="158" y2="318" stroke="#EC4899" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
        </svg>
  
        {/* Small hovering neon companion bot */}
        <motion.div
          animate={{ y: [0, 8, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-6 -right-6 w-10 h-10 bg-[#0F0F23] rounded-full border border-neon-cyan flex items-center justify-center p-1"
        >
          <div className="w-2 h-2 rounded-full bg-neon-cyan animate-ping absolute" />
          <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan z-10" />
          <svg viewBox="0 0 20 20" className="w-full h-full text-neon-purple stroke-current">
            <rect x="3" y="6" width="14" height="8" rx="2" fill="none" strokeWidth="1" />
          </svg>
        </motion.div>
      </motion.div>
  
      {/* Futuristic status stats */}
      <div className="absolute right-4 bottom-2 bg-[#0F0F23]/60 backdrop-blur border border-neon-purple/20 rounded px-3 py-1.5 font-mono text-[9px] pointer-events-none md:flex flex-col gap-0.5 hidden text-slate-400">
        <span className="text-neon-cyan font-bold">STATUS: STABLE</span>
        <span>LINK_ESTABLISHED: 100%</span>
        <span>CORE_TEMP: 32.4°C</span>
        <span>PWR_LEVEL: MAX</span>
      </div>
    </div>
  );
}
