import {
  MICROSTOCK_CONFIG,
} from './config';

import {
  createTimeline,
  type SceneTimeline,
} from './timeline';

export interface GeneratedScene extends SceneTimeline {
  title: string;
  description: string;
}

const SCENE_BLUEPRINTS = [
  {
    title: 'Mechanical Overview',
    description: 'Industrial mechanical system overview',
  },
  {
    title: 'Gear Transmission',
    description: 'Precision rotating gear transmission',
  },
  {
    title: 'Hydraulic System',
    description: 'Industrial hydraulic mechanism',
  },
  {
    title: 'Piston Assembly',
    description: 'Mechanical piston movement',
  },
  {
    title: 'Bearing Mechanism',
    description: 'Precision bearing rotation',
  },
  {
    title: 'Complete Machine',
    description: 'Complete industrial mechanical system',
  },
] as const;

export function generateScenes(): GeneratedScene[] {
  const timelines = createTimeline(
    MICROSTOCK_CONFIG.scenes,
    MICROSTOCK_CONFIG.elementsPerScene,
    MICROSTOCK_CONFIG.fps,
    MICROSTOCK_CONFIG.durationInSeconds /
      MICROSTOCK_CONFIG.scenes,
  );

  return timelines.map((timeline, index) => ({
    ...timeline,
    ...SCENE_BLUEPRINTS[index],
  }));
}
