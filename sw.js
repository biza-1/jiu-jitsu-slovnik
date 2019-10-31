// serwice worker for offline mode || BIZA
// cache name .
const staticCacheName = 'site-static-v4';
const dynamicCacheName = 'dynamic-image-saver';
// if you want to cache something add it to array 
const assets = [
  '/slovnik/',
  'index.php',
  'pages/searchResult.php',
  'js/db.js',
  'js/dbFunctions.js',
  'js/functions.js',
  'js/caller.js',
  'js/render.js',
  'js/callerSearchedWord.js',
  'manifest.json',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
  'css/style.css',
  'includer.php',    
  'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  'pages/fallback.html',
  'images/icons/favicon.ico',
  'https://unpkg.com/dexie@latest/dist/dexie.js'
];
// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch events
/*self.addEventListener('fetch', evt => {
  if(evt.request.url.indexOf('firestore.googleapis.com') === -1){
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request).then(fetchRes => {
          return caches.open(dynamicCacheName).then(cache => {
            if(evt.request.url.indexOf('images/images') > -1){ // load images from imageLoader.php to cache all images in this document (to cache entire folder of images)
              cache.put(evt.request.url, fetchRes.clone());
            }    
            if(evt.request.url.indexOf('searchResult.php') > -1){ // opening search result because it contains id and cannot be all cached
              return caches.match('pages/searchResult.php');
            }                          
            return fetchRes;
          })
        });
      }).catch(() => {
        if(evt.request.url.indexOf('.html') > -1){
          return caches.match('/pages/fallback.html');
        } else if(evt.request.url.indexOf('.php') > -1){
          return caches.match('/pages/fallback.html');
        } 
      })
    );
  }
});*/