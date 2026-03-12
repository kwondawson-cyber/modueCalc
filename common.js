// ═══════════════════════════════════════════════
//  모두의계산기 common.js  v4
//  이 파일 하나만 수정하면 전체 반영됩니다
// ═══════════════════════════════════════════════
(function () {

  // ① 설정값 ─ 여기만 바꾸면 전체 반영
  var CFG = {
    sideLeft:       'calc(50% + 390px)',
    sideTop:        360,
    panelWidth:     300,
    memoColor:      'linear-gradient(135deg,#667eea,#764ba2)',
    memoShadow:     '0 4px 20px rgba(102,126,234,0.5)',
    memoOpenColor:  'linear-gradient(135deg,#ff6b6b,#ee0979)',
    memoOpenShadow: '0 4px 20px rgba(238,9,121,0.4)',
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
    {title:'프리랜서 세금', path:'/freelancer_tax',   emoji:'💼'},
    {title:'증여세 절세',   path:'/gift_tax_sim',     emoji:'🎁'},
    {title:'대출 한도',     path:'/loan_limit',       emoji:'🏦'},
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
      '#ec-side{position:fixed;left:' + CFG.sideLeft + ';top:' + CFG.sideTop + 'px;z-index:9990;display:flex;flex-direction:column;gap:8px}' +
      '#ec-memo-box{display:none;position:fixed;left:' + CFG.sideLeft + ';bottom:calc(100vh - ' + CFG.sideTop + 'px);width:' + CFG.panelWidth + 'px;background:#161b22;border:1px solid #30363d;border-radius:14px;padding:14px;z-index:9989;box-shadow:0 8px 32px rgba(0,0,0,0.5)}' +
      '#ec-memo-box.open{display:block}' +
      '#ec-memo-ta{width:100%;height:240px;background:#0d1117;border:1px solid #30363d;border-radius:8px;padding:10px;color:#e6edf3;font-size:12px;font-family:\'Noto Sans KR\',sans-serif;line-height:1.7;resize:none;outline:none;box-sizing:border-box}' +
      '#ec-memo-ta:focus{border-color:rgba(0,212,170,0.35)}' +
      '#ec-related{max-width:640px;margin:32px auto 0;padding:0 20px}' +
      '.ec-rel-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}' +
      '.ec-rel-card{display:flex;flex-direction:column;align-items:center;gap:4px;padding:11px 6px;background:#161b22;border:1px solid #30363d;border-radius:11px;text-decoration:none;color:#8b949e;font-size:11px;font-weight:600;font-family:\'Noto Sans KR\',sans-serif;text-align:center;line-height:1.3;transition:all 0.2s}' +
      '.ec-rel-card:hover{border-color:rgba(0,212,170,0.4);color:#e6edf3;transform:translateY(-2px)}' +
      '.ec-rel-emoji{font-size:18px}' +
      '.ec-comma{display:block;font-size:11px;color:#00d4aa;font-weight:700;margin-top:3px;min-height:16px;font-family:\'Noto Sans KR\',sans-serif}' +
      '@media(max-width:1100px){' +
        '#ec-side{left:auto!important;right:20px;top:' + CFG.sideTop + 'px}' +
        '#ec-memo-box{left:auto!important;right:20px;bottom:calc(100vh - ' + CFG.sideTop + 'px);width:calc(min(100vw - 40px,' + CFG.panelWidth + 'px))}' +
        '#ec-fav{font-size:12px;padding:6px 12px}' +
        '.ec-rel-grid{grid-template-columns:repeat(3,1fr)}' +
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

  // ⑦ 사이드 패널
  function injectSidePanel() {
    if (IS_HOME || document.getElementById('ec-side')) return;
    var side = document.createElement('div');
    side.id = 'ec-side';
    var memoBtn = document.createElement('button');
    memoBtn.id = 'ec-memo-btn';
    memoBtn.style.cssText = 'display:inline-flex;align-items:center;gap:8px;height:52px;padding:0 20px;border-radius:30px;font-size:14px;font-weight:700;font-family:\'Noto Sans KR\',sans-serif;cursor:pointer;white-space:nowrap;border:none;color:#fff;transition:all 0.2s;background:' + CFG.memoColor + ';box-shadow:' + CFG.memoShadow;
    memoBtn.innerHTML = '📝 <span>메모</span>';
    memoBtn.onclick = toggleMemo;
    side.appendChild(memoBtn);
    document.body.appendChild(side);

    var box = document.createElement('div');
    box.id = 'ec-memo-box';
    box.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
        '<span style="font-size:11px;font-weight:700;color:#8b949e">📝 메모 (이동해도 유지)</span>' +
        '<button id="ec-memo-clr" style="font-size:11px;color:#484f58;cursor:pointer;background:none;border:none;font-family:inherit">지우기</button>' +
      '</div>' +
      '<textarea id="ec-memo-ta" placeholder="여기에 메모하세요"></textarea>' +
      '<div style="font-size:10px;color:#484f58;margin-top:5px;text-align:right">브라우저 종료해도 유지됩니다</div>';
    document.body.appendChild(box);

    try { var v = localStorage.getItem('ec_memo'); if(v) document.getElementById('ec-memo-ta').value = v; } catch(e) {}
    document.getElementById('ec-memo-ta').addEventListener('input', function(){ try{ localStorage.setItem('ec_memo', this.value); }catch(e){} });
    document.getElementById('ec-memo-clr').addEventListener('click', function(){ document.getElementById('ec-memo-ta').value=''; try{ localStorage.removeItem('ec_memo'); }catch(e){} });
  }
  function toggleMemo() {
    var box = document.getElementById('ec-memo-box');
    var btn = document.getElementById('ec-memo-btn');
    var open = box.classList.toggle('open');
    btn.style.background  = open ? CFG.memoOpenColor  : CFG.memoColor;
    btn.style.boxShadow   = open ? CFG.memoOpenShadow : CFG.memoShadow;
    btn.querySelector('span').textContent = open ? '닫기' : '메모';
    if (open) document.getElementById('ec-memo-ta').focus();
  }

  // ⑧ 관련 계산기
  function injectRelated() {
    if (IS_HOME || document.getElementById('ec-related')) return;
    var others = CALC_LIST.filter(function(c){ return c.path !== PATH; });
    others.sort(function(a,b){ var ai=POPULAR.indexOf(a.path),bi=POPULAR.indexOf(b.path); return (ai<0?99:ai)-(bi<0?99:bi); });
    var wrap = document.createElement('div');
    wrap.id = 'ec-related';
    wrap.innerHTML =
      '<div style="font-size:12px;font-weight:700;color:#8b949e;letter-spacing:1px;margin-bottom:10px;text-align:center;font-family:\'Noto Sans KR\',sans-serif">다른 계산기 보기</div>' +
      '<div class="ec-rel-grid">' +
      others.slice(0,4).map(function(c){
        return '<a href="'+c.path+'" class="ec-rel-card"><span class="ec-rel-emoji">'+c.emoji+'</span><span>'+c.title+'</span></a>';
      }).join('') +
      '</div>';
    setTimeout(function(){
      var share = document.querySelector('.share-section');
      if (share && share.parentNode) share.parentNode.insertBefore(wrap, share.nextSibling);
      else { var con = document.querySelector('.container'); (con || document.body).appendChild(wrap); }
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

  // ⑩ 홈 렌더링
  function renderHomeFavs() {
    if (!IS_HOME) return;
    var section = document.getElementById('favSection');
    var grid    = document.getElementById('favGrid');
    var countEl = document.getElementById('favCount');
    if (!section || !grid) return;
    var favs = getFavs();
    if (!favs.length) { section.style.display='none'; return; }
    section.style.display = '';
    if (countEl) countEl.textContent = favs.length;
    grid.innerHTML = '';
    favs.slice(0, CFG.favMax).forEach(function(path){
      var calc = CALC_LIST.find(function(c){ return c.path===path; });
      if (!calc) return;
      var a = document.createElement('a');
      a.href = calc.path;
      a.className = 'fav-card';
      a.innerHTML = '<span class="fav-emoji">'+calc.emoji+'</span><span>'+calc.title+'</span>';
      grid.appendChild(a);
    });
  }

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

})();
