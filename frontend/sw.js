importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");
importScripts("/precache-manifest.70cb4b8821118f02738bcdff4d7fdd83.js");

workbox.core.setCacheNameDetails({prefix: "lumpsum"});

self._precacheManifest =
[].concat(self.__precacheManifest || []);
workbox.precaching. suppressWarnings();
workbox.precaching.precacheAndRoute(self._precacheManifest, {});