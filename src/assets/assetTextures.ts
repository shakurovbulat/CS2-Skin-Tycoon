/**
 * Enhanced high-definition SVG textures & CS2 Map Backgrounds for CS2 Skin Tycoon
 * Every single skin has its own distinctive, custom-rendered design and colors.
 */

// --- Base Utilities ---
export const COIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="coinGrad" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fff3b0"/>
      <stop offset="35%" stop-color="#ea7c1e"/>
      <stop offset="85%" stop-color="#b45309"/>
      <stop offset="100%" stop-color="#78350f"/>
    </radialGradient>
    <radialGradient id="innerGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffd54f"/>
      <stop offset="60%" stop-color="#ea7c1e"/>
      <stop offset="100%" stop-color="#92400e"/>
    </radialGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <circle cx="32" cy="32" r="30" fill="url(#coinGrad)" stroke="#fef08a" stroke-width="2"/>
  <circle cx="32" cy="32" r="26" fill="url(#innerGrad)" stroke="#78350f" stroke-width="1.5" stroke-dasharray="3,1.5"/>
  <path d="M32 16 L35.5 25 L45 25 L37.5 31 L40.5 40 L32 34.5 L23.5 40 L26.5 31 L19 25 L28.5 25 Z" fill="#fffbeb" filter="url(#glow)"/>
</svg>`;

export const SPARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="sparkGrad">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#fde047"/>
      <stop offset="100%" stop-color="#ea580c" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <path d="M16 0 Q16 16 32 16 Q16 16 16 32 Q16 16 0 16 Q16 16 16 0" fill="url(#sparkGrad)"/>
  <circle cx="16" cy="16" r="3.5" fill="#ffffff"/>
</svg>`;

// ==========================================
// 1. AK-47 FAMILY
// ==========================================

export function buildAk47Svg(skinId: string): string {
  let finishFill = 'url(#caseHardened)';
  let woodFill = 'url(#woodStock)';
  let extraGlow = '#0284c7';
  let magFill = '#1e293b';

  if (skinId === 'ak47_redline') {
    finishFill = 'url(#carbonWeave)';
    woodFill = '#121214';
    magFill = 'url(#carbonWeave)';
    extraGlow = '#ef4444';
  } else if (skinId === 'ak47_asiimov') {
    finishFill = '#f8fafc';
    woodFill = '#0f172a';
    magFill = '#ea580c';
    extraGlow = '#f97316';
  } else if (skinId === 'ak47_vulcan') {
    finishFill = '#0369a1';
    woodFill = '#0f172a';
    magFill = '#f8fafc';
    extraGlow = '#38bdf8';
  } else if (skinId === 'ak47_the_empress') {
    finishFill = 'url(#empressGrad)';
    woodFill = '#0f172a';
    magFill = '#b45309';
    extraGlow = '#fbbf24';
  } else if (skinId === 'ak47_wild_lotus') {
    finishFill = 'url(#lotusGrad)';
    woodFill = '#064e3b';
    magFill = '#047857';
    extraGlow = '#10b981';
  } else if (skinId === 'ak47_gold_arabesque') {
    finishFill = 'url(#goldEngraved)';
    woodFill = '#451a03';
    magFill = 'url(#goldEngraved)';
    extraGlow = '#ffd700';
  } else if (skinId === 'ak47_slate') {
    finishFill = '#18181b';
    woodFill = '#121214';
    magFill = '#18181b';
    extraGlow = '#64748b';
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="weaponAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${extraGlow}" stop-opacity="0.35"/>
      <stop offset="65%" stop-color="#ea7c1e" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="caseHardened" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#1d4ed8"/>
      <stop offset="28%" stop-color="#0284c7"/>
      <stop offset="48%" stop-color="#38bdf8"/>
      <stop offset="65%" stop-color="#7c3aed"/>
      <stop offset="82%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
    <linearGradient id="empressGrad" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="40%" stop-color="#d97706"/>
      <stop offset="70%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="lotusGrad" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#064e3b"/>
      <stop offset="35%" stop-color="#059669"/>
      <stop offset="70%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#fda4af"/>
    </linearGradient>
    <linearGradient id="goldEngraved" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="35%" stop-color="#eab308"/>
      <stop offset="75%" stop-color="#ca8a04"/>
      <stop offset="100%" stop-color="#854d0e"/>
    </linearGradient>
    <linearGradient id="carbonWeave" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#27272a"/>
      <stop offset="50%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <linearGradient id="woodStock" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9a3412"/>
      <stop offset="35%" stop-color="#7c2d12"/>
      <stop offset="70%" stop-color="#431407"/>
      <stop offset="100%" stop-color="#2d0f04"/>
    </linearGradient>
    <filter id="softShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <ellipse cx="360" cy="120" rx="330" ry="85" fill="url(#weaponAura)"/>

  <g filter="url(#softShadow)">
    <path d="M 40 135 L 140 100 L 220 115 L 220 148 L 135 155 L 45 168 Z" fill="${woodFill}" stroke="#0f172a" stroke-width="2"/>
    <path d="M 40 135 L 50 132 L 55 170 L 45 168 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>

    ${skinId === 'ak47_redline' ? '<line x1="70" y1="120" x2="200" y2="135" stroke="#ef4444" stroke-width="4"/><line x1="75" y1="130" x2="205" y2="145" stroke="#ef4444" stroke-width="4"/>' : ''}
    ${skinId === 'ak47_asiimov' ? '<polygon points="120,108 170,108 200,138 150,138" fill="#ea580c"/>' : ''}
    ${skinId === 'ak47_vulcan' ? '<polygon points="100,120 180,120 200,140 120,140" fill="#38bdf8"/>' : ''}
    ${skinId === 'ak47_the_empress' ? '<circle cx="160" cy="128" r="16" fill="#facc15" stroke="#000" stroke-width="2"/><circle cx="160" cy="128" r="12" fill="#3b82f6"/>' : ''}
    ${skinId === 'ak47_wild_lotus' ? '<path d="M 90 130 Q 130 110 170 135" fill="none" stroke="#f43f5e" stroke-width="5"/>' : ''}

    <path d="M 235 145 L 268 145 L 255 210 L 220 206 Z" fill="${woodFill}" stroke="#0f172a" stroke-width="2"/>
    <path d="M 270 148 Q 285 180 305 152" fill="none" stroke="#334155" stroke-width="3"/>
    <path d="M 283 152 Q 288 163 283 170" fill="none" stroke="#cbd5e1" stroke-width="2.5"/>

    <path d="M 320 145 C 322 175 350 215 375 230 L 398 220 C 375 195 352 165 348 145 Z" fill="${magFill}" stroke="#0f172a" stroke-width="2"/>
    ${skinId === 'ak47_redline' ? '<line x1="330" y1="168" x2="385" y2="198" stroke="#ef4444" stroke-width="3.5"/><line x1="335" y1="178" x2="390" y2="208" stroke="#ef4444" stroke-width="3.5"/>' : ''}
    ${skinId === 'ak47_asiimov' ? '<polygon points="330,165 370,185 365,210 325,190" fill="#f8fafc"/>' : ''}
    ${skinId === 'ak47_the_empress' ? '<path d="M 340 170 L 375 185 L 360 215 Z" fill="#facc15"/>' : ''}
    ${skinId === 'ak47_wild_lotus' ? '<ellipse cx="360" cy="180" rx="14" ry="8" fill="#fb7185"/>' : ''}

    <path d="M 215 110 L 400 110 L 400 146 L 215 146 Z" fill="${finishFill}" stroke="#0f172a" stroke-width="2"/>
    <path d="M 215 95 Q 310 93 400 97 L 400 110 L 215 110 Z" fill="${finishFill}" stroke="#0f172a" stroke-width="1.5"/>

    <!-- StatTrak Module Frame -->
    <g transform="translate(265, 116)">
      <rect x="0" y="0" width="70" height="22" rx="2" fill="#090d14" stroke="#f59e0b" stroke-width="1.5"/>
      <rect x="4" y="3" width="62" height="16" rx="1" fill="#020408"/>
      <circle cx="60" cy="11" r="2" fill="#22c55e"/>
    </g>

    <rect x="290" y="103" width="55" height="7" rx="1.5" fill="#e2e8f0" stroke="#475569" stroke-width="1"/>
    <path d="M 335 106 L 348 106 L 350 102 L 335 102 Z" fill="#94a3b8" stroke="#334155" stroke-width="1"/>

    <path d="M 400 97 L 515 97 L 510 115 L 400 115 Z" fill="${woodFill}" stroke="#0f172a" stroke-width="1.5"/>
    <path d="M 400 115 L 525 115 L 518 142 L 400 142 Z" fill="${woodFill}" stroke="#0f172a" stroke-width="1.5"/>
    ${skinId === 'ak47_redline' ? '<line x1="410" y1="128" x2="515" y2="128" stroke="#ef4444" stroke-width="3"/>' : ''}
    ${skinId === 'ak47_asiimov' ? '<polygon points="430,102 490,102 480,135 420,135" fill="#ea580c"/>' : ''}
    ${skinId === 'ak47_wild_lotus' ? '<path d="M 410 120 Q 450 105 500 125" fill="none" stroke="#34d399" stroke-width="4"/>' : ''}

    <path d="M 515 94 L 545 94 L 545 116 L 520 116 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
    <rect x="525" y="118" width="135" height="10" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
    <line x1="528" y1="120" x2="655" y2="120" stroke="#94a3b8" stroke-width="1.5" opacity="0.8"/>
    <line x1="410" y1="144" x2="640" y2="144" stroke="#64748b" stroke-width="2"/>

    <path d="M 640 100 L 652 100 L 654 128 L 638 128 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
    <rect x="645" y="93" width="2.5" height="8" fill="#f8fafc"/>
    <path d="M 660 116 L 685 112 L 685 130 L 660 128 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
  </g>
</svg>`;
}

// ==========================================
// 2. M4A4 FAMILY
// ==========================================

export function buildM4A4Svg(skinId: string): string {
  let mainBody = '#1e293b';
  let accentColor = '#64748b';
  let auraGlow = '#38bdf8';
  let isHowl = skinId === 'm4a4_howl';

  if (isHowl) {
    mainBody = '#7f1d1d';
    accentColor = '#f97316';
    auraGlow = '#ef4444';
  } else if (skinId === 'm4a4_asiimov') {
    mainBody = '#f8fafc';
    accentColor = '#ea580c';
    auraGlow = '#f97316';
  } else if (skinId === 'm4a4_evil_daimyo') {
    mainBody = '#881337';
    accentColor = '#e11d48';
    auraGlow = '#f43f5e';
  } else if (skinId === 'm4a4_the_emperor') {
    mainBody = '#1e3a8a';
    accentColor = '#fbbf24';
    auraGlow = '#60a5fa';
  } else if (skinId === 'm4a4_desolate_space') {
    mainBody = '#312e81';
    accentColor = '#38bdf8';
    auraGlow = '#818cf8';
  } else if (skinId === 'm4a4_magnesium') {
    mainBody = '#64748b';
    accentColor = '#cbd5e1';
    auraGlow = '#94a3b8';
  } else if (skinId === 'm4a4_spider_lily') {
    mainBody = '#18181b';
    accentColor = '#e11d48';
    auraGlow = '#f43f5e';
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="m4Aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${auraGlow}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="howlInferno" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#991b1b"/>
      <stop offset="25%" stop-color="#ea580c"/>
      <stop offset="55%" stop-color="#f59e0b"/>
      <stop offset="85%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#18181b"/>
    </linearGradient>
    <linearGradient id="emperorBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#172554"/>
      <stop offset="40%" stop-color="#1e40af"/>
      <stop offset="80%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#fef08a"/>
    </linearGradient>
  </defs>

  <ellipse cx="360" cy="120" rx="330" ry="80" fill="url(#m4Aura)"/>

  <g transform="translate(10, 10)">
    <path d="M 45 130 L 145 105 L 210 115 L 210 135 L 140 135 L 75 165 Z" fill="#0f172a" stroke="#000" stroke-width="2"/>
    <rect x="40" y="125" width="12" height="45" rx="3" fill="#334155"/>
    <line x1="90" y1="122" x2="200" y2="122" stroke="#475569" stroke-width="5"/>

    <path d="M 230 140 L 260 140 L 250 205 L 220 200 Z" fill="#0f172a" stroke="#000" stroke-width="2"/>
    <path d="M 265 145 Q 280 175 295 145" fill="none" stroke="#334155" stroke-width="3"/>
    <path d="M 276 148 Q 280 160 275 165" fill="none" stroke="#e2e8f0" stroke-width="2.5"/>

    <path d="M 315 140 L 345 140 L 358 220 L 328 222 Z" fill="#0f172a" stroke="#000" stroke-width="2"/>
    <line x1="335" y1="150" x2="345" y2="210" stroke="${accentColor}" stroke-width="2.5"/>

    <path d="M 205 102 L 395 102 L 395 142 L 205 142 Z" fill="${isHowl ? 'url(#howlInferno)' : (skinId === 'm4a4_the_emperor' ? 'url(#emperorBlue)' : mainBody)}" stroke="#000" stroke-width="2"/>

    <!-- Howl Ferocious Wolf Head Artwork -->
    ${isHowl ? `
      <path d="M 245 135 Q 280 100 330 110 Q 370 105 385 125 Q 345 142 300 135 Z" fill="#ea580c"/>
      <path d="M 320 112 L 355 122 L 335 128 Z" fill="#facc15"/>
      <circle cx="315" cy="116" r="4.5" fill="#ffffff" filter="drop-shadow(0 0 6px #ff0)"/>
      <path d="M 340 130 L 358 133 L 342 136 Z" fill="#ffffff"/>
      <path d="M 355 132 L 372 135 L 358 138 Z" fill="#ffffff"/>
      <path d="M 255 110 Q 280 95 305 105" fill="none" stroke="#f59e0b" stroke-width="3"/>
    ` : ''}

    ${skinId === 'm4a4_evil_daimyo' ? '<polygon points="260,105 285,120 260,135 235,120" fill="#f43f5e"/><line x1="285" y1="120" x2="380" y2="120" stroke="#f43f5e" stroke-width="3"/>' : ''}
    ${skinId === 'm4a4_desolate_space' ? '<circle cx="310" cy="120" r="14" fill="#38bdf8" opacity="0.8"/><circle cx="310" cy="120" r="8" fill="#000"/>' : ''}
    ${skinId === 'm4a4_asiimov' ? '<polygon points="230,105 320,105 350,138 260,138" fill="#ea580c"/>' : ''}

    <g transform="translate(260, 110)">
      <rect x="0" y="0" width="65" height="20" rx="2" fill="#090d14" stroke="#f59e0b" stroke-width="1.3"/>
      <rect x="3" y="3" width="58" height="14" rx="1" fill="#020408"/>
      <circle cx="56" cy="10" r="1.5" fill="#22c55e"/>
    </g>

    <rect x="230" y="93" width="165" height="9" fill="#0f172a" stroke="#000" stroke-width="1.5"/>
    <path d="M 240 93 L 260 78 L 290 78 L 300 93 Z" fill="#0f172a"/>

    <rect x="395" y="98" width="125" height="38" fill="${mainBody}" stroke="#000" stroke-width="2"/>
    <line x1="400" y1="106" x2="515" y2="106" stroke="${accentColor}" stroke-width="3"/>
    <line x1="400" y1="117" x2="515" y2="117" stroke="${accentColor}" stroke-width="3"/>
    <line x1="400" y1="128" x2="515" y2="128" stroke="${accentColor}" stroke-width="3"/>

    <path d="M 520 95 L 535 76 L 545 76 L 545 125 L 520 125 Z" fill="#0f172a" stroke="#000" stroke-width="1.5"/>
    <rect x="545" y="108" width="95" height="10" fill="#1e293b" stroke="#000" stroke-width="1.5"/>
    <rect x="640" y="105" width="28" height="16" rx="2" fill="#0f172a" stroke="#000" stroke-width="1.5"/>
  </g>
</svg>`;
}

// ==========================================
// 3. M4A1-S (SILENCED) FAMILY
// ==========================================

export function buildM4A1SSvg(skinId: string): string {
  let bodyFill = '#f8fafc';
  let silencerFill = '#0f172a';
  let auraGlow = '#8847ff';

  if (skinId === 'm4a1_printstream') {
    bodyFill = 'url(#printstreamGrad)';
    silencerFill = '#ffffff';
    auraGlow = '#a855f7';
  } else if (skinId === 'm4a1_hyper_beast') {
    bodyFill = '#1e1b4b';
    silencerFill = '#4c1d95';
    auraGlow = '#ec4899';
  } else if (skinId === 'm4a1_cyrex') {
    bodyFill = '#18181b';
    silencerFill = '#18181b';
    auraGlow = '#ef4444';
  } else if (skinId === 'm4a1_basilisk') {
    bodyFill = '#78716c';
    silencerFill = '#57534e';
    auraGlow = '#a8a29e';
  } else if (skinId === 'm4a1_player_two') {
    bodyFill = '#0284c7';
    silencerFill = '#d946ef';
    auraGlow = '#06b6d4';
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="m4a1Aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${auraGlow}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="printstreamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="35%" stop-color="#f8fafc"/>
      <stop offset="70%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>
    <linearGradient id="hyperBeastGrad" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="30%" stop-color="#3b82f6"/>
      <stop offset="60%" stop-color="#ec4899"/>
      <stop offset="85%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>
  </defs>

  <ellipse cx="360" cy="120" rx="335" ry="80" fill="url(#m4a1Aura)"/>

  <g transform="translate(10, 15)">
    <path d="M 40 120 L 130 100 L 190 110 L 190 128 L 130 128 L 65 155 Z" fill="#0f172a" stroke="#000" stroke-width="2"/>
    <line x1="80" y1="115" x2="185" y2="115" stroke="#334155" stroke-width="4"/>

    <path d="M 210 130 L 240 130 L 230 195 L 200 190 Z" fill="#0f172a" stroke="#000" stroke-width="2"/>
    <path d="M 290 130 L 318 130 L 328 190 L 302 192 Z" fill="#0f172a" stroke="#000" stroke-width="2"/>

    <path d="M 185 96 L 365 96 L 365 132 L 185 132 Z" fill="${skinId === 'm4a1_hyper_beast' ? 'url(#hyperBeastGrad)' : bodyFill}" stroke="#000" stroke-width="2"/>

    ${skinId === 'm4a1_printstream' ? `
      <text x="210" y="115" font-family="'Courier New', monospace" font-weight="900" font-size="14" fill="#000">XX</text>
      <rect x="250" y="103" width="10" height="10" fill="#000"/>
      <rect x="264" y="103" width="4" height="10" fill="#000"/>
    ` : ''}

    ${skinId === 'm4a1_cyrex' ? `
      <line x1="190" y1="105" x2="360" y2="105" stroke="#ef4444" stroke-width="3"/>
      <polygon points="260,115 320,115 300,130 240,130" fill="#ffffff"/>
    ` : ''}

    <g transform="translate(230, 105)">
      <rect x="0" y="0" width="60" height="18" rx="2" fill="#090d14" stroke="#f59e0b" stroke-width="1.2"/>
      <rect x="3" y="3" width="54" height="12" rx="1" fill="#020408"/>
    </g>

    <path d="M 365 92 L 465 92 L 465 125 L 365 125 Z" fill="${skinId === 'm4a1_hyper_beast' ? 'url(#hyperBeastGrad)' : bodyFill}" stroke="#000" stroke-width="2"/>

    <rect x="465" y="100" width="220" height="22" rx="4" fill="${silencerFill}" stroke="#000" stroke-width="2"/>
    <line x1="475" y1="111" x2="675" y2="111" stroke="${skinId === 'm4a1_printstream' ? '#000' : (skinId === 'm4a1_cyrex' ? '#ef4444' : '#475569')}" stroke-width="2" stroke-dasharray="8,4"/>
    ${skinId === 'm4a1_printstream' ? '<text x="560" y="115" font-family="sans-serif" font-weight="900" font-size="10" fill="#000">PRINTSTREAM // 01</text>' : ''}
  </g>
</svg>`;
}

// ==========================================
// 4. AWP SNIPER FAMILY
// ==========================================

export function buildAwpSvg(skinId: string): string {
  let stockFill = 'url(#dragonGold)';
  let auraGlow = '#eab308';
  let isDragonLore = skinId === 'awp_dragon_lore';

  if (skinId === 'awp_asiimov') {
    stockFill = '#f8fafc';
    auraGlow = '#ea580c';
  } else if (skinId === 'awp_atheris') {
    stockFill = '#0f172a';
    auraGlow = '#10b981';
  } else if (skinId === 'awp_fever_dream') {
    stockFill = '#1e1b4b';
    auraGlow = '#f43f5e';
  } else if (skinId === 'awp_capillary') {
    stockFill = '#18181b';
    auraGlow = '#06b6d4';
  } else if (skinId === 'awp_gungnir') {
    stockFill = 'url(#gungnirIce)';
    auraGlow = '#38bdf8';
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="awpAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${auraGlow}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="dragonGold" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#fde047"/>
      <stop offset="35%" stop-color="#ca8a04"/>
      <stop offset="70%" stop-color="#15803d"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="gungnirIce" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#e0f2fe"/>
      <stop offset="40%" stop-color="#38bdf8"/>
      <stop offset="80%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0c4a6e"/>
    </linearGradient>
    <linearGradient id="viperGreen" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="50%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
  </defs>

  <ellipse cx="360" cy="120" rx="340" ry="75" fill="url(#awpAura)"/>

  <g transform="translate(15, 20)">
    <path d="M 40 120 L 130 95 L 230 110 L 230 150 L 160 160 L 50 165 Z" fill="${stockFill}" stroke="#090d14" stroke-width="2"/>
    <ellipse cx="140" cy="132" rx="22" ry="14" fill="#0a0f18"/>
    <rect x="36" y="120" width="10" height="46" rx="2" fill="#1e293b"/>

    <rect x="230" y="98" width="180" height="42" fill="${stockFill}" stroke="#090d14" stroke-width="2"/>

    ${skinId === 'awp_atheris' ? `
      <path d="M 160 130 Q 230 85 300 115 Q 360 125 430 108" fill="none" stroke="url(#viperGreen)" stroke-width="14" stroke-linecap="round"/>
      <path d="M 280 115 Q 340 95 400 115" fill="none" stroke="#34d399" stroke-width="4"/>
      <circle cx="435" cy="108" r="6.5" fill="#10b981"/>
      <circle cx="437" cy="106" r="2" fill="#ef4444"/>
    ` : ''}

    ${skinId === 'awp_fever_dream' ? `
      <text x="240" y="125" font-family="'Chakra Petch', sans-serif" font-weight="900" font-size="18" fill="#f43f5e">DEADLY</text>
      <circle cx="340" cy="115" r="8" fill="none" stroke="#06b6d4" stroke-width="3"/>
    ` : ''}

    ${skinId === 'awp_capillary' ? `
      <path d="M 230 130 Q 280 100 330 130" fill="none" stroke="#06b6d4" stroke-width="3"/>
      <path d="M 250 115 Q 300 140 350 110" fill="none" stroke="#f43f5e" stroke-width="3"/>
    ` : ''}

    ${skinId === 'awp_gungnir' ? `
      <path d="M 240 120 L 400 120" stroke="#f0f9ff" stroke-width="4"/>
      <polygon points="380,110 410,120 380,130" fill="#f0f9ff"/>
    ` : ''}

    ${isDragonLore ? `
      <path d="M 240 126 Q 270 96 310 108 Q 340 128 375 112" fill="none" stroke="#f97316" stroke-width="7"/>
      <circle cx="285" cy="106" r="3.5" fill="#ffffff" filter="drop-shadow(0 0 4px #ff0)"/>
      <path d="M 300 102 L 350 90 L 370 112 Z" fill="#ca8a04" opacity="0.75"/>
    ` : ''}

    ${skinId === 'awp_asiimov' ? '<polygon points="250,98 350,98 330,140 230,140" fill="#ea580c"/>' : ''}

    <rect x="410" y="105" width="240" height="12" fill="#1e293b" stroke="#090d14" stroke-width="1.5"/>
    <rect x="645" y="98" width="35" height="26" rx="2" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
    <line x1="655" y1="102" x2="655" y2="120" stroke="#f8fafc" stroke-width="2"/>

    <path d="M 220 72 L 270 76 L 360 76 L 400 70 L 410 88 L 380 84 L 250 84 L 215 86 Z" fill="#0f172a" stroke="${auraGlow}" stroke-width="1.5"/>
    <rect x="270" y="84" width="12" height="16" fill="#334155"/>
    <rect x="350" y="84" width="12" height="16" fill="#334155"/>

    <path d="M 285 96 L 270 85 L 262 88" fill="none" stroke="#e2e8f0" stroke-width="3.5" stroke-linecap="round"/>

    <g transform="translate(290, 110)">
      <rect x="0" y="0" width="64" height="20" rx="2" fill="#090d14" stroke="#f59e0b" stroke-width="1.2"/>
      <rect x="3" y="3" width="58" height="14" rx="1" fill="#020408"/>
    </g>
  </g>
</svg>`;
}

// ==========================================
// 5. DESERT EAGLE FAMILY
// ==========================================

export function buildDeagleSvg(skinId: string): string {
  let slideFill = '#1e293b';
  let auraGlow = '#ea580c';
  let isBlaze = skinId === 'deagle_blaze';

  if (isBlaze) {
    slideFill = '#09090b';
    auraGlow = '#f97316';
  } else if (skinId === 'deagle_code_red') {
    slideFill = '#dc2626';
    auraGlow = '#ef4444';
  } else if (skinId === 'deagle_kumicho_dragon') {
    slideFill = '#cbd5e1';
    auraGlow = '#f8fafc';
  } else if (skinId === 'deagle_light_rail') {
    slideFill = 'url(#lightRailGrad)';
    auraGlow = '#4b69ff';
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="deagleAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${auraGlow}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="blazeFlames" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#09090b"/>
      <stop offset="35%" stop-color="#991b1b"/>
      <stop offset="65%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#facc15"/>
    </linearGradient>
    <linearGradient id="lightRailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e2e8f0"/>
      <stop offset="50%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
  </defs>

  <ellipse cx="360" cy="120" rx="300" ry="75" fill="url(#deagleAura)"/>

  <g transform="translate(60, 5) scale(1.35)">
    <path d="M 120 95 L 180 95 L 155 205 L 90 195 Z" fill="#0f172a" stroke="#000" stroke-width="2"/>
    <rect x="110" y="115" width="45" height="70" rx="4" fill="#1e293b"/>
    <line x1="125" y1="125" x2="125" y2="175" stroke="#334155" stroke-width="2"/>
    <line x1="135" y1="125" x2="135" y2="175" stroke="#334155" stroke-width="2"/>

    <path d="M 105 85 L 135 75 L 180 85 L 390 85 L 390 105 L 190 105 Z" fill="#0f172a" stroke="#000" stroke-width="2"/>
    <path d="M 180 95 Q 215 145 245 95" fill="none" stroke="#334155" stroke-width="3"/>
    <path d="M 205 98 Q 210 120 200 125" fill="none" stroke="#cbd5e1" stroke-width="3"/>

    <rect x="115" y="48" width="280" height="42" rx="3" fill="${isBlaze ? 'url(#blazeFlames)' : slideFill}" stroke="#000" stroke-width="2"/>

    ${isBlaze ? `
      <path d="M 210 88 Q 250 50 295 62 Q 340 45 395 48 L 395 88 Z" fill="#facc15"/>
      <path d="M 240 88 Q 275 58 320 68 L 395 88 Z" fill="#ef4444"/>
      <path d="M 270 88 Q 300 65 350 72 L 395 88 Z" fill="#b91c1c"/>
    ` : ''}

    ${skinId === 'deagle_code_red' ? '<line x1="130" y1="68" x2="385" y2="68" stroke="#ffffff" stroke-width="4"/><line x1="130" y1="76" x2="385" y2="76" stroke="#ffffff" stroke-width="2"/>' : ''}
    ${skinId === 'deagle_kumicho_dragon' ? '<path d="M 150 70 Q 250 50 350 70" fill="none" stroke="#ffffff" stroke-width="3" stroke-dasharray="4,2"/>' : ''}

    <g transform="translate(160, 58)">
      <rect x="0" y="0" width="60" height="20" rx="2" fill="#090d14" stroke="#f59e0b" stroke-width="1.2"/>
      <rect x="3" y="3" width="54" height="14" rx="1" fill="#020408"/>
    </g>

    <line x1="280" y1="48" x2="380" y2="48" stroke="#000" stroke-width="4" stroke-dasharray="6,4"/>
    <rect x="120" y="40" width="8" height="9" fill="#0f172a"/>
    <rect x="385" y="40" width="6" height="9" fill="#0f172a"/>
  </g>
</svg>`;
}

// ==========================================
// 6. USP-S (SILENCED) FAMILY
// ==========================================

export function buildUspsSvg(skinId: string): string {
  let slideFill = '#1e293b';
  let silencerFill = '#1e293b';
  let auraGlow = '#4b69ff';
  let isKillConfirmed = skinId === 'usps_kill_confirmed';

  if (isKillConfirmed) {
    slideFill = '#991b1b';
    silencerFill = '#7f1d1d';
    auraGlow = '#ef4444';
  } else if (skinId === 'usps_cortex') {
    slideFill = '#18181b';
    silencerFill = '#ec4899';
    auraGlow = '#f43f5e';
  } else if (skinId === 'usp_guardian') {
    slideFill = '#1e3a8a';
    silencerFill = '#172554';
    auraGlow = '#3b82f6';
  } else if (skinId === 'usp_orion') {
    slideFill = '#18181b';
    silencerFill = '#ea580c';
    auraGlow = '#f97316';
  } else if (skinId === 'usps_forest') {
    slideFill = '#3f6212';
    silencerFill = '#166534';
    auraGlow = '#22c55e';
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="uspsAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${auraGlow}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="360" cy="120" rx="310" ry="75" fill="url(#uspsAura)"/>

  <g transform="translate(25, 10) scale(1.2)">
    <path d="M 120 90 L 175 90 L 155 195 L 95 185 Z" fill="#0f172a" stroke="#000" stroke-width="2"/>
    <path d="M 170 95 Q 195 135 220 95" fill="none" stroke="#334155" stroke-width="3"/>
    <path d="M 188 98 Q 192 118 185 122" fill="none" stroke="#cbd5e1" stroke-width="2.5"/>

    <rect x="90" y="55" width="220" height="38" rx="3" fill="${slideFill}" stroke="#000" stroke-width="2"/>

    ${isKillConfirmed ? `
      <path d="M 155 74 Q 185 55 210 70 Q 220 90 175 92 Z" fill="#e2e8f0"/>
      <circle cx="178" cy="74" r="3.5" fill="#000"/>
      <circle cx="196" cy="74" r="3.5" fill="#000"/>
      <path d="M 210 65 L 295 65 L 290 75 L 210 75 Z" fill="#facc15" filter="drop-shadow(0 0 4px #ea580c)"/>
      <path d="M 250 60 Q 280 48 305 60" fill="none" stroke="#ef4444" stroke-width="3"/>
    ` : ''}

    ${skinId === 'usp_guardian' ? `
      <!-- CT Star Wings Emblem -->
      <polygon points="190,65 195,78 208,78 198,85 202,96 190,89 178,96 182,85 172,78 185,78" fill="#ffffff"/>
    ` : ''}

    ${skinId === 'usp_orion' ? '<rect x="90" y="55" width="80" height="12" fill="#ea580c"/>' : ''}

    <g transform="translate(110, 62)">
      <rect x="0" y="0" width="55" height="18" rx="2" fill="#090d14" stroke="#f59e0b" stroke-width="1.2"/>
      <rect x="3" y="3" width="49" height="12" rx="1" fill="#020408"/>
    </g>

    <rect x="310" y="58" width="240" height="32" rx="4" fill="${silencerFill}" stroke="#000" stroke-width="2"/>
    <line x1="320" y1="74" x2="540" y2="74" stroke="#475569" stroke-width="2" stroke-dasharray="6,4"/>
    <text x="400" y="77" font-family="'Courier New', monospace" font-weight="900" font-size="10" fill="#94a3b8" letter-spacing="2">TACTICAL // .45 ACP</text>
  </g>
</svg>`;
}

// ==========================================
// 7. GLOCK-18 FAMILY
// ==========================================

export function buildGlockSvg(skinId: string): string {
  let slideFill = '#0f172a';
  let auraGlow = '#0284c7';

  if (skinId === 'glock_water_elemental') {
    slideFill = '#991b1b';
    auraGlow = '#0284c7';
  } else if (skinId === 'glock_fade') {
    slideFill = 'url(#fadeSlide)';
    auraGlow = '#d946ef';
  } else if (skinId === 'glock_high_beam') {
    slideFill = '#0284c7';
    auraGlow = '#38bdf8';
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="glockAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${auraGlow}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fadeSlide" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffd700"/>
      <stop offset="35%" stop-color="#f43f5e"/>
      <stop offset="70%" stop-color="#d32ce6"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
    <linearGradient id="waterElemental" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>

  <ellipse cx="360" cy="120" rx="280" ry="70" fill="url(#glockAura)"/>

  <g transform="translate(80, 5) scale(1.35)">
    <path d="M 120 90 L 170 90 L 155 190 L 105 180 Z" fill="#18181b" stroke="#000" stroke-width="2"/>
    <path d="M 165 92 Q 190 130 215 95" fill="none" stroke="#334155" stroke-width="3"/>
    <path d="M 182 96 Q 186 115 180 120" fill="none" stroke="#cbd5e0" stroke-width="2.5"/>

    <rect x="90" y="55" width="260" height="38" rx="3" fill="${slideFill}" stroke="#000" stroke-width="2"/>

    ${skinId === 'glock_water_elemental' ? `
      <path d="M 140 76 Q 210 46 270 74 Q 315 55 345 74 Q 300 92 245 86 Z" fill="url(#waterElemental)"/>
      <circle cx="290" cy="68" r="3.5" fill="#ffffff" filter="drop-shadow(0 0 3px #38bdf8)"/>
      <circle cx="210" cy="64" r="2.5" fill="#67e8f9"/>
      <circle cx="330" cy="80" r="2" fill="#67e8f9"/>
    ` : ''}

    <g transform="translate(170, 62)">
      <rect x="0" y="0" width="55" height="18" rx="2" fill="#090d14" stroke="#f59e0b" stroke-width="1.2"/>
      <rect x="3" y="3" width="49" height="12" rx="1" fill="#020408"/>
    </g>

    <rect x="98" y="47" width="8" height="9" fill="#2d3748"/>
    <rect x="340" y="47" width="6" height="9" fill="#2d3748"/>
  </g>
</svg>`;
}

// ==========================================
// 8. P250 FAMILY
// ==========================================

export function buildP250Svg(skinId?: string): string {
  let slideColor = 'url(#sandSlide)';
  let isValence = skinId === 'p250_valence';

  if (isValence) {
    slideColor = '#475569';
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="p250Aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ea7c1e" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sandSlide" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d4af37"/>
      <stop offset="40%" stop-color="#c5a059"/>
      <stop offset="70%" stop-color="#8c6f3e"/>
      <stop offset="100%" stop-color="#5a4726"/>
    </linearGradient>
  </defs>

  <ellipse cx="360" cy="120" rx="280" ry="70" fill="url(#p250Aura)"/>

  <g transform="translate(70, 5) scale(1.35)">
    <path d="M 120 90 L 175 90 L 155 190 L 95 180 Z" fill="#1f2937" stroke="#0d1117" stroke-width="2"/>
    <rect x="110" y="110" width="38" height="60" rx="3" fill="#111827"/>
    <path d="M 165 92 Q 190 135 220 95" fill="none" stroke="#4a5568" stroke-width="3"/>
    <path d="M 185 96 Q 190 115 182 120" fill="none" stroke="#cbd5e0" stroke-width="2.5"/>

    <rect x="90" y="55" width="280" height="42" rx="4" fill="${slideColor}" stroke="#1a202c" stroke-width="2"/>
    ${isValence ? '<polygon points="120,60 200,60 170,90 90,90" fill="#38bdf8" opacity="0.8"/>' : ''}
    <line x1="105" y1="62" x2="105" y2="88" stroke="#4a5568" stroke-width="2"/>
    <line x1="112" y1="62" x2="112" y2="88" stroke="#4a5568" stroke-width="2"/>
    <line x1="119" y1="62" x2="119" y2="88" stroke="#4a5568" stroke-width="2"/>

    <g transform="translate(180, 62)">
      <rect x="0" y="0" width="60" height="20" rx="2" fill="#090d14" stroke="#f59e0b" stroke-width="1.2"/>
      <rect x="3" y="3" width="54" height="14" rx="1" fill="#020408"/>
    </g>
  </g>
</svg>`;
}

// ==========================================
// 9. MP9 / SMG FAMILY
// ==========================================

export function buildMp9Svg(skinId: string): string {
  let bodyFill = '#1e293b';
  let auraGlow = '#38bdf8';

  if (skinId === 'mp9_mount_fuji') {
    bodyFill = 'url(#fujiSunset)';
    auraGlow = '#f43f5e';
  } else if (skinId === 'mac10_silver') {
    bodyFill = '#cbd5e1';
    auraGlow = '#f8fafc';
  } else if (skinId === 'ssg08_abyss') {
    bodyFill = '#0369a1';
    auraGlow = '#0284c7';
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="mp9Aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${auraGlow}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fujiSunset" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="45%" stop-color="#f59e0b"/>
      <stop offset="85%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>

  <ellipse cx="360" cy="120" rx="290" ry="75" fill="url(#mp9Aura)"/>

  <g transform="translate(40, 10) scale(1.25)">
    <rect x="120" y="70" width="280" height="55" rx="5" fill="${bodyFill}" stroke="#000" stroke-width="2"/>
    <path d="M 60 80 L 120 80 L 110 115" fill="none" stroke="#64748b" stroke-width="3"/>

    ${skinId === 'mp9_mount_fuji' ? `
      <polygon points="210,125 250,85 290,125" fill="#ffffff"/>
      <circle cx="330" cy="85" r="14" fill="#ef4444"/>
      <circle cx="180" cy="90" r="4" fill="#f472b6"/>
      <circle cx="195" cy="82" r="3" fill="#f472b6"/>
    ` : ''}

    <path d="M 180 120 L 210 120 L 225 200 L 195 205 Z" fill="#0f172a" stroke="#000" stroke-width="2"/>
    <rect x="340" y="125" width="22" height="60" rx="4" fill="#0f172a" stroke="#000" stroke-width="2"/>
    <rect x="400" y="86" width="45" height="16" rx="2" fill="#0f172a" stroke="#000" stroke-width="1.5"/>

    <g transform="translate(240, 75)">
      <rect x="0" y="0" width="55" height="18" rx="2" fill="#090d14" stroke="#f59e0b" stroke-width="1.2"/>
      <rect x="3" y="3" width="49" height="12" rx="1" fill="#020408"/>
    </g>
  </g>
</svg>`;
}

// ==========================================
// 10. KNIVES FAMILY
// ==========================================

export function buildKarambitSvg(skinId: string): string {
  let bladeFill = 'url(#fadeBlade)';
  let auraGlow = '#ffd700';

  if (skinId === 'karambit_doppler') {
    bladeFill = 'url(#dopplerBlade)';
    auraGlow = '#38bdf8';
  } else if (skinId === 'karambit_slaughter') {
    bladeFill = '#e11d48';
    auraGlow = '#f43f5e';
  } else if (skinId === 'karambit_tiger_tooth') {
    bladeFill = 'url(#tigerTooth)';
    auraGlow = '#fbbf24';
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="knifeAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${auraGlow}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fadeBlade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffd700"/>
      <stop offset="35%" stop-color="#f43f5e"/>
      <stop offset="70%" stop-color="#d32ce6"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
    <linearGradient id="tigerTooth" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#facc15"/>
      <stop offset="50%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="dopplerBlade" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="35%" stop-color="#3b82f6"/>
      <stop offset="70%" stop-color="#1e40af"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
  </defs>

  <ellipse cx="360" cy="120" rx="300" ry="75" fill="url(#knifeAura)"/>

  <g transform="translate(90, 15) scale(1.3)">
    <circle cx="90" cy="110" r="28" fill="none" stroke="#1e293b" stroke-width="12"/>
    <circle cx="90" cy="110" r="20" fill="#0b0e14"/>
    <path d="M 115 95 L 210 90 L 220 135 L 115 125 Z" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
    <circle cx="150" cy="110" r="5" fill="#475569"/>
    <circle cx="185" cy="110" r="5" fill="#475569"/>
    <path d="M 215 88 Q 280 85 360 140 Q 320 185 240 145 L 220 135 Z" fill="${bladeFill}" stroke="#ffffff" stroke-width="1.5"/>
    ${skinId === 'karambit_tiger_tooth' ? '<path d="M 240 110 L 270 130 M 280 100 L 310 135" stroke="#000" stroke-width="3"/>' : ''}
    <path d="M 230 138 Q 300 170 358 140" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.8"/>
  </g>
</svg>`;
}

export function buildButterflySvg(skinId: string): string {
  let bladeFill = 'url(#bfFade)';
  let auraGlow = '#ec4899';

  if (skinId === 'butterfly_doppler') {
    bladeFill = 'url(#bfDoppler)';
    auraGlow = '#06b6d4';
  } else if (skinId === 'butterfly_slaughter') {
    bladeFill = '#e11d48';
    auraGlow = '#f43f5e';
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="bfAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${auraGlow}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bfFade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffd700"/>
      <stop offset="35%" stop-color="#f43f5e"/>
      <stop offset="70%" stop-color="#d32ce6"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
    <linearGradient id="bfDoppler" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="40%" stop-color="#0284c7"/>
      <stop offset="70%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#67e8f9"/>
    </linearGradient>
  </defs>

  <ellipse cx="360" cy="120" rx="300" ry="75" fill="url(#bfAura)"/>

  <g transform="translate(60, 15) scale(1.25)">
    <path d="M 60 70 Q 140 60 210 90 L 205 105 Q 140 75 60 85 Z" fill="#1e293b" stroke="#000" stroke-width="2"/>
    <path d="M 60 145 Q 140 155 210 125 L 205 110 Q 140 140 60 130 Z" fill="#1e293b" stroke="#000" stroke-width="2"/>
    <circle cx="210" cy="95" r="5" fill="#cbd5e1" stroke="#000"/>
    <circle cx="210" cy="120" r="5" fill="#cbd5e1" stroke="#000"/>
    <path d="M 215 95 L 375 105 Q 430 108 410 120 Q 360 125 215 120 Z" fill="${bladeFill}" stroke="#ffffff" stroke-width="1.5"/>
    <line x1="225" y1="108" x2="390" y2="108" stroke="#ffffff" stroke-width="2" opacity="0.7"/>
    <ellipse cx="260" cy="108" rx="8" ry="3" fill="#0f172a"/>
    <ellipse cx="290" cy="108" rx="8" ry="3" fill="#0f172a"/>
  </g>
</svg>`;
}

// ==========================================
// CENTRAL ASSET REGISTRY & SVG DISPATCHER
// ==========================================

export function getSkinSvg(textureKey: string): string {
  if (textureKey.startsWith('ak47_') || textureKey === 'ak47') {
    return buildAk47Svg(textureKey);
  }
  if (textureKey.startsWith('m4a4_')) {
    return buildM4A4Svg(textureKey);
  }
  if (textureKey.startsWith('m4a1_')) {
    return buildM4A1SSvg(textureKey);
  }
  if (textureKey.startsWith('awp_') || textureKey === 'awp') {
    return buildAwpSvg(textureKey);
  }
  if (textureKey.startsWith('deagle_')) {
    return buildDeagleSvg(textureKey);
  }
  if (textureKey.startsWith('usps_') || textureKey.startsWith('usp_')) {
    return buildUspsSvg(textureKey);
  }
  if (textureKey.startsWith('glock_')) {
    return buildGlockSvg(textureKey);
  }
  if (textureKey.startsWith('mp9_') || textureKey.startsWith('mac10_') || textureKey.startsWith('ssg08_')) {
    return buildMp9Svg(textureKey);
  }
  if (textureKey.startsWith('p250_') || textureKey === 'p250') {
    return buildP250Svg(textureKey);
  }
  if (textureKey.startsWith('karambit_') || textureKey === 'knife') {
    return buildKarambitSvg(textureKey);
  }
  if (textureKey.startsWith('butterfly_')) {
    return buildButterflySvg(textureKey);
  }
  return buildAk47Svg(textureKey);
}

// ==========================================
// CINEMATIC CS2 MAP BACKGROUNDS
// ==========================================

// ==========================================
// CINEMATIC CS2 MAP BACKGROUNDS (DETAILED VECTOR ART)
// ==========================================

// 1. Firing Range / Armory (Сектор 04)
export const CS2_BG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="hangarLight" cx="50%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#1e3a5f"/>
      <stop offset="35%" stop-color="#112238"/>
      <stop offset="70%" stop-color="#091322"/>
      <stop offset="100%" stop-color="#040810"/>
    </radialGradient>
    <linearGradient id="volBeamCyan" x1="40%" y1="0%" x2="52%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="#0284c7" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="volBeamAmber" x1="60%" y1="0%" x2="48%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.25"/>
      <stop offset="50%" stop-color="#ea580c" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
    <pattern id="trussPattern" width="120" height="80" patternUnits="userSpaceOnUse">
      <path d="M 0 0 L 60 40 L 120 0 M 0 80 L 60 40 L 120 80 M 60 0 L 60 80" stroke="#1e293b" stroke-width="2" fill="none" opacity="0.4"/>
    </pattern>
    <pattern id="metalFloorGrid" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="#070b12"/>
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#172554" stroke-width="1" opacity="0.6"/>
    </pattern>
    <linearGradient id="floorShine" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#030712" stop-opacity="1"/>
    </linearGradient>
  </defs>

  <!-- Background Wall & Overhead Truss Superstructure -->
  <rect width="1920" height="1080" fill="url(#hangarLight)"/>
  <rect width="1920" height="420" fill="url(#trussPattern)"/>

  <!-- Steel Girders & Cable Conduits -->
  <line x1="0" y1="120" x2="1920" y2="120" stroke="#334155" stroke-width="6"/>
  <line x1="0" y1="180" x2="1920" y2="180" stroke="#1e293b" stroke-width="4"/>
  <line x1="280" y1="0" x2="280" y2="700" stroke="#1e293b" stroke-width="8"/>
  <line x1="680" y1="0" x2="680" y2="700" stroke="#1e293b" stroke-width="6"/>
  <line x1="1240" y1="0" x2="1240" y2="700" stroke="#1e293b" stroke-width="6"/>
  <line x1="1640" y1="0" x2="1640" y2="700" stroke="#1e293b" stroke-width="8"/>

  <!-- Crossing Volumetric Spotlights -->
  <polygon points="500,0 920,0 1280,1080 320,1080" fill="url(#volBeamCyan)"/>
  <polygon points="1420,0 1000,0 640,1080 1600,1080" fill="url(#volBeamAmber)"/>

  <!-- Target Rail System & Digital Readouts -->
  <rect x="760" y="90" width="400" height="40" rx="3" fill="#0b1320" stroke="#38bdf8" stroke-width="2"/>
  <text x="960" y="116" font-family="'Rajdhani', sans-serif" font-weight="900" font-size="20" fill="#38bdf8" text-anchor="middle" letter-spacing="4">SECTOR 04 // LIVE FIRING BAY</text>
  <text x="960" y="220" font-family="'Rajdhani', sans-serif" font-weight="800" font-size="100" fill="#38bdf8" opacity="0.08" text-anchor="middle" letter-spacing="16">COUNTER-STRIKE 2</text>

  <!-- Heavy Ballistic Backstop & Wall Panels -->
  <rect x="0" y="480" width="1920" height="220" fill="#090f19" stroke="#1e293b" stroke-width="2"/>
  <line x1="0" y1="520" x2="1920" y2="520" stroke="#334155" stroke-width="2" stroke-dasharray="16,8"/>
  <line x1="0" y1="640" x2="1920" y2="640" stroke="#38bdf8" stroke-width="3" opacity="0.5"/>

  <!-- Anti-Slip Grated Metal Floor -->
  <polygon points="0,700 1920,700 1920,1080 0,1080" fill="url(#metalFloorGrid)"/>
  <polygon points="0,700 1920,700 1920,1080 0,1080" fill="url(#floorShine)"/>
  <line x1="0" y1="700" x2="1920" y2="700" stroke="#f59e0b" stroke-width="4"/>

  <!-- Target Pedestal Floor Ring Markers -->
  <ellipse cx="960" cy="840" rx="420" ry="110" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="16,8" opacity="0.5"/>
  <ellipse cx="960" cy="840" rx="340" ry="85" fill="none" stroke="#f59e0b" stroke-width="2" opacity="0.6"/>
  <ellipse cx="960" cy="840" rx="200" ry="50" fill="none" stroke="#38bdf8" stroke-width="1.5" opacity="0.8"/>

  <!-- CT Operator Guard Silhouette -->
  <g transform="translate(180, 360)" opacity="0.45">
    <ellipse cx="100" cy="480" rx="90" ry="22" fill="#000"/>
    <path d="M 70 200 L 130 200 L 140 380 L 115 480 L 85 480 L 60 380 Z" fill="#0f172a"/>
    <path d="M 65 140 L 135 140 L 145 220 L 55 220 Z" fill="#1e293b"/>
    <circle cx="100" cy="115" r="28" fill="#0f172a"/>
    <rect x="85" y="110" width="30" height="12" rx="2" fill="#38bdf8"/>
  </g>
</svg>`;

// 2. Dust II (Песчаный форт / Bombsite A)
export const DUST2_BG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="dustSky" cx="50%" cy="20%" r="85%">
      <stop offset="0%" stop-color="#fed7aa"/>
      <stop offset="25%" stop-color="#f59e0b"/>
      <stop offset="55%" stop-color="#b45309"/>
      <stop offset="85%" stop-color="#451a03"/>
      <stop offset="100%" stop-color="#1f0a02"/>
    </radialGradient>
    <radialGradient id="sunFlare" cx="50%" cy="15%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="20%" stop-color="#fef08a" stop-opacity="0.6"/>
      <stop offset="60%" stop-color="#f59e0b" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="dustBeam" x1="45%" y1="0%" x2="52%" y2="100%">
      <stop offset="0%" stop-color="#fef3c7" stop-opacity="0.45"/>
      <stop offset="45%" stop-color="#f59e0b" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
    <pattern id="sandstonePattern" width="80" height="40" patternUnits="userSpaceOnUse">
      <rect width="80" height="40" fill="#78350f"/>
      <path d="M 0 20 L 80 20 M 40 0 L 40 20 M 0 40 L 80 40 M 40 20 L 40 40 M 80 0 L 80 40" stroke="#451a03" stroke-width="2" fill="none" opacity="0.6"/>
    </pattern>
    <linearGradient id="groundSand" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#92400e"/>
      <stop offset="50%" stop-color="#451a03"/>
      <stop offset="100%" stop-color="#1c0701"/>
    </linearGradient>
  </defs>

  <!-- Golden Moroccan Morning Sky -->
  <rect width="1920" height="1080" fill="url(#dustSky)"/>
  <circle cx="960" cy="180" r="420" fill="url(#sunFlare)"/>
  <polygon points="700,0 1220,0 1450,1080 470,1080" fill="url(#dustBeam)"/>

  <!-- Distant Desert Ridge & Palm Silhouettes -->
  <path d="M 0 480 Q 480 420 960 460 T 1920 440 L 1920 620 L 0 620 Z" fill="#451a03" opacity="0.5"/>
  <path d="M 320 460 Q 330 380 340 330 Q 300 320 280 340 M 340 330 Q 380 320 400 350 M 340 330 Q 350 290 340 270" stroke="#260d02" stroke-width="4" fill="none"/>
  <path d="M 1580 440 Q 1590 360 1600 310 Q 1560 300 1540 320 M 1600 310 Q 1640 300 1660 330" stroke="#260d02" stroke-width="4" fill="none"/>

  <!-- Giant Sandstone Fortress Wall with Archway -->
  <rect x="0" y="440" width="1920" height="240" fill="url(#sandstonePattern)"/>
  <path d="M 0 440 L 1920 440" stroke="#f59e0b" stroke-width="3" opacity="0.4"/>

  <!-- Central Long A Archway & CT Spawn Tunnel -->
  <path d="M 680 680 L 680 460 Q 960 320 1240 460 L 1240 680 Z" fill="#1f0a02" stroke="#d97706" stroke-width="6"/>
  <path d="M 720 680 L 720 480 Q 960 360 1200 480 L 1200 680 Z" fill="#0a0301"/>

  <!-- Authentic Bombsite A Graffiti & Arabic Calligraphy -->
  <g transform="translate(480, 500)">
    <circle cx="60" cy="60" r="50" fill="#dc2626" opacity="0.85"/>
    <text x="60" y="82" font-family="'Rajdhani', sans-serif" font-weight="900" font-size="64" fill="#ffffff" text-anchor="middle">A</text>
    <path d="M 140 30 L 220 30 L 200 60 L 140 60 Z" fill="#f59e0b" opacity="0.7"/>
    <text x="145" y="52" font-family="sans-serif" font-weight="900" font-size="16" fill="#000">الهدف A</text>
  </g>

  <!-- Wooden Crates Platform on Right -->
  <rect x="1360" y="480" width="160" height="200" fill="#78350f" stroke="#451a03" stroke-width="4"/>
  <line x1="1360" y1="480" x2="1520" y2="680" stroke="#451a03" stroke-width="3"/>
  <rect x="1500" y="520" width="140" height="160" fill="#92400e" stroke="#451a03" stroke-width="3"/>

  <!-- Desert Sand & Gravel Ground -->
  <polygon points="0,680 1920,680 1920,1080 0,1080" fill="url(#groundSand)"/>
  <line x1="0" y1="680" x2="1920" y2="680" stroke="#fbbf24" stroke-width="4"/>

  <!-- Ground Target Markers -->
  <ellipse cx="960" cy="850" rx="440" ry="115" fill="none" stroke="#f59e0b" stroke-width="2.5" opacity="0.6" stroke-dasharray="14,7"/>
  <ellipse cx="960" cy="850" rx="280" ry="70" fill="none" stroke="#ef4444" stroke-width="2" opacity="0.5"/>

  <!-- Floating Dust Particles -->
  <circle cx="820" cy="540" r="3" fill="#fef08a" opacity="0.8"/>
  <circle cx="1120" cy="480" r="2.5" fill="#fef08a" opacity="0.7"/>
  <circle cx="940" cy="620" r="3.5" fill="#fef08a" opacity="0.9"/>
  <circle cx="1060" cy="690" r="2" fill="#fde047" opacity="0.6"/>

  <text x="960" y="280" font-family="'Rajdhani', sans-serif" font-weight="900" font-size="90" fill="#fef08a" opacity="0.22" text-anchor="middle" letter-spacing="14">DUST II // BOMBSITE A</text>
</svg>`;

// 3. Mirage (Дворец и террасы / Palace & A Site)
export const MIRAGE_BG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="mirageDusk" cx="50%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="30%" stop-color="#c026d3"/>
      <stop offset="60%" stop-color="#6b21a8"/>
      <stop offset="85%" stop-color="#2e1065"/>
      <stop offset="100%" stop-color="#0c041c"/>
    </radialGradient>
    <linearGradient id="palaceRay" x1="48%" y1="0%" x2="52%" y2="100%">
      <stop offset="0%" stop-color="#fbcfe8" stop-opacity="0.38"/>
      <stop offset="50%" stop-color="#f43f5e" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
    <pattern id="moroccanLattice" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 30 0 Q 45 15 60 30 Q 45 45 30 60 Q 15 45 0 30 Q 15 15 30 0 Z" stroke="#581c87" stroke-width="1.5" fill="none" opacity="0.5"/>
    </pattern>
    <linearGradient id="marbleCourtyard" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#4c1d95"/>
      <stop offset="45%" stop-color="#2e1065"/>
      <stop offset="100%" stop-color="#0f0521"/>
    </linearGradient>
  </defs>

  <!-- Sunset Twilight Purple-Rose Sky -->
  <rect width="1920" height="1080" fill="url(#mirageDusk)"/>
  <rect width="1920" height="520" fill="url(#moroccanLattice)"/>

  <!-- Distant Stars -->
  <circle cx="340" cy="120" r="1.5" fill="#ffffff" opacity="0.8"/>
  <circle cx="680" cy="90" r="2" fill="#ffffff" opacity="0.9"/>
  <circle cx="1280" cy="110" r="1.5" fill="#ffffff" opacity="0.8"/>
  <circle cx="1620" cy="80" r="2.5" fill="#ffffff" opacity="0.95"/>

  <!-- Volumetric Twilight Palace Beam -->
  <polygon points="650,0 1270,0 1480,1080 440,1080" fill="url(#palaceRay)"/>

  <!-- Grand Moroccan Palace Colonnade & Horseshoe Arches -->
  <!-- Left Wing -->
  <path d="M 0 680 L 520 680 L 520 380 Q 360 260 200 380 L 200 680 Z" fill="#2e1065" stroke="#a855f7" stroke-width="3"/>
  <path d="M 230 680 L 230 420 Q 360 320 490 420 L 490 680 Z" fill="#140628"/>
  <polygon points="120,680 150,220 180,680" fill="#3b0764" stroke="#c026d3" stroke-width="2"/>
  <circle cx="150" cy="210" r="8" fill="#facc15"/>

  <!-- Right Wing -->
  <path d="M 1400 680 L 1920 680 L 1920 380 Q 1760 260 1600 380 L 1600 680 Z" fill="#2e1065" stroke="#a855f7" stroke-width="3"/>
  <path d="M 1430 680 L 1430 420 Q 1560 320 1690 420 L 1690 680 Z" fill="#140628"/>
  <polygon points="1740,680 1770,220 1800,680" fill="#3b0764" stroke="#c026d3" stroke-width="2"/>
  <circle cx="1770" cy="210" r="8" fill="#facc15"/>

  <!-- Central Grand Palace Portal (Palace Interior view) -->
  <path d="M 640 680 L 640 420 Q 960 260 1280 420 L 1280 680 Z" fill="#3b0764" stroke="#f43f5e" stroke-width="4"/>
  <path d="M 680 680 L 680 450 Q 960 310 1240 450 L 1240 680 Z" fill="#130424"/>

  <!-- Glowing Golden Palace Windows & Lantern Halos -->
  <circle cx="760" cy="510" r="32" fill="#fbbf24" opacity="0.3"/>
  <circle cx="760" cy="510" r="10" fill="#fef08a"/>
  <circle cx="1160" cy="510" r="32" fill="#fbbf24" opacity="0.3"/>
  <circle cx="1160" cy="510" r="10" fill="#fef08a"/>

  <!-- Bombsite A Graffiti Marker -->
  <g transform="translate(680, 520)">
    <circle cx="50" cy="50" r="40" fill="#f43f5e" opacity="0.8"/>
    <text x="50" y="68" font-family="'Rajdhani', sans-serif" font-weight="900" font-size="52" fill="#ffffff" text-anchor="middle">A</text>
  </g>

  <!-- Marble Courtyard Floor -->
  <polygon points="0,680 1920,680 1920,1080 0,1080" fill="url(#marbleCourtyard)"/>
  <line x1="0" y1="680" x2="1920" y2="680" stroke="#f43f5e" stroke-width="3.5"/>

  <!-- Geometric Floor Mosaic Ring -->
  <ellipse cx="960" cy="850" rx="440" ry="115" fill="none" stroke="#d946ef" stroke-width="2" opacity="0.7" stroke-dasharray="16,8"/>
  <ellipse cx="960" cy="850" rx="340" ry="85" fill="none" stroke="#f43f5e" stroke-width="2" opacity="0.8"/>
  <ellipse cx="960" cy="850" rx="200" ry="50" fill="none" stroke="#fbbf24" stroke-width="1.5" opacity="0.9"/>

  <text x="960" y="240" font-family="'Rajdhani', sans-serif" font-weight="900" font-size="88" fill="#f43f5e" opacity="0.22" text-anchor="middle" letter-spacing="14">MIRAGE // PALACE COURTYARD</text>
</svg>`;

// 4. Nuke (Реакторный зал / Reactor Core & Catwalk)
export const NUKE_BG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="nukeGlow" cx="50%" cy="25%" r="80%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="30%" stop-color="#10b981"/>
      <stop offset="60%" stop-color="#047857"/>
      <stop offset="85%" stop-color="#064e3b"/>
      <stop offset="100%" stop-color="#011b14"/>
    </radialGradient>
    <linearGradient id="toxicRay" x1="48%" y1="0%" x2="52%" y2="100%">
      <stop offset="0%" stop-color="#6ee7b7" stop-opacity="0.45"/>
      <stop offset="45%" stop-color="#10b981" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
    <pattern id="hazardStripes" width="40" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="20" height="20" fill="#facc15"/>
      <rect x="20" width="20" height="20" fill="#090d16"/>
    </pattern>
    <linearGradient id="metalDeck" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#064e3b"/>
      <stop offset="40%" stop-color="#022c22"/>
      <stop offset="100%" stop-color="#01120e"/>
    </linearGradient>
  </defs>

  <!-- Radioactive Emerald Atmosphere -->
  <rect width="1920" height="1080" fill="url(#nukeGlow)"/>

  <!-- Colossal Cooling Tower Silhouette in Background -->
  <path d="M 680 0 Q 780 250 720 550 L 1200 550 Q 1140 250 1240 0 Z" fill="#022019" opacity="0.6"/>
  <!-- Billowing Steam Clouds -->
  <ellipse cx="960" cy="140" rx="320" ry="90" fill="#34d399" opacity="0.15" filter="blur(20px)"/>

  <!-- Volumetric Emerald Reactor Beam -->
  <polygon points="650,0 1270,0 1480,1080 440,1080" fill="url(#toxicRay)"/>

  <!-- Reinforced Concrete Containment Wall -->
  <rect x="0" y="440" width="1920" height="240" fill="#03261d" stroke="#059669" stroke-width="2"/>
  <line x1="0" y1="460" x2="1920" y2="460" stroke="#10b981" stroke-width="2" opacity="0.6"/>

  <!-- Overhead Heavy Industrial Catwalk with Yellow Railings -->
  <rect x="0" y="280" width="1920" height="30" fill="#064e3b" stroke="#047857" stroke-width="2"/>
  <line x1="0" y1="240" x2="1920" y2="240" stroke="#eab308" stroke-width="4"/>
  <!-- Catwalk Vertical Posts -->
  <line x1="200" y1="240" x2="200" y2="310" stroke="#eab308" stroke-width="3"/>
  <line x1="450" y1="240" x2="450" y2="310" stroke="#eab308" stroke-width="3"/>
  <line x1="700" y1="240" x2="700" y2="310" stroke="#eab308" stroke-width="3"/>
  <line x1="1220" y1="240" x2="1220" y2="310" stroke="#eab308" stroke-width="3"/>
  <line x1="1470" y1="240" x2="1470" y2="310" stroke="#eab308" stroke-width="3"/>
  <line x1="1720" y1="240" x2="1720" y2="310" stroke="#eab308" stroke-width="3"/>

  <!-- High-Pressure Steam Pipes with Flanges -->
  <rect x="0" y="340" width="1920" height="16" fill="#0f172a" stroke="#334155" stroke-width="2"/>
  <rect x="0" y="370" width="1920" height="24" fill="#0f172a" stroke="#334155" stroke-width="2"/>
  <circle cx="580" cy="382" r="18" fill="#1e293b" stroke="#eab308" stroke-width="3"/>
  <circle cx="1340" cy="382" r="18" fill="#1e293b" stroke="#eab308" stroke-width="3"/>

  <!-- Radiation Trefoil Warning Sign & Hazard Tape -->
  <g transform="translate(860, 480)">
    <polygon points="100,20 180,160 20,160" fill="#facc15" stroke="#000" stroke-width="4"/>
    <circle cx="100" cy="115" r="16" fill="#000"/>
    <circle cx="100" cy="115" r="8" fill="#facc15"/>
    <path d="M 85 95 L 115 95 M 82 128 L 68 152 M 118 128 L 132 152" stroke="#000" stroke-width="8"/>
  </g>
  <rect x="0" y="656" width="1920" height="24" fill="url(#hazardStripes)"/>

  <!-- Solid Industrial Deck Floor -->
  <polygon points="0,680 1920,680 1920,1080 0,1080" fill="url(#metalDeck)"/>
  <line x1="0" y1="680" x2="1920" y2="680" stroke="#10b981" stroke-width="4"/>

  <!-- Reactor Target Ring Arrays -->
  <ellipse cx="960" cy="850" rx="440" ry="115" fill="none" stroke="#10b981" stroke-width="3" opacity="0.8" stroke-dasharray="16,8"/>
  <ellipse cx="960" cy="850" rx="340" ry="85" fill="none" stroke="#facc15" stroke-width="2" opacity="0.7"/>
  <ellipse cx="960" cy="850" rx="200" ry="50" fill="none" stroke="#34d399" stroke-width="2" opacity="0.9"/>

  <text x="960" y="220" font-family="'Rajdhani', sans-serif" font-weight="900" font-size="88" fill="#34d399" opacity="0.2" text-anchor="middle" letter-spacing="14">NUKE // REACTOR CORE B</text>
</svg>`;

// 5. Inferno (Ночной итальянский городок / Midnight Belltower)
export const INFERNO_BG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="infernoNight" cx="50%" cy="25%" r="80%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="30%" stop-color="#1d4ed8"/>
      <stop offset="60%" stop-color="#1e1b4b"/>
      <stop offset="85%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#030712"/>
    </radialGradient>
    <radialGradient id="moonGlow" cx="75%" cy="15%" r="25%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="35%" stop-color="#93c5fd" stop-opacity="0.5"/>
      <stop offset="80%" stop-color="#1d4ed8" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="lanternRay" x1="48%" y1="0%" x2="52%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.32"/>
      <stop offset="45%" stop-color="#f59e0b" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
    <pattern id="cobblestones" width="60" height="30" patternUnits="userSpaceOnUse">
      <path d="M 0 0 Q 15 8 30 0 Q 45 8 60 0 M 0 15 Q 15 23 30 15 Q 45 23 60 15 M 0 30 Q 15 38 30 30 Q 45 38 60 30" stroke="#1e293b" stroke-width="2" fill="none" opacity="0.6"/>
    </pattern>
    <linearGradient id="piazzaGround" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="45%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
  </defs>

  <!-- Deep Cobalt Mediterranean Midnight Sky -->
  <rect width="1920" height="1080" fill="url(#infernoNight)"/>

  <!-- Silver Crescent Moon & Lunar Aura -->
  <circle cx="1440" cy="160" r="180" fill="url(#moonGlow)"/>
  <circle cx="1440" cy="160" r="32" fill="#f8fafc"/>
  <circle cx="1454" cy="154" r="28" fill="#1d4ed8"/>

  <!-- Volumetric Streetlamp Light Cone in Center -->
  <polygon points="650,0 1270,0 1480,1080 440,1080" fill="url(#lanternRay)"/>

  <!-- Iconic San Rocco Campanile (Church Belltower) in Center -->
  <polygon points="900,480 960,180 1020,480" fill="#090d16" stroke="#1e293b" stroke-width="3"/>
  <rect x="915" y="480" width="90" height="200" fill="#0d1424" stroke="#1e293b" stroke-width="3"/>
  <!-- Illuminated Clock Face showing 00:00 -->
  <circle cx="960" cy="530" r="28" fill="#fef3c7" stroke="#b45309" stroke-width="3"/>
  <line x1="960" y1="530" x2="960" y2="510" stroke="#000" stroke-width="3"/>
  <line x1="960" y1="530" x2="960" y2="530" stroke="#000" stroke-width="3"/>
  <!-- Belfry with Hanging Bronze Bell -->
  <rect x="935" y="400" width="50" height="60" rx="20" fill="#050811"/>
  <path d="M 945 440 Q 960 415 975 440 Z" fill="#d97706"/>

  <!-- Italian Rooftops with Terracotta Tiles & Shuttered Windows -->
  <polygon points="0,520 420,380 420,680 0,680" fill="#111827" stroke="#1f2937" stroke-width="3"/>
  <polygon points="1500,380 1920,520 1920,680 1500,680" fill="#111827" stroke="#1f2937" stroke-width="3"/>
  <!-- Arched Corridor to Banana / B Site -->
  <path d="M 520 680 L 520 480 Q 720 380 920 480 L 920 680 Z" fill="#070a12" stroke="#3b82f6" stroke-width="3"/>

  <!-- Glowing Ornate Gas Streetlamps with Warm Halos -->
  <circle cx="480" cy="480" r="60" fill="#fbbf24" opacity="0.35"/>
  <circle cx="480" cy="480" r="16" fill="#fef08a"/>
  <line x1="480" y1="480" x2="480" y2="680" stroke="#000" stroke-width="6"/>

  <circle cx="1440" cy="480" r="60" fill="#fbbf24" opacity="0.35"/>
  <circle cx="1440" cy="480" r="16" fill="#fef08a"/>
  <line x1="1440" y1="480" x2="1440" y2="680" stroke="#000" stroke-width="6"/>

  <!-- Cobblestone Piazza Floor -->
  <polygon points="0,680 1920,680 1920,1080 0,1080" fill="url(#piazzaGround)"/>
  <polygon points="0,680 1920,680 1920,1080 0,1080" fill="url(#cobblestones)"/>
  <line x1="0" y1="680" x2="1920" y2="680" stroke="#60a5fa" stroke-width="3"/>

  <!-- Target Rings on Cobblestones -->
  <ellipse cx="960" cy="850" rx="440" ry="115" fill="none" stroke="#60a5fa" stroke-width="2.5" opacity="0.7" stroke-dasharray="16,8"/>
  <ellipse cx="960" cy="850" rx="340" ry="85" fill="none" stroke="#fbbf24" stroke-width="2" opacity="0.8"/>
  <ellipse cx="960" cy="850" rx="200" ry="50" fill="none" stroke="#38bdf8" stroke-width="1.5" opacity="0.9"/>

  <text x="960" y="240" font-family="'Rajdhani', sans-serif" font-weight="900" font-size="88" fill="#60a5fa" opacity="0.22" text-anchor="middle" letter-spacing="14">INFERNO // SAN ROCCO SQUARE</text>
</svg>`;

export const CS2_BACKGROUNDS: Record<string, { id: string; name: string; svg: string }> = {
  firing_range: {
    id: 'firing_range',
    name: 'ТИР CS2',
    svg: CS2_BG_SVG,
  },
  dust2: {
    id: 'dust2',
    name: 'DUST II',
    svg: DUST2_BG_SVG,
  },
  mirage: {
    id: 'mirage',
    name: 'MIRAGE',
    svg: MIRAGE_BG_SVG,
  },
  nuke: {
    id: 'nuke',
    name: 'NUKE',
    svg: NUKE_BG_SVG,
  },
  inferno: {
    id: 'inferno',
    name: 'INFERNO',
    svg: INFERNO_BG_SVG,
  },
};

export function getBackgroundSvg(bgId: string): string {
  return CS2_BACKGROUNDS[bgId]?.svg || CS2_BG_SVG;
}

export function svgToDataUri(svgString: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
}

export function applyMapBackground(bgId: string): void {
  const bgSvg = getBackgroundSvg(bgId);
  const dataUri = svgToDataUri(bgSvg);
  const urlVal = `url("${dataUri}")`;

  const appEl = document.getElementById('app');
  if (appEl) {
    appEl.style.backgroundImage = urlVal;
  }
  const centerEl = document.getElementById('center-showcase');
  if (centerEl) {
    centerEl.style.backgroundImage = urlVal;
  }
  if (document.body) {
    document.body.style.backgroundImage = urlVal;
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('bg-change', { detail: { bgId } }));
  }
}
