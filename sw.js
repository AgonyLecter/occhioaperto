/* Occhio Aperto — service worker: il gioco funziona anche offline. */
const CACHE = 'occhio-aperto-v2';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png', './icon-maskable-512.png',
  'https://unpkg.com/three@0.160.0/build/three.module.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(CORE.map(u => c.add(new Request(u, { mode: u.startsWith('http') ? 'cors' : 'same-origin' })).catch(() => { })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const put = (req, res) => { if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; };
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.includes('firebase') || url.pathname.includes('/firebasejs/')) return; // online soltanto
  // la pagina: prima la rete (per avere gli aggiornamenti), poi la copia salvata
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => put('./index.html', r)).catch(() => caches.match('./index.html').then(r => r || caches.match('./'))));
    return;
  }
  // librerie e font: prima la copia salvata
  if (/unpkg\.com|fonts\.(googleapis|gstatic)\.com/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => put(req, res))));
    return;
  }
  // file del sito: copia salvata subito, aggiornata in background
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(r => { const net = fetch(req).then(res => put(req, res)).catch(() => r); return r || net; }));
  }
});
