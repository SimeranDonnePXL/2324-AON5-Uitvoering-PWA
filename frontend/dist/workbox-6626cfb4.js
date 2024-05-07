define(["exports"],(function(t){"use strict";try{self["workbox:core:6.5.4"]&&_()}catch(t){}const e=(t,...e)=>{let s=t;return e.length>0&&(s+=` :: ${JSON.stringify(e)}`),s};class s extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:6.5.4"]&&_()}catch(t){}const n=t=>t&&"object"==typeof t?t:{handle:t};class r{constructor(t,e,s="GET"){this.handler=n(e),this.match=t,this.method=s}setCatchHandler(t){this.catchHandler=n(t)}}class i extends r{constructor(t,e,s){super((({url:e})=>{const s=t.exec(e.href);if(s&&(e.origin===location.origin||0===s.index))return s.slice(1)}),e,s)}}class a{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest({request:t,event:e}){const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:r,route:i}=this.findMatchingRoute({event:e,request:t,sameOrigin:n,url:s});let a=i&&i.handler;const o=t.method;if(!a&&this.i.has(o)&&(a=this.i.get(o)),!a)return;let c;try{c=a.handle({url:s,request:t,event:e,params:r})}catch(t){c=Promise.reject(t)}const h=i&&i.catchHandler;return c instanceof Promise&&(this.o||h)&&(c=c.catch((async n=>{if(h)try{return await h.handle({url:s,request:t,event:e,params:r})}catch(t){t instanceof Error&&(n=t)}if(this.o)return this.o.handle({url:s,request:t,event:e});throw n}))),c}findMatchingRoute({url:t,sameOrigin:e,request:s,event:n}){const r=this.t.get(s.method)||[];for(const i of r){let r;const a=i.match({url:t,sameOrigin:e,request:s,event:n});if(a)return r=a,(Array.isArray(r)&&0===r.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(r=void 0),{route:i,params:r}}return{}}setDefaultHandler(t,e="GET"){this.i.set(e,n(t))}setCatchHandler(t){this.o=n(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new s("unregister-route-but-not-found-with-method",{method:t.method});const e=this.t.get(t.method).indexOf(t);if(!(e>-1))throw new s("unregister-route-route-not-registered");this.t.get(t.method).splice(e,1)}}let o;try{self["workbox:core:6.5.4"]&&_()}catch(t){}try{self["workbox:cacheable-response:6.5.4"]&&_()}catch(t){}class c{constructor(t={}){this.h=t.statuses,this.u=t.headers}isResponseCacheable(t){let e=!0;return this.h&&(e=this.h.includes(t.status)),this.u&&e&&(e=Object.keys(this.u).some((e=>t.headers.get(e)===this.u[e]))),e}}try{self["workbox:strategies:6.5.4"]&&_()}catch(t){}const h={cacheWillUpdate:async({response:t})=>200===t.status||0===t.status?t:null},u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},l=t=>[u.prefix,t,u.suffix].filter((t=>t&&t.length>0)).join("-"),f=t=>{(t=>{for(const e of Object.keys(u))t(e)})((e=>{"string"==typeof t[e]&&(u[e]=t[e])}))},w=t=>t||l(u.runtime);function d(t,e){const s=new URL(t);for(const t of e)s.searchParams.delete(t);return s.href}class y{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}const p=new Set;function g(t){return new Promise((e=>setTimeout(e,t)))}function m(t){return"string"==typeof t?new Request(t):t}class q{constructor(t,e){this.l={},Object.assign(this,e),this.event=e.event,this.p=t,this.m=new y,this.q=[],this.R=[...t.plugins],this.v=new Map;for(const t of this.R)this.v.set(t,{});this.event.waitUntil(this.m.promise)}async fetch(t){const{event:e}=this;let n=m(t);if("navigate"===n.mode&&e instanceof FetchEvent&&e.preloadResponse){const t=await e.preloadResponse;if(t)return t}const r=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))n=await t({request:n.clone(),event:e})}catch(t){if(t instanceof Error)throw new s("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const i=n.clone();try{let t;t=await fetch(n,"navigate"===n.mode?void 0:this.p.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))t=await s({event:e,request:i,response:t});return t}catch(t){throw r&&await this.runCallbacks("fetchDidFail",{error:t,event:e,originalRequest:r.clone(),request:i.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=m(t);let s;const{cacheName:n,matchOptions:r}=this.p,i=await this.getCacheKey(e,"read"),a=Object.assign(Object.assign({},r),{cacheName:n});s=await caches.match(i,a);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:r,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(t,e){const n=m(t);await g(0);const r=await this.getCacheKey(n,"write");if(!e)throw new s("cache-put-with-no-response",{url:(i=r.url,new URL(String(i),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var i;const a=await this.D(e);if(!a)return!1;const{cacheName:o,matchOptions:c}=this.p,h=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),l=u?await async function(t,e,s,n){const r=d(e.url,s);if(e.url===r)return t.match(e,n);const i=Object.assign(Object.assign({},n),{ignoreSearch:!0}),a=await t.keys(e,i);for(const e of a)if(r===d(e.url,s))return t.match(e,n)}(h,r.clone(),["__WB_REVISION__"],c):null;try{await h.put(r,u?a.clone():a)}catch(t){if(t instanceof Error)throw"QuotaExceededError"===t.name&&await async function(){for(const t of p)await t()}(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:o,oldResponse:l,newResponse:a.clone(),request:r,event:this.event});return!0}async getCacheKey(t,e){const s=`${t.url} | ${e}`;if(!this.l[s]){let n=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))n=m(await t({mode:e,request:n,event:this.event,params:this.params}));this.l[s]=n}return this.l[s]}hasCallback(t){for(const e of this.p.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.p.plugins)if("function"==typeof e[t]){const s=this.v.get(e),n=n=>{const r=Object.assign(Object.assign({},n),{state:s});return e[t](r)};yield n}}waitUntil(t){return this.q.push(t),t}async doneWaiting(){let t;for(;t=this.q.shift();)await t}destroy(){this.m.resolve(null)}async D(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class R{constructor(t={}){this.cacheName=w(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,r=new q(this,{event:e,request:s,params:n}),i=this.U(r,s,e);return[i,this._(i,r,s,e)]}async U(t,e,n){let r;await t.runCallbacks("handlerWillStart",{event:n,request:e});try{if(r=await this.O(e,t),!r||"error"===r.type)throw new s("no-response",{url:e.url})}catch(s){if(s instanceof Error)for(const i of t.iterateCallbacks("handlerDidError"))if(r=await i({error:s,event:n,request:e}),r)break;if(!r)throw s}for(const s of t.iterateCallbacks("handlerWillRespond"))r=await s({event:n,request:e,response:r});return r}async _(t,e,s,n){let r,i;try{r=await t}catch(i){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await e.doneWaiting()}catch(t){t instanceof Error&&(i=t)}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:i}),e.destroy(),i)throw i}}function v(){return v=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},v.apply(this,arguments)}const b=(t,e)=>e.some((e=>t instanceof e));let E,D;const U=new WeakMap,O=new WeakMap,x=new WeakMap,C=new WeakMap,I=new WeakMap;let L={get(t,e,s){if(t instanceof IDBTransaction){if("done"===e)return O.get(t);if("objectStoreNames"===e)return t.objectStoreNames||x.get(t);if("store"===e)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return B(t[e])},set:(t,e,s)=>(t[e]=s,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function k(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(D||(D=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(j(this),e),B(U.get(this))}:function(...e){return B(t.apply(j(this),e))}:function(e,...s){const n=t.call(j(this),e,...s);return x.set(n,e.sort?e.sort():[e]),B(n)}}function N(t){return"function"==typeof t?k(t):(t instanceof IDBTransaction&&function(t){if(O.has(t))return;const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",i),t.removeEventListener("abort",i)},r=()=>{e(),n()},i=()=>{s(t.error||new DOMException("AbortError","AbortError")),n()};t.addEventListener("complete",r),t.addEventListener("error",i),t.addEventListener("abort",i)}));O.set(t,e)}(t),b(t,E||(E=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(t,L):t)}function B(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("success",r),t.removeEventListener("error",i)},r=()=>{e(B(t.result)),n()},i=()=>{s(t.error),n()};t.addEventListener("success",r),t.addEventListener("error",i)}));return e.then((e=>{e instanceof IDBCursor&&U.set(e,t)})).catch((()=>{})),I.set(e,t),e}(t);if(C.has(t))return C.get(t);const e=N(t);return e!==t&&(C.set(t,e),I.set(e,t)),e}const j=t=>I.get(t);const P=["get","getKey","getAll","getAllKeys","count"],S=["put","add","delete","clear"],T=new Map;function W(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(T.get(e))return T.get(e);const s=e.replace(/FromIndex$/,""),n=e!==s,r=S.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!r&&!P.includes(s))return;const i=async function(t,...e){const i=this.transaction(t,r?"readwrite":"readonly");let a=i.store;return n&&(a=a.index(e.shift())),(await Promise.all([a[s](...e),r&&i.done]))[0]};return T.set(e,i),i}L=(t=>v({},t,{get:(e,s,n)=>W(e,s)||t.get(e,s,n),has:(e,s)=>!!W(e,s)||t.has(e,s)}))(L);try{self["workbox:background-sync:6.5.4"]&&_()}catch(t){}const M="requests",A="queueName";class F{constructor(){this.C=null}async addEntry(t){const e=(await this.getDb()).transaction(M,"readwrite",{durability:"relaxed"});await e.store.add(t),await e.done}async getFirstEntryId(){const t=await this.getDb(),e=await t.transaction(M).store.openCursor();return null==e?void 0:e.value.id}async getAllEntriesByQueueName(t){const e=await this.getDb(),s=await e.getAllFromIndex(M,A,IDBKeyRange.only(t));return s||new Array}async getEntryCountByQueueName(t){return(await this.getDb()).countFromIndex(M,A,IDBKeyRange.only(t))}async deleteEntry(t){const e=await this.getDb();await e.delete(M,t)}async getFirstEntryByQueueName(t){return await this.getEndEntryFromIndex(IDBKeyRange.only(t),"next")}async getLastEntryByQueueName(t){return await this.getEndEntryFromIndex(IDBKeyRange.only(t),"prev")}async getEndEntryFromIndex(t,e){const s=await this.getDb(),n=await s.transaction(M).store.index(A).openCursor(t,e);return null==n?void 0:n.value}async getDb(){return this.C||(this.C=await function(t,e,{blocked:s,upgrade:n,blocking:r,terminated:i}={}){const a=indexedDB.open(t,e),o=B(a);return n&&a.addEventListener("upgradeneeded",(t=>{n(B(a.result),t.oldVersion,t.newVersion,B(a.transaction),t)})),s&&a.addEventListener("blocked",(t=>s(t.oldVersion,t.newVersion,t))),o.then((t=>{i&&t.addEventListener("close",(()=>i())),r&&t.addEventListener("versionchange",(t=>r(t.oldVersion,t.newVersion,t)))})).catch((()=>{})),o}("workbox-background-sync",3,{upgrade:this.I})),this.C}I(t,e){e>0&&e<3&&t.objectStoreNames.contains(M)&&t.deleteObjectStore(M);t.createObjectStore(M,{autoIncrement:!0,keyPath:"id"}).createIndex(A,A,{unique:!1})}}class K{constructor(t){this.L=t,this.k=new F}async pushEntry(t){delete t.id,t.queueName=this.L,await this.k.addEntry(t)}async unshiftEntry(t){const e=await this.k.getFirstEntryId();e?t.id=e-1:delete t.id,t.queueName=this.L,await this.k.addEntry(t)}async popEntry(){return this.N(await this.k.getLastEntryByQueueName(this.L))}async shiftEntry(){return this.N(await this.k.getFirstEntryByQueueName(this.L))}async getAll(){return await this.k.getAllEntriesByQueueName(this.L)}async size(){return await this.k.getEntryCountByQueueName(this.L)}async deleteEntry(t){await this.k.deleteEntry(t)}async N(t){return t&&await this.deleteEntry(t.id),t}}const $=["method","referrer","referrerPolicy","mode","credentials","cache","redirect","integrity","keepalive"];class H{static async fromRequest(t){const e={url:t.url,headers:{}};"GET"!==t.method&&(e.body=await t.clone().arrayBuffer());for(const[s,n]of t.headers.entries())e.headers[s]=n;for(const s of $)void 0!==t[s]&&(e[s]=t[s]);return new H(e)}constructor(t){"navigate"===t.mode&&(t.mode="same-origin"),this.B=t}toObject(){const t=Object.assign({},this.B);return t.headers=Object.assign({},this.B.headers),t.body&&(t.body=t.body.slice(0)),t}toRequest(){return new Request(this.B.url,this.B)}clone(){return new H(this.toObject())}}const Q="workbox-background-sync",G=new Set,V=t=>{const e={request:new H(t.requestData).toRequest(),timestamp:t.timestamp};return t.metadata&&(e.metadata=t.metadata),e};class z{constructor(t,{forceSyncFallback:e,onSync:n,maxRetentionTime:r}={}){if(this.j=!1,this.P=!1,G.has(t))throw new s("duplicate-queue-name",{name:t});G.add(t),this.S=t,this.T=n||this.replayRequests,this.W=r||10080,this.M=Boolean(e),this.A=new K(this.S),this.F()}get name(){return this.S}async pushRequest(t){await this.K(t,"push")}async unshiftRequest(t){await this.K(t,"unshift")}async popRequest(){return this.$("pop")}async shiftRequest(){return this.$("shift")}async getAll(){const t=await this.A.getAll(),e=Date.now(),s=[];for(const n of t){const t=60*this.W*1e3;e-n.timestamp>t?await this.A.deleteEntry(n.id):s.push(V(n))}return s}async size(){return await this.A.size()}async K({request:t,metadata:e,timestamp:s=Date.now()},n){const r={requestData:(await H.fromRequest(t.clone())).toObject(),timestamp:s};switch(e&&(r.metadata=e),n){case"push":await this.A.pushEntry(r);break;case"unshift":await this.A.unshiftEntry(r)}this.j?this.P=!0:await this.registerSync()}async $(t){const e=Date.now();let s;switch(t){case"pop":s=await this.A.popEntry();break;case"shift":s=await this.A.shiftEntry()}if(s){const n=60*this.W*1e3;return e-s.timestamp>n?this.$(t):V(s)}}async replayRequests(){let t;for(;t=await this.shiftRequest();)try{await fetch(t.request.clone())}catch(e){throw await this.unshiftRequest(t),new s("queue-replay-failed",{name:this.S})}}async registerSync(){if("sync"in self.registration&&!this.M)try{await self.registration.sync.register(`${Q}:${this.S}`)}catch(t){}}F(){"sync"in self.registration&&!this.M?self.addEventListener("sync",(t=>{if(t.tag===`${Q}:${this.S}`){const e=async()=>{let e;this.j=!0;try{await this.T({queue:this})}catch(t){if(t instanceof Error)throw e=t,e}finally{!this.P||e&&!t.lastChance||await this.registerSync(),this.j=!1,this.P=!1}};t.waitUntil(e())}})):this.T({queue:this})}static get H(){return G}}try{self["workbox:core:6.5.4"]&&_()}catch(t){}const J=(t,...e)=>{let s=t;return e.length>0&&(s+=` :: ${JSON.stringify(e)}`),s};class X extends Error{constructor(t,e){super(J(t,e)),this.name=t,this.details=e}}try{self["workbox:routing:6.5.4"]&&_()}catch(t){}const Y=t=>t&&"object"==typeof t?t:{handle:t};class Z{constructor(t,e,s="GET"){this.handler=Y(e),this.match=t,this.method=s}setCatchHandler(t){this.catchHandler=Y(t)}}class tt extends Z{constructor(t,e,s){super((({url:e})=>{const s=t.exec(e.href);if(s&&(e.origin===location.origin||0===s.index))return s.slice(1)}),e,s)}}class et{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest({request:t,event:e}){const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:r,route:i}=this.findMatchingRoute({event:e,request:t,sameOrigin:n,url:s});let a=i&&i.handler;const o=t.method;if(!a&&this.i.has(o)&&(a=this.i.get(o)),!a)return;let c;try{c=a.handle({url:s,request:t,event:e,params:r})}catch(t){c=Promise.reject(t)}const h=i&&i.catchHandler;return c instanceof Promise&&(this.o||h)&&(c=c.catch((async n=>{if(h)try{return await h.handle({url:s,request:t,event:e,params:r})}catch(t){t instanceof Error&&(n=t)}if(this.o)return this.o.handle({url:s,request:t,event:e});throw n}))),c}findMatchingRoute({url:t,sameOrigin:e,request:s,event:n}){const r=this.t.get(s.method)||[];for(const i of r){let r;const a=i.match({url:t,sameOrigin:e,request:s,event:n});if(a)return r=a,(Array.isArray(r)&&0===r.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(r=void 0),{route:i,params:r}}return{}}setDefaultHandler(t,e="GET"){this.i.set(e,Y(t))}setCatchHandler(t){this.o=Y(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new X("unregister-route-but-not-found-with-method",{method:t.method});const e=this.t.get(t.method).indexOf(t);if(!(e>-1))throw new X("unregister-route-route-not-registered");this.t.get(t.method).splice(e,1)}}let st;const nt=()=>(st||(st=new et,st.addFetchListener(),st.addCacheListener()),st);const rt={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},it=t=>[rt.prefix,t,rt.suffix].filter((t=>t&&t.length>0)).join("-"),at=t=>t||it(rt.precache),ot=t=>t||it(rt.runtime);function ct(t,e){const s=e();return t.waitUntil(s),s}try{self["workbox:precaching:6.5.4"]&&_()}catch(t){}function ht(t){if(!t)throw new X("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:e,url:s}=t;if(!s)throw new X("add-to-cache-list-unexpected-type",{entry:t});if(!e){const t=new URL(s,location.href);return{cacheKey:t.href,url:t.href}}const n=new URL(s,location.href),r=new URL(s,location.href);return n.searchParams.set("__WB_REVISION__",e),{cacheKey:n.href,url:r.href}}class ut{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:t,state:e})=>{e&&(e.originalRequest=t)},this.cachedResponseWillBeUsed=async({event:t,state:e,cachedResponse:s})=>{if("install"===t.type&&e&&e.originalRequest&&e.originalRequest instanceof Request){const t=e.originalRequest.url;s?this.notUpdatedURLs.push(t):this.updatedURLs.push(t)}return s}}}class lt{constructor({precacheController:t}){this.cacheKeyWillBeUsed=async({request:t,params:e})=>{const s=(null==e?void 0:e.cacheKey)||this.G.getCacheKeyForURL(t.url);return s?new Request(s,{headers:t.headers}):t},this.G=t}}let ft;async function wt(t,e){let s=null;if(t.url){s=new URL(t.url).origin}if(s!==self.location.origin)throw new X("cross-origin-copy-response",{origin:s});const n=t.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=e?e(r):r,a=function(){if(void 0===ft){const t=new Response("");if("body"in t)try{new Response(t.body),ft=!0}catch(t){ft=!1}ft=!1}return ft}()?n.body:await n.blob();return new Response(a,i)}function dt(t,e){const s=new URL(t);for(const t of e)s.searchParams.delete(t);return s.href}class yt{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}const pt=new Set;try{self["workbox:strategies:6.5.4"]&&_()}catch(t){}function gt(t){return"string"==typeof t?new Request(t):t}class mt{constructor(t,e){this.l={},Object.assign(this,e),this.event=e.event,this.p=t,this.m=new yt,this.q=[],this.R=[...t.plugins],this.v=new Map;for(const t of this.R)this.v.set(t,{});this.event.waitUntil(this.m.promise)}async fetch(t){const{event:e}=this;let s=gt(t);if("navigate"===s.mode&&e instanceof FetchEvent&&e.preloadResponse){const t=await e.preloadResponse;if(t)return t}const n=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))s=await t({request:s.clone(),event:e})}catch(t){if(t instanceof Error)throw new X("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const r=s.clone();try{let t;t=await fetch(s,"navigate"===s.mode?void 0:this.p.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))t=await s({event:e,request:r,response:t});return t}catch(t){throw n&&await this.runCallbacks("fetchDidFail",{error:t,event:e,originalRequest:n.clone(),request:r.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=gt(t);let s;const{cacheName:n,matchOptions:r}=this.p,i=await this.getCacheKey(e,"read"),a=Object.assign(Object.assign({},r),{cacheName:n});s=await caches.match(i,a);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:r,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(t,e){const s=gt(t);var n;await(n=0,new Promise((t=>setTimeout(t,n))));const r=await this.getCacheKey(s,"write");if(!e)throw new X("cache-put-with-no-response",{url:(i=r.url,new URL(String(i),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var i;const a=await this.D(e);if(!a)return!1;const{cacheName:o,matchOptions:c}=this.p,h=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),l=u?await async function(t,e,s,n){const r=dt(e.url,s);if(e.url===r)return t.match(e,n);const i=Object.assign(Object.assign({},n),{ignoreSearch:!0}),a=await t.keys(e,i);for(const e of a)if(r===dt(e.url,s))return t.match(e,n)}(h,r.clone(),["__WB_REVISION__"],c):null;try{await h.put(r,u?a.clone():a)}catch(t){if(t instanceof Error)throw"QuotaExceededError"===t.name&&await async function(){for(const t of pt)await t()}(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:o,oldResponse:l,newResponse:a.clone(),request:r,event:this.event});return!0}async getCacheKey(t,e){const s=`${t.url} | ${e}`;if(!this.l[s]){let n=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))n=gt(await t({mode:e,request:n,event:this.event,params:this.params}));this.l[s]=n}return this.l[s]}hasCallback(t){for(const e of this.p.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.p.plugins)if("function"==typeof e[t]){const s=this.v.get(e),n=n=>{const r=Object.assign(Object.assign({},n),{state:s});return e[t](r)};yield n}}waitUntil(t){return this.q.push(t),t}async doneWaiting(){let t;for(;t=this.q.shift();)await t}destroy(){this.m.resolve(null)}async D(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class qt{constructor(t={}){this.cacheName=ot(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,r=new mt(this,{event:e,request:s,params:n}),i=this.U(r,s,e);return[i,this._(i,r,s,e)]}async U(t,e,s){let n;await t.runCallbacks("handlerWillStart",{event:s,request:e});try{if(n=await this.O(e,t),!n||"error"===n.type)throw new X("no-response",{url:e.url})}catch(r){if(r instanceof Error)for(const i of t.iterateCallbacks("handlerDidError"))if(n=await i({error:r,event:s,request:e}),n)break;if(!n)throw r}for(const r of t.iterateCallbacks("handlerWillRespond"))n=await r({event:s,request:e,response:n});return n}async _(t,e,s,n){let r,i;try{r=await t}catch(i){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await e.doneWaiting()}catch(t){t instanceof Error&&(i=t)}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:i}),e.destroy(),i)throw i}}class Rt extends qt{constructor(t={}){t.cacheName=at(t.cacheName),super(t),this.V=!1!==t.fallbackToNetwork,this.plugins.push(Rt.copyRedirectedCacheableResponsesPlugin)}async O(t,e){const s=await e.cacheMatch(t);return s||(e.event&&"install"===e.event.type?await this.J(t,e):await this.X(t,e))}async X(t,e){let s;const n=e.params||{};if(!this.V)throw new X("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const r=n.integrity,i=t.integrity,a=!i||i===r;s=await e.fetch(new Request(t,{integrity:"no-cors"!==t.mode?i||r:void 0})),r&&a&&"no-cors"!==t.mode&&(this.Y(),await e.cachePut(t,s.clone()))}return s}async J(t,e){this.Y();const s=await e.fetch(t);if(!await e.cachePut(t,s.clone()))throw new X("bad-precaching-response",{url:t.url,status:s.status});return s}Y(){let t=null,e=0;for(const[s,n]of this.plugins.entries())n!==Rt.copyRedirectedCacheableResponsesPlugin&&(n===Rt.defaultPrecacheCacheabilityPlugin&&(t=s),n.cacheWillUpdate&&e++);0===e?this.plugins.push(Rt.defaultPrecacheCacheabilityPlugin):e>1&&null!==t&&this.plugins.splice(t,1)}}Rt.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:t})=>!t||t.status>=400?null:t},Rt.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await wt(t):t};class vt{constructor({cacheName:t,plugins:e=[],fallbackToNetwork:s=!0}={}){this.Z=new Map,this.tt=new Map,this.et=new Map,this.p=new Rt({cacheName:at(t),plugins:[...e,new lt({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.p}precache(t){this.addToCacheList(t),this.st||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.st=!0)}addToCacheList(t){const e=[];for(const s of t){"string"==typeof s?e.push(s):s&&void 0===s.revision&&e.push(s.url);const{cacheKey:t,url:n}=ht(s),r="string"!=typeof s&&s.revision?"reload":"default";if(this.Z.has(n)&&this.Z.get(n)!==t)throw new X("add-to-cache-list-conflicting-entries",{firstEntry:this.Z.get(n),secondEntry:t});if("string"!=typeof s&&s.integrity){if(this.et.has(t)&&this.et.get(t)!==s.integrity)throw new X("add-to-cache-list-conflicting-integrities",{url:n});this.et.set(t,s.integrity)}if(this.Z.set(n,t),this.tt.set(n,r),e.length>0){const t=`Workbox is precaching URLs without revision info: ${e.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(t)}}}install(t){return ct(t,(async()=>{const e=new ut;this.strategy.plugins.push(e);for(const[e,s]of this.Z){const n=this.et.get(s),r=this.tt.get(e),i=new Request(e,{integrity:n,cache:r,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:t}))}const{updatedURLs:s,notUpdatedURLs:n}=e;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(t){return ct(t,(async()=>{const t=await self.caches.open(this.strategy.cacheName),e=await t.keys(),s=new Set(this.Z.values()),n=[];for(const r of e)s.has(r.url)||(await t.delete(r),n.push(r.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.Z}getCachedURLs(){return[...this.Z.keys()]}getCacheKeyForURL(t){const e=new URL(t,location.href);return this.Z.get(e.href)}getIntegrityForCacheKey(t){return this.et.get(t)}async matchPrecache(t){const e=t instanceof Request?t.url:t,s=this.getCacheKeyForURL(e);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(t){const e=this.getCacheKeyForURL(t);if(!e)throw new X("non-precached-url",{url:t});return s=>(s.request=new Request(t),s.params=Object.assign({cacheKey:e},s.params),this.strategy.handle(s))}}let bt;const Et=()=>(bt||(bt=new vt),bt);class Dt extends Z{constructor(t,e){super((({request:s})=>{const n=t.getURLsToCacheKeys();for(const r of function*(t,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:r}={}){const i=new URL(t,location.href);i.hash="",yield i.href;const a=function(t,e=[]){for(const s of[...t.searchParams.keys()])e.some((t=>t.test(s)))&&t.searchParams.delete(s);return t}(i,e);if(yield a.href,s&&a.pathname.endsWith("/")){const t=new URL(a.href);t.pathname+=s,yield t.href}if(n){const t=new URL(a.href);t.pathname+=".html",yield t.href}if(r){const t=r({url:i});for(const e of t)yield e.href}}(s.url,e)){const e=n.get(r);if(e){return{cacheKey:e,integrity:t.getIntegrityForCacheKey(e)}}}}),t.strategy)}}function Ut(t){const e=Et();!function(t,e,s){let n;if("string"==typeof t){const r=new URL(t,location.href);n=new Z((({url:t})=>t.href===r.href),e,s)}else if(t instanceof RegExp)n=new tt(t,e,s);else if("function"==typeof t)n=new Z(t,e,s);else{if(!(t instanceof Z))throw new X("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=t}nt().registerRoute(n)}(new Dt(e,t))}t.BackgroundSyncPlugin=class{constructor(t,e){this.fetchDidFail=async({request:t})=>{await this.nt.pushRequest({request:t})},this.nt=new z(t,e)}},t.CacheableResponsePlugin=class{constructor(t){this.cacheWillUpdate=async({response:t})=>this.rt.isResponseCacheable(t)?t:null,this.rt=new c(t)}},t.NavigationRoute=class extends r{constructor(t,{allowlist:e=[/./],denylist:s=[]}={}){super((t=>this.it(t)),t),this.ot=e,this.ct=s}it({url:t,request:e}){if(e&&"navigate"!==e.mode)return!1;const s=t.pathname+t.search;for(const t of this.ct)if(t.test(s))return!1;return!!this.ot.some((t=>t.test(s)))}},t.NetworkFirst=class extends R{constructor(t={}){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(h),this.ht=t.networkTimeoutSeconds||0}async O(t,e){const n=[],r=[];let i;if(this.ht){const{id:s,promise:a}=this.ut({request:t,logs:n,handler:e});i=s,r.push(a)}const a=this.lt({timeoutId:i,request:t,logs:n,handler:e});r.push(a);const o=await e.waitUntil((async()=>await e.waitUntil(Promise.race(r))||await a)());if(!o)throw new s("no-response",{url:t.url});return o}ut({request:t,logs:e,handler:s}){let n;return{promise:new Promise((e=>{n=setTimeout((async()=>{e(await s.cacheMatch(t))}),1e3*this.ht)})),id:n}}async lt({timeoutId:t,request:e,logs:s,handler:n}){let r,i;try{i=await n.fetchAndCachePut(e)}catch(t){t instanceof Error&&(r=t)}return t&&clearTimeout(t),!r&&i||(i=await n.cacheMatch(e)),i}},t.NetworkOnly=class extends R{constructor(t={}){super(t),this.ht=t.networkTimeoutSeconds||0}async O(t,e){let n,r;try{const s=[e.fetch(t)];if(this.ht){const t=g(1e3*this.ht);s.push(t)}if(r=await Promise.race(s),!r)throw new Error(`Timed out the network response after ${this.ht} seconds.`)}catch(t){t instanceof Error&&(n=t)}if(!r)throw new s("no-response",{url:t.url,error:n});return r}},t.createHandlerBoundToURL=function(t){return Et().createHandlerBoundToURL(t)},t.precacheAndRoute=function(t,e){!function(t){Et().precache(t)}(t),Ut(e)},t.registerRoute=function(t,e,n){let c;if("string"==typeof t){const s=new URL(t,location.href);c=new r((({url:t})=>t.href===s.href),e,n)}else if(t instanceof RegExp)c=new i(t,e,n);else if("function"==typeof t)c=new r(t,e,n);else{if(!(t instanceof r))throw new s("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});c=t}return(o||(o=new a,o.addFetchListener(),o.addCacheListener()),o).registerRoute(c),c},t.setCacheNameDetails=function(t){f(t)}}));
//# sourceMappingURL=workbox-6626cfb4.js.map
