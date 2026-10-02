// Glide Calendar offline support.
// The app opens from this cache, then refreshes the cache in the background,
// so a new version you upload shows up the second time you open the app.
const CACHE = "glide-v1";
const SHELL = ["./", "index.html", "manifest.webmanifest", "jszip.min.js",
  "fonts/figtree-latin-wght-normal.woff2", "fonts/bricolage-grotesque-latin-wght-normal.woff2",
  "icons/icon-192.png", "icons/icon-180.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const hit = await cache.match(req, {ignoreSearch: true});
    const fresh = fetch(req).then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; }).catch(() => hit);
    return hit || fresh;
  }));
});
