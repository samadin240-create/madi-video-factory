export type AnimationType =
  | 'rotate'
  | 'slide'
  | 'scale'
  | 'float'
  | 'pulse';

export interface AnimationElement {
  id: string;
  type: AnimationType;
  startFrame: number;
  durationInFrames: number;
  delay: number;
}

export interface SceneTimeline {
  id: string;
  startFrame: number;
  durationInFrames: number;
  elements: AnimationElement[];
}

export function createTimeline(
  sceneCount: number,
  elementsPerScene: number,
  fps: number,
  sceneDurationSeconds: number,
): SceneTimeline[] {
  const scenes: SceneTimeline[] = [];

  const duration = sceneDurationSeconds * fps;

  const types: AnimationType[] = [
    'rotate',
    'slide',
    'scale',
    'float',
    'pulse',
  ];

  for (let s = 0; s < sceneCount; s++) {
    const elements: AnimationElement[] = [];

    for (let e = 0; e < elementsPerScene; e++) {
      elements.push({
        id: `scene-${s + 1}-element-${e + 1}`,
        type: types[e % types.length],
        startFrame: s * duration + e * 15,
        durationInFrames: duration - e * 15,
        delay: e * 15,
      });
    }

    scenes.push({
      id: `scene-${s + 1}`,
      startFrame: s * duration,
      durationInFrames: duration,
      elements,
    });
  }

  return scenes;
}
