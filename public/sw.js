const CACHE_NAME = 'todoapp-v1'
const ASSETS = [
  '/',
  '/index.html',
]

// Installation → on met en cache les ressources essentielles
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  )
  self.skipWaiting()
})

// Activation → on supprime les anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// Fetch → on répond depuis le cache si pas de connexion
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone))
        return response
      })
      .catch(() => caches.match(event.request))
  )
})