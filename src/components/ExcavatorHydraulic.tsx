import React from 'react';
import {
  AbsoluteFill,
  Audio,
  staticFile,
  Sequence,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

const C = {
  bg: '#070B14',
  yellow: '#FACC15',
  blue: '#38BDF8',
  oil: '#22C55E',
  white: '#F8FAFC',
  muted: '#94A3B8',
};

const scenes = [
  { title: 'KEKUATAN BESAR', subtitle: 'BERASAL DARI OLI', detail: 'Bagaimana excavator mengangkat tanah berton-ton?', color: C.yellow, type: 'hero' },
  { title: 'MESIN DIESEL', subtitle: 'MEMUTAR POMPA HIDROLIK', detail: 'Tenaga mekanis diubah menjadi tenaga hidrolik.', color: C.blue, type: 'engine' },
  { title: 'POMPA HIDROLIK', subtitle: 'MENDORONG OLI', detail: 'Pompa menghasilkan aliran oli bertekanan tinggi.', color: C.oil, type: 'pump' },
  { title: 'ALIRAN OLI', subtitle: 'MELALUI SELANG KHUSUS', detail: 'Tekanan diteruskan menuju silinder hidrolik.', color: C.blue, type: 'oil' },
  { title: 'SILINDER HIDROLIK', subtitle: 'PISTON MULAI BERGERAK', detail: 'Tekanan oli mendorong batang piston.', color: C.yellow, type: 'cylinder' },
  { title: 'BOOM, ARM, BUCKET', subtitle: 'LENGAN MULAI BERGERAK', detail: 'Silinder menggerakkan bagian-bagian excavator.', color: C.oil, type: 'arm' },
  { title: 'KATUP KONTROL', subtitle: 'MENGATUR ARAH OLI', detail: 'Operator mengendalikan arah dan gerakan alat.', color: C.blue, type: 'control' },
  { title: 'KEKUATAN SETIAP TETES', subtitle: 'OLI MENGGERAKKAN MESIN RAKSASA', detail: 'Follow Kuli Mesin untuk belajar alat berat lainnya!', color: C.yellow, type: 'end' },
] as const;

const MechanicalVisual: React.FC<{type: string; color: string}> = ({type, color}) => {
  const frame = useCurrentFrame();
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.09);
  const rotation = frame * 3;
  const piston = 150 + Math.sin(frame * 0.065) * 55;

  return (
    <svg viewBox="0 0 900 650" width="100%" height="100%">
      <defs>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E2E8F0"/>
          <stop offset="35%" stopColor="#64748B"/>
          <stop offset="65%" stopColor="#334155"/>
          <stop offset="100%" stopColor="#CBD5E1"/>
        </linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#FEF08A"/>
          <stop offset="45%" stopColor="#EAB308"/>
          <stop offset="100%" stopColor="#854D0E"/>
        </linearGradient>
        <linearGradient id="oil" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#14532D"/>
          <stop offset="50%" stopColor="#4ADE80"/>
          <stop offset="100%" stopColor="#166534"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="9" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#334155" strokeWidth="1" opacity=".4"/>
        </pattern>
      </defs>

      <rect width="900" height="650" fill="url(#grid)" opacity=".65"/>
      <ellipse cx="450" cy="525" rx="340" ry="45" fill="#020617" opacity=".7"/>

      {(type === 'hero' || type === 'arm' || type === 'end') && (
        <g>
          <path d="M90 500 L780 500" stroke="#64748B" strokeWidth="12"/>
          <path d="M190 490 Q200 430 290 430 H560 Q640 440 650 490 Z" fill="url(#metal)" stroke="#CBD5E1" strokeWidth="8"/>
          <rect x="220" y="440" width="400" height="75" rx="35" fill="#0F172A" stroke="#94A3B8" strokeWidth="15"/>
          {[270,360,450,540].map((x,i)=><circle key={i} cx={x} cy="478" r="27" fill="url(#metal)" stroke="#475569" strokeWidth="8"/>)}
          <path d="M280 425 L300 325 L485 325 L535 430 Z" fill="url(#gold)" stroke="#FDE68A" strokeWidth="8"/>
          <path d="M325 330 L350 230 L475 230 L505 330 Z" fill="#1E293B" stroke="#CBD5E1" strokeWidth="8"/>
          <path d="M365 250 L455 250 L475 315 L345 315 Z" fill="#38BDF8" opacity=".35" stroke="#7DD3FC" strokeWidth="5"/>
          <g transform={`rotate(${-22 + Math.sin(frame*.035)*5}, 480, 340)`}>
            <path d="M460 345 L540 170 L700 95 L730 130 L585 225 L525 365 Z" fill="url(#gold)" stroke="#FDE68A" strokeWidth="10"/>
            <path d="M555 210 L700 135 L720 155 L600 240" fill="none" stroke="url(#metal)" strokeWidth="19"/>
            <g transform={`rotate(${18 + Math.sin(frame*.04)*9}, 700, 125)`}>
              <path d="M685 115 L830 145 L850 185 L790 215 L720 165 Z" fill="url(#gold)" stroke="#FDE68A" strokeWidth="8"/>
              <path d="M790 205 L845 185 L865 245 L825 275 L790 240 Z" fill="#A16207" stroke="#FACC15" strokeWidth="7"/>
            </g>
            <path d="M505 350 L620 220" stroke="url(#metal)" strokeWidth="19"/>
            <path d="M505 350 L620 220" stroke="#E2E8F0" strokeWidth="5"/>
          </g>
          <path d="M480 350 Q540 260 600 210" fill="none" stroke="#22C55E" strokeWidth="9" strokeDasharray="16 12" filter="url(#glow)"/>
        </g>
      )}

      {type === 'engine' && (
        <g>
          <rect x="210" y="170" width="440" height="300" rx="30" fill="url(#metal)" stroke="#CBD5E1" strokeWidth="10"/>
          <rect x="275" y="220" width="165" height="200" rx="15" fill="#0F172A" stroke="#94A3B8" strokeWidth="8"/>
          <rect x="315" y={250 + Math.sin(frame*.15)*40} width="85" height="95" rx="8" fill="url(#metal)"/>
          <circle cx="540" cy="320" r="100" fill="#1E293B" stroke="url(#gold)" strokeWidth="18"/>
          <g transform={`rotate(${rotation}, 540, 320)`}>
            {[0,60,120,180,240,300].map(a=><rect key={a} x="530" y="235" width="20" height="85" rx="8" fill="#FACC15" transform={`rotate(${a} 540 320)`}/>)}
          </g>
          <path d="M650 320 H770" stroke={C.oil} strokeWidth="20" filter="url(#glow)"/>
          <text x="450" y="545" fill={C.white} textAnchor="middle" fontSize="32" fontWeight="bold">DIESEL POWER → PUMP</text>
        </g>
      )}

      {(type === 'pump' || type === 'oil') && (
        <g>
          <rect x="100" y="220" width="240" height="210" rx="30" fill="url(#metal)" stroke="#CBD5E1" strokeWidth="10"/>
          <circle cx="220" cy="325" r="82" fill="#0F172A" stroke="url(#gold)" strokeWidth="16"/>
          <g transform={`rotate(${rotation}, 220, 325)`}>
            {[0,60,120,180,240,300].map(a=><path key={a} d="M220 325 L220 255" stroke="#FACC15" strokeWidth="19" strokeLinecap="round" transform={`rotate(${a} 220 325)`}/>)}
          </g>
          <path d="M340 325 H770" stroke="url(#oil)" strokeWidth="30" strokeLinecap="round" filter="url(#glow)"/>
          {[0,1,2,3,4,5].map(i=><circle key={i} cx={350+((frame*5+i*75)%390)} cy="325" r="12" fill="#BBF7D0" filter="url(#glow)"/>)}
          <rect x="745" y="220" width="75" height="210" rx="18" fill="url(#metal)" stroke="#CBD5E1" strokeWidth="8"/>
          <text x="450" y="520" fill={C.white} textAnchor="middle" fontSize="30" fontWeight="bold">{type === 'pump' ? 'HYDRAULIC PUMP' : 'PRESSURIZED OIL FLOW'}</text>
        </g>
      )}

      {type === 'cylinder' && (
        <g>
          <rect x="110" y="240" width="600" height="160" rx="28" fill="url(#metal)" stroke="#CBD5E1" strokeWidth="12"/>
          <rect x="145" y="270" width="520" height="100" rx="15" fill="#0F172A"/>
          <rect x="145" y="285" width={piston} height="70" rx="8" fill="url(#oil)" filter="url(#glow)"/>
          <rect x={145+piston} y="305" width={520-piston} height="30" fill="url(#metal)"/>
          <rect x="650" y="295" width="170" height="50" rx="12" fill="url(#metal)" stroke="#E2E8F0" strokeWidth="7"/>
          <circle cx="665" cy="320" r="32" fill="#64748B" stroke="#E2E8F0" strokeWidth="7"/>
          <path d="M65 320 H130" stroke={C.oil} strokeWidth="18" filter="url(#glow)"/>
          <text x="450" y="500" fill={C.yellow} textAnchor="middle" fontSize="32" fontWeight="bold">PISTON EXTENSION</text>
        </g>
      )}

      {type === 'control' && (
        <g>
          <rect x="175" y="170" width="550" height="300" rx="30" fill="url(#metal)" stroke="#CBD5E1" strokeWidth="10"/>
          {[300,450,600].map((x,i)=><g key={i}>
            <rect x={x-42} y="245" width="84" height="145" rx="14" fill="#0F172A" stroke="#FACC15" strokeWidth="7"/>
            <circle cx={x} cy={315} r="28" fill="url(#gold)"/>
            <path d={`M${x} 245 V${200+Math.sin(frame*.07+i)*15}`} stroke="#E2E8F0" strokeWidth="13"/>
          </g>)}
          <path d="M300 420 H600" stroke={C.oil} strokeWidth="15" strokeDasharray="18 12"/>
          <text x="450" y="545" fill={C.white} textAnchor="middle" fontSize="32" fontWeight="bold">CONTROL VALVE</text>
        </g>
      )}

      <circle cx="760" cy="105" r={12 + pulse*9} fill={color} opacity=".75" filter="url(#glow)"/>
      <text x="450" y="70" fill={color} textAnchor="middle" fontSize="25" fontWeight="bold" letterSpacing="5">MADI MECHANICAL SYSTEM</text>
    </svg>
  );
};

const KineticWords: React.FC<{text: string; color: string; size: number; delay?: number}> = ({text, color, size, delay=0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:12, rowGap:5}}>
      {text.split(' ').map((word,i)=>{
        const p = spring({frame:frame-delay-i*4, fps, config:{damping:13, stiffness:120}});
        return <span key={i} style={{
          display:'inline-block',
          color,
          opacity:p,
          transform:`translateY(${(1-p)*45}px) scale(${.7+p*.3})`,
          textShadow:`0 0 25px ${color}66`,
          fontSize:size,
          fontWeight:950,
          letterSpacing:1,
        }}>{word}</span>;
      })}
    </div>
  );
};

const Scene: React.FC<{index:number}> = ({index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const item = scenes[index];
  const enter = spring({frame, fps, config:{damping:16, stiffness:90}});
  const opacity = interpolate(frame,[0,10,215,235],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const zoom = interpolate(frame,[0,235],[.94,1.04]);

  return (
    <AbsoluteFill style={{
      background:'radial-gradient(ellipse at 50% 48%, #263B55 0%, #0B1423 48%, #03060C 100%)',
      color:C.white, fontFamily:'Arial, sans-serif', padding:42, opacity, overflow:'hidden',
    }}>
      <AbsoluteFill style={{opacity:.24, backgroundImage:'linear-gradient(rgba(56,189,248,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.16) 1px, transparent 1px)', backgroundSize:'42px 42px'}}/>
      <div style={{position:'absolute',top:80,left:30,right:30,textAlign:'center',transform:`translateY(${(1-enter)*40}px)`}}>
        <KineticWords text={item.title} color={item.color} size={45}/>
        <div style={{marginTop:20}}>
          <KineticWords text={item.subtitle} color={C.white} size={29} delay={8}/>
        </div>
        <div style={{marginTop:18,color:C.muted,fontSize:23,lineHeight:1.4,opacity:interpolate(frame,[12,28],[0,1],{extrapolateRight:'clamp'})}}>
          {item.detail}
        </div>
      </div>

      <div style={{
        position:'absolute',left:22,right:22,top:510,height:770,
        border:'1px solid #64748B88',borderRadius:30,
        background:'linear-gradient(145deg, rgba(51,65,85,.78), rgba(2,6,23,.94))',
        boxShadow:`0 20px 70px #000A, 0 0 35px ${item.color}22`,
        overflow:'hidden',transform:`scale(${zoom})`,
      }}>
        <MechanicalVisual type={item.type} color={item.color}/>
      </div>

      <div style={{position:'absolute',bottom:130,left:60,right:60,height:7,background:'#334155',borderRadius:10}}>
        <div style={{width:`${((index+1)/scenes.length)*100}%`,height:'100%',background:item.color,borderRadius:10,boxShadow:`0 0 15px ${item.color}`}}/>
      </div>
      <div style={{position:'absolute',bottom:65,left:0,right:0,textAlign:'center',color:C.muted,fontSize:20,fontWeight:800,letterSpacing:4}}>
        KULI MESIN • HEAVY EQUIPMENT
      </div>
    </AbsoluteFill>
  );
};

export const ExcavatorHydraulic: React.FC = () => (
  <AbsoluteFill>
    <Audio src={staticFile('audio/hydraulic-full.mp3')}/>
    {scenes.map((scene,index)=>(
      <Sequence key={index} from={index*235} durationInFrames={235}>
        <Scene index={index}/>
      </Sequence>
    ))}
  </AbsoluteFill>
);
