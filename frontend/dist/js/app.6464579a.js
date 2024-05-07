(function(){"use strict";var t={753:function(t,o,e){var n=e(751),a=e(641);function r(t,o,e,n,r,s){const d=(0,a.g2)("router-view");return(0,a.uX)(),(0,a.Wv)(d)}var s={name:"App",components:{}},d=e(262);const i=(0,d.A)(s,[["render",r]]);var c=i,l=e(723);"serviceWorker"in navigator&&(0,l.k)("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(t){console.error("Error during service worker registration:",t)}});var u=e(839),f=e(220);const h={class:"main-container"};function v(t,o,e,n,r,s){const d=(0,a.g2)("LogoBar"),i=(0,a.g2)("AddNoteComponent"),c=(0,a.g2)("NoteComponent");return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.bF)(d),(0,a.bF)(i,{onNoteAdded:s.addNoteEventHandler},null,8,["onNoteAdded"]),(0,a.Lk)("div",h,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(t.notes,(t=>((0,a.uX)(),(0,a.Wv)(c,{key:t.Id,noteDate:t.date,note:t.note},null,8,["noteDate","note"])))),128))])],64)}const g=(0,a.Fv)('<header class="header-container" data-v-2170dd41><img src="https://img.icons8.com/dusk/64/note.png" alt="note" data-v-2170dd41><h1 data-v-2170dd41>AON5-PWA</h1></header><nav class="nav-bar" data-v-2170dd41><a href="/" data-v-2170dd41>Home</a><a href="/about" data-v-2170dd41>About</a></nav>',2);function p(t,o,e,n,a,r){return g}var m={name:"LogoBar"};const b=(0,d.A)(m,[["render",p],["__scopeId","data-v-2170dd41"]]);var w=b;const k=t=>((0,a.Qi)("data-v-331da2d8"),t=t(),(0,a.jt)(),t),N={class:"add-container"},A=k((()=>(0,a.Lk)("br",null,null,-1)));function y(t,o,e,r,s,d){return(0,a.uX)(),(0,a.CE)("div",N,[(0,a.bo)((0,a.Lk)("textarea",{"onUpdate:modelValue":o[0]||(o[0]=o=>t.note=o),name:"addNote",id:"addNote"},null,512),[[n.Jo,t.note]]),A,(0,a.Lk)("button",{onClick:o[1]||(o[1]=t=>d.addNote()),id:"addButton"},"Add")])}const C=(0,u.nY)("global",{state:()=>({notes:[]}),actions:{async getAllNotes(){try{const t=await fetch("http://localhost:8091/notes");if(!t.ok)throw new Error("Network response was not ok");this.notes=await t.json(),this.notes.reverse()}catch(t){console.error("Error fetching data:",t)}},async addNoteSync(t){const o={note:t};try{const t=await fetch("http://localhost:8091/notes/add",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!t.ok)throw new Error("Network response was not ok")}catch(e){navigator.onLine?console.error("Error posting data:",e):console.log("Data posted offline, setting for sync...")}}}});var E={name:"AddNoteComponent",data:()=>({note:"",global:null}),methods:{async addNote(){await this.global.addNoteSync(this.note),this.note="",this.$emit("noteAdded",!0)}},mounted(){this.global=C()}};const L=(0,d.A)(E,[["render",y],["__scopeId","data-v-331da2d8"]]);var O=L,S=e(33);const D={class:"note"};function j(t,o,e,n,r,s){return(0,a.uX)(),(0,a.CE)("div",D,[(0,a.Lk)("h2",null,(0,S.v_)(t.formattedDate),1),(0,a.Lk)("h5",null,(0,S.v_)(e.note),1)])}var F={name:"NoteComponent",data:()=>({formattedDate:""}),props:["noteDate","note"],methods:{formateDate(t){const o=new Date(t),e=o.getDate(),n=o.getMonth()+1,a=o.getFullYear(),r=o.getHours(),s=o.getMinutes();this.formattedDate=`${r.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")} • ${e.toString().padStart(2,"0")}/${n.toString().padStart(2,"0")}/${a}`}},mounted(){this.formateDate(this.noteDate)}};const _=(0,d.A)(F,[["render",j],["__scopeId","data-v-2d32a1b5"]]);var B=_,X={name:"NotesView",data:()=>({notes:[],global:null}),components:{LogoBar:w,AddNoteComponent:O,NoteComponent:B},methods:{async getAllNotes(){await this.global.getAllNotes(),this.notes=this.global.notes,console.log(this.notes)},addNoteEventHandler(t){t&&this.getAllNotes()}},mounted(){this.global=C(),this.getAllNotes()}};const I=(0,d.A)(X,[["render",v]]);var $=I;const x=t=>((0,a.Qi)("data-v-0097d90e"),t=t(),(0,a.jt)(),t),P=x((()=>(0,a.Lk)("main",null,[(0,a.Lk)("p",null,"This is a PWA for notes")],-1)));function T(t,o,e,n,r,s){const d=(0,a.g2)("LogoBar");return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.bF)(d),P],64)}var W={name:"AboutView",data:()=>({}),components:{LogoBar:w},methods:{},mounted(){}};const H=(0,d.A)(W,[["render",T],["__scopeId","data-v-0097d90e"]]);var K=H;const V=(0,f.aE)({history:(0,f.LA)(),routes:[{path:"/",name:"home",component:$},{path:"/about",name:"about",component:K}]});var J=V;const M=(0,n.Ef)(c);M.use((0,u.Ey)()),M.use(J),M.mount("#app")}},o={};function e(n){var a=o[n];if(void 0!==a)return a.exports;var r=o[n]={exports:{}};return t[n](r,r.exports,e),r.exports}e.m=t,function(){var t=[];e.O=function(o,n,a,r){if(!n){var s=1/0;for(l=0;l<t.length;l++){n=t[l][0],a=t[l][1],r=t[l][2];for(var d=!0,i=0;i<n.length;i++)(!1&r||s>=r)&&Object.keys(e.O).every((function(t){return e.O[t](n[i])}))?n.splice(i--,1):(d=!1,r<s&&(s=r));if(d){t.splice(l--,1);var c=a();void 0!==c&&(o=c)}}return o}r=r||0;for(var l=t.length;l>0&&t[l-1][2]>r;l--)t[l]=t[l-1];t[l]=[n,a,r]}}(),function(){e.d=function(t,o){for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)}}(),function(){var t={524:0};e.O.j=function(o){return 0===t[o]};var o=function(o,n){var a,r,s=n[0],d=n[1],i=n[2],c=0;if(s.some((function(o){return 0!==t[o]}))){for(a in d)e.o(d,a)&&(e.m[a]=d[a]);if(i)var l=i(e)}for(o&&o(n);c<s.length;c++)r=s[c],e.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return e.O(l)},n=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];n.forEach(o.bind(null,0)),n.push=o.bind(null,n.push.bind(n))}();var n=e.O(void 0,[504],(function(){return e(753)}));n=e.O(n)})();
//# sourceMappingURL=app.6464579a.js.map