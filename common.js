// ============================================================
// common.js v2 — 모두의계산기 공통 기능
// 홈버튼(🏠HOME) / 즐겨찾기(localStorage) / 메모(localStorage유지) / 관련계산기
// ============================================================
(function () {
  const CALC_LIST = [
    { title: '연봉 실수령액',  path: '/salary',          emoji: '💰' },
    { title: '퇴직금',        path: '/retirement',       emoji: '🏦' },
    { title: '대출 이자',     path: '/loan',             emoji: '🏠' },
    { title: '실업급여',      path: '/unemployment',     emoji: '📋' },
    { title: '적금 만기',     path: '/savings',          emoji: '💳' },
    { title: '물가상승률',    path: '/inflation',        emoji: '📈' },
    { title: '국민연금',      path: '/pension',          emoji: '👴' },
    { title: '중개수수료',    path: '/realestate',       emoji: '🏡' },
    { title: '취득세',        path: '/acquisition',      emoji: '🏢' },
    { title: '양도소득세',    path: '/capital_gains',    emoji: '📊' },
    { title: '증여세·상속세', path: '/gift_tax',         emoji: '🎁' },
    { title: '전월세 전환율', path: '/rent_conversion',  emoji: '🔄' },
    { title: '만 나이',       path: '/age',              emoji: '🎂' },
    { title: '디데이',        path: '/dday',             emoji: '📅' },
    { title: '영문 주소변환', path: '/address_converter',emoji: '📮' },
    { title: '관세',          path: '/customs',          emoji: '✈️' },
    { title: '골프 핸디캡',   path: '/golf_handicap',   emoji: '⛳' },
    { title: '평↔제곱미터',  path: '/area_converter',   emoji: '📐' },
    { title: 'cm↔inch',      path: '/cm_inch',          emoji: '📏' },
    { title: 'BMI',           path: '/bmi',              emoji: '⚖️' },
    { title: '기초대사량',    path: '/bmr',              emoji: '🔥' },
    { title: '임신 주수',     path: '/pregnancy',        emoji: '🤱' },
    { title: '혈압 정상범위', path: '/blood_pressure',   emoji: '❤️' },
    { title: '칼로리',        path: '/calorie',          emoji: '🥗' },
    { title: '환율',          path: '/exchange',         emoji: '💱' },
    { title: '주휴수당',      path: '/weekly_holiday',   emoji: '📅' },
    { title: '시급→월급',     path: '/hourly_salary',    emoji: '⏰' },
    { title: '연차수당',      path: '/annual_leave',     emoji: '🌴' },
    { title: '주식 수익률',   path: '/stock_return',     emoji: '📉' },
    { title: '부가가치세',    path: '/vat',              emoji: '🧾' },
    { title: '마진율',        path: '/margin',           emoji: '💹' },
    { title: '건강보험료',    path: '/health_insurance', emoji: '🏥' },
    { title: '소득세',        path: '/income_tax',       emoji: '🧮' },
  ];

  const currentPath = location.pathname.replace(/\/$/, '') || '/';
  const isHome = (currentPath === '/');

  function getFavs() { try { return JSON.parse(localStorage.getItem('ec_favs') || '[]'); } catch(e) { return []; } }
  function saveFavs(a) { try { localStorage.setItem('ec_favs', JSON.stringify(a)); } catch(e) {} }
  function isFav(p) { return getFavs().includes(p); }
  function toggleFav(p) {
    let f = getFavs();
    f.includes(p) ? (f = f.filter(x => x !== p)) : f.unshift(p);
    saveFavs(f); return f.includes(p);
  }
  function getMemo() { try { return localStorage.getItem('ec_memo') || ''; } catch(e) { return ''; } }
  function saveMemo(v) { try { localStorage.setItem('ec_memo', v); } catch(e) {} }

  // ── CSS ──────────────────────────────────────────────────
  const S = document.createElement('style');
  S.textContent = `
    .site-name {
      display: inline-flex !important;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      width: 56px; height: 56px;
      background: rgba(0,212,170,0.08);
      border: 1px solid rgba(0,212,170,0.3) !important;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s;
      font-family: 'Noto Sans KR', sans-serif;
      padding: 0 !important;
      font-size: 0 !important;
      color: transparent !important;
      -webkit-text-fill-color: transparent !important;
      text-decoration: none;
      letter-spacing: 0 !important;
      opacity: 1 !important;
    }
    .site-name:hover { background: rgba(0,212,170,0.18); transform: translateY(-2px); }
    .site-name .home-emoji { font-size: 21px; line-height:1; -webkit-text-fill-color:initial; color:initial; }
    .site-name .home-label { font-size:9px; font-weight:800; letter-spacing:1.5px; color:#00d4aa; -webkit-text-fill-color:#00d4aa; }

    .fav-pill {
      display: inline-flex; align-items: center; gap: 5px;
      border: 1px solid #30363d; border-radius: 30px;
      padding: 7px 14px; font-size: 13px; font-weight: 600;
      color: #8b949e; cursor: pointer; transition: all 0.2s;
      font-family: 'Noto Sans KR', sans-serif; background: transparent; margin-top: 10px;
    }
    .fav-pill:hover { border-color: #ffd700; color: #ffd700; }
    .fav-pill.active { border-color: #ffd700; color: #ffd700; background: rgba(255,215,0,0.08); }
    .fav-pill .fav-star { font-size:15px; transition:transform 0.2s; }
    .fav-pill.active .fav-star { transform:scale(1.2); }

    #top-fab-group {
      position: fixed; top: 18px; right: 18px;
      z-index: 9990; display: flex; flex-direction: column; gap: 7px; align-items: flex-end;
    }
    #memo-fab-pill {
      display: inline-flex; align-items: center; gap: 6px;
      height: 38px; padding: 0 14px; border-radius: 30px;
      font-size: 13px; font-weight: 700; font-family: 'Noto Sans KR', sans-serif;
      cursor: pointer; transition: all 0.2s; white-space: nowrap;
      background: #21262d; border: 1px solid #30363d; color: #8b949e;
    }
    #memo-fab-pill:hover { background: #30363d; color: #e6edf3; }
    #memo-fab-pill.open { background: rgba(0,212,170,0.1); border-color: rgba(0,212,170,0.4); color: #00d4aa; }

    #memo-panel {
      position: fixed; top: 64px; right: 18px; width: 268px;
      background: #161b22; border: 1px solid #30363d; border-radius: 16px;
      padding: 14px; z-index: 9989; display: none;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    }
    #memo-panel.open { display: block; }
    .memo-hdr { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
    .memo-hdr-title { font-size:11px; font-weight:700; color:#8b949e; }
    .memo-clear-btn { font-size:11px; color:#484f58; cursor:pointer; background:none; border:none; font-family:inherit; padding:2px 6px; border-radius:4px; }
    .memo-clear-btn:hover { color:#ff6b6b; }
    #memo-textarea {
      width:100%; height:165px; background:#0d1117; border:1px solid #30363d;
      border-radius:10px; padding:10px; color:#e6edf3; font-size:13px;
      font-family:'Noto Sans KR',sans-serif; line-height:1.7; resize:none; outline:none;
    }
    #memo-textarea:focus { border-color:rgba(0,212,170,0.35); }
    .memo-hint { font-size:10px; color:#484f58; margin-top:5px; text-align:right; }

    #calc-fab { position:fixed !important; top:64px !important; right:18px !important; bottom:auto !important; }
    #calc-panel { top:110px !important; right:18px !important; bottom:auto !important; }

    .related-section { max-width:640px; margin:0 auto 28px; padding:0 20px; }
    .related-title { font-size:12px; font-weight:700; color:#8b949e; letter-spacing:1px; margin-bottom:10px; text-align:center; }
    .related-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
    .related-card {
      display:flex; flex-direction:column; align-items:center; gap:4px;
      padding:11px 6px; background:#161b22; border:1px solid #30363d; border-radius:11px;
      text-decoration:none; color:#8b949e; font-size:11px; font-weight:600;
      font-family:'Noto Sans KR',sans-serif; transition:all 0.2s; text-align:center; line-height:1.3;
    }
    .related-card:hover { border-color:rgba(0,212,170,0.4); color:#e6edf3; transform:translateY(-2px); }
    .related-card .rc-emoji { font-size:18px; }

    #common-toast {
      position:fixed; bottom:24px; left:50%;
      transform:translateX(-50%) translateY(20px);
      background:#161b22; border:1px solid rgba(0,212,170,0.4);
      color:#e6edf3; padding:10px 18px; border-radius:30px;
      font-size:13px; font-weight:600; opacity:0; transition:all 0.3s;
      pointer-events:none; z-index:99999;
      font-family:'Noto Sans KR',sans-serif; white-space:nowrap;
    }
    #common-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }

    @media(max-width:600px){
      .related-grid{grid-template-columns:repeat(3,1fr)}
      #top-fab-group{top:10px;right:10px}
      #memo-panel{right:10px;width:calc(100vw - 20px);top:56px}
      #calc-fab{top:56px !important;right:10px !important}
      #calc-panel{top:102px !important;right:10px !important;width:calc(100vw - 20px) !important}
    }
  `;
  document.head.appendChild(S);

  // ── 토스트 ──────────────────────────────────────────────
  const toast = document.createElement('div');
  toast.id = 'common-toast';
  document.body.appendChild(toast);
  let toastT;
  function showToast(msg, ms = 2600) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => toast.classList.remove('show'), ms);
  }

  // ── 홈 버튼 ─────────────────────────────────────────────
  function enhanceHomeBtn() {
    const el = document.querySelector('.site-name');
    if (!el) return;
    el.innerHTML = '<span class="home-emoji">🏠</span><span class="home-label">HOME</span>';
    el.onclick = () => { location.href = '/'; };
  }

  // ── 즐겨찾기 버튼 ───────────────────────────────────────
  function injectFavBtn() {
    if (isHome) return;
    const header = document.querySelector('.header');
    if (!header) return;
    const active = isFav(currentPath);
    const btn = document.createElement('button');
    btn.className = 'fav-pill' + (active ? ' active' : '');
    btn.innerHTML = `<span class="fav-star">${active ? '★' : '☆'}</span><span class="fav-text">${active ? '즐겨찾기 됨' : '즐겨찾기 추가'}</span>`;
    btn.addEventListener('click', () => {
      const now = toggleFav(currentPath);
      btn.className = 'fav-pill' + (now ? ' active' : '');
      btn.querySelector('.fav-star').textContent = now ? '★' : '☆';
      btn.querySelector('.fav-text').textContent = now ? '즐겨찾기 됨' : '즐겨찾기 추가';
      showToast(now ? '⭐ 즐겨찾기 추가됨 · 홈 화면에서 확인' : '즐겨찾기에서 제거됐습니다');
    });
    header.appendChild(btn);
  }

  // ── 메모 ─────────────────────────────────────────────────
  function injectMemo() {
    let grp = document.getElementById('top-fab-group');
    if (!grp) { grp = document.createElement('div'); grp.id = 'top-fab-group'; document.body.appendChild(grp); }

    const pill = document.createElement('button');
    pill.id = 'memo-fab-pill';
    pill.innerHTML = '📝 <span id="memo-fab-lbl">메모</span>';
    grp.appendChild(pill);

    const panel = document.createElement('div');
    panel.id = 'memo-panel';
    panel.innerHTML = `
      <div class="memo-hdr">
        <span class="memo-hdr-title">📝 메모 (페이지 이동해도 유지)</span>
        <button class="memo-clear-btn" id="memo-clear">지우기</button>
      </div>
      <textarea id="memo-textarea" placeholder="여기에 메모하세요 (저장안됨)"></textarea>
      <div class="memo-hint">브라우저 탭 닫으면 삭제됩니다</div>`;
    document.body.appendChild(panel);

    const saved = getMemo();
    if (saved) document.getElementById('memo-textarea').value = saved;

    pill.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      pill.classList.toggle('open', open);
      document.getElementById('memo-fab-lbl').textContent = open ? '닫기' : '메모';
      if (open) document.getElementById('memo-textarea').focus();
    });
    document.getElementById('memo-textarea').addEventListener('input', e => saveMemo(e.target.value));
    document.getElementById('memo-clear').addEventListener('click', () => {
      document.getElementById('memo-textarea').value = ''; saveMemo('');
    });
  }

  // calc-fab 위치 패치
  function patchCalcFab() {
    function tryIt() {
      const fab = document.getElementById('calc-fab');
      if (!fab) return setTimeout(tryIt, 250);
      const pill = document.getElementById('memo-fab-pill');
      const top = pill ? (pill.getBoundingClientRect().bottom + window.scrollY + 8) : 64;
      fab.style.cssText += `;position:fixed!important;top:${Math.round(top)}px!important;right:18px!important;bottom:auto!important`;
    }
    setTimeout(tryIt, 400);
  }

  // ── 관련 계산기 ────────────────────────────────────────
  function injectRelated() {
    if (isHome) return;
    const popular = ['/salary','/age','/weekly_holiday','/retirement','/loan','/bmi','/exchange','/unemployment','/area_converter','/pension','/calorie','/blood_pressure','/acquisition','/income_tax'];
    const others = CALC_LIST.filter(c => c.path !== currentPath);
    const sorted = [...others].sort((a,b)=>(popular.indexOf(a.path)+1||99)-(popular.indexOf(b.path)+1||99));
    const related = sorted.slice(0,4);
    const sec = document.createElement('div');
    sec.className = 'related-section';
    sec.innerHTML = `<div class="related-title">다른 계산기 보기</div><div class="related-grid">${related.map(c=>`<a href="${c.path}" class="related-card"><span class="rc-emoji">${c.emoji}</span><span>${c.title}</span></a>`).join('')}</div>`;
    const shareSection = document.querySelector('.share-section');
    if (shareSection) shareSection.before(sec);
    else (document.querySelector('.container')||document.body).appendChild(sec);
  }

  function init() {
    enhanceHomeBtn();
    injectFavBtn();
    injectMemo();
    patchCalcFab();
    injectRelated();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.__common = { CALC_LIST, getFavs, isFav, showToast };
})();
