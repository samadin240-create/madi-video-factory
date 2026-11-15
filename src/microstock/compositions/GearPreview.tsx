import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';

import { GearSystem } from '../scenes/GearSystem';

export const GearPreview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, fps, fps * 2],
    [0, 1, 1],
    {
      extrapolateRight: 'clamp',
    },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#070D16',
        opacity,
      }}
    >
      <GearSystem />
    </AbsoluteFill>
  );
};
