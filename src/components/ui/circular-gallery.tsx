import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';
import { cn } from "@/lib/utils";

// Define the type for a single gallery item (kept for backward compatibility if needed)
export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string; 
    text: string;
    pos?: string;
    by: string;
  };
}

// Define the props for the generic CircularGallery component
export interface CircularGalleryProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  items: T[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling. */
  autoRotateSpeed?: number;
  /** Custom render function for each item */
  renderItem: (item: T, index: number, opacity: number) => React.ReactNode;
}

const CircularGalleryInner = <T,>(
  { items, className, radius = 600, autoRotateSpeed = 0.02, renderItem, ...props }: CircularGalleryProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const [rotation, setRotation] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Effect to handle scroll-based rotation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      const scrollRotation = scrollProgress * 360;
      setRotation(scrollRotation);

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Effect for auto-rotation when not scrolling and not hovered
  useEffect(() => {
    const autoRotate = () => {
      if (!isScrolling && !isHovered) {
        setRotation(prev => prev + autoRotateSpeed);
      }
      animationFrameRef.current = requestAnimationFrame(autoRotate);
    };

    animationFrameRef.current = requestAnimationFrame(autoRotate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isScrolling, isHovered, autoRotateSpeed]);

  const anglePerItem = 360 / items.length;
  
  return (
    <div
      ref={ref}
      role="region"
      aria-label="Circular 3D Gallery"
      className={cn("relative w-full h-full flex items-center justify-center", className)}
      style={{ perspective: '2000px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div
        className="relative w-full h-full"
        style={{
          transform: `rotateY(${rotation}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {items.map((item, i) => {
          const itemAngle = i * anglePerItem;
          const totalRotation = rotation % 360;
          const relativeAngle = (itemAngle + totalRotation + 360) % 360;
          const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
          const opacity = Math.max(0.3, 1 - (normalizedAngle / 180));

          return (
            <div
              key={i} 
              role="group"
              className="absolute w-[300px] h-[400px]"
              style={{
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                left: '50%',
                top: '50%',
                marginLeft: '-150px',
                marginTop: '-200px',
                opacity: opacity,
                transition: 'opacity 0.3s linear',
                transformStyle: 'preserve-3d',
              }}
            >
              {renderItem(item, i, opacity)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const CircularGallery = React.forwardRef(CircularGalleryInner) as <T>(
  props: CircularGalleryProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;
