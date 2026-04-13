// ═══════════════════════════════════════════════
//  모두의계산기 common.js  v4
//  이 파일 하나만 수정하면 전체 반영됩니다
// ═══════════════════════════════════════════════

// Google Analytics
(function(){
  var s=document.createElement('script');
  s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id=G-E7GYSXR7WJ';
  document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  window.gtag=gtag;
  gtag('js',new Date());
  gtag('config','G-E7GYSXR7WJ');
})();

(function () {

  // ① 설정값 ─ 여기만 바꾸면 전체 반영
  var CFG = {
    sideLeft:       'calc(50% + 390px)',
    sideTop:        360,
    panelWidth:     300,
    dialColor:      'linear-gradient(135deg,#667eea,#764ba2)',
    dialShadow:     '0 4px 20px rgba(102,126,234,0.5)',
    dialOpenColor:  'linear-gradient(135deg,#ff6b6b,#ee0979)',
    dialOpenShadow: '0 4px 20px rgba(238,9,121,0.4)',
    favAdd:     '☆ 자주 쓰는 계산기 추가',
    favAdded:   '★ 자주 쓰는 계산기',
    favToastAdd:'📌 자주 쓰는 계산기에 추가됨',
    favToastDel:'자주 쓰는 계산기에서 제거됐습니다',
    favMax: 9,
  };

  // ② 계산기 목록
  var CALC_LIST = [
    {title:'연봉 실수령액', path:'/salary',          emoji:'💰'},
    {title:'퇴직금',        path:'/retirement',       emoji:'🏦'},
    {title:'대출 이자',     path:'/loan',             emoji:'🏠'},
    {title:'실업급여',      path:'/unemployment',     emoji:'📋'},
    {title:'적금 만기',     path:'/savings',          emoji:'💳'},
    {title:'청년미래적금', path:'/cheongmirae',      emoji:'🌱'},
    {title:'수면 계산기',  path:'/sleep',            emoji:'😴'},
    {title:'유튜브 수익',  path:'/youtube',          emoji:'▶️'},
    {title:'물가상승률',    path:'/inflation',        emoji:'📈'},
    {title:'국민연금',      path:'/pension',          emoji:'👴'},
    {title:'중개수수료',    path:'/realestate',       emoji:'🏡'},
    {title:'취득세',        path:'/acquisition',      emoji:'🏢'},
    {title:'양도소득세',    path:'/capital_gains',    emoji:'📊'},
    {title:'증여세·상속세', path:'/gift_tax',         emoji:'🎁'},
    {title:'전월세 전환율', path:'/rent_conversion',  emoji:'🔄'},
    {title:'만 나이',       path:'/age',              emoji:'🎂'},
    {title:'디데이',        path:'/dday',             emoji:'📅'},
    {title:'영문 주소변환', path:'/address_converter',emoji:'📮'},
    {title:'관세',          path:'/customs',          emoji:'✈️'},
    {title:'골프 핸디캡',   path:'/golf_handicap',   emoji:'⛳'},
    {title:'날짜 계산',      path:'/date_diff',        emoji:'📆'},
    {title:'자동차 취득세',  path:'/car_tax',           emoji:'🚗'},
    {title:'연비 계산',      path:'/fuel_economy',      emoji:'⛽'},
    {title:'평↔제곱미터',  path:'/area_converter',   emoji:'📐'},
    {title:'cm↔inch',      path:'/cm_inch',          emoji:'📏'},
    {title:'BMI',           path:'/bmi',              emoji:'⚖️'},
    {title:'기초대사량',    path:'/bmr',              emoji:'🔥'},
    {title:'임신 주수',     path:'/pregnancy',        emoji:'🤱'},
    {title:'혈압 정상범위', path:'/blood_pressure',   emoji:'❤️'},
    {title:'칼로리',        path:'/calorie',          emoji:'🥗'},
    {title:'환율',          path:'/exchange',         emoji:'💱'},
    {title:'주휴수당',      path:'/weekly_holiday',   emoji:'📅'},
    {title:'시급→월급',     path:'/hourly_salary',    emoji:'⏰'},
    {title:'연차수당',      path:'/annual_leave',     emoji:'🌴'},
    {title:'주식 수익률',   path:'/stock_return',     emoji:'📉'},
    {title:'부가가치세',    path:'/vat',              emoji:'🧾'},
    {title:'마진율',        path:'/margin',           emoji:'💹'},
    {title:'건강보험료',    path:'/health_insurance', emoji:'🏥'},
    {title:'소득세',        path:'/income_tax',       emoji:'🧮'},
    {title:'로또 당첨금',   path:'/lotto',            emoji:'🎱'},
    {title:'아이 예상키',   path:'/child_height',     emoji:'📏'},
    {title:'육아휴직 급여', path:'/parental_leave',   emoji:'👶'},
    {title:'출산휴가 급여', path:'/maternity_leave',  emoji:'🤱'},
    {title:'프리랜서 세금', path:'/freelancer_tax',   emoji:'💼'},
    {title:'증여세 절세',   path:'/gift_tax_sim',     emoji:'🎁'},
    {title:'대출 한도',     path:'/loan_limit',       emoji:'🏦'},
    {title:'연차 일수',     path:'/annual_leave_hr',  emoji:'📅'},
    {title:'급여명세서',    path:'/salary_slip',      emoji:'📄'},
    {title:'복리 계산기',   path:'/compound',         emoji:'📈'},
    {title:'법인세',        path:'/corporate_tax',    emoji:'🏢'},
    {title:'사업자 부가세', path:'/vat_biz',          emoji:'🧾'},
    {title:'전세자금대출',  path:'/jeonse_loan',      emoji:'🏠'},
    {title:'보험료',        path:'/insurance',        emoji:'🛡️'},
    {title:'퇴직연금',      path:'/retirement_pension',emoji:'💼'},
    {title:'자동차 할부',   path:'/car_installment',  emoji:'💳'},
    {title:'장기렌트·리스', path:'/car_lease',        emoji:'🚗'},
    {title:'청약 가점',     path:'/cheongak',         emoji:'🏆'},
    {title:'배란일·가임기', path:'/ovulation',        emoji:'🗓️'},
    {title:'원가 계산기',   path:'/product_cost',     emoji:'🏷️'},
    {title:'영업이익',      path:'/operating_profit', emoji:'📊'},
    {title:'손익분기점',    path:'/breakeven',        emoji:'⚖️'},
    {title:'배달앱 수수료', path:'/delivery_fee',     emoji:'🛵'},
    {title:'카드 수수료',   path:'/card_fee',         emoji:'💳'},
    {title:'임대 수익률',   path:'/rent_yield',       emoji:'🏘️'},
    {title:'알바 인건비',   path:'/part_time_cost',   emoji:'👥'},
    {title:'환불 계산기',   path:'/refund',           emoji:'💸'},
  {path:'/etf_return',       title:'ETF 수익률 계산기',    emoji:'📊'},
  {path:'/dividend',         title:'배당금 수익률 계산기',  emoji:'💵'},
  {path:'/mortgage',         title:'주택담보대출',          emoji:'🏠'},
  {path:'/retirement_plan',  title:'은퇴 계획',             emoji:'🌅'},
  {path:'/net_worth',        title:'순자산 계산기',         emoji:'💎'},
  {path:'/fasting',          title:'간헐적 단식',           emoji:'⏱'},
  {path:'/remodeling',       title:'리모델링 비용',         emoji:'🏗'},
  {path:'/timezone',         title:'시간대 변환기',         emoji:'🌍'},
  {path:'/student_loan',     title:'학자금 대출',           emoji:'🎓'},
  {path:'/freelancer_rate',  title:'프리랜서 요금',         emoji:'💻'},
  ];

  // 최근 업데이트 내역 — 새 업데이트 시 맨 앞에 추가, 5개 유지 권장
  var UPDATES = [
    { date:'2026.04', title:'근로장려금 계산기',   desc:'신규 계산기 오픈',                path:'/earned_credit'    },
    { date:'2026.04', title:'기준중위소득 계산기', desc:'신규 계산기 오픈',                path:'/median_income'    },
    { date:'2026.03', title:'실업급여 계산기',     desc:'2026년 상·하한액 반영',           path:'/unemployment'     },
    { date:'2026.03', title:'연봉 실수령액',       desc:'최저임금 10,320원 기준 업데이트', path:'/salary'           },
    { date:'2026.03', title:'건강보험료',          desc:'2026년 요율 3.595% 반영',         path:'/health_insurance' },
  ];

  var POPULAR = ['/salary','/age','/weekly_holiday','/bmi','/exchange',
                 '/unemployment','/area_converter','/pension','/calorie','/blood_pressure'];

  var PATH = location.pathname.replace(/\/$/, '') || '/';
  var IS_HOME = PATH === '/';

  // ③ 유틸
  function getFavs() { try { return JSON.parse(localStorage.getItem('ec_favs') || '[]'); } catch(e) { return []; } }
  function setFavs(f) { try { localStorage.setItem('ec_favs', JSON.stringify(f)); } catch(e) {} }
  function isFav(p) { return getFavs().includes(p); }
  function showToast(msg) {
    var t = document.getElementById('ec-toast');
    if (!t) return;
    t.textContent = msg;
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(function() { t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(20px)'; }, 2600);
  }

  // ④ CSS
  function injectCSS() {
    if (document.getElementById('ec-common-css')) return;
    var s = document.createElement('style');
    s.id = 'ec-common-css';
    s.textContent =
      '#ec-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);background:#161b22;border:1px solid rgba(0,212,170,0.4);color:#e6edf3;padding:10px 18px;border-radius:30px;font-size:13px;font-weight:600;opacity:0;transition:all 0.3s;pointer-events:none;z-index:99999;font-family:\'Noto Sans KR\',sans-serif;white-space:nowrap}' +
      '#ec-fav{display:inline-flex;align-items:center;gap:5px;border:1px solid #30363d;border-radius:30px;padding:7px 14px;font-size:13px;font-weight:600;color:#8b949e;cursor:pointer;background:transparent;margin-top:10px;font-family:\'Noto Sans KR\',sans-serif;transition:all 0.2s}' +
      '#ec-fav:hover{border-color:#ffd700;color:#ffd700}' +
      '#ec-fav.active{border-color:#ffd700;color:#ffd700;background:rgba(255,215,0,0.08)}' +
      /* ── Speed Dial ── */
      '#ec-side{position:fixed;left:' + CFG.sideLeft + ';top:' + CFG.sideTop + 'px;z-index:9990;width:52px}' +
      '#ec-fab-main{width:52px;height:52px;border-radius:50%;border:none;cursor:pointer;background:' + CFG.dialColor + ';box-shadow:' + CFG.dialShadow + ';font-size:24px;display:flex;align-items:center;justify-content:center;transition:background 0.25s,transform 0.25s,box-shadow 0.25s;position:relative;z-index:2}' +
      '#ec-fab-main.open{background:' + CFG.dialOpenColor + ';transform:rotate(90deg);box-shadow:' + CFG.dialOpenShadow + '}' +
      '#ec-fab-sub{position:absolute;bottom:60px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px}' +
      '.ec-sub-btn{width:44px;height:44px;border-radius:50%;border:1px solid #30363d;cursor:pointer;font-size:20px;display:flex;align-items:center;justify-content:center;background:#21262d;box-shadow:0 2px 8px rgba(0,0,0,0.3);opacity:0;transform:scale(0.5) translateY(6px);transition:opacity 0.2s,transform 0.2s;pointer-events:none}' +
      '#ec-fab-sub.open .ec-sub-btn{opacity:1;transform:scale(1) translateY(0);pointer-events:auto}' +
      '#ec-fab-sub.open .ec-sub-btn:nth-child(3){transition-delay:0.03s}' +
      '#ec-fab-sub.open .ec-sub-btn:nth-child(2){transition-delay:0.07s}' +
      '#ec-fab-sub.open .ec-sub-btn:nth-child(1){transition-delay:0.11s}' +
      '.ec-sub-btn:hover{background:#30363d}' +
      '.ec-sub-btn.active{background:rgba(0,212,170,0.15)!important;border-color:rgba(0,212,170,0.4)}' +
      /* ── 공통 패널 ── */
      '#ec-memo-box,#ec-update-box{display:none;position:fixed;left:' + CFG.sideLeft + ';top:' + (CFG.sideTop + 70) + 'px;width:' + CFG.panelWidth + 'px;background:#161b22;border:1px solid #30363d;border-radius:14px;padding:14px;z-index:9989;box-shadow:0 8px 32px rgba(0,0,0,0.5);max-height:calc(100vh - ' + (CFG.sideTop + 90) + 'px);overflow-y:auto}' +
      '#ec-memo-box.open,#ec-update-box.open{display:block}' +
      '#ec-memo-ta{width:100%;height:160px;background:#0d1117;border:1px solid #30363d;border-radius:8px;padding:10px;color:#e6edf3;font-size:12px;font-family:\'Noto Sans KR\',sans-serif;line-height:1.7;resize:none;outline:none;box-sizing:border-box}' +
      '#ec-memo-ta:focus{border-color:rgba(0,212,170,0.35)}' +
      /* ── 업데이트 패널 ── */
      '.ec-update-item{display:flex;align-items:flex-start;justify-content:space-between;padding:8px 0;border-bottom:1px solid #21262d;text-decoration:none}' +
      '.ec-update-item:last-child{border-bottom:none}' +
      '.ec-update-title{font-size:13px;font-weight:700;color:#e6edf3;line-height:1.3;transition:color 0.15s}' +
      '.ec-update-item:hover .ec-update-title{color:#00d4aa}' +
      '.ec-update-date{font-size:10px;color:#484f58;margin-bottom:2px}' +
      '.ec-update-desc{font-size:11px;color:#8b949e;margin-top:2px}' +
      '.ec-update-arrow{color:#484f58;font-size:14px;padding-top:4px;flex-shrink:0}' +
      '#ec-related{max-width:640px;margin:32px auto 0;padding:0 20px}' +
      '.ec-rel-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}' +
      '.ec-rel-card{display:flex;flex-direction:column;align-items:center;gap:4px;padding:11px 6px;background:#161b22;border:1px solid #30363d;border-radius:11px;text-decoration:none;color:#8b949e;font-size:11px;font-weight:600;font-family:\'Noto Sans KR\',sans-serif;text-align:center;line-height:1.3;transition:all 0.2s}' +
      '.ec-rel-card:hover{border-color:rgba(0,212,170,0.4);color:#e6edf3;transform:translateY(-2px)}' +
      '.ec-rel-emoji{font-size:18px}' +
      '.ec-comma{display:block;font-size:11px;color:#00d4aa;font-weight:700;margin-top:3px;min-height:16px;font-family:\'Noto Sans KR\',sans-serif}' +
      '.rel-section{max-width:640px;margin:32px auto 8px;padding:0 20px;box-sizing:border-box}' +
      '.rel-grid{grid-template-columns:repeat(5,1fr)!important}' +
      '@media(max-width:1100px){' +
        '#ec-side{left:auto!important;right:20px;top:' + CFG.sideTop + 'px}' +
        '#ec-memo-box,#ec-update-box{left:auto!important;right:20px;top:' + (CFG.sideTop + 70) + 'px;width:calc(min(100vw - 40px,' + CFG.panelWidth + 'px))}' +
        '#ec-fav{font-size:12px;padding:6px 12px}' +
        '.ec-rel-grid{grid-template-columns:repeat(3,1fr)}' +
        '.rel-grid{grid-template-columns:repeat(5,1fr)!important}' +
      '}' +
      '@media(max-width:500px){' +
        '.rel-grid{grid-template-columns:repeat(4,1fr)!important}' +
      '}';
    document.head.appendChild(s);
  }

  // ⑤ 토스트
  function injectToast() {
    if (document.getElementById('ec-toast')) return;
    var t = document.createElement('div');
    t.id = 'ec-toast';
    document.body.appendChild(t);
  }

  // ⑥ 자주 쓰는 계산기 버튼
  function injectFavBtn() {
    if (IS_HOME) return;
    var existing = document.getElementById('ec-fav');
    if (existing) { updateFavBtn(); return; }
    var h1 = document.querySelector('h1');
    if (!h1) return;
    var btn = document.createElement('button');
    btn.id = 'ec-fav';
    btn.onclick = toggleFav;
    h1.parentNode.insertBefore(btn, h1.nextSibling);
    updateFavBtn();
  }
  function updateFavBtn() {
    var btn = document.getElementById('ec-fav');
    if (!btn) return;
    var active = isFav(PATH);
    btn.textContent = active ? CFG.favAdded : CFG.favAdd;
    btn.className = active ? 'active' : '';
  }
  function toggleFav() {
    var f = getFavs(), has = f.includes(PATH);
    if (has) f = f.filter(function(x){ return x !== PATH; });
    else f.unshift(PATH);
    setFavs(f);
    updateFavBtn();
    showToast(has ? CFG.favToastDel : CFG.favToastAdd);
  }

  // ⑦ Speed Dial 사이드 패널
  function injectSidePanel() {
    if (IS_HOME || document.getElementById('ec-side')) return;

    var side = document.createElement('div');
    side.id = 'ec-side';

    // 서브 버튼 컨테이너 (절대 위치로 메인 버튼 위에 표시)
    var sub = document.createElement('div');
    sub.id = 'ec-fab-sub';

    var updateBtn = document.createElement('button');
    updateBtn.id = 'ec-fab-update'; updateBtn.className = 'ec-sub-btn';
    updateBtn.innerHTML = '❓'; updateBtn.title = '업데이트 내역';
    updateBtn.onclick = function(e) { e.stopPropagation(); toggleUpdate(); };

    var calcBtn = document.createElement('button');
    calcBtn.id = 'ec-fab-calc'; calcBtn.className = 'ec-sub-btn';
    calcBtn.innerHTML = '🔢'; calcBtn.title = '계산기';
    calcBtn.onclick = function(e) { e.stopPropagation(); if (window.__calc) window.__calc.togglePanel(); };

    var memoBtn = document.createElement('button');
    memoBtn.id = 'ec-fab-memo'; memoBtn.className = 'ec-sub-btn';
    memoBtn.innerHTML = '📝'; memoBtn.title = '메모';
    memoBtn.onclick = function(e) { e.stopPropagation(); toggleMemo(); };

    sub.appendChild(updateBtn);
    sub.appendChild(calcBtn);
    sub.appendChild(memoBtn);

    // 메인 🛠️ 버튼
    var main = document.createElement('button');
    main.id = 'ec-fab-main'; main.innerHTML = '🛠️'; main.title = '도구함';
    main.onclick = function(e) { e.stopPropagation(); toggleDial(); };

    side.appendChild(sub);
    side.appendChild(main);
    side.addEventListener('click', function(e) { e.stopPropagation(); });
    document.body.appendChild(side);

    // 메모 패널
    var memoBox = document.createElement('div');
    memoBox.id = 'ec-memo-box';
    memoBox.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
        '<span style="font-size:11px;font-weight:700;color:#8b949e">📝 메모 (이동해도 유지)</span>' +
        '<button id="ec-memo-clr" style="font-size:11px;color:#484f58;cursor:pointer;background:none;border:none;font-family:inherit">지우기</button>' +
      '</div>' +
      '<textarea id="ec-memo-ta" placeholder="여기에 메모하세요"></textarea>' +
      '<div style="font-size:10px;color:#484f58;margin-top:5px;text-align:right">브라우저 종료해도 유지됩니다</div>';
    memoBox.addEventListener('click', function(e) { e.stopPropagation(); });
    document.body.appendChild(memoBox);

    // 업데이트 패널
    var updBox = document.createElement('div');
    updBox.id = 'ec-update-box';
    updBox.innerHTML = buildUpdatePanel();
    updBox.addEventListener('click', function(e) { e.stopPropagation(); });
    document.body.appendChild(updBox);

    try { var v = localStorage.getItem('ec_memo'); if (v) document.getElementById('ec-memo-ta').value = v; } catch(e) {}
    document.getElementById('ec-memo-ta').addEventListener('input', function() { try { localStorage.setItem('ec_memo', this.value); } catch(e) {} });
    document.getElementById('ec-memo-clr').addEventListener('click', function() { document.getElementById('ec-memo-ta').value = ''; try { localStorage.removeItem('ec_memo'); } catch(e) {} });

    // 바깥 클릭 시 전체 닫기
    document.addEventListener('click', closeDial);
  }

  function buildUpdatePanel() {
    var html = '<div style="font-size:11px;font-weight:700;color:#8b949e;margin-bottom:10px">🔔 최근 업데이트</div>';
    UPDATES.forEach(function(u) {
      html +=
        '<a href="' + u.path + '" class="ec-update-item">' +
          '<div>' +
            '<div class="ec-update-date">' + u.date + '</div>' +
            '<div class="ec-update-title">' + u.title + '</div>' +
            '<div class="ec-update-desc">' + u.desc + '</div>' +
          '</div>' +
          '<span class="ec-update-arrow">›</span>' +
        '</a>';
    });
    return html;
  }

  function toggleDial() {
    var sub = document.getElementById('ec-fab-sub');
    var main = document.getElementById('ec-fab-main');
    if (!sub) return;
    var isOpen = sub.classList.toggle('open');
    main.classList.toggle('open', isOpen);
    if (!isOpen) closeAllPanels();
  }

  function closeDial() {
    var sub = document.getElementById('ec-fab-sub');
    var main = document.getElementById('ec-fab-main');
    if (!sub || !sub.classList.contains('open')) return;
    sub.classList.remove('open');
    main.classList.remove('open');
    closeAllPanels();
  }

  function closeAllPanels() {
    var memo = document.getElementById('ec-memo-box');
    var upd  = document.getElementById('ec-update-box');
    if (memo) memo.classList.remove('open');
    if (upd)  upd.classList.remove('open');
    if (window.__calc && window.__calc.closePanel) window.__calc.closePanel();
    ['ec-fab-memo','ec-fab-calc','ec-fab-update'].forEach(function(id) {
      var b = document.getElementById(id); if (b) b.classList.remove('active');
    });
  }

  function toggleMemo() {
    var box = document.getElementById('ec-memo-box');
    var btn = document.getElementById('ec-fab-memo');
    if (!box) return;
    var isOpen = box.classList.toggle('open');
    if (isOpen) {
      var upd = document.getElementById('ec-update-box');
      if (upd) upd.classList.remove('open');
      if (window.__calc && window.__calc.closePanel) window.__calc.closePanel();
      document.getElementById('ec-fab-update').classList.remove('active');
      document.getElementById('ec-fab-calc').classList.remove('active');
      document.getElementById('ec-memo-ta').focus();
    }
    if (btn) btn.classList.toggle('active', isOpen);
  }

  function toggleUpdate() {
    var box = document.getElementById('ec-update-box');
    var btn = document.getElementById('ec-fab-update');
    if (!box) return;
    var isOpen = box.classList.toggle('open');
    if (isOpen) {
      var memo = document.getElementById('ec-memo-box');
      if (memo) memo.classList.remove('open');
      if (window.__calc && window.__calc.closePanel) window.__calc.closePanel();
      document.getElementById('ec-fab-memo').classList.remove('active');
      document.getElementById('ec-fab-calc').classList.remove('active');
    }
    if (btn) btn.classList.toggle('active', isOpen);
  }

  // ⑧ 관련 계산기 (카드 5개 제한만 담당 — 위치 이동은 share.js에서 처리)
  function injectRelated() {
    setTimeout(function(){
      var rel = document.querySelector('.rel-section');
      if (!rel) return;
      var cards = rel.querySelectorAll('.rel-card');
      while (cards.length > 5) {
        cards[cards.length - 1].remove();
        cards = rel.querySelectorAll('.rel-card');
      }
    }, 100);
  }

  // ⑨ 콤마 표시 (금액 단위만: 원/만원, 나이/퍼센트/년 등은 제외)
  var SKIP_UNITS = ['세','년','개월','%','일','kg','cm','m','ft','in','평','㎡','bpm'];
  function injectComma() {
    if (IS_HOME) return;
    document.querySelectorAll('input[type="number"]').forEach(function(inp){
      if (inp.dataset.ecComma) return;
      // 형제 단위 레이블 확인
      var wrapper = inp.parentNode;
      if (wrapper) {
        var unitEl = wrapper.querySelector('.input-unit');
        if (unitEl) {
          var unitText = unitEl.textContent.trim();
          // 금액 단위면 통과, 아니면 건너뜀
          var isAmount = unitText === '원' || unitText === '만원' || unitText === '억원';
          if (!isAmount) return;
        }
      }
      inp.dataset.ecComma = '1';
      var lbl = document.createElement('span');
      lbl.className = 'ec-comma';
      inp.parentNode.insertBefore(lbl, inp.nextSibling);
      function fmt(){ var v=parseFloat(inp.value); lbl.textContent=isNaN(v)?'':v.toLocaleString('ko-KR')+'원'; }
      inp.addEventListener('input', fmt);
      inp.addEventListener('change', fmt);
      fmt();
    });
  }

  // ⑩ 홈 렌더링 - index.html의 renderFavSection이 담당
  function renderHomeFavs() { return; }

  // ⑪ 실행
  function init() {
    injectCSS();
    injectToast();
    if (IS_HOME) {
      renderHomeFavs();
    } else {
      injectFavBtn();
      injectSidePanel();
      injectRelated();
      injectComma();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.__common = { CALC_LIST:CALC_LIST, getFavs:getFavs, isFav:isFav, showToast:showToast };

  // ─── canonical 태그 자동 주입 ────────────────────────────────────
  // 모든 페이지에 canonical을 동적 삽입합니다.
  // about.html·faq.html처럼 이미 하드코딩된 파일은 중복 방지 후 스킵합니다.
  (function injectCanonical(){
    if (document.querySelector('link[rel="canonical"]')) return; // 이미 있으면 스킵
    var base = 'https://everycalc.kr';
    var href = base + (PATH === '/' ? '' : PATH);
    var link = document.createElement('link');
    link.rel  = 'canonical';
    link.href = href;
    document.head.appendChild(link);
  })();
  // ──────────────────────────────────────────────────────────────────

  // ─── WebApplication 스키마 자동 주입 ───────────────────────────────
  // 계산기 페이지(홈·about·faq·privacy 제외)에 JSON-LD를 동적으로 삽입합니다.
  // common.js 한 곳만 수정하면 77개 전체 계산기에 일괄 반영됩니다.
  (function injectSchema(){
    var SKIP = ['/', '/about', '/faq', '/privacy'];
    if (SKIP.indexOf(PATH) !== -1) return;

    // applicationCategory 매핑
    // Schema.org 권장값: FinanceApplication / HealthApplication / UtilitiesApplication
    var HEALTH  = ['/bmi','/bmr','/calorie','/blood_pressure','/pregnancy',
                   '/ovulation','/fasting','/child_height','/sleep'];
    var UTILITY = ['/age','/dday','/date_diff','/area_converter','/cm_inch',
                   '/address_converter','/golf_handicap','/timezone','/lotto',
                   '/cm_inch','/fuel_economy'];

    var appCat = HEALTH.indexOf(PATH) !== -1  ? 'HealthApplication'  :
                 UTILITY.indexOf(PATH) !== -1 ? 'UtilitiesApplication' :
                                                'FinanceApplication';

    // 현재 페이지의 CALC_LIST 항목 찾기 (제목 추출용)
    var cur = null;
    for (var i = 0; i < CALC_LIST.length; i++) {
      if (CALC_LIST[i].path === PATH) { cur = CALC_LIST[i]; break; }
    }

    // <title> 태그에서 이름 추출 (CALC_LIST에 없는 신규 페이지도 커버)
    var rawTitle = document.title || '';
    var calcName = cur ? cur.title :
                   rawTitle.replace(/\s*[\|·\-–]\s*모두의계산기.*$/, '').trim();
    if (!calcName) return; // 제목 없으면 스킵

    // "계산기" 중복 방지
    var fullName = /계산기|계산|변환기/.test(calcName) ? calcName : calcName + ' 계산기';

    var schema = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': fullName,
      'url': 'https://everycalc.kr' + PATH,
      'applicationCategory': appCat,
      'operatingSystem': 'Web',
      'inLanguage': 'ko',
      'isAccessibleForFree': true,
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'KRW'
      },
      'provider': {
        '@type': 'Organization',
        'name': '모두의계산기',
        'url': 'https://everycalc.kr'
      }
    };

    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(s);
  })();
  // ──────────────────────────────────────────────────────────────────

})();
