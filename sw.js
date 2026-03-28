const CACHE = "techassist-ai-v1";

const PRECACHE = [
  "./",
  "./index.html",
  "./offline.html",
  "./manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);

  // Passa tutto ciò che non è GET senza intercettare (POST al Worker incluso)
  if (e.request.method !== "GET") return;

  // Passa tutte le chiamate esterne senza intercettare
  if (url.origin !== self.location.origin) return;

  // Cache-first solo per assets locali
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type === "basic") {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match("./offline.html"));
    })
  );
});
