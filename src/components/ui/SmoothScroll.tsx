'use client';

import React, { useEffect } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const shouldUseNativeScroll =
      window.matchMedia('(max-width: 767px)').matches ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (shouldUseNativeScroll) return;

    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let frameId: number | null = null;
    let cancelled = false;

    const startSmoothScroll = async () => {
      const { default: Lenis } = await import('lenis');
      if (cancelled) return;

      lenis = new Lenis({
        lerp: 0.12,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frameId = requestAnimationFrame(raf);
      };

      frameId = requestAnimationFrame(raf);
    };

    void startSmoothScroll();

    return () => {
      cancelled = true;
      lenis?.destroy();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return <>{children}</>;
}
