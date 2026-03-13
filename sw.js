// =============================================
// 모두의계산기 Service Worker v1.0
// 전략: Cache First (정적 자산) + Network First (HTML)
// =============================================

const CACHE_NAME    = 'everycalc-v3';
const STATIC_ASSETS = [
  '/',
  '/common.js',
  '/calculator.js',
  '/share.js',
  '/manifest.json',
  '/favicon.ico',
  '/favicon-32.png',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png',
  // 자주 쓰는 계산기 TOP 10 사전 캐시
  '/salary',
  '/age',
  '/bmi',
  '/loan',
  '/weekly_holiday',
  '/exchange',
  '/unemployment',
  '/area_converter',
  '/pension',
  '/lotto',
];

// ── 설치: 핵심 파일 사전 캐시 ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pre-caching assets');
      // 일부 실패해도 설치 계속 (addAll 대신 개별 처리)
      return Promise.allSettled(
        STATIC_ASSETS.map(url =>
          cache.add(url).catch(err => console.warn('[SW] Cache miss:', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// ── 활성화: 구버전 캐시 정리 ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch 전략 ──
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // 외부 요청 (AdSense, 폰트, API 등) → 네트워크 직접
  if (url.origin !== location.origin) {
    return; // 서비스워커 개입 안 함
  }

  // JS/CSS/이미지/폰트 → Cache First
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font' ||
    url.pathname.endsWith('.json')
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // HTML 페이지 → Network First (최신 콘텐츠 우선)
  event.respondWith(networkFirst(request));
});

// Cache First: 캐시 있으면 캐시, 없으면 네트워크 후 캐시 저장
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('오프라인 상태입니다.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

// Network First: 네트워크 시도, 실패 시 캐시 폴백
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;

    // 오프라인 폴백 페이지
    const fallback = await caches.match('/');
    return fallback || new Response(
      `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>오프라인 | 모두의계산기</title>
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <style>body{font-family:'Noto Sans KR',sans-serif;background:#0d1117;color:#e6edf3;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:20px}
      h1{font-size:28px;margin-bottom:12px;color:#00d4aa}p{color:#8b949e;line-height:1.7}
      a{color:#00d4aa;text-decoration:none;font-weight:700}</style></head>
      <body><div><h1>📡 오프라인 상태</h1>
      <p>인터넷 연결을 확인해주세요.<br>연결 후 <a href="/">모두의계산기 홈으로</a> 돌아갈 수 있습니다.</p></div></body></html>`,
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
}

// ── 백그라운드 동기화 (선택적) ──
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
