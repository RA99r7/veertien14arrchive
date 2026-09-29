const CACHE_NAME = "veertien14-v1";

const FILES_TO_CACHE = [
    "index.html",
    "anggota.html",
    "moment.html",
    "guestbook.html",
    "kontak.html",
    "style.css",
    "script.js",
    "logo.jpeg"
];

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(FILES_TO_CACHE);
            })
    );

    self.skipWaiting();
});


self.addEventListener("activate", event => {

    event.waitUntil(
        caches.keys().then(keys => {

            return Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );

        })
    );

    self.clients.claim();
});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(response => {

                if (response) {
                    return response;
                }

                return fetch(event.request);

            })

    );

});