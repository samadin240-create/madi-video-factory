import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const C = {
  bg: '#090D0E',
  panel: '#151D1E',
  panel2: '#1C2728',
  white: '#F4F3ED',
  cream: '#E8C68D',
  teal: '#8AD8CC',
  muted: '#9BAAA7',
  red: '#E58B78',
};

const scenes = [
  {
    eyebrow: 'MONEY • MINDSET • WEALTH',
    line1: 'WHY ARE YOU',
    line2: 'STILL BROKE?',
    sub: 'Working hard should move you forward.',
  },
  {
    eyebrow: 'THE PAYCHECK TRAP',
    line1: 'YOUR PAYCHECK',
    line2: 'DISAPPEARS.',
    sub: 'It arrives. Bills take it. The cycle repeats.',
  },
  {
    eyebrow: 'THE REAL DIFFERENCE',
    line1: 'SPEND IT ALL',
    line2: 'OR BUILD WEALTH?',
    sub: 'The money you keep can change your future.',
  },
];

const voiceLines = [
  'You work hard. You get paid. So why does it still feel like you are getting nowhere? The problem might not be what you earn.',
  'Your paycheck lands. Rent, bills, food, and small purchases take their share. Before you know it, the money is gone. Then it starts all over again.',
  'The difference is what happens next. Spend every dollar, and nothing grows. Keep a portion, invest carefully, and give it time. That is how progress begins.',
];

const ease = (f: number, start: number, end: number) =>
  interpolate(f, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const Panel: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      background: `linear-gradient(145deg, ${C.panel2}, ${C.panel})`,
      border: `2px solid ${C.teal}`,
      borderRadius: 24,
      boxShadow: '0 18px 55px rgba(0,0,0,.32)',
      ...style,
    }}
  >
    {children}
  </div>
);

const SceneOne: React.FC<{ f: number }> = ({ f }) => {
  const enter = ease(f, 0, 22);
  const pulse = 1 + Math.sin(f / 13) * 0.012;
  const coinY = interpolate(f, [0, 90], [100, -10], {
    extrapolateRight: 'clamp',
  });
  return (
    <>
      <div style={{ position: 'absolute', top: 300, left: 82, right: 82 }}>
        <div style={{ color: C.cream, fontSize: 25, fontWeight: 800, letterSpacing: 7 }}>
          A QUESTION ABOUT MONEY
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 83,
            lineHeight: 0.98,
            fontWeight: 950,
            letterSpacing: -3,
            color: C.white,
            opacity: enter,
            transform: `translateY(${(1 - enter) * 65}px) scale(${pulse})`,
          }}
        >
          WHY ARE YOU
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 91,
            lineHeight: 0.98,
            fontWeight: 950,
            letterSpacing: -4,
            color: C.cream,
            opacity: ease(f, 12, 34),
            transform: `translateX(${(1 - ease(f, 12, 34)) * -70}px)`,
          }}
        >
          STILL BROKE?
        </div>
      </div>
      <Panel
        style={{
          position: 'absolute',
          top: 890,
          left: 105,
          width: 870,
          height: 390,
          padding: 32,
          transform: `translateY(${coinY}px) rotate(-2deg)`,
        }}
      >
        <div style={{ color: C.muted, fontSize: 23, letterSpacing: 4 }}>MONTHLY PAYCHECK</div>
        <div style={{ color: C.teal, fontSize: 104, fontWeight: 900, marginTop: 20 }}>$3,200</div>
        <div style={{ height: 2, background: '#344445', marginTop: 20 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
          <span style={{ color: C.white, fontSize: 27 }}>HARD WORK</span>
          <span style={{ color: C.cream, fontSize: 27, fontWeight: 800 }}>?</span>
        </div>
        <div
          style={{
            position: 'absolute',
            right: 36,
            bottom: 25,
            width: 88,
            height: 88,
            borderRadius: 50,
            background: C.cream,
            color: C.bg,
            fontSize: 62,
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: '88px',
            transform: `translateY(${Math.sin(f / 8) * 8}px)`,
          }}
        >
          $
        </div>
      </Panel>
    </>
  );
};

const SceneTwo: React.FC<{ f: number }> = ({ f }) => {
  const items = [
    { name: 'PAYCHECK', amount: '+$3,200', color: C.teal, sign: '+' },
    { name: 'RENT & BILLS', amount: '-$1,450', color: C.cream, sign: '−' },
    { name: 'FOOD & SPENDING', amount: '-$1,300', color: C.red, sign: '−' },
  ];
  const balance = Math.round(interpolate(f, [0, 390], [3200, 450], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));
  return (
    <>
      <div style={{ position: 'absolute', top: 285, left: 85, right: 85 }}>
        <div style={{ color: C.cream, fontSize: 25, letterSpacing: 6, fontWeight: 800 }}>
          THE PAYCHECK TRAP
        </div>
        <div style={{ color: C.white, fontSize: 76, fontWeight: 950, lineHeight: 1.02, marginTop: 28 }}>
          YOUR PAYCHECK
        </div>
        <div style={{ color: C.teal, fontSize: 86, fontWeight: 950, lineHeight: 1.02 }}>
          DISAPPEARS.
        </div>
      </div>
      <Panel style={{ position: 'absolute', top: 690, left: 85, right: 85, padding: 30 }}>
        <div style={{ color: C.muted, fontSize: 22, letterSpacing: 4 }}>WHERE THE MONEY GOES</div>
        {items.map((item, i) => {
          const shown = ease(f, i * 72 + 20, i * 72 + 58);
          return (
            <div
              key={item.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '27px 8px',
                borderBottom: i === 2 ? 'none' : '1px solid #344445',
                opacity: shown,
                transform: `translateX(${(1 - shown) * (i % 2 ? 80 : -80)}px)`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ color: item.color, fontSize: 48, fontWeight: 900 }}>{item.sign}</div>
                <div style={{ color: C.white, fontSize: 26, fontWeight: 800 }}>{item.name}</div>
              </div>
              <div style={{ color: item.color, fontSize: 30, fontWeight: 900 }}>{item.amount}</div>
            </div>
          );
        })}
        <div style={{ marginTop: 18, padding: 22, background: '#0C1415', borderRadius: 16 }}>
          <div style={{ color: C.muted, fontSize: 20, letterSpacing: 3 }}>LEFT UNTIL NEXT PAYDAY</div>
          <div style={{ color: C.red, fontSize: 76, fontWeight: 950, marginTop: 4 }}>
            ${balance.toLocaleString('en-US')}
          </div>
          <div style={{ height: 12, borderRadius: 20, background: '#344445', marginTop: 14, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(balance / 3200) * 100}%`, background: C.red }} />
          </div>
        </div>
      </Panel>
      <div
        style={{
          position: 'absolute',
          top: 1430,
          left: 100,
          right: 100,
          textAlign: 'center',
          color: C.cream,
          fontSize: 27,
          fontWeight: 800,
          letterSpacing: 2,
          opacity: ease(f, 260, 300),
        }}
      >
        EARN. SPEND. REPEAT.
      </div>
    </>
  );
};

const SceneThree: React.FC<{ f: number }> = ({ f }) => {
  const grow = ease(f, 65, 380);
  const bars = [90, 145, 205, 275, 355];
  return (
    <>
      <div style={{ position: 'absolute', top: 270, left: 75, right: 75 }}>
        <div style={{ color: C.cream, fontSize: 24, fontWeight: 800, letterSpacing: 5 }}>
          THE REAL DIFFERENCE
        </div>
        <div style={{ color: C.white, fontSize: 68, lineHeight: 1.03, fontWeight: 950, marginTop: 28 }}>
          SPEND IT ALL
        </div>
        <div style={{ color: C.teal, fontSize: 74, lineHeight: 1.03, fontWeight: 950 }}>
          OR BUILD WEALTH?
        </div>
      </div>
      <div style={{ position: 'absolute', top: 690, left: 70, right: 70, display: 'flex', gap: 22 }}>
        <Panel style={{ width: '50%', minHeight: 620, padding: 24, borderColor: C.red }}>
          <div style={{ color: C.red, fontSize: 24, fontWeight: 900, letterSpacing: 2 }}>SPEND</div>
          <div style={{ color: C.white, fontSize: 27, fontWeight: 800, marginTop: 16 }}>Today</div>
          <div style={{ height: 250, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginTop: 35 }}>
            <div style={{ width: 125, height: 250 * (1 - grow * 0.86), background: `linear-gradient(180deg, ${C.cream}, ${C.red})`, borderRadius: 14 }} />
          </div>
          <div style={{ color: C.red, fontSize: 43, fontWeight: 950, textAlign: 'center', marginTop: 25 }}>
            $0
          </div>
          <div style={{ color: C.muted, fontSize: 19, textAlign: 'center', marginTop: 8 }}>Nothing left to grow</div>
        </Panel>
        <Panel style={{ width: '50%', minHeight: 620, padding: 24 }}>
          <div style={{ color: C.teal, fontSize: 24, fontWeight: 900, letterSpacing: 2 }}>SAVE</div>
          <div style={{ color: C.white, fontSize: 27, fontWeight: 800, marginTop: 16 }}>Over time</div>
          <div style={{ height: 250, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 9, marginTop: 35 }}>
            {bars.map((h, i) => (
              <div
                key={i}
                style={{
                  width: 43,
                  height: h * grow,
                  borderRadius: '9px 9px 0 0',
                  background: `linear-gradient(180deg, ${C.teal}, #397F78)`,
                }}
              />
            ))}
          </div>
          <div style={{ color: C.teal, fontSize: 43, fontWeight: 950, textAlign: 'center', marginTop: 25 }}>
            GROW
          </div>
          <div style={{ color: C.muted, fontSize: 19, textAlign: 'center', marginTop: 8 }}>Give it time</div>
        </Panel>
      </div>
      <div style={{ position: 'absolute', bottom: 275, left: 100, right: 100, textAlign: 'center' }}>
        <div style={{ color: C.white, fontSize: 31, fontWeight: 900 }}>
          KEEP A PORTION. GIVE IT TIME.
        </div>
        <div style={{ color: C.teal, fontSize: 24, marginTop: 16 }}>
          Small decisions. Long-term change.
        </div>
      </div>
    </>
  );
};

export const MadiFinance: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneDuration = 450;
  const index = Math.min(2, Math.floor(frame / sceneDuration));
  const localFrame = frame - index * sceneDuration;
  const scene = scenes[index];
  const fade = interpolate(localFrame, [0, 16, 430, 450], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, color: C.white, fontFamily: 'Arial, sans-serif' }}>
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at 50% 48%, #18302F 0%, #090D0E 66%)',
          opacity: 0.5,
        }}
      />
      <div style={{ position: 'absolute', top: 105, left: 80, color: C.teal, fontSize: 24, fontWeight: 900, letterSpacing: 7 }}>
        MADI FINANCE
      </div>
      <div style={{ position: 'absolute', top: 165, right: 80, color: C.muted, fontSize: 20, letterSpacing: 3 }}>
        0{index + 1} / 03
      </div>

      <div style={{ opacity: fade }}>
        {index === 0 && <SceneOne f={localFrame} />}
        {index === 1 && <SceneTwo f={localFrame} />}
        {index === 2 && <SceneThree f={localFrame} />}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 145,
          left: 75,
          right: 75,
          padding: '22px 25px',
          borderRadius: 18,
          background: 'rgba(8,13,14,.9)',
          border: '1px solid #405453',
          color: C.white,
          fontSize: 24,
          lineHeight: 1.35,
          textAlign: 'center',
          opacity: fade,
        }}
      >
        {voiceLines[index]}
      </div>
      <div style={{ position: 'absolute', bottom: 82, left: 80, right: 80, height: 5, background: '#263536', borderRadius: 10 }}>
        <div style={{ height: 5, width: `${(frame / 1350) * 100}%`, background: C.teal, borderRadius: 10 }} />
      </div>

      <Sequence from={0} durationInFrames={450}>
        <Audio src={staticFile('audio/madi-finance-1.mp3')} volume={1} />
      </Sequence>
      <Sequence from={450} durationInFrames={450}>
        <Audio src={staticFile('audio/madi-finance-2.mp3')} volume={1} />
      </Sequence>
      <Sequence from={900} durationInFrames={450}>
        <Audio src={staticFile('audio/madi-finance-3.mp3')} volume={1} />
      </Sequence>
    </AbsoluteFill>
  );
};
