// serwice worker for offline mode || BIZA
// cache name .
const staticCacheName = 'site-static-v4';
const dynamicCacheName = 'dynamic-image-saver';
// if you want to cache something add it to array
const assets = [
    '/slovnik/',
    '/slovnik/index.php',
    '/slovnik/pages/searchResult.php',
    '/slovnik/pages/stitky.php',
    '/slovnik/pages/StitkyResult.php',
    '/slovnik/js/db.js',
    '/slovnik/js/dbFunctions.js',
    '/slovnik/js/functions.js',
    '/slovnik/js/caller.js',
    '/slovnik/js/render.js',
    '/slovnik/js/callerSearchedWord.js',
    '/slovnik/manifest.json',
    '/slovnik/includeTECHNILOGIES/jquerytechnolgy.js',
    '/slovnik/includeTECHNILOGIES/materializejs.js',
    'https://unpkg.com/default-passive-events', // for better performance
    '/slovnik/css/style.css',
    '/slovnik/css/custom-download.css',
    '/slovnik/includer.php',
    '/slovnik/pages/fallback.html',
    '/slovnik/images/icons/favicon.ico',
    'https://unpkg.com/dexie@latest/dist/dexie.js',
    'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js', // for __ operations
    '/slovnik/admin/img/obrazek_neni.jpg',
    '/slovnik/admin/imgResized/neni.jpg',
    '/slovnik/images/icons/add-24px.svg',
    '/slovnik/images/icons/clear-24px.svg',
    '/slovnik/images/icons/cloud_upload-24px.svg',
    '/slovnik/images/icons/filter.svg',
    '/slovnik/images/icons/get_app-24px.svg',
    '/slovnik/images/icons/search-24px.svg',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    '/slovnik/images/icons/icon-72x72.png',
    '/slovnik/images/icons/icon-96x96.png',
    '/slovnik/images/icons/icon-128x128.png',
    '/slovnik/images/icons/icon-144x144.png',
    '/slovnik/images/icons/icon-152x152.png',
    '/slovnik/images/icons/icon-384x384.png',
    '/slovnik/images/icons/icon-512x512.png',
];
// install event
self.addEventListener('install', evt => {
    //console.log('service worker installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            //console.log('caching shell assets');
            cache.addAll(assets);
        }),
    );
});

// activate event
self.addEventListener('activate', evt => {
    //console.log('service worker activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys);
            return Promise.all(
                keys
                .filter(
                    key =>
                    key !== staticCacheName && key !== dynamicCacheName,
                )
                .map(key => caches.delete(key)),
            );
        }),
    );
});

// fetch events

self.addEventListener('fetch', evt => {
    if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
        evt.respondWith(
            caches
            .match(evt.request)
            .then(cacheRes => {
                // if is search opened result because of ?something
                if (evt.request.url.indexOf('searchResult.php') > -1) {
                    // opening search result because it contains id and cannot be all cached
                    return caches.match('/slovnik/pages/searchResult.php');
                } else if (
                    evt.request.url.indexOf('StitkyResult.php') > -1
                ) {
                    // opening search result because it contains id and cannot be all cached
                    return caches.match('pages/StitkyResult.php');
                } else if (
                    evt.request.url.indexOf('admin/imgResized/null') > -1
                ) {
                    // opening search result because it contains id and cannot be all cached
                    return caches.match(
                        '/slovnik/admin/img/obrazek_neni.jpg',
                    );
                } else if (
                    evt.request.url.indexOf('admin/imgResized/') > -1
                ) {
                    return (
                        fetch(evt.request).then(fetchRes => {
                            return caches
                                .open(dynamicCacheName)
                                .then(cache => {
                                    cache.put(
                                        evt.request.url,
                                        fetchRes.clone(),
                                    );

                                    return fetchRes;
                                });
                        }) || cacheRes
                    );
                } else if (
                    evt.request.url.indexOf('googleusercontent') > -1
                ) {
                    return (
                        fetch(evt.request).then(fetchRes => {
                            return caches
                                .open(dynamicCacheName)
                                .then(cache => {
                                    cache.put(
                                        evt.request.url,
                                        fetchRes.clone(),
                                    );

                                    return fetchRes;
                                });
                        }) || cacheRes
                    );
                } else {
                    return (
                        cacheRes ||
                        fetch(evt.request).then(fetchRes => {
                            return fetchRes;
                        }).catch(() => {
                            if (evt.request.url.indexOf('justcheck.html') > -1) {

                            } else if (evt.request.url.indexOf('phpRequests') > -1) {

                            } else if (evt.request.url.indexOf('.html') > -1) {
                                return caches.match('/slovnik/pages/fallback.html');
                            } else if (evt.request.url.indexOf('.php') > -1) {
                                return caches.match('/slovnik/pages/fallback.html');
                            } else if (
                                evt.request.url.indexOf('/slovnik/admin/imgResized/') > -1
                            ) {
                                return caches.match(
                                    '/slovnik/admin/img/obrazek_neni.jpg',
                                );
                            } else if (evt.request.url.indexOf('/slovnik/') > -1) {
                                return caches.match('/slovnik/pages/fallback.html');
                            }
                        })
                    );
                }
            })
            .catch(() => {
                if (evt.request.url.indexOf('justcheck.html') > -1) {

                } else if (evt.request.url.indexOf('.html') > -1) {
                    return caches.match('/slovnik/pages/fallback.html');
                } else if (evt.request.url.indexOf('.php') > -1) {
                    return caches.match('/slovnik/pages/fallback.html');
                } else if (
                    evt.request.url.indexOf('/slovnik/admin/imgResized/') > -1
                ) {
                    return caches.match(
                        '/slovnik/admin/img/obrazek_neni.jpg',
                    );
                }
            }),
        );
    }
});