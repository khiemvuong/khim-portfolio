"use client";

export default function HomeMeshBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none select-none w-full h-full overflow-hidden bg-[#070714]">
      {/* Base Space Nebula Background (Stretched & Fixed to eliminate seams) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url("/project-image/bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          filter: 'brightness(0.48) contrast(1.1) saturate(0.9)', // Adjusted brightness for perfect balance
        }}
      />

      {/* Cyber Dot Grid Overlay (Masks scaling/seams and adds technical details) */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(rgba(34,211,238,0.2) 1.2px, transparent 1.2px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Deep Radial Vignette (Smooths out screen edges and centers focus) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(7,7,20,0.85)_100%)]" />
    </div>
  );
}
