// 모두의계산기 SNS 공유 컴포넌트
// 모든 계산기 페이지 </body> 직전에 아래 한 줄 추가:
// <script src="/share.js"></script>

(function() {
  const KAKAO_KEY = '545df65de1ad8ab9e5c8b7271f90575b';

  // 공유 버튼 CSS 삽입
  const style = document.createElement('style');
  style.textContent = `
    .share-section {
      max-width: 640px;
      margin: 0 auto 40px;
      padding: 0 20px;
      position: relative;
      z-index: 1;
    }
    .share-title {
      text-align: center;
      font-size: 13px;
      color: #8b949e;
      font-weight: 600;
      letter-spacing: 1px;
      margin-bottom: 14px;
    }
    .share-buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }
    .share-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 14px 8px;
      border-radius: 14px;
      border: 1px solid #30363d;
      background: #161b22;
      cursor: pointer;
      font-family: 'Noto Sans KR', sans-serif;
      font-size: 11px;
      font-weight: 600;
      color: #8b949e;
      transition: all 0.2s;
      text-decoration: none;
    }
    .share-btn:hover { transform: translateY(-3px); border-color: rgba(0,212,170,0.4); color: #e6edf3; }
    .share-btn .sb-icon { font-size: 24px; }
    .share-btn.kakao { background: #FEE500; border-color: #FEE500; color: #3C1E1E; }
    .share-btn.kakao:hover { background: #FFD700; border-color: #FFD700; }
    .share-btn.twitter { border-color: rgba(29,161,242,0.3); }
    .share-btn.twitter:hover { border-color: #1DA1F2; color: #1DA1F2; }
    .share-btn.facebook { border-color: rgba(24,119,242,0.3); }
    .share-btn.facebook:hover { border-color: #1877F2; color: #1877F2; }
    .share-btn.copy { border-color: rgba(0,212,170,0.3); }
    .share-btn.copy:hover { border-color: #00d4aa; color: #00d4aa; }
    .copy-toast {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #00d4aa;
      color: #000;
      padding: 10px 20px;
      border-radius: 30px;
      font-size: 14px;
      font-weight: 700;
      opacity: 0;
      transition: all 0.3s;
      pointer-events: none;
      z-index: 9999;
      font-family: 'Noto Sans KR', sans-serif;
    }
    .copy-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
    @media (max-width: 400px) {
      .share-buttons { grid-template-columns: repeat(2, 1fr); }
    }
  `;
  document.head.appendChild(style);

  // 카카오 SDK 로드
  const kakaoScript = document.createElement('script');
  kakaoScript.src = 'https://t1.kakaocdn.net/kakaojs/2.7.4/kakao.min.js';
  kakaoScript.onload = function() {
    if (window.Kakao && !Kakao.isInitialized()) {
      Kakao.init(KAKAO_KEY);
    }
  };
  document.head.appendChild(kakaoScript);

  // 토스트 만들기
  const toast = document.createElement('div');
  toast.className = 'copy-toast';
  toast.textContent = '🔗 링크가 복사되었습니다!';
  document.body.appendChild(toast);

  function showToast() {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }

  // 공유 함수들
  function shareKakao() {
    if (!window.Kakao || !Kakao.isInitialized()) {
      alert('카카오 SDK 로딩 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    const url = location.href;
    const title = document.title || '모두의계산기';
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: '무료 계산기 모음 | everycalc.kr',
        imageUrl: 'https://everycalc.kr/og-image.png',
        link: { mobileWebUrl: url, webUrl: url }
      },
      buttons: [{
        title: '계산하러 가기',
        link: { mobileWebUrl: url, webUrl: url }
      }]
    });
  }

  function shareTwitter() {
    const text = encodeURIComponent(document.title + ' | 모두의계산기');
    const url = encodeURIComponent(location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  }

  function shareFacebook() {
    const url = encodeURIComponent(location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  }

  function copyLink() {
    navigator.clipboard.writeText(location.href).then(() => {
      showToast();
    }).catch(() => {
      const el = document.createElement('textarea');
      el.value = location.href;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      showToast();
    });
  }

  // DOM 로드 후 삽입
  function insertShareButtons() {
    const section = document.createElement('div');
    section.className = 'share-section';
    section.innerHTML = `
      <div class="share-title">이 계산기 공유하기</div>
      <div class="share-buttons">
        <button class="share-btn kakao" onclick="window.__share.kakao()">
          <span class="sb-icon">💬</span>카카오톡
        </button>
        <button class="share-btn twitter" onclick="window.__share.twitter()">
          <span class="sb-icon">🐦</span>트위터
        </button>
        <button class="share-btn facebook" onclick="window.__share.facebook()">
          <span class="sb-icon">📘</span>페이스북
        </button>
        <button class="share-btn copy" onclick="window.__share.copy()">
          <span class="sb-icon">🔗</span>링크복사
        </button>
      </div>
    `;
    // container 마지막에 삽입
    const container = document.querySelector('.container');
    if (container) container.appendChild(section);
    else document.body.appendChild(section);
  }

  window.__share = { kakao: shareKakao, twitter: shareTwitter, facebook: shareFacebook, copy: copyLink };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertShareButtons);
  } else {
    insertShareButtons();
  }
})();
