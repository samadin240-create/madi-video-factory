
import React from 'react';
import {useCurrentFrame} from 'remotion';

export const Piston: React.FC = () => {
  const frame = useCurrentFrame();

  const angle = (frame / 90) * Math.PI * 2;
  const radius = 55;
  const rodLength = 190;
  const crankY = 470;

  const crankX = 300 + radius * Math.sin(angle);
  const crankPinY = crankY - radius * Math.cos(angle);

  const pistonPinY =
    crankY -
    (radius * Math.cos(angle) +
      Math.sqrt(rodLength ** 2 - (radius * Math.sin(angle)) ** 2));

  return (
    <svg viewBox="0 0 600 620" width="100%" height="100%">
      <defs>
        <linearGradient id="metal" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="45%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="piston" x1="0" x2="1">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="50%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>

      {/* Cylinder walls */}
      <rect x="175" y="65" width="250" height="370"
        rx="12" fill="#1E293B" stroke="#94A3B8" strokeWidth="8" />

      <rect x="195" y="80" width="210" height="340"
        fill="#0F172A" />

      {/* Combustion chamber */}
      <rect x="205" y="82" width="190" height="65"
        rx="8" fill="#F97316" opacity="0.18" />

      {/* Connecting rod */}
      <line
        x1="300"
        y1={pistonPinY}
        x2={crankX}
        y2={crankPinY}
        stroke="#94A3B8"
        strokeWidth="24"
        strokeLinecap="round"
      />
      <line
        x1="300"
        y1={pistonPinY}
        x2={crankX}
        y2={crankPinY}
        stroke="#E2E8F0"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Piston body */}
      <rect
        x="210"
        y={pistonPinY - 45}
        width="180"
        height="85"
        rx="9"
        fill="url(#piston)"
        stroke="#E2E8F0"
        strokeWidth="3"
      />

      {/* Piston rings */}
      {[0, 12, 24].map((offset) => (
        <rect
          key={offset}
          x="211"
          y={pistonPinY - 35 + offset}
          width="178"
          height="5"
          fill="#0F172A"
        />
      ))}

      {/* Wrist pin */}
      <circle cx="300" cy={pistonPinY} r="13"
        fill="#0F172A" stroke="#CBD5E1" strokeWidth="5" />

      {/* Crankshaft */}
      <circle cx="300" cy={crankY} r="95"
        fill="none" stroke="#334155" strokeWidth="18" />

      <circle cx="300" cy={crankY} r="16"
        fill="#64748B" stroke="#CBD5E1" strokeWidth="5" />

      <circle cx={crankX} cy={crankPinY} r="19"
        fill="#38BDF8" stroke="#E0F2FE" strokeWidth="5" />

      <text x="300" y="590" textAnchor="middle"
        fill="#38BDF8" fontSize="23" fontWeight="bold">
        PISTON & CRANKSHAFT
      </text>
    </svg>
  );
};
