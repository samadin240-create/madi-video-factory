
import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

type PistonProps = {
  phase?: 'intake' | 'compression' | 'injection' | 'power' | 'rotation';
};

export const Piston: React.FC<PistonProps> = ({phase = 'rotation'}) => {
  const frame = useCurrentFrame();
  const t = frame / 30;

  const phaseSettings = {
    intake: {top: 230, bottom: 330, color: '#38BDF8'},
    compression: {top: 115, bottom: 225, color: '#F59E0B'},
    injection: {top: 105, bottom: 145, color: '#F97316'},
    power: {top: 105, bottom: 330, color: '#EF4444'},
    rotation: {top: 150, bottom: 310, color: '#38BDF8'},
  };

  const settings = phaseSettings[phase];
  const cycle = (frame % 120) / 120;
  const movement = (1 - Math.cos(cycle * Math.PI * 2)) / 2;
  const pistonY = phase === 'power'
    ? interpolate(movement, [0, 1], [180, 330])
    : phase === 'compression'
      ? interpolate(movement, [0, 1], [330, 115])
      : phase === 'intake'
        ? interpolate(movement, [0, 1], [115, 330])
        : interpolate(movement, [0, 1], [settings.top, settings.bottom]);

  const crankAngle = cycle * Math.PI * 2;
  const crankX = 300 + 55 * Math.sin(crankAngle);
  const crankY = 470 - 55 * Math.cos(crankAngle);
  const rodTop = pistonY + 35;

  const heatOpacity = phase === 'compression'
    ? 0.25 + movement * 0.6
    : phase === 'injection'
      ? 0.85
      : phase === 'power'
        ? 0.9
        : 0.08;

  const flameOpacity = phase === 'power'
    ? 0.5 + Math.abs(Math.sin(t * 12)) * 0.5
    : phase === 'injection'
      ? 0.25
      : 0;

  return (
    <svg viewBox="0 0 600 620" width="100%" height="100%">
      <defs>
        <linearGradient id="piston-metal" x1="0" x2="1">
          <stop offset="0%" stopColor="#475569"/>
          <stop offset="50%" stopColor="#E2E8F0"/>
          <stop offset="100%" stopColor="#475569"/>
        </linearGradient>
        <radialGradient id="heat">
          <stop offset="0%" stopColor="#FDE047"/>
          <stop offset="55%" stopColor="#F97316"/>
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Cylinder */}
      <rect x="175" y="65" width="250" height="370"
        rx="12" fill="#1E293B" stroke="#94A3B8" strokeWidth="8"/>
      <rect x="195" y="80" width="210" height="340"
        fill="#0F172A"/>

      {/* Heat and combustion */}
      <ellipse cx="300" cy="145" rx="95" ry="65"
        fill="url(#heat)" opacity={heatOpacity}/>
      <ellipse cx="300" cy="145" rx="75" ry="55"
        fill="#F97316" opacity={flameOpacity}/>

      {/* Air intake flow */}
      {phase === 'intake' && [0, 1, 2, 3].map((i) => {
        const y = 105 + ((frame * 4 + i * 75) % 240);
        return (
          <g key={i} opacity="0.9">
            <path d={`M ${220 + i * 40} ${y} l 0 25 m -8 -8 l 8 8 l 8 -8`}
              stroke="#38BDF8" strokeWidth="5" fill="none"
              strokeLinecap="round"/>
            <circle cx={220 + i * 40} cy={y} r="5" fill="#7DD3FC"/>
          </g>
        );
      })}

      {/* Compression heat waves */}
      {phase === 'compression' && [0, 1, 2].map((i) => (
        <path key={i}
          d={`M ${220 + i * 40} 115 q 15 -18 0 -35`}
          stroke="#FBBF24" strokeWidth="5" fill="none"
          opacity={0.35 + Math.abs(Math.sin(t * 5 + i)) * 0.65}/>
      ))}

      {/* Fuel injector */}
      <rect x="280" y="25" width="40" height="65"
        rx="8" fill="#64748B" stroke="#CBD5E1" strokeWidth="4"/>
      <path d="M290 90 L310 90 L300 108 Z" fill="#94A3B8"/>

      {/* Diesel spray */}
      {(phase === 'injection' || phase === 'power') &&
        [0, 1, 2, 3, 4, 5, 6].map((i) => {
          const length = 25 + ((frame * 3 + i * 11) % 35);
          return (
            <path key={i}
              d={`M300 110 L${300 + (i - 3) * 13} ${110 + length}`}
              stroke="#FBBF24" strokeWidth="4"
              strokeLinecap="round"
              opacity={0.4 + Math.abs(Math.sin(t * 8 + i)) * 0.6}/>
          );
        })}

      {/* Combustion sparks */}
      {phase === 'power' && [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <circle key={i}
          cx={300 + Math.cos(t * 5 + i) * (25 + i * 5)}
          cy={145 + Math.sin(t * 5 + i) * (20 + i * 3)}
          r={3 + (i % 3) * 2}
          fill="#FDE047"/>
      ))}

      {/* Connecting rod */}
      <line x1="300" y1={rodTop} x2={crankX} y2={crankY}
        stroke="#94A3B8" strokeWidth="24" strokeLinecap="round"/>
      <line x1="300" y1={rodTop} x2={crankX} y2={crankY}
        stroke="#E2E8F0" strokeWidth="8" strokeLinecap="round"/>

      {/* Piston */}
      <rect x="210" y={pistonY - 45} width="180" height="85"
        rx="9" fill="url(#piston-metal)"
        stroke="#E2E8F0" strokeWidth="3"/>

      {[0, 12, 24].map((offset) => (
        <rect key={offset} x="211" y={pistonY - 35 + offset}
          width="178" height="5" fill="#0F172A"/>
      ))}

      <circle cx="300" cy={pistonY} r="13"
        fill="#0F172A" stroke="#CBD5E1" strokeWidth="5"/>

      {/* Crankshaft */}
      <circle cx="300" cy="470" r="95"
        fill="none" stroke="#334155" strokeWidth="18"/>
      <circle cx="300" cy="470" r="16"
        fill="#64748B" stroke="#CBD5E1" strokeWidth="5"/>
      <circle cx={crankX} cy={crankY} r="19"
        fill="#38BDF8" stroke="#E0F2FE" strokeWidth="5"/>

      <text x="300" y="590" textAnchor="middle"
        fill={settings.color} fontSize="23" fontWeight="bold">
        {phase.toUpperCase()}
      </text>
    </svg>
  );
};
