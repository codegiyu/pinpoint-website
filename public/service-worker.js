self.addEventListener('install', () => {});

self.addEventListener('activate', () => {});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
