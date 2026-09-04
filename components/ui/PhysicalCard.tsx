import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface PhysicalCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  tiltRange?: number; // Maximum rotation in degrees (default: 5)
  isTaped?: boolean;  // If true, the card is taped down and cannot tilt, lift, or scale
  whileHover?: Record<string, unknown>; // Extra framer-motion hover animation
}

export const PhysicalCard: React.FC<PhysicalCardProps> = ({
  children,
  className = '',
  style = {},
  href,
  target,
  rel,
  onClick,
  tiltRange = 5,
  isTaped = false,
  whileHover,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const disabled = tiltRange === 0 || isTaped;

  // Motion values for normalized mouse pointer (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation and translation
  const springConfig = { damping: 22, stiffness: 150, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltRange, -tiltRange]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltRange, tiltRange]), springConfig);
  
  // High-fidelity lift on hover
  const liftY = useMotionValue(0);
  const springLiftY = useSpring(liftY, springConfig);

  // Smooth shadow expansion based on lift
  const shadowSpread = useSpring(useTransform(liftY, [0, -8], [4, 12]), springConfig);
  const shadowBlur = useSpring(useTransform(liftY, [0, -8], [12, 28]), springConfig);
  const shadowOpacity = useSpring(useTransform(liftY, [0, -8], [0.05, 0.09]), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position of cursor relative to center of the card
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;

    // Normalize coordinates
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    liftY.set(-8); // Lift card smoothly
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    // Return smoothly to flat resting state
    x.set(0);
    y.set(0);
    liftY.set(0);
  };

  const Component = href ? motion.a : motion.div;

  return (
    <Component
      ref={cardRef as any}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={`desk-card ${disabled ? 'taped-card' : ''} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        rotateX: disabled ? 0 : rotateX,
        rotateY: disabled ? 0 : rotateY,
        y: disabled ? 0 : springLiftY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      whileHover={whileHover as any}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      {/* 3D Parallax Layer for Inner Content */}
      <div style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }} className="h-full w-full">
        {children}
      </div>
    </Component>
  );
};
