/* =========================================================
 * art.js —— 所有界面图形均由代码 (SVG) 绘制
 * ========================================================= */
(function () {
  let _n = 0;
  const U = (p = 'a') => `${p}${++_n}`;

  const svg = (vb, body, extra = '') =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="100%" height="100%" ${extra}>${body}</svg>`;

  const lg = (id, stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1) =>
    `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops
      .map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`)
      .join('')}</linearGradient>`;
  const rg = (id, stops, cx = 0.5, cy = 0.5, r = 0.5, fx, fy) =>
    `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}" ${fx != null ? `fx="${fx}" fy="${fy}"` : ''}>${stops
      .map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}" ${a != null ? `stop-opacity="${a}"` : ''}/>`)
      .join('')}</radialGradient>`;

  const star = (cx, cy, n, R, r, rot = -90) => {
    const pts = [];
    for (let i = 0; i < n * 2; i++) {
      const a = ((rot + (i * 180) / n) * Math.PI) / 180;
      const rr = i % 2 ? r : R;
      pts.push(`${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`);
    }
    return pts.join(' ');
  };

  /* ---------------- 基础图标 ---------------- */
  function coin() {
    const a = U('cn');
    return svg('0 0 40 40', `
      <defs>
        ${lg(a + 'o', [[0, '#fff3a6'], [0.45, '#ffc928'], [1, '#d98a00']])}
        ${lg(a + 'i', [[0, '#ffd84a'], [1, '#f2a900']])}
      </defs>
      <ellipse cx="20" cy="21.5" rx="15.5" ry="17" fill="#8a4c00"/>
      <ellipse cx="20" cy="20" rx="15.5" ry="17" fill="url(#${a}o)" stroke="#7a4200" stroke-width="1.2"/>
      <ellipse cx="20.5" cy="20" rx="10.5" ry="12" fill="url(#${a}i)" stroke="#c07a00" stroke-width="2"/>
      <path d="M16 12.5 Q20 10.5 24 12.5" stroke="#fff6c4" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".9"/>
      <ellipse cx="12" cy="13" rx="3" ry="5" fill="#fffbe0" opacity=".75" transform="rotate(25 12 13)"/>
    `);
  }

  function gem() {
    const a = U('gm');
    return svg('0 0 40 40', `
      <defs>${lg(a, [[0, '#9bff7a'], [1, '#16a316']])}</defs>
      <polygon points="20,1.5 36.5,11 36.5,29 20,38.5 3.5,29 3.5,11" fill="#0b5e10"/>
      <polygon points="20,3.5 34.5,12 34.5,28 20,36.5 5.5,28 5.5,12" fill="url(#${a})"/>
      <polygon points="20,3.5 34.5,12 28,15.5 20,11" fill="#c9ffb0"/>
      <polygon points="20,3.5 20,11 12,15.5 5.5,12" fill="#e8ffd9"/>
      <polygon points="5.5,12 12,15.5 12,24.5 5.5,28" fill="#7ef25d"/>
      <polygon points="34.5,12 34.5,28 28,24.5 28,15.5" fill="#2fbf2a"/>
      <polygon points="5.5,28 12,24.5 20,29 20,36.5" fill="#29a826"/>
      <polygon points="34.5,28 20,36.5 20,29 28,24.5" fill="#138a16"/>
      <polygon points="20,11 28,15.5 28,24.5 20,29 12,24.5 12,15.5" fill="#5fe04a"/>
      <polygon points="20,11 28,15.5 20,20 12,15.5" fill="#8cf26f" opacity=".8"/>
      <circle cx="14" cy="9.5" r="1.6" fill="#fff"/>
    `);
  }

  function levelBadge(n) {
    const a = U('lv');
    return svg('0 0 60 60', `
      <defs>${lg(a, [[0, '#6fd6ff'], [0.5, '#2f9bea'], [1, '#155fbf']])}</defs>
      <polygon points="${star(30, 31, 12, 28, 23)}" fill="#0b2f63"/>
      <polygon points="${star(30, 29, 12, 27, 22)}" fill="url(#${a})" stroke="#0b2f63" stroke-width="2"/>
      <polygon points="${star(30, 29, 12, 21, 18)}" fill="none" stroke="#9fe6ff" stroke-width="1.4" opacity=".7"/>
      <text x="30" y="38.5" text-anchor="middle" class="svgnum" font-size="25" fill="#fff" stroke="#0b2f63" stroke-width="4" paint-order="stroke">${n}</text>
    `);
  }

  function trophy() {
    const a = U('tr');
    return svg('0 0 40 44', `
      <defs>
        ${lg(a, [[0, '#fff1a1'], [0.35, '#ffcd2b'], [1, '#c77700']], 0, 0, 1, 0)}
        ${lg(a + 'b', [[0, '#ffd44d'], [1, '#a65b00']])}
      </defs>
      <path d="M8 9 C1 9 1 20 10 22 M32 9 C39 9 39 20 30 22" fill="none" stroke="#7a4300" stroke-width="5" stroke-linecap="round"/>
      <path d="M8 9 C1 9 1 20 10 22 M32 9 C39 9 39 20 30 22" fill="none" stroke="#ffc928" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M7 4 H33 V12 C33 21 27 26 20 26 C13 26 7 21 7 12 Z" fill="url(#${a})" stroke="#7a4300" stroke-width="1.6"/>
      <ellipse cx="20" cy="5" rx="13" ry="2.4" fill="#ffe680" stroke="#7a4300" stroke-width="1.2"/>
      <path d="M11 8 C11 16 13 21 17 23" stroke="#fffbe0" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".85"/>
      <rect x="17" y="25" width="6" height="7" fill="url(#${a}b)" stroke="#7a4300" stroke-width="1.2"/>
      <path d="M10 41 L12 32 H28 L30 41 Z" fill="url(#${a})" stroke="#7a4300" stroke-width="1.6" stroke-linejoin="round"/>
      <rect x="9" y="39" width="22" height="3.5" rx="1" fill="#b56a00" stroke="#7a4300" stroke-width="1.2"/>
    `);
  }

  function crown(color = 'gold', gemc = '#2e8cff') {
    const a = U('cr');
    const pal = {
      gold: [['#fff1a1', '#ffc928', '#c77700'], '#7a4300'],
      blue: [['#bfe9ff', '#46a8ff', '#1c5fc0'], '#0c2f66'],
      red: [['#ffc3b8', '#ff5a4a', '#b51f1f'], '#5c0b0b'],
    }[color];
    return svg('0 0 60 46', `
      <defs>${lg(a, [[0, pal[0][0]], [0.45, pal[0][1]], [1, pal[0][2]]])}</defs>
      <path d="M6 38 L3 12 L17 24 L30 6 L43 24 L57 12 L54 38 Z" fill="url(#${a})" stroke="${pal[1]}" stroke-width="2.4" stroke-linejoin="round"/>
      <rect x="5" y="34" width="50" height="9" rx="2.5" fill="url(#${a})" stroke="${pal[1]}" stroke-width="2.4"/>
      <circle cx="3.5" cy="11" r="3.4" fill="url(#${a})" stroke="${pal[1]}" stroke-width="1.6"/>
      <circle cx="30" cy="5" r="3.6" fill="url(#${a})" stroke="${pal[1]}" stroke-width="1.6"/>
      <circle cx="56.5" cy="11" r="3.4" fill="url(#${a})" stroke="${pal[1]}" stroke-width="1.6"/>
      <path d="M30 18 L36 26 L30 34 L24 26 Z" fill="${gemc}" stroke="${pal[1]}" stroke-width="1.6"/>
      <path d="M30 18 L36 26 L30 26 Z" fill="#fff" opacity=".5"/>
      <path d="M9 30 L8 17" stroke="#fff" stroke-width="2" opacity=".55" stroke-linecap="round"/>
    `);
  }

  function elixir() {
    const a = U('ex');
    return svg('0 0 40 48', `
      <defs>${rg(a, [[0, '#ffb3ff'], [0.55, '#d83ad8'], [1, '#7a0f8f']], 0.4, 0.55, 0.6)}</defs>
      <path d="M20 2 C26 13 36 21 36 31 C36 40.5 29 46 20 46 C11 46 4 40.5 4 31 C4 21 14 13 20 2 Z" fill="url(#${a})" stroke="#4d0560" stroke-width="2.2"/>
      <path d="M12 28 C12 22 15 18 18 14" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".8"/>
      <ellipse cx="13" cy="34" rx="2" ry="3" fill="#fff" opacity=".5"/>
    `);
  }

  function elixirBadge(n) {
    const a = U('eb');
    return svg('0 0 40 46', `
      <defs>${rg(a, [[0, '#ff9cff'], [0.6, '#d12ed6'], [1, '#86108f']], 0.45, 0.6, 0.6)}</defs>
      <path d="M20 1.5 C27 12 37 20 37 30 C37 39.5 29.5 45 20 45 C10.5 45 3 39.5 3 30 C3 20 13 12 20 1.5 Z" fill="url(#${a})" stroke="#fff" stroke-width="2.4"/>
      <path d="M20 1.5 C27 12 37 20 37 30 C37 39.5 29.5 45 20 45 C10.5 45 3 39.5 3 30 C3 20 13 12 20 1.5 Z" fill="none" stroke="#5a0766" stroke-width="1" />
      <text x="20" y="38" text-anchor="middle" class="svgnum" font-size="22" fill="#fff" stroke="#4d0560" stroke-width="4" paint-order="stroke">${n}</text>
    `);
  }

  function upArrow(color = 'blue') {
    const c = color === 'green' ? ['#a8ff6a', '#3fc21a', '#1d6b06'] : ['#9fe3ff', '#2b9cf0', '#0d4a8f'];
    const a = U('ua');
    return svg('0 0 30 34', `
      <defs>${lg(a, [[0, c[0]], [1, c[1]]])}</defs>
      <path d="M15 1.5 L28.5 16 H20.5 V32.5 H9.5 V16 H1.5 Z" fill="url(#${a})" stroke="${c[2]}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M15 5.5 L23 14" stroke="#fff" stroke-width="2" opacity=".6" stroke-linecap="round"/>
    `);
  }

  function clock() {
    return svg('0 0 40 40', `
      <circle cx="20" cy="21" r="17" fill="#3b2a12"/>
      <circle cx="20" cy="19.5" r="17" fill="#f3d9a0" stroke="#3b2a12" stroke-width="2"/>
      <circle cx="20" cy="19.5" r="12.5" fill="#fff8e6" stroke="#b78a3e" stroke-width="1.6"/>
      <path d="M20 10 V19.5 L27 23" stroke="#3b2a12" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="20" cy="19.5" r="2" fill="#c0392b"/>
      <rect x="17" y="0.5" width="6" height="4" rx="1.5" fill="#b78a3e" stroke="#3b2a12" stroke-width="1.4"/>
    `);
  }

  function lock() {
    const a = U('lk');
    return svg('0 0 32 38', `
      <defs>${lg(a, [[0, '#ffe27a'], [1, '#d38a00']])}</defs>
      <path d="M8 17 V11 A8 8 0 0 1 24 11 V17" stroke="#5a3a00" stroke-width="6" fill="none"/>
      <path d="M8 17 V11 A8 8 0 0 1 24 11 V17" stroke="#c9ced8" stroke-width="3" fill="none"/>
      <rect x="3" y="16" width="26" height="20" rx="4" fill="url(#${a})" stroke="#5a3a00" stroke-width="2"/>
      <circle cx="16" cy="24" r="3" fill="#5a3a00"/><rect x="14.6" y="25" width="2.8" height="6" fill="#5a3a00"/>
    `);
  }

  function check() {
    return svg('0 0 50 40', `
      <path d="M4 20 L18 34 L46 6" stroke="#0e4d07" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4 20 L18 34 L46 6" stroke="#4ddc24" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 19 L18 29" stroke="#b6ff8f" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    `);
  }

  function friends() {
    return svg('0 0 50 44', `
      <circle cx="33" cy="12" r="7" fill="#a9dcff" stroke="#124a8a" stroke-width="2"/>
      <path d="M22 37 C22 26 27 21 33 21 C39 21 45 26 45 37 Z" fill="#a9dcff" stroke="#124a8a" stroke-width="2"/>
      <circle cx="20" cy="15" r="8.5" fill="#fff" stroke="#124a8a" stroke-width="2.2"/>
      <path d="M6 42 C6 30 12 25 20 25 C28 25 34 30 34 42 Z" fill="#fff" stroke="#124a8a" stroke-width="2.2"/>
    `);
  }

  function newsGlobe() {
    const a = U('ng');
    return svg('0 0 50 50', `
      <defs>${rg(a, [[0, '#8fe0ff'], [0.7, '#2e8fd8'], [1, '#155a9e']], 0.4, 0.35, 0.7)}</defs>
      <circle cx="25" cy="27" r="20" fill="url(#${a})" stroke="#0d3561" stroke-width="2"/>
      <path d="M10 22 C15 18 18 24 23 21 C26 19 24 14 30 14 C36 14 38 20 42 22 L44 30 C38 30 36 34 31 33 C25 32 22 40 15 38 C10 36 8 30 10 22 Z" fill="#6ccf4b" opacity=".9"/>
      <g transform="translate(9 3) scale(.53)">${crownPath()}</g>
    `);
  }
  function crownPath() {
    return `<path d="M6 38 L3 12 L17 24 L30 6 L43 24 L57 12 L54 38 Z" fill="#ffc928" stroke="#7a4300" stroke-width="3" stroke-linejoin="round"/>
      <rect x="5" y="34" width="50" height="9" rx="2.5" fill="#f0a900" stroke="#7a4300" stroke-width="3"/>
      <path d="M30 18 L36 26 L30 34 L24 26 Z" fill="#2e8cff" stroke="#7a4300" stroke-width="2"/>`;
  }

  function infoIcon() {
    return svg('0 0 30 30', `
      <rect x="1.5" y="1.5" width="27" height="27" rx="6" fill="#1a63c7" stroke="#0a2d63" stroke-width="2"/>
      <rect x="3.5" y="3.5" width="23" height="12" rx="4" fill="#4fb2ff" opacity=".6"/>
      <circle cx="15" cy="8.5" r="2.6" fill="#fff"/>
      <rect x="12.4" y="12.5" width="5.2" height="12" rx="1.6" fill="#fff"/>
    `);
  }

  /* ---------------- 宝箱 ---------------- */
  const CHESTS = {
    silver: { panel: ['#c8d6e6', '#7d93ae'], lid: ['#e3ecf6', '#99adc6'], trim: ['#f6f9fc', '#8297b2'], line: '#2c3d57', lock: ['#f2f6fb', '#8ea2bd'] },
    wooden: { panel: ['#c98a4b', '#7a4a20'], lid: ['#dfa266', '#91592a'], trim: ['#c5ccd6', '#6b7584'], line: '#3a210c', lock: ['#d9dee6', '#7c8696'] },
    gold: { panel: ['#58b4ff', '#1b62c4'], lid: ['#79c6ff', '#2d78d6'], trim: ['#fff0a0', '#d18a00'], line: '#4a2a00', lock: ['#fff3b0', '#e09a00'] },
    magic: { panel: ['#d27bff', '#6d1fb3'], lid: ['#e3a3ff', '#8233c9'], trim: ['#ffe38a', '#c98300'], line: '#33094f', lock: ['#fff1a8', '#d79300'] },
    giant: { panel: ['#f39a3d', '#a8520f'], lid: ['#ffb862', '#c2661a'], trim: ['#e9eef5', '#7d8899'], line: '#4a2207', lock: ['#fff1a8', '#d79300'] },
    lightning: { panel: ['#5fe0ff', '#1677c9'], lid: ['#9cf0ff', '#2b8fdc'], trim: ['#f1f4f8', '#6f7f96'], line: '#0b2f55', lock: ['#fff1a8', '#d79300'] },
    fortune: { panel: ['#eb75ff', '#8c1ec9'], lid: ['#f8a8ff', '#a832e0'], trim: ['#f2b8ff', '#6a129e'], line: '#38065a', lock: ['#d6ffff', '#4ad8ff'] },
    legendary: { panel: ['#ffd2ff', '#9b6cff'], lid: ['#fff', '#b98cff'], trim: ['#ffe9a8', '#d49300'], line: '#3b1d6e', lock: ['#fff', '#d0b5ff'] },
    king: { panel: ['#ffd84d', '#d68a00'], lid: ['#ffeb8a', '#e09d00'], trim: ['#7fd0ff', '#1d64c4'], line: '#4a2a00', lock: ['#ff6a5a', '#b51f1f'] },
  };

  function chest(type = 'silver', opts = {}) {
    const c = CHESTS[type] || CHESTS.silver;
    const a = U('ch');
    const glow = opts.glow
      ? `<ellipse cx="50" cy="52" rx="48" ry="40" fill="url(#${a}gl)"/>`
      : '';
    const cushion = opts.cushion
      ? `<path d="M8 82 Q20 72 50 72 Q80 72 92 82 Q75 91 50 91 Q25 91 8 82 Z" fill="#1a4fa3" stroke="#0c2654" stroke-width="2"/>
         <path d="M10 82 Q50 90 90 82" fill="none" stroke="#ffc928" stroke-width="2" stroke-dasharray="3 2"/>
         <circle cx="8" cy="83" r="3" fill="#ffc928" stroke="#7a4300" stroke-width="1"/>
         <circle cx="92" cy="83" r="3" fill="#ffc928" stroke="#7a4300" stroke-width="1"/>`
      : '';
    const bolt = type === 'lightning'
      ? `<path d="M52 24 L43 40 H50 L46 54 L58 35 H51 L55 24 Z" fill="#fff36b" stroke="${c.line}" stroke-width="1.4" stroke-linejoin="round"/>`
      : '';
    const orb = type === 'fortune'
      ? `<circle cx="50" cy="34" r="13" fill="#aef8ff" stroke="${c.line}" stroke-width="2"/>
         <circle cx="47" cy="31" r="6" fill="#fff" opacity=".85"/>`
      : '';
    const crownMark = type === 'king'
      ? `<g transform="translate(41 21) scale(.3)">${crownPath()}</g>`
      : '';
    return svg('0 0 100 94', `
      <defs>
        ${lg(a + 'p', [[0, c.panel[0]], [1, c.panel[1]]])}
        ${lg(a + 'l', [[0, c.lid[0]], [1, c.lid[1]]])}
        ${lg(a + 't', [[0, c.trim[0]], [1, c.trim[1]]])}
        ${lg(a + 'k', [[0, c.lock[0]], [1, c.lock[1]]])}
        ${rg(a + 'gl', [[0, '#fff', 0.9], [0.4, c.panel[0], 0.5], [1, c.panel[0], 0]])}
      </defs>
      ${glow}
      <ellipse cx="50" cy="86" rx="40" ry="6" fill="#000" opacity=".28"/>
      ${cushion}
      <!-- body -->
      <path d="M12 46 H88 L86 80 Q86 84 82 84 H18 Q14 84 14 80 Z" fill="url(#${a}p)" stroke="${c.line}" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M16 62 H84" stroke="${c.line}" stroke-width="1" opacity=".35"/>
      <path d="M17 72 H83" stroke="${c.line}" stroke-width="1" opacity=".25"/>
      <!-- lid -->
      <path d="M10 47 V32 Q10 12 50 10 Q90 12 90 32 V47 Z" fill="url(#${a}l)" stroke="${c.line}" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M16 30 Q18 16 46 14" stroke="#fff" stroke-width="3" fill="none" opacity=".55" stroke-linecap="round"/>
      <!-- vertical bands -->
      <path d="M20 47 V27 Q21 15 30 12.5 L33 12 Q28 17 28 28 V47 Z" fill="url(#${a}t)" stroke="${c.line}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M80 47 V27 Q79 15 70 12.5 L67 12 Q72 17 72 28 V47 Z" fill="url(#${a}t)" stroke="${c.line}" stroke-width="1.8" stroke-linejoin="round"/>
      <rect x="20.5" y="47" width="8" height="37" fill="url(#${a}t)" stroke="${c.line}" stroke-width="1.8"/>
      <rect x="71.5" y="47" width="8" height="37" fill="url(#${a}t)" stroke="${c.line}" stroke-width="1.8"/>
      <!-- rim band -->
      <rect x="8" y="42" width="84" height="9" rx="3" fill="url(#${a}t)" stroke="${c.line}" stroke-width="2.2"/>
      <rect x="11" y="43.5" width="78" height="2.4" rx="1" fill="#fff" opacity=".5"/>
      <!-- rivets -->
      <circle cx="24.5" cy="58" r="1.6" fill="${c.line}" opacity=".6"/><circle cx="24.5" cy="76" r="1.6" fill="${c.line}" opacity=".6"/>
      <circle cx="75.5" cy="58" r="1.6" fill="${c.line}" opacity=".6"/><circle cx="75.5" cy="76" r="1.6" fill="${c.line}" opacity=".6"/>
      <!-- corner feet -->
      <path d="M12 76 H22 V86 H15 Q12 86 12 83 Z" fill="url(#${a}t)" stroke="${c.line}" stroke-width="1.8"/>
      <path d="M88 76 H78 V86 H85 Q88 86 88 83 Z" fill="url(#${a}t)" stroke="${c.line}" stroke-width="1.8"/>
      ${bolt}${orb}${crownMark}
      <!-- lock -->
      <path d="M39 38 H61 V58 Q61 66 50 70 Q39 66 39 58 Z" fill="url(#${a}k)" stroke="${c.line}" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M42 41 H58 V57 Q58 63 50 66 Q42 63 42 57 Z" fill="none" stroke="#fff" stroke-width="1.2" opacity=".6"/>
      <circle cx="50" cy="51" r="3.6" fill="${c.line}"/>
      <path d="M48.3 52 H51.7 L52.6 60 H47.4 Z" fill="${c.line}"/>
    `);
  }

  /* ---------------- 竞技场模型（皇家竞技场） ---------------- */
  function towerRoof(cx, top, w, cols, id) {
    // conical tiled roof
    const by = top + 66;
    const l = cx - w / 2, r = cx + w / 2;
    let tiles = '';
    for (let i = 1; i < 6; i++) {
      const t = i / 6;
      const y = top + t * 66;
      const hw = (w / 2) * t;
      tiles += `<path d="M${cx - hw} ${y} Q${cx} ${y + 9 * t} ${cx + hw} ${y}" stroke="${cols[3]}" stroke-width="1.3" fill="none" opacity=".7"/>`;
    }
    for (let k = -3; k <= 3; k++) {
      tiles += `<path d="M${cx} ${top + 4} L${cx + k * (w / 7.2)} ${by + 4}" stroke="${cols[3]}" stroke-width="1" opacity=".35"/>`;
    }
    return `
      <path d="M${cx} ${top} L${r + 6} ${by - 2} Q${cx} ${by + 22} ${l - 6} ${by - 2} Z" fill="url(#${id})" stroke="${cols[3]}" stroke-width="2.2" stroke-linejoin="round"/>
      ${tiles}
      <path d="M${cx - 3} ${top + 8} L${l + 6} ${by - 6}" stroke="#fff" stroke-width="3" opacity=".25" stroke-linecap="round"/>
      <path d="M${l - 6} ${by - 2} Q${cx} ${by + 22} ${r + 6} ${by - 2} L${r + 4} ${by + 4} Q${cx} ${by + 28} ${l - 4} ${by + 4} Z" fill="#8a5a33" stroke="#4a2c14" stroke-width="1.6"/>
      <line x1="${cx}" y1="${top}" x2="${cx}" y2="${top - 14}" stroke="#7a4300" stroke-width="2"/>
      <circle cx="${cx}" cy="${top - 15}" r="4" fill="#ffc928" stroke="#7a4300" stroke-width="1.5"/>
    `;
  }

  function bricks(x, y, w, h, rows, color = '#7d8696') {
    let s = '';
    const rh = h / rows;
    for (let i = 1; i < rows; i++) s += `<line x1="${x}" y1="${y + i * rh}" x2="${x + w}" y2="${y + i * rh}" stroke="${color}" stroke-width="1"/>`;
    for (let i = 0; i < rows; i++) {
      const off = i % 2 ? 0 : 9;
      for (let bx = x + off + 9; bx < x + w - 2; bx += 18)
        s += `<line x1="${bx}" y1="${y + i * rh}" x2="${bx}" y2="${y + (i + 1) * rh}" stroke="${color}" stroke-width="1"/>`;
    }
    return s;
  }

  function tower(cx, roofCols, id) {
    // cylinder body
    const x = cx - 40, w = 80;
    return `
      <path d="M${x} 112 H${x + w} V210 Q${cx} 222 ${x} 210 Z" fill="url(#arStoneV)" stroke="#3d4452" stroke-width="2"/>
      <g opacity=".75">${bricks(x + 2, 116, w - 4, 92, 7, '#8a93a4')}</g>
      <path d="M${x} 112 H${x + w} V118 Q${cx} 128 ${x} 118 Z" fill="#6b5236" opacity=".5"/>
      <rect x="${cx - 6}" y="140" width="12" height="18" rx="6" fill="#2c2f3a"/>
      ${towerRoof(cx, 28, 92, roofCols, id)}
    `;
  }

  function arena() {
    const blueR = ['#7fb8ff', '#3c7fd6', '#1f4f9e', '#173a73'];
    const redR = ['#ff9b86', '#e0503d', '#a92a20', '#6e1712'];
    let bunting = '';
    const flags = 9;
    for (let i = 0; i < flags; i++) {
      const t = (i + 0.5) / flags;
      const x = 80 + t * 140;
      const y = 20 + Math.sin(t * Math.PI) * 26;
      const c = i % 2 ? '#e8473a' : '#3d9bf0';
      bunting += `<path d="M${x - 6} ${y - 1} L${x + 6} ${y + 1} L${x + 1} ${y + 13} Z" fill="${c}" stroke="#2a1a10" stroke-width="1"/>`;
    }
    // stone tiles in courtyard
    let tiles = '';
    const tile = (tx, ty) =>
      `<rect x="${tx}" y="${ty}" width="11" height="9" rx="1.5" fill="#e3e1dc" stroke="#9b9a96" stroke-width=".8"/>`;
    for (let i = 0; i < 9; i++) {
      tiles += tile(102 + i * 11.5, 152) + tile(102 + i * 11.5, 199);
    }
    for (let j = 0; j < 4; j++) {
      tiles += tile(102, 161.5 + j * 9.4) + tile(194, 161.5 + j * 9.4);
    }
    // grass tufts
    let tufts = '';
    const tuftAt = [[90, 150], [118, 172], [176, 186], [210, 160], [95, 205], [205, 212], [170, 150], [125, 214], [222, 190]];
    tuftAt.forEach(([tx, ty]) => {
      tufts += `<path d="M${tx} ${ty} q3 -8 5 0 q2 -9 5 0 q3 -7 5 0" fill="#7ed957" stroke="#3f8f25" stroke-width=".8"/>`;
    });
    // gold battlements
    let merl = '';
    for (let i = 0; i < 6; i++) {
      const mx = 58 + i * 23;
      merl += `<path d="M${mx} 226 h15 v-10 h-15 z" fill="url(#arGold)" stroke="#7a4300" stroke-width="1.8" stroke-linejoin="round"/>
               <rect x="${mx + 2}" y="217.5" width="11" height="2.4" fill="#fff6b0" opacity=".7"/>`;
    }
    return svg('0 0 300 300', `
      <defs>
        ${lg('arStoneV', [[0, '#c3c9d4'], [0.5, '#a2aab8'], [1, '#7d8696']], 0, 0, 1, 0)}
        ${lg('arStone', [[0, '#c6ccd6'], [1, '#8c94a3']])}
        ${lg('arGold', [[0, '#fff09a'], [0.5, '#ffc928'], [1, '#d18a00']])}
        ${lg('arRoofB', [[0, blueR[0]], [0.5, blueR[1]], [1, blueR[2]]], 0, 0, 1, 1)}
        ${lg('arRoofR', [[0, redR[0]], [0.5, redR[1]], [1, redR[2]]], 0, 0, 1, 1)}
        ${lg('arBase', [[0, '#3a4766'], [1, '#1b2338']])}
        ${lg('arGrass', [[0, '#8fe065'], [1, '#55b236']])}
        ${lg('arWater', [[0, '#bff0ff'], [1, '#3aa6f0']], 0, 0, 1, 0)}
        ${lg('arWood', [[0, '#e0a56a'], [1, '#9a5e2c']])}
        ${lg('arFlag', [[0, '#6cb6ff'], [1, '#2a6fc9']], 0, 0, 1, 0)}
      </defs>
      <!-- base slab -->
      <ellipse cx="150" cy="282" rx="120" ry="12" fill="#000" opacity=".35"/>
      <path d="M42 222 H258 Q266 222 266 230 V268 Q266 280 254 280 H46 Q34 280 34 268 V230 Q34 222 42 222 Z" fill="url(#arBase)" stroke="#11172a" stroke-width="2"/>
      <path d="M40 232 H260" stroke="#56658a" stroke-width="2" opacity=".6"/>
      <!-- back wall -->
      <rect x="70" y="112" width="160" height="44" fill="url(#arStone)" stroke="#3d4452" stroke-width="2"/>
      <g opacity=".8">${bricks(71, 113, 158, 42, 4, '#858e9e')}</g>
      <path d="M70 108 h12 v6 h12 v-6 h12 v6 h12 v-6 h12 v6 h12 v-6 h12 v6 h12 v-6 h12 v6 h12 v-6 h12 v6 h12 v-6 h12 v6 h4 v4 h-160 z" fill="#b5bcc8" stroke="#3d4452" stroke-width="1.5"/>
      <!-- towers -->
      ${tower(66, blueR, 'arRoofB')}
      ${tower(234, redR, 'arRoofR')}
      <!-- bunting -->
      <path d="M66 14 Q150 72 234 14" stroke="#6b4a2a" stroke-width="1.8" fill="none"/>
      ${bunting}
      <!-- courtyard floor -->
      <path d="M78 146 H222 L230 222 H70 Z" fill="url(#arGrass)" stroke="#3f8f25" stroke-width="1.6"/>
      <path d="M78 146 H222 L223 152 H77 Z" fill="#2f6d1d" opacity=".35"/>
      ${tiles}
      <rect x="113" y="161" width="78" height="38" rx="2" fill="#6fcf4a" opacity=".55"/>
      ${tufts}
      <!-- water channel -->
      <rect x="143" y="146" width="14" height="76" fill="url(#arWater)" stroke="#2a7fc0" stroke-width="1"/>
      <path d="M146 150 V218 M153 156 V214" stroke="#fff" stroke-width="1.4" opacity=".7" stroke-dasharray="6 7"/>
      <rect x="132" y="170" width="36" height="12" rx="2" fill="#d6d3cc" stroke="#8d8a83" stroke-width="1.2"/>
      <!-- gold spout + waterfall -->
      <rect x="143" y="100" width="14" height="50" fill="url(#arWater)"/>
      <path d="M146 104 V146" stroke="#fff" stroke-width="2" opacity=".7"/>
      <rect x="117" y="78" width="12" height="28" rx="2" fill="url(#arWood)" stroke="#4a2c14" stroke-width="1.4"/>
      <rect x="171" y="78" width="12" height="28" rx="2" fill="url(#arWood)" stroke="#4a2c14" stroke-width="1.4"/>
      <ellipse cx="150" cy="88" rx="24" ry="22" fill="url(#arGold)" stroke="#7a4300" stroke-width="2.2"/>
      <ellipse cx="150" cy="90" rx="13" ry="12" fill="#3aa6f0" stroke="#7a4300" stroke-width="2"/>
      <path d="M140 87 Q150 80 160 87" stroke="#bff0ff" stroke-width="2.4" fill="none"/>
      <path d="M131 76 Q140 68 152 67" stroke="#fffbe0" stroke-width="2.6" fill="none" opacity=".8" stroke-linecap="round"/>
      <path d="M138 70 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6" stroke="#b36b00" stroke-width="1.6" fill="none"/>
      <!-- left fence & banner -->
      <g>
        <rect x="74" y="150" width="8" height="70" fill="url(#arWood)" stroke="#4a2c14" stroke-width="1.4"/>
        <rect x="56" y="146" width="7" height="74" fill="url(#arWood)" stroke="#4a2c14" stroke-width="1.4"/>
        <path d="M44 148 L84 140 L84 196 Q72 204 60 196 Q52 206 44 198 Z" fill="url(#arFlag)" stroke="#173a73" stroke-width="1.8" stroke-linejoin="round"/>
        <rect x="52" y="158" width="22" height="20" rx="3" fill="#3f86de" stroke="#173a73" stroke-width="1"/>
        <line x1="40" y1="149" x2="88" y2="139" stroke="#6b4a2a" stroke-width="3"/>
      </g>
      <!-- front wall -->
      <rect x="54" y="226" width="140" height="22" fill="url(#arStone)" stroke="#3d4452" stroke-width="2"/>
      <g opacity=".8">${bricks(55, 227, 138, 20, 2, '#858e9e')}</g>
      <rect x="54" y="220" width="140" height="8" fill="url(#arGold)" stroke="#7a4300" stroke-width="1.8"/>
      ${merl}
      <!-- king box (gold frame) -->
      <rect x="188" y="196" width="74" height="58" fill="url(#arStone)" stroke="#3d4452" stroke-width="2"/>
      <g opacity=".8">${bricks(189, 216, 72, 37, 3, '#858e9e')}</g>
      <path d="M190 172 h14 v-8 h14 v8 h14 v-8 h14 v8 h14 v34 h-70 z" fill="url(#arGold)" stroke="#7a4300" stroke-width="2" stroke-linejoin="round"/>
      <rect x="202" y="178" width="46" height="24" rx="2" fill="url(#arWood)" stroke="#6b3d14" stroke-width="1.6"/>
      <path d="M202 186 H248 M202 194 H248" stroke="#7a4a1e" stroke-width="1.2"/>
      <rect x="188" y="204" width="74" height="10" fill="url(#arGold)" stroke="#7a4300" stroke-width="1.8"/>
      <rect x="192" y="166" width="10" height="2.4" fill="#fff6b0" opacity=".7"/>
      <g transform="translate(212 228) scale(.43)">${crownPath()}</g>
      <!-- plants -->
      <path d="M38 230 q-4 -18 6 -26 q-2 12 4 20 q2 -14 10 -18 q-4 12 -2 24 z" fill="#5dbd3a" stroke="#2e6f1b" stroke-width="1.2"/>
    `);
  }

  /* ---------------- 底部导航图标 ---------------- */
  function navShop() {
    return svg('0 0 70 64', `
      <g transform="translate(4 12) scale(.62)">${chest('silver').replace(/<svg[^>]*>|<\/svg>/g, '')}</g>
      ${[[20, 14, 0], [34, 10, 1], [46, 15, 0], [27, 6, 0], [40, 4, 1], [52, 8, 0]]
        .map(([x, y, g]) => g
          ? `<g transform="translate(${x - 6} ${y}) scale(.36)">${gem().replace(/<svg[^>]*>|<\/svg>/g, '')}</g>`
          : `<g transform="translate(${x - 6} ${y}) scale(.34)">${coin().replace(/<svg[^>]*>|<\/svg>/g, '')}</g>`)
        .join('')}
    `);
  }

  function navCards() {
    const a = U('nc');
    return svg('0 0 64 64', `
      <defs>
        ${lg(a + 'b', [[0, '#8fd8ff'], [0.5, '#3b8fe0'], [1, '#1d4f9e']], 0, 0, 1, 1)}
        ${lg(a + 'p', [[0, '#e48cff'], [1, '#8a2fc2']], 0, 0, 1, 1)}
        ${lg(a + 'o', [[0, '#ff9a5e'], [1, '#c4471a']], 0, 0, 1, 1)}
      </defs>
      <g transform="rotate(16 40 36)"><rect x="28" y="12" width="26" height="38" rx="3.5" fill="url(#${a}p)" stroke="#2a0a3d" stroke-width="2.4"/></g>
      <g transform="rotate(7 34 36)"><rect x="22" y="10" width="26" height="40" rx="3.5" fill="url(#${a}o)" stroke="#3d1405" stroke-width="2.4"/></g>
      <g transform="rotate(-6 28 34)">
        <rect x="12" y="8" width="28" height="44" rx="3.5" fill="#1a2233" stroke="#0a0e18" stroke-width="2.4"/>
        <rect x="15" y="11" width="22" height="38" rx="2" fill="url(#${a}b)"/>
        <path d="M15 30 L37 15 V22 L15 37 Z" fill="#fff" opacity=".3"/>
      </g>
    `);
  }

  function sword(x, y, ang, a, grip) {
    return `<g transform="translate(${x} ${y}) rotate(${ang})">
      <path d="M-4.5 -30 L0 -40 L4.5 -30 V8 H-4.5 Z" fill="url(#${a}bl)" stroke="#2b3240" stroke-width="2" stroke-linejoin="round"/>
      <path d="M0 -38 V6" stroke="#fff" stroke-width="1.4" opacity=".8"/>
      <rect x="-12" y="7" width="24" height="6" rx="3" fill="url(#${a}gd)" stroke="#5a3200" stroke-width="1.8"/>
      <rect x="-3.5" y="13" width="7" height="13" rx="1.5" fill="${grip}" stroke="#2a0d0d" stroke-width="1.6"/>
      <path d="M-3.5 17 H3.5 M-3.5 21 H3.5" stroke="#000" stroke-width="1" opacity=".35"/>
      <circle cx="0" cy="29" r="4.5" fill="url(#${a}gd)" stroke="#5a3200" stroke-width="1.8"/>
    </g>`;
  }

  function navBattle() {
    const a = U('nb');
    return svg('0 0 64 64', `
      <defs>
        ${lg(a + 'bl', [[0, '#ffffff'], [0.5, '#c9d3e2'], [1, '#7f8ca3']], 0, 0, 1, 0)}
        ${lg(a + 'gd', [[0, '#fff09a'], [1, '#d18a00']])}
      </defs>
      ${sword(32, 34, 40, a, '#d6402f')}
      ${sword(32, 34, -40, a, '#2f78d6')}
    `);
  }

  function navClan() {
    const a = U('nl');
    return svg('0 0 64 64', `
      <defs>
        ${lg(a + 'm', [[0, '#e7edf5'], [1, '#7c8799']], 0, 0, 1, 1)}
        ${lg(a + 'b', [[0, '#5ab0ff'], [1, '#1c4fa8']])}
        ${lg(a + 'r', [[0, '#ff7563'], [1, '#a81e1e']])}
        ${lg(a + 'bl', [[0, '#ffffff'], [1, '#aeb9ca']], 0, 0, 1, 0)}
        ${lg(a + 'gd', [[0, '#fff09a'], [1, '#d18a00']])}
      </defs>
      <path d="M32 3 L56 12 V30 Q56 50 32 61 Q8 50 8 30 V12 Z" fill="url(#${a}m)" stroke="#2c3442" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M32 9 V55 Q14 46 14 30 V16 Z" fill="url(#${a}b)"/>
      <path d="M32 9 V55 Q50 46 50 30 V16 Z" fill="url(#${a}r)"/>
      <g transform="scale(.62) translate(19.6 22)">
        ${sword(32, 34, 40, a, '#5b2b0f')}
        ${sword(32, 34, -40, a, '#5b2b0f')}
      </g>
      <path d="M14 18 L30 11" stroke="#fff" stroke-width="2" opacity=".5" stroke-linecap="round"/>
    `);
  }

  function navEvents() {
    const a = U('ne');
    let leaves = '';
    for (let i = 0; i < 7; i++) {
      const t = i / 6;
      const ang = 200 + t * 120;
      const r = 23;
      const x = 32 + r * Math.cos((ang * Math.PI) / 180);
      const y = 34 - r * Math.sin((ang * Math.PI) / 180) * -1;
      leaves += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="4" ry="7.5" transform="rotate(${(ang - 180 + 20).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="url(#${a}g)" stroke="#1d4d12" stroke-width="1.4"/>`;
      const x2 = 64 - x;
      leaves += `<ellipse cx="${x2.toFixed(1)}" cy="${y.toFixed(1)}" rx="4" ry="7.5" transform="rotate(${(-(ang - 180 + 20)).toFixed(0)} ${x2.toFixed(1)} ${y.toFixed(1)})" fill="url(#${a}g)" stroke="#1d4d12" stroke-width="1.4"/>`;
    }
    return svg('0 0 64 64', `
      <defs>
        ${lg(a + 'g', [[0, '#9be86a'], [1, '#3e9a26']])}
        ${lg(a + 'bl', [[0, '#ffffff'], [0.5, '#c9d3e2'], [1, '#7f8ca3']], 0, 0, 1, 0)}
        ${lg(a + 'gd', [[0, '#fff09a'], [1, '#d18a00']])}
      </defs>
      ${leaves}
      ${sword(32, 32, 0, a, '#7a3b17').replace('translate(32 32)', 'translate(32 30) scale(.95)')}
      <path d="M22 56 Q32 62 42 56" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>
    `);
  }

  /* ---------------- 部落徽章 ---------------- */
  function clanBadge(inner = '#d83a2e', innerDark = '#8e1a14', emblem = 'rook') {
    const a = U('cb');
    const emb = emblem === 'bolt'
      ? `<path d="M33 21 L23 36 H30 L27 49 L38 33 H31 Z" fill="#fff" stroke="#3a0a5a" stroke-width="1.2" stroke-linejoin="round"/>`
      : `<path d="M22 26 H25 V23 H28.5 V26 H31.5 V23 H35 V26 H38 V32 H35 V44 H38 V48 H22 V44 H25 V32 H22 Z" fill="#fff" stroke="#5a1a0a" stroke-width="1"/>`;
    return svg('0 0 60 70', `
      <defs>
        ${lg(a + 'g', [[0, '#ffe58a'], [0.5, '#e9a62a'], [1, '#9a5a0c']], 0, 0, 1, 1)}
        ${lg(a + 'r', [[0, inner], [1, innerDark]])}
      </defs>
      <path d="M8 10 H16 V4 H24 V10 H36 V4 H44 V10 H52 V40 Q52 58 30 67 Q8 58 8 40 Z" fill="url(#${a}g)" stroke="#4a2800" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M14 16 H46 V40 Q46 53 30 60 Q14 53 14 40 Z" fill="url(#${a}r)" stroke="#5a1a0a" stroke-width="1.6"/>
      ${emb}
      <path d="M12 12 H22" stroke="#fff8d0" stroke-width="2" opacity=".7"/>
    `);
  }

  function anchorBadge() {
    const a = U('an');
    return svg('0 0 80 92', `
      <defs>
        ${lg(a + 'w', [[0, '#d99a5c'], [1, '#8a5326']])}
        ${lg(a + 'm', [[0, '#eef3f8'], [1, '#8b97a8']])}
      </defs>
      <path d="M8 6 H72 V56 Q72 76 40 88 Q8 76 8 56 Z" fill="url(#${a}m)" stroke="#2c3442" stroke-width="2.4"/>
      <path d="M15 12 H65 V55 Q65 71 40 81 Q15 71 15 55 Z" fill="url(#${a}w)" stroke="#4a2c14" stroke-width="1.6"/>
      <path d="M27 12 V76 M40 12 V81 M53 12 V76" stroke="#5e3416" stroke-width="1.4" opacity=".6"/>
      <g fill="none" stroke-linecap="round">
        <path d="M40 22 V66 M30 30 H50 M22 52 Q24 68 40 68 Q56 68 58 52" stroke="#2c3442" stroke-width="9"/>
        <path d="M40 22 V66 M30 30 H50 M22 52 Q24 68 40 68 Q56 68 58 52" stroke="url(#${a}m)" stroke-width="5"/>
      </g>
      <circle cx="40" cy="20" r="5" fill="none" stroke="#2c3442" stroke-width="6"/>
      <circle cx="40" cy="20" r="5" fill="none" stroke="#dfe6ee" stroke-width="3"/>
    `);
  }

  /* ---------------- 国王塔（活动用） ---------------- */
  function kingTower(color = 'blue') {
    const a = U('kt');
    const c = color === 'blue' ? ['#5ab0ff', '#1c4fa8', '#0c2f66'] : ['#ff7563', '#a81e1e', '#5c0b0b'];
    return svg('0 0 80 90', `
      <defs>
        ${lg(a + 's', [[0, '#d2d7e0'], [1, '#848d9c']], 0, 0, 1, 0)}
        ${lg(a + 'c', [[0, c[0]], [1, c[1]]])}
        ${rg(a + 'f', [[0, '#ffd9b8'], [1, '#e89a6a']], 0.4, 0.4, 0.6)}
      </defs>
      <ellipse cx="40" cy="84" rx="32" ry="5" fill="#000" opacity=".3"/>
      <path d="M10 50 H70 V80 Q40 88 10 80 Z" fill="url(#${a}s)" stroke="#2c3442" stroke-width="2"/>
      <path d="M8 44 h10 v-6 h10 v6 h8 v-6 h8 v6 h8 v-6 h10 v6 h10 v8 H8 Z" fill="url(#${a}s)" stroke="#2c3442" stroke-width="2"/>
      <path d="M14 58 H66 M12 68 H68" stroke="#6f7888" stroke-width="1.2"/>
      <!-- king -->
      <path d="M22 40 Q22 26 40 26 Q58 26 58 40 Z" fill="url(#${a}c)" stroke="${c[2]}" stroke-width="2"/>
      <circle cx="40" cy="22" r="11" fill="url(#${a}f)" stroke="#6b3a1e" stroke-width="1.8"/>
      <path d="M30 26 Q40 40 50 26 Q46 33 40 33 Q34 33 30 26 Z" fill="#fff" stroke="#8d97a6" stroke-width="1.2"/>
      <circle cx="36" cy="20" r="1.6" fill="#222"/><circle cx="44" cy="20" r="1.6" fill="#222"/>
      <g transform="translate(28 1) scale(.4)">${crownPath()}</g>
      <rect x="32" y="56" width="16" height="20" rx="2" fill="url(#${a}c)" stroke="${c[2]}" stroke-width="1.6"/>
      <path d="M32 76 L40 70 L48 76" fill="url(#${a}c)" stroke="${c[2]}" stroke-width="1.4"/>
    `);
  }

  /* ---------------- 宝箱/金币堆 商店用 ---------------- */
  function goldPile(size = 1) {
    let s = '';
    const pts = size === 1
      ? [[30, 38], [44, 40], [37, 30]]
      : size === 2
        ? [[22, 42], [36, 44], [50, 42], [29, 33], [43, 33], [36, 24]]
        : [[16, 44], [30, 46], [44, 46], [58, 44], [23, 36], [37, 37], [51, 36], [30, 27], [44, 27], [37, 18]];
    pts.forEach(([x, y]) => (s += `<g transform="translate(${x - 9} ${y - 9}) scale(.5)">${coin().replace(/<svg[^>]*>|<\/svg>/g, '')}</g>`));
    return svg('0 0 74 60', `<ellipse cx="37" cy="54" rx="28" ry="4" fill="#000" opacity=".25"/>${s}`);
  }

  function gemPile(size = 1) {
    let s = '';
    const pts = size === 1
      ? [[30, 38], [44, 40], [37, 30]]
      : [[18, 44], [32, 46], [46, 46], [58, 42], [25, 36], [39, 36], [52, 34], [32, 26], [45, 25], [38, 16]];
    pts.forEach(([x, y]) => (s += `<g transform="translate(${x - 9} ${y - 9}) scale(.5)">${gem().replace(/<svg[^>]*>|<\/svg>/g, '')}</g>`));
    return svg('0 0 74 60', `<ellipse cx="37" cy="54" rx="28" ry="4" fill="#000" opacity=".25"/>${s}`);
  }

  /* ---------------- 横幅场景 ---------------- */
  function passScene() {
    const a = U('ps');
    return svg('0 0 340 90', `
      <defs>
        ${lg(a + 'sky', [[0, '#3a3c8f'], [0.5, '#5b4fb8'], [1, '#2b6fc4']], 0, 0, 1, 0)}
        ${rg(a + 'glow', [[0, '#ffd36b', 0.9], [1, '#ffd36b', 0]])}
      </defs>
      <rect width="340" height="90" fill="url(#${a}sky)"/>
      <circle cx="230" cy="40" r="70" fill="url(#${a}glow)" opacity=".5"/>
      <g opacity=".35" fill="#1b1e5a">
        <rect x="150" y="30" width="18" height="60"/><polygon points="146,32 159,8 172,32"/>
        <rect x="290" y="24" width="20" height="66"/><polygon points="286,26 300,0 314,26"/>
        <rect x="120" y="50" width="200" height="40"/>
      </g>
      <g transform="translate(176 26) scale(.6)">${chest('magic').replace(/<svg[^>]*>|<\/svg>/g, '')}</g>
      <g transform="translate(232 20) scale(.72)">${chest('gold').replace(/<svg[^>]*>|<\/svg>/g, '')}</g>
      <g transform="translate(290 36) scale(.5)">${chest('giant').replace(/<svg[^>]*>|<\/svg>/g, '')}</g>
      ${[[200, 18], [270, 14], [320, 22], [160, 20]].map(([x, y]) => `<polygon points="${star(x, y, 4, 4, 1.2)}" fill="#fff" opacity=".8"/>`).join('')}
    `, 'preserveAspectRatio="xMidYMid slice"');
  }

  function shopPassScene() {
    const a = U('sp');
    return svg('0 0 340 170', `
      <defs>
        ${rg(a + 'bg', [[0, '#5cc4ff'], [0.6, '#1f7ad8'], [1, '#14509e']], 0.62, 0.45, 0.7)}
        ${rg(a + 'glow', [[0, '#fff', 0.9], [1, '#9be4ff', 0]])}
      </defs>
      <rect width="340" height="170" fill="url(#${a}bg)"/>
      <g opacity=".14" fill="#fff">
        ${[[40, 60], [120, 20], [260, 30], [300, 110], [80, 130], [190, 140]].map(([x, y]) => `<path transform="translate(${x} ${y}) rotate(-15)" d="M0 0 h10 v-8 h10 v8 h10 v-8 h10 v8 h10 v40 h-50 z"/>`).join('')}
      </g>
      <circle cx="230" cy="88" r="80" fill="url(#${a}glow)" opacity=".55"/>
      <g transform="translate(176 70) scale(.62)">${chest('gold').replace(/<svg[^>]*>|<\/svg>/g, '')}</g>
      <g transform="translate(232 50) scale(.95)">${chest('legendary', { glow: true }).replace(/<svg[^>]*>|<\/svg>/g, '')}</g>
      <g transform="translate(212 84) scale(.55)">${chest('magic').replace(/<svg[^>]*>|<\/svg>/g, '')}</g>
      <g transform="translate(286 92) scale(.5)">${chest('lightning').replace(/<svg[^>]*>|<\/svg>/g, '')}</g>
      <g transform="translate(288 56) scale(.62)">${goldPile(3).replace(/<svg[^>]*>|<\/svg>/g, '')}</g>
      ${[[200, 40], [320, 40], [180, 130], [250, 30]].map(([x, y]) => `<polygon points="${star(x, y, 4, 6, 1.6)}" fill="#fff"/>`).join('')}
    `, 'preserveAspectRatio="xMidYMid slice"');
  }

  function eventScene() {
    const a = U('ev');
    return svg('0 0 360 140', `
      <defs>
        ${lg(a + 's', [[0, '#7ad0ff'], [1, '#d7f1ff']])}
        ${lg(a + 'g', [[0, '#7ccf4f'], [1, '#3f8f25']])}
      </defs>
      <rect width="360" height="140" fill="url(#${a}s)"/>
      <circle cx="300" cy="30" r="18" fill="#fff6c4" opacity=".9"/>
      <g fill="#fff" opacity=".85"><ellipse cx="70" cy="30" rx="30" ry="9"/><ellipse cx="90" cy="24" rx="20" ry="9"/><ellipse cx="230" cy="44" rx="26" ry="7"/></g>
      <path d="M0 90 Q60 70 120 86 T240 80 T360 84 V140 H0 Z" fill="#5fb43b"/>
      <path d="M0 110 Q90 92 180 108 T360 104 V140 H0 Z" fill="url(#${a}g)"/>
      <g transform="translate(20 40) scale(.9)">
        <rect x="0" y="20" width="40" height="60" fill="#b9c0cc" stroke="#3d4452" stroke-width="2"/>
        <polygon points="-6,22 20,-14 46,22" fill="#3c7fd6" stroke="#173a73" stroke-width="2"/>
      </g>
      <g transform="translate(300 46) scale(.8)">
        <rect x="0" y="20" width="40" height="60" fill="#b9c0cc" stroke="#3d4452" stroke-width="2"/>
        <polygon points="-6,22 20,-14 46,22" fill="#e0503d" stroke="#6e1712" stroke-width="2"/>
      </g>
    `, 'preserveAspectRatio="xMidYMid slice"');
  }

  /* ---------------- 哥布林竞技场 (Arena 1) ---------------- */
  function goblinArena() {
    const a = U('ga');
    let logs = '';
    const logPts = [
      [54, 108, 22], [72, 98, 24], [190, 96, 24], [208, 108, 22],
      [48, 132, 26], [48, 160, 26], [48, 188, 26],
      [64, 198, 24], [82, 200, 22], [110, 202, 22],
      [172, 202, 22], [192, 200, 22], [212, 198, 24],
    ];
    logPts.forEach(([x, y, h]) => {
      logs += `<rect x="${x}" y="${y}" width="15" height="${h}" rx="3" fill="url(#${a}lg)" stroke="#3e220c" stroke-width="1.6"/>
               <ellipse cx="${x + 7.5}" cy="${y + 2}" rx="6.5" ry="2.2" fill="#e2b47e" stroke="#5a3414" stroke-width="1"/>`;
    });
    return svg('0 0 300 300', `
      <defs>
        ${lg(a + 'bs', [[0, '#3a4766'], [1, '#1b2338']])}
        ${lg(a + 'wt', [[0, '#62e0c8'], [1, '#269e90']])}
        ${lg(a + 'gr', [[0, '#8ce058'], [1, '#4ca628']])}
        ${lg(a + 'lg', [[0, '#b97a45'], [1, '#75461f']])}
        ${lg(a + 'wh', [[0, '#d59352'], [1, '#844e22']])}
        ${lg(a + 'rd', [[0, '#ff6e5e'], [1, '#b82820']])}
        ${lg(a + 'bl', [[0, '#5ea8ff'], [1, '#205ab0']])}
      </defs>
      <ellipse cx="150" cy="278" rx="118" ry="12" fill="#000" opacity=".35"/>
      <!-- dark slate base -->
      <path d="M40 120 L260 120 L270 256 Q270 274 250 274 H50 Q30 274 30 256 Z" fill="url(#${a}bs)" stroke="#11172a" stroke-width="2.4"/>
      <!-- outer moat water -->
      <path d="M48 124 H252 L258 238 H42 Z" fill="url(#${a}wt)" stroke="#1a5e58" stroke-width="1.8"/>
      <!-- grassy island -->
      <path d="M62 116 H238 L242 220 H58 Z" fill="url(#${a}gr)" stroke="#347a1a" stroke-width="2"/>
      <!-- dirt path loop -->
      <rect x="86" y="142" width="128" height="54" rx="8" fill="none" stroke="#d8ae72" stroke-width="14"/>
      <rect x="86" y="142" width="128" height="54" rx="8" fill="none" stroke="#a67c46" stroke-width="14" stroke-dasharray="2 12"/>
      <!-- river down middle -->
      <rect x="139" y="114" width="22" height="124" fill="url(#${a}wt)" stroke="#1e7a70" stroke-width="1.4"/>
      <path d="M146 122 V232 M154 128 V228" stroke="#bffaf0" stroke-width="1.6" stroke-dasharray="6 8" opacity=".8"/>
      <!-- two wooden bridges -->
      <rect x="130" y="136" width="40" height="14" rx="2" fill="url(#${a}wh)" stroke="#4a280d" stroke-width="1.6"/>
      <rect x="130" y="186" width="40" height="14" rx="2" fill="url(#${a}wh)" stroke="#4a280d" stroke-width="1.6"/>
      <!-- wooden waterwheel at top -->
      <g transform="translate(150 86)">
        <ellipse cx="0" cy="0" rx="28" ry="32" fill="url(#${a}wh)" stroke="#3e220c" stroke-width="2.4"/>
        <ellipse cx="0" cy="0" rx="18" ry="22" fill="#4e2c12" stroke="#3e220c" stroke-width="1.8"/>
        <line x1="-26" y1="0" x2="26" y2="0" stroke="#e2a86b" stroke-width="3"/>
        <line x1="0" y1="-30" x2="0" y2="30" stroke="#e2a86b" stroke-width="3"/>
        <line x1="-20" y1="-22" x2="20" y2="22" stroke="#e2a86b" stroke-width="2.5"/>
        <line x1="-20" y1="22" x2="20" y2="-22" stroke="#e2a86b" stroke-width="2.5"/>
        <circle cx="0" cy="0" r="6" fill="#9aabc0" stroke="#2c3442" stroke-width="1.8"/>
      </g>
      <!-- log palisades -->
      ${logs}
      <!-- right side red & blue cloth canopy -->
      <path d="M214 96 L258 92 L254 148 L210 144 Z" fill="url(#${a}rd)" stroke="#5a120d" stroke-width="2" stroke-linejoin="round"/>
      <path d="M214 144 L256 146 L252 176 L212 170 Z" fill="url(#${a}bl)" stroke="#122e66" stroke-width="2" stroke-linejoin="round"/>
      <!-- fern leaves -->
      <path d="M36 164 Q20 148 26 134 Q34 144 42 156 Q28 134 38 122 Q44 136 48 152 Z" fill="#68cf38" stroke="#286812" stroke-width="1.4"/>
      <path d="M242 222 Q258 206 266 218 Q254 226 244 230 Q262 224 268 234 Q252 238 240 236 Z" fill="#68cf38" stroke="#286812" stroke-width="1.4"/>
    `);
  }

  /* ---------------- 金币袋 / 赛季代币 / 夺金金库 ---------------- */
  function goldPouch() {
    const a = U('gp');
    return svg('0 0 80 76', `
      <defs>
        ${lg(a + 'b', [[0, '#ffdfa2'], [0.55, '#d6984a'], [1, '#8c561b']])}
      </defs>
      <ellipse cx="40" cy="66" rx="28" ry="6" fill="#000" opacity=".28"/>
      <!-- coin stack behind -->
      <g transform="translate(48 38)">
        ${[16, 12, 8, 4, 0].map(y => `<ellipse cx="10" cy="${y}" rx="8" ry="3.2" fill="#ffc928" stroke="#7a4300" stroke-width="1.2"/>`).join('')}
      </g>
      <!-- bag body -->
      <path d="M28 28 Q14 38 16 56 Q18 66 38 66 Q56 66 58 54 Q58 38 46 28 Z" fill="url(#${a}b)" stroke="#4a2808" stroke-width="2"/>
      <!-- coins inside mouth -->
      <circle cx="33" cy="22" r="5" fill="#ffd84a" stroke="#7a4300" stroke-width="1.2"/>
      <circle cx="41" cy="21" r="5.5" fill="#ffc928" stroke="#7a4300" stroke-width="1.2"/>
      <circle cx="37" cy="25" r="5" fill="#ffe680" stroke="#7a4300" stroke-width="1.2"/>
      <!-- bag ruffle & rope -->
      <path d="M24 18 Q37 24 50 18 L46 28 H28 Z" fill="url(#${a}b)" stroke="#4a2808" stroke-width="1.8" stroke-linejoin="round"/>
      <rect x="26" y="26" width="22" height="4.5" rx="2" fill="#d8e4f0" stroke="#46586e" stroke-width="1.2"/>
      <path d="M37 28 L34 38 M39 28 L42 37" stroke="#d8e4f0" stroke-width="2.5" stroke-linecap="round"/>
      <!-- scattered coins -->
      <ellipse cx="15" cy="62" rx="6.5" ry="3" fill="#ffc928" stroke="#7a4300" stroke-width="1.2"/>
      <ellipse cx="22" cy="60" rx="6" ry="4" transform="rotate(-25 22 60)" fill="#ffd84a" stroke="#7a4300" stroke-width="1.2"/>
      <ellipse cx="58" cy="64" rx="6.5" ry="3" fill="#ffc928" stroke="#7a4300" stroke-width="1.2"/>
    `);
  }

  function seasonToken() {
    const a = U('st');
    return svg('0 0 44 44', `
      <defs>
        ${lg(a + 'o', [[0, '#e3e8f2'], [1, '#7f8ca0']])}
        ${lg(a + 'i', [[0, '#df7aff'], [1, '#7e1ec2']])}
      </defs>
      <polygon points="14,3 30,3 41,14 41,30 30,41 14,41 3,30 3,14" fill="url(#${a}o)" stroke="#222a38" stroke-width="2.2"/>
      <polygon points="16,7 28,7 37,16 37,28 28,37 16,37 7,28 7,16" fill="url(#${a}i)" stroke="#3d0866" stroke-width="1.6"/>
      <path d="M13 28 L11 16 L18 21 L22 13 L26 21 L33 16 L31 28 Z" fill="#fff" stroke="#3d0866" stroke-width="1.4" stroke-linejoin="round"/>
    `);
  }

  function heistSafe() {
    const a = U('hs');
    return svg('0 0 48 48', `
      <defs>
        ${lg(a + 'g', [[0, '#ffe878'], [0.5, '#f2ac18'], [1, '#a86400']])}
      </defs>
      <rect x="6" y="8" width="36" height="32" rx="5" fill="url(#${a}g)" stroke="#4a2800" stroke-width="2.2"/>
      <rect x="11" y="13" width="26" height="22" rx="3" fill="#d88c0c" stroke="#5a3200" stroke-width="1.6"/>
      <g transform="translate(15 17) scale(.3)">${crownPath()}</g>
      <circle cx="34" cy="24" r="3.5" fill="#e2e8f0" stroke="#2c3442" stroke-width="1.4"/>
    `);
  }

  function partyBalloons() {
    return svg('0 0 36 54', `
      <path d="M12 24 Q14 38 18 52 M24 28 Q22 40 18 52" stroke="#ddd" stroke-width="1.4" fill="none"/>
      <ellipse cx="12" cy="14" rx="9" ry="11" fill="#3cd070" stroke="#145a2c" stroke-width="1.6"/>
      <ellipse cx="9" cy="10" rx="2.5" ry="4" fill="#a8ffbe" opacity=".7"/>
      <ellipse cx="24" cy="18" rx="8.5" ry="10.5" fill="#46b8ff" stroke="#124a80" stroke-width="1.6"/>
      <ellipse cx="21" cy="14" rx="2.2" ry="3.5" fill="#b8ebff" opacity=".7"/>
    `);
  }

  window.Art = {
    U, svg, star, coin, gem, levelBadge, trophy, crown, elixir, elixirBadge, upArrow, clock, lock, check,
    friends, newsGlobe, infoIcon, chest, arena, goblinArena, navShop, navCards, navBattle, navClan, navEvents,
    clanBadge, anchorBadge, kingTower, goldPile, gemPile, goldPouch, seasonToken, heistSafe, partyBalloons,
    passScene, shopPassScene, eventScene, crownPath,
  };
})();
