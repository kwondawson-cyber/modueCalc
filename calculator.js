// 모두의계산기 - 플로팅 공학용 계산기
// Speed Dial(common.js)과 연동 — 독립 FAB 버튼 없음
// 모든 HTML 파일 </body> 직전에 추가:
// <script src="/calculator.js" defer></script>

(function() {
  const SIDE_LEFT = 'calc(50% + 390px)';
  const SIDE_TOP  = 360; // common.js CFG.sideTop 과 동일하게 유지

  const style = document.createElement('style');
  style.textContent = `
    #calc-panel {
      position: fixed;
      left: ${SIDE_LEFT};
      top: ${SIDE_TOP + 70}px;
      width: 320px;
      max-height: calc(100vh - ${SIDE_TOP + 90}px);
      overflow-y: auto;
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.6);
      z-index: 9989;
      display: none;
      animation: calcSlideIn .2s ease;
    }
    #calc-panel.visible { display: block; }
    @keyframes calcSlideIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .calc-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 18px 10px;
      border-bottom: 1px solid #30363d;
    }
    .calc-mode-tabs { display: flex; gap: 6px; }
    .calc-mode-btn {
      padding: 4px 10px;
      background: #21262d;
      border: 1px solid #30363d;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      color: #8b949e;
      cursor: pointer;
      font-family: 'Noto Sans KR', sans-serif;
      transition: all .15s;
    }
    .calc-mode-btn.active {
      background: rgba(0,212,170,0.15);
      border-color: rgba(0,212,170,0.4);
      color: #00d4aa;
    }

    .calc-display {
      padding: 12px 18px;
      text-align: right;
      background: #0d1117;
    }
    .calc-expr {
      font-size: 12px;
      color: #8b949e;
      min-height: 18px;
      font-family: 'Montserrat', monospace;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .calc-result {
      font-family: 'Montserrat', monospace;
      font-size: 32px;
      font-weight: 700;
      color: #e6edf3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .calc-grid { display: grid; padding: 10px; gap: 6px; }
    .calc-grid.basic { grid-template-columns: repeat(4, 1fr); }
    .calc-grid.sci   { grid-template-columns: repeat(5, 1fr); }

    .calc-btn-k {
      padding: 0;
      height: 48px;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 700;
      font-family: 'Montserrat', monospace;
      cursor: pointer;
      transition: transform .1s, opacity .1s;
    }
    .calc-btn-k:active { transform: scale(0.93); opacity: 0.8; }
    .calc-btn-k.num   { background: #21262d; color: #e6edf3; }
    .calc-btn-k.op    { background: #30363d; color: #00d4aa; font-size: 18px; }
    .calc-btn-k.eq    { background: linear-gradient(135deg, #00d4aa, #0095ff); color: #000; font-size: 20px; }
    .calc-btn-k.fn    { background: #161b22; color: #8b949e; font-size: 12px; border: 1px solid #30363d; }
    .calc-btn-k.fn:hover { color: #e6edf3; border-color: #00d4aa; }
    .calc-btn-k.clear { background: rgba(255,107,107,0.15); color: #ff6b6b; }
    .calc-btn-k.zero  { grid-column: span 2; }

    #calc-history {
      max-height: 100px;
      overflow-y: auto;
      padding: 8px 14px;
      border-top: 1px solid #30363d;
      display: none;
    }
    #calc-history.show { display: block; }
    .hist-item {
      font-size: 12px;
      color: #8b949e;
      padding: 3px 0;
      border-bottom: 1px solid rgba(48,54,61,0.4);
      font-family: monospace;
      cursor: pointer;
    }
    .hist-item:hover { color: #00d4aa; }
    .hist-item:last-child { border-bottom: none; }

    @media (max-width: 1100px) {
      #calc-panel {
        left: auto !important;
        right: 20px;
        top: ${SIDE_TOP + 70}px;
        width: calc(min(100vw - 40px, 320px));
      }
    }
  `;
  document.head.appendChild(style);

  // 패널
  const panel = document.createElement('div');
  panel.id = 'calc-panel';
  panel.innerHTML = `
    <div class="calc-header">
      <div class="calc-mode-tabs">
        <button class="calc-mode-btn active" onclick="window.__calc.setMode('basic')" id="cmode-basic">기본</button>
        <button class="calc-mode-btn"        onclick="window.__calc.setMode('sci')"   id="cmode-sci">공학</button>
      </div>
      <span style="font-size:11px;color:#8b949e;cursor:pointer" onclick="window.__calc.toggleHistory()">기록 ▾</span>
    </div>
    <div class="calc-display">
      <div class="calc-expr"   id="calc-expr"></div>
      <div class="calc-result" id="calc-result">0</div>
    </div>
    <div class="calc-grid basic" id="calc-grid"></div>
    <div id="calc-history"></div>
  `;
  // 패널 내부 클릭이 Speed Dial closeDial() 이벤트로 버블되지 않도록
  panel.addEventListener('click', e => e.stopPropagation());
  document.body.appendChild(panel);

  let expr = '', result = '0', mode = 'basic', history = [], deg = true;

  const basicBtns = [
    {l:'AC',t:'clear'},{l:'±',t:'fn'},{l:'%',t:'fn'},{l:'÷',t:'op'},
    {l:'7',t:'num'},{l:'8',t:'num'},{l:'9',t:'num'},{l:'×',t:'op'},
    {l:'4',t:'num'},{l:'5',t:'num'},{l:'6',t:'num'},{l:'−',t:'op'},
    {l:'1',t:'num'},{l:'2',t:'num'},{l:'3',t:'num'},{l:'+',t:'op'},
    {l:'0',t:'num',cls:'zero'},{l:'.',t:'num'},{l:'=',t:'eq'},
  ];

  const sciBtns = [
    {l:'AC',t:'clear'},{l:'(',t:'fn'},{l:')',t:'fn'},{l:'%',t:'fn'},{l:'÷',t:'op'},
    {l:'sin',t:'fn'},{l:'cos',t:'fn'},{l:'tan',t:'fn'},{l:'√',t:'fn'},{l:'×',t:'op'},
    {l:'log',t:'fn'},{l:'ln',t:'fn'},{l:'xʸ',t:'fn'},{l:'π',t:'fn'},{l:'−',t:'op'},
    {l:'1/x',t:'fn'},{l:'x²',t:'fn'},{l:'|x|',t:'fn'},{l:'e',t:'fn'},{l:'+',t:'op'},
    {l:'DEG',t:'fn'},{l:'0',t:'num'},{l:'.',t:'num'},{l:'⌫',t:'fn'},{l:'=',t:'eq'},
  ];

  function renderBtns() {
    const grid = document.getElementById('calc-grid');
    const btns = mode === 'basic' ? basicBtns : sciBtns;
    grid.className = 'calc-grid ' + mode;
    grid.innerHTML = btns.map(b => {
      let lbl = b.l;
      if (b.l === 'DEG') lbl = deg ? 'DEG' : 'RAD';
      return `<button class="calc-btn-k ${b.t}${b.cls ? ' ' + b.cls : ''}" onclick="window.__calc.press('${b.l}')">${lbl}</button>`;
    }).join('');
  }

  function updateDisplay() {
    document.getElementById('calc-expr').textContent   = expr;
    document.getElementById('calc-result').textContent = result;
  }

  function press(k) {
    try {
      if (k === 'AC') { expr = ''; result = '0'; }
      else if (k === '=') {
        let e = expr
          .replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-')
          .replace(/π/g, Math.PI).replace(/e(?![0-9])/g, Math.E);
        const toRad = x => deg ? x * Math.PI / 180 : x;
        e = e.replace(/sin\(([^)]+)\)/g, (_,a) => Math.sin(toRad(eval(a))));
        e = e.replace(/cos\(([^)]+)\)/g, (_,a) => Math.cos(toRad(eval(a))));
        e = e.replace(/tan\(([^)]+)\)/g, (_,a) => Math.tan(toRad(eval(a))));
        e = e.replace(/log\(([^)]+)\)/g, (_,a) => Math.log10(eval(a)));
        e = e.replace(/ln\(([^)]+)\)/g,  (_,a) => Math.log(eval(a)));
        e = e.replace(/√\(([^)]+)\)/g,   (_,a) => Math.sqrt(eval(a)));
        e = e.replace(/abs\(([^)]+)\)/g, (_,a) => Math.abs(eval(a)));
        const r = eval(e);
        const rStr = parseFloat(r.toFixed(10)).toString();
        history.unshift(expr + ' = ' + rStr);
        if (history.length > 10) history.pop();
        renderHistory();
        result = rStr;
        expr   = rStr;
      }
      else if (k === '⌫') { expr = expr.slice(0, -1) || ''; result = expr || '0'; }
      else if (k === '±') { if (expr) expr = expr.startsWith('-') ? expr.slice(1) : '-' + expr; }
      else if (k === 'DEG') { deg = !deg; renderBtns(); return; }
      else if (['sin','cos','tan','log','ln','√'].includes(k)) { expr += k + '('; }
      else if (k === 'xʸ') { expr += '**'; }
      else if (k === 'x²') { expr += '**2'; }
      else if (k === '1/x') { expr = '1/(' + expr + ')'; }
      else if (k === '|x|') { expr = 'abs(' + expr + ')'; }
      else if (k === '%') { expr += '/100'; }
      else if (k === 'π') { expr += 'π'; }
      else if (k === 'e')  { expr += 'e'; }
      else { expr += k; }

      if (k !== '=' && k !== 'AC' && expr) {
        try {
          let e2 = expr.replace(/÷/g,'/').replace(/×/g,'*').replace(/−/g,'-')
                       .replace(/π/g, Math.PI).replace(/e$/, Math.E);
          const r2 = eval(e2);
          if (isFinite(r2)) result = parseFloat(r2.toFixed(10)).toString();
        } catch(e) {}
      }
    } catch(e) { result = '오류'; }
    updateDisplay();
  }

  function renderHistory() {
    const h = document.getElementById('calc-history');
    h.innerHTML = history.map(i =>
      `<div class="hist-item" onclick="window.__calc.useHistory('${i.split(' = ')[1]}')">${i}</div>`
    ).join('');
  }

  function setMode(m) {
    mode = m;
    document.getElementById('cmode-basic').classList.toggle('active', m === 'basic');
    document.getElementById('cmode-sci').classList.toggle('active',   m === 'sci');
    renderBtns();
  }

  function toggleHistory() {
    document.getElementById('calc-history').classList.toggle('show');
  }

  function useHistory(val) {
    expr = val; result = val; updateDisplay();
  }

  // Speed Dial에서 호출하는 공개 메서드
  function togglePanel() {
    const isOpen = panel.classList.toggle('visible');
    const btn = document.getElementById('ec-fab-calc');
    if (btn) btn.classList.toggle('active', isOpen);
    // 다른 패널 닫기
    if (isOpen) {
      const memo = document.getElementById('ec-memo-box');
      const upd  = document.getElementById('ec-update-box');
      if (memo) memo.classList.remove('open');
      if (upd)  upd.classList.remove('open');
      const mb = document.getElementById('ec-fab-memo');
      const ub = document.getElementById('ec-fab-update');
      if (mb) mb.classList.remove('active');
      if (ub) ub.classList.remove('active');
    }
  }

  function closePanel() {
    panel.classList.remove('visible');
    const btn = document.getElementById('ec-fab-calc');
    if (btn) btn.classList.remove('active');
  }

  window.__calc = { press, setMode, toggleHistory, useHistory, togglePanel, closePanel };
  renderBtns();
  updateDisplay();
})();
