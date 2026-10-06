import { PictureArt } from './Art';
import { PlantArt, LabObjectArt } from './ExpansionArt';
import type { NextPicture, StampShape } from './NextData';

export function ShapeArt({ shape, color = '#b8a3d0' }: { shape: StampShape; color?: string }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true"><g stroke="#66745d" strokeWidth="2">{shape === 'circle' ? <circle cx="50" cy="50" r="35" fill={color} /> : shape === 'square' ? <rect x="17" y="17" width="66" height="66" rx="6" fill={color} /> : <path d="M50 12 91 86H9Z" fill={color} />}</g></svg>;
}

export function NextArt({ item }: { item: NextPicture }) {
  if (item === 'cat' || item === 'sun' || item === 'hen' || item === 'duck' || item === 'butterfly') return <PictureArt picture={item} />;
  if (item === 'ball') return <LabObjectArt object="ball" />;
  if (item === 'seed' || item === 'sprout' || item === 'leaf' || item === 'plant') return <PlantArt stage={item === 'seed' ? 0 : item === 'sprout' ? 1 : item === 'leaf' ? 2 : 3} />;
  return <svg viewBox="0 0 180 140" aria-hidden="true">
    {item === 'red-ball' && <><circle cx="90" cy="70" r="51" fill="#e77b68" /><path d="M76 28q-25 6-29 29" fill="none" stroke="#f5baa8" strokeWidth="8" strokeLinecap="round" /><path d="M50 105q40-19 81 0" stroke="#b85c4d" strokeWidth="3" fill="none" /></>}
    {item === 'hat' && <><path d="M44 85 58 30h64l14 55Z" fill="#b8a3d0" /><ellipse cx="90" cy="90" rx="77" ry="15" fill="#947cae" /><path d="M48 70h85" stroke="#edc65e" strokeWidth="10" /></>}
    {item === 'bun' && <><path d="M25 92q0-72 65-72t65 72Z" fill="#e7b477" /><ellipse cx="90" cy="92" rx="65" ry="18" fill="#d5995a" /><path d="m64 43 8 16m19-23 7 17m15-8 6 15" stroke="#fff4d7" strokeWidth="5" /></>}
    {item === 'pen' && <g transform="rotate(30 90 70)"><rect x="78" y="15" width="24" height="90" rx="6" fill="#94bcc9" /><path d="m78 105 12 25 12-25Z" fill="#d8b481" /><path d="m86 121 4 9 4-9Z" fill="#455844" /></g>}
    {item === 'truck' && <><rect x="15" y="48" width="94" height="51" rx="8" fill="#e77b68" /><path d="M109 63h30l24 24v12h-54Z" fill="#edc65e" /><path d="M117 69h18l14 15h-32Z" fill="#d8eceb" /><circle cx="48" cy="103" r="17" fill="#54674e" /><circle cx="137" cy="103" r="17" fill="#54674e" /></>}
    {item === 'kite' && <><path d="m90 10 45 50-45 50-45-50Z" fill="#94bcc9" /><path d="m90 10 0 100 45-50Z" fill="#edc65e" /><path d="M90 110q-40 2-20 25" fill="none" stroke="#66745d" strokeWidth="3" /></>}
    {(item === 'frog' || item === 'legs' || item === 'young-frog') && <g transform={item === 'young-frog' ? 'translate(27 21) scale(.7)' : undefined}><ellipse cx="90" cy="92" rx="46" ry="26" fill="#86ae74" /><circle cx="67" cy="61" r="17" fill="#86ae74" /><circle cx="113" cy="61" r="17" fill="#86ae74" /><circle cx="67" cy="61" r="5" fill="#354838" /><circle cx="113" cy="61" r="5" fill="#354838" /><path d="m51 93-23 21h38m63-21 23 21h-38" fill="none" stroke="#73965d" strokeWidth="9" /><path d="M77 86q13 10 26 0" fill="none" stroke="#354838" strokeWidth="3" />{item === 'legs' && <path d="M130 94q48-12 40-52" fill="none" stroke="#86ae74" strokeWidth="9" />}</g>}
    {item === 'fish' && <><ellipse cx="81" cy="71" rx="51" ry="32" fill="#e7b15d" /><path d="m125 71 40-28v56Z" fill="#e77b68" /><path d="M63 43v56m31-57v57" stroke="#fffdf8" strokeWidth="12" /><circle cx="45" cy="66" r="5" fill="#354838" /></>}
    {(item === 'egg' || item === 'eggs') && <>{(item === 'egg' ? [90] : [40, 75, 110, 145]).map((x, i) => <g key={x}><ellipse cx={x} cy={68 + (i % 2) * 20} rx="16" ry="22" fill="#d5e6c4" stroke="#73965d" strokeWidth="2" /><circle cx={x} cy={68 + (i % 2) * 20} r="5" fill="#66745d" /></g>)}</>}
    {item === 'caterpillar' && <>{[35, 60, 85, 110, 135].map((x, i) => <circle key={x} cx={x} cy={80 - i * 4} r="20" fill={i % 2 ? '#a6be80' : '#86ae74'} />)}<circle cx="142" cy="59" r="4" fill="#354838" /><path d="M136 43v-15" stroke="#66745d" strokeWidth="3" /></>}
    {item === 'chrysalis' && <><path d="M20 27h140" stroke="#997457" strokeWidth="8" /><path d="M92 27v18" stroke="#66745d" strokeWidth="3" /><path d="M75 44q-23 52 17 80 38-29 16-80Z" fill="#a6be80" /><path d="m75 61 31 14-26 16 24 16" fill="none" stroke="#73965d" strokeWidth="3" /></>}
    {item === 'tadpole' && <><ellipse cx="66" cy="70" rx="32" ry="24" fill="#86ae74" /><path d="M94 70q60 31 66-28-19 29-66 16Z" fill="#a6be80" /><circle cx="49" cy="64" r="4" fill="#354838" /></>}
    {item === 'jar' && <><rect x="45" y="30" width="90" height="95" rx="20" fill="#d8eceb" stroke="#94bcc9" strokeWidth="4" /><rect x="43" y="20" width="94" height="16" rx="5" fill="#b8a3d0" />{[60, 90, 120].map(x => <circle key={x} cx={x} cy="94" r="11" fill="#edc65e" />)}</>}
    {item === 'seeds' && <><path d="M25 90Q50 15 155 40 130 115 25 90Z" fill="#a6be80" stroke="#73965d" strokeWidth="3" />{[55, 90, 125].map((x, i) => <ellipse key={x} cx={x} cy={77 - i * 10} rx="13" ry="17" fill="#d9a27e" />)}</>}
  </svg>;
}
