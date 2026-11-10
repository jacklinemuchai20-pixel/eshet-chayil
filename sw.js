/* Keeps Eshet Chayil working with no internet. Change the number when you upload a new index.html. */
const V="eshet-v15",FILES=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:"reload"})))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!=V).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!="GET")return;const u=new URL(e.request.url);
 if(u.origin!==location.origin){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp));return res}).catch(()=>r)));return}
 /* own files: always ask GitHub for the newest copy first (skipping the phone's 10-minute cache), use the saved copy only when offline */
 e.respondWith(fetch(e.request,{cache:"no-cache"}).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp));return res}).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html"))))});
