/* =========================================================
 * app.js —— 皇室战争 界面复刻核心交互与视图渲染
 * 所有图形均由 js/art.js 与 js/portraits.js 纯代码 (SVG) 绘制
 * ========================================================= */
(function () {
  const Art = window.Art;
  const P = window.Portraits;

  /* ---------------- 全局状态数据 ---------------- */
  const state = {
    tab: 2, // 0:商店, 1:卡牌, 2:对战, 3:部落, 4:活动
    level: 8,
    xp: 42,
    xpMax: 50,
    gold: 12677,
    gems: 593,
    trophies: 2085,
    playerName: 'cherwood',
    clanName: 'Royale Red',
    clanTag: '#2P9Q8YJ',
    passCrowns: 6,
    passMax: 10,
    passTier: 7,
    seasonTokens: 450,
    seasonCap: 1000,
    arenaIdx: 1, // 0: 第1阶 哥布林竞技场, 1: 第7阶 皇家竞技场
    deckSubTab: 'deck', // 'deck' | 'personalize'
    activeDeck: 0,
    selectedCard: null, // 当前弹出操作菜单的卡牌 id
    swapSourceId: null, // 正在准备替换进卡组的收藏卡牌 id
    sortIndex: 0, // 0:按等级, 1:按圣水, 2:按稀有度
    shopTimerSec: 11 * 3600 + 44 * 60 + 28,
    chests: [
      { id: 0, status: 'locked', type: 'silver', name: '白银宝箱', timeText: '90分钟', arena: '第7阶竞技场' },
      { id: 1, status: 'ready', type: 'magic', name: '神奇宝箱', timeText: '点击打开!', arena: '第7阶竞技场' },
      { id: 2, status: 'unlocking', type: 'gold', name: '黄金宝箱', sec: 3 * 3600 + 45 * 60 + 12, gemCost: 23, arena: '第7阶竞技场' },
      { id: 3, status: 'locked', type: 'giant', name: '巨人宝箱', timeText: '12小时', arena: '第7阶竞技场' },
    ],
    decks: [
      ['knight', 'archer', 'minions', 'speargoblins', 'fireball', 'giant', 'musketeer', 'prince'],
      ['hogrider', 'valkyrie', 'musketeer', 'cannon', 'fireball', 'arrows', 'goblin', 'bomber'],
      ['pekka', 'babydragon', 'minipekka', 'bandit', 'megaminion', 'fireball', 'arrows', 'tombstone'],
      ['giant', 'prince', 'babydragon', 'musketeer', 'valkyrie', 'goblinhut', 'fireball', 'arrows'],
      ['hogrider', 'bandit', 'minions', 'speargoblins', 'infernotower', 'fireball', 'goblin', 'knight'],
    ],
    cards: {
      knight:       { id: 'knight',       name: '骑士',       en: 'Knight',        elixir: 3, rarity: 'common',    level: 3, count: 0,    need: 10,   hp: 690,  dps: 79,  target: '地面', range: '近战', desc: '一位坚韧的近战剑士，拥有帅气的八字胡，无论是进攻掩护还是防守反击都游刃有余。' },
      archer:       { id: 'archer',       name: '弓箭手',     en: 'Archers',       elixir: 3, rarity: 'common',    level: 2, count: 8,    need: 4,    hp: 125,  dps: 42,  target: '陆空兼顾', range: '5.0', desc: '两位百步穿杨的粉发神射手，能同时对付地面与空中目标。' },
      minions:      { id: 'minions',      name: '亡灵',       en: 'Minions',       elixir: 3, rarity: 'common',    level: 3, count: 8,    need: 4,    hp: 90,   dps: 48,  target: '陆空兼顾', range: '近战', desc: '三只行动迅捷、无甲飞行的空中部队，擅长快速解决地面大块头。' },
      speargoblins: { id: 'speargoblins', name: '哥布林投矛手', en: 'Spear Goblins', elixir: 2, rarity: 'common',    level: 3, count: 8,    need: 10,   hp: 67,   dps: 32,  target: '陆空兼顾', range: '5.0', desc: '三个从远处投掷长矛的哥布林，圣水消耗极低，适合过牌与拉扯。' },
      fireball:     { id: 'fireball',     name: '火球',       en: 'Fireball',      elixir: 4, rarity: 'rare',      level: 3, count: 2,    need: 2,    hp: 0,    dps: 325, target: '区域伤害', range: '2.5', desc: '轰——！一颗炽热的巨大火球从天而降，造成高额范围伤害并击退敌人。' },
      giant:        { id: 'giant',        name: '巨人',       en: 'Giant',         elixir: 5, rarity: 'rare',      level: 3, count: 1,    need: 2,    hp: 2000, dps: 84,  target: '建筑', range: '近战', desc: '步伐缓慢但生命值极高的肉盾，眼里只有敌方的建筑与皇家塔。' },
      musketeer:    { id: 'musketeer',    name: '火枪手',     en: 'Musketeer',     elixir: 4, rarity: 'rare',      level: 5, count: 3,    need: 10,   hp: 340,  dps: 100, target: '陆空兼顾', range: '6.0', desc: '头戴铁盔的精准火枪手，拥有超远射程与稳定的高额单体输出。' },
      prince:       { id: 'prince',       name: '王子',       en: 'Prince',        elixir: 5, rarity: 'epic',      level: 6, count: 1,    need: 2,    hp: 1200, dps: 165, target: '地面', range: '近战', desc: '骑着战马发起冲锋时，他的骑枪将在首次命中时造成双倍伤害！' },
      hogrider:     { id: 'hogrider',     name: '野猪骑士',   en: 'Hog Rider',     elixir: 4, rarity: 'rare',      level: 4, count: 4,    need: 4,    hp: 800,  dps: 105, target: '建筑', range: '近战', isNew: true, desc: '能够跃过河道的快速攻城单位，“Hog Ridaaaa!”的呐喊响彻竞技场。' },
      goblinhut:    { id: 'goblinhut',    name: '哥布林小屋', en: 'Goblin Hut',    elixir: 5, rarity: 'rare',      level: 3, count: 1,    need: 2,    hp: 700,  dps: 0,   target: '出兵建筑', range: '-', isNew: true, desc: '源源不断地派出哥布林投矛手支援战场的茅草屋。' },
      arrows:       { id: 'arrows',       name: '万箭齐发',   en: 'Arrows',        elixir: 3, rarity: 'common',    level: 4, count: 15,   need: 20,   hp: 0,    dps: 144, target: '区域伤害', range: '4.0', desc: '大范围箭雨齐射，能轻松清理成群的亡灵与骷髅海。' },
      goblin:       { id: 'goblin',       name: '哥布林',     en: 'Goblins',       elixir: 2, rarity: 'common',    level: 3, count: 12,   need: 10,   hp: 99,   dps: 54,  target: '地面', range: '近战', isNew: true, desc: '四个手持匕首的绿皮近战哥布林，行动极快、输出惊人。' },
      bomber:       { id: 'bomber',       name: '炸弹兵',     en: 'Bomber',        elixir: 2, rarity: 'common',    level: 4, count: 60,   need: 20,   hp: 168,  dps: 98,  target: '地面范围', range: '4.5', desc: '戴着飞行护目镜的骷髅兵，投掷能炸飞成群地面部队的重磅炸弹。' },
      cannon:       { id: 'cannon',       name: '加农炮',     en: 'Cannon',        elixir: 3, rarity: 'common',    level: 4, count: 50,   need: 20,   hp: 420,  dps: 110, target: '地面', range: '5.5', desc: '高性价比的地面防守建筑，是拉扯巨人与野猪骑士的绝佳利器。' },
      valkyrie:     { id: 'valkyrie',     name: '瓦基丽武神', en: 'Valkyrie',      elixir: 4, rarity: 'rare',      level: 5, count: 15,   need: 10,   hp: 900,  dps: 120, target: '地面旋风', range: '近战', desc: '挥舞双刃巨斧旋转攻击周围一圈的所有地面敌人。' },
      babydragon:   { id: 'babydragon',   name: '飞龙宝宝',   en: 'Baby Dragon',   elixir: 4, rarity: 'epic',      level: 6, count: 3,    need: 4,    hp: 800,  dps: 90,  target: '陆空范围', range: '3.5', desc: '能够喷吐火球的空中飞龙，呆萌外表下有着可靠的范围清场能力。' },
      minipekka:    { id: 'minipekka',    name: '迷你皮卡',   en: 'Mini P.E.K.K.A',elixir: 4, rarity: 'rare',      level: 5, count: 6,    need: 10,   hp: 640,  dps: 220, target: '地面', range: '近战', desc: '最爱吃煎饼的金属小武士，每一剑都能砍出毁灭性的单体伤害。' },
      pekka:        { id: 'pekka',        name: '皮卡超人',   en: 'P.E.K.K.A',     elixir: 7, rarity: 'epic',      level: 7, count: 4,    need: 4,    hp: 2600, dps: 380, target: '地面', range: '近战', desc: '身披重甲的神秘骑士，没有任何地面巨兽能扛住她势大力沉的劈砍。' },
      tombstone:    { id: 'tombstone',    name: '骷髅墓碑',   en: 'Tombstone',     elixir: 3, rarity: 'rare',      level: 4, count: 15,   need: 10,   hp: 250,  dps: 0,   target: '出兵建筑', range: '-', desc: '定时召唤骷髅兵，被摧毁时还会额外涌出一群小骷髅。' },
      megaminion:   { id: 'megaminion',   name: '重甲亡灵',   en: 'Mega Minion',   elixir: 3, rarity: 'rare',      level: 5, count: 6,    need: 10,   hp: 395,  dps: 145, target: '陆空兼顾', range: '近战', desc: '穿戴厚重铁甲的飞行亡灵，不惧万箭齐发与火球的威胁。' },
      infernotower: { id: 'infernotower', name: '地狱之塔',   en: 'Inferno Tower', elixir: 5, rarity: 'rare',      level: 5, count: 4,    need: 10,   hp: 800,  dps: 400, target: '陆空兼顾', range: '6.0', desc: '聚焦高温火焰射线，锁定目标时间越长，造成的伤害呈指数级飙升！' },
      bandit:       { id: 'bandit',       name: '幻影刺客',   en: 'Bandit',        elixir: 3, rarity: 'legendary', level: 9, count: 1,    need: 2,    hp: 750,  dps: 160, target: '地面突袭', range: '近战', isNew: true, desc: '疾风般的传奇刺客，蓄力冲刺期间处于完全无敌状态！' },
    },
    dailyDeals: [
      { id: 'd0', type: 'pouch', name: '金币袋', sub: '每日赠礼', amount: 200, currency: 'free', price: 0, collected: false },
      { id: 'd1', type: 'card', cardId: 'musketeer', qty: 6, currency: 'gold', price: 300, collected: true },
      { id: 'd2', type: 'card', cardId: 'minions', qty: 1, currency: 'gold', price: 10, collected: false },
      { id: 'd3', type: 'card', cardId: 'archer', qty: 5, currency: 'gold', price: 50, collected: false },
      { id: 'd4', type: 'card', cardId: 'pekka', qty: 1, currency: 'gold', price: 1000, collected: false },
      { id: 'd5', type: 'locked', unlockLv: 22 },
    ],
    royalChests: [
      { id: 'rc0', chestType: 'lightning', name: '雷电宝箱', arena: '第7阶竞技场', price: 250, desc: '内含多张自选换卡机会，每次雷击可更换不满意的卡牌！' },
      { id: 'rc1', chestType: 'fortune',   name: '幸运宝箱', arena: '第7阶竞技场', price: 750, desc: '揭示今日运势！高概率开出心仪史诗卡与传奇卡！' },
      { id: 'rc2', chestType: 'king',      name: '国王宝箱', arena: '第7阶竞技场', price: 2000, desc: '皇室顶级秘宝！必得1张传奇卡及海量史诗与稀有卡牌！' },
    ],
    clanFeed: [
      { type: 'msg', user: 'betonfoot', role: '副首领', text: "Yeah we're dominating! 这周部落战稳拿第一！", time: '19小时27分前', me: false },
      { type: 'war', win: false, title: 'Defeat! 战败!', leftText: '你的部落战船\n已被摧毁!', attacker: 'father', attackerClan: 'Royale Purple', badgeColor: ['#a846f0', '#5e1699', 'bolt'], time: '19小时19分前' },
      { type: 'war', win: true,  title: 'Victory! 胜利!', leftText: '已摧毁部落战船\nRoyale Yellow', attacker: 'YOU', attackerClan: 'Royale Red', badgeColor: ['#d83a2e', '#8e1a14', 'rook'], time: '19小时1分前' },
      { type: 'sys', style: 'purple', text: '部落战已开始! (Clan War Started!)', time: '17小时48分前' },
      { type: 'sys', style: 'green',  text: 'Seth 加入了部落 (Seth joined the Clan)', time: '' },
      { type: 'req', id: 'req1', user: '皇室老司机', role: '长老', cardId: 'hogrider', cur: 3, max: 4, donated: false, time: '12分钟前' },
    ],
  };

  const RARITY_LABEL = { common: '普通', rare: '稀有', epic: '史诗', legendary: '传奇' };
  const RARITY_ORDER = { legendary: 4, epic: 3, rare: 2, common: 1 };

  /* ---------------- 工具函数 ---------------- */
  function fmtNum(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  function fmtDuration(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) return `${h}小时 ${m}分 ${s < 10 ? '0' + s : s}秒`;
    return `${m}分 ${s < 10 ? '0' + s : s}秒`;
  }

  function showToast(msg) {
    const app = document.getElementById('app');
    if (!app) return;
    const old = app.querySelector('.toast');
    if (old) old.remove();
    const el = document.createElement('div');
    el.className = 'toast ol-sm';
    el.textContent = msg;
    app.appendChild(el);
    setTimeout(() => el.remove(), 1850);
  }

  function renderPortrait(cardId) {
    const fn = P[cardId] || P.knight;
    return fn(Art.U('pt'));
  }

  /* ---------------- 卡牌组件渲染 ---------------- */
  function renderCardCell(cardId, inDeck = false) {
    const c = state.cards[cardId];
    if (!c) return '';
    const isFull = c.count >= c.need;
    const pct = Math.min(100, Math.round((c.count / c.need) * 100));
    const isSelected = state.selectedCard === `${inDeck ? 'd' : 'c'}_${cardId}`;
    const upgradeCost = c.level * (c.rarity === 'epic' ? 400 : c.rarity === 'rare' ? 150 : 50);

    let popHtml = '';
    if (isSelected) {
      popHtml = `
        <div class="cardpop">
          ${isFull
            ? `<div class="btn green" data-act="upgrade-card" data-id="${cardId}">
                 <span class="ol-sm">升级</span>
                 <div class="p"><span class="ol-sm">${upgradeCost}</span><div>${Art.coin()}</div></div>
               </div>`
            : `<div class="btn blue" data-act="card-info" data-id="${cardId}">
                 <span class="ol-sm">详情</span>
               </div>`
          }
          ${inDeck
            ? `<div class="btn ${isFull ? 'blue' : 'red'}" data-act="card-info" data-id="${cardId}">
                 <span class="ol-sm">信息</span>
               </div>`
            : `<div class="btn" data-act="use-card" data-id="${cardId}">
                 <span class="ol-sm">使用</span>
               </div>`
          }
        </div>
      `;
    }

    return `
      <div class="cardcell" data-act="select-card" data-id="${cardId}" data-deck="${inDeck ? '1' : '0'}">
        <div class="crcard ${c.rarity} ${isSelected ? 'selected' : ''}">
          <div class="frame"></div>
          <div class="art">${renderPortrait(cardId)}</div>
          ${isSelected ? `<div class="cname ol-sm">${c.name}</div>` : ''}
          <div class="lvl ol-sm">等级 ${c.level}</div>
          <div class="elx">${Art.elixirBadge(c.elixir)}</div>
          ${!inDeck && c.isNew ? `<div class="newtag ol-sm">新!</div>` : ''}
        </div>
        <div class="prog ${isFull ? 'full' : ''}">
          <div class="ar">${Art.upArrow(isFull ? 'green' : 'blue')}</div>
          <div class="bar">
            <i style="width:${pct}%"></i>
            <span class="ol-sm">${c.count}/${c.need}</span>
          </div>
        </div>
        ${popHtml}
      </div>
    `;
  }

  /* ---------------- 顶部资源栏 ---------------- */
  function renderTopBar() {
    const xpPct = Math.min(100, Math.round((state.xp / state.xpMax) * 100));
    return `
      <div class="topbar">
        <div class="res-level" data-act="king-info" style="cursor:pointer">
          <div class="badge">${Art.levelBadge(state.level)}</div>
          <div class="xpbar">
            <i style="width:${xpPct}%"></i>
            <span class="ol-sm">${state.xp}/${state.xpMax}</span>
          </div>
        </div>
        <div class="res">
          <div class="plus" data-act="goto-shop" data-sec="gold"></div>
          <div class="well"></div>
          <div class="val ol">${fmtNum(state.gold)}</div>
          <div class="ico">${Art.coin()}</div>
        </div>
        <div class="res">
          <div class="plus" data-act="goto-shop" data-sec="gem"></div>
          <div class="well"></div>
          <div class="val ol">${fmtNum(state.gems)}</div>
          <div class="ico">${Art.gem()}</div>
        </div>
      </div>
    `;
  }

  /* ---------------- 页面 0：商店 ---------------- */
  function renderShopPage() {
    const dealsHtml = state.dailyDeals.map(d => {
      if (d.type === 'locked') {
        return `
          <div class="offer lockedo" data-act="locked-offer">
            <div class="lk">${Art.lock()}</div>
            <div class="lt ol-sm">国王等级 ${d.unlockLv}<br/>解锁</div>
          </div>
        `;
      }
      if (d.type === 'pouch') {
        return `
          <div class="offer ${d.collected ? '' : 'free'}" data-act="buy-deal" data-id="${d.id}">
            <div class="on ol">${d.name}</div>
            <div class="rr ol-sm">${d.sub}</div>
            <div class="pouch-box">
              <div class="amt ol-sm">${d.amount}</div>
              <div class="artp">${Art.goldPouch()}</div>
            </div>
            ${d.collected
              ? `<div class="collected"><div class="ck">${Art.check()}</div><span class="ol-sm">已领取!</span></div>`
              : `<div class="pr"><span class="ol">免费!</span></div>`
            }
          </div>
        `;
      }
      const c = state.cards[d.cardId];
      const isFull = c.count >= c.need;
      const pct = Math.min(100, Math.round((c.count / c.need) * 100));
      return `
        <div class="offer" data-act="buy-deal" data-id="${d.id}">
          <div class="on ol">${c.name}</div>
          <div class="rr ${c.rarity} ol-sm">${RARITY_LABEL[c.rarity]}</div>
          <div class="cardmini">
            <div class="crcard ${c.rarity}">
              <div class="frame"></div>
              <div class="art">${renderPortrait(c.id)}</div>
            </div>
            <div class="qty ol">x${d.qty}</div>
          </div>
          ${d.collected
            ? `<div class="collected"><div>${Art.check()}</div><span class="ol-sm">已购买!</span></div>`
            : `
              <div class="prog ${isFull ? 'full' : ''}">
                <div class="ar">${Art.upArrow(isFull ? 'green' : 'blue')}</div>
                <div class="bar">
                  <i style="width:${pct}%"></i>
                  <span class="ol-sm">${c.count}/${c.need}</span>
                </div>
              </div>
              <div class="pr">
                <span class="ol">${d.price}</span>
                <div>${d.currency === 'gem' ? Art.gem() : Art.coin()}</div>
              </div>
            `
          }
        </div>
      `;
    }).join('');

    const chestsHtml = state.royalChests.map(rc => `
      <div class="offer chesto" data-act="buy-royal-chest" data-id="${rc.id}">
        <div class="on ol">${rc.name}</div>
        <div class="rr ol-sm">${rc.arena}</div>
        <div class="bigimg">${Art.chest(rc.chestType, { cushion: true, glow: true })}</div>
        <div class="pr">
          <span class="ol">${rc.price}</span>
          <div>${Art.gem()}</div>
        </div>
      </div>
    `).join('');

    return `
      <div class="page-inner">
        <!-- 皇室令牌横幅 -->
        <div class="shoppass" data-act="open-pass">
          <div class="scene">${Art.shopPassScene()}</div>
          <div class="passribbon">
            <div class="cw">${Art.crown('gold')}</div>
            <div class="tx ol">PASS<br/>ROYALE</div>
          </div>
          <div class="price ol">¥30.00</div>
          <div class="sub ol-sm">解锁第17赛季专属皇家塔皮肤与丰厚特权!</div>
        </div>

        <!-- 集市木招牌 -->
        <div class="market-sign">
          <div class="strap l"></div>
          <span>MARKET · 集市</span>
          <div class="strap r"></div>
        </div>

        <!-- 每日精选 -->
        <div class="ribbon">
          <span class="ol">每日精选</span>
          <div class="info" data-act="shop-info">${Art.infoIcon()}</div>
        </div>
        <div class="subtimer ol-sm" id="shop-timer-text">新商品刷新倒计时: ${fmtDuration(state.shopTimerSec)}</div>
        <div class="shelf wood">
          <div class="offers">${dealsHtml}</div>
        </div>

        <!-- 皇家宝箱 -->
        <div class="ribbon blue">
          <span class="ol">皇家宝箱</span>
          <div class="info" data-act="shop-info">${Art.infoIcon()}</div>
        </div>
        <div class="subtimer ol-sm">购买的宝箱将立即打开，且内容可突破魔法物品上限</div>
        <div class="shelf wood">
          <div class="offers">${chestsHtml}</div>
        </div>

        <!-- 宝石与金币特惠 -->
        <div class="ribbon green">
          <span class="ol">宝石与金币特惠</span>
        </div>
        <div class="shelf wood" style="margin-bottom:10px">
          <div class="offers">
            <div class="offer free gemo" data-act="free-gems">
              <div class="tag ol-sm">今日福利</div>
              <div class="on ol">一捧宝石</div>
              <div class="rr ol-sm">x25</div>
              <div class="bigimg">${Art.gemPile(1)}</div>
              <div class="pr"><span class="ol">免费!</span></div>
            </div>
            <div class="offer gemo" data-act="buy-resource" data-type="gem" data-amt="500" data-cost="30">
              <div class="on ol">一袋宝石</div>
              <div class="rr ol-sm">x500</div>
              <div class="bigimg">${Art.gemPile(2)}</div>
              <div class="pr"><span class="ol">¥30</span></div>
            </div>
            <div class="offer goldo" data-act="buy-resource" data-type="gold" data-amt="10000" data-cost="500">
              <div class="on ol">一桶金币</div>
              <div class="rr rare ol-sm">x10 000</div>
              <div class="bigimg">${Art.goldPile(3)}</div>
              <div class="pr"><span class="ol">500</span><div>${Art.gem()}</div></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ---------------- 页面 1：卡牌 ---------------- */
  function renderCardsPage() {
    const curDeck = state.decks[state.activeDeck];
    const avgElixir = (
      curDeck.reduce((sum, id) => sum + (state.cards[id] ? state.cards[id].elixir : 0), 0) / curDeck.length
    ).toFixed(1);

    const allIds = Object.keys(state.cards);
    const colIds = allIds.filter(id => !curDeck.includes(id));

    const sortModes = ['按等级', '按圣水', '按稀有度'];
    colIds.sort((a, b) => {
      const ca = state.cards[a], cb = state.cards[b];
      if (state.sortIndex === 0) return cb.level - ca.level || cb.elixir - ca.elixir;
      if (state.sortIndex === 1) return ca.elixir - cb.elixir || cb.level - ca.level;
      return RARITY_ORDER[cb.rarity] - RARITY_ORDER[ca.rarity] || cb.level - ca.level;
    });

    const deckBodyHtml = state.deckSubTab === 'deck'
      ? `
        <div class="deckhead">
          <div class="woodbtn" data-act="king-info"><div style="width:32px;height:26px">${Art.crown('gold')}</div></div>
          <div class="decknums">
            ${[0, 1, 2, 3, 4].map(i => `
              <div class="dnum ol ${state.activeDeck === i ? 'on' : ''}" data-act="switch-deck" data-idx="${i}">${i + 1}</div>
            `).join('')}
          </div>
          <div class="woodbtn" data-act="random-deck" title="随机卡组"><div style="width:24px;height:26px">${Art.upArrow('blue')}</div></div>
        </div>
        ${state.swapSourceId ? `
          <div style="text-align:center;padding:4px 0 6px;color:#ffe36a;font-size:14px" class="ol-sm">
            点击上方卡组中的任意卡牌，将其替换为【${state.cards[state.swapSourceId].name}】
            <span data-act="cancel-swap" style="text-decoration:underline;cursor:pointer;margin-left:6px;color:#ff9c8c">[取消]</span>
          </div>
        ` : ''}
        <div class="deckgrid ${state.swapSourceId ? 'shaking' : ''}">
          ${curDeck.map(id => renderCardCell(id, true)).join('')}
        </div>
        <div class="avg ol-sm">
          <span>平均圣水花费: ${avgElixir}</span>
          <div class="e">${Art.elixir()}</div>
        </div>
      `
      : `
        <div style="padding:14px 6px 4px;text-align:center">
          <div class="ol" style="font-size:16px;margin-bottom:10px">皇家塔皮肤与表情配置</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <div class="panel" style="padding:10px;text-align:center;cursor:pointer" data-act="toast" data-msg="已装备：经典国王皇家塔">
              <div style="width:74px;height:82px;margin:0 auto">${Art.kingTower('blue')}</div>
              <div class="ol-sm" style="margin-top:4px;font-size:14px;color:#8fe3ff">经典皇家塔 (已装备)</div>
            </div>
            <div class="panel" style="padding:10px;text-align:center;cursor:pointer" data-act="open-pass">
              <div style="width:74px;height:82px;margin:0 auto">${Art.kingTower('red')}</div>
              <div class="ol-sm" style="margin-top:4px;font-size:14px;color:#ffd84a">第17赛季金塔 (令牌解锁)</div>
            </div>
          </div>
        </div>
      `;

    return `
      <div class="page-inner" data-act="clear-card-sel">
        <!-- 木质卡组台 -->
        <div class="deckarea wood">
          <div class="decktabs">
            <div class="dtab ol ${state.deckSubTab === 'deck' ? 'on' : ''}" data-act="deck-subtab" data-sub="deck">战斗卡组</div>
            <div class="dtab ol ${state.deckSubTab === 'personalize' ? 'on' : ''}" data-act="deck-subtab" data-sub="personalize">个性化</div>
          </div>
          ${deckBodyHtml}
        </div>

        <!-- 卡牌收藏标题 -->
        <div class="colhead panel">
          <div class="t">
            <b class="ol">卡牌收藏</b>
            <small class="ol-sm">已找到: ${allIds.length}/101</small>
          </div>
          <div class="btn purple" data-act="cycle-sort">
            <span class="ol-sm">${sortModes[state.sortIndex]}</span>
          </div>
        </div>

        <!-- 收藏网格 -->
        <div class="colgrid">
          ${colIds.map(id => renderCardCell(id, false)).join('')}
        </div>

        <!-- 未解锁卡牌剪影 -->
        <div class="locked-sec">
          <div class="line"><span class="ol-sm">未找到的卡牌 · 高阶竞技场解锁</span></div>
          <div class="colgrid" style="opacity:.85">
            ${['pekka', 'prince', 'babydragon', 'bandit'].map(id => `
              <div class="cardcell" data-act="toast" data-msg="提升奖杯解锁更高阶竞技场即可获得此卡牌！">
                <div class="crcard silh">
                  <div class="frame"></div>
                  <div class="art">${renderPortrait(id)}</div>
                  <div class="q ol">?</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /* ---------------- 页面 2：对战 ---------------- */
  function renderBattlePage() {
    const isArena7 = state.arenaIdx === 1;
    const arenaTitle = isArena7 ? '第7阶竞技场' : '第1阶竞技场';
    const arenaSub = isArena7 ? '皇家竞技场 · Royal Arena' : '哥布林竞技场 · Goblin Stadium';
    const arenaSvg = isArena7 ? Art.arena() : Art.goblinArena();

    const segs = Array.from({ length: state.passMax }, (_, i) =>
      `<i class="${i < state.passCrowns ? 'on' : ''}"></i>`
    ).join('');

    const chestsHtml = state.chests.map((ch, idx) => {
      if (ch.status === 'empty') {
        return `<div class="slot empty" data-act="chest-slot" data-idx="${idx}"><span class="ol-sm">宝箱位<br/>空闲</span></div>`;
      }
      if (ch.status === 'ready') {
        return `
          <div class="slot ready" data-act="chest-slot" data-idx="${idx}">
            <div class="s1 ol-sm">${ch.name}</div>
            <div class="chestimg">${Art.chest(ch.type, { glow: true })}</div>
            <div class="s3 ol" style="color:#fff8b0">点击打开!</div>
          </div>
        `;
      }
      if (ch.status === 'unlocking') {
        const m = Math.floor(ch.sec / 60);
        const h = Math.floor(m / 60);
        const rm = m % 60;
        const tStr = h > 0 ? `${h}小时 ${rm}分` : `${rm}分 ${ch.sec % 60}秒`;
        return `
          <div class="slot unlocking" data-act="chest-slot" data-idx="${idx}">
            <div class="clk">${Art.clock()}</div>
            <div class="timer ol-sm" id="chest-timer-${idx}">${tStr}</div>
            <div class="chestimg">${Art.chest(ch.type)}</div>
            <div class="open-now ol-sm">立即打开</div>
            <div class="gemcost">
              <span class="ol">${ch.gemCost}</span>
              <div>${Art.gem()}</div>
            </div>
          </div>
        `;
      }
      return `
        <div class="slot locked" data-act="chest-slot" data-idx="${idx}">
          <div class="s1 ol-sm">未解锁</div>
          <div class="s2 ol">${ch.timeText}</div>
          <div class="chestimg">${Art.chest(ch.type)}</div>
          <div class="s3 ol-sm">${ch.arena}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="page-inner">
        <!-- 玩家战旗与顶部菜单栏 -->
        <div class="profile">
          <div class="card-p panel" data-act="open-profile" style="cursor:pointer">
            <div class="badge">${Art.clanBadge()}</div>
            <div class="names">
              <div class="nm ol">${state.playerName}</div>
              <div class="cn ol-sm">${state.clanName}</div>
            </div>
            <div class="trophy-box">
              <div class="ico">${Art.trophy()}</div>
              <div class="num ol">${state.trophies}</div>
            </div>
          </div>
          <div class="sq panel" data-act="open-news">
            <div class="notif ol-sm">1</div>
            <div style="width:42px;height:42px">${Art.newsGlobe()}</div>
          </div>
          <div class="sq panel" data-act="open-settings">
            <div class="hamb"><i></i><i></i><i></i></div>
          </div>
        </div>

        <!-- 皇室令牌与好友栏 -->
        <div class="passrow">
          <div class="passbanner" data-act="open-pass">
            <div class="scene">${Art.passScene()}</div>
            <div class="passribbon">
              <div class="cw">${Art.crown('gold')}</div>
              <div class="tx ol">PASS<br/>ROYALE</div>
            </div>
            <div class="passprog">
              <div class="lbl">
                <div class="c">${Art.crown('gold')}</div>
                <span class="ol">${state.passCrowns}/${state.passMax}</span>
              </div>
              <div class="seg">${segs}</div>
            </div>
            <div class="tier"><span class="ol">${state.passTier}</span></div>
          </div>
          <div class="friendsbtn" data-act="open-friends">
            <div>${Art.friends()}</div>
          </div>
        </div>

        <!-- 竞技场立体模型与荣誉之路 -->
        <div class="arena-wrap">
          <div class="arena-name ol">
            ${arenaTitle}
            <small class="ol-sm">${arenaSub}</small>
          </div>
          <div class="arena-nav prev ol" data-act="toggle-arena" title="切换竞技场预览">◀</div>
          <div class="arena-svg" data-act="open-arenas">${arenaSvg}</div>
          <div class="arena-nav next ol" data-act="toggle-arena" title="切换竞技场预览">▶</div>
          <div class="arena-prog" data-act="open-arenas" style="cursor:pointer">
            <div class="t">${Art.trophy()}</div>
            <div class="bar">
              <i></i>
              <span class="ol-sm">${state.trophies} / 2300</span>
            </div>
            <div class="gift"><div>${Art.coin()}</div></div>
          </div>
        </div>

        <!-- 核心对战与派对按钮 -->
        <div class="mainbtns">
          <div class="btn" data-act="start-battle" data-mode="1v1排位对战">
            <span class="ol">对战</span>
          </div>
          <div class="btn blue" data-act="open-party">
            <span class="ol">派对!</span>
          </div>
        </div>

        <!-- 四个宝箱槽位 -->
        <div class="chests">${chestsHtml}</div>
      </div>
    `;
  }

  /* ---------------- 页面 3：部落 ---------------- */
  function renderClanPage() {
    const feedHtml = state.clanFeed.map(item => {
      if (item.type === 'sys') {
        return `
          <div class="sys ${item.style} ol">
            ${item.time ? `<span class="tm">${item.time}</span>` : ''}
            <span>${item.text}</span>
          </div>
        `;
      }
      if (item.type === 'war') {
        const bc = item.badgeColor;
        return `
          <div class="warcard ${item.win ? 'blue' : 'red'}" data-act="open-clan-info" style="cursor:pointer">
            <div class="wt ol">${item.title}</div>
            <div class="wb">
              <div class="wl ol-sm">${item.leftText.replace('\n', '<br/>')}</div>
              <div class="anc">${Art.anchorBadge()}</div>
              <div class="wr">
                <div class="la ol-sm">最后一击</div>
                <div class="pn ol">${item.attacker}</div>
                <div class="cl ol-sm">${item.attackerClan}</div>
                <div class="bb">${Art.clanBadge(bc[0], bc[1], bc[2])}</div>
              </div>
            </div>
            <div class="tm">${item.time}</div>
          </div>
        `;
      }
      if (item.type === 'req') {
        const c = state.cards[item.cardId];
        const pct = Math.min(100, Math.round((item.cur / item.max) * 100));
        return `
          <div class="msg">
            <div class="who"><b>${item.user}</b><span>${item.role} · ${item.time}</span></div>
            <div class="req" style="margin-top:6px">
              <div class="cardmini">
                <div class="crcard ${c.rarity}">
                  <div class="frame"></div>
                  <div class="art">${renderPortrait(c.id)}</div>
                </div>
              </div>
              <div class="ri">
                <div class="tx">请求捐赠：<b>${c.name}</b></div>
                <div class="prog ${item.cur >= item.max ? 'full' : ''}">
                  <div class="bar" style="margin-left:0">
                    <i style="width:${pct}%"></i>
                    <span class="ol-sm">${item.cur}/${item.max}</span>
                  </div>
                </div>
              </div>
              <div class="btn ${item.donated || item.cur >= item.max ? 'grey' : 'green'}" data-act="donate-card" data-id="${item.id}">
                <span class="ol-sm">${item.donated || item.cur >= item.max ? '已满' : '捐赠'}</span>
              </div>
            </div>
          </div>
        `;
      }
      return `
        <div class="msg ${item.me ? 'me' : ''}">
          <div class="who"><b>${item.user}</b><span>${item.role}</span></div>
          <div class="tx">${item.text}</div>
          <div class="tm">${item.time}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="clanbg"></div>
      <div class="page-inner">
        <!-- 部落顶栏 (点击打开部落资料与设置栏弹窗) -->
        <div class="clanhead panel" data-act="open-clan-info" style="cursor:pointer">
          <div class="b">${Art.clanBadge()}</div>
          <div class="i">
            <b class="ol">${state.clanName}</b>
            <small class="ol-sm">部落战河道竞速中 · 48/50 成员 (点击查看资料)</small>
          </div>
          <div class="ct ol">
            <div>${Art.trophy()}</div>
            <span>28 450</span>
          </div>
        </div>

        <!-- 聊天与部落战动态流 -->
        <div class="feed">${feedHtml}</div>
      </div>

      <!-- 底部操作栏 -->
      <div class="clanbar">
        <div class="btn yellow" data-act="request-card-modal">
          <div class="ic">${Art.navCards()}</div>
          <span class="ol-sm">请求卡牌</span>
        </div>
        <div class="btn purple" data-act="friendly-battle">
          <div class="ic">${Art.navBattle()}</div>
          <span class="ol-sm">友谊战</span>
        </div>
        <div class="btn blue chat" data-act="chat-modal">
          <span class="ol-sm">💬</span>
        </div>
      </div>
    `;
  }

  /* ---------------- 页面 4：活动 ---------------- */
  function renderEventsPage() {
    const capPct = Math.min(100, Math.round((state.seasonTokens / state.seasonCap) * 100));
    return `
      <div class="page-inner">
        <!-- 顶部新兵训练营插画横幅 -->
        <div class="evhead">
          <div class="scene">${Art.eventScene()}</div>
          <div class="hero">${renderPortrait('archer')}</div>
        </div>
        <div class="evtitle">
          <b class="ol">Boot Camp · 新兵训练营</b>
          <span class="ol-sm"><div>${Art.clock()}</div> 29天 15小时</span>
        </div>

        <!-- 每日赛季代币上限与商店栏 -->
        <div class="capbar">
          <div class="cap">
            <small class="ol-sm">每日上限 (Daily Cap)</small>
            <div class="row">
              <div class="tok">${Art.seasonToken()}</div>
              <div class="bar ol-sm">
                <div style="position:absolute;left:0;top:0;bottom:0;width:${capPct}%;background:linear-gradient(180deg,#df7aff,#8e24d6);border-radius:3px"></div>
                <span style="position:relative;z-index:2">${state.seasonTokens} / ${state.seasonCap}</span>
              </div>
              <div class="plus" data-act="boost-cap" style="width:24px;height:24px"></div>
            </div>
          </div>
          <div class="btn green shopb" data-act="open-season-shop">
            <span class="ol-sm">赛季商店</span>
            <div style="display:flex;align-items:center;gap:3px;font-size:13px">
              <div style="width:16px;height:16px">${Art.seasonToken()}</div>
              <span class="ol-sm">${state.seasonTokens}</span>
            </div>
          </div>
        </div>

        <!-- 绿茵棋盘活动主场地 (还原 05_活动/活动首页与四个模式详情.jpg) -->
        <div class="evfield">
          <!-- 中央主推模式：哥布林派对火箭 -->
          <div class="evmain" data-act="open-event-modal" data-ev="rocket">
            <div class="clk">${Art.clock()}</div>
            <div class="img">${renderPortrait('partyrocket')}</div>
            <div class="btn">
              <span class="ol-sm">哥布林<br/>派对火箭</span>
            </div>
          </div>

          <div class="evarena" data-act="open-event-modal" data-ev="rocket" style="cursor:pointer">${Art.arena()}</div>

          <!-- 左侧 1v1 皇家塔 -->
          <div class="evside l" data-act="open-event-modal" data-ev="1v1">
            <div class="bub"><div>${Art.heistSafe()}</div></div>
            <div class="balloons">${Art.partyBalloons()}</div>
            <div class="kt">${Art.kingTower('blue')}</div>
            <div class="lb ol">1v1</div>
          </div>

          <!-- 右侧 2v2 皇家塔 -->
          <div class="evside r" data-act="open-event-modal" data-ev="2v2">
            <div class="bub"><div>${Art.navEvents()}</div></div>
            <div class="balloons">${Art.partyBalloons()}</div>
            <div class="kt">${Art.kingTower('red')}</div>
            <div class="lb ol">2v2</div>
          </div>
        </div>

        <!-- 经典挑战列表 -->
        <div class="evlist">
          <div class="evrow panel" data-act="start-battle" data-mode="经典挑战 (12胜)">
            <div class="ei">${renderPortrait('knight')}</div>
            <div class="et">
              <b class="ol">经典挑战</b>
              <small class="ol-sm">累计12场胜利赢取丰厚宝箱大奖，3负出局</small>
            </div>
            <div class="btn green">
              <span class="ol-sm" style="margin-right:3px">10</span>
              <div style="width:18px;height:18px">${Art.gem()}</div>
            </div>
          </div>
          <div class="evrow panel" data-act="start-battle" data-mode="终极挑战 (12胜)">
            <div class="ei">${renderPortrait('pekka')}</div>
            <div class="et">
              <b class="ol">终极挑战</b>
              <small class="ol-sm">高手云集的荣耀试炼，赢取海量金币与卡牌</small>
            </div>
            <div class="btn green">
              <span class="ol-sm" style="margin-right:3px">100</span>
              <div style="width:18px;height:18px">${Art.gem()}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ---------------- 底部导航栏 ---------------- */
  function renderBottomNav() {
    const newCardsCount = Object.values(state.cards).filter(c => c.isNew || c.count >= c.need).length;
    const tabs = [
      { id: 0, label: '商店', icon: Art.navShop(), notif: 0 },
      { id: 1, label: '卡牌', icon: Art.navCards(), notif: newCardsCount },
      { id: 2, label: '对战', icon: Art.navBattle(), notif: 0 },
      { id: 3, label: '部落', icon: Art.navClan(), notif: 1 },
      { id: 4, label: '活动', icon: Art.navEvents(), notif: 0 },
    ];
    return `
      <div class="nav" id="bottom-nav">
        <div class="nav-hl" id="nav-hl" style="transform:translateX(${(state.tab * 100) / 1.9}%)"></div>
        ${tabs.map(t => `
          <div class="tab ${state.tab === t.id ? 'active' : ''}" data-act="switch-tab" data-tab="${t.id}">
            ${t.id > 0 ? `<div class="arr l"></div>` : ''}
            <div class="ti">${t.icon}</div>
            <div class="tl ol-sm">${t.label}</div>
            ${t.id < 4 ? `<div class="arr r"></div>` : ''}
            <div class="notif ol-sm" id="nav-notif-${t.id}" style="${t.notif ? '' : 'display:none'}">${t.notif || ''}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* 同步页签与底部横坐标位置（保持 DOM 不重建，触发平滑 CSS 横坐标过渡） */
  function syncTabPosition() {
    const track = document.getElementById('pages-track');
    const navHl = document.getElementById('nav-hl');
    const nav = document.getElementById('bottom-nav');
    if (track) {
      track.classList.remove('dragging');
      track.style.transform = `translateX(-${state.tab * 20}%)`;
    }
    if (navHl) {
      navHl.classList.remove('dragging');
      navHl.style.transform = `translateX(${(state.tab * 100) / 1.9}%)`;
    }
    if (nav) {
      nav.querySelectorAll('.tab').forEach(el => {
        const idx = parseInt(el.getAttribute('data-tab'), 10);
        el.classList.toggle('active', idx === state.tab);
      });
    }
    const newCardsCount = Object.values(state.cards).filter(c => c.isNew || c.count >= c.need).length;
    const cardNotif = document.getElementById('nav-notif-1');
    if (cardNotif) {
      cardNotif.textContent = newCardsCount || '';
      cardNotif.style.display = newCardsCount ? '' : 'none';
    }
  }

  /* ---------------- 弹窗系统 ---------------- */
  function showModal(title, bodyHtml, headClass = '') {
    closeModal();
    const app = document.getElementById('app');
    const mask = document.createElement('div');
    mask.className = 'modal-mask';
    mask.innerHTML = `
      <div class="modal">
        <div class="mh ${headClass}">
          <span class="ol">${title}</span>
          <div class="x" data-act="close-modal"></div>
        </div>
        <div class="mb">${bodyHtml}</div>
      </div>
    `;
    mask.addEventListener('click', function (ev) {
      if (ev.target === mask) closeModal();
    });
    app.appendChild(mask);
  }

  function closeModal() {
    const m = document.querySelector('.modal-mask');
    if (m) m.remove();
  }

  /* 1. 部落资料与设置栏弹窗 (严格还原 04_部落/部落资料与设置栏.jpg) */
  function openClanInfoModal() {
    const members = [
      { rank: 1, name: 'cherwood (你)', role: '首领', trophies: state.trophies },
      { rank: 2, name: 'betonfoot', role: '副首领', trophies: 6030 },
      { rank: 3, name: 'SurgicalGoblin', role: '副首领', trophies: 5890 },
      { rank: 4, name: '皇室老司机', role: '长老', trophies: 5420 },
      { rank: 5, name: 'Seth', role: '成员', trophies: 5110 },
    ];
    showModal('Clan · 部落', `
      <div class="clan-modal-card">
        <div class="clan-modal-top">
          <div class="clan-ribbon-flag"><div>${Art.clanBadge()}</div></div>
          <div style="flex:1;text-align:center">
            <div class="ol" style="font-size:22px;color:#fff">${state.clanName}</div>
            <div style="font-size:13px;color:#5a6b86;margin-top:4px;line-height:1.35">
              Lets win this! We are the best clan in the playable. 欢迎活跃玩家加入部落战！
            </div>
          </div>
        </div>
        <div class="clan-info-strip">
          <div><small>LOCATION</small><b class="ol-sm">International</b></div>
          <div><small>TYPE</small><b class="ol-sm">Open</b></div>
          <div><small>CLAN TAG</small><b class="ol-sm">${state.clanTag}</b></div>
          <div data-act="toast" data-msg="部落设置已保存" style="cursor:pointer;font-size:20px">⚙️</div>
        </div>
      </div>
      <div class="member-list">
        ${members.map(m => `
          <div class="member-row">
            <div class="rk">${m.rank}</div>
            <div class="nm"><b>${m.name}</b><span>${m.role}</span></div>
            <div class="tr"><div>${Art.trophy()}</div><span class="ol-sm">${m.trophies}</span></div>
          </div>
        `).join('')}
      </div>
    `, 'grey');
  }

  /* 2. 活动详情弹窗 (严格还原 05_活动/活动首页与四个模式详情.jpg 四种弹窗与代币浮窗) */
  function openEventDetailModal(evType, subTab = 0, showTokenPop = false) {
    if (evType === 'rocket') {
      showModal('Goblin Party Rocket', `
        <div class="ev-modal-banner">${renderPortrait('partyrocket')}</div>
        <div style="display:flex;justify-content:flex-end;margin-bottom:4px">
          <span class="ol-sm" style="background:#f03a7a;padding:2px 8px;border-radius:10px;font-size:11px">🕒 29d 15h</span>
        </div>
        <div class="desc">
          <b>哥布林派对火箭有什么用？</b><br/>
          只有一个办法能揭晓答案……围绕这张特殊卡牌组建专属卡组，开启狂欢对战吧！
        </div>
        <div class="row">
          <div class="btn" style="flex:1.4" data-act="start-battle" data-mode="哥布林派对火箭">
            <span class="ol">对战 Battle</span>
          </div>
          <div class="btn blue" style="min-width:74px;flex:0.6;flex-direction:column;height:52px" data-act="goto-deck">
            <div style="width:26px;height:26px">${Art.navCards()}</div>
            <span class="ol-sm" style="font-size:11px">卡组 DECK</span>
          </div>
        </div>
        <div class="ev-token-foot">
          <div class="tk">${Art.seasonToken()}</div>
          <div style="flex:1">通过活动对战和皇室令牌获取赛季代币!</div>
          <div class="ib" data-act="ev-token-pop" data-ev="rocket" data-sub="0">${Art.infoIcon()}</div>
          ${showTokenPop ? renderTokenPopover() : ''}
        </div>
      `);
      return;
    }

    const is1v1 = evType === '1v1';
    const tabs = is1v1 ? ['夺金选卡 Heist Draft', '经典对战 Classic'] : ['选卡模式 Draft', '经典模式 Classic'];
    const curDesc = is1v1
      ? (subTab === 0
          ? '通过选卡组建卡组，发起大胆的夺金行动，摧毁对手的金库！但要小心……你没有公主塔来保护自己！'
          : '使用你自己精心搭配的战斗卡组，来一场原汁原味的经典 1v1 皇室对决！')
      : (subTab === 0
          ? '与好友、部落成员或随机队友并肩作战！双方将在对战开始前轮流选卡组建卡组！'
          : '与队友携手出战，使用各自配置的卡组进行刺激的 2v2 双人同屏对战！');

    showModal(is1v1 ? '1v1 对战模式' : '2v2 双人模式', `
      <div class="ev-modal-tabs">
        ${tabs.map((t, idx) => `
          <div class="ev-tab ol-sm ${subTab === idx ? 'on' : ''}" data-act="ev-subtab" data-ev="${evType}" data-sub="${idx}">${t}</div>
        `).join('')}
      </div>
      <div style="width:52px;height:52px;margin:4px auto">${is1v1 && subTab === 0 ? Art.heistSafe() : Art.navEvents()}</div>
      <div class="desc">${curDesc}</div>
      <div class="row">
        <div class="btn" data-act="start-battle" data-mode="${is1v1 ? '1v1' : '2v2'} · ${tabs[subTab]}">
          <span class="ol">对战 Battle</span>
        </div>
      </div>
      <div class="ev-token-foot">
        <div class="tk">${Art.seasonToken()}</div>
        <div style="flex:1">通过活动对战和皇室令牌获取赛季代币!</div>
        <div class="ib" data-act="ev-token-pop" data-ev="${evType}" data-sub="${subTab}">${Art.infoIcon()}</div>
        ${showTokenPop ? renderTokenPopover() : ''}
      </div>
    `);
  }

  function renderTokenPopover() {
    return `
      <div class="token-pop">
        <h5>赛季代币获取规则</h5>
        <div class="token-grid">
          <div class="token-cell">
            <div>防守皇家塔</div>
            <div class="ic">${Art.kingTower('blue')}</div>
            <div class="val ol-sm"><div>${Art.seasonToken()}</div><span>50</span></div>
          </div>
          <div class="token-cell">
            <div>摧毁皇家塔</div>
            <div class="ic">${Art.crown('red')}</div>
            <div class="val ol-sm"><div>${Art.seasonToken()}</div><span>100</span></div>
          </div>
          <div class="token-cell">
            <div>消耗圣水</div>
            <div class="ic">${Art.elixir()}</div>
            <div class="val ol-sm"><div>${Art.seasonToken()}</div><span>1</span></div>
          </div>
          <div class="token-cell">
            <div>获胜倍率</div>
            <div class="ic">${Art.trophy()}</div>
            <div class="val ol-sm"><span>x1.5</span></div>
          </div>
        </div>
      </div>
    `;
  }

  /* 3. 卡牌详情与属性弹窗 */
  function openCardInfoModal(cardId) {
    const c = state.cards[cardId];
    if (!c) return;
    const isFull = c.count >= c.need;
    const upgradeCost = c.level * (c.rarity === 'epic' ? 400 : c.rarity === 'rare' ? 150 : 50);
    showModal(`${c.name} (${c.en})`, `
      <div style="display:flex;gap:14px;align-items:center;text-align:left">
        <div style="width:96px;flex:none">
          <div class="crcard ${c.rarity}">
            <div class="frame"></div>
            <div class="art">${renderPortrait(c.id)}</div>
            <div class="lvl ol-sm">等级 ${c.level}</div>
            <div class="elx">${Art.elixirBadge(c.elixir)}</div>
          </div>
        </div>
        <div style="flex:1;font-size:13px;line-height:1.6">
          <div>稀有度：<b style="color:#1a63c7">${RARITY_LABEL[c.rarity]}</b></div>
          <div>生命值：<b>${c.hp > 0 ? c.hp : '法术/特殊'}</b></div>
          <div>每秒伤害：<b>${c.dps > 0 ? c.dps : '-'}</b></div>
          <div>攻击目标：<b>${c.target}</b></div>
          <div>射程距离：<b>${c.range}</b></div>
        </div>
      </div>
      <div class="desc">${c.desc}</div>
      <div class="row">
        ${isFull ? `
          <div class="btn green" data-act="upgrade-card" data-id="${c.id}">
            <span class="ol-sm">升级 (${upgradeCost}金币)</span>
          </div>
        ` : ''}
        <div class="btn blue" data-act="close-modal"><span class="ol-sm">确定</span></div>
      </div>
    `);
  }

  /* 4. 开宝箱动画与战利品弹窗 */
  function openChestLootModal(chestType, chestName) {
    const goldWon = chestType === 'king' ? 2500 : chestType === 'magic' ? 680 : 185;
    const gemsWon = chestType === 'king' ? 25 : 6;
    const cardKeys = Object.keys(state.cards);
    const wonCardId = cardKeys[Math.floor(Math.random() * cardKeys.length)];
    const wonQty = chestType === 'king' ? 12 : 4;

    state.gold += goldWon;
    state.gems += gemsWon;
    state.cards[wonCardId].count += wonQty;
    renderAll();

    showModal(`开启 ${chestName}!`, `
      <div class="big">${Art.chest(chestType, { glow: true })}</div>
      <div class="loot">
        <div><div>${Art.coin()}</div><b>+${goldWon}</b></div>
        <div><div>${Art.gem()}</div><b>+${gemsWon}</b></div>
        <div><b>${state.cards[wonCardId].name} x${wonQty}</b></div>
      </div>
      <div class="row">
        <div class="btn green" data-act="close-modal"><span class="ol">太棒了!</span></div>
      </div>
    `);
  }

  /* 5. 对战匹配弹窗 */
  function openMatchmakingModal(modeName) {
    showModal(modeName || '1v1 竞技场对战', `
      <div class="spin">${Art.navBattle()}</div>
      <div class="ol" style="font-size:20px;color:#1f6ccc;margin-top:4px">正在搜寻旗鼓相当的对手<span class="dots"></span></div>
      <div class="desc" style="margin-top:10px">
        预计等待时间：2 秒<br/>
        当前出战卡组：<b>卡组 #${state.activeDeck + 1}</b>
      </div>
      <div class="row">
        <div class="btn green" data-act="simulate-win"><span class="ol-sm">模拟三冠大胜 (+30🏆)</span></div>
        <div class="btn red" data-act="close-modal"><span class="ol-sm">取消匹配</span></div>
      </div>
    `);
  }

  /* 6. 玩家战旗与个人资料弹窗 (还原 01_对战大厅与竞技场/玩家战旗与皇室令牌.jpg) */
  function openPlayerProfileModal() {
    showModal('玩家战旗与个人资料', `
      <div style="height:92px;border-radius:10px;overflow:hidden;position:relative;border:2.5px solid #1e2c4a;margin-bottom:10px;background:linear-gradient(135deg,#3b1d6e,#7c25b8,#2b6fd6)">
        <div style="position:absolute;left:14px;top:14px;text-align:left">
          <div class="ol" style="font-size:22px">${state.playerName}</div>
          <div class="ol-sm" style="font-size:13px;color:#ffd84a">${state.clanName} · 部落首领</div>
          <div class="ol-sm" style="font-size:12px;color:#bfe3ff;margin-top:4px">最高奖杯: 6030 · 胜场: 428</div>
        </div>
        <div style="position:absolute;right:12px;top:6px;width:72px;height:84px">${ renderPortrait('prince') }</div>
      </div>
      <div class="loot">
        <div><div>${Art.trophy()}</div><b>${state.trophies} 奖杯</b></div>
        <div><div>${Art.crown('gold')}</div><b>三冠胜场: 186</b></div>
      </div>
      <div class="row">
        <div class="btn blue" data-act="close-modal"><span class="ol-sm">关闭</span></div>
      </div>
    `);
  }

  /* 7. 一至十阶竞技场荣誉之路弹窗 (还原 经典一至十阶竞技场总览.jpg) */
  function openArenasOverviewModal() {
    const arenas = [
      { n: 1, name: '哥布林竞技场', tr: '0+', svg: Art.goblinArena() },
      { n: 2, name: '埋骨深渊', tr: '300+', svg: Art.goblinArena() },
      { n: 3, name: '野蛮人擂台', tr: '600+', svg: Art.arena() },
      { n: 7, name: '皇家竞技场 (当前)', tr: '2000+', svg: Art.arena() },
    ];
    showModal('荣誉之路 · 竞技场总览', `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
        ${arenas.map(a => `
          <div style="background:#c9d8ee;border-radius:8px;padding:6px;border:2px solid ${a.n === 7 ? '#ffb000' : '#8ea2bd'}">
            <div style="width:92px;height:92px;margin:0 auto">${a.svg}</div>
            <div class="ol-sm" style="font-size:13px;color:#fff">第${a.n}阶 · ${a.name}</div>
            <div style="font-size:11px;color:#3d4a62">🏆 ${a.tr}</div>
          </div>
        `).join('')}
      </div>
      <div class="row">
        <div class="btn green" data-act="toggle-arena-modal"><span class="ol-sm">切换大厅展示模型</span></div>
        <div class="btn blue" data-act="close-modal"><span class="ol-sm">确定</span></div>
      </div>
    `);
  }

  /* ---------------- 统一渲染入口 ---------------- */
  function renderAll() {
    const app = document.getElementById('app');
    if (!app) return;

    // 首次挂载骨架（之后不再销毁 #pages-track 和 #bottom-nav，保证横坐标平滑过渡动画）
    if (!document.getElementById('pages-track')) {
      app.innerHTML = `
        <div id="topbar-wrap">${renderTopBar()}</div>
        <div class="pages" id="pages-viewport">
          <div class="track" id="pages-track" style="transform:translateX(-${state.tab * 20}%)">
            <div class="page shop" id="page-0">${renderShopPage()}</div>
            <div class="page cards" id="page-1">${renderCardsPage()}</div>
            <div class="page battle" id="page-2">${renderBattlePage()}</div>
            <div class="page clan" id="page-3">${renderClanPage()}</div>
            <div class="page events" id="page-4">${renderEventsPage()}</div>
          </div>
        </div>
        ${renderBottomNav()}
      `;
      bindSwipeGesture();
      return;
    }

    // 保留各页面滚动位置并局部更新内容
    const scrollPositions = {};
    app.querySelectorAll('.page').forEach((p, idx) => {
      scrollPositions[idx] = p.scrollTop;
    });

    const topWrap = document.getElementById('topbar-wrap');
    if (topWrap) topWrap.innerHTML = renderTopBar();

    const p0 = document.getElementById('page-0');
    const p1 = document.getElementById('page-1');
    const p2 = document.getElementById('page-2');
    const p3 = document.getElementById('page-3');
    const p4 = document.getElementById('page-4');
    if (p0) p0.innerHTML = renderShopPage();
    if (p1) p1.innerHTML = renderCardsPage();
    if (p2) p2.innerHTML = renderBattlePage();
    if (p3) p3.innerHTML = renderClanPage();
    if (p4) p4.innerHTML = renderEventsPage();

    app.querySelectorAll('.page').forEach((p, idx) => {
      if (scrollPositions[idx]) p.scrollTop = scrollPositions[idx];
    });

    syncTabPosition();
  }

  let justDragged = false;

  /* ---------------- 左右滑动/拖拽手势切换页面 ---------------- */
  function bindSwipeGesture() {
    const vp = document.getElementById('pages-viewport');
    const track = document.getElementById('pages-track');
    const navHl = document.getElementById('nav-hl');
    if (!vp || !track) return;

    let startX = 0, startY = 0, dx = 0, dragging = false, lockedH = false;

    const onStart = (x, y) => {
      startX = x; startY = y; dx = 0; dragging = true; lockedH = false;
    };
    const onMove = (x, y) => {
      if (!dragging) return;
      dx = x - startX;
      const dy = y - startY;
      if (!lockedH) {
        if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.15) {
          lockedH = true;
          track.classList.add('dragging');
          if (navHl) navHl.classList.add('dragging');
        } else if (Math.abs(dy) > 12) {
          dragging = false;
          return;
        } else {
          return;
        }
      }
      const w = vp.clientWidth || 390;
      const deltaTabs = -dx / w;
      const continuousTab = Math.max(-0.15, Math.min(4.15, state.tab + deltaTabs));
      track.style.transform = `translateX(${-continuousTab * 20}%)`;
      if (navHl) {
        navHl.style.transform = `translateX(${(continuousTab * 100) / 1.9}%)`;
      }
    };
    const onEnd = () => {
      if (!dragging) return;
      dragging = false;
      track.classList.remove('dragging');
      if (navHl) navHl.classList.remove('dragging');
      if (lockedH) {
        justDragged = true;
        setTimeout(() => { justDragged = false; }, 60);
      }
      if (lockedH && Math.abs(dx) > 50) {
        if (dx < 0 && state.tab < 4) state.tab++;
        else if (dx > 0 && state.tab > 0) state.tab--;
        if (state.selectedCard) {
          state.selectedCard = null;
          renderAll();
          return;
        }
      }
      syncTabPosition();
    };

    vp.addEventListener('touchstart', e => onStart(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    vp.addEventListener('touchmove', e => onMove(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    vp.addEventListener('touchend', onEnd);

    vp.addEventListener('mousedown', e => {
      if (e.button !== 0) return;
      onStart(e.clientX, e.clientY);
    });
    window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onEnd);
  }

  /* ---------------- 全局点击事件委托 ---------------- */
  document.addEventListener('click', function (e) {
    if (justDragged) {
      justDragged = false;
      return;
    }
    const target = e.target.closest('[data-act]');
    if (!target) return;
    const act = target.getAttribute('data-act');

    switch (act) {
      case 'switch-tab': {
        const nextTab = parseInt(target.getAttribute('data-tab'), 10);
        if (state.tab === nextTab) break;
        state.tab = nextTab;
        if (state.selectedCard) {
          state.selectedCard = null;
          renderAll();
        } else {
          syncTabPosition();
        }
        break;
      }
      case 'goto-shop': {
        state.tab = 0;
        renderAll();
        showToast('已跳转至皇室集市商店');
        break;
      }
      case 'goto-deck': {
        closeModal();
        state.tab = 1;
        renderAll();
        break;
      }
      case 'king-info': {
        showModal('国王等级 ' + state.level, `
          <div style="width:72px;height:72px;margin:0 auto">${Art.levelBadge(state.level)}</div>
          <div class="desc">
            当前经验值：<b>${state.xp} / ${state.xpMax}</b><br/>
            国王塔生命值：<b>2400</b> · 公主塔生命值：<b>1400</b><br/>
            升级卡牌或向部落成员捐赠卡牌均可获得经验值！
          </div>
          <div class="row"><div class="btn blue" data-act="close-modal"><span class="ol-sm">确定</span></div></div>
        `);
        break;
      }
      case 'open-profile':
        openPlayerProfileModal();
        break;
      case 'open-news':
        showModal('皇室资讯 · News Royale', `
          <div style="width:64px;height:64px;margin:0 auto">${Art.newsGlobe()}</div>
          <div class="desc" style="text-align:left">
            <b>🔥 第17赛季现已开启！</b><br/>
            • 全新活动【哥布林派对火箭】火热进行中<br/>
            • 部落战2河道竞速奖励全面升级<br/>
            • 皇室集市每日免费福利等你领取！
          </div>
          <div class="row"><div class="btn blue" data-act="close-modal"><span class="ol-sm">知道了</span></div></div>
        `);
        break;
      case 'open-settings':
        showModal('游戏设置与对战日志', `
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
            <div class="btn blue" style="height:44px" data-act="toast" data-msg="音效与音乐：已开启"><span class="ol-sm">🔊 音乐音效</span></div>
            <div class="btn blue" style="height:44px" data-act="toast" data-msg="已展示皇室TV巅峰对局"><span class="ol-sm">📺 皇室TV</span></div>
            <div class="btn green" style="height:44px" data-act="toast" data-msg="Supercell ID 已连接"><span class="ol-sm">🛡️ 账号绑定</span></div>
            <div class="btn purple" style="height:44px" data-act="open-arenas"><span class="ol-sm">🏆 荣誉之路</span></div>
          </div>
          <div class="row"><div class="btn grey" data-act="close-modal"><span class="ol-sm">关闭</span></div></div>
        `, 'grey');
        break;
      case 'open-pass':
        showModal('皇室令牌 · Pass Royale', `
          <div style="height:86px;border-radius:8px;overflow:hidden;border:2px solid #ffb31a;margin-bottom:8px">${Art.passScene()}</div>
          <div class="desc">
            当前阶段：<b>第 ${state.passTier} 阶 (${state.passCrowns}/${state.passMax} 皇冠)</b><br/>
            解锁黄金令牌可享：专属皇家塔皮肤、无限次挑战重入、宝箱队列自动解锁！
          </div>
          <div class="row">
            <div class="btn green" data-act="claim-pass"><span class="ol-sm">领取免费阶段奖励</span></div>
            <div class="btn" data-act="close-modal"><span class="ol-sm">确定</span></div>
          </div>
        `);
        break;
      case 'claim-pass':
        closeModal();
        openChestLootModal('gold', '皇室令牌皇冠宝箱');
        break;
      case 'open-friends':
        showModal('好友列表 · Friends', `
          <div class="member-list" style="margin-top:0;margin-bottom:12px">
            <div class="member-row"><div class="rk">🟢</div><div class="nm"><b>SurgicalGoblin</b><span>在线 · 第15阶竞技场</span></div><div class="tr"><div>${Art.trophy()}</div><span class="ol-sm">5890</span></div></div>
            <div class="member-row"><div class="rk">🟢</div><div class="nm"><b>betonfoot</b><span>部落战准备中</span></div><div class="tr"><div>${Art.trophy()}</div><span class="ol-sm">6030</span></div></div>
            <div class="member-row"><div class="rk">⚪</div><div class="nm"><b>Morten</b><span>2小时前在线</span></div><div class="tr"><div>${Art.trophy()}</div><span class="ol-sm">5640</span></div></div>
          </div>
          <div class="row"><div class="btn green" data-act="friendly-battle"><span class="ol-sm">发起好友切磋</span></div></div>
        `);
        break;
      case 'toggle-arena':
        e.stopPropagation();
        state.arenaIdx = state.arenaIdx === 1 ? 0 : 1;
        renderAll();
        showToast(state.arenaIdx === 1 ? '已切换预览：第7阶 皇家竞技场' : '已切换预览：第1阶 哥布林竞技场');
        break;
      case 'toggle-arena-modal':
        state.arenaIdx = state.arenaIdx === 1 ? 0 : 1;
        closeModal();
        renderAll();
        break;
      case 'open-arenas':
        openArenasOverviewModal();
        break;
      case 'start-battle':
        openMatchmakingModal(target.getAttribute('data-mode'));
        break;
      case 'simulate-win':
        closeModal();
        state.trophies += 30;
        state.passCrowns = Math.min(state.passMax, state.passCrowns + 3);
        state.seasonTokens = Math.min(state.seasonCap, state.seasonTokens + 150);
        renderAll();
        showToast('🏆 三冠大胜！奖杯 +30，皇冠 +3，赛季代币 +150！');
        break;
      case 'open-party':
        showModal('派对模式 · Party!', `
          <div class="desc">与好友或随机玩家畅玩轻松有趣的轮换娱乐模式，不掉奖杯也能赢取宝箱与皇冠！</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div class="btn blue" style="height:46px" data-act="start-battle" data-mode="2v2 快速派对对战"><span class="ol">⚔️ 2v2 双人快速对战</span></div>
            <div class="btn purple" style="height:46px" data-act="start-battle" data-mode="三倍圣水狂欢"><span class="ol">💧 三倍圣水狂欢</span></div>
            <div class="btn green" style="height:46px" data-act="start-battle" data-mode="哥布林夺金派对"><span class="ol">💰 哥布林夺金派对</span></div>
          </div>
        `);
        break;
      case 'chest-slot': {
        const idx = parseInt(target.getAttribute('data-idx'), 10);
        const ch = state.chests[idx];
        if (!ch || ch.status === 'empty') {
          showToast('赢得一场对战即可获得新宝箱！');
          return;
        }
        if (ch.status === 'ready') {
          ch.status = 'empty';
          openChestLootModal(ch.type, ch.name);
          return;
        }
        if (ch.status === 'unlocking') {
          showModal(ch.name, `
            <div class="big">${Art.chest(ch.type)}</div>
            <div class="desc">${ch.arena} · 正在解锁中<br/>使用宝石可立即完成解锁并开启宝箱！</div>
            <div class="row">
              <div class="btn green" data-act="gem-open-chest" data-idx="${idx}">
                <span class="ol">立即打开 (${ch.gemCost}</span>
                <div class="i">${Art.gem()}</div><span class="ol">)</span>
              </div>
            </div>
          `);
          return;
        }
        showModal(ch.name, `
          <div class="big">${Art.chest(ch.type)}</div>
          <div class="desc">${ch.arena} · 解锁耗时：<b>${ch.timeText}</b><br/>内含丰厚金币与多张随机卡牌！</div>
          <div class="row">
            <div class="btn green" data-act="instant-open-chest" data-idx="${idx}">
              <span class="ol">18宝石立即打开</span>
            </div>
            <div class="btn blue" data-act="close-modal"><span class="ol">稍后</span></div>
          </div>
        `);
        break;
      }
      case 'gem-open-chest': {
        const idx = parseInt(target.getAttribute('data-idx'), 10);
        const ch = state.chests[idx];
        if (state.gems < ch.gemCost) {
          showToast('宝石不足！');
          return;
        }
        state.gems -= ch.gemCost;
        const t = ch.type, n = ch.name;
        ch.status = 'empty';
        openChestLootModal(t, n);
        break;
      }
      case 'instant-open-chest': {
        const idx = parseInt(target.getAttribute('data-idx'), 10);
        const ch = state.chests[idx];
        if (state.gems < 18) {
          showToast('宝石不足！');
          return;
        }
        state.gems -= 18;
        const t = ch.type, n = ch.name;
        ch.status = 'empty';
        openChestLootModal(t, n);
        break;
      }

      /* -------- 卡牌页交互 -------- */
      case 'deck-subtab':
        state.deckSubTab = target.getAttribute('data-sub');
        state.selectedCard = null;
        renderAll();
        break;
      case 'switch-deck':
        state.activeDeck = parseInt(target.getAttribute('data-idx'), 10);
        state.selectedCard = null;
        state.swapSourceId = null;
        renderAll();
        break;
      case 'random-deck': {
        const keys = Object.keys(state.cards);
        const shuffled = keys.slice().sort(() => Math.random() - 0.5).slice(0, 8);
        state.decks[state.activeDeck] = shuffled;
        state.selectedCard = null;
        renderAll();
        showToast('🎲 已为你随机生成一套新战斗卡组！');
        break;
      }
      case 'cycle-sort':
        state.sortIndex = (state.sortIndex + 1) % 3;
        renderAll();
        break;
      case 'select-card': {
        e.stopPropagation();
        const cid = target.getAttribute('data-id');
        const inDeck = target.getAttribute('data-deck') === '1';

        // 如果处于替换卡组模式且点击了卡组里的卡
        if (state.swapSourceId && inDeck) {
          const deck = state.decks[state.activeDeck];
          const pos = deck.indexOf(cid);
          if (pos !== -1) {
            const oldName = state.cards[cid].name;
            const newName = state.cards[state.swapSourceId].name;
            deck[pos] = state.swapSourceId;
            state.swapSourceId = null;
            state.selectedCard = null;
            renderAll();
            showToast(`已将【${newName}】替换【${oldName}】编入卡组！`);
            return;
          }
        }

        if (state.cards[cid]) state.cards[cid].isNew = false;
        const key = `${inDeck ? 'd' : 'c'}_${cid}`;
        state.selectedCard = state.selectedCard === key ? null : key;
        renderAll();
        break;
      }
      case 'clear-card-sel':
        if (state.selectedCard) {
          state.selectedCard = null;
          renderAll();
        }
        break;
      case 'card-info': {
        const cid = target.getAttribute('data-id');
        state.selectedCard = null;
        renderAll();
        openCardInfoModal(cid);
        break;
      }
      case 'upgrade-card': {
        const cid = target.getAttribute('data-id');
        const c = state.cards[cid];
        const cost = c.level * (c.rarity === 'epic' ? 400 : c.rarity === 'rare' ? 150 : 50);
        if (state.gold < cost) {
          showToast('金币不足！可前往集市商店领取免费金币');
          return;
        }
        state.gold -= cost;
        c.count -= c.need;
        c.level += 1;
        c.hp = Math.round(c.hp * 1.1);
        c.dps = Math.round(c.dps * 1.1);
        state.xp += 12;
        if (state.xp >= state.xpMax) {
          state.xp -= state.xpMax;
          state.level += 1;
        }
        state.selectedCard = null;
        closeModal();
        renderAll();
        showToast(`⬆️ 【${c.name}】成功升级至 等级 ${c.level}！经验 +12`);
        break;
      }
      case 'use-card': {
        const cid = target.getAttribute('data-id');
        state.swapSourceId = cid;
        state.selectedCard = null;
        renderAll();
        const page = document.querySelector('.page.cards');
        if (page) page.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      }
      case 'cancel-swap':
        state.swapSourceId = null;
        renderAll();
        break;

      /* -------- 商店页交互 -------- */
      case 'buy-deal': {
        const did = target.getAttribute('data-id');
        const deal = state.dailyDeals.find(x => x.id === did);
        if (!deal || deal.collected) {
          showToast('该商品今日已领取完毕！');
          return;
        }
        if (deal.type === 'pouch') {
          deal.collected = true;
          state.gold += deal.amount;
          renderAll();
          showToast(`🎉 领取成功！获得 ${deal.amount} 金币！`);
          return;
        }
        const c = state.cards[deal.cardId];
        if (state.gold < deal.price) {
          showToast('金币不足！');
          return;
        }
        state.gold -= deal.price;
        c.count += deal.qty;
        deal.collected = true;
        renderAll();
        showToast(`🛒 已购买 ${c.name} x${deal.qty}！`);
        break;
      }
      case 'locked-offer':
        showToast('提升国王等级至 22 级即可解锁第6个每日精选栏位！');
        break;
      case 'buy-royal-chest': {
        const rcid = target.getAttribute('data-id');
        const rc = state.royalChests.find(x => x.id === rcid);
        if (!rc) return;
        showModal(rc.name, `
          <div class="big">${Art.chest(rc.chestType, { cushion: true, glow: true })}</div>
          <div class="desc">${rc.desc}</div>
          <div class="row">
            <div class="btn green" data-act="confirm-royal-chest" data-id="${rc.id}">
              <span class="ol">${rc.price}</span><div class="i">${Art.gem()}</div><span class="ol">购买</span>
            </div>
          </div>
        `);
        break;
      }
      case 'confirm-royal-chest': {
        const rcid = target.getAttribute('data-id');
        const rc = state.royalChests.find(x => x.id === rcid);
        if (!rc) return;
        if (state.gems < rc.price) {
          showToast('宝石不足！点击下方免费宝石福利可补充宝石');
          return;
        }
        state.gems -= rc.price;
        openChestLootModal(rc.chestType, rc.name);
        break;
      }
      case 'free-gems':
        state.gems += 25;
        renderAll();
        showToast('💎 已领取今日集市福利：宝石 +25！');
        break;
      case 'buy-resource': {
        const tp = target.getAttribute('data-type');
        const amt = parseInt(target.getAttribute('data-amt'), 10);
        const cost = parseInt(target.getAttribute('data-cost'), 10);
        if (tp === 'gem') {
          state.gems += amt;
          renderAll();
          showToast(`💎 购买成功：宝石 +${amt}！`);
        } else {
          if (state.gems < cost) {
            showToast('宝石不足！');
            return;
          }
          state.gems -= cost;
          state.gold += amt;
          renderAll();
          showToast(`🪙 兑换成功：金币 +${fmtNum(amt)}！`);
        }
        break;
      }
      case 'shop-info':
        showModal('商店说明', `
          <div class="desc">
            • <b>每日精选</b>每24小时自动刷新6格商品，首格必出免费金币袋、宝石或宝箱赠礼！<br/>
            • <b>皇家宝箱</b>购买后立即开启，可快速扩充高阶传奇与史诗卡牌收藏！
          </div>
          <div class="row"><div class="btn blue" data-act="close-modal"><span class="ol-sm">确定</span></div></div>
        `);
        break;

      /* -------- 部落页交互 -------- */
      case 'open-clan-info':
        openClanInfoModal();
        break;
      case 'donate-card': {
        const reqId = target.getAttribute('data-id');
        const item = state.clanFeed.find(x => x.id === reqId);
        if (!item || item.donated || item.cur >= item.max) return;
        item.cur += 1;
        item.donated = true;
        state.gold += 50;
        state.xp += 10;
        renderAll();
        showToast('🤝 捐赠成功！获得 +50 金币，+10 经验值！');
        break;
      }
      case 'request-card-modal': {
        const curDeck = state.decks[state.activeDeck];
        showModal('选择请求捐赠的卡牌', `
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:10px">
            ${curDeck.map(cid => {
              const c = state.cards[cid];
              return `
                <div style="cursor:pointer" data-act="confirm-req-card" data-id="${cid}">
                  <div class="crcard ${c.rarity}">
                    <div class="frame"></div>
                    <div class="art">${renderPortrait(cid)}</div>
                    <div class="lvl ol-sm">${c.name}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `);
        break;
      }
      case 'confirm-req-card': {
        const cid = target.getAttribute('data-id');
        closeModal();
        state.clanFeed.push({
          type: 'req',
          id: 'req_' + Date.now(),
          user: state.playerName,
          role: '首领',
          cardId: cid,
          cur: 1,
          max: 4,
          donated: false,
          time: '刚刚',
        });
        renderAll();
        const page = document.querySelector('.page.clan');
        if (page) page.scrollTop = page.scrollHeight;
        showToast(`已向部落发送【${state.cards[cid].name}】捐赠请求！`);
        break;
      }
      case 'friendly-battle':
        closeModal();
        state.tab = 3;
        state.clanFeed.push({
          type: 'sys',
          style: 'purple',
          text: `${state.playerName} 发起了 1v1 部落友谊战!`,
          time: '刚刚',
        });
        renderAll();
        showToast('⚔️ 已在部落频道发起友谊战邀请！');
        break;
      case 'chat-modal':
        showModal('发送部落聊天', `
          <div style="display:flex;flex-direction:column;gap:8px">
            <div class="btn blue" style="height:42px" data-act="send-quick-chat" data-msg="Good luck! 祝大家部落战旗开得胜！"><span class="ol-sm">“祝大家部落战旗开得胜！”</span></div>
            <div class="btn blue" style="height:42px" data-act="send-quick-chat" data-msg="Well played! 刚才那局2v2配合太默契了！"><span class="ol-sm">“刚才那局2v2配合太默契了！”</span></div>
            <div class="btn green" style="height:42px" data-act="send-quick-chat" data-msg="哈哈大笑 👑 嘿嘿嘿哈！"><span class="ol-sm">👑 发送国王“嘿嘿嘿哈”表情</span></div>
          </div>
        `);
        break;
      case 'send-quick-chat': {
        const msg = target.getAttribute('data-msg');
        closeModal();
        state.clanFeed.push({
          type: 'msg',
          user: state.playerName,
          role: '首领',
          text: msg,
          time: '刚刚',
          me: true,
        });
        renderAll();
        const page = document.querySelector('.page.clan');
        if (page) page.scrollTop = page.scrollHeight;
        break;
      }

      /* -------- 活动页交互 -------- */
      case 'open-event-modal':
        openEventDetailModal(target.getAttribute('data-ev'), 0, false);
        break;
      case 'ev-subtab':
        openEventDetailModal(
          target.getAttribute('data-ev'),
          parseInt(target.getAttribute('data-sub'), 10),
          false
        );
        break;
      case 'ev-token-pop': {
        const hasPop = !!document.querySelector('.token-pop');
        openEventDetailModal(
          target.getAttribute('data-ev'),
          parseInt(target.getAttribute('data-sub'), 10),
          !hasPop
        );
        break;
      }
      case 'boost-cap':
        state.seasonCap += 1000;
        renderAll();
        showToast('🚀 每日赛季代币上限已提升 +1000！');
        break;
      case 'open-season-shop':
        showModal('赛季商店 · Season Shop', `
          <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:10px">
            <div style="width:28px;height:28px">${Art.seasonToken()}</div>
            <span class="ol" style="font-size:20px;color:#8e24d6">当前代币: ${state.seasonTokens}</span>
          </div>
          <div class="desc">使用从新兵训练营活动中赢得的赛季代币兑换魔法之书、金币与皇家宝箱！</div>
          <div class="row">
            <div class="btn green" data-act="redeem-token"><span class="ol-sm">300代币兑换 5000金币</span></div>
            <div class="btn blue" data-act="close-modal"><span class="ol-sm">关闭</span></div>
          </div>
        `);
        break;
      case 'redeem-token':
        if (state.seasonTokens < 300) {
          showToast('赛季代币不足！参加活动对战可赢取代币');
          return;
        }
        state.seasonTokens -= 300;
        state.gold += 5000;
        closeModal();
        renderAll();
        showToast('🎁 兑换成功：金币 +5000！');
        break;

      case 'toast':
        showToast(target.getAttribute('data-msg') || '操作成功');
        break;
      case 'close-modal':
        closeModal();
        break;
    }
  });

  /* ---------------- 实时倒计时与响应式缩放 ---------------- */
  setInterval(() => {
    if (state.shopTimerSec > 0) state.shopTimerSec--;
    const shopEl = document.getElementById('shop-timer-text');
    if (shopEl) shopEl.textContent = '新商品刷新倒计时: ' + fmtDuration(state.shopTimerSec);

    state.chests.forEach((ch, idx) => {
      if (ch.status === 'unlocking' && ch.sec > 0) {
        ch.sec--;
        const el = document.getElementById('chest-timer-' + idx);
        if (el) {
          const m = Math.floor(ch.sec / 60);
          const h = Math.floor(m / 60);
          const rm = m % 60;
          el.textContent = h > 0 ? `${h}小时 ${rm}分` : `${rm}分 ${ch.sec % 60}秒`;
        }
      }
    });
  }, 1000);

  function fitScreen() {
    const phone = document.getElementById('phone');
    if (!phone) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (vw <= 430) {
      phone.classList.add('fullscreen');
      phone.style.width = '100%';
      phone.style.height = '100%';
      phone.style.transform = 'none';
    } else {
      phone.classList.remove('fullscreen');
      phone.style.width = '390px';
      phone.style.height = '844px';
      const scale = Math.min(1, (vh - 28) / 844, (vw - 28) / 390);
      phone.style.transform = `scale(${scale.toFixed(3)})`;
    }
  }

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
  window.addEventListener('resize', fitScreen);
  window.addEventListener('DOMContentLoaded', () => {
    fitScreen();
    renderAll();
  });
})();
