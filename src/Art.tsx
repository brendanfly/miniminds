export type Picture = 'apple' | 'butterfly' | 'cat' | 'duck' | 'flower' | 'sun' | 'hen';

export function PictureArt({ picture, className = '' }: { picture: Picture; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      {picture === 'apple' && <>
        <path d="M101 61c-29-23-74 0-68 45 6 47 32 71 65 60 33 11 63-18 69-60 6-46-38-67-66-45Z" fill="#e77b68" />
        <path d="M101 67c-4-22 1-36 12-44" stroke="#766143" strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M105 45c8-26 38-26 45-19-7 25-27 28-45 19" fill="#6c9b62" />
        <path d="M56 96c0-12 6-21 14-25" fill="none" stroke="#f8ba9c" strokeWidth="9" strokeLinecap="round" />
      </>}
      {picture === 'butterfly' && <>
        <path d="M95 93C26 4 2 65 43 106c-48 13-15 77 52 27Z" fill="#e9a3c1" />
        <path d="M105 93c69-89 93-28 52 13 48 13 15 77-52 27Z" fill="#c0b3df" />
        <ellipse cx="100" cy="112" rx="11" ry="47" fill="#676447" />
        <path d="m96 71-13-18m21 18 13-18" stroke="#676447" strokeWidth="5" strokeLinecap="round" />
        <circle cx="54" cy="77" r="13" fill="#f8d3df" /><circle cx="147" cy="77" r="13" fill="#ded6f0" />
      </>}
      {picture === 'cat' && <>
        <path d="m42 80 2-48 44 29h25l42-29 3 48c31 66-1 96-59 96S12 146 42 80" fill="#e7b15d" />
        <path d="m54 67 1-17 18 15m57 0 17-15 1 17" fill="#edc6a2" />
        <circle cx="75" cy="105" r="5" fill="#514e3f" /><circle cx="126" cy="105" r="5" fill="#514e3f" />
        <path d="m94 121 6 6 6-6m-6 7v10m0 0c-8 8-16 0-16 0m16 0c8 8 16 0 16 0M63 125l-29-4m29 15-29 6m104-17 28-4m-28 15 28 6" stroke="#514e3f" strokeWidth="4" strokeLinecap="round" fill="none" />
      </>}
      {picture === 'duck' && <>
        <ellipse cx="96" cy="128" rx="61" ry="42" fill="#edc65e" /><circle cx="124" cy="70" r="34" fill="#edc65e" />
        <path d="m154 66 27 12-29 10" fill="#e38d54" /><circle cx="134" cy="64" r="5" fill="#514e3f" />
        <path d="M65 122c8 26 31 30 44 10" fill="none" stroke="#d4aa40" strokeWidth="6" strokeLinecap="round" />
        <path d="M32 168c42 12 93 12 136 0" stroke="#9ac5cc" strokeWidth="8" strokeLinecap="round" fill="none" />
      </>}
      {picture === 'hen' && <>
        <path d="M43 101 24 78l-3 53c-3 33 34 43 74 37 43-6 61-32 50-67Z" fill="#edcf9d" />
        <circle cx="129" cy="79" r="33" fill="#f5dfb9" />
        <path d="M114 48c-17-20-1-34 9-22 7-23 24-18 22 0 17-9 26 7 8 23Z" fill="#db7a6c" />
        <path d="m157 74 22 12-23 9" fill="#dda454" />
        <path d="M136 105c3 19 21 19 18 1" fill="#db7a6c" />
        <circle cx="138" cy="73" r="4" fill="#65523e" />
        <path d="M61 121q15 28 43 8" stroke="#cba879" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M79 164v18m0 0H68m11 0h9m28-20v20m0 0h-10m10 0h10" stroke="#bc925d" strokeWidth="5" strokeLinecap="round" />
      </>}
      {picture === 'flower' && <>
        <path d="M100 110v71" stroke="#76a16d" strokeWidth="10" strokeLinecap="round" />
        <path d="M98 159c-33 3-44-15-43-27 28-5 42 7 43 27m5 11c30-2 44-15 42-28-26-1-40 9-42 28" fill="#86ae74" />
        {[0, 60, 120, 180, 240, 300].map(angle => <ellipse key={angle} cx="100" cy="48" rx="20" ry="30" transform={`rotate(${angle} 100 83)`} fill="#e99fba" />)}
        <circle cx="100" cy="83" r="25" fill="#edc65e" /><circle cx="92" cy="80" r="3" fill="#675344" /><circle cx="108" cy="80" r="3" fill="#675344" />
        <path d="M94 90q6 7 12 0" stroke="#675344" strokeWidth="3" fill="none" strokeLinecap="round" />
      </>}
      {picture === 'sun' && <>
        {Array.from({ length: 8 }, (_, i) => <path key={i} d="M100 24v13" transform={`rotate(${i * 45} 100 100)`} stroke="#e9b950" strokeWidth="8" strokeLinecap="round" />)}
        <circle cx="100" cy="100" r="48" fill="#edc65e" /><circle cx="85" cy="96" r="4" fill="#675344" /><circle cx="115" cy="96" r="4" fill="#675344" />
        <path d="M88 114q12 14 24 0" stroke="#675344" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="75" cy="109" rx="8" ry="5" fill="#edae76" /><ellipse cx="125" cy="109" rx="8" ry="5" fill="#edae76" />
      </>}
    </svg>
  );
}

export function GardenArt({ small = false }: { small?: boolean }) {
  return (
    <svg viewBox="0 0 600 360" className={small ? 'garden-art small' : 'garden-art'} aria-hidden="true">
      <ellipse cx="318" cy="336" rx="250" ry="16" fill="#d4dfbd" opacity=".6" />
      <path d="M68 329q4-128 112-160 38-12 62 31 70-94 140-59 68 32 80 100 80 5 87 88Z" fill="#c7d9ae" />
      <path d="M163 324q-17-90 43-132 29 40 8 96" fill="#98b58b" />
      <path d="M214 326q11-135 70-180 21 89-28 146" fill="#aac294" />
      <path d="M400 332q8-77 54-109 25 67-12 109" fill="#93b385" />
      <path d="M93 329q-5-41-27-56m36 56q8-54 30-75m357 75q0-46 24-73" stroke="#75996b" strokeWidth="5" strokeLinecap="round" fill="none" />
      <g transform="translate(99 69) rotate(-12 50 60)">
        <path d="M8 119V33Q8 19 23 19h13l29 53 29-53h13q15 0 15 14v86H94V62l-29 49-29-49v57Z" fill="#e7aa64" />
        <circle cx="48" cy="79" r="3" fill="#775638" /><circle cx="80" cy="79" r="3" fill="#775638" />
        <path d="M59 89q6 7 12 0" fill="none" stroke="#775638" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g transform="translate(312 128) rotate(9 50 75)">
        <path d="M11 139V37q28-18 55-3 37 20 18 51-10 17-45 14v40Z" fill="#94bcc9" />
        <ellipse cx="57" cy="63" rx="14" ry="12" fill="#ecf0df" />
        <circle cx="26" cy="109" r="3" fill="#426778" /><circle cx="47" cy="109" r="3" fill="#426778" />
        <path d="M30 119q7 6 13-1" fill="none" stroke="#426778" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g transform="translate(431 6) scale(.6)"><PictureArtInlineSun /></g>
      <g transform="translate(279 29) rotate(-14)">
        <path d="M0 28C-32-17-60 11-20 40c-22 17 1 43 23 8M8 28c32-45 60-17 20 12 22 17-1 43-23 8" fill="#c8b4d8" />
        <path d="M4 22v31" stroke="#80748d" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g transform="translate(259 206)">
        <path d="M34 62v57" stroke="#729463" strokeWidth="6" />
        {[0, 72, 144, 216, 288].map(a => <ellipse key={a} cx="34" cy="20" rx="15" ry="23" transform={`rotate(${a} 34 43)`} fill="#e69db2" />)}
        <circle cx="34" cy="43" r="16" fill="#f4d27d" />
      </g>
      <g fill="#faf8f1"><circle cx="165" cy="288" r="5" /><circle cx="177" cy="296" r="5" /><circle cx="151" cy="303" r="5" /><circle cx="453" cy="288" r="5" /></g>
      <path d="m65 102 4-12 4 12 12 4-12 4-4 12-4-12-12-4Z" fill="#e6c672" />
      <path d="m491 189 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z" fill="#e6c672" />
    </svg>
  );
}

function PictureArtInlineSun() {
  return <>
    {Array.from({ length: 8 }, (_, i) => <path key={i} d="M65 6v12" transform={`rotate(${i * 45} 65 65)`} stroke="#e9be59" strokeWidth="6" strokeLinecap="round" />)}
    <circle cx="65" cy="65" r="34" fill="#efd078" />
    <circle cx="54" cy="62" r="3" fill="#776044" /><circle cx="76" cy="62" r="3" fill="#776044" />
    <path d="M57 73q8 8 16 0" fill="none" stroke="#776044" strokeWidth="3" strokeLinecap="round" />
  </>;
}
