import React from 'react';
import {
  AbsoluteFill,
  Audio,
  staticFile,
  Sequence,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

const C = {
  bg: '#080D18',
  panel: '#111C2E',
  yellow: '#FACC15',
  blue: '#38BDF8',
  oil: '#22C55E',
  white: '#F8FAFC',
  muted: '#94A3B8',
  metal: '#64748B',
};

const scenes = [
  {
    title: 'HOW CAN IT LIFT',
    subtitle: 'TONS OF EARTH?',
    detail: 'The secret is hydraulic power.',
    color: C.yellow,
    type: 'hero',
  },
  {
    title: '1. DIESEL ENGINE',
    subtitle: 'The engine drives a hydraulic pump.',
    detail: 'Mechanical power becomes hydraulic power.',
    color: C.blue,
    type: 'engine',
  },
  {
    title: '2. HYDRAULIC PUMP',
    subtitle: 'The pump pushes oil under pressure.',
    detail: 'Pressurized oil travels through strong hoses.',
    color: C.oil,
    type: 'pump',
  },
  {
    title: '3. OIL PRESSURE',
    subtitle: 'Oil flows through hydraulic hoses.',
    detail: 'Pressure carries force to the cylinders.',
    color: C.blue,
    type: 'oil',
  },
  {
    title: '4. HYDRAULIC CYLINDER',
    subtitle: 'Oil pressure pushes the piston rod.',
    detail: 'The cylinder extends and creates movement.',
    color: C.yellow,
    type: 'cylinder',
  },
  {
    title: '5. BOOM, ARM & BUCKET',
    subtitle: 'The excavator arm starts to move.',
    detail: 'Hydraulic cylinders move each section.',
    color: C.oil,
    type: 'arm',
  },
  {
    title: '6. OPERATOR CONTROL',
    subtitle: 'Valves direct the flow of oil.',
    detail: 'The operator controls boom, arm and bucket.',
    color: C.blue,
    type: 'control',
  },
  {
    title: 'POWER IN EVERY DROP',
    subtitle: 'Small amounts of oil move giant machines.',
    detail: 'Follow Kuli Mesin for more heavy equipment lessons.',
    color: C.yellow,
    type: 'end',
  },
] as const;

const HydraulicDiagram: React.FC<{type: string}> = ({type}) => {
  const frame = useCurrentFrame();
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.12);

  const line = (x1: number, y1: number, x2: number, y2: number) => (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={C.oil}
      strokeWidth="12"
      strokeLinecap="round"
      strokeDasharray="20 18"
      strokeDashoffset={-frame * 2}
    />
  );

  if (type === 'hero' || type === 'arm') {
    const boom = type === 'hero' ? 0 : Math.sin(frame * 0.035) * 12;
    return (
      <svg viewBox="0 0 900 650" width="100%" height="100%">
        <path d="M0 540 L900 540" stroke="#475569" strokeWidth="8"/>
        <path d="M80 555 L780 555" stroke="#334155" strokeWidth="22"/>
        <rect x="230" y="390" width="360" height="120" rx="28"
          fill="#D69E00" stroke={C.yellow} strokeWidth="8"/>
        <rect x="280" y="320" width="230" height="95" rx="20"
          fill="#EAB308" stroke="#FDE68A" strokeWidth="7"/>
        <rect x="320" y="335" width="120" height="62" rx="8"
          fill="#172033" stroke="#94A3B8" strokeWidth="5"/>
        <circle cx="270" cy="520" r="48" fill="#0F172A" stroke="#94A3B8" strokeWidth="12"/>
        <circle cx="540" cy="520" r="48" fill="#0F172A" stroke="#94A3B8" strokeWidth="12"/>
        <g transform={`rotate(${-25 + boom}, 470, 365)`}>
          <rect x="445" y="250" width="330" height="75" rx="22"
            fill="#EAB308" stroke="#FDE68A" strokeWidth="8"/>
          <g transform={`rotate(${18 + boom * 0.5}, 760, 285)`}>
            <rect x="730" y="260" width="190" height="55" rx="16"
              fill="#CA8A04" stroke="#FDE68A" strokeWidth="7"/>
            <path d="M900 270 L940 330 L910 385 L865 365 L875 320 Z"
              fill="#A16207" stroke={C.yellow} strokeWidth="8"/>
          </g>
          <rect x="510" y="290" width="150" height="22" rx="10"
            fill="#CBD5E1" stroke="#64748B" strokeWidth="4"/>
        </g>
        {type === 'hero' && (
          <>
            {[0,1,2,3,4,5].map(i => (
              <circle key={i}
                cx={650 + i * 28}
                cy={170 + Math.sin(frame * 0.1 + i) * 25}
                r={9}
                fill={C.yellow}
                opacity={pulse}
              />
            ))}
            <text x="450" y="115" fill={C.yellow} textAnchor="middle"
              fontSize="36" fontWeight="bold">HEAVY LIFTING POWER</text>
          </>
        )}
      </svg>
    );
  }

  if (type === 'engine') {
    return (
      <svg viewBox="0 0 900 650" width="100%" height="100%">
        <rect x="230" y="190" width="440" height="300" rx="28"
          fill="#334155" stroke={C.blue} strokeWidth="10"/>
        <rect x="300" y="240" width="180" height="190" rx="16"
          fill="#0F172A" stroke="#CBD5E1" strokeWidth="8"/>
        <rect x="350" y={270 + Math.sin(frame * 0.15) * 35}
          width="80" height="90" rx="10" fill="#94A3B8"/>
        <circle cx="560" cy="340" r="75" fill="#1E293B"
          stroke={C.yellow} strokeWidth="12"/>
        <circle cx="560" cy="340" r="22" fill={C.yellow}/>
        <path d="M480 340 L530 340" stroke="#E2E8F0" strokeWidth="16"/>
        <path d="M560 265 L560 190 L720 190" stroke={C.blue}
          strokeWidth="12" fill="none"/>
        <text x="450" y="555" fill={C.white} textAnchor="middle"
          fontSize="32" fontWeight="bold">DIESEL ENGINE → PUMP</text>
      </svg>
    );
  }

  if (type === 'pump' || type === 'oil') {
    return (
      <svg viewBox="0 0 900 650" width="100%" height="100%">
        <rect x="100" y="230" width="220" height="190" rx="30"
          fill="#334155" stroke={C.blue} strokeWidth="10"/>
        <circle cx="210" cy="325" r="68" fill="#0F172A"
          stroke={C.yellow} strokeWidth="12"/>
        <circle cx="210" cy="325" r="20" fill={C.yellow}/>
        {[0,1,2,3,4].map(i => (
          <line key={i} x1={210} y1={325}
            x2={210 + Math.cos(frame * 0.12 + i * 1.25) * 55}
            y2={325 + Math.sin(frame * 0.12 + i * 1.25) * 55}
            stroke={C.yellow} strokeWidth="8"/>
        ))}
        {line(320, 325, 700, 325)}
        <rect x="690" y="220" width="110" height="210" rx="20"
          fill="#334155" stroke={C.oil} strokeWidth="10"/>
        <text x="450" y="510" fill={C.white} textAnchor="middle"
          fontSize="32" fontWeight="bold">
          {type === 'pump' ? 'HYDRAULIC PUMP' : 'PRESSURIZED OIL FLOW'}
        </text>
        {[0,1,2,3,4].map(i => (
          <circle key={i}
            cx={350 + ((frame * 5 + i * 80) % 300)}
            cy={325}
            r="10"
            fill="#BBF7D0"
          />
        ))}
      </svg>
    );
  }

  if (type === 'cylinder') {
    const extension = 100 + 65 * (0.5 + 0.5 * Math.sin(frame * 0.07));
    return (
      <svg viewBox="0 0 900 650" width="100%" height="100%">
        <rect x="140" y="240" width="440" height="160" rx="28"
          fill="#475569" stroke="#CBD5E1" strokeWidth="10"/>
        <rect x="170" y="265" width="350" height="110" rx="16"
          fill="#0F172A"/>
        <rect x="170" y="280" width={extension} height="80"
          fill={C.oil} opacity="0.75"/>
        <rect x="570" y="295" width="240" height="50" rx="12"
          fill="#CBD5E1" stroke="#64748B" strokeWidth="8"/>
        <circle cx="580" cy="320" r="32" fill="#94A3B8"
          stroke="#E2E8F0" strokeWidth="7"/>
        {line(60, 320, 140, 320)}
        <text x="450" y="500" fill={C.yellow} textAnchor="middle"
          fontSize="34" fontWeight="bold">OIL PRESSURE → PISTON MOVEMENT</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 900 650" width="100%" height="100%">
      <rect x="170" y="160" width="560" height="330" rx="28"
        fill="#1E293B" stroke={C.blue} strokeWidth="10"/>
      <rect x="250" y="235" width="140" height="180" rx="20"
        fill="#334155" stroke={C.yellow} strokeWidth="8"/>
      <rect x="510" y="235" width="140" height="180" rx="20"
        fill="#334155" stroke={C.yellow} strokeWidth="8"/>
      <path d="M390 325 L510 325" stroke={C.oil}
        strokeWidth="18" strokeDasharray="18 12"/>
      <circle cx="320" cy="325" r="32" fill={C.yellow}/>
      <circle cx="580" cy="325" r="32" fill={C.yellow}/>
      <text x="450" y="555" textAnchor="middle" fill={C.white}
        fontSize="32" fontWeight="bold">CONTROL VALVE</text>
      <path d="M450 130 L450 160" stroke={C.blue} strokeWidth="12"/>
      <circle cx="450" cy="115" r="24" fill={C.blue}/>
    </svg>
  );
};

const Scene: React.FC<{index: number}> = ({index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const item = scenes[index];

  const enter = spring({
    frame,
    fps,
    config: {damping: 16, stiffness: 90},
  });

  const opacity = interpolate(frame, [0, 12, 205, 235], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(circle at 50% 45%, #1B2B42 0%, ${C.bg} 72%)`,
      color: C.white,
      fontFamily: 'Arial, sans-serif',
      padding: 55,
      opacity,
    }}>
      <div style={{
        marginTop: 95,
        textAlign: 'center',
        transform: `translateY(${(1 - enter) * 70}px)`,
      }}>
        <div style={{
          color: item.color,
          fontSize: 48,
          fontWeight: 900,
          letterSpacing: 1,
        }}>
          {item.title}
        </div>
        <div style={{
          marginTop: 22,
          fontSize: 34,
          lineHeight: 1.35,
          fontWeight: 700,
        }}>
          {item.subtitle}
        </div>
        <div style={{
          marginTop: 18,
          color: C.muted,
          fontSize: 25,
          lineHeight: 1.4,
        }}>
          {item.detail}
        </div>
      </div>

      <div style={{
        position: 'absolute',
        left: 55,
        right: 55,
        top: 650,
        height: 720,
        backgroundColor: C.panel,
        border: `2px solid ${item.color}55`,
        borderRadius: 32,
        padding: 24,
        boxSizing: 'border-box',
        boxShadow: `0 0 45px ${item.color}22`,
      }}>
        <HydraulicDiagram type={item.type}/>
      </div>

      <div style={{
        position: 'absolute',
        left: 65,
        right: 65,
        bottom: 135,
        height: 7,
        backgroundColor: '#334155',
        borderRadius: 10,
      }}>
        <div style={{
          width: `${((index + 1) / scenes.length) * 100}%`,
          height: '100%',
          backgroundColor: item.color,
          borderRadius: 10,
        }}/>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 65,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: C.muted,
        fontSize: 23,
        fontWeight: 700,
        letterSpacing: 3,
      }}>
        KULI MESIN • HEAVY EQUIPMENT
      </div>
    </AbsoluteFill>
  );
};

export const ExcavatorHydraulic: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile('audio/hydraulic-full.mp3')} />
      {scenes.map((scene, index) => (
        <React.Fragment key={index}>
          <Sequence from={index * 235} durationInFrames={235}>
            <Scene index={index}/>
          </Sequence>
        </React.Fragment>
      ))}
    </AbsoluteFill>
  );
};

const SequencePlaceholder: React.FC<{index: number}> = ({index}) => {
  return (
    <AbsoluteFill>
      <Scene index={index}/>
    </AbsoluteFill>
  );
};
