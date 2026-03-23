// Vercel 서버리스 함수 - 주소 API 프록시
// 파일 위치: /api/주소.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  const { keyword } = req.query;
  if (!keyword) return res.status(400).json({ error: 'keyword required' });
  const CONF_KEY = 'U01TX0FVVEgyMDI2MDMyMzIzNDIyMjExNzc3NzI=';
  const url = `https://business.juso.go.kr/addrlink/addrEngApi.do`
    + `?currentPage=1&countPerPage=5`
    + `&keyword=${encodeURIComponent(keyword)}`
    + `&confmKey=${CONF_KEY}`
    + `&resultType=json`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
