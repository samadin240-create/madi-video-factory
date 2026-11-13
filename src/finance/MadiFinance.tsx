import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const scenes = [
  {
    label: 'MONEY PSYCHOLOGY',
    title: 'WHY MOST PEOPLE',
    highlight: 'STAY BROKE',
    subtitle: 'Working hard is not always enough.',
  },
  {
    label: 'THE PAYCHECK CYCLE',
    title: 'MONEY COMES IN.',
    highlight: 'MONEY GOES OUT.',
    subtitle: 'Earn. Spend. Repeat. Nothing remains.',
  },
  {
    label: 'THE REAL DIFFERENCE',
    title: 'IT IS NOT JUST',
    highlight: 'HOW MUCH YOU EARN.',
    subtitle: 'It is how much you keep.',
  },
  {
    label: 'BUILD YOUR FUTURE',
    title: 'MAKE YOUR MONEY',
    highlight: 'WORK FOR YOU.',
    subtitle: 'Save. Invest. Give time a chance.',
  },
];

export const MadiFinance: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneDuration = 338;
  const index = Math.min(3, Math.floor(frame / sceneDuration));
  const localFrame = frame - index * sceneDuration;
  const scene = scenes[index];

  const voiceLines = [
    'Why do so many people stay broke, even when they work hard? Because earning money and building wealth are two different things.',
    'A paycheck arrives, bills take it away, and spending fills the gap. Then the same cycle starts again.',
    'The real difference is not only how much you earn. It is how much you keep, and what you do with it.',
    'Start small. Save consistently, learn before you invest, and give your money time to grow. Your future is built one decision at a time.',
  ];


  const opacity = interpolate(
    localFrame,
    [0, 20, 300, 338],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  const movement = interpolate(
    localFrame,
    [0, 100],
    [60, 0],
    { extrapolateRight: 'clamp' },
  );

  const growth = interpolate(
    localFrame,
    [0, 300],
    [0, 1],
    { extrapolateRight: 'clamp' },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#080B12',
        color: '#FFFFFF',
        fontFamily: 'Arial, sans-serif',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 75,
      }}
    >
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 50% 48%, #25200F 0%, #080B12 65%)',
          opacity: 0.9,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 100,
          color: '#D6AD55',
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: 7,
        }}
      >
        MADI FINANCE
      </div>

      <div
        style={{
          position: 'absolute',
          top: 185,
          color: '#94A3B8',
          fontSize: 20,
          letterSpacing: 5,
        }}
      >
        {scene.label}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 390,
          width: '100%',
          textAlign: 'center',
          opacity,
          transform: `translateY(${movement}px)`,
        }}
      >
        <div
          style={{
            fontSize: 58,
            fontWeight: 900,
            letterSpacing: 1,
          }}
        >
          {scene.title}
        </div>

        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: '#D6AD55',
            marginTop: 20,
          }}
        >
          {scene.highlight}
        </div>

        <div
          style={{
            fontSize: 27,
            color: '#CBD5E1',
            marginTop: 35,
          }}
        >
          {scene.subtitle}
        </div>
      </div>

      {index === 0 && (
        <div
          style={{
            position: 'absolute',
            top: 850,
            width: 330,
            height: 230,
            border: '5px solid #D6AD55',
            borderRadius: 25,
            backgroundColor: '#171A21',
            transform: `translateY(${growth * -35}px)`,
            boxShadow: '0 0 60px #D6AD5533',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 75,
              left: 95,
              fontSize: 100,
              color: '#D6AD55',
            }}
          >
            $
          </div>
        </div>
      )}

      {index === 1 && (
        <div
          style={{
            position: 'absolute',
            top: 850,
            display: 'flex',
            gap: 18,
            alignItems: 'center',
          }}
        >
          {['PAYCHECK', 'BILLS', 'SPENDING'].map((item, i) => (
            <div
              key={item}
              style={{
                width: 240,
                height: 180,
                border: '2px solid #D6AD55',
                borderRadius: 18,
                background: '#171A21',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                opacity: interpolate(
                  localFrame,
                  [i * 55, i * 55 + 35],
                  [0, 1],
                  { extrapolateRight: 'clamp' },
                ),
              }}
            >
              <div style={{ fontSize: 65, color: '#D6AD55' }}>
                {i === 0 ? '$' : i === 1 ? '−' : '0'}
              </div>
              <div style={{ fontSize: 17, color: '#CBD5E1' }}>
                {item}
              </div>
            </div>
          ))}
        </div>
      )}

      {index === 2 && (
        <div
          style={{
            position: 'absolute',
            top: 820,
            display: 'flex',
            alignItems: 'flex-end',
            gap: 18,
            height: 330,
          }}
        >
          {[90, 140, 190, 250, 310].map((height, i) => (
            <div
              key={i}
              style={{
                width: 95,
                height: height * growth,
                borderRadius: 12,
                background: 'linear-gradient(180deg, #F5D47C, #9A7028)',
                boxShadow: '0 0 25px #D6AD5533',
              }}
            />
          ))}
        </div>
      )}

      {index === 3 && (
        <div
          style={{
            position: 'absolute',
            top: 850,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 250 + i * 24,
                height: 30,
                marginTop: -5,
                borderRadius: '50%',
                border: '4px solid #D6AD55',
                background: '#B88935',
                boxShadow: '0 0 15px #D6AD5544',
                transform: `translateY(${growth * -i * 3}px)`,
              }}
            />
          ))}
          <div style={{ color: '#D6AD55', fontSize: 65, marginTop: 35 }}>
            $
          </div>
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: 190,
          left: 90,
          right: 90,
          padding: 18,
          borderRadius: 14,
          backgroundColor: 'rgba(8, 11, 18, 0.78)',
          color: '#FFFFFF',
          fontSize: 24,
          lineHeight: 1.4,
          textAlign: 'center',
          opacity,
        }}
      >
        {voiceLines[index]}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 105,
          color: '#64748B',
          fontSize: 19,
          letterSpacing: 5,
        }}
      >
        MONEY. MINDSET. WEALTH.
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 65,
          left: 75,
          right: 75,
          height: 5,
          backgroundColor: '#26303D',
        }}
      >
        <div
          style={{
            height: 5,
            width: `${((index + localFrame / sceneDuration) / 4) * 100}%`,
            backgroundColor: '#D6AD55',
          }}
        />
      </div>

      <Sequence from={0} durationInFrames={338}>
        <Audio src={staticFile('audio/madi-finance-1.mp3')} volume={0.95} />
      </Sequence>
      <Sequence from={338} durationInFrames={338}>
        <Audio src={staticFile('audio/madi-finance-2.mp3')} volume={0.95} />
      </Sequence>
      <Sequence from={676} durationInFrames={338}>
        <Audio src={staticFile('audio/madi-finance-3.mp3')} volume={0.95} />
      </Sequence>
      <Sequence from={1014} durationInFrames={338}>
        <Audio src={staticFile('audio/madi-finance-4.mp3')} volume={0.95} />
      </Sequence>

</AbsoluteFill>
  );
};
