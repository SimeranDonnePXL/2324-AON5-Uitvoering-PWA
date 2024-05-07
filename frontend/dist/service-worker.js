importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.3.0/workbox-sw.js');

const { Queue } = workbox.backgroundSync;

const queue = new Queue('queue-aon5');

if (!self.define) {
  let e,
    n = {};
  const s = (s, o) => (
    (s = new URL(s + ".js", o).href),
    n[s] ||
      new Promise((n) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = n), document.head.appendChild(e);
        } else (e = s), importScripts(s), n();
      }).then(() => {
        let e = n[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (o, t) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (n[i]) return;
    let r = {};
    const l = (e) => s(e, i),
      c = { module: { uri: i }, exports: r, require: l };
    n[i] = Promise.all(o.map((e) => c[e] || l(e))).then((e) => (t(...e), r));
  };
}
define(["./workbox-6626cfb4"], function (e) {
  "use strict";
  e.setCacheNameDetails({ prefix: "frontend" }),
    self.addEventListener("message", (e) => {
      e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
    }),
    e.precacheAndRoute(
      [
        { url: "/css/app.3b23c20c.css", revision: null },
        { url: "/index.html", revision: "b1433b23585043e426ba648959e8352a" },
        { url: "/js/app.6464579a.js", revision: null },
        { url: "/js/chunk-vendors.b1b70367.js", revision: null },
        { url: "/manifest.json", revision: "02eee432558fabda8193abd7c2e86fd7" },
        { url: "/robots.txt", revision: "735ab4f94fbcd57074377afca324c813" },
      ],
      {}
    ),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("/index.html"))
    ),
    e.registerRoute(
      /^http:\/\/localhost:/,
      new e.NetworkFirst({
        networkTimeoutSeconds: 20,
        cacheName: "aon5-note-cache",
        plugins: [new e.CacheableResponsePlugin({ statuses: [0, 200] })],
      }),
      "GET"
    ),
    e.registerRoute(
      /^http:\/\/localhost:/,
      new e.NetworkOnly({
        plugins: [
          new e.BackgroundSyncPlugin("queue-aon5", {
            maxRetentionTime: 86400,
            forceSyncFallback: !0,
          }),
        ],
      }),
      "POST"
    );
});
//# sourceMappingURL=service-worker.js.map

self.addEventListener('fetch', event => {
    if (!navigator.onLine && event.request.method !== 'POST') {
      return;
    }
  
    const bgSyncLogic = async () => {
      try {
        const response = await fetch(event.request.clone());
        return response;
      } catch (error) {
        await queue.pushRequest({request: event.request});
        return error;
      }
    };
  
    event.respondWith(bgSyncLogic());
  });