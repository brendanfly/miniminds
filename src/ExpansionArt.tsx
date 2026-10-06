import { PictureArt } from './Art';
import type { ExpansionGameId } from './games';
import type { LabObject } from './ExpansionData';
import { NextArt, ShapeArt } from './NextArt';

export function PlantArt({ stage }: { stage: number }) {
  return <svg viewBox="0 0 240 220" aria-hidden="true">
    <ellipse cx="120" cy="200" rx="83" ry="9" fill="#e9e2ce" />
    <path d="M64 142h112l-17 56H81Z" fill="#d9a27e" />
    <path d="M59 139h122v15H59Z" fill="#bd8765" />
    {stage === 0 ? <ellipse cx="120" cy="137" rx="10" ry="6" fill="#77573e" /> : <>
      <path d={`M120 140V${stage === 1 ? 99 : 55}`} stroke="#73965d" strokeWidth="8" strokeLinecap="round" />
      <path d="M119 123q-42 3-42-29 33-2 42 29m3-17q42 3 42-29-33-2-42 29" fill="#86ae74" />
      {stage >= 2 && <path d="M118 86q-33 0-34-23 30-3 34 23m5-14q32 0 33-24-30 0-33 24" fill="#a6be80" />}
      {stage >= 3 && <g>{[0, 60, 120, 180, 240, 300].map(angle => <ellipse key={angle} cx="120" cy="30" rx="13" ry="21" transform={`rotate(${angle} 120 49)`} fill="#e99fba" />)}<circle cx="120" cy="49" r="17" fill="#edc65e" /></g>}
    </>}
  </svg>;
}

export function LabObjectArt({ object }: { object: LabObject }) {
  return <svg viewBox="0 0 200 150" aria-hidden="true">
    {object === 'cork' && <><path d="M60 45h80l-7 62H67Z" fill="#c9a479" /><ellipse cx="100" cy="45" rx="40" ry="12" fill="#e2c499" /><g fill="#a88460"><circle cx="80" cy="64" r="3" /><circle cx="120" cy="90" r="4" /><circle cx="105" cy="75" r="3" /></g></>}
    {object === 'spoon' && <g transform="rotate(25 100 75)"><ellipse cx="100" cy="43" rx="24" ry="32" fill="#b9c4c8" /><path d="M94 70h12v62H94Z" fill="#99a9b0" /><path d="M89 28q-12 19-4 30" fill="none" stroke="#e8edf0" strokeWidth="5" /></g>}
    {object === 'stone' && <><path d="m44 96 17-49 63-12 37 50-24 30H69Z" fill="#9a9e97" /><path d="m61 47 40 26 23-38m-23 38 36 42" fill="none" stroke="#b7bab1" strokeWidth="5" /></>}
    {object === 'ball' && <><circle cx="100" cy="75" r="56" fill="#edc65e" /><path d="M100 19q-50 57 0 112M100 19q50 57 0 112" fill="#e77b68" /><ellipse cx="100" cy="75" rx="18" ry="55" fill="#94bcc9" /></>}
    {object === 'foil-ball' && <><circle cx="100" cy="75" r="45" fill="#b9c4c8" /><path d="m76 45 24 15 26-12-12 32 17 15-39 14-18-30Z" fill="none" stroke="#e8edf0" strokeWidth="4" /></>}
    {object === 'foil-boat' && <><path d="m30 67 32 42h78l32-42Z" fill="#99a9b0" /><path d="m30 67 70-23 72 23-72 18Z" fill="#e2e9e8" /><path d="m58 65 42-12 45 12-45 11Z" fill="#b6c2c3" /></>}
  </svg>;
}

export function ExpansionCardArt({ game }: { game: ExpansionGameId }) {
  return <div className={`expansion-preview preview-${game}`}>
    {game === 'rhyme-time' && <><NextArt item="hat" /><span className="preview-caption">cat + hat</span></>}
    {game === 'story-detective' && <><NextArt item="kite" /><span className="preview-caption">Who? What? Where?</span></>}
    {game === 'color-hunt' && <><ShapeArt shape="circle" color="#e77b68" /><span className="preview-caption">Color the circle red.</span></>}
    {game === 'shape-studio' && <><ShapeArt shape="triangle" /><span className="preview-caption">Stamp a little picture</span></>}
    {game === 'number-match' && <svg viewBox="0 0 260 180" aria-hidden="true"><text x="42" y="119" fontSize="83" fill="#54674e">3</text>{[124, 170, 216].map(x => <g key={x}><circle cx={x} cy="98" r="18" fill="#b2768c" stroke="#855b70" strokeWidth="2" /><path d={`M${x - 3} 78h6v-8h-6Z`} fill="#667e54" /></g>)}</svg>}
    {game === 'more-less-same' && <><span className="preview-pair">3 = 3</span><span className="preview-caption">More, less, or same?</span></>}
    {game === 'animal-home' && <><NextArt item="frog" /><span className="preview-caption">A suitable home</span></>}
    {game === 'life-cycle' && <><NextArt item="caterpillar" /><span className="preview-caption">Growing stages connect</span></>}
    {game === 'token-jar' && <><NextArt item="jar" /><span className="preview-caption">Pretend tokens, not money</span></>}
    {game === 'save-special' && <><NextArt item="truck" /><span className="preview-caption">Plan a pretend goal</span></>}
    {game === 'alphabet-garden' && <><PictureArt picture="flower" /><span className="preview-pair">A a</span></>}
    {game === 'sentence-kitchen' && <><PictureArt picture="duck" /><span className="preview-caption">The duck swims.</span></>}
    {game === 'rainbow-mixer' && <svg viewBox="0 0 260 180" aria-hidden="true"><ellipse cx="80" cy="66" rx="35" ry="28" fill="#e77b68" /><ellipse cx="180" cy="66" rx="35" ry="28" fill="#edc65e" /><path d="m80 103 50 45 50-45" stroke="#a79a7a" strokeWidth="5" fill="none" /><ellipse cx="130" cy="143" rx="35" ry="24" fill="#eba45c" /></svg>}
    {game === 'pattern-painter' && <svg viewBox="0 0 260 180" aria-hidden="true"><circle cx="50" cy="100" r="25" fill="#e77b68" /><rect x="92" y="75" width="50" height="50" rx="6" fill="#94bcc9" /><circle cx="185" cy="100" r="25" fill="#e77b68" /><path d="M222 75h29v50h-29Z" fill="none" stroke="#94bcc9" strokeWidth="4" strokeDasharray="6" /></svg>}
    {game === 'number-train' && <svg viewBox="0 0 260 180" aria-hidden="true">{[1, 2, 3].map((n, i) => <g key={n} transform={`translate(${15 + i * 80} 70)`}><rect width="70" height="57" rx="10" fill={['#b8a3d0', '#94bcc9', '#e7b15d'][i]} /><text x="35" y="39" textAnchor="middle" fontSize="35" fill="#354838">{n}</text><circle cx="16" cy="65" r="9" fill="#66745d" /><circle cx="54" cy="65" r="9" fill="#66745d" /></g>)}</svg>}
    {game === 'take-away-pond' && <><PictureArt picture="duck" /><span className="preview-caption">5 - 2 = ?</span></>}
    {game === 'grow-garden' && <PlantArt stage={3} />}
    {game === 'float-sink' && <><LabObjectArt object="cork" /><span className="preview-water" /></>}
    {game === 'toy-shop' && <><PictureArt picture="cat" /><span className="preview-caption">Pretend $3</span></>}
    {game === 'can-buy' && <><span className="preview-pair">$3 = $3</span><span className="preview-caption">Enough?</span></>}
  </div>;
}
