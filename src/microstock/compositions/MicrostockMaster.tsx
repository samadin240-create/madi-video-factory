import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from 'remotion';

import { generateScenes } from '../engine/sceneGenerator';
import { GearSystem } from '../scenes/GearSystem';

const scenes = generateScenes();

const ScenePlaceholder: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  const frame = useCurrentFrame();

  const rotation = frame * 0.8;
  const pulse = 1 + Math.sin(frame * 0.08) * 0.04;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#070D16',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 1200 700"
        width="100%"
        height="100%"
      >
        <defs>
          <radialGradient id="masterGlow">
            <stop offset="0%" stopColor="#1B4965" />
            <stop offset="100%" stopColor="#070D16" />
          </radialGradient>
        </defs>

        <rect width="1200" height="700" fill="url(#masterGlow)" />

        <g stroke="#47647E" strokeOpacity="0.25">
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

        <g
          transform={`translate(600 330) rotate(${rotation}) scale(${pulse})`}
          fill="none"
          stroke="#8293A8"
        >
          <circle r="170" strokeWidth="14" />
          <circle r="125" strokeWidth="5" />
          <circle r="65" stroke="#36B9D8" strokeWidth="12" />

          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="-125"
              x2="0"
              y2="-165"
              strokeWidth="12"
              transform={`rotate(${i * 30})`}
            />
          ))}

          <circle r="18" fill="#36B9D8" stroke="none" />
        </g>

        <text
          x="600"
          y="590"
          fill="#DCE6F1"
          fontSize="34"
          textAnchor="middle"
          letterSpacing="5"
        >
          {title.toUpperCase()}
        </text>

        <text
          x="600"
          y="630"
          fill="#8293A8"
          fontSize="18"
          textAnchor="middle"
        >
          {description}
        </text>
      </svg>
    </AbsoluteFill>
  );
};

const SceneRenderer: React.FC<{
  index: number;
  title: string;
  description: string;
}> = ({ index, title, description }) => {
  if (index === 1) {
    return (
      <AbsoluteFill style={{ backgroundColor: '#070D16' }}>
        <GearSystem />
      </AbsoluteFill>
    );
  }

  return (
    <ScenePlaceholder
      title={title}
      description={description}
    />
  );
};

export const MicrostockMaster: React.FC = () => {
  const frame = useCurrentFrame();

  const fade = interpolate(
    frame,
    [0, 20, 1780, 1799],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp' },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#070D16',
        opacity: fade,
      }}
    >
      {scenes.map((scene, index) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationInFrames}
          name={scene.title}
        >
          <SceneRenderer
            index={index}
            title={scene.title}
            description={scene.description}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
