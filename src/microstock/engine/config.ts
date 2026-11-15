export const MICROSTOCK_CONFIG = {
  id: 'IndustrialMechanical60',
  title: 'Industrial Mechanical Animation',
  width: 3840,
  height: 2160,
  fps: 30,
  durationInSeconds: 60,
  scenes: 6,
  elementsPerScene: 4,
} as const;

export const SCENE_DURATION =
  MICROSTOCK_CONFIG.durationInSeconds /
  MICROSTOCK_CONFIG.scenes;

export const TOTAL_FRAMES =
  MICROSTOCK_CONFIG.durationInSeconds *
  MICROSTOCK_CONFIG.fps;
