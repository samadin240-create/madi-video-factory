import React from 'react';
import { useCurrentFrame } from 'remotion';

interface GearProps {
  x: number;
  y: number;
  radius: number;
  teeth: number;
  rotation: number;
}

const COLORS = {
  metal: '#8293A8',
  highlight: '#DCE6F1',
  dark: '#263648',
  center: '#111B29',
  accent: '#36B9D8',
};

const Gear: React.FC<GearProps> = ({
  x,
  y,
  radius,
  teeth,
  rotation,
}) => {
  const points: string[] = [];

  const steps = teeth * 4;

  for (let i = 0; i < steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const phase = i % 4;

    const r =
      phase === 1 || phase === 2
        ? radius * 1.12
        : radius * 0.96;

    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * r;

    points.push(`${px},${py}`);
  }

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      <polygon
        points={points.join(' ')}
        fill={COLORS.metal}
        stroke={COLORS.highlight}
        strokeWidth="3"
      />

      <circle
        r={radius * 0.72}
        fill={COLORS.dark}
        stroke={COLORS.highlight}
        strokeWidth="4"
      />

      {Array.from({ length: 8 }).map((_, i) => (
        <g
          key={i}
          transform={`rotate(${i * 45})`}
        >
          <rect
            x="-5"
            y={-radius * 0.65}
            width="10"
            height={radius * 0.24}
            rx="3"
            fill={COLORS.accent}
          />
        </g>
      ))}

      <circle
        r={radius * 0.22}
        fill={COLORS.center}
        stroke={COLORS.highlight}
        strokeWidth="4"
      />

      <circle
        r={radius * 0.08}
        fill={COLORS.accent}
      />
    </g>
  );
};

export const GearSystem: React.FC = () => {
  const frame = useCurrentFrame();

  const rotation = frame * 1.2;

  const gear1Radius = 150;
  const gear2Radius = 105;

  const distance =
    gear1Radius * 1.04 +
    gear2Radius * 1.04;

  return (
    <svg
      viewBox="0 0 1200 700"
      width="100%"
      height="100%"
    >
      <defs>
        <radialGradient id="gearBackground">
          <stop offset="0%" stopColor="#17283B" />
          <stop offset="100%" stopColor="#070D16" />
        </radialGradient>
      </defs>

      <rect
        width="1200"
        height="700"
        fill="url(#gearBackground)"
      />

      <g opacity="0.12" stroke="#5E7793">
        {Array.from({ length: 18 }).map((_, i) => (
          <line
            key={i}
            x1={i * 70}
            y1="0"
            x2={i * 70}
            y2="700"
          />
        ))}
      </g>

      <Gear
        x={600 - distance / 2}
        y={350}
        radius={gear1Radius}
        teeth={24}
        rotation={rotation}
      />

      <Gear
        x={600 + distance / 2}
        y={350}
        radius={gear2Radius}
        teeth={16}
        rotation={-rotation * 1.5}
      />

      <text
        x="600"
        y="620"
        fill={COLORS.highlight}
        fontSize="24"
        textAnchor="middle"
        letterSpacing="8"
      >
        PRECISION GEAR TRANSMISSION
      </text>
    </svg>
  );
};
