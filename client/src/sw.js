// Service worker for offline/PWA mode

const CACHE_NAME = "omniagent-cache-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/manifest.json"
];

// Install: cache static assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for static, network-first for API
self.addEventListener("fetch", event => {
  const url = event.request.url;
  if (url.includes('/api/') || url.includes('/agent')) {
    // Network-first for API
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  } else {
    // Cache-first for static
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});