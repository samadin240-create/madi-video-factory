import React from 'react';
import {Composition} from 'remotion';

import {Piston} from './components/Piston';
import {MadiFinance} from './finance/MadiFinance';
import {ExcavatorHydraulic} from './components/ExcavatorHydraulic';

import {GearPreview} from './microstock/compositions/GearPreview';
import {MicrostockMaster} from './microstock/compositions/MicrostockMaster';

export const Root: React.FC = () => (
  <>
    <Composition
      id="DieselEngine"
      component={() => <Piston />}
      durationInFrames={1650}
      fps={30}
      width={1080}
      height={1920}
    />

    <Composition
      id="MadiFinance"
      component={MadiFinance}
      durationInFrames={1352}
      fps={30}
      width={1080}
      height={1920}
    />

    <Composition
      id="ExcavatorHydraulic"
      component={ExcavatorHydraulic}
      durationInFrames={1880}
      fps={30}
      width={1080}
      height={1920}
    />

    <Composition
      id="MadiMicrostockGear"
      component={GearPreview}
      durationInFrames={1800}
      fps={30}
      width={3840}
      height={2160}
    />
    <Composition
      id="MadiMicrostockMaster"
      component={MicrostockMaster}
      durationInFrames={1800}
      fps={30}
      width={3840}
      height={2160}
    />
  </>
);
