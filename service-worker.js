var CACHE = 'cache-and-update';
var TOCACHE = [
    '/',
    '/home',
    '/note',
    '/opzioni',
    '/info',
    '/html/templates.html',
    '/css/style.css',
    '/css/home.css',
    '/css/note.css',
    '/css/opzioni.css',
    '/css/info.css',
    '/js/navbar.js',
    '/js/home.js',
    '/js/note.js',
    '/js/opzioni.js'
    '/js/info.js'
];

self.addEventListener('install', function(evt) {
    evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
    evt.respondWith(fromCache(evt.request));
    evt.waitUntil(update(evt.request));
});

function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll(TOCACHE);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}

function update(request) {
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
}
