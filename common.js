// ============================================================
// common.js — 모두의계산기 공통 기능
// 즐겨찾기 / 플로팅 메모장 / 관련 계산기 / 홈 버튼 강화
// ============================================================

(function () {

  // ── 계산기 전체 목록 ─────────────────────────────────────
  const CALC_LIST = [
    { title: '연봉 실수령액', path: '/salary',          emoji: '💰', cat: '세금·금융' },
    { title: '퇴직금',       path: '/retirement',       emoji: '🏦', cat: '세금·금융' },
    { title: '대출 이자',    path: '/loan',             emoji: '🏠', cat: '세금·금융' },
    { title: '실업급여',     path: '/unemployment',     emoji: '📋', cat: '세금·금융' },
    { title: '적금 만기',    path: '/savings',          emoji: '💳', cat: '세금·금융' },
    { title: '물가상승률',   path: '/inflation',        emoji: '📈', cat: '세금·금융' },
    { title: '중개수수료',   path: '/realestate',       emoji: '🏡', cat: '부동산' },
    { title: '취득세',       path: '/acquisition',      emoji: '🏢', cat: '부동산' },
    { title: '양도소득세',   path: '/capital_gains',    emoji: '📊', cat: '부동산' },
    { title: '증여세·상속세',path: '/gift_tax',         emoji: '🎁', cat: '부동산' },
    { title: '전월세 전환율',path: '/rent_conversion',  emoji: '🔄', cat: '부동산' },
    { title: '만 나이',      path: '/age',              emoji: '🎂', cat: '날짜·생활' },
    { title: '디데이',       path: '/dday',             emoji: '📅', cat: '날짜·생활' },
    { title: 'BMI',          path: '/bmi',              emoji: '⚖️', cat: '건강' },
    { title: '기초대사량',   path: '/bmr',              emoji: '🔥', cat: '건강' },
    { title: '임신 주수',    path: '/pregnancy',        emoji: '🤱', cat: '건강' },
    { title: '혈압 정상범위',path: '/blood_pressure',   emoji: '❤️', cat: '건강' },
    { title: '칼로리',       path: '/calorie',          emoji: '🥗', cat: '건강' },
    { title: '환율',         path: '/exchange',         emoji: '💱', cat: '환율' },
    { title: '주휴수당',     path: '/weekly_holiday',   emoji: '📅', cat: '노동' },
    { title: '시급→월급',    path: '/hourly_salary',    emoji: '⏰', cat: '노동' },
    { title: '연차수당',     path: '/annual_leave',     emoji: '🌴', cat: '노동' },
    { title: '주식 수익률',  path: '/stock_return',     emoji: '📉', cat: '주식' },
    { title: '부가가치세',   path: '/vat',              emoji: '🧾', cat: '사업자' },
    { title: '마진율',       path: '/margin',           emoji: '💹', cat: '사업자' },
    { title: '건강보험료',   path: '/health_insurance', emoji: '🏥', cat: '사업자' },
    { title: '소득세',       path: '/income_tax',       emoji: '🧮', cat: '사업자' },
    { title: '영문 주소변환',path: '/address_converter',emoji: '📮', cat: '생활' },
    { title: '평↔제곱미터', path: '/area_converter',   emoji: '📐', cat: '단위변환' },
    { title: 'cm↔inch',     path: '/cm_inch',          emoji: '📏', cat: '단위변환' },
    { title: '국민연금',     path: '/pension',          emoji: '👴', cat: '세금·금융' },
    { title: '관세',         path: '/customs',          emoji: '✈️', cat: '생활' },
    { title: '골프 핸디캡', path: '/golf_handicap',    emoji: '⛳', cat: '생활' },
  ];

  const currentPath = location.pathname.replace(/\/$/, '') || '/';

  // ── CSS ────────────────────────────────────────────────────
  const css = `
    /* ── 홈 버튼 강화 ── */
    .site-name {
      display: inline-flex !important;
      align-items: center;
      gap: 6px;
      font-size: 15px !important;
      font-weight: 700 !important;
      color: var(--accent, #00d4aa) !important;
      background: rgba(0,212,170,0.08);
      border: 1px solid rgba(0,212,170,0.25);
      border-radius: 30px;
      padding: 7px 18px !important;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
      letter-spacing: 0.5px !important;
    }
    .site-name:hover {
      background: rgba(0,212,170,0.15);
      border-color: rgba(0,212,170,0.5);
    }

    /* ── 즐겨찾기 버튼 ── */
    .fav-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: transparent;
      border: 1px solid #30363d;
      border-radius: 30px;
      padding: 7px 16px;
      font-size: 13px;
      font-weight: 600;
      color: #8b949e;
      cursor: pointer;
      transition: all 0.2s;
      font-family: 'Noto Sans KR', sans-serif;
      margin-top: 12px;
    }
    .fav-btn:hover { border-color: #ffd700; color: #ffd700; }
    .fav-btn.active { border-color: #ffd700; color: #ffd700; background: rgba(255,215,0,0.08); }
    .fav-btn .fav-star { font-size: 16px; transition: transform 0.2s; }
    .fav-btn.active .fav-star { transform: scale(1.2); }

    /* ── 관련 계산기 섹션 ── */
    .related-section {
      max-width: 640px;
      margin: 0 auto 32px;
      padding: 0 20px;
    }
    .related-title {
      font-size: 13px;
      font-weight: 700;
      color: #8b949e;
      letter-spacing: 1px;
      margin-bottom: 12px;
      text-align: center;
    }
    .related-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
    .related-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      padding: 12px 6px;
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 12px;
      text-decoration: none;
      color: #8b949e;
      font-size: 11px;
      font-weight: 600;
      font-family: 'Noto Sans KR', sans-serif;
      transition: all 0.2s;
      text-align: center;
      line-height: 1.3;
    }
    .related-card:hover {
      border-color: rgba(0,212,170,0.4);
      color: #e6edf3;
      transform: translateY(-2px);
    }
    .related-card .rc-emoji { font-size: 20px; }

    /* ── 플로팅 메모장 ── */
    .memo-fab {
      position: fixed;
      bottom: 90px;
      right: 24px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #21262d;
      border: 1px solid #30363d;
      color: #8b949e;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
      transition: all 0.2s;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    .memo-fab:hover { background: #30363d; color: #e6edf3; }
    .memo-panel {
      position: fixed;
      bottom: 148px;
      right: 24px;
      width: 260px;
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 16px;
      padding: 14px;
      z-index: 998;
      display: none;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    }
    .memo-panel.open { display: block; }
    .memo-panel-title {
      font-size: 12px;
      font-weight: 700;
      color: #8b949e;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .memo-clear {
      font-size: 11px;
      color: #484f58;
      cursor: pointer;
      background: none;
      border: none;
      font-family: inherit;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .memo-clear:hover { color: #ff6b6b; }
    .memo-textarea {
      width: 100%;
      height: 160px;
      background: #0d1117;
      border: 1px solid #30363d;
      border-radius: 10px;
      padding: 10px;
      color: #e6edf3;
      font-size: 13px;
      font-family: 'Noto Sans KR', sans-serif;
      line-height: 1.7;
      resize: none;
      outline: none;
    }
    .memo-textarea:focus { border-color: rgba(0,212,170,0.3); }
    .memo-hint {
      font-size: 10px;
      color: #484f58;
      margin-top: 6px;
      text-align: right;
    }

    @media (max-width: 600px) {
      .related-grid { grid-template-columns: repeat(3, 1fr); }
      .memo-panel { width: calc(100vw - 48px); right: 16px; bottom: 140px; }
      .memo-fab { right: 16px; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── 즐겨찾기 유틸 ─────────────────────────────────────────
  function getFavs() {
    try { return JSON.parse(localStorage.getItem('ec_favs') || '[]'); }
    catch (e) { return []; }
  }
  function saveFavs(arr) {
    try { localStorage.setItem('ec_favs', JSON.stringify(arr)); } catch (e) {}
  }
  function isFav(path) { return getFavs().includes(path); }
  function toggleFav(path) {
    let favs = getFavs();
    if (favs.includes(path)) {
      favs = favs.filter(f => f !== path);
    } else {
      favs.unshift(path);
    }
    saveFavs(favs);
    return favs.includes(path);
  }

  // ── 홈 버튼 강화 ──────────────────────────────────────────
  function enhanceHomeBtn() {
    const siteNameEl = document.querySelector('.site-name');
    if (!siteNameEl) return;
    siteNameEl.innerHTML = '← 모두의계산기';
    siteNameEl.style.cursor = 'pointer';
    siteNameEl.addEventListener('click', () => { location.href = '/'; });
  }

  // ── 즐겨찾기 버튼 주입 ────────────────────────────────────
  function injectFavButton() {
    if (currentPath === '/') return;
    const header = document.querySelector('.header');
    if (!header) return;

    const active = isFav(currentPath);
    const btn = document.createElement('button');
    btn.className = 'fav-btn' + (active ? ' active' : '');
    btn.innerHTML = `<span class="fav-star">${active ? '★' : '☆'}</span><span class="fav-label">${active ? '즐겨찾기 됨' : '즐겨찾기 추가'}</span>`;
    btn.addEventListener('click', () => {
      const now = toggleFav(currentPath);
      btn.className = 'fav-btn' + (now ? ' active' : '');
      btn.querySelector('.fav-star').textContent = now ? '★' : '☆';
      btn.querySelector('.fav-label').textContent = now ? '즐겨찾기 됨' : '즐겨찾기 추가';
    });
    header.appendChild(btn);
  }

  // ── 관련 계산기 주입 ──────────────────────────────────────
  function injectRelated() {
    if (currentPath === '/') return;
    const currentCalc = CALC_LIST.find(c => c.path === currentPath);
    const currentCat = currentCalc ? currentCalc.cat : '';

    // 같은 카테고리 우선, 그 다음 인기 계산기
    let related = CALC_LIST.filter(c => c.path !== currentPath && c.cat === currentCat).slice(0, 4);
    if (related.length < 4) {
      const popular = ['/salary', '/age', '/weekly_holiday', '/retirement', '/loan', '/bmi', '/exchange', '/unemployment'];
      for (const p of popular) {
        if (related.length >= 4) break;
        const c = CALC_LIST.find(x => x.path === p && x.path !== currentPath && !related.includes(x));
        if (c) related.push(c);
      }
    }
    related = related.slice(0, 4);

    const section = document.createElement('div');
    section.className = 'related-section';
    section.innerHTML = `
      <div class="related-title">다른 계산기 보기</div>
      <div class="related-grid">
        ${related.map(c => `
          <a href="${c.path}" class="related-card">
            <span class="rc-emoji">${c.emoji}</span>
            <span>${c.title}</span>
          </a>
        `).join('')}
      </div>
    `;

    // share-section 앞에 삽입
    const shareSection = document.querySelector('.share-section');
    if (shareSection) shareSection.before(section);
    else {
      const container = document.querySelector('.container');
      if (container) container.appendChild(section);
    }
  }

  // ── 플로팅 메모장 ─────────────────────────────────────────
  function injectNotepad() {
    const fab = document.createElement('button');
    fab.className = 'memo-fab';
    fab.title = '메모장';
    fab.textContent = '📝';

    const panel = document.createElement('div');
    panel.className = 'memo-panel';
    panel.innerHTML = `
      <div class="memo-panel-title">
        <span>📝 메모장</span>
        <button class="memo-clear" id="memoClear">지우기</button>
      </div>
      <textarea class="memo-textarea" id="memoArea" placeholder="여기에 메모하세요 (저장안됨)"></textarea>
      <div class="memo-hint">⚠️ 페이지 이동 시 내용이 사라집니다</div>
    `;

    document.body.appendChild(panel);
    document.body.appendChild(fab);

    fab.addEventListener('click', () => {
      panel.classList.toggle('open');
      fab.textContent = panel.classList.contains('open') ? '✕' : '📝';
    });
    document.getElementById('memoClear').addEventListener('click', () => {
      document.getElementById('memoArea').value = '';
    });
  }

  // ── 초기화 ────────────────────────────────────────────────
  function init() {
    enhanceHomeBtn();
    injectFavButton();
    injectRelated();
    injectNotepad();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ── 외부 노출 (index.html에서 즐겨찾기 렌더링용) ──────────
  window.__common = { CALC_LIST, getFavs, isFav };

})();
