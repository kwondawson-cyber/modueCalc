// common.js — 모두의계산기 공통 기능
// 홈 즐겨찾기 렌더링 + 숫자 콤마 포맷
(function () {

  const CALC_LIST = [
    {title:'연봉 실수령액', path:'/salary',         emoji:'💰'},
    {title:'퇴직금',        path:'/retirement',      emoji:'🏦'},
    {title:'대출 이자',     path:'/loan',            emoji:'🏠'},
    {title:'실업급여',      path:'/unemployment',    emoji:'📋'},
    {title:'적금 만기',     path:'/savings',         emoji:'💳'},
    {title:'물가상승률',    path:'/inflation',       emoji:'📈'},
    {title:'국민연금',      path:'/pension',         emoji:'👴'},
    {title:'중개수수료',    path:'/realestate',      emoji:'🏡'},
    {title:'취득세',        path:'/acquisition',     emoji:'🏢'},
    {title:'양도소득세',    path:'/capital_gains',   emoji:'📊'},
    {title:'증여세·상속세', path:'/gift_tax',        emoji:'🎁'},
    {title:'전월세 전환율', path:'/rent_conversion', emoji:'🔄'},
    {title:'만 나이',       path:'/age',             emoji:'🎂'},
    {title:'디데이',        path:'/dday',            emoji:'📅'},
    {title:'영문 주소변환', path:'/address_converter',emoji:'📮'},
    {title:'관세',          path:'/customs',         emoji:'✈️'},
    {title:'골프 핸디캡',   path:'/golf_handicap',  emoji:'⛳'},
    {title:'평↔제곱미터',  path:'/area_converter',  emoji:'📐'},
    {title:'cm↔inch',      path:'/cm_inch',         emoji:'📏'},
    {title:'BMI',           path:'/bmi',             emoji:'⚖️'},
    {title:'기초대사량',    path:'/bmr',             emoji:'🔥'},
    {title:'임신 주수',     path:'/pregnancy',       emoji:'🤱'},
    {title:'혈압 정상범위', path:'/blood_pressure',  emoji:'❤️'},
    {title:'칼로리',        path:'/calorie',         emoji:'🥗'},
    {title:'환율',          path:'/exchange',        emoji:'💱'},
    {title:'주휴수당',      path:'/weekly_holiday',  emoji:'📅'},
    {title:'시급→월급',     path:'/hourly_salary',   emoji:'⏰'},
    {title:'연차수당',      path:'/annual_leave',    emoji:'🌴'},
    {title:'주식 수익률',   path:'/stock_return',    emoji:'📉'},
    {title:'부가가치세',    path:'/vat',             emoji:'🧾'},
    {title:'마진율',        path:'/margin',          emoji:'💹'},
    {title:'건강보험료',    path:'/health_insurance',emoji:'🏥'},
    {title:'소득세',        path:'/income_tax',      emoji:'🧮'},
  ];

  function getFavs() { try { return JSON.parse(localStorage.getItem('ec_favs')||'[]'); } catch(e) { return []; } }
  function isFav(p) { return getFavs().includes(p); }

  const isHome = (location.pathname.replace(/\/$/,'')||'/') === '/';

  // ── 홈 화면: 즐겨찾기 섹션 렌더링 ─────────────────────────
  function renderHomeFavs() {
    if (!isHome) return;
    var sec = document.getElementById('favSection');
    var grid = document.getElementById('favGrid');
    var cnt  = document.getElementById('favCount');
    if (!sec || !grid) return;
    var favs = getFavs();
    if (!favs.length) { sec.style.display='none'; return; }
    sec.style.display = '';
    if (cnt) cnt.textContent = favs.length;
    grid.innerHTML = favs.map(function(p){
      var c = CALC_LIST.find(function(x){return x.path===p;});
      if (!c) return '';
      return '<a href="'+p+'" class="calc-card" style="position:relative">'
        +'<div class="card-emoji">'+c.emoji+'</div>'
        +'<div class="card-name">'+c.title+'</div>'
        +'</a>';
    }).join('');
  }

  // ── 숫자 입력란 콤마 포맷 표시 ────────────────────────────
  // type="number" 입력값을 읽어 옆에 콤마 포맷 라벨을 보여줌
  // 기존 계산 로직(parseFloat/parseInt)은 건드리지 않음
  function addCommaDisplay() {
    if (isHome) return;
    var style = document.createElement('style');
    style.textContent = '.ec-comma{display:block;font-size:11px;color:#00d4aa;font-weight:700;margin-top:3px;min-height:16px;font-family:"Noto Sans KR",sans-serif}';
    document.head.appendChild(style);

    document.querySelectorAll('input[type="number"]').forEach(function(inp) {
      var lbl = document.createElement('span');
      lbl.className = 'ec-comma';
      inp.parentNode.insertBefore(lbl, inp.nextSibling);

      function fmt() {
        var v = parseFloat(inp.value);
        lbl.textContent = isNaN(v) ? '' : v.toLocaleString('ko-KR') + (inp.getAttribute('data-unit') || '');
      }
      inp.addEventListener('input', fmt);
      inp.addEventListener('change', fmt);
      fmt();
    });
  }

  function init() {
    renderHomeFavs();
    addCommaDisplay();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.__common = { CALC_LIST: CALC_LIST, getFavs: getFavs, isFav: isFav };
})();
