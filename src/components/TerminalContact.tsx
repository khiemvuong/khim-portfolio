"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, CheckCircle2, RefreshCw, Sparkles, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LiquidGlassCard } from './ui/liquid-weather-glass';

// Custom SVG Brand Icons
const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FaceBook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default function TerminalContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'SYSTEM: Initialize secure proxy handshake...',
    'AUTH: Guest credentials generated [guest_user_#421]',
    'PORT: Gateway peer /api/contact ready.',
    'INFO: vuongkhiem56@gmail.com · github.com/khiemvuong · Ho Chi Minh City, Vietnam'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const ping = 24;
  const logsContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of logs on new event
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleNameFocus = useCallback(() => setActiveInput('name'), []);
  const handleEmailFocus = useCallback(() => setActiveInput('email'), []);
  const handleSubjectFocus = useCallback(() => setActiveInput('subject'), []);
  const handleMessageFocus = useCallback(() => setActiveInput('message'), []);
  const handleBlur = useCallback(() => setActiveInput(null), []);

  // Quick select presets to boost UX conversion
  const handlePresetSelect = useCallback((subject: string, message: string) => {
    setFormData(prev => ({ ...prev, subject, message }));
    setTerminalLogs(prev => [
      ...prev,
      `USER: Preset template selected -> [${subject}]`
    ]);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setTerminalLogs(prev => [
        ...prev,
        '>> [CRITICAL] ER_MANDATORY_FIELD: Missing guest identity parameters.'
      ]);
      return;
    }

    setIsSubmitting(true);
    setTerminalLogs(prev => [
      ...prev,
      `>> exec_tunnel --client="${formData.name}" --subject="${formData.subject || 'COLLAB'}"`,
      '[LOG] Routing socket coordinates via TLS_1.3...',
      '[LOG] Compiling visual packet structure...',
      '[LOG] Attempting proxy handshake...'
    ]);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setTerminalLogs(prev => [
          ...prev,
          '[SUCCESS] Tunnel connection established!',
          `>> RESPONSE: 200 OK. HASH: ${result.hash || 'AES_SHA256_CONNECT'}`,
          '[SYSTEM] Packet routed successfully. Closing connection.'
        ]);
        setIsCompleted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setTerminalLogs(prev => [
          ...prev,
          `>> [ERROR] ROUTE_REFUSED: Server returned code ${response.status}`,
          `>> REASON: ${result.message || response.statusText}`
        ]);
      }
    } catch (err: unknown) {
      setTerminalLogs(prev => [
        ...prev,
        `>> [CRITICAL] CONN_TIMEOUT: SSL handshake failed. ${err instanceof Error ? err.message : 'Host unreachable'}`
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Immersive Futuristic Cyber-Terminal */}
      <LiquidGlassCard
        draggable={false}
        borderRadius="20px"
        blurIntensity="xl"
        glowIntensity="sm"
        shadowIntensity="sm"
        className="w-full bg-[#070714]/80 overflow-hidden border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)] relative"
      >
        {/* Neon decorative grid line & glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-neon-cyan/50 to-transparent" />
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-24 bg-neon-cyan/10 blur-3xl pointer-events-none rounded-full" />

        {/* Top Control Bar */}
        <div className="flex bg-[#03030a] border-b border-white/10 px-5 py-2 items-center justify-between select-none">
          <div className="flex items-center gap-2.5 font-mono text-[10px]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 shadow-[0_0_8px_#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]/80 shadow-[0_0_8px_#eab308]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/80 shadow-[0_0_8px_#22c55e]" />
            <span className="text-slate-500 font-bold uppercase tracking-widest ml-3">khiem@futur-os:~/contact-gate</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[9px] text-neon-cyan/80">
            <span className="flex items-center gap-1.5 bg-neon-cyan/5 border border-neon-cyan/20 rounded-md px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              STATUS: SECURE
            </span>
            <span className="hidden sm:inline-block text-slate-500">
              PING: <span className="text-neon-pink font-bold">{ping}ms</span>
            </span>
          </div>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[320px] lg:min-h-[360px]">
          
          {/* Left Form Panel */}
          <div className="lg:col-span-7 p-4 sm:p-5 lg:p-6 flex flex-col gap-4 border-r border-white/5 relative z-10">
            
            {/* Quick Presets for outstanding UX */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Quick uplink parameters</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handlePresetSelect('Project Collaboration', 'Hi Khiêm, I would like to collaborate on an interactive web application project. Let\'s connect!')}
                  className="px-3 py-1.5 rounded-md font-mono text-[9px] uppercase border border-white/5 hover:border-neon-cyan/40 bg-white/5 hover:bg-neon-cyan/5 text-slate-300 hover:text-neon-cyan transition-all cursor-pointer select-none"
                >
                  [ Collaboration ]
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetSelect('Job Inquiry', 'Hi Khiêm, We are looking for a Senior Developer with your skill set. Let\'s schedule an interview.')}
                  className="px-3 py-1.5 rounded-md font-mono text-[9px] uppercase border border-white/5 hover:border-neon-pink/40 bg-white/5 hover:bg-neon-pink/5 text-slate-300 hover:text-neon-pink transition-all cursor-pointer select-none"
                >
                  [ Hire Me ]
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetSelect('Quick Shoutout', 'Hi Khiêm, Love your portfolio work and the cybernetic terminal design! Cheers.')}
                  className="px-3 py-1.5 rounded-md font-mono text-[9px] uppercase border border-white/5 hover:border-neon-purple/40 bg-white/5 hover:bg-neon-purple/5 text-slate-300 hover:text-neon-purple transition-all cursor-pointer select-none"
                >
                  [ Say Hello ]
                </button>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-3.5">
              
              {/* Form Input: Name */}
              <div className="flex flex-col gap-1.5 relative group">
                <label className="font-mono text-[9px] text-neon-purple font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span>{"// YOUR_NAME"}</span>
                  {activeInput === 'name' && <span className="w-1 h-3 bg-neon-cyan animate-pulse inline-block" />}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={handleNameFocus}
                  onBlur={handleBlur}
                  required
                  disabled={isSubmitting}
                  placeholder="Full name"
                  className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-neon-purple/80 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] rounded-lg px-3.5 py-2 font-mono text-xs text-white placeholder-slate-600 focus:outline-none transition-all duration-300"
                />
              </div>

              {/* Form Input: Email */}
              <div className="flex flex-col gap-1.5 relative group">
                <label className="font-mono text-[9px] text-neon-purple font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span>{"// YOUR_EMAIL"}</span>
                  {activeInput === 'email' && <span className="w-1 h-3 bg-neon-pink animate-pulse inline-block" />}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={handleEmailFocus}
                  onBlur={handleBlur}
                  required
                  disabled={isSubmitting}
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-neon-purple/80 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] rounded-lg px-3.5 py-2 font-mono text-xs text-white placeholder-slate-600 focus:outline-none transition-all duration-300"
                />
              </div>

              {/* Form Input: Subject */}
              <div className="flex flex-col gap-1.5 relative group">
                <label className="font-mono text-[9px] text-neon-purple font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span>{"// SUBJECT"}</span>
                  {activeInput === 'subject' && <span className="w-1 h-3 bg-neon-purple animate-pulse inline-block" />}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={handleSubjectFocus}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  placeholder="Collaboration · Hire · Say hello"
                  className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-neon-purple/80 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] rounded-lg px-3.5 py-2 font-mono text-xs text-white placeholder-slate-600 focus:outline-none transition-all duration-300"
                />
              </div>

              {/* Form Input: Message */}
              <div className="flex flex-col gap-1.5 relative group">
                <label className="font-mono text-[9px] text-neon-purple font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span>{"// MESSAGE"}</span>
                  {activeInput === 'message' && <span className="w-1 h-3 bg-neon-cyan animate-pulse inline-block" />}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={handleMessageFocus}
                  onBlur={handleBlur}
                  required
                  rows={2}
                  disabled={isSubmitting}
                  placeholder="Write your message here..."
                  className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-neon-purple/80 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] rounded-lg px-3.5 py-2 font-mono text-xs text-white placeholder-slate-600 focus:outline-none transition-all duration-300 resize-none"
                />
              </div>

              {/* Dynamic submit action */}
              <div className="mt-2 relative select-none">
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className={`w-full py-2 rounded-lg font-mono font-black text-[10px] uppercase cursor-pointer flex items-center gap-2 justify-center transition-all duration-300 border ${
                    isSubmitting
                      ? 'bg-slate-800/40 text-slate-500 border-slate-700/50 cursor-not-allowed'
                      : !isFormValid
                      ? 'bg-white/5 text-slate-500 border-white/5 cursor-not-allowed'
                      : 'bg-white text-black hover:bg-neon-cyan hover:text-black border-transparent hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] tracking-[0.2em]'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      TUNNELING DATA...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-3.5 h-3.5" />
                      TRANSMIT PACKET
                    </span>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* Right Console output screen */}
          <div className="lg:col-span-5 bg-[#030308]/90 p-4 sm:p-5 lg:p-6 flex flex-col justify-between font-mono text-[10px] leading-relaxed border-t lg:border-t-0 border-white/5 relative">
            <div className="absolute inset-0 bg-radial-to-b from-neon-cyan/2 via-transparent to-transparent pointer-events-none" />
            
            <div className="flex flex-col gap-3 relative z-10">
              <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[9px] text-slate-500">
                <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-neon-pink" /> LOGSTREAM_TNL</span>
              </div>

              <div 
                ref={logsContainerRef}
                className="flex flex-col gap-2 overflow-y-auto max-h-[170px] lg:max-h-[210px] bg-black/40 border border-white/5 rounded-lg p-3 scrollbar-thin scrollbar-thumb-white/10"
              >
                {terminalLogs.map((log, index) => {
                  let color = 'text-slate-400';
                  if (log.startsWith('>> ')) color = 'text-[#22D3EE] font-bold';
                  else if (log.startsWith('[SUCCESS]')) color = 'text-emerald-400 font-bold';
                  else if (log.startsWith('>> [ERROR]') || log.startsWith('>> [CRITICAL]')) color = 'text-rose-500 font-bold';
                  else if (log.startsWith('USER:')) color = 'text-amber-400';
                  else if (log.startsWith('AUTH:')) color = 'text-indigo-400';
                  else if (log.startsWith('SYSTEM:')) color = 'text-purple-400';

                  return (
                    <div key={index} className={`${color} break-all select-text`}>
                      {log}
                    </div>
                  );
                })}

              </div>
            </div>

            {/* Signature HUD details */}
            <div className="border-t border-white/5 pt-4 mt-4 text-slate-500 text-[8px] flex justify-between uppercase select-none relative z-10">
              <span>PORT: 3000 // CRYPTO_TUNNEL</span>
              <span>KHIEM_OS v2.0_PRO</span>
            </div>
          </div>

        </div>

        {/* Global Connection / Success Alert Banner */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="absolute bottom-0 left-0 right-0 z-30 bg-emerald-950/95 border-t border-emerald-500/30 px-6 py-4 flex items-center justify-between text-emerald-400 select-none rounded-b-[20px]"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 shadow-[0_0_10px_#10b981]" />
                <div>
                  <h4 className="font-bold font-heading text-slate-100 uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                    UPLINK TUNNEL SECURED
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  </h4>
                  <p className="text-[9px] font-mono text-emerald-500 mt-0.5">Transmission saved correctly. Peer gateway returned status 200.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsCompleted(false)}
                className="text-[9px] font-mono font-bold text-slate-300 hover:text-white shrink-0 bg-emerald-900/40 border border-emerald-500/20 px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
              >
                CLOSE PORT
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </LiquidGlassCard>

      {/* Cybernetic Social Link Nodes */}
      <div className="flex justify-center gap-6 mt-4 select-none">
        {[
          { icon: Github, href: 'https://github.com/khiemvuong', color: '#22D3EE', label: 'GitHub' },
          { icon: Linkedin, href: 'https://linkedin.com/in/vuongkhiem56', color: '#A855F7', label: 'LinkedIn' },
          { icon: FaceBook, href: 'https://www.facebook.com/zakhiimm/', color: '#EC4899', label: 'Twitter' }
        ].map((soc, i) => (
          <motion.a
            key={i}
            href={soc.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-12 h-12 rounded-full border border-white/5 hover:border-transparent flex items-center justify-center transition-all bg-[#070714]/60 cursor-pointer"
            whileHover={{ scale: 1.15 }}
          >
            {/* Concentric rotating border */}
            <span 
              className="absolute inset-[-4px] border border-dashed rounded-full opacity-0 group-hover:opacity-100 animate-spin"
              style={{ 
                borderColor: soc.color,
                animationDuration: '8s',
                boxShadow: `0 0 12px ${soc.color}30`
              }}
            />
            {/* Glow backing */}
            <span 
              className="absolute inset-0 border border-transparent group-hover:border rounded-full transition-colors"
              style={{ borderColor: `${soc.color}20` }}
            />
            {/* Brand Logo */}
            <soc.icon 
              className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors"
              style={{
                filter: `drop-shadow(0 0 2px ${soc.color}00)`
              }}
            />
            <span className="sr-only">{soc.label}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
