const CACHE_NAME = "techassist-demo-v2";

const ASSETS = [
  "./",
  "./index.html",
  "./offline.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// INSTALL → cache iniziale
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// ACTIVATE → pulizia cache vecchie
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH → strategia intelligente
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // aggiorna cache
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, copy);
        });
        return response;
      })
      .catch(() => {
        // fallback cache
        return caches.match(event.request).then(res => {
          return res || caches.match("./offline.html");
        });
      })
  );
});
