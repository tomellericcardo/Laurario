var CACHE = 'LAURARIO-v2';

var TOCACHE = [
    '/',
    '/note',
    '/opzioni',
    '/info',
    '/images/icon-512x512.png',
    '/templates/note.html',
    '/styles/main.css',
    '/styles/home.css',
    '/styles/note.css',
    '/styles/opzioni.css',
    '/styles/info.css',
    '/scripts/mustache.min.js',
    '/scripts/navbar.js',
    '/scripts/home.js',
    '/scripts/note.js',
    '/scripts/opzioni.js',
    '/scripts/info.js'
];


self.addEventListener('install', function(evt) {
    evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
    evt.respondWith(fromCache(evt.request));
    evt.waitUntil(update(evt.request));
});


function precache() {
    return caches.open(CACHE).then(function(cache) {
        return cache.addAll(TOCACHE);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then(function(cache) {
        return cache.match(request).then(function(matching) {
            return matching || fetch(request);
        });
    });
}

function update(request) {
    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') return;
    return caches.open(CACHE).then(function(cache) {
        return fetch(request).then(function(response) {
            return cache.put(request, response);
        });
    });
}
