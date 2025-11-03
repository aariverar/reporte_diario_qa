// Service Worker para control anti-caché
const CACHE_NAME = 'qa-dashboard-v20251103';
const CACHE_STRATEGY = 'network-first'; // Siempre intentar red primero

self.addEventListener('install', function(event) {
    console.log('Service Worker: Instalado');
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    console.log('Service Worker: Activado');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Eliminando caché viejo', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    // Para archivos locales (.js, .css, .html), siempre usar la red primero
    if (event.request.url.includes('.js') || 
        event.request.url.includes('.css') || 
        event.request.url.includes('.html')) {
        
        event.respondWith(
            fetch(event.request)
                .then(function(response) {
                    // Si la respuesta es exitosa, devolver desde la red
                    if (response.status === 200) {
                        console.log('Service Worker: Sirviendo desde red:', event.request.url);
                        return response;
                    }
                    // Si falla la red, intentar caché como fallback
                    return caches.match(event.request);
                })
                .catch(function() {
                    // Si falla la red, intentar caché
                    return caches.match(event.request);
                })
        );
    } else {
        // Para otros recursos, usar caché normal
        event.respondWith(
            caches.match(event.request)
                .then(function(response) {
                    return response || fetch(event.request);
                })
        );
    }
});