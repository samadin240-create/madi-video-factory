
import React from 'react';
import {
  AbsoluteFill,
  Composition,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const opacity = interpolate(frame, [0, 20, 270, 300], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [0, 30], [0.8, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#080D18',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          textAlign: 'center',
        }}
      >
        <div style={{fontSize: 30, color: '#38BDF8', letterSpacing: 12}}>
          MADI
        </div>
        <div style={{fontSize: 76, fontWeight: 900, marginTop: 15}}>
          VIDEO
        </div>
        <div style={{fontSize: 76, fontWeight: 900, color: '#38BDF8'}}>
          FACTORY
        </div>
        <div
          style={{
            width: 240,
            height: 5,
            backgroundColor: '#38BDF8',
            margin: '35px auto',
          }}
        />
        <div style={{fontSize: 24, color: '#CBD5E1', letterSpacing: 5}}>
          CREATE • AUTOMATE • SCALE
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Root: React.FC = () => (
  <Composition
    id="DieselEngine"
    component={Intro}
    durationInFrames={300}
    fps={30}
    width={1080}
    height={1920}
  />
);
