/**
 * High-definition vector graphics for CS2 Weapon Cases
 */

export const CASE_WEAPON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" width="320" height="220" preserveAspectRatio="xMidYMid meet">
  <defs>
    <linearGradient id="cwGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2d3748"/>
      <stop offset="30%" stop-color="#1a202c"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="cwYellow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="metalRim" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#94a3b8"/>
      <stop offset="50%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <filter id="caseShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <g filter="url(#caseShadow)">
    <!-- Case Base -->
    <path d="M 30 65 L 160 30 L 290 65 L 290 170 L 160 205 L 30 170 Z" fill="url(#cwGrad)" stroke="#475569" stroke-width="2"/>
    <!-- Lid separator -->
    <path d="M 30 95 L 160 120 L 290 95" fill="none" stroke="#f59e0b" stroke-width="3"/>
    <!-- Metal Corners -->
    <polygon points="30,65 55,58 55,85 30,95" fill="url(#metalRim)"/>
    <polygon points="290,65 265,58 265,85 290,95" fill="url(#metalRim)"/>
    <polygon points="160,30 145,34 160,50 175,34" fill="url(#metalRim)"/>
    <polygon points="160,205 145,190 160,175 175,190" fill="url(#metalRim)"/>
    <!-- Latches -->
    <rect x="95" y="105" width="22" height="32" rx="3" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/>
    <rect x="203" y="105" width="22" height="32" rx="3" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/>
    <!-- Hazard Stripes Decal -->
    <path d="M 60 130 L 160 150 L 260 130 L 260 142 L 160 162 L 60 142 Z" fill="url(#cwYellow)" opacity="0.85"/>
    <!-- CS2 Stencil Text -->
    <text x="160" y="85" text-anchor="middle" font-family="'Rajdhani', sans-serif" font-weight="900" font-size="16" fill="#f8fafc" letter-spacing="3">WEAPON CASE #1</text>
    <text x="160" y="180" text-anchor="middle" font-family="'Courier New', monospace" font-weight="800" font-size="11" fill="#f59e0b" letter-spacing="2">SERIES 01 // SECURE</text>
    <!-- Handle -->
    <path d="M 120 40 Q 160 15 200 40" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"/>
  </g>
</svg>`;

export const CASE_CHROMA_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" width="320" height="220" preserveAspectRatio="xMidYMid meet">
  <defs>
    <linearGradient id="chGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b0764"/>
      <stop offset="50%" stop-color="#1e1035"/>
      <stop offset="100%" stop-color="#0a0512"/>
    </linearGradient>
    <linearGradient id="chNeon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8847ff"/>
      <stop offset="50%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#d32ce6"/>
    </linearGradient>
    <filter id="chGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#8847ff" flood-opacity="0.6"/>
    </filter>
  </defs>

  <g filter="url(#chGlow)">
    <path d="M 30 65 L 160 30 L 290 65 L 290 170 L 160 205 L 30 170 Z" fill="url(#chGrad)" stroke="#8847ff" stroke-width="2"/>
    <path d="M 30 95 L 160 120 L 290 95" fill="none" stroke="url(#chNeon)" stroke-width="3"/>
    <!-- Glowing Hexagon Stencil -->
    <polygon points="160,65 178,75 178,95 160,105 142,95 142,75" fill="none" stroke="#38bdf8" stroke-width="2"/>
    <rect x="95" y="105" width="22" height="32" rx="3" fill="#a855f7" stroke="#38bdf8" stroke-width="1.5"/>
    <rect x="203" y="105" width="22" height="32" rx="3" fill="#a855f7" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="160" y="85" text-anchor="middle" font-family="'Rajdhani', sans-serif" font-weight="900" font-size="16" fill="#f8fafc" letter-spacing="3">CHROMA CASE</text>
    <text x="160" y="180" text-anchor="middle" font-family="'Courier New', monospace" font-weight="800" font-size="11" fill="#38bdf8" letter-spacing="2">SPEC-OPS // CHROMA</text>
    <path d="M 120 40 Q 160 15 200 40" fill="none" stroke="#8847ff" stroke-width="6" stroke-linecap="round"/>
  </g>
</svg>`;

export const CASE_REVOLUTION_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" width="320" height="220" preserveAspectRatio="xMidYMid meet">
  <defs>
    <linearGradient id="revGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#450a0a"/>
      <stop offset="50%" stop-color="#180404"/>
      <stop offset="100%" stop-color="#050101"/>
    </linearGradient>
    <linearGradient id="revRed" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="50%" stop-color="#f87171"/>
      <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
    <filter id="revGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#ef4444" flood-opacity="0.6"/>
    </filter>
  </defs>

  <g filter="url(#revGlow)">
    <path d="M 30 65 L 160 30 L 290 65 L 290 170 L 160 205 L 30 170 Z" fill="url(#revGrad)" stroke="#ef4444" stroke-width="2"/>
    <path d="M 30 95 L 160 120 L 290 95" fill="none" stroke="url(#revRed)" stroke-width="3"/>
    <rect x="95" y="105" width="22" height="32" rx="3" fill="#f87171" stroke="#450a0a" stroke-width="1.5"/>
    <rect x="203" y="105" width="22" height="32" rx="3" fill="#f87171" stroke="#450a0a" stroke-width="1.5"/>
    <text x="160" y="85" text-anchor="middle" font-family="'Rajdhani', sans-serif" font-weight="900" font-size="16" fill="#f8fafc" letter-spacing="3">REVOLUTION CASE</text>
    <text x="160" y="180" text-anchor="middle" font-family="'Courier New', monospace" font-weight="800" font-size="11" fill="#ef4444" letter-spacing="2">COVERT ELITE // CS2</text>
    <path d="M 120 40 Q 160 15 200 40" fill="none" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>
  </g>
</svg>`;

export const CASE_DREAMS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" width="320" height="220" preserveAspectRatio="xMidYMid meet">
  <defs>
    <linearGradient id="drmGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#042f2e"/>
      <stop offset="50%" stop-color="#081c1c"/>
      <stop offset="100%" stop-color="#020808"/>
    </linearGradient>
    <linearGradient id="drmTeal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="50%" stop-color="#14b8a6"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <filter id="drmGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#06b6d4" flood-opacity="0.5"/>
    </filter>
  </defs>

  <g filter="url(#drmGlow)">
    <path d="M 30 65 L 160 30 L 290 65 L 290 170 L 160 205 L 30 170 Z" fill="url(#drmGrad)" stroke="#06b6d4" stroke-width="2"/>
    <path d="M 30 95 L 160 120 L 290 95" fill="none" stroke="url(#drmTeal)" stroke-width="3"/>
    <rect x="95" y="105" width="22" height="32" rx="3" fill="#2dd4bf" stroke="#042f2e" stroke-width="1.5"/>
    <rect x="203" y="105" width="22" height="32" rx="3" fill="#2dd4bf" stroke="#042f2e" stroke-width="1.5"/>
    <text x="160" y="85" text-anchor="middle" font-family="'Rajdhani', sans-serif" font-weight="900" font-size="15" fill="#f8fafc" letter-spacing="2">DREAMS &amp; NIGHTMARES</text>
    <text x="160" y="180" text-anchor="middle" font-family="'Courier New', monospace" font-weight="800" font-size="11" fill="#06b6d4" letter-spacing="2">MYTHIC ARSENAL</text>
    <path d="M 120 40 Q 160 15 200 40" fill="none" stroke="#06b6d4" stroke-width="6" stroke-linecap="round"/>
  </g>
</svg>`;

export const CASE_KNIVES_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" width="320" height="220" preserveAspectRatio="xMidYMid meet">
  <defs>
    <linearGradient id="knfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#451a03"/>
      <stop offset="35%" stop-color="#1a0f03"/>
      <stop offset="100%" stop-color="#0a0501"/>
    </linearGradient>
    <linearGradient id="knfGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#ffd700"/>
    </linearGradient>
    <filter id="goldGlow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#ffd700" flood-opacity="0.75"/>
    </filter>
  </defs>

  <g filter="url(#goldGlow)">
    <path d="M 30 65 L 160 30 L 290 65 L 290 170 L 160 205 L 30 170 Z" fill="url(#knfGrad)" stroke="#ffd700" stroke-width="2.5"/>
    <path d="M 30 95 L 160 120 L 290 95" fill="none" stroke="url(#knfGold)" stroke-width="3.5"/>
    <!-- Gold Star Emblem -->
    <path d="M 160 70 L 163 77 L 171 77 L 165 82 L 167 89 L 160 85 L 153 89 L 155 82 L 149 77 L 157 77 Z" fill="#ffd700"/>
    <rect x="95" y="105" width="22" height="32" rx="3" fill="#fde047" stroke="#78350f" stroke-width="1.5"/>
    <rect x="203" y="105" width="22" height="32" rx="3" fill="#fde047" stroke="#78350f" stroke-width="1.5"/>
    <text x="160" y="100" text-anchor="middle" font-family="'Rajdhani', sans-serif" font-weight="900" font-size="15" fill="#ffd700" letter-spacing="3">★ EXTRAORDINARY ★</text>
    <text x="160" y="180" text-anchor="middle" font-family="'Courier New', monospace" font-weight="800" font-size="11" fill="#fde047" letter-spacing="2">KNIVES &amp; GLOVES</text>
    <path d="M 120 40 Q 160 15 200 40" fill="none" stroke="#ffd700" stroke-width="6" stroke-linecap="round"/>
  </g>
</svg>`;

export const CASE_SVG_MAP: Record<string, string> = {
  case_milspec: CASE_WEAPON_SVG,
  case_chroma: CASE_CHROMA_SVG,
  case_revolution: CASE_REVOLUTION_SVG,
  case_dreams: CASE_DREAMS_SVG,
  case_knives: CASE_KNIVES_SVG,
};
