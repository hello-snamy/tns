const CACHE_NAME = 'telugu-news-v1';
const urlsToCache = [
    '/tns/',
    '/tns/css/style.css',
    '/tns/css/marketing.css',
    '/tns/js/marketing.js',
    '/tns/images/logo.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});

self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: '/tns/images/icon-192.png',
        badge: '/tns/images/badge-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '2'
        },
        actions: [
            {
                action: 'explore',
                title: 'Read More',
                icon: '/tns/images/icon-72.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/tns/images/icon-72.png'
            },
        ]
    };

    event.waitUntil(
        self.registration.showNotification('తెలుగు వార్తలు', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/tns/latest-news')
        );
    }
});
