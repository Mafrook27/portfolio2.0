import React from 'react';

interface PushPinProps {
  colorClass?: string;
  className?: string;
}

export const PushPin: React.FC<PushPinProps> = ({ colorClass = '', className = '' }) => {
  return (
    <div className={`absolute top-[-22px] left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none ${colorClass} ${className}`} style={{ width: '32px', height: '42px' }}>
      <svg
        viewBox="0 0 50 65"
        className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Soft blurring filter for realistic ambient occlusion desk shadow */}
          <filter id="pin-shadow-filter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* 1. Realistic Cast Shadow (Fuzzy & Offset for true 3D depth) */}
        <g filter="url(#pin-shadow-filter)" opacity="0.32" transform="translate(4, 9) rotate(8 25 35)">
          {/* Shadow of metal needle */}
          <path d="M24.5 32 L24.5 58 L25.5 58 Z" fill="#000000" />
          {/* Shadow of plastic head */}
          <path 
            d="M17 14 C17 7, 33 7, 33 14 C33 15.5, 35 16, 35 17.5 C35 18.5, 32 19, 29.5 20 C28.5 21.5, 28.5 25, 29 27 C30 28.5, 36 29, 36 31 C36 34, 14 34, 14 31 C14 29, 20 28.5, 21 27 C21.5 25, 21.5 21.5, 20.5 20 C18 19, 15 18.5, 15 17.5 C15 16, 17 15.5, 17 14 Z" 
            fill="#000000" 
          />
        </g>

        {/* Outer tilted group for natural hand-pinned feel */}
        <g transform="rotate(-6 25 30)">
          {/* 2. Metal Needle (Pushed into board) - Solid Matte Silver */}
          <rect x="24.1" y="32" width="1.8" height="24" rx="0.5" fill="#a0aec0" />
          <path d="M24.1 56 L25 59 L25.9 56 Z" fill="#718096" />

          {/* 3. Plastic Colored Body - Solid Matte color from currentColor */}
          <path 
            className="transition-colors duration-300"
            d="M17 14 C17 7, 33 7, 33 14 C33 15.5, 35 16, 35 17.5 C35 18.5, 32 19, 29.5 20 C28.5 21.5, 28.5 25, 29 27 C30 28.5, 36 29, 36 31 C36 34, 14 34, 14 31 C14 29, 20 28.5, 21 27 C21.5 25, 21.5 21.5, 20.5 20 C18 19, 15 18.5, 15 17.5 C15 16, 17 15.5, 17 14 Z" 
            fill="currentColor" 
          />

          {/* 4. Illustrative Flat Dual-Tone Shadow (Gives 3D depth WITHOUT any glossy gradient light/sheen) */}
          <path 
            d="M25 7 C33 7, 33 14, 33 14 C33 15.5, 35 16, 35 17.5 C35 18.5, 32 19, 29.5 20 C28.5 21.5, 28.5 25, 29 27 C30 28.5, 36 29, 36 31 C36 34, 25 34, 25 34 Z" 
            fill="#000000" 
            opacity="0.15" 
          />
        </g>
      </svg>
    </div>
  );
};
