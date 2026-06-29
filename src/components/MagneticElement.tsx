"use client";

import React, { useRef, useState, ReactNode } from 'react';
import { motion } from 'motion/react';

interface MagneticElementProps {
  children: ReactNode;
  range?: number;
  strength?: number;
  className?: string;
  id?: string;
}

export default function MagneticElement({
  children,
  range = 60,
  strength = 0.35,
  className = '',
  id,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    // Disable on mobile/touch
    if (window.innerWidth < 768) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate center of the element
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Distance from center to cursor
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.hypot(dx, dy);

    if (distance < range) {
      // Pull element towards cursor with specified strength
      setPosition({ x: dx * strength, y: dy * strength });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      id={id}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
