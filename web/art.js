// Illustrations, drawn in SVG in the school colours. No photos of students (image authorisation).
const Y = '#FFDD00', G = '#73D137', W = '#FFFFFF', L = '#2B55A8', D = '#002A80';

// The hero: the first weeks as a trail. Each stop opens a part of the guide (it is a real sequence).
export const STOPS = [
  { x: 70, y: 380, t: 'Orientation Morning', s: '22 January', href: '#/calendar' },
  { x: 250, y: 330, t: 'Find your grade', s: 'Six chapters', href: '#/grades' },
  { x: 120, y: 250, t: 'Learn the words', s: 'MYP, DP, CAS…', href: '#/glossary' },
  { x: 270, y: 170, t: 'Week one', s: 'Small goals', href: '#/checklist' },
  { x: 110, y: 90, t: 'Find your club', s: 'A 5-question quiz', href: '#/quiz' },
  { x: 260, y: 30, t: 'Ask us anything', s: 'Ambassadors', href: '#/ask' },
];
export function trail(done = []) {
  const pts = STOPS.map((p) => [p.x, p.y]);
  let d = `M${pts[0][0]},${pts[0][1] + 40}`;
  for (let i = 0; i < pts.length; i++) {
    const [x, y] = pts[i]; const [px, py] = i ? pts[i - 1] : [x, y + 40];
    d += ` C${px},${(py + y) / 2} ${x},${(py + y) / 2} ${x},${y}`;
  }
  const contours = [0, 1, 2, 3, 4, 5].map((i) => `<ellipse cx="${190 + i * 6}" cy="${215 - i * 4}" rx="${60 + i * 34}" ry="${40 + i * 30}" fill="none" stroke="${L}" stroke-width="1" opacity="${0.55 - i * 0.07}"/>`).join('');
  const stops = STOPS.map((p, i) => {
    const left = p.x > 180;
    const tx = left ? p.x - 26 : p.x + 26;
    return `<a href="${p.href}" class="stop" aria-label="${p.t}">
      <circle cx="${p.x}" cy="${p.y}" r="19" fill="${done.includes(i) ? G : W}" stroke="${D}" stroke-width="3"/>
      <text x="${p.x}" y="${p.y + 5.5}" text-anchor="middle" class="sn">${i + 1}</text>
      <text x="${tx}" y="${p.y - 2}" text-anchor="${left ? 'end' : 'start'}" class="st">${p.t}</text>
      <text x="${tx}" y="${p.y + 16}" text-anchor="${left ? 'end' : 'start'}" class="ss">${p.s}</text></a>`;
  }).join('');
  return `<svg class="trail" viewBox="0 0 360 440" role="img" aria-label="Your first weeks, as a trail with six stops">
    ${contours}
    <path d="${d}" fill="none" stroke="${D}" stroke-width="14" stroke-linecap="round" opacity=".55"/>
    <path d="${d}" fill="none" stroke="${Y}" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="2 9"/>
    <g transform="translate(286,8)"><path d="M0 26 L12 0 L24 26 Z" fill="${G}"/><rect x="11" y="-14" width="2" height="16" fill="${W}"/><path d="M13 -14 L27 -9 L13 -4 Z" fill="${Y}"/></g>
    ${stops}</svg>`;
}

// One drawing per grade chapter (120 × 120).
const wrap = (inner) => `<svg viewBox="0 0 120 120" class="gart" aria-hidden="true">${inner}</svg>`;
const s = `fill="none" stroke="${W}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;
export const GRADE_ART = {
  6: wrap(`<rect x="30" y="34" width="60" height="68" rx="14" ${s}/><path d="M44 34 v-8 a16 16 0 0 1 32 0 v8" ${s}/><rect x="42" y="62" width="36" height="22" rx="5" fill="${Y}"/><path d="M60 62 v8" stroke="${D}" stroke-width="3"/><circle cx="96" cy="26" r="6" fill="${G}"/>`),
  7: wrap(`<path d="M24 40 h22 a8 8 0 1 1 16 0 h22 v22 a8 8 0 1 0 0 16 v22 h-60 z" ${s}/><path d="M84 40 h16 v60 h-16" fill="${Y}" opacity=".95"/><circle cx="30" cy="22" r="6" fill="${G}"/>`),
  8: wrap(`<circle cx="60" cy="60" r="36" ${s}/><path d="M60 30 l10 30 l-10 30 l-10 -30 z" fill="${Y}"/><circle cx="60" cy="60" r="4" fill="${D}"/><path d="M60 18 v6 M60 96 v6 M18 60 h6 M96 60 h6" ${s}/><circle cx="96" cy="24" r="6" fill="${G}"/>`),
  9: wrap(`<rect x="24" y="26" width="72" height="72" rx="10" ${s}/><path d="M24 46 h72 M44 18 v16 M76 18 v16" ${s}/><rect x="34" y="56" width="12" height="10" rx="2" fill="${Y}"/><rect x="54" y="56" width="12" height="10" rx="2" fill="${W}" opacity=".5"/><rect x="74" y="56" width="12" height="10" rx="2" fill="${Y}"/><rect x="34" y="74" width="12" height="10" rx="2" fill="${W}" opacity=".5"/><rect x="54" y="74" width="12" height="10" rx="2" fill="${G}"/>`),
  10: wrap(`<path d="M60 20 a28 28 0 0 1 16 51 v11 h-32 v-11 a28 28 0 0 1 16 -51 z" ${s}/><path d="M48 92 h24 M52 100 h16" ${s}/><path d="M60 40 l-8 16 h16 l-8 16" stroke="${Y}" stroke-width="3.5" fill="none" stroke-linejoin="round"/><circle cx="96" cy="30" r="6" fill="${G}"/>`),
  11: wrap(`<path d="M16 50 l44 -20 l44 20 l-44 20 z" fill="${Y}"/><path d="M34 60 v20 c0 8 52 8 52 0 v-20" ${s}/><path d="M104 50 v22" ${s}/><circle cx="104" cy="76" r="4" fill="${G}"/>`),
};

export const MINI = {
  day: `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" stroke-width="3"/><path d="M24 13 v11 l8 5" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
  words: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 12 h20 a8 8 0 0 1 8 8 v18 h-20 a8 8 0 0 1 -8 -8 z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M17 22 h14 M17 29 h9" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  ib: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 18 l16 -8 l16 8 l-16 8 z M14 22 v10 c0 5 20 5 20 0 v-10" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>`,
  help: `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" stroke-width="3"/><path d="M19 19 a5 5 0 1 1 7 5 c-2 1 -2 2 -2 5" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="24" cy="34" r="2" fill="currentColor"/></svg>`,
  cal: `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="9" y="12" width="30" height="27" rx="5" fill="none" stroke="currentColor" stroke-width="3"/><path d="M9 20 h30 M17 8 v8 M31 8 v8" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  year: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 8 l4.5 9.5 l10.5 1.5 l-7.5 7.5 l1.8 10.5 l-9.3 -5 l-9.3 5 l1.8 -10.5 l-7.5 -7.5 l10.5 -1.5 z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>`,
};
