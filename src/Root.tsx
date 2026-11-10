import React from 'react';
import {Composition} from 'remotion';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="DieselEngine"
        component={() => <div>Diesel Engine Explained</div>}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
