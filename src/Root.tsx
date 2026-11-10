
import React from 'react';
import {
  AbsoluteFill,
  Composition,
  Sequence,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import {Piston} from './components/Piston';

const scenes = [
  {
    title: 'HOW A DIESEL ENGINE WORKS',
    subtitle: 'THE POWER BEHIND HEAVY MACHINERY',
    color: '#38BDF8',
  },
  {
    title: '1. AIR INTAKE',
    subtitle: 'Fresh air enters the cylinder.',
    color: '#38BDF8',
  },
  {
    title: '2. COMPRESSION',
    subtitle: 'The piston compresses air to extreme temperatures.',
    color: '#F59E0B',
  },
  {
    title: '3. FUEL INJECTION',
    subtitle: 'Diesel fuel is injected into hot compressed air.',
    color: '#F97316',
  },
  {
    title: '4. POWER STROKE',
    subtitle: 'Combustion pushes the piston downward.',
    color: '#EF4444',
  },
  {
    title: '5. ROTATION',
    subtitle: 'The crankshaft converts motion into rotational power.',
    color: '#38BDF8',
  },
  {
    title: 'POWER IN MOTION',
    subtitle: 'That is how diesel engines move heavy equipment.',
    color: '#22C55E',
  },
];

const Scene: React.FC<{index: number}> = ({index}) => {
  const frame = useCurrentFrame();
  const item = scenes[index];

  const opacity = interpolate(frame, [0, 15, 210, 240], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const slide = interpolate(frame, [0, 25], [60, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#080D18',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        padding: 70,
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${slide}px)`,
          textAlign: 'center',
          marginTop: 100,
        }}
      >
        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: item.color,
            letterSpacing: 2,
          }}
        >
          {item.title}
        </div>

        <div
          style={{
            fontSize: 28,
            color: '#CBD5E1',
            marginTop: 25,
            lineHeight: 1.5,
          }}
        >
          {item.subtitle}
        </div>
      </div>

      {index > 0 && index < 6 && (
        <div
          style={{
            position: 'absolute',
            top: 650,
            left: 80,
            width: 920,
            height: 850,
          }}
        >
          <Piston />
        </div>
      )}

      {index === 0 && (
        <div
          style={{
            position: 'absolute',
            top: 800,
            width: '100%',
            textAlign: 'center',
            fontSize: 100,
            fontWeight: 900,
            color: '#38BDF8',
          }}
        >
          DIESEL
        </div>
      )}

      {index === 6 && (
        <div
          style={{
            position: 'absolute',
            top: 900,
            width: '100%',
            textAlign: 'center',
            fontSize: 55,
            fontWeight: 900,
            color: '#22C55E',
          }}
        >
          MADI VIDEO FACTORY
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: 70,
          right: 70,
          height: 5,
          backgroundColor: '#334155',
        }}
      >
        <div
          style={{
            height: 5,
            width: `${((index + 1) / 7) * 100}%`,
            backgroundColor: item.color,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const DieselVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {scenes.map((scene, index) => (
        <Sequence
          key={index}
          from={index * 235}
          durationInFrames={235}
        >
          <Scene index={index} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const Root: React.FC = () => (
  <Composition
    id="DieselEngine"
    component={DieselVideo}
    durationInFrames={1650}
    fps={30}
    width={1080}
    height={1920}
  />
);

