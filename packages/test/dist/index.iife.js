var demotest=function(xe){"use strict";function Qt(e,t){const n=Object.create(null),s=e.split(",");for(let r=0;r<s.length;r++)n[s[r]]=!0;return t?r=>!!n[r.toLowerCase()]:r=>!!n[r]}const $=process.env.NODE_ENV!=="production"?Object.freeze({}):{},Xt=process.env.NODE_ENV!=="production"?Object.freeze([]):[],tt=()=>{},Zt=/^on[^a-z]/,kt=e=>Zt.test(e),I=Object.assign,en=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},tn=Object.prototype.hasOwnProperty,w=(e,t)=>tn.call(e,t),m=Array.isArray,Y=e=>ae(e)==="[object Map]",nn=e=>ae(e)==="[object Set]",b=e=>typeof e=="function",D=e=>typeof e=="string",Re=e=>typeof e=="symbol",v=e=>e!==null&&typeof e=="object",rn=e=>v(e)&&b(e.then)&&b(e.catch),sn=Object.prototype.toString,ae=e=>sn.call(e),nt=e=>ae(e).slice(8,-1),on=e=>ae(e)==="[object Object]",Ie=e=>D(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,cn=(e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))})(e=>e.charAt(0).toUpperCase()+e.slice(1)),ee=(e,t)=>!Object.is(e,t),ln=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})};let rt;const De=()=>rt||(rt=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ce(e){if(m(e)){const t={};for(let n=0;n<e.length;n++){const s=e[n],r=D(s)?pn(s):Ce(s);if(r)for(const o in r)t[o]=r[o]}return t}else{if(D(e))return e;if(v(e))return e}}const un=/;(?![^(]*\))/g,an=/:([^]+)/,fn=/\/\*[^]*?\*\//g;function pn(e){const t={};return e.replace(fn,"").split(un).forEach(n=>{if(n){const s=n.split(an);s.length>1&&(t[s[0].trim()]=s[1].trim())}}),t}function Te(e){let t="";if(D(e))t=e;else if(m(e))for(let n=0;n<e.length;n++){const s=Te(e[n]);s&&(t+=s+" ")}else if(v(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}function st(e,...t){console.warn(`[Vue warn] ${e}`,...t)}let ot;function dn(e,t=ot){t&&t.active&&t.effects.push(e)}function hn(){return ot}const te=e=>{const t=new Set(e);return t.w=0,t.n=0,t},it=e=>(e.w&M)>0,ct=e=>(e.n&M)>0,_n=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=M},gn=e=>{const{deps:t}=e;if(t.length){let n=0;for(let s=0;s<t.length;s++){const r=t[s];it(r)&&!ct(r)?r.delete(e):t[n++]=r,r.w&=~M,r.n&=~M}t.length=n}},$e=new WeakMap;let ne=0,M=1;const Pe=30;let S;const B=Symbol(process.env.NODE_ENV!=="production"?"iterate":""),Me=Symbol(process.env.NODE_ENV!=="production"?"Map key iterate":"");class mn{constructor(t,n=null,s){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,dn(this,s)}run(){if(!this.active)return this.fn();let t=S,n=F;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=S,S=this,F=!0,M=1<<++ne,ne<=Pe?_n(this):lt(this),this.fn()}finally{ne<=Pe&&gn(this),M=1<<--ne,S=this.parent,F=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){S===this?this.deferStop=!0:this.active&&(lt(this),this.onStop&&this.onStop(),this.active=!1)}}function lt(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let F=!0;const ut=[];function at(){ut.push(F),F=!1}function ft(){const e=ut.pop();F=e===void 0?!0:e}function R(e,t,n){if(F&&S){let s=$e.get(e);s||$e.set(e,s=new Map);let r=s.get(n);r||s.set(n,r=te());const o=process.env.NODE_ENV!=="production"?{effect:S,target:e,type:t,key:n}:void 0;Fe(r,o)}}function Fe(e,t){let n=!1;ne<=Pe?ct(e)||(e.n|=M,n=!it(e)):n=!e.has(S),n&&(e.add(S),S.deps.push(e),process.env.NODE_ENV!=="production"&&S.onTrack&&S.onTrack(I({effect:S},t)))}function A(e,t,n,s,r,o){const i=$e.get(e);if(!i)return;let c=[];if(t==="clear")c=[...i.values()];else if(n==="length"&&m(e)){const a=Number(s);i.forEach((_,l)=>{(l==="length"||l>=a)&&c.push(_)})}else switch(n!==void 0&&c.push(i.get(n)),t){case"add":m(e)?Ie(n)&&c.push(i.get("length")):(c.push(i.get(B)),Y(e)&&c.push(i.get(Me)));break;case"delete":m(e)||(c.push(i.get(B)),Y(e)&&c.push(i.get(Me)));break;case"set":Y(e)&&c.push(i.get(B));break}const u=process.env.NODE_ENV!=="production"?{target:e,type:t,key:n,newValue:s,oldValue:r,oldTarget:o}:void 0;if(c.length===1)c[0]&&(process.env.NODE_ENV!=="production"?Q(c[0],u):Q(c[0]));else{const a=[];for(const _ of c)_&&a.push(..._);process.env.NODE_ENV!=="production"?Q(te(a),u):Q(te(a))}}function Q(e,t){const n=m(e)?e:[...e];for(const s of n)s.computed&&pt(s,t);for(const s of n)s.computed||pt(s,t)}function pt(e,t){(e!==S||e.allowRecurse)&&(process.env.NODE_ENV!=="production"&&e.onTrigger&&e.onTrigger(I({effect:e},t)),e.scheduler?e.scheduler():e.run())}const En=Qt("__proto__,__v_isRef,__isVue"),dt=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Re)),wn=Ae(),Nn=Ae(!0),bn=Ae(!0,!0),ht=On();function On(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const s=d(this);for(let o=0,i=this.length;o<i;o++)R(s,"get",o+"");const r=s[t](...n);return r===-1||r===!1?s[t](...n.map(d)):r}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){at();const s=d(this)[t].apply(this,n);return ft(),s}}),e}function vn(e){const t=d(this);return R(t,"has",e),t.hasOwnProperty(e)}function Ae(e=!1,t=!1){return function(s,r,o){if(r==="__v_isReactive")return!e;if(r==="__v_isReadonly")return e;if(r==="__v_isShallow")return t;if(r==="__v_raw"&&o===(e?t?vt:Ot:t?Kn:bt).get(s))return s;const i=m(s);if(!e){if(i&&w(ht,r))return Reflect.get(ht,r,o);if(r==="hasOwnProperty")return vn}const c=Reflect.get(s,r,o);return(Re(r)?dt.has(r):En(r))||(e||R(s,"get",r),t)?c:y(c)?i&&Ie(r)?c:c.value:v(c)?e?yt(c):St(c):c}}const Sn=yn();function yn(e=!1){return function(n,s,r,o){let i=n[s];if(K(i)&&y(i)&&!y(r))return!1;if(!e&&(!Ee(r)&&!K(r)&&(i=d(i),r=d(r)),!m(n)&&y(i)&&!y(r)))return i.value=r,!0;const c=m(n)&&Ie(s)?Number(s)<n.length:w(n,s),u=Reflect.set(n,s,r,o);return n===d(o)&&(c?ee(r,i)&&A(n,"set",s,r,i):A(n,"add",s,r)),u}}function Vn(e,t){const n=w(e,t),s=e[t],r=Reflect.deleteProperty(e,t);return r&&n&&A(e,"delete",t,void 0,s),r}function xn(e,t){const n=Reflect.has(e,t);return(!Re(t)||!dt.has(t))&&R(e,"has",t),n}function Rn(e){return R(e,"iterate",m(e)?"length":B),Reflect.ownKeys(e)}const In={get:wn,set:Sn,deleteProperty:Vn,has:xn,ownKeys:Rn},_t={get:Nn,set(e,t){return process.env.NODE_ENV!=="production"&&st(`Set operation on key "${String(t)}" failed: target is readonly.`,e),!0},deleteProperty(e,t){return process.env.NODE_ENV!=="production"&&st(`Delete operation on key "${String(t)}" failed: target is readonly.`,e),!0}},Dn=I({},_t,{get:bn}),je=e=>e,fe=e=>Reflect.getPrototypeOf(e);function pe(e,t,n=!1,s=!1){e=e.__v_raw;const r=d(e),o=d(t);n||(t!==o&&R(r,"get",t),R(r,"get",o));const{has:i}=fe(r),c=s?je:n?Ue:re;if(i.call(r,t))return c(e.get(t));if(i.call(r,o))return c(e.get(o));e!==r&&e.get(t)}function de(e,t=!1){const n=this.__v_raw,s=d(n),r=d(e);return t||(e!==r&&R(s,"has",e),R(s,"has",r)),e===r?n.has(e):n.has(e)||n.has(r)}function he(e,t=!1){return e=e.__v_raw,!t&&R(d(e),"iterate",B),Reflect.get(e,"size",e)}function gt(e){e=d(e);const t=d(this);return fe(t).has.call(t,e)||(t.add(e),A(t,"add",e,e)),this}function mt(e,t){t=d(t);const n=d(this),{has:s,get:r}=fe(n);let o=s.call(n,e);o?process.env.NODE_ENV!=="production"&&Nt(n,s,e):(e=d(e),o=s.call(n,e));const i=r.call(n,e);return n.set(e,t),o?ee(t,i)&&A(n,"set",e,t,i):A(n,"add",e,t),this}function Et(e){const t=d(this),{has:n,get:s}=fe(t);let r=n.call(t,e);r?process.env.NODE_ENV!=="production"&&Nt(t,n,e):(e=d(e),r=n.call(t,e));const o=s?s.call(t,e):void 0,i=t.delete(e);return r&&A(t,"delete",e,void 0,o),i}function wt(){const e=d(this),t=e.size!==0,n=process.env.NODE_ENV!=="production"?Y(e)?new Map(e):new Set(e):void 0,s=e.clear();return t&&A(e,"clear",void 0,void 0,n),s}function _e(e,t){return function(s,r){const o=this,i=o.__v_raw,c=d(i),u=t?je:e?Ue:re;return!e&&R(c,"iterate",B),i.forEach((a,_)=>s.call(r,u(a),u(_),o))}}function ge(e,t,n){return function(...s){const r=this.__v_raw,o=d(r),i=Y(o),c=e==="entries"||e===Symbol.iterator&&i,u=e==="keys"&&i,a=r[e](...s),_=n?je:t?Ue:re;return!t&&R(o,"iterate",u?Me:B),{next(){const{value:l,done:f}=a.next();return f?{value:l,done:f}:{value:c?[_(l[0]),_(l[1])]:_(l),done:f}},[Symbol.iterator](){return this}}}}function j(e){return function(...t){if(process.env.NODE_ENV!=="production"){const n=t[0]?`on key "${t[0]}" `:"";console.warn(`${cn(e)} operation ${n}failed: target is readonly.`,d(this))}return e==="delete"?!1:this}}function Cn(){const e={get(o){return pe(this,o)},get size(){return he(this)},has:de,add:gt,set:mt,delete:Et,clear:wt,forEach:_e(!1,!1)},t={get(o){return pe(this,o,!1,!0)},get size(){return he(this)},has:de,add:gt,set:mt,delete:Et,clear:wt,forEach:_e(!1,!0)},n={get(o){return pe(this,o,!0)},get size(){return he(this,!0)},has(o){return de.call(this,o,!0)},add:j("add"),set:j("set"),delete:j("delete"),clear:j("clear"),forEach:_e(!0,!1)},s={get(o){return pe(this,o,!0,!0)},get size(){return he(this,!0)},has(o){return de.call(this,o,!0)},add:j("add"),set:j("set"),delete:j("delete"),clear:j("clear"),forEach:_e(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(o=>{e[o]=ge(o,!1,!1),n[o]=ge(o,!0,!1),t[o]=ge(o,!1,!0),s[o]=ge(o,!0,!0)}),[e,n,t,s]}const[Tn,$n,Pn,Mn]=Cn();function Ke(e,t){const n=t?e?Mn:Pn:e?$n:Tn;return(s,r,o)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_raw"?s:Reflect.get(w(n,r)&&r in s?n:s,r,o)}const Fn={get:Ke(!1,!1)},An={get:Ke(!0,!1)},jn={get:Ke(!0,!0)};function Nt(e,t,n){const s=d(n);if(s!==n&&t.call(e,s)){const r=nt(e);console.warn(`Reactive ${r} contains both the raw and reactive versions of the same object${r==="Map"?" as keys":""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)}}const bt=new WeakMap,Kn=new WeakMap,Ot=new WeakMap,vt=new WeakMap;function zn(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Hn(e){return e.__v_skip||!Object.isExtensible(e)?0:zn(nt(e))}function St(e){return K(e)?e:ze(e,!1,In,Fn,bt)}function yt(e){return ze(e,!0,_t,An,Ot)}function me(e){return ze(e,!0,Dn,jn,vt)}function ze(e,t,n,s,r){if(!v(e))return process.env.NODE_ENV!=="production"&&console.warn(`value cannot be made reactive: ${String(e)}`),e;if(e.__v_raw&&!(t&&e.__v_isReactive))return e;const o=r.get(e);if(o)return o;const i=Hn(e);if(i===0)return e;const c=new Proxy(e,i===2?s:n);return r.set(e,c),c}function q(e){return K(e)?q(e.__v_raw):!!(e&&e.__v_isReactive)}function K(e){return!!(e&&e.__v_isReadonly)}function Ee(e){return!!(e&&e.__v_isShallow)}function He(e){return q(e)||K(e)}function d(e){const t=e&&e.__v_raw;return t?d(t):e}function Un(e){return ln(e,"__v_skip",!0),e}const re=e=>v(e)?St(e):e,Ue=e=>v(e)?yt(e):e;function Wn(e){F&&S&&(e=d(e),process.env.NODE_ENV!=="production"?Fe(e.dep||(e.dep=te()),{target:e,type:"get",key:"value"}):Fe(e.dep||(e.dep=te())))}function Bn(e,t){e=d(e);const n=e.dep;n&&(process.env.NODE_ENV!=="production"?Q(n,{target:e,type:"set",key:"value",newValue:t}):Q(n))}function y(e){return!!(e&&e.__v_isRef===!0)}function We(e){return qn(e,!1)}function qn(e,t){return y(e)?e:new Jn(e,t)}class Jn{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:d(t),this._value=n?t:re(t)}get value(){return Wn(this),this._value}set value(t){const n=this.__v_isShallow||Ee(t)||K(t);t=n?t:d(t),ee(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:re(t),Bn(this,t))}}function Gn(e){return y(e)?e.value:e}const Ln={get:(e,t,n)=>Gn(Reflect.get(e,t,n)),set:(e,t,n,s)=>{const r=e[t];return y(r)&&!y(n)?(r.value=n,!0):Reflect.set(e,t,n,s)}};function Yn(e){return q(e)?e:new Proxy(e,Ln)}const J=[];function Qn(e){J.push(e)}function Xn(){J.pop()}function O(e,...t){if(process.env.NODE_ENV==="production")return;at();const n=J.length?J[J.length-1].component:null,s=n&&n.appContext.config.warnHandler,r=Zn();if(s)G(s,n,11,[e+t.join(""),n&&n.proxy,r.map(({vnode:o})=>`at <${Lt(n,o.type)}>`).join(`
`),r]);else{const o=[`[Vue warn]: ${e}`,...t];r.length&&o.push(`
`,...kn(r)),console.warn(...o)}ft()}function Zn(){let e=J[J.length-1];if(!e)return[];const t=[];for(;e;){const n=t[0];n&&n.vnode===e?n.recurseCount++:t.push({vnode:e,recurseCount:0});const s=e.component&&e.component.parent;e=s&&s.vnode}return t}function kn(e){const t=[];return e.forEach((n,s)=>{t.push(...s===0?[]:[`
`],...er(n))}),t}function er({vnode:e,recurseCount:t}){const n=t>0?`... (${t} recursive calls)`:"",s=e.component?e.component.parent==null:!1,r=` at <${Lt(e.component,e.type,s)}`,o=">"+n;return e.props?[r,...tr(e.props),o]:[r+o]}function tr(e){const t=[],n=Object.keys(e);return n.slice(0,3).forEach(s=>{t.push(...Vt(s,e[s]))}),n.length>3&&t.push(" ..."),t}function Vt(e,t,n){return D(t)?(t=JSON.stringify(t),n?t:[`${e}=${t}`]):typeof t=="number"||typeof t=="boolean"||t==null?n?t:[`${e}=${t}`]:y(t)?(t=Vt(e,d(t.value),!0),n?t:[`${e}=Ref<`,t,">"]):b(t)?[`${e}=fn${t.name?`<${t.name}>`:""}`]:(t=d(t),n?t:[`${e}=`,t])}const xt={sp:"serverPrefetch hook",bc:"beforeCreate hook",c:"created hook",bm:"beforeMount hook",m:"mounted hook",bu:"beforeUpdate hook",u:"updated",bum:"beforeUnmount hook",um:"unmounted hook",a:"activated hook",da:"deactivated hook",ec:"errorCaptured hook",rtc:"renderTracked hook",rtg:"renderTriggered hook",0:"setup function",1:"render function",2:"watcher getter",3:"watcher callback",4:"watcher cleanup function",5:"native event handler",6:"component event handler",7:"vnode hook",8:"directive hook",9:"transition hook",10:"app errorHandler",11:"app warnHandler",12:"ref function",13:"async component loader",14:"scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"};function G(e,t,n,s){let r;try{r=s?e(...s):e()}catch(o){qe(o,t,n)}return r}function Be(e,t,n,s){if(b(e)){const o=G(e,t,n,s);return o&&rn(o)&&o.catch(i=>{qe(i,t,n)}),o}const r=[];for(let o=0;o<e.length;o++)r.push(Be(e[o],t,n,s));return r}function qe(e,t,n,s=!0){const r=t?t.vnode:null;if(t){let o=t.parent;const i=t.proxy,c=process.env.NODE_ENV!=="production"?xt[n]:n;for(;o;){const a=o.ec;if(a){for(let _=0;_<a.length;_++)if(a[_](e,i,c)===!1)return}o=o.parent}const u=t.appContext.config.errorHandler;if(u){G(u,null,10,[e,i,c]);return}}nr(e,n,r,s)}function nr(e,t,n,s=!0){if(process.env.NODE_ENV!=="production"){const r=xt[t];if(n&&Qn(n),O(`Unhandled error${r?` during execution of ${r}`:""}`),n&&Xn(),s)throw e;console.error(e)}else console.error(e)}let we=!1,Je=!1;const C=[];let z=0;const X=[];let P=null,H=0;const Rt=Promise.resolve();let Ge=null;const rr=100;function sr(e){const t=Ge||Rt;return e?t.then(this?e.bind(this):e):t}function or(e){let t=z+1,n=C.length;for(;t<n;){const s=t+n>>>1;se(C[s])<e?t=s+1:n=s}return t}function Ne(e){(!C.length||!C.includes(e,we&&e.allowRecurse?z+1:z))&&(e.id==null?C.push(e):C.splice(or(e.id),0,e),It())}function It(){!we&&!Je&&(Je=!0,Ge=Rt.then(Ct))}function Dt(e){m(e)?X.push(...e):(!P||!P.includes(e,e.allowRecurse?H+1:H))&&X.push(e),It()}function ir(e){if(X.length){const t=[...new Set(X)];if(X.length=0,P){P.push(...t);return}for(P=t,process.env.NODE_ENV!=="production"&&(e=e||new Map),P.sort((n,s)=>se(n)-se(s)),H=0;H<P.length;H++)process.env.NODE_ENV!=="production"&&Tt(e,P[H])||P[H]();P=null,H=0}}const se=e=>e.id==null?1/0:e.id,cr=(e,t)=>{const n=se(e)-se(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function Ct(e){Je=!1,we=!0,process.env.NODE_ENV!=="production"&&(e=e||new Map),C.sort(cr);const t=process.env.NODE_ENV!=="production"?n=>Tt(e,n):tt;try{for(z=0;z<C.length;z++){const n=C[z];if(n&&n.active!==!1){if(process.env.NODE_ENV!=="production"&&t(n))continue;G(n,null,14)}}}finally{z=0,C.length=0,ir(e),we=!1,Ge=null,(C.length||X.length)&&Ct(e)}}function Tt(e,t){if(!e.has(t))e.set(t,1);else{const n=e.get(t);if(n>rr){const s=t.ownerInstance,r=s&&Gt(s.type);return O(`Maximum recursive updates exceeded${r?` in component <${r}>`:""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`),!0}else e.set(t,n+1)}}const oe=new Set;process.env.NODE_ENV!=="production"&&(De().__VUE_HMR_RUNTIME__={createRecord:Le(lr),rerender:Le(ur),reload:Le(ar)});const be=new Map;function lr(e,t){return be.has(e)?!1:(be.set(e,{initialDef:ie(t),instances:new Set}),!0)}function ie(e){return Yt(e)?e.__vccOpts:e}function ur(e,t){const n=be.get(e);n&&(n.initialDef.render=t,[...n.instances].forEach(s=>{t&&(s.render=t,ie(s.type).render=t),s.renderCache=[],s.update()}))}function ar(e,t){const n=be.get(e);if(!n)return;t=ie(t),$t(n.initialDef,t);const s=[...n.instances];for(const r of s){const o=ie(r.type);oe.has(o)||(o!==n.initialDef&&$t(o,t),oe.add(o)),r.appContext.propsCache.delete(r.type),r.appContext.emitsCache.delete(r.type),r.appContext.optionsCache.delete(r.type),r.ceReload?(oe.add(o),r.ceReload(t.styles),oe.delete(o)):r.parent?Ne(r.parent.update):r.appContext.reload?r.appContext.reload():typeof window<"u"?window.location.reload():console.warn("[HMR] Root or manually mounted instance modified. Full reload required.")}Dt(()=>{for(const r of s)oe.delete(ie(r.type))})}function $t(e,t){I(e,t);for(const n in e)n!=="__file"&&!(n in t)&&delete e[n]}function Le(e){return(t,n)=>{try{return e(t,n)}catch(s){console.error(s),console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.")}}}let U=null,fr=null;function ts(){}const pr=e=>e.__isSuspense;function dr(e,t){t&&t.pendingBranch?m(e)?t.effects.push(...e):t.effects.push(e):Dt(e)}const Oe={};function hr(e,t,{immediate:n,deep:s,flush:r,onTrack:o,onTrigger:i}=$){var c;process.env.NODE_ENV!=="production"&&!t&&(n!==void 0&&O('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'),s!==void 0&&O('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));const u=E=>{O("Invalid watch source: ",E,"A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.")},a=hn()===((c=L)==null?void 0:c.scope)?L:null;let _,l=!1,f=!1;if(y(e)?(_=()=>e.value,l=Ee(e)):q(e)?(_=()=>e,s=!0):m(e)?(f=!0,l=e.some(E=>q(E)||Ee(E)),_=()=>e.map(E=>{if(y(E))return E.value;if(q(E))return Z(E);if(b(E))return G(E,a,2);process.env.NODE_ENV!=="production"&&u(E)})):b(e)?t?_=()=>G(e,a,2):_=()=>{if(!(a&&a.isUnmounted))return h&&h(),Be(e,a,3,[p])}:(_=tt,process.env.NODE_ENV!=="production"&&u(e)),t&&s){const E=_;_=()=>Z(E())}let h,p=E=>{h=g.onStop=()=>{G(E,a,4)}},N=f?new Array(e.length).fill(Oe):Oe;const x=()=>{if(g.active)if(t){const E=g.run();(s||l||(f?E.some((Zr,kr)=>ee(Zr,N[kr])):ee(E,N)))&&(h&&h(),Be(t,a,3,[E,N===Oe?void 0:f&&N[0]===Oe?[]:N,p]),N=E)}else g.run()};x.allowRecurse=!!t;let W;r==="sync"?W=x:r==="post"?W=()=>jt(x,a&&a.suspense):(x.pre=!0,a&&(x.id=a.uid),W=()=>Ne(x));const g=new mn(_,W);return process.env.NODE_ENV!=="production"&&(g.onTrack=o,g.onTrigger=i),t?n?x():N=g.run():r==="post"?jt(g.run.bind(g),a&&a.suspense):g.run(),()=>{g.stop(),a&&a.scope&&en(a.scope.effects,g)}}function _r(e,t,n){const s=this.proxy,r=D(e)?e.includes(".")?gr(s,e):()=>s[e]:e.bind(s,s);let o;b(t)?o=t:(o=t.handler,n=t);const i=L;Jt(this);const c=hr(r,o.bind(s),n);return i?Jt(i):Kr(),c}function gr(e,t){const n=t.split(".");return()=>{let s=e;for(let r=0;r<n.length&&s;r++)s=s[n[r]];return s}}function Z(e,t){if(!v(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),y(e))Z(e.value,t);else if(m(e))for(let n=0;n<e.length;n++)Z(e[n],t);else if(nn(e)||Y(e))e.forEach(n=>{Z(n,t)});else if(on(e))for(const n in e)Z(e[n],t);return e}function mr(e,t){return b(e)?(()=>I({name:e.name},t,{setup:e}))():e}function Er(e){b(e)&&(e={loader:e});const{loader:t,loadingComponent:n,errorComponent:s,delay:r=200,timeout:o,suspensible:i=!0,onError:c}=e;let u=null,a,_=0;const l=()=>(_++,u=null,f()),f=()=>{let h;return u||(h=u=t().catch(p=>{if(p=p instanceof Error?p:new Error(String(p)),c)return new Promise((N,x)=>{c(p,()=>N(l()),()=>x(p),_+1)});throw p}).then(p=>{if(h!==u&&u)return u;if(process.env.NODE_ENV!=="production"&&!p&&O("Async component loader resolved to undefined. If you are using retry(), make sure to return its return value."),p&&(p.__esModule||p[Symbol.toStringTag]==="Module")&&(p=p.default),process.env.NODE_ENV!=="production"&&p&&!v(p)&&!b(p))throw new Error(`Invalid async component load result: ${p}`);return a=p,p}))};return mr({name:"AsyncComponentWrapper",__asyncLoader:f,get __asyncResolved(){return a},setup(){const h=L;if(a)return()=>Ye(a,h);const p=g=>{u=null,qe(g,h,13,!s)};if(i&&h.suspense||Hr)return f().then(g=>()=>Ye(g,h)).catch(g=>(p(g),()=>s?ue(s,{error:g}):null));const N=We(!1),x=We(),W=We(!!r);return r&&setTimeout(()=>{W.value=!1},r),o!=null&&setTimeout(()=>{if(!N.value&&!x.value){const g=new Error(`Async component timed out after ${o}ms.`);p(g),x.value=g}},o),f().then(()=>{N.value=!0,h.parent&&wr(h.parent.vnode)&&Ne(h.parent.update)}).catch(g=>{p(g),x.value=g}),()=>{if(N.value&&a)return Ye(a,h);if(x.value&&s)return ue(s,{error:x.value});if(n&&!W.value)return ue(n)}}})}function Ye(e,t){const{ref:n,props:s,children:r,ce:o}=t.vnode,i=ue(e,s,r);return i.ref=n,i.ce=o,delete t.vnode.ce,i}const wr=e=>e.type.__isKeepAlive,Nr=Symbol.for("v-ndc"),Qe=e=>e?zr(e)?Ur(e)||e.proxy:Qe(e.parent):null,ce=I(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>process.env.NODE_ENV!=="production"?me(e.props):e.props,$attrs:e=>process.env.NODE_ENV!=="production"?me(e.attrs):e.attrs,$slots:e=>process.env.NODE_ENV!=="production"?me(e.slots):e.slots,$refs:e=>process.env.NODE_ENV!=="production"?me(e.refs):e.refs,$parent:e=>Qe(e.parent),$root:e=>Qe(e.root),$emit:e=>e.emit,$options:e=>vr(e),$forceUpdate:e=>e.f||(e.f=()=>Ne(e.update)),$nextTick:e=>e.n||(e.n=sr.bind(e.proxy)),$watch:e=>_r.bind(e)}),br=e=>e==="_"||e==="$",Xe=(e,t)=>e!==$&&!e.__isScriptSetup&&w(e,t),Or={get({_:e},t){const{ctx:n,setupState:s,data:r,props:o,accessCache:i,type:c,appContext:u}=e;if(process.env.NODE_ENV!=="production"&&t==="__isVue")return!0;let a;if(t[0]!=="$"){const h=i[t];if(h!==void 0)switch(h){case 1:return s[t];case 2:return r[t];case 4:return n[t];case 3:return o[t]}else{if(Xe(s,t))return i[t]=1,s[t];if(r!==$&&w(r,t))return i[t]=2,r[t];if((a=e.propsOptions[0])&&w(a,t))return i[t]=3,o[t];if(n!==$&&w(n,t))return i[t]=4,n[t];i[t]=0}}const _=ce[t];let l,f;if(_)return t==="$attrs"?(R(e,"get",t),process.env.NODE_ENV!=="production"&&void 0):process.env.NODE_ENV!=="production"&&t==="$slots"&&R(e,"get",t),_(e);if((l=c.__cssModules)&&(l=l[t]))return l;if(n!==$&&w(n,t))return i[t]=4,n[t];if(f=u.config.globalProperties,w(f,t))return f[t];process.env.NODE_ENV!=="production"&&U&&(!D(t)||t.indexOf("__v")!==0)&&(r!==$&&br(t[0])&&w(r,t)?O(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`):e===U&&O(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`))},set({_:e},t,n){const{data:s,setupState:r,ctx:o}=e;return Xe(r,t)?(r[t]=n,!0):process.env.NODE_ENV!=="production"&&r.__isScriptSetup&&w(r,t)?(O(`Cannot mutate <script setup> binding "${t}" from Options API.`),!1):s!==$&&w(s,t)?(s[t]=n,!0):w(e.props,t)?(process.env.NODE_ENV!=="production"&&O(`Attempting to mutate prop "${t}". Props are readonly.`),!1):t[0]==="$"&&t.slice(1)in e?(process.env.NODE_ENV!=="production"&&O(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`),!1):(process.env.NODE_ENV!=="production"&&t in e.appContext.config.globalProperties?Object.defineProperty(o,t,{enumerable:!0,configurable:!0,value:n}):o[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:s,appContext:r,propsOptions:o}},i){let c;return!!n[i]||e!==$&&w(e,i)||Xe(t,i)||(c=o[0])&&w(c,i)||w(s,i)||w(ce,i)||w(r.config.globalProperties,i)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:w(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};process.env.NODE_ENV!=="production"&&(Or.ownKeys=e=>(O("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."),Reflect.ownKeys(e)));function Pt(e){return m(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}function vr(e){const t=e.type,{mixins:n,extends:s}=t,{mixins:r,optionsCache:o,config:{optionMergeStrategies:i}}=e.appContext,c=o.get(t);let u;return c?u=c:!r.length&&!n&&!s?u=t:(u={},r.length&&r.forEach(a=>ve(u,a,i,!0)),ve(u,t,i)),v(t)&&o.set(t,u),u}function ve(e,t,n,s=!1){const{mixins:r,extends:o}=t;o&&ve(e,o,n,!0),r&&r.forEach(i=>ve(e,i,n,!0));for(const i in t)if(s&&i==="expose")process.env.NODE_ENV!=="production"&&O('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');else{const c=Sr[i]||n&&n[i];e[i]=c?c(e[i],t[i]):t[i]}return e}const Sr={data:Mt,props:At,emits:At,methods:le,computed:le,beforeCreate:V,created:V,beforeMount:V,mounted:V,beforeUpdate:V,updated:V,beforeDestroy:V,beforeUnmount:V,destroyed:V,unmounted:V,activated:V,deactivated:V,errorCaptured:V,serverPrefetch:V,components:le,directives:le,watch:Vr,provide:Mt,inject:yr};function Mt(e,t){return t?e?function(){return I(b(e)?e.call(this,this):e,b(t)?t.call(this,this):t)}:t:e}function yr(e,t){return le(Ft(e),Ft(t))}function Ft(e){if(m(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function V(e,t){return e?[...new Set([].concat(e,t))]:t}function le(e,t){return e?I(Object.create(null),e,t):t}function At(e,t){return e?m(e)&&m(t)?[...new Set([...e,...t])]:I(Object.create(null),Pt(e),Pt(t??{})):t}function Vr(e,t){if(!e)return t;if(!t)return e;const n=I(Object.create(null),e);for(const s in t)n[s]=V(e[s],t[s]);return n}const jt=dr,xr=e=>e.__isTeleport,Kt=Symbol.for("v-fgt"),Rr=Symbol.for("v-txt"),Ir=Symbol.for("v-cmt"),Se=[];let T=null;function Dr(e=!1){Se.push(T=e?null:[])}function Cr(){Se.pop(),T=Se[Se.length-1]||null}function Tr(e){return e.dynamicChildren=T||Xt,Cr(),T&&T.push(e),e}function $r(e,t,n,s,r,o){return Tr(Ut(e,t,n,s,r,o,!0))}function Pr(e){return e?e.__v_isVNode===!0:!1}const Mr=(...e)=>Wt(...e),zt="__vInternal",Ht=({key:e})=>e??null,ye=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?D(e)||y(e)||b(e)?{i:U,r:e,k:t,f:!!n}:e:null);function Ut(e,t=null,n=null,s=0,r=null,o=e===Kt?0:1,i=!1,c=!1){const u={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Ht(t),ref:t&&ye(t),scopeId:fr,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:s,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:U};return c?(Ze(u,n),o&128&&e.normalize(u)):n&&(u.shapeFlag|=D(n)?8:16),process.env.NODE_ENV!=="production"&&u.key!==u.key&&O("VNode created with invalid key (NaN). VNode type:",u.type),!i&&T&&(u.patchFlag>0||o&6)&&u.patchFlag!==32&&T.push(u),u}const ue=process.env.NODE_ENV!=="production"?Mr:Wt;function Wt(e,t=null,n=null,s=0,r=null,o=!1){if((!e||e===Nr)&&(process.env.NODE_ENV!=="production"&&!e&&O(`Invalid vnode type when creating vnode: ${e}.`),e=Ir),Pr(e)){const c=Ve(e,t,!0);return n&&Ze(c,n),!o&&T&&(c.shapeFlag&6?T[T.indexOf(e)]=c:T.push(c)),c.patchFlag|=-2,c}if(Yt(e)&&(e=e.__vccOpts),t){t=Fr(t);let{class:c,style:u}=t;c&&!D(c)&&(t.class=Te(c)),v(u)&&(He(u)&&!m(u)&&(u=I({},u)),t.style=Ce(u))}const i=D(e)?1:pr(e)?128:xr(e)?64:v(e)?4:b(e)?2:0;return process.env.NODE_ENV!=="production"&&i&4&&He(e)&&(e=d(e),O("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",`
Component that was made reactive: `,e)),Ut(e,t,n,s,r,i,o,!0)}function Fr(e){return e?He(e)||zt in e?I({},e):e:null}function Ve(e,t,n=!1){const{props:s,ref:r,patchFlag:o,children:i}=e,c=t?jr(s||{},t):s;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&Ht(c),ref:t&&t.ref?n&&r?m(r)?r.concat(ye(t)):[r,ye(t)]:ye(t):r,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:process.env.NODE_ENV!=="production"&&o===-1&&m(i)?i.map(Bt):i,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Kt?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Ve(e.ssContent),ssFallback:e.ssFallback&&Ve(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function Bt(e){const t=Ve(e);return m(e.children)&&(t.children=e.children.map(Bt)),t}function Ar(e=" ",t=0){return ue(Rr,null,e,t)}function Ze(e,t){let n=0;const{shapeFlag:s}=e;if(t==null)t=null;else if(m(t))n=16;else if(typeof t=="object")if(s&65){const r=t.default;r&&(r._c&&(r._d=!1),Ze(e,r()),r._c&&(r._d=!0));return}else{n=32;const r=t._;!r&&!(zt in t)?t._ctx=U:r===3&&U&&(U.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else b(t)?(t={default:t,_ctx:U},n=32):(t=String(t),s&64?(n=16,t=[Ar(t)]):n=8);e.children=t,e.shapeFlag|=n}function jr(...e){const t={};for(let n=0;n<e.length;n++){const s=e[n];for(const r in s)if(r==="class")t.class!==s.class&&(t.class=Te([t.class,s.class]));else if(r==="style")t.style=Ce([t.style,s.style]);else if(kt(r)){const o=t[r],i=s[r];i&&o!==i&&!(m(o)&&o.includes(i))&&(t[r]=o?[].concat(o,i):i)}else r!==""&&(t[r]=s[r])}return t}let L=null,ke,k,qt="__VUE_INSTANCE_SETTERS__";(k=De()[qt])||(k=De()[qt]=[]),k.push(e=>L=e),ke=e=>{k.length>1?k.forEach(t=>t(e)):k[0](e)};const Jt=e=>{ke(e),e.scope.on()},Kr=()=>{L&&L.scope.off(),ke(null)};function zr(e){return e.vnode.shapeFlag&4}let Hr=!1;function Ur(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Yn(Un(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in ce)return ce[n](e)},has(t,n){return n in t||n in ce}}))}const Wr=/(?:^|[-_])(\w)/g,Br=e=>e.replace(Wr,t=>t.toUpperCase()).replace(/[-_]/g,"");function Gt(e,t=!0){return b(e)?e.displayName||e.name:e.name||t&&e.__name}function Lt(e,t,n=!1){let s=Gt(t);if(!s&&t.__file){const r=t.__file.match(/([^/\\]+)\.\w+$/);r&&(s=r[1])}if(!s&&e&&e.parent){const r=o=>{for(const i in o)if(o[i]===t)return i};s=r(e.components||e.parent.type.components)||r(e.appContext.components)}return s?Br(s):n?"App":"Anonymous"}function Yt(e){return b(e)&&"__vccOpts"in e}function et(e){return!!(e&&e.__v_isShallow)}function qr(){if(process.env.NODE_ENV==="production"||typeof window>"u")return;const e={style:"color:#3ba776"},t={style:"color:#0b1bc9"},n={style:"color:#b62e24"},s={style:"color:#9d288c"},r={header(l){return v(l)?l.__isVue?["div",e,"VueInstance"]:y(l)?["div",{},["span",e,_(l)],"<",c(l.value),">"]:q(l)?["div",{},["span",e,et(l)?"ShallowReactive":"Reactive"],"<",c(l),`>${K(l)?" (readonly)":""}`]:K(l)?["div",{},["span",e,et(l)?"ShallowReadonly":"Readonly"],"<",c(l),">"]:null:null},hasBody(l){return l&&l.__isVue},body(l){if(l&&l.__isVue)return["div",{},...o(l.$)]}};function o(l){const f=[];l.type.props&&l.props&&f.push(i("props",d(l.props))),l.setupState!==$&&f.push(i("setup",l.setupState)),l.data!==$&&f.push(i("data",d(l.data)));const h=u(l,"computed");h&&f.push(i("computed",h));const p=u(l,"inject");return p&&f.push(i("injected",p)),f.push(["div",{},["span",{style:s.style+";opacity:0.66"},"$ (internal): "],["object",{object:l}]]),f}function i(l,f){return f=I({},f),Object.keys(f).length?["div",{style:"line-height:1.25em;margin-bottom:0.6em"},["div",{style:"color:#476582"},l],["div",{style:"padding-left:1.25em"},...Object.keys(f).map(h=>["div",{},["span",s,h+": "],c(f[h],!1)])]]:["span",{}]}function c(l,f=!0){return typeof l=="number"?["span",t,l]:typeof l=="string"?["span",n,JSON.stringify(l)]:typeof l=="boolean"?["span",s,l]:v(l)?["object",{object:f?d(l):l}]:["span",n,String(l)]}function u(l,f){const h=l.type;if(b(h))return;const p={};for(const N in l.ctx)a(h,N,f)&&(p[N]=l.ctx[N]);return p}function a(l,f,h){const p=l[h];if(m(p)&&p.includes(f)||v(p)&&f in p||l.extends&&a(l.extends,f,h)||l.mixins&&l.mixins.some(N=>a(N,f,h)))return!0}function _(l){return et(l)?"ShallowRef":l.effect?"ComputedRef":"Ref"}window.devtoolsFormatters?window.devtoolsFormatters.push(r):window.devtoolsFormatters=[r]}function Jr(){qr()}process.env.NODE_ENV!=="production"&&Jr();const Gr=(e,t)=>{const n=e.__vccOpts||e;for(const[s,r]of t)n[s]=r;return n},Lr={};function Yr(e,t){return Dr(),$r("div")}const Qr=Gr(Lr,[["render",Yr],["__file","/Users/xivlaw/Documents/git/vite-monorepo-template/packages/test/src/test.vue"]]);console.log(Er),console.log(Qr);const Xr="666";return xe.test=Xr,Object.defineProperty(xe,Symbol.toStringTag,{value:"Module"}),xe}({});
