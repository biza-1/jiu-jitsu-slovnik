// serwice worker for offline mode || BIZA
// cache name .
const staticCahceName = 'site-static-v2';
//const OFFLINE_URL = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v2';
// if you want to cache something add it to array 
const assets = [
  '/slovnik/',
  'index.php',
  'js/db.js',
  'js/dbFunctions.js',
  'js/functions.js',
  'js/caller.js',
  'js/render.js',
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
// install service worker, only occurs when SW is changed
self.addEventListener('install', evt => {
  //console.log("SW installed"); // tells once when installed
  //self.skipWaiting();
  evt.waitUntil(
    caches.open(staticCahceName)
    .then(cache => cache.addAll(assets))
  )
});
// activate event, occurs after installation and is activated when all tabs have been closed
self.addEventListener('activate', evt => {
  //console.log("SW activated");
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCahceName)
        .map(key => caches.delete(key))
      )
    })
  );
});


// occurs every time there is fetch event(trying to get element)
// if it finds the element in cache it returns it, if not it tries to get it from web
// SW not activated due to testing
/*self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    }).catch(() => {
      if(evt.request.url.indexOf('justcheck.html') > -1) {
        console.log("ces")
      } else if(evt.request.url.indexOf('.php') > -1) {
        return caches.match('pages/fallback.html');
      } else if(evt.request.url.indexOf('.html') > -1) {
        return caches.match('pages/fallback.html');
      }  
    })
  );
});*/
