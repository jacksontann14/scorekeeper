// Bump this version whenever you change any file, so devices pick up the update.
const CACHE = 'scores-v6';
const FILES = ['./', './index.html', './firebase-config.js', './manifest.json', './icon-180.png', './icon-192.png', './icon-512.png'];
const SDK_HOST = 'www.gstatic.com'; // Firebase SDK files

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // Leave Firebase's own network traffic (database, sign-in) alone.
  const ours = url.origin === self.location.origin;
  const sdk = url.host === SDK_HOST;
  if (!ours && !sdk) return;

  if (sdk) {
    // SDK files are versioned and never change: cache first.
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
    })));
    return;
  }
  // App files: network first so updates show up, cache when offline.
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
