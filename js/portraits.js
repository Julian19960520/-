/* Hand-crafted SVG card portraits (Clash Royale style). No external deps.
   Each function returns an SVG string (viewBox 0 0 100 120). All ids prefixed with uid. */
(function () {
  var OL = '#2a1a12';
  function st(w, c) { return ' stroke="' + (c || OL) + '" stroke-width="' + (w || 1.3) + '" stroke-linejoin="round" stroke-linecap="round"'; }
  function stops(a) {
    return a.map(function (s) { return '<stop offset="' + s[0] + '" stop-color="' + s[1] + '"' + (s[2] != null ? ' stop-opacity="' + s[2] + '"' : '') + '/>'; }).join('');
  }
  function lg(id, x1, y1, x2, y2, a) {
    return '<linearGradient id="' + id + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '">' + stops(a) + '</linearGradient>';
  }
  function rg(id, cx, cy, r, a, fx, fy) {
    return '<radialGradient id="' + id + '" cx="' + cx + '" cy="' + cy + '" r="' + r + '"' + (fx != null ? ' fx="' + fx + '" fy="' + fy + '"' : '') + '>' + stops(a) + '</radialGradient>';
  }
  function wrap(u, defs, body) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">' +
      '<defs>' + defs +
      rg(u + '-vig', 0.5, 0.45, 0.75, [[0.6, '#000', 0], [1, '#000', 0.35]]) +
      '</defs>' + body +
      '<rect width="100" height="120" fill="url(#' + u + '-vig)"/></svg>';
  }
  // background: sky gradient + soft glow + ground haze
  function bg(u, c1, c2, glow) {
    return {
      d: lg(u + '-bg', 0, 0, 0, 1, [[0, c1], [1, c2]]) + rg(u + '-glow', 0.5, 0.35, 0.55, [[0, glow || '#fff', 0.55], [1, glow || '#fff', 0]]),
      b: '<rect width="100" height="120" fill="url(#' + u + '-bg)"/><rect width="100" height="120" fill="url(#' + u + '-glow)"/>'
    };
  }
  function mir(s) { return s + '<g transform="translate(100 0) scale(-1 1)">' + s + '</g>'; }
  function skin(id, l, m, d) { return rg(id, 0.42, 0.38, 0.7, [[0, l || '#ffe0bd'], [0.65, m || '#f5b98c'], [1, d || '#d98b5c']]); }
  function eye(x, y, rx, ry, iris, px, py, lid) {
    px = px || 0; py = py || 0;
    var s = '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="#fff"' + st(1.1) + '/>' +
      '<ellipse cx="' + (x + px) + '" cy="' + (y + py) + '" rx="' + (rx * 0.55) + '" ry="' + (ry * 0.6) + '" fill="' + (iris || '#3a6fb0') + '"/>' +
      '<ellipse cx="' + (x + px) + '" cy="' + (y + py) + '" rx="' + (rx * 0.3) + '" ry="' + (ry * 0.34) + '" fill="#111"/>' +
      '<circle cx="' + (x + px - rx * 0.2) + '" cy="' + (y + py - ry * 0.25) + '" r="' + (rx * 0.18) + '" fill="#fff"/>';
    if (lid) s += '<path d="M' + (x - rx - 0.5) + ' ' + y + ' Q' + x + ' ' + (y - ry * 1.5) + ' ' + (x + rx + 0.5) + ' ' + y + ' Q' + x + ' ' + (y - ry * 0.5) + ' ' + (x - rx - 0.5) + ' ' + y + 'Z" fill="' + lid + '"' + st(1) + '/>';
    return s;
  }
  function shine(x, y, rx, ry, o) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="#fff" opacity="' + (o || 0.35) + '"/>'; }

  var P = {};

  /* ---------------- KNIGHT ---------------- */
  P.knight = function (u) {
    var B = bg(u, '#a9bccf', '#566c86');
    var d = B.d + skin(u + '-sk') +
      '<pattern id="' + u + '-cm" width="4" height="3.4" patternUnits="userSpaceOnUse"><rect width="4" height="3.4" fill="#9aa3ad"/><path d="M0 0 Q2 3 4 0 M-2 1.7 Q0 4.7 2 1.7 M2 1.7 Q4 4.7 6 1.7" fill="none" stroke="#4e5660" stroke-width="0.8"/></pattern>' +
      rg(u + '-hs', 0.4, 0.3, 0.75, [[0, '#fff', 0.35], [0.6, '#000', 0], [1, '#000', 0.55]]) +
      lg(u + '-mt', 0, 0, 0, 1, [[0, '#dfe5ec'], [0.5, '#9aa6b4'], [1, '#5c6878']]) +
      lg(u + '-bl', 0, 0, 0, 1, [[0, '#ffe58a'], [0.6, '#f2b83a'], [1, '#c9861c']]);
    var hood = 'M14 112 Q8 70 18 42 Q30 12 50 12 Q70 12 82 42 Q92 70 86 112 Z';
    var b = B.b + '<g transform="translate(-6 -6) scale(1.12)">' +
      '<path d="M-2 122 L-2 104 Q8 90 30 88 L70 88 Q92 90 102 104 L102 122Z" fill="url(#' + u + '-mt)"' + st() + '/>' +
      '<path d="M30 88 L50 120 L70 88" fill="none" stroke="#4a5462" stroke-width="1.2"/>' +
      shine(20, 98, 8, 3, 0.4) + shine(80, 98, 8, 3, 0.4) +
      '<path d="' + hood + '" fill="url(#' + u + '-cm)"' + st(1.5) + '/>' +
      '<path d="' + hood + '" fill="url(#' + u + '-hs)"/>' +
      '<path d="M29 50 Q29 33 50 32 Q71 33 71 50 L72 72 Q71 95 50 97 Q29 95 28 72Z" fill="url(#' + u + '-sk)"/>' +
      '<path d="M29 50 Q29 33 50 32 Q71 33 71 50 L72 72 Q71 95 50 97 Q29 95 28 72Z" fill="none" stroke="#5d6670" stroke-width="2.6"/>' +
      '<path d="M29 50 Q29 33 50 32 Q71 33 71 50 L72 72 Q71 95 50 97 Q29 95 28 72Z" fill="none"' + st(1) + '/>' +
      // ears hint / cheeks
      '<ellipse cx="36" cy="70" rx="5" ry="3" fill="#ef8f74" opacity="0.5"/><ellipse cx="64" cy="70" rx="5" ry="3" fill="#ef8f74" opacity="0.5"/>' +
      // mouth
      '<path d="M37 78 Q50 96 63 78 Q50 82 37 78Z" fill="#7a1f1a"' + st(1.1) + '/>' +
      '<path d="M38.5 79 Q50 82.5 61.5 79 L60 83 Q50 85.5 40 83Z" fill="#fff"/>' +
      '<path d="M43 87 Q50 92 57 87 Q50 89 43 87Z" fill="#e0605a"/>' +
      // eyes & brows
      eye(40, 56, 4.3, 4.8, '#3d6ea8', 0.6, 0.5) + eye(60, 56, 4.3, 4.8, '#3d6ea8', -0.6, 0.5) +
      mir('<path d="M31 50 Q38 43 47 48 L46.5 52 Q39 48 32 53.5Z" fill="url(#' + u + '-bl)"' + st(1.1) + '/>') +
      // nose
      '<path d="M46 60 Q43 70 46 73 Q50 75.5 54 73 Q57 70 54 60 Q50 58 46 60Z" fill="#eaa57a"' + st(1) + '/>' +
      shine(48.5, 65, 1.4, 3, 0.5) +
      // handlebar moustache
      mir('<path d="M50 73 C45 70 39 70 35 73.5 C31 77 25 77 22.5 72 C21 68 23 64.5 26.5 64 C25 67.5 27 70 30.5 69.5 C36 67 44 66 50 69.5 Z" fill="url(#' + u + '-bl)"' + st(1.1) + '/>' +
        '<path d="M48 70.5 C42 68.5 36 70 32 72" fill="none" stroke="#fff6c8" stroke-width="1" opacity="0.7"/>') +
      // chin dimple
      '<path d="M47 93 Q50 95 53 93" fill="none" stroke="#c07a52" stroke-width="1"/></g>';
    return wrap(u, d, b);
  };

  /* ---------------- ARCHER ---------------- */
  P.archer = function (u) {
    var B = bg(u, '#b9d3e6', '#6d8fae');
    var d = B.d + skin(u + '-sk') +
      lg(u + '-hr', 0, 0, 0, 1, [[0, '#ff8fcf'], [0.55, '#ef4ea6'], [1, '#b02a78']]) +
      lg(u + '-tu', 0, 0, 0, 1, [[0, '#4f8fd6'], [1, '#22508e']]) +
      lg(u + '-bw', 0, 0, 1, 0, [[0, '#ffd75a'], [0.5, '#e09a1c'], [1, '#9a5a10']]);
    var b = B.b +
      // ponytail behind
      '<path d="M66 30 Q92 26 94 54 Q96 80 84 96 Q88 70 78 52Z" fill="url(#' + u + '-hr)"' + st() + '/>' +
      '<path d="M82 40 Q90 58 86 82" fill="none" stroke="#b02a78" stroke-width="1"/>' +
      // body / tunic
      '<path d="M8 122 Q10 96 30 90 L70 90 Q88 96 90 122Z" fill="url(#' + u + '-tu)"' + st() + '/>' +
      '<path d="M38 90 L50 104 L62 90" fill="#f5b98c"' + st(1.1) + '/>' +
      '<path d="M18 104 L80 120" stroke="#7a4a22" stroke-width="4"/>' +
      // hair back
      '<path d="M22 64 Q16 30 46 22 Q76 18 80 50 Q82 70 76 86 L24 86 Q20 76 22 64Z" fill="url(#' + u + '-hr)"' + st() + '/>' +
      // face
      '<path d="M28 52 Q28 34 50 34 Q72 34 72 52 Q72 80 50 90 Q28 80 28 52Z" fill="url(#' + u + '-sk)"' + st() + '/>' +
      // bangs
      '<path d="M26 56 Q22 30 50 26 Q78 28 74 56 Q70 44 62 40 Q60 48 52 46 Q50 40 46 38 Q42 48 34 44 Q30 48 26 56Z" fill="url(#' + u + '-hr)"' + st() + '/>' +
      '<path d="M40 30 Q52 26 62 32" fill="none" stroke="#ffc3e6" stroke-width="2" opacity="0.8"/>' +
      // hair tie
      '<ellipse cx="68" cy="29" rx="4" ry="3" fill="#ffd34a"' + st(1) + '/>' +
      eye(40, 60, 4.8, 5.6, '#4a2e86', 0.5, 0.6) + eye(60, 60, 4.8, 5.6, '#4a2e86', -0.5, 0.6) +
      mir('<path d="M34 52.5 Q40 49 46 52" fill="none" stroke="#a02066" stroke-width="2"/><path d="M35 58 L33.5 56.5 M36.5 56.5 L35.5 54.5" stroke="' + OL + '" stroke-width="1"/>') +
      '<ellipse cx="35" cy="70" rx="4" ry="2.3" fill="#ff8e8e" opacity="0.55"/><ellipse cx="65" cy="70" rx="4" ry="2.3" fill="#ff8e8e" opacity="0.55"/>' +
      '<path d="M48 66 Q50 69 52 66" fill="none" stroke="#c97a52" stroke-width="1.2"/>' +
      '<path d="M43 75 Q50 81 57 74 Q50 76 43 75Z" fill="#9c2a2a"' + st(1) + '/>' +
      '<path d="M44.5 75.4 Q50 76.6 55.5 75 L55 76.4 Q50 77.6 45 76.5Z" fill="#fff"/>' +
      // bow
      '<path d="M86 4 Q60 50 88 116" fill="none" stroke="' + OL + '" stroke-width="5.5" stroke-linecap="round"/>' +
      '<path d="M86 4 Q60 50 88 116" fill="none" stroke="url(#' + u + '-bw)" stroke-width="3.5" stroke-linecap="round"/>' +
      '<path d="M86 4 L88 116" stroke="#f4ecd8" stroke-width="0.7"/>' +
      '<rect x="69" y="52" width="6" height="12" rx="2" fill="#7a3e18"' + st(1) + '/>' +
      // hand on bow
      '<ellipse cx="73" cy="60" rx="6" ry="5" fill="#f5b98c"' + st(1.1) + '/>';
    return wrap(u, d, b);
  };

  /* ---------------- GIANT ---------------- */
  P.giant = function (u) {
    var B = bg(u, '#b8c9d9', '#6e839a');
    var d = B.d + skin(u + '-sk', '#ffdcb6', '#f0ae7e', '#c97a4c') +
      lg(u + '-hr', 0, 0, 0, 1, [[0, '#ffab4a'], [0.6, '#ec7a1e'], [1, '#b04f10']]) +
      lg(u + '-tu', 0, 0, 0, 1, [[0, '#a8744a'], [1, '#5e3a1e']]);
    var b = B.b +
      '<path d="M-2 122 Q0 92 24 88 L76 88 Q100 92 102 122Z" fill="url(#' + u + '-tu)"' + st() + '/>' +
      '<path d="M10 104 Q30 96 40 120 M90 104 Q70 96 60 120" fill="none" stroke="#3e2410" stroke-width="1.2"/>' +
      // hair back
      '<path d="M16 70 Q8 30 34 18 Q50 12 66 18 Q92 30 84 70 Q80 50 74 40 L26 40 Q20 50 16 70Z" fill="url(#' + u + '-hr)"' + st() + '/>' +
      // ears
      mir('<ellipse cx="20" cy="62" rx="5" ry="8" fill="#eba274"' + st(1.1) + '/>') +
      // face (wide)
      '<path d="M22 50 Q22 26 50 26 Q78 26 78 50 L78 70 Q76 84 50 86 Q24 84 22 70Z" fill="url(#' + u + '-sk)"' + st() + '/>' +
      // hairline top
      '<path d="M22 46 Q22 18 50 18 Q78 18 78 46 Q72 34 62 32 Q56 36 50 33 Q44 36 38 32 Q28 34 22 46Z" fill="url(#' + u + '-hr)"' + st() + '/>' +
      '<path d="M36 24 Q50 19 64 24" fill="none" stroke="#ffd09a" stroke-width="2" opacity="0.7"/>' +
      // beard
      '<path d="M20 60 Q20 88 34 100 Q50 112 66 100 Q80 88 80 60 Q76 72 68 74 Q60 70 50 72 Q40 70 32 74 Q24 72 20 60Z" fill="url(#' + u + '-hr)"' + st() + '/>' +
      '<path d="M30 84 Q34 94 40 98 M70 84 Q66 94 60 98 M50 92 L50 104" fill="none" stroke="#a84a10" stroke-width="1"/>' +
      // mouth smirk
      '<path d="M40 79 Q50 84 60 78 Q52 82 40 79Z" fill="#6a1a14"' + st(1) + '/>' +
      // moustache
      mir('<path d="M50 72 Q42 68 34 72 Q30 76 33 80 Q38 76 50 77Z" fill="#d86818"' + st(1) + '/>') +
      // eyes small, squinting, heavy brow
      eye(38, 54, 4, 3.6, '#3f78b4', 0.6, 0.4, '#e9a676') + eye(62, 54, 4, 3.6, '#3f78b4', -0.6, 0.4, '#e9a676') +
      mir('<path d="M29 48 Q38 42 47 47 L46 50.5 Q38 47 30 51Z" fill="#d86818"' + st(1.1) + '/>') +
      // nose
      '<path d="M45 56 Q42 66 45 70 Q50 73 55 70 Q58 66 55 56Z" fill="#e8a072"' + st(1) + '/>' + shine(48, 62, 1.6, 3, 0.5);
    return wrap(u, d, b);
  };

  /* ---------------- GOBLIN ---------------- */
  function goblinHead(u, cfg) {
    cfg = cfg || {};
    return mir('<path d="M30 56 Q14 50 2 40 Q8 58 26 70Z" fill="url(#' + u + '-gs)"' + st() + '/><path d="M26 58 Q14 52 8 47 Q14 58 25 64Z" fill="#6aa82a" opacity="0.6"/>') +
      '<path d="M26 56 Q26 30 50 30 Q74 30 74 56 Q74 82 50 90 Q26 82 26 56Z" fill="url(#' + u + '-gs)"' + st() + '/>' +
      shine(42, 38, 9, 4, 0.3) +
      eye(40, 56, 5, 5.2, '#d93b2e', 0.8, 0.4) + eye(60, 56, 5, 5.2, '#d93b2e', -0.8, 0.4) +
      mir('<path d="M32 48 Q40 45 47 51 L46 53.5 Q39 49 32 51Z" fill="#3e6a14"' + st(1) + '/>') +
      // long pointy nose
      '<path d="M46 58 Q44 70 50 76 Q56 70 54 58 Q50 56 46 58Z" fill="#8fcf3a"' + st(1.1) + '/>' + shine(48.5, 63, 1.2, 3, 0.5) +
      // grin w/ teeth
      '<path d="M34 72 Q50 92 66 72 Q50 80 34 72Z" fill="#5a1a14"' + st(1.1) + '/>' +
      '<path d="M37 74 L40 79 L43 76 L46 80 L50 77 L54 80 L57 76 L60 79 L63 74 Q50 79 37 74Z" fill="#fff8d8"/>' +
      '<path d="M44 85 Q50 88 56 85 Q50 86 44 85Z" fill="#e0605a"/>';
  }
  function goblinDefs(u) {
    return rg(u + '-gs', 0.42, 0.35, 0.7, [[0, '#c8f06a'], [0.6, '#86c234'], [1, '#4f8a1a']]);
  }
  P.goblin = function (u) {
    var B = bg(u, '#bcd7c4', '#5f8a78');
    var d = B.d + goblinDefs(u) + lg(u + '-cl', 0, 0, 0, 1, [[0, '#a87848'], [1, '#5a3a1e']]);
    var b = B.b +
      '<path d="M6 122 Q8 98 30 92 L70 92 Q92 98 94 122Z" fill="url(#' + u + '-cl)"' + st() + '/>' +
      '<path d="M34 92 Q50 104 66 92" fill="none" stroke="#3e2410" stroke-width="1.3"/>' +
      '<path d="M40 86 L50 98 L60 86Z" fill="#86c234"' + st(1) + '/>' +
      goblinHead(u) +
      '<path d="M40 31 Q44 24 46 31 M52 30 Q55 22 58 31" fill="none" stroke="#4f8a1a" stroke-width="1.3"/>';
    return wrap(u, d, b);
  };

  /* ---------------- SPEAR GOBLINS ---------------- */
  P.speargoblins = function (u) {
    var B = bg(u, '#b5d0e6', '#5e7f9c');
    var d = B.d + goblinDefs(u) +
      lg(u + '-bd', 0, 0, 0, 1, [[0, '#5a9ee8'], [1, '#2a5ea8']]) +
      lg(u + '-hd', 0, 0, 0, 1, [[0, '#f4f070'], [1, '#b8c030']]) +
      lg(u + '-sp', 0, 0, 1, 0, [[0, '#e8eef4'], [1, '#8794a4']]);
    var b = B.b +
      // spear behind
      '<path d="M14 120 L22 18" stroke="' + OL + '" stroke-width="4.5"/><path d="M14 120 L22 18" stroke="#9a6430" stroke-width="2.6"/>' +
      '<path d="M22 4 L27 20 L22 24 L17 19Z" fill="url(#' + u + '-sp)"' + st(1.1) + '/>' +
      '<path d="M6 122 Q8 98 30 92 L70 92 Q92 98 94 122Z" fill="#7a5a34"' + st() + '/>' +
      '<path d="M30 92 L70 92 L66 104 L34 104Z" fill="#5a3e20" opacity="0.6"/>' +
      goblinHead(u) +
      // cap & headband
      '<path d="M26 46 Q26 22 50 22 Q74 22 74 46 Z" fill="url(#' + u + '-hd)"' + st() + '/>' +
      '<path d="M24 44 Q50 36 76 44 L76 51 Q50 43 24 51Z" fill="url(#' + u + '-bd)"' + st(1.2) + '/>' +
      '<path d="M76 46 Q86 50 88 60 L84 58 Q82 52 76 50Z" fill="#2a5ea8"' + st(1) + '/>' +
      shine(42, 28, 8, 3, 0.45) +
      // hand gripping spear
      '<ellipse cx="18" cy="76" rx="6" ry="5" fill="#86c234"' + st(1.1) + '/>';
    return wrap(u, d, b);
  };

  /* ---------------- MINI PEKKA ---------------- */
  P.minipekka = function (u) {
    var B = bg(u, '#8fa6c4', '#3e5272', '#cfe0ff');
    var d = B.d +
      lg(u + '-ar', 0, 0, 0, 1, [[0, '#6f8fbd'], [0.45, '#34507c'], [1, '#1a2742']]) +
      rg(u + '-ah', 0.38, 0.3, 0.7, [[0, '#9fbbe0'], [0.5, '#3d5c8c'], [1, '#18243e']]) +
      lg(u + '-hn', 0, 0, 1, 0, [[0, '#cfd8e4'], [1, '#6b7788']]) +
      rg(u + '-gl', 0.5, 0.5, 0.5, [[0, '#ffffff'], [0.35, '#9ff6ff'], [1, '#2ad0ff', 0]]) +
      lg(u + '-vs', 0, 0, 0, 1, [[0, '#0a1020'], [1, '#1c2a44']]);
    var b = B.b +
      // shoulders / pauldrons
      '<path d="M-2 122 Q0 96 22 90 L78 90 Q100 96 102 122Z" fill="url(#' + u + '-ar)"' + st(1.5) + '/>' +
      mir('<path d="M2 104 Q6 86 26 84 Q36 90 32 104 Q18 110 2 104Z" fill="url(#' + u + '-ah)"' + st(1.4) + '/>' +
        '<circle cx="18" cy="96" r="1.6" fill="#c9d6e8"' + st(0.7) + '/>') +
      // horns
      mir('<path d="M28 40 Q12 34 8 14 Q20 24 32 28Z" fill="url(#' + u + '-hn)"' + st(1.3) + '/>') +
      // helmet
      '<path d="M22 60 Q20 24 50 22 Q80 24 78 60 Q78 86 50 94 Q22 86 22 60Z" fill="url(#' + u + '-ah)"' + st(1.6) + '/>' +
      '<path d="M50 22 L50 46" stroke="#1a2742" stroke-width="2"/><path d="M50.8 23 L50.8 45" stroke="#8faad0" stroke-width="0.8"/>' +
      shine(38, 34, 8, 4, 0.35) +
      // visor slit
      '<path d="M28 56 Q50 48 72 56 L70 66 Q50 60 30 66Z" fill="url(#' + u + '-vs)"' + st(1.3) + '/>' +
      // glowing eyes
      '<ellipse cx="40" cy="59" rx="9" ry="6" fill="url(#' + u + '-gl)"/><ellipse cx="60" cy="59" rx="9" ry="6" fill="url(#' + u + '-gl)"/>' +
      '<path d="M35 59.5 L45 57.5 L44 60.5 L36 61.5Z" fill="#e8ffff"/><path d="M65 59.5 L55 57.5 L56 60.5 L64 61.5Z" fill="#e8ffff"/>' +
      // jaw plates & rivets
      '<path d="M32 72 Q50 78 68 72 L64 86 Q50 92 36 86Z" fill="#2a3e62"' + st(1.2) + '/>' +
      '<path d="M42 76 L42 88 M50 77 L50 90 M58 76 L58 88" stroke="#16223a" stroke-width="1.2"/>' +
      mir('<circle cx="27" cy="62" r="1.8" fill="#c9d6e8"' + st(0.7) + '/><circle cx="29" cy="74" r="1.6" fill="#c9d6e8"' + st(0.7) + '/>');
    return wrap(u, d, b);
  };

  /* ---------------- MINIONS ---------------- */
  P.minions = function (u) {
    var B = bg(u, '#6f8fbf', '#26385e', '#bcd4ff');
    var d = B.d +
      rg(u + '-ms', 0.42, 0.35, 0.7, [[0, '#a9d2ff'], [0.55, '#4f86d6'], [1, '#22488e']]) +
      lg(u + '-wg', 0, 0, 0, 1, [[0, '#5a88cc'], [1, '#1e3a72']]);
    function minion(sc, tx, ty, op) {
      return '<g transform="translate(' + tx + ' ' + ty + ') scale(' + sc + ')" opacity="' + (op || 1) + '">' +
        mir('<path d="M30 48 Q10 30 0 34 Q6 40 2 46 Q10 46 8 54 Q16 52 18 60 Q24 56 30 62Z" fill="url(#' + u + '-wg)"' + st(1.3) + '/>' +
          '<path d="M28 50 Q14 40 4 38 M28 54 Q16 48 9 50 M28 58 Q20 54 17 57" fill="none" stroke="#1a2e5a" stroke-width="0.9"/>' +
          '<path d="M34 34 Q26 26 22 14 Q34 20 40 30Z" fill="#cfe2ff"' + st(1.1) + '/>' +
          '<path d="M30 54 Q22 52 18 58 Q26 60 32 60Z" fill="url(#' + u + '-ms)"' + st(1.1) + '/>') +
        '<path d="M30 52 Q28 30 50 28 Q72 30 70 52 Q70 76 50 82 Q30 76 30 52Z" fill="url(#' + u + '-ms)"' + st(1.4) + '/>' +
        shine(43, 36, 7, 3, 0.35) +
        // angry brows ridge
        mir('<path d="M34 46 Q42 46 49 52 L47 54 Q41 50 35 50Z" fill="#2a4f96"' + st(1) + '/>') +
        '<ellipse cx="41" cy="53" rx="4.2" ry="3.4" fill="#fff"' + st(1) + '/><ellipse cx="59" cy="53" rx="4.2" ry="3.4" fill="#fff"' + st(1) + '/>' +
        '<circle cx="42" cy="53.5" r="1.9" fill="#111"/><circle cx="58" cy="53.5" r="1.9" fill="#111"/>' +
        // nose/snout
        '<path d="M46 58 Q50 56 54 58 Q53 63 50 63 Q47 63 46 58Z" fill="#3a6cc0"' + st(0.9) + '/>' +
        // mouth with fangs
        '<path d="M38 66 Q50 76 62 66 Q50 70 38 66Z" fill="#14234a"' + st(1.1) + '/>' +
        '<path d="M41 67.4 L43 72 L45 68.6Z M59 67.4 L57 72 L55 68.6Z M48 69.4 L50 72.5 L52 69.4Z" fill="#fff"/>' +
        '</g>';
    }
    var b = B.b +
      minion(0.5, -6, 6, 0.85) + minion(0.5, 56, 10, 0.85) +
      minion(1.05, -2.5, 14);
    return wrap(u, d, b);
  };

  /* ---------------- MUSKETEER ---------------- */
  P.musketeer = function (u) {
    var B = bg(u, '#c3cfe0', '#6c7f9e');
    var d = B.d + skin(u + '-sk') +
      lg(u + '-hr', 0, 0, 0, 1, [[0, '#b07ae6'], [0.6, '#7a3cbc'], [1, '#4a1e80']]) +
      lg(u + '-hm', 0, 0, 0, 1, [[0, '#f4f7fb'], [0.5, '#b4bfcc'], [1, '#6e7a8a']]) +
      lg(u + '-gn', 0, 0, 1, 0, [[0, '#5a6270'], [0.5, '#c8d0dc'], [1, '#4a525e']]) +
      lg(u + '-co', 0, 0, 0, 1, [[0, '#4a7ad0'], [1, '#203f80']]);
    var b = B.b +
      // musket diagonal behind
      '<path d="M10 120 L92 10" stroke="' + OL + '" stroke-width="6.5" stroke-linecap="round"/>' +
      '<path d="M10 120 L92 10" stroke="url(#' + u + '-gn)" stroke-width="4.2" stroke-linecap="round"/>' +
      '<path d="M4 122 L26 96" stroke="#8a5424" stroke-width="9"/>' +
      // body
      '<path d="M8 122 Q10 96 30 90 L70 90 Q90 96 92 122Z" fill="url(#' + u + '-co)"' + st() + '/>' +
      '<path d="M36 90 Q50 108 64 90 L60 88 Q50 98 40 88Z" fill="#f4ecdc"' + st(1) + '/>' +
      // hair long purple
      '<path d="M20 50 Q14 80 22 96 Q30 98 34 88 L66 88 Q70 98 78 96 Q86 80 80 50Z" fill="url(#' + u + '-hr)"' + st() + '/>' +
      // face
      '<path d="M29 54 Q29 38 50 38 Q71 38 71 54 Q71 80 50 89 Q29 80 29 54Z" fill="url(#' + u + '-sk)"' + st() + '/>' +
      '<path d="M28 58 Q28 42 40 40 Q38 50 30 60Z M72 58 Q72 42 60 40 Q62 50 70 60Z" fill="url(#' + u + '-hr)"' + st(1) + '/>' +
      // helmet (morion-ish)
      '<path d="M10 50 Q30 42 50 44 Q70 42 90 50 Q84 54 74 52 Q74 18 50 16 Q26 18 26 52 Q16 54 10 50Z" fill="url(#' + u + '-hm)"' + st(1.4) + '/>' +
      '<path d="M50 10 Q54 16 50 44 Q46 16 50 10Z" fill="#dfe5ec"' + st(1) + '/>' +
      shine(38, 28, 6, 4, 0.5) +
      '<path d="M26 47 Q50 41 74 47" fill="none" stroke="#5e6a7a" stroke-width="1"/>' +
      eye(41, 61, 4.4, 5, '#2f4f9a', 0.4, 0.6, '#efb48a') + eye(59, 61, 4.4, 5, '#2f4f9a', -0.4, 0.6, '#efb48a') +
      mir('<path d="M35 54 Q41 51 46 54" fill="none" stroke="#5a2a90" stroke-width="1.8"/>') +
      '<path d="M48 66 Q50 70 53 67" fill="none" stroke="#c97a52" stroke-width="1.2"/>' +
      '<path d="M44 76 Q50 79 56 75" fill="none" stroke="#9c3a3a" stroke-width="1.5"/>' +
      '<ellipse cx="36" cy="70" rx="3.6" ry="2" fill="#ff8e8e" opacity="0.5"/><ellipse cx="64" cy="70" rx="3.6" ry="2" fill="#ff8e8e" opacity="0.5"/>';
    return wrap(u, d, b);
  };

  /* ---------------- FIREBALL ---------------- */
  P.fireball = function (u) {
    var d = lg(u + '-bg', 0, 0, 0, 1, [[0, '#5a2a1e'], [0.5, '#a8441c'], [1, '#e08a30']]) +
      rg(u + '-core', 0.45, 0.45, 0.55, [[0, '#ffffff'], [0.3, '#fff3a0'], [0.65, '#ffb428'], [1, '#e2541a']]) +
      lg(u + '-tl', 0, 0, 1, 1, [[0, '#ff6a1a', 0], [0.5, '#ff8a1a', 0.8], [1, '#ffd24a']]) +
      rg(u + '-hal', 0.5, 0.5, 0.5, [[0, '#ffcf4a', 0.8], [1, '#ff6a1a', 0]]);
    var flames = '';
    var pts = [[20, 10, 46, 52], [6, 30, 40, 60], [36, 2, 56, 50], [4, 54, 40, 70]];
    pts.forEach(function (p, i) {
      flames += '<path d="M' + p[0] + ' ' + p[1] + ' Q' + (p[2] - 4) + ' ' + (p[3] - 16) + ' ' + (p[2] + 10) + ' ' + (p[3] - 2) + ' Q' + (p[2] - 2) + ' ' + (p[3] + 6) + ' ' + p[0] + ' ' + p[1] + 'Z" fill="url(#' + u + '-tl)" opacity="' + (0.9 - i * 0.12) + '"/>';
    });
    var sparks = '';
    [[78, 30, 1.6], [84, 58, 1.2], [70, 96, 1.8], [24, 100, 1.3], [88, 82, 1], [14, 82, 1.1], [62, 18, 1]].forEach(function (s) {
      sparks += '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="' + s[2] + '" fill="#ffe27a"/>';
    });
    var b = '<rect width="100" height="120" fill="url(#' + u + '-bg)"/>' +
      '<path d="M0 104 Q30 96 50 104 Q74 112 100 100 L100 120 L0 120Z" fill="#5a2e18" opacity="0.6"/>' +
      flames +
      '<circle cx="58" cy="68" r="38" fill="url(#' + u + '-hal)"/>' +
      '<path d="M30 54 Q34 30 50 40 Q52 24 66 34 Q76 28 80 44 Q92 52 86 70 Q90 90 70 96 Q56 104 42 94 Q26 90 30 74 Q22 64 30 54Z" fill="#f2681e"' + st(1.4, '#7a2a0e') + '/>' +
      '<path d="M36 58 Q40 42 52 48 Q56 36 66 44 Q76 42 78 54 Q86 62 80 74 Q82 88 68 90 Q56 96 46 88 Q34 84 36 72 Q30 66 36 58Z" fill="#ffa02a"/>' +
      '<circle cx="60" cy="68" r="18" fill="url(#' + u + '-core)"/>' +
      shine(54, 60, 6, 4, 0.7) +
      sparks;
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" preserveAspectRatio="xMidYMid slice" width="100%" height="100%"><defs>' + d +
      rg(u + '-vig', 0.5, 0.45, 0.75, [[0.6, '#000', 0], [1, '#000', 0.35]]) + '</defs>' + b + '<rect width="100" height="120" fill="url(#' + u + '-vig)"/></svg>';
  };

  /* ---------------- PRINCE ---------------- */
  P.prince = function (u) {
    var B = bg(u, '#9fb8e0', '#4a64a0');
    var d = B.d + skin(u + '-sk') +
      lg(u + '-gd', 0, 0, 0, 1, [[0, '#fff2a8'], [0.4, '#f0c040'], [1, '#a8701a']]) +
      rg(u + '-gh', 0.38, 0.3, 0.75, [[0, '#fff6c0'], [0.45, '#e8b032'], [1, '#8a5a12']]) +
      lg(u + '-cp', 0, 0, 0, 1, [[0, '#4a7ad0'], [1, '#1e3a80']]) +
      lg(u + '-ln', 0, 0, 1, 0, [[0, '#ffffff'], [0.5, '#4a8ae0'], [1, '#ffffff']]);
    var b = B.b +
      // lance stripes background right
      '<path d="M78 120 L96 0 L106 0 L90 120Z" fill="#e8eef8"' + st(1.2) + '/>' +
      '<path d="M83 90 L95 96 L97 84 L85 78Z M88 56 L99 62 L101 50 L90 44Z M93 22 L103 28 L105 16 L95 10Z" fill="#3a78d8"/>' +
      // body armor
      '<path d="M2 122 Q4 96 26 90 L74 90 Q96 96 98 122Z" fill="url(#' + u + '-gd)"' + st() + '/>' +
      '<path d="M26 90 L50 104 L74 90" fill="url(#' + u + '-cp)"' + st(1.1) + '/>' +
      // face (lower, visible under helmet)
      '<path d="M30 56 Q30 42 50 42 Q70 42 70 56 Q70 84 50 92 Q30 84 30 56Z" fill="url(#' + u + '-sk)"' + st() + '/>' +
      // helmet dome
      '<path d="M20 70 Q16 20 50 16 Q84 20 80 70 L72 70 L72 52 Q50 46 28 52 L28 70Z" fill="url(#' + u + '-gh)"' + st(1.5) + '/>' +
      '<path d="M48 8 Q50 4 52 8 L56 30 L44 30Z" fill="url(#' + u + '-gd)"' + st(1.1) + '/>' +
      // face grill bars (upper half, over eyes)
      '<path d="M28 52 Q50 46 72 52 L72 60 Q50 55 28 60Z" fill="url(#' + u + '-gd)"' + st(1.2) + '/>' +
      '<path d="M36 50 L36 64 M43 48.5 L43 64 M50 48 L50 64 M57 48.5 L57 64 M64 50 L64 64" stroke="' + OL + '" stroke-width="3.6" stroke-linecap="round"/>' +
      '<path d="M36 50 L36 64 M43 48.5 L43 64 M50 48 L50 64 M57 48.5 L57 64 M64 50 L64 64" stroke="url(#' + u + '-gd)" stroke-width="2" stroke-linecap="round"/>' +
      // eyes behind grill
      '<ellipse cx="40" cy="63" rx="2.4" ry="2.4" fill="#fff"/><ellipse cx="60" cy="63" rx="2.4" ry="2.4" fill="#fff"/>' +
      '<circle cx="40" cy="63.3" r="1.3" fill="#1e2e5a"/><circle cx="60" cy="63.3" r="1.3" fill="#1e2e5a"/>' +
      shine(34, 30, 7, 5, 0.45) +
      mir('<circle cx="24" cy="62" r="2.2" fill="url(#' + u + '-gd)"' + st(0.8) + '/>') +
      // nose
      '<path d="M47 66 Q46 72 48 74 Q50 75 52 74 Q54 72 53 66Z" fill="#eaa57a"' + st(0.9) + '/>' +
      // curled moustache
      mir('<path d="M50 75 Q44 73 38 76 Q33 78 31 74 Q31 79 37 80 Q44 80 50 78Z" fill="#4a2a18"' + st(0.9) + '/>') +
      '<path d="M44 82 Q50 86 56 82" fill="none" stroke="#9c3a3a" stroke-width="1.5"/>' +
      '<path d="M48 87 L50 92 L52 87Z" fill="#4a2a18"/>';
    return wrap(u, d, b);
  };

  /* ---------------- HOG RIDER ---------------- */
  P.hogrider = function (u) {
    var B = bg(u, '#d8c4a0', '#8a6a48', '#fff2d0');
    var d = B.d + skin(u + '-sk', '#e8a874', '#bf7448', '#8a4a28') +
      lg(u + '-hr', 0, 0, 0, 1, [[0, '#4a3a30'], [1, '#14100c']]) +
      lg(u + '-hm', 0, 0, 1, 0, [[0, '#8a96a4'], [0.5, '#e4eaf0'], [1, '#6a7482']]);
    var b = B.b +
      // hammer behind
      '<path d="M82 120 L72 20" stroke="' + OL + '" stroke-width="5"/><path d="M82 120 L72 20" stroke="#8a5424" stroke-width="3"/>' +
      '<rect x="58" y="6" width="28" height="18" rx="3" transform="rotate(-6 72 15)" fill="url(#' + u + '-hm)"' + st(1.3) + '/>' +
      // body
      '<path d="M2 122 Q4 94 28 88 L72 88 Q96 94 98 122Z" fill="url(#' + u + '-sk)"' + st() + '/>' +
      '<path d="M2 106 L98 116 L98 122 L2 122Z" fill="#6a3e1e"' + st(1) + '/>' +
      // ears & earring
      mir('<ellipse cx="25" cy="58" rx="4.5" ry="7" fill="#c47c50"' + st(1.1) + '/>') +
      '<circle cx="24" cy="68" r="2.2" fill="none" stroke="#f0c040" stroke-width="1.3"/>' +
      // head
      '<path d="M26 50 Q26 30 50 30 Q74 30 74 50 L74 66 Q72 88 50 92 Q28 88 26 66Z" fill="url(#' + u + '-sk)"' + st() + '/>' +
      // mohawk
      '<path d="M40 36 Q36 12 50 2 Q48 12 54 8 Q52 18 60 16 Q58 26 62 36 Q50 30 40 36Z" fill="url(#' + u + '-hr)"' + st() + '/>' +
      '<path d="M46 30 Q46 16 50 8" fill="none" stroke="#6a5a4e" stroke-width="1"/>' +
      // thick brows (angry, shouting)
      mir('<path d="M30 46 Q40 44 48 52 L46 55 Q40 50 31 51Z" fill="#1e1610"' + st(1) + '/>') +
      eye(39, 55, 3.8, 3.6, '#4a2a14', 1, 0.3) + eye(61, 55, 3.8, 3.6, '#4a2a14', -1, 0.3) +
      // big nose
      '<path d="M45 56 Q40 66 44 70 Q50 73 56 70 Q60 66 55 56Z" fill="#b8683e"' + st(1) + '/>' + shine(48, 62, 1.6, 3, 0.4) +
      // open shouting mouth
      '<path d="M36 74 Q50 70 64 74 Q62 90 50 91 Q38 90 36 74Z" fill="#4a1010"' + st(1.2) + '/>' +
      '<path d="M38 74.5 Q50 72 62 74.5 L61 77.5 Q50 75.5 39 77.5Z" fill="#fff"/>' +
      '<path d="M43 86 Q50 82 57 86 Q55 90 50 90 Q45 90 43 86Z" fill="#d0504a"/>' +
      // moustache
      mir('<path d="M50 71 Q42 68 34 72 Q28 76 27 84 Q32 78 38 76 Q44 74 50 74.5Z" fill="#1e1610"' + st(1) + '/>');
    return wrap(u, d, b);
  };

  /* ---------------- ARROWS ---------------- */
  P.arrows = function (u) {
    var B = bg(u, '#c7dcef', '#7a9cc0');
    var d = B.d +
      lg(u + '-sh', 0, 0, 1, 0, [[0, '#a87040'], [1, '#6a4020']]) +
      lg(u + '-hd', 0, 0, 1, 0, [[0, '#f4f8fc'], [1, '#7e8a9a']]);
    function arrow(x, y, s, r) {
      return '<g transform="translate(' + x + ' ' + y + ') rotate(' + r + ') scale(' + s + ')">' +
        '<path d="M0 -40 L0 34" stroke="' + OL + '" stroke-width="4.4" stroke-linecap="round"/>' +
        '<path d="M0 -40 L0 34" stroke="url(#' + u + '-sh)" stroke-width="2.6" stroke-linecap="round"/>' +
        '<path d="M0 50 L-6 32 L0 35 L6 32Z" fill="url(#' + u + '-hd)"' + st(1.1) + '/>' +
        '<path d="M0 -42 L-7 -50 L-7 -32 L0 -26Z" fill="#e23b3b"' + st(1) + '/>' +
        '<path d="M0 -42 L7 -50 L7 -32 L0 -26Z" fill="#b82424"' + st(1) + '/>' +
        '</g>';
    }
    var b = B.b +
      '<path d="M0 100 Q50 90 100 100 L100 120 L0 120Z" fill="#8fb070" opacity="0.6"/>' +
      '<path d="M10 20 L30 60 M40 6 L58 44 M70 14 L86 50" stroke="#fff" stroke-width="1.5" opacity="0.5"/>' +
      arrow(22, 50, 0.7, -25) + arrow(80, 40, 0.65, -25) + arrow(56, 30, 0.6, -25) +
      arrow(36, 66, 0.95, -25) + arrow(72, 80, 0.85, -25);
    return wrap(u, d, b);
  };

  /* ---------------- BOMBER ---------------- */
  P.bomber = function (u) {
    var B = bg(u, '#c9bfae', '#7a6e60', '#fff4dc');
    var d = B.d +
      rg(u + '-bn', 0.42, 0.35, 0.7, [[0, '#ffffff'], [0.6, '#e6e0d0'], [1, '#a89e88']]) +
      lg(u + '-cap', 0, 0, 0, 1, [[0, '#5aa8f0'], [1, '#1e5aa8']]) +
      rg(u + '-gg', 0.4, 0.35, 0.6, [[0, '#fff6b0'], [0.5, '#f0c030'], [1, '#9a6a10']]) +
      rg(u + '-ln', 0.4, 0.35, 0.6, [[0, '#ffffff'], [0.6, '#d6dde6'], [1, '#8a96a6']]) +
      rg(u + '-bm', 0.35, 0.3, 0.7, [[0, '#7a8494'], [0.4, '#2e3440'], [1, '#0a0c12']]);
    var b = B.b +
      // ribs body
      '<path d="M22 122 Q24 98 40 94 L62 94 Q78 98 80 122Z" fill="#3a3028"' + st() + '/>' +
      '<path d="M40 100 Q50 104 60 100 M38 108 Q50 112 62 108 M38 116 Q50 120 62 116" fill="none" stroke="url(#' + u + '-bn)" stroke-width="2.6"/>' +
      // skull
      '<path d="M26 56 Q24 26 52 24 Q80 26 78 56 Q78 70 70 74 L68 86 Q52 92 36 86 L34 74 Q26 70 26 56Z" fill="url(#' + u + '-bn)"' + st(1.4) + '/>' +
      // jaw / teeth
      '<path d="M38 78 L66 78 L64 88 Q52 92 40 88Z" fill="#2a2018"' + st(1) + '/>' +
      '<path d="M40 78 L64 78 L63 83 L41 83Z" fill="#f4eee0"' + st(0.8) + '/>' +
      '<path d="M45 78 L45 83 M50 78 L50 83 M55 78 L55 83 M60 78 L60 83" stroke="#8a806c" stroke-width="0.8"/>' +
      // nose hole
      '<path d="M50 66 L47 72 L53 72Z" fill="#2a2018"/>' +
      // cap
      '<path d="M22 50 Q20 16 52 14 Q84 16 82 50 Q66 42 52 42 Q36 42 22 50Z" fill="url(#' + u + '-cap)"' + st(1.4) + '/>' +
      '<path d="M30 28 Q40 18 54 18" fill="none" stroke="#a8d4ff" stroke-width="2" opacity="0.7"/>' +
      '<path d="M22 50 Q36 44 52 44" fill="none" stroke="#14407a" stroke-width="1.2"/>' +
      // goggle strap
      '<path d="M22 54 Q52 46 82 54" fill="none" stroke="#3a2a1e" stroke-width="4"/>' +
      // goggles
      '<circle cx="40" cy="56" r="11" fill="url(#' + u + '-gg)"' + st(1.4) + '/><circle cx="40" cy="56" r="7" fill="url(#' + u + '-ln)"' + st(1.1) + '/>' +
      '<circle cx="64" cy="54" r="11" fill="url(#' + u + '-gg)"' + st(1.4) + '/><circle cx="64" cy="54" r="7" fill="url(#' + u + '-ln)"' + st(1.1) + '/>' +
      '<circle cx="41" cy="57" r="2.4" fill="#111"/><circle cx="63" cy="55" r="2.4" fill="#111"/>' +
      shine(37, 52, 2.4, 1.6, 0.9) + shine(61, 50, 2.4, 1.6, 0.9) +
      // bomb in hand bottom-left
      '<circle cx="20" cy="98" r="17" fill="url(#' + u + '-bm)"' + st(1.4) + '/>' +
      '<rect x="15" y="77" width="10" height="6" rx="1.5" fill="#4a505c"' + st(1) + '/>' +
      '<path d="M20 77 Q22 70 28 70" fill="none" stroke="#c8a060" stroke-width="1.8"/>' +
      '<circle cx="29" cy="69" r="3" fill="#ffd040"/><circle cx="29" cy="69" r="1.4" fill="#fff"/>' +
      shine(14, 92, 4, 3, 0.4) +
      // bony fingers
      '<path d="M30 100 Q36 96 38 102 M30 106 Q36 104 37 109" fill="none" stroke="url(#' + u + '-bn)" stroke-width="3" stroke-linecap="round"/>';
    return wrap(u, d, b);
  };

  /* ---------------- CANNON ---------------- */
  P.cannon = function (u) {
    var B = bg(u, '#e2d8c0', '#9a8a6e', '#fff6e0');
    var d = B.d +
      lg(u + '-ir', 0, 0, 0, 1, [[0, '#8a8aa0'], [0.35, '#55556a'], [1, '#22222e']]) +
      rg(u + '-mz', 0.5, 0.5, 0.5, [[0, '#000'], [0.7, '#1a1a22'], [1, '#4a4a5a']]) +
      lg(u + '-wd', 0, 0, 0, 1, [[0, '#c8935a'], [1, '#7a4c22']]) +
      lg(u + '-bd', 0, 0, 0, 1, [[0, '#5a7ad0'], [1, '#253c80']]);
    var b = B.b +
      '<path d="M0 30 Q20 22 40 30 Q60 20 80 28 L100 24 L100 60 L0 60Z" fill="#d8ccb0" opacity="0.6"/>' +
      '<path d="M0 98 Q50 88 100 98 L100 120 L0 120Z" fill="#b8a07a"/>' +
      // smoke
      '<circle cx="88" cy="14" r="9" fill="#9a9a9a" opacity="0.5"/><circle cx="96" cy="6" r="7" fill="#aaa" opacity="0.4"/>' +
      '<g transform="translate(-16 -18) scale(1.32)">' +
      // wooden base
      '<path d="M12 112 L18 80 L82 80 L88 112Z" fill="url(#' + u + '-wd)"' + st(1.4) + '/>' +
      '<path d="M16 92 L84 92 M14 102 L86 102" stroke="#5a3414" stroke-width="1"/>' +
      '<rect x="24" y="74" width="52" height="10" rx="2" fill="#5a4a6a"' + st(1.2) + '/>' +
      // barrel (angled up right)
      '<g transform="rotate(-28 50 70)">' +
      '<path d="M14 58 Q10 70 14 82 L74 78 L74 62Z" fill="url(#' + u + '-ir)"' + st(1.5) + '/>' +
      '<circle cx="14" cy="70" r="10" fill="url(#' + u + '-ir)"' + st(1.4) + '/>' +
      '<rect x="30" y="58" width="8" height="25" rx="2" fill="url(#' + u + '-bd)"' + st(1.1) + '/>' +
      '<rect x="56" y="59" width="6" height="21" rx="2" fill="url(#' + u + '-bd)"' + st(1.1) + '/>' +
      '<ellipse cx="76" cy="70" rx="7" ry="13" fill="url(#' + u + '-ir)"' + st(1.4) + '/>' +
      '<ellipse cx="77" cy="70" rx="4.4" ry="9" fill="url(#' + u + '-mz)"/>' +
      '<path d="M18 62 L70 62" stroke="#c0c0d8" stroke-width="2" opacity="0.6" stroke-linecap="round"/>' +
      '</g>' +
      '<circle cx="50" cy="76" r="6" fill="#7a7a90"' + st(1.2) + '/><circle cx="50" cy="76" r="2" fill="#2a2a36"/></g>';
    return wrap(u, d, b);
  };

  /* ---------------- VALKYRIE ---------------- */
  P.valkyrie = function (u) {
    var B = bg(u, '#c4d4e4', '#6c84a0');
    var d = B.d + skin(u + '-sk') +
      lg(u + '-hr', 0, 0, 0, 1, [[0, '#ffa84a'], [0.6, '#e8661a'], [1, '#a8400c']]) +
      lg(u + '-br', 0, 0, 0, 1, [[0, '#d8a060'], [1, '#7a4a1e']]) +
      lg(u + '-ax', 0, 0, 1, 0, [[0, '#f4f8fc'], [1, '#7e8a9a']]);
    var braid = function (x) {
      var s = '';
      for (var i = 0; i < 4; i++) s += '<ellipse cx="' + x + '" cy="' + (78 + i * 9) + '" rx="' + (6 - i * 0.6) + '" ry="5.5" fill="url(#' + u + '-hr)"' + st(1.1) + '/>';
      return s;
    };
    var b = B.b +
      // axe behind
      '<path d="M88 120 L80 10" stroke="' + OL + '" stroke-width="5"/><path d="M88 120 L80 10" stroke="#8a5424" stroke-width="3"/>' +
      '<path d="M80 14 Q98 10 100 30 Q90 26 82 32Z" fill="url(#' + u + '-ax)"' + st(1.2) + '/>' +
      '<path d="M80 14 Q62 10 60 30 Q70 26 78 32Z" fill="url(#' + u + '-ax)"' + st(1.2) + '/>' +
      // body
      '<path d="M6 122 Q8 96 30 90 L70 90 Q92 96 94 122Z" fill="url(#' + u + '-br)"' + st() + '/>' +
      '<path d="M30 92 Q50 104 70 92" fill="none" stroke="#5a3414" stroke-width="1.2"/>' +
      // braids
      braid(24) + braid(76) +
      // hair mass
      '<path d="M20 70 Q14 28 50 22 Q86 28 80 70 L72 60 L28 60Z" fill="url(#' + u + '-hr)"' + st() + '/>' +
      // face
      '<path d="M29 54 Q29 38 50 38 Q71 38 71 54 Q71 80 50 89 Q29 80 29 54Z" fill="url(#' + u + '-sk)"' + st() + '/>' +
      '<path d="M28 52 Q30 30 50 30 Q70 30 72 52 Q64 42 54 44 Q50 38 46 44 Q36 42 28 52Z" fill="url(#' + u + '-hr)"' + st(1.1) + '/>' +
      '<path d="M40 28 Q50 24 60 28" fill="none" stroke="#ffd09a" stroke-width="2" opacity="0.7"/>' +
      eye(40, 60, 4.4, 4.6, '#3a7a3a', 0.6, 0.6, '#efb48a') + eye(60, 60, 4.4, 4.6, '#3a7a3a', -0.6, 0.6, '#efb48a') +
      mir('<path d="M33 52 Q40 50 47 55 L46 57 Q40 54 34 55Z" fill="#c4500e"' + st(0.9) + '/>') +
      '<path d="M47 64 Q46 70 49 71 Q51 72 53 70" fill="none" stroke="#c97a52" stroke-width="1.2"/>' +
      '<path d="M42 76 Q50 82 58 75 Q50 78 42 76Z" fill="#9c2a2a"' + st(1) + '/>' +
      '<path d="M43.6 76.4 Q50 77.8 56.4 76 L56 77.4 Q50 78.8 44 77.4Z" fill="#fff"/>' +
      '<ellipse cx="35" cy="70" rx="3.6" ry="2" fill="#ff8e8e" opacity="0.5"/><ellipse cx="65" cy="70" rx="3.6" ry="2" fill="#ff8e8e" opacity="0.5"/>';
    return wrap(u, d, b);
  };

  /* ---------------- BABY DRAGON ---------------- */
  P.babydragon = function (u) {
    var B = bg(u, '#bcd8f0', '#6a92c0');
    var d = B.d +
      rg(u + '-dg', 0.42, 0.35, 0.7, [[0, '#b4f070'], [0.6, '#5cb82a'], [1, '#2e7a14']]) +
      lg(u + '-bl', 0, 0, 0, 1, [[0, '#fff4c0'], [1, '#e8c06a']]) +
      lg(u + '-wg', 0, 0, 0, 1, [[0, '#f0a050'], [1, '#c0602a']]);
    var b = B.b +
      '<path d="M10 100 Q30 92 50 100 Q70 92 90 100" fill="none" stroke="#fff" stroke-width="6" opacity="0.4"/>' +
      // wings
      mir('<path d="M28 74 Q6 60 2 34 Q10 40 14 38 Q14 46 22 46 Q20 54 30 58Z" fill="url(#' + u + '-wg)"' + st(1.3) + '/>' +
        '<path d="M28 72 Q14 58 6 40 M28 66 Q20 56 16 44" fill="none" stroke="#8a3e14" stroke-width="1"/>') +
      // body
      '<path d="M22 122 Q22 90 50 86 Q78 90 78 122Z" fill="url(#' + u + '-dg)"' + st() + '/>' +
      '<path d="M38 122 Q38 98 50 96 Q62 98 62 122Z" fill="url(#' + u + '-bl)"' + st(1.1) + '/>' +
      // horns
      mir('<path d="M34 30 Q28 16 34 6 Q38 18 42 26Z" fill="url(#' + u + '-bl)"' + st(1.1) + '/>') +
      // head
      '<path d="M22 54 Q20 26 50 24 Q80 26 78 54 Q78 76 66 84 Q50 92 34 84 Q22 76 22 54Z" fill="url(#' + u + '-dg)"' + st(1.4) + '/>' +
      shine(40, 34, 9, 4, 0.35) +
      // spikes on top
      '<path d="M46 26 L50 16 L54 26Z" fill="#f0a050"' + st(1) + '/>' +
      // snout
      '<path d="M34 70 Q34 60 50 60 Q66 60 66 70 Q66 84 50 86 Q34 84 34 70Z" fill="url(#' + u + '-bl)"' + st(1.2) + '/>' +
      '<ellipse cx="45" cy="66" rx="1.6" ry="1.2" fill="#5a4020"/><ellipse cx="55" cy="66" rx="1.6" ry="1.2" fill="#5a4020"/>' +
      '<path d="M40 75 Q50 82 60 75" fill="none"' + st(1.3) + '/>' +
      '<path d="M43 76.6 L44.5 79.5 L46 77.8Z M57 76.6 L55.5 79.5 L54 77.8Z" fill="#fff"/>' +
      // big cute eyes
      eye(38, 50, 6.4, 7, '#7a4a14', 0.8, 0.6) + eye(62, 50, 6.4, 7, '#7a4a14', -0.8, 0.6) +
      '<ellipse cx="30" cy="62" rx="3.6" ry="2" fill="#ff9e7e" opacity="0.5"/><ellipse cx="70" cy="62" rx="3.6" ry="2" fill="#ff9e7e" opacity="0.5"/>';
    return wrap(u, d, b);
  };

  window.Portraits = P;
})();
