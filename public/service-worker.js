self.addEventListener('install', event => {
  console.log(event, 'Service Worker installing.');
});

self.addEventListener('activate', event => {
  console.log(event.request, 'Service Worker activating.');
});

self.addEventListener('fetch', event => {
  console.log('Fetching:', event.request.url);
  event.respondWith(fetch(event.request));
});
