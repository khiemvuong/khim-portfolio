'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, WifiOff, Terminal } from 'lucide-react';

export default function NotDeployedPage() {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/#projects');
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#070714] text-slate-100 relative p-6 overflow-hidden">
      {/* Background grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b10_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b10_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none" />
      
      {/* Holographic scanning line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-neon-pink/40 to-transparent animate-scanline" />

      {/* Cyberpunk Alert Card */}
      <div className="max-w-md w-full bg-[#0d0d21]/60 backdrop-blur-xl border border-neon-pink/20 rounded-2xl p-8 shadow-[0_0_50px_rgba(236,72,153,0.1)] relative overflow-hidden group">
        {/* Glow corner lines */}
        <div className="absolute top-0 left-0 w-8 h-px bg-neon-pink" />
        <div className="absolute top-0 left-0 w-px h-8 bg-neon-pink" />
        <div className="absolute bottom-0 right-0 w-8 h-px bg-neon-pink" />
        <div className="absolute bottom-0 right-0 w-px h-8 bg-neon-pink" />

        {/* Warning Icon Graphic */}
        <div className="w-16 h-16 rounded-full bg-neon-pink/10 border border-neon-pink/30 flex items-center justify-center mx-auto mb-6 relative">
          <WifiOff className="w-8 h-8 text-neon-pink animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-dashed border-neon-pink/25 animate-spin" style={{ animationDuration: '12s' }} />
        </div>

        {/* Text Header */}
        <div className="text-center mb-8">
          <span className="font-mono text-[9px] text-neon-pink font-bold tracking-widest uppercase bg-neon-pink/10 px-2.5 py-1 rounded mb-3 inline-block">
            ERR_DEPLOYMENT_OFFLINE
          </span>
          <h1 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
            NO ACTIVE DEPLOYMENT
          </h1>
          <p className="font-mono text-xs text-slate-400 mt-4 leading-relaxed">
            This project has not been assigned a public live uplink (not deployed). It is currently running in a local sandbox environment.
          </p>
        </div>

        {/* Console Box */}
        <div className="bg-black/50 border border-white/5 rounded-lg p-4 font-mono text-[10px] text-slate-500 mb-8 leading-relaxed">
          <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2">
            <Terminal className="w-3.5 h-3.5 text-neon-pink" />
            <span>SYS_LOG: VERIFY_HOST</span>
          </div>
          <div>&gt;&gt; host_query --target=live_url</div>
          <div className="text-neon-pink">&gt;&gt; [ALERT] null_reference_exception</div>
          <div>&gt;&gt; deployment status: OFFLINE</div>
        </div>

        {/* Back Link */}
        <button 
          onClick={handleBack}
          className="w-full py-3 rounded-lg bg-white/5 border border-white/10 hover:border-neon-pink/50 text-slate-300 hover:text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer hover:bg-neon-pink/5"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Deck
        </button>
      </div>
    </main>
  );
}
