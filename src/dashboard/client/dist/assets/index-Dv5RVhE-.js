(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const f of l.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function n(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(a){if(a.ep)return;a.ep=!0;const l=n(a);fetch(a.href,l)}})();function Qm(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var wu={exports:{}},Io={},Tu={exports:{}},pt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var np;function S_(){if(np)return pt;np=1;var r=Symbol.for("react.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),f=Symbol.for("react.context"),u=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),y=Symbol.iterator;function x(N){return N===null||typeof N!="object"?null:(N=y&&N[y]||N["@@iterator"],typeof N=="function"?N:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},M=Object.assign,E={};function _(N,$,Z){this.props=N,this.context=$,this.refs=E,this.updater=Z||S}_.prototype.isReactComponent={},_.prototype.setState=function(N,$){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,$,"setState")},_.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function g(){}g.prototype=_.prototype;function L(N,$,Z){this.props=N,this.context=$,this.refs=E,this.updater=Z||S}var b=L.prototype=new g;b.constructor=L,M(b,_.prototype),b.isPureReactComponent=!0;var D=Array.isArray,X=Object.prototype.hasOwnProperty,O={current:null},k={key:!0,ref:!0,__self:!0,__source:!0};function he(N,$,Z){var de,me={},Me=null,Te=null;if($!=null)for(de in $.ref!==void 0&&(Te=$.ref),$.key!==void 0&&(Me=""+$.key),$)X.call($,de)&&!k.hasOwnProperty(de)&&(me[de]=$[de]);var Ae=arguments.length-2;if(Ae===1)me.children=Z;else if(1<Ae){for(var ze=Array(Ae),Ve=0;Ve<Ae;Ve++)ze[Ve]=arguments[Ve+2];me.children=ze}if(N&&N.defaultProps)for(de in Ae=N.defaultProps,Ae)me[de]===void 0&&(me[de]=Ae[de]);return{$$typeof:r,type:N,key:Me,ref:Te,props:me,_owner:O.current}}function C(N,$){return{$$typeof:r,type:N.type,key:$,ref:N.ref,props:N.props,_owner:N._owner}}function A(N){return typeof N=="object"&&N!==null&&N.$$typeof===r}function re(N){var $={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(Z){return $[Z]})}var ee=/\/+/g;function W(N,$){return typeof N=="object"&&N!==null&&N.key!=null?re(""+N.key):$.toString(36)}function F(N,$,Z,de,me){var Me=typeof N;(Me==="undefined"||Me==="boolean")&&(N=null);var Te=!1;if(N===null)Te=!0;else switch(Me){case"string":case"number":Te=!0;break;case"object":switch(N.$$typeof){case r:case e:Te=!0}}if(Te)return Te=N,me=me(Te),N=de===""?"."+W(Te,0):de,D(me)?(Z="",N!=null&&(Z=N.replace(ee,"$&/")+"/"),F(me,$,Z,"",function(Ve){return Ve})):me!=null&&(A(me)&&(me=C(me,Z+(!me.key||Te&&Te.key===me.key?"":(""+me.key).replace(ee,"$&/")+"/")+N)),$.push(me)),1;if(Te=0,de=de===""?".":de+":",D(N))for(var Ae=0;Ae<N.length;Ae++){Me=N[Ae];var ze=de+W(Me,Ae);Te+=F(Me,$,Z,ze,me)}else if(ze=x(N),typeof ze=="function")for(N=ze.call(N),Ae=0;!(Me=N.next()).done;)Me=Me.value,ze=de+W(Me,Ae++),Te+=F(Me,$,Z,ze,me);else if(Me==="object")throw $=String(N),Error("Objects are not valid as a React child (found: "+($==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":$)+"). If you meant to render a collection of children, use an array instead.");return Te}function Y(N,$,Z){if(N==null)return N;var de=[],me=0;return F(N,de,"","",function(Me){return $.call(Z,Me,me++)}),de}function Q(N){if(N._status===-1){var $=N._result;$=$(),$.then(function(Z){(N._status===0||N._status===-1)&&(N._status=1,N._result=Z)},function(Z){(N._status===0||N._status===-1)&&(N._status=2,N._result=Z)}),N._status===-1&&(N._status=0,N._result=$)}if(N._status===1)return N._result.default;throw N._result}var ie={current:null},V={transition:null},z={ReactCurrentDispatcher:ie,ReactCurrentBatchConfig:V,ReactCurrentOwner:O};function j(){throw Error("act(...) is not supported in production builds of React.")}return pt.Children={map:Y,forEach:function(N,$,Z){Y(N,function(){$.apply(this,arguments)},Z)},count:function(N){var $=0;return Y(N,function(){$++}),$},toArray:function(N){return Y(N,function($){return $})||[]},only:function(N){if(!A(N))throw Error("React.Children.only expected to receive a single React element child.");return N}},pt.Component=_,pt.Fragment=n,pt.Profiler=a,pt.PureComponent=L,pt.StrictMode=s,pt.Suspense=h,pt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=z,pt.act=j,pt.cloneElement=function(N,$,Z){if(N==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+N+".");var de=M({},N.props),me=N.key,Me=N.ref,Te=N._owner;if($!=null){if($.ref!==void 0&&(Me=$.ref,Te=O.current),$.key!==void 0&&(me=""+$.key),N.type&&N.type.defaultProps)var Ae=N.type.defaultProps;for(ze in $)X.call($,ze)&&!k.hasOwnProperty(ze)&&(de[ze]=$[ze]===void 0&&Ae!==void 0?Ae[ze]:$[ze])}var ze=arguments.length-2;if(ze===1)de.children=Z;else if(1<ze){Ae=Array(ze);for(var Ve=0;Ve<ze;Ve++)Ae[Ve]=arguments[Ve+2];de.children=Ae}return{$$typeof:r,type:N.type,key:me,ref:Me,props:de,_owner:Te}},pt.createContext=function(N){return N={$$typeof:f,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},N.Provider={$$typeof:l,_context:N},N.Consumer=N},pt.createElement=he,pt.createFactory=function(N){var $=he.bind(null,N);return $.type=N,$},pt.createRef=function(){return{current:null}},pt.forwardRef=function(N){return{$$typeof:u,render:N}},pt.isValidElement=A,pt.lazy=function(N){return{$$typeof:v,_payload:{_status:-1,_result:N},_init:Q}},pt.memo=function(N,$){return{$$typeof:m,type:N,compare:$===void 0?null:$}},pt.startTransition=function(N){var $=V.transition;V.transition={};try{N()}finally{V.transition=$}},pt.unstable_act=j,pt.useCallback=function(N,$){return ie.current.useCallback(N,$)},pt.useContext=function(N){return ie.current.useContext(N)},pt.useDebugValue=function(){},pt.useDeferredValue=function(N){return ie.current.useDeferredValue(N)},pt.useEffect=function(N,$){return ie.current.useEffect(N,$)},pt.useId=function(){return ie.current.useId()},pt.useImperativeHandle=function(N,$,Z){return ie.current.useImperativeHandle(N,$,Z)},pt.useInsertionEffect=function(N,$){return ie.current.useInsertionEffect(N,$)},pt.useLayoutEffect=function(N,$){return ie.current.useLayoutEffect(N,$)},pt.useMemo=function(N,$){return ie.current.useMemo(N,$)},pt.useReducer=function(N,$,Z){return ie.current.useReducer(N,$,Z)},pt.useRef=function(N){return ie.current.useRef(N)},pt.useState=function(N){return ie.current.useState(N)},pt.useSyncExternalStore=function(N,$,Z){return ie.current.useSyncExternalStore(N,$,Z)},pt.useTransition=function(){return ie.current.useTransition()},pt.version="18.3.1",pt}var ip;function Tf(){return ip||(ip=1,Tu.exports=S_()),Tu.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rp;function M_(){if(rp)return Io;rp=1;var r=Tf(),e=Symbol.for("react.element"),n=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,a=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function f(u,h,m){var v,y={},x=null,S=null;m!==void 0&&(x=""+m),h.key!==void 0&&(x=""+h.key),h.ref!==void 0&&(S=h.ref);for(v in h)s.call(h,v)&&!l.hasOwnProperty(v)&&(y[v]=h[v]);if(u&&u.defaultProps)for(v in h=u.defaultProps,h)y[v]===void 0&&(y[v]=h[v]);return{$$typeof:e,type:u,key:x,ref:S,props:y,_owner:a.current}}return Io.Fragment=n,Io.jsx=f,Io.jsxs=f,Io}var sp;function E_(){return sp||(sp=1,wu.exports=M_()),wu.exports}var U=E_(),Fe=Tf();const w_=Qm(Fe);var il={},Au={exports:{}},Ln={},bu={exports:{}},Cu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var op;function T_(){return op||(op=1,(function(r){function e(V,z){var j=V.length;V.push(z);e:for(;0<j;){var N=j-1>>>1,$=V[N];if(0<a($,z))V[N]=z,V[j]=$,j=N;else break e}}function n(V){return V.length===0?null:V[0]}function s(V){if(V.length===0)return null;var z=V[0],j=V.pop();if(j!==z){V[0]=j;e:for(var N=0,$=V.length,Z=$>>>1;N<Z;){var de=2*(N+1)-1,me=V[de],Me=de+1,Te=V[Me];if(0>a(me,j))Me<$&&0>a(Te,me)?(V[N]=Te,V[Me]=j,N=Me):(V[N]=me,V[de]=j,N=de);else if(Me<$&&0>a(Te,j))V[N]=Te,V[Me]=j,N=Me;else break e}}return z}function a(V,z){var j=V.sortIndex-z.sortIndex;return j!==0?j:V.id-z.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;r.unstable_now=function(){return l.now()}}else{var f=Date,u=f.now();r.unstable_now=function(){return f.now()-u}}var h=[],m=[],v=1,y=null,x=3,S=!1,M=!1,E=!1,_=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,L=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function b(V){for(var z=n(m);z!==null;){if(z.callback===null)s(m);else if(z.startTime<=V)s(m),z.sortIndex=z.expirationTime,e(h,z);else break;z=n(m)}}function D(V){if(E=!1,b(V),!M)if(n(h)!==null)M=!0,Q(X);else{var z=n(m);z!==null&&ie(D,z.startTime-V)}}function X(V,z){M=!1,E&&(E=!1,g(he),he=-1),S=!0;var j=x;try{for(b(z),y=n(h);y!==null&&(!(y.expirationTime>z)||V&&!re());){var N=y.callback;if(typeof N=="function"){y.callback=null,x=y.priorityLevel;var $=N(y.expirationTime<=z);z=r.unstable_now(),typeof $=="function"?y.callback=$:y===n(h)&&s(h),b(z)}else s(h);y=n(h)}if(y!==null)var Z=!0;else{var de=n(m);de!==null&&ie(D,de.startTime-z),Z=!1}return Z}finally{y=null,x=j,S=!1}}var O=!1,k=null,he=-1,C=5,A=-1;function re(){return!(r.unstable_now()-A<C)}function ee(){if(k!==null){var V=r.unstable_now();A=V;var z=!0;try{z=k(!0,V)}finally{z?W():(O=!1,k=null)}}else O=!1}var W;if(typeof L=="function")W=function(){L(ee)};else if(typeof MessageChannel<"u"){var F=new MessageChannel,Y=F.port2;F.port1.onmessage=ee,W=function(){Y.postMessage(null)}}else W=function(){_(ee,0)};function Q(V){k=V,O||(O=!0,W())}function ie(V,z){he=_(function(){V(r.unstable_now())},z)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(V){V.callback=null},r.unstable_continueExecution=function(){M||S||(M=!0,Q(X))},r.unstable_forceFrameRate=function(V){0>V||125<V?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<V?Math.floor(1e3/V):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_getFirstCallbackNode=function(){return n(h)},r.unstable_next=function(V){switch(x){case 1:case 2:case 3:var z=3;break;default:z=x}var j=x;x=z;try{return V()}finally{x=j}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(V,z){switch(V){case 1:case 2:case 3:case 4:case 5:break;default:V=3}var j=x;x=V;try{return z()}finally{x=j}},r.unstable_scheduleCallback=function(V,z,j){var N=r.unstable_now();switch(typeof j=="object"&&j!==null?(j=j.delay,j=typeof j=="number"&&0<j?N+j:N):j=N,V){case 1:var $=-1;break;case 2:$=250;break;case 5:$=1073741823;break;case 4:$=1e4;break;default:$=5e3}return $=j+$,V={id:v++,callback:z,priorityLevel:V,startTime:j,expirationTime:$,sortIndex:-1},j>N?(V.sortIndex=j,e(m,V),n(h)===null&&V===n(m)&&(E?(g(he),he=-1):E=!0,ie(D,j-N))):(V.sortIndex=$,e(h,V),M||S||(M=!0,Q(X))),V},r.unstable_shouldYield=re,r.unstable_wrapCallback=function(V){var z=x;return function(){var j=x;x=z;try{return V.apply(this,arguments)}finally{x=j}}}})(Cu)),Cu}var ap;function A_(){return ap||(ap=1,bu.exports=T_()),bu.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var lp;function b_(){if(lp)return Ln;lp=1;var r=Tf(),e=A_();function n(t){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+t,o=1;o<arguments.length;o++)i+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+t+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,a={};function l(t,i){f(t,i),f(t+"Capture",i)}function f(t,i){for(a[t]=i,t=0;t<i.length;t++)s.add(i[t])}var u=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,m=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,v={},y={};function x(t){return h.call(y,t)?!0:h.call(v,t)?!1:m.test(t)?y[t]=!0:(v[t]=!0,!1)}function S(t,i,o,c){if(o!==null&&o.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:o!==null?!o.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function M(t,i,o,c){if(i===null||typeof i>"u"||S(t,i,o,c))return!0;if(c)return!1;if(o!==null)switch(o.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function E(t,i,o,c,d,p,w){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=d,this.mustUseProperty=o,this.propertyName=t,this.type=i,this.sanitizeURL=p,this.removeEmptyString=w}var _={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){_[t]=new E(t,0,!1,t,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var i=t[0];_[i]=new E(i,1,!1,t[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(t){_[t]=new E(t,2,!1,t.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){_[t]=new E(t,2,!1,t,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){_[t]=new E(t,3,!1,t.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(t){_[t]=new E(t,3,!0,t,null,!1,!1)}),["capture","download"].forEach(function(t){_[t]=new E(t,4,!1,t,null,!1,!1)}),["cols","rows","size","span"].forEach(function(t){_[t]=new E(t,6,!1,t,null,!1,!1)}),["rowSpan","start"].forEach(function(t){_[t]=new E(t,5,!1,t.toLowerCase(),null,!1,!1)});var g=/[\-:]([a-z])/g;function L(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var i=t.replace(g,L);_[i]=new E(i,1,!1,t,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var i=t.replace(g,L);_[i]=new E(i,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(t){var i=t.replace(g,L);_[i]=new E(i,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(t){_[t]=new E(t,1,!1,t.toLowerCase(),null,!1,!1)}),_.xlinkHref=new E("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(t){_[t]=new E(t,1,!1,t.toLowerCase(),null,!0,!0)});function b(t,i,o,c){var d=_.hasOwnProperty(i)?_[i]:null;(d!==null?d.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(M(i,o,d,c)&&(o=null),c||d===null?x(i)&&(o===null?t.removeAttribute(i):t.setAttribute(i,""+o)):d.mustUseProperty?t[d.propertyName]=o===null?d.type===3?!1:"":o:(i=d.attributeName,c=d.attributeNamespace,o===null?t.removeAttribute(i):(d=d.type,o=d===3||d===4&&o===!0?"":""+o,c?t.setAttributeNS(c,i,o):t.setAttribute(i,o))))}var D=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,X=Symbol.for("react.element"),O=Symbol.for("react.portal"),k=Symbol.for("react.fragment"),he=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),A=Symbol.for("react.provider"),re=Symbol.for("react.context"),ee=Symbol.for("react.forward_ref"),W=Symbol.for("react.suspense"),F=Symbol.for("react.suspense_list"),Y=Symbol.for("react.memo"),Q=Symbol.for("react.lazy"),ie=Symbol.for("react.offscreen"),V=Symbol.iterator;function z(t){return t===null||typeof t!="object"?null:(t=V&&t[V]||t["@@iterator"],typeof t=="function"?t:null)}var j=Object.assign,N;function $(t){if(N===void 0)try{throw Error()}catch(o){var i=o.stack.trim().match(/\n( *(at )?)/);N=i&&i[1]||""}return`
`+N+t}var Z=!1;function de(t,i){if(!t||Z)return"";Z=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(le){var c=le}Reflect.construct(t,[],i)}else{try{i.call()}catch(le){c=le}t.call(i.prototype)}else{try{throw Error()}catch(le){c=le}t()}}catch(le){if(le&&c&&typeof le.stack=="string"){for(var d=le.stack.split(`
`),p=c.stack.split(`
`),w=d.length-1,I=p.length-1;1<=w&&0<=I&&d[w]!==p[I];)I--;for(;1<=w&&0<=I;w--,I--)if(d[w]!==p[I]){if(w!==1||I!==1)do if(w--,I--,0>I||d[w]!==p[I]){var H=`
`+d[w].replace(" at new "," at ");return t.displayName&&H.includes("<anonymous>")&&(H=H.replace("<anonymous>",t.displayName)),H}while(1<=w&&0<=I);break}}}finally{Z=!1,Error.prepareStackTrace=o}return(t=t?t.displayName||t.name:"")?$(t):""}function me(t){switch(t.tag){case 5:return $(t.type);case 16:return $("Lazy");case 13:return $("Suspense");case 19:return $("SuspenseList");case 0:case 2:case 15:return t=de(t.type,!1),t;case 11:return t=de(t.type.render,!1),t;case 1:return t=de(t.type,!0),t;default:return""}}function Me(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case k:return"Fragment";case O:return"Portal";case C:return"Profiler";case he:return"StrictMode";case W:return"Suspense";case F:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case re:return(t.displayName||"Context")+".Consumer";case A:return(t._context.displayName||"Context")+".Provider";case ee:var i=t.render;return t=t.displayName,t||(t=i.displayName||i.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Y:return i=t.displayName||null,i!==null?i:Me(t.type)||"Memo";case Q:i=t._payload,t=t._init;try{return Me(t(i))}catch{}}return null}function Te(t){var i=t.type;switch(t.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=i.render,t=t.displayName||t.name||"",i.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Me(i);case 8:return i===he?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function Ae(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function ze(t){var i=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ve(t){var i=ze(t)?"checked":"value",o=Object.getOwnPropertyDescriptor(t.constructor.prototype,i),c=""+t[i];if(!t.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var d=o.get,p=o.set;return Object.defineProperty(t,i,{configurable:!0,get:function(){return d.call(this)},set:function(w){c=""+w,p.call(this,w)}}),Object.defineProperty(t,i,{enumerable:o.enumerable}),{getValue:function(){return c},setValue:function(w){c=""+w},stopTracking:function(){t._valueTracker=null,delete t[i]}}}}function Pe(t){t._valueTracker||(t._valueTracker=Ve(t))}function ne(t){if(!t)return!1;var i=t._valueTracker;if(!i)return!0;var o=i.getValue(),c="";return t&&(c=ze(t)?t.checked?"true":"false":t.value),t=c,t!==o?(i.setValue(t),!0):!1}function kt(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Ce(t,i){var o=i.checked;return j({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??t._wrapperState.initialChecked})}function it(t,i){var o=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;o=Ae(i.value!=null?i.value:o),t._wrapperState={initialChecked:c,initialValue:o,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function We(t,i){i=i.checked,i!=null&&b(t,"checked",i,!1)}function xt(t,i){We(t,i);var o=Ae(i.value),c=i.type;if(o!=null)c==="number"?(o===0&&t.value===""||t.value!=o)&&(t.value=""+o):t.value!==""+o&&(t.value=""+o);else if(c==="submit"||c==="reset"){t.removeAttribute("value");return}i.hasOwnProperty("value")?P(t,i.type,o):i.hasOwnProperty("defaultValue")&&P(t,i.type,Ae(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(t.defaultChecked=!!i.defaultChecked)}function je(t,i,o){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+t._wrapperState.initialValue,o||i===t.value||(t.value=i),t.defaultValue=i}o=t.name,o!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,o!==""&&(t.name=o)}function P(t,i,o){(i!=="number"||kt(t.ownerDocument)!==t)&&(o==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+o&&(t.defaultValue=""+o))}var T=Array.isArray;function oe(t,i,o,c){if(t=t.options,i){i={};for(var d=0;d<o.length;d++)i["$"+o[d]]=!0;for(o=0;o<t.length;o++)d=i.hasOwnProperty("$"+t[o].value),t[o].selected!==d&&(t[o].selected=d),d&&c&&(t[o].defaultSelected=!0)}else{for(o=""+Ae(o),i=null,d=0;d<t.length;d++){if(t[d].value===o){t[d].selected=!0,c&&(t[d].defaultSelected=!0);return}i!==null||t[d].disabled||(i=t[d])}i!==null&&(i.selected=!0)}}function ye(t,i){if(i.dangerouslySetInnerHTML!=null)throw Error(n(91));return j({},i,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function _e(t,i){var o=i.value;if(o==null){if(o=i.children,i=i.defaultValue,o!=null){if(i!=null)throw Error(n(92));if(T(o)){if(1<o.length)throw Error(n(93));o=o[0]}i=o}i==null&&(i=""),o=i}t._wrapperState={initialValue:Ae(o)}}function ge(t,i){var o=Ae(i.value),c=Ae(i.defaultValue);o!=null&&(o=""+o,o!==t.value&&(t.value=o),i.defaultValue==null&&t.defaultValue!==o&&(t.defaultValue=o)),c!=null&&(t.defaultValue=""+c)}function Ye(t){var i=t.textContent;i===t._wrapperState.initialValue&&i!==""&&i!==null&&(t.value=i)}function Ie(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Be(t,i){return t==null||t==="http://www.w3.org/1999/xhtml"?Ie(i):t==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var B,ue=(function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,o,c,d){MSApp.execUnsafeLocalFunction(function(){return t(i,o,c,d)})}:t})(function(t,i){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=i;else{for(B=B||document.createElement("div"),B.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=B.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;i.firstChild;)t.appendChild(i.firstChild)}});function K(t,i){if(i){var o=t.firstChild;if(o&&o===t.lastChild&&o.nodeType===3){o.nodeValue=i;return}}t.textContent=i}var Re={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},we=["Webkit","ms","Moz","O"];Object.keys(Re).forEach(function(t){we.forEach(function(i){i=i+t.charAt(0).toUpperCase()+t.substring(1),Re[i]=Re[t]})});function Qe(t,i,o){return i==null||typeof i=="boolean"||i===""?"":o||typeof i!="number"||i===0||Re.hasOwnProperty(t)&&Re[t]?(""+i).trim():i+"px"}function qe(t,i){t=t.style;for(var o in i)if(i.hasOwnProperty(o)){var c=o.indexOf("--")===0,d=Qe(o,i[o],c);o==="float"&&(o="cssFloat"),c?t.setProperty(o,d):t[o]=d}}var Le=j({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Je(t,i){if(i){if(Le[t]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(n(137,t));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(n(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(n(61))}if(i.style!=null&&typeof i.style!="object")throw Error(n(62))}}function gt(t,i){if(t.indexOf("-")===-1)return typeof i.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ct=null;function ct(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var be=null,G=null,Ne=null;function Ue(t){if(t=xo(t)){if(typeof be!="function")throw Error(n(280));var i=t.stateNode;i&&(i=_a(i),be(t.stateNode,t.type,i))}}function st(t){G?Ne?Ne.push(t):Ne=[t]:G=t}function et(){if(G){var t=G,i=Ne;if(Ne=G=null,Ue(t),i)for(t=0;t<i.length;t++)Ue(i[t])}}function Et(t,i){return t(i)}function wt(){}var Ht=!1;function en(t,i,o){if(Ht)return t(i,o);Ht=!0;try{return Et(t,i,o)}finally{Ht=!1,(G!==null||Ne!==null)&&(wt(),et())}}function yt(t,i){var o=t.stateNode;if(o===null)return null;var c=_a(o);if(c===null)return null;o=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(t=t.type,c=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!c;break e;default:t=!1}if(t)return null;if(o&&typeof o!="function")throw Error(n(231,i,typeof o));return o}var $t=!1;if(u)try{var un={};Object.defineProperty(un,"passive",{get:function(){$t=!0}}),window.addEventListener("test",un,un),window.removeEventListener("test",un,un)}catch{$t=!1}function Zo(t,i,o,c,d,p,w,I,H){var le=Array.prototype.slice.call(arguments,3);try{i.apply(o,le)}catch(xe){this.onError(xe)}}var Ar=!1,Ei=null,br=!1,ji=null,Qo={onError:function(t){Ar=!0,Ei=t}};function Jo(t,i,o,c,d,p,w,I,H){Ar=!1,Ei=null,Zo.apply(Qo,arguments)}function Xl(t,i,o,c,d,p,w,I,H){if(Jo.apply(this,arguments),Ar){if(Ar){var le=Ei;Ar=!1,Ei=null}else throw Error(n(198));br||(br=!0,ji=le)}}function wi(t){var i=t,o=t;if(t.alternate)for(;i.return;)i=i.return;else{t=i;do i=t,(i.flags&4098)!==0&&(o=i.return),t=i.return;while(t)}return i.tag===3?o:null}function ea(t){if(t.tag===13){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function R(t){if(wi(t)!==t)throw Error(n(188))}function te(t){var i=t.alternate;if(!i){if(i=wi(t),i===null)throw Error(n(188));return i!==t?null:t}for(var o=t,c=i;;){var d=o.return;if(d===null)break;var p=d.alternate;if(p===null){if(c=d.return,c!==null){o=c;continue}break}if(d.child===p.child){for(p=d.child;p;){if(p===o)return R(d),t;if(p===c)return R(d),i;p=p.sibling}throw Error(n(188))}if(o.return!==c.return)o=d,c=p;else{for(var w=!1,I=d.child;I;){if(I===o){w=!0,o=d,c=p;break}if(I===c){w=!0,c=d,o=p;break}I=I.sibling}if(!w){for(I=p.child;I;){if(I===o){w=!0,o=p,c=d;break}if(I===c){w=!0,c=p,o=d;break}I=I.sibling}if(!w)throw Error(n(189))}}if(o.alternate!==c)throw Error(n(190))}if(o.tag!==3)throw Error(n(188));return o.stateNode.current===o?t:i}function fe(t){return t=te(t),t!==null?pe(t):null}function pe(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var i=pe(t);if(i!==null)return i;t=t.sibling}return null}var ce=e.unstable_scheduleCallback,Oe=e.unstable_cancelCallback,Ze=e.unstable_shouldYield,rt=e.unstable_requestPaint,He=e.unstable_now,ut=e.unstable_getCurrentPriorityLevel,at=e.unstable_ImmediatePriority,lt=e.unstable_UserBlockingPriority,Rt=e.unstable_NormalPriority,vn=e.unstable_LowPriority,Wt=e.unstable_IdlePriority,wn=null,vt=null;function dt(t){if(vt&&typeof vt.onCommitFiberRoot=="function")try{vt.onCommitFiberRoot(wn,t,void 0,(t.current.flags&128)===128)}catch{}}var _n=Math.clz32?Math.clz32:ta,Ft=Math.log,Ti=Math.LN2;function ta(t){return t>>>=0,t===0?32:31-(Ft(t)/Ti|0)|0}var mi=64,Xi=4194304;function Gt(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Gn(t,i){var o=t.pendingLanes;if(o===0)return 0;var c=0,d=t.suspendedLanes,p=t.pingedLanes,w=o&268435455;if(w!==0){var I=w&~d;I!==0?c=Gt(I):(p&=w,p!==0&&(c=Gt(p)))}else w=o&~d,w!==0?c=Gt(w):p!==0&&(c=Gt(p));if(c===0)return 0;if(i!==0&&i!==c&&(i&d)===0&&(d=c&-c,p=i&-i,d>=p||d===16&&(p&4194240)!==0))return i;if((c&4)!==0&&(c|=o&16),i=t.entangledLanes,i!==0)for(t=t.entanglements,i&=c;0<i;)o=31-_n(i),d=1<<o,c|=t[o],i&=~d;return c}function eo(t,i){switch(t){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Tn(t,i){for(var o=t.suspendedLanes,c=t.pingedLanes,d=t.expirationTimes,p=t.pendingLanes;0<p;){var w=31-_n(p),I=1<<w,H=d[w];H===-1?((I&o)===0||(I&c)!==0)&&(d[w]=eo(I,i)):H<=i&&(t.expiredLanes|=I),p&=~I}}function Cr(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function na(){var t=mi;return mi<<=1,(mi&4194240)===0&&(mi=64),t}function ns(t){for(var i=[],o=0;31>o;o++)i.push(t);return i}function to(t,i,o){t.pendingLanes|=i,i!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,i=31-_n(i),t[i]=o}function Gg(t,i){var o=t.pendingLanes&~i;t.pendingLanes=i,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=i,t.mutableReadLanes&=i,t.entangledLanes&=i,i=t.entanglements;var c=t.eventTimes;for(t=t.expirationTimes;0<o;){var d=31-_n(o),p=1<<d;i[d]=0,c[d]=-1,t[d]=-1,o&=~p}}function ql(t,i){var o=t.entangledLanes|=i;for(t=t.entanglements;o;){var c=31-_n(o),d=1<<c;d&i|t[c]&i&&(t[c]|=i),o&=~d}}var Tt=0;function If(t){return t&=-t,1<t?4<t?(t&268435455)!==0?16:536870912:4:1}var Uf,$l,Ff,Of,kf,Yl=!1,ia=[],qi=null,$i=null,Yi=null,no=new Map,io=new Map,Ki=[],Vg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function zf(t,i){switch(t){case"focusin":case"focusout":qi=null;break;case"dragenter":case"dragleave":$i=null;break;case"mouseover":case"mouseout":Yi=null;break;case"pointerover":case"pointerout":no.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":io.delete(i.pointerId)}}function ro(t,i,o,c,d,p){return t===null||t.nativeEvent!==p?(t={blockedOn:i,domEventName:o,eventSystemFlags:c,nativeEvent:p,targetContainers:[d]},i!==null&&(i=xo(i),i!==null&&$l(i)),t):(t.eventSystemFlags|=c,i=t.targetContainers,d!==null&&i.indexOf(d)===-1&&i.push(d),t)}function Wg(t,i,o,c,d){switch(i){case"focusin":return qi=ro(qi,t,i,o,c,d),!0;case"dragenter":return $i=ro($i,t,i,o,c,d),!0;case"mouseover":return Yi=ro(Yi,t,i,o,c,d),!0;case"pointerover":var p=d.pointerId;return no.set(p,ro(no.get(p)||null,t,i,o,c,d)),!0;case"gotpointercapture":return p=d.pointerId,io.set(p,ro(io.get(p)||null,t,i,o,c,d)),!0}return!1}function Bf(t){var i=Rr(t.target);if(i!==null){var o=wi(i);if(o!==null){if(i=o.tag,i===13){if(i=ea(o),i!==null){t.blockedOn=i,kf(t.priority,function(){Ff(o)});return}}else if(i===3&&o.stateNode.current.memoizedState.isDehydrated){t.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ra(t){if(t.blockedOn!==null)return!1;for(var i=t.targetContainers;0<i.length;){var o=Zl(t.domEventName,t.eventSystemFlags,i[0],t.nativeEvent);if(o===null){o=t.nativeEvent;var c=new o.constructor(o.type,o);Ct=c,o.target.dispatchEvent(c),Ct=null}else return i=xo(o),i!==null&&$l(i),t.blockedOn=o,!1;i.shift()}return!0}function Hf(t,i,o){ra(t)&&o.delete(i)}function jg(){Yl=!1,qi!==null&&ra(qi)&&(qi=null),$i!==null&&ra($i)&&($i=null),Yi!==null&&ra(Yi)&&(Yi=null),no.forEach(Hf),io.forEach(Hf)}function so(t,i){t.blockedOn===i&&(t.blockedOn=null,Yl||(Yl=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,jg)))}function oo(t){function i(d){return so(d,t)}if(0<ia.length){so(ia[0],t);for(var o=1;o<ia.length;o++){var c=ia[o];c.blockedOn===t&&(c.blockedOn=null)}}for(qi!==null&&so(qi,t),$i!==null&&so($i,t),Yi!==null&&so(Yi,t),no.forEach(i),io.forEach(i),o=0;o<Ki.length;o++)c=Ki[o],c.blockedOn===t&&(c.blockedOn=null);for(;0<Ki.length&&(o=Ki[0],o.blockedOn===null);)Bf(o),o.blockedOn===null&&Ki.shift()}var is=D.ReactCurrentBatchConfig,sa=!0;function Xg(t,i,o,c){var d=Tt,p=is.transition;is.transition=null;try{Tt=1,Kl(t,i,o,c)}finally{Tt=d,is.transition=p}}function qg(t,i,o,c){var d=Tt,p=is.transition;is.transition=null;try{Tt=4,Kl(t,i,o,c)}finally{Tt=d,is.transition=p}}function Kl(t,i,o,c){if(sa){var d=Zl(t,i,o,c);if(d===null)pc(t,i,c,oa,o),zf(t,c);else if(Wg(d,t,i,o,c))c.stopPropagation();else if(zf(t,c),i&4&&-1<Vg.indexOf(t)){for(;d!==null;){var p=xo(d);if(p!==null&&Uf(p),p=Zl(t,i,o,c),p===null&&pc(t,i,c,oa,o),p===d)break;d=p}d!==null&&c.stopPropagation()}else pc(t,i,c,null,o)}}var oa=null;function Zl(t,i,o,c){if(oa=null,t=ct(c),t=Rr(t),t!==null)if(i=wi(t),i===null)t=null;else if(o=i.tag,o===13){if(t=ea(i),t!==null)return t;t=null}else if(o===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;t=null}else i!==t&&(t=null);return oa=t,null}function Gf(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ut()){case at:return 1;case lt:return 4;case Rt:case vn:return 16;case Wt:return 536870912;default:return 16}default:return 16}}var Zi=null,Ql=null,aa=null;function Vf(){if(aa)return aa;var t,i=Ql,o=i.length,c,d="value"in Zi?Zi.value:Zi.textContent,p=d.length;for(t=0;t<o&&i[t]===d[t];t++);var w=o-t;for(c=1;c<=w&&i[o-c]===d[p-c];c++);return aa=d.slice(t,1<c?1-c:void 0)}function la(t){var i=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&i===13&&(t=13)):t=i,t===10&&(t=13),32<=t||t===13?t:0}function ca(){return!0}function Wf(){return!1}function Un(t){function i(o,c,d,p,w){this._reactName=o,this._targetInst=d,this.type=c,this.nativeEvent=p,this.target=w,this.currentTarget=null;for(var I in t)t.hasOwnProperty(I)&&(o=t[I],this[I]=o?o(p):p[I]);return this.isDefaultPrevented=(p.defaultPrevented!=null?p.defaultPrevented:p.returnValue===!1)?ca:Wf,this.isPropagationStopped=Wf,this}return j(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=ca)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=ca)},persist:function(){},isPersistent:ca}),i}var rs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jl=Un(rs),ao=j({},rs,{view:0,detail:0}),$g=Un(ao),ec,tc,lo,ua=j({},ao,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ic,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==lo&&(lo&&t.type==="mousemove"?(ec=t.screenX-lo.screenX,tc=t.screenY-lo.screenY):tc=ec=0,lo=t),ec)},movementY:function(t){return"movementY"in t?t.movementY:tc}}),jf=Un(ua),Yg=j({},ua,{dataTransfer:0}),Kg=Un(Yg),Zg=j({},ao,{relatedTarget:0}),nc=Un(Zg),Qg=j({},rs,{animationName:0,elapsedTime:0,pseudoElement:0}),Jg=Un(Qg),ev=j({},rs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),tv=Un(ev),nv=j({},rs,{data:0}),Xf=Un(nv),iv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},rv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},sv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ov(t){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(t):(t=sv[t])?!!i[t]:!1}function ic(){return ov}var av=j({},ao,{key:function(t){if(t.key){var i=iv[t.key]||t.key;if(i!=="Unidentified")return i}return t.type==="keypress"?(t=la(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?rv[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ic,charCode:function(t){return t.type==="keypress"?la(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?la(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),lv=Un(av),cv=j({},ua,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),qf=Un(cv),uv=j({},ao,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ic}),fv=Un(uv),dv=j({},rs,{propertyName:0,elapsedTime:0,pseudoElement:0}),hv=Un(dv),pv=j({},ua,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),mv=Un(pv),gv=[9,13,27,32],rc=u&&"CompositionEvent"in window,co=null;u&&"documentMode"in document&&(co=document.documentMode);var vv=u&&"TextEvent"in window&&!co,$f=u&&(!rc||co&&8<co&&11>=co),Yf=" ",Kf=!1;function Zf(t,i){switch(t){case"keyup":return gv.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Qf(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ss=!1;function _v(t,i){switch(t){case"compositionend":return Qf(i);case"keypress":return i.which!==32?null:(Kf=!0,Yf);case"textInput":return t=i.data,t===Yf&&Kf?null:t;default:return null}}function xv(t,i){if(ss)return t==="compositionend"||!rc&&Zf(t,i)?(t=Vf(),aa=Ql=Zi=null,ss=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return $f&&i.locale!=="ko"?null:i.data;default:return null}}var yv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Jf(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i==="input"?!!yv[t.type]:i==="textarea"}function ed(t,i,o,c){st(c),i=ma(i,"onChange"),0<i.length&&(o=new Jl("onChange","change",null,o,c),t.push({event:o,listeners:i}))}var uo=null,fo=null;function Sv(t){_d(t,0)}function fa(t){var i=us(t);if(ne(i))return t}function Mv(t,i){if(t==="change")return i}var td=!1;if(u){var sc;if(u){var oc="oninput"in document;if(!oc){var nd=document.createElement("div");nd.setAttribute("oninput","return;"),oc=typeof nd.oninput=="function"}sc=oc}else sc=!1;td=sc&&(!document.documentMode||9<document.documentMode)}function id(){uo&&(uo.detachEvent("onpropertychange",rd),fo=uo=null)}function rd(t){if(t.propertyName==="value"&&fa(fo)){var i=[];ed(i,fo,t,ct(t)),en(Sv,i)}}function Ev(t,i,o){t==="focusin"?(id(),uo=i,fo=o,uo.attachEvent("onpropertychange",rd)):t==="focusout"&&id()}function wv(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return fa(fo)}function Tv(t,i){if(t==="click")return fa(i)}function Av(t,i){if(t==="input"||t==="change")return fa(i)}function bv(t,i){return t===i&&(t!==0||1/t===1/i)||t!==t&&i!==i}var ni=typeof Object.is=="function"?Object.is:bv;function ho(t,i){if(ni(t,i))return!0;if(typeof t!="object"||t===null||typeof i!="object"||i===null)return!1;var o=Object.keys(t),c=Object.keys(i);if(o.length!==c.length)return!1;for(c=0;c<o.length;c++){var d=o[c];if(!h.call(i,d)||!ni(t[d],i[d]))return!1}return!0}function sd(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function od(t,i){var o=sd(t);t=0;for(var c;o;){if(o.nodeType===3){if(c=t+o.textContent.length,t<=i&&c>=i)return{node:o,offset:i-t};t=c}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=sd(o)}}function ad(t,i){return t&&i?t===i?!0:t&&t.nodeType===3?!1:i&&i.nodeType===3?ad(t,i.parentNode):"contains"in t?t.contains(i):t.compareDocumentPosition?!!(t.compareDocumentPosition(i)&16):!1:!1}function ld(){for(var t=window,i=kt();i instanceof t.HTMLIFrameElement;){try{var o=typeof i.contentWindow.location.href=="string"}catch{o=!1}if(o)t=i.contentWindow;else break;i=kt(t.document)}return i}function ac(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i&&(i==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||i==="textarea"||t.contentEditable==="true")}function Cv(t){var i=ld(),o=t.focusedElem,c=t.selectionRange;if(i!==o&&o&&o.ownerDocument&&ad(o.ownerDocument.documentElement,o)){if(c!==null&&ac(o)){if(i=c.start,t=c.end,t===void 0&&(t=i),"selectionStart"in o)o.selectionStart=i,o.selectionEnd=Math.min(t,o.value.length);else if(t=(i=o.ownerDocument||document)&&i.defaultView||window,t.getSelection){t=t.getSelection();var d=o.textContent.length,p=Math.min(c.start,d);c=c.end===void 0?p:Math.min(c.end,d),!t.extend&&p>c&&(d=c,c=p,p=d),d=od(o,p);var w=od(o,c);d&&w&&(t.rangeCount!==1||t.anchorNode!==d.node||t.anchorOffset!==d.offset||t.focusNode!==w.node||t.focusOffset!==w.offset)&&(i=i.createRange(),i.setStart(d.node,d.offset),t.removeAllRanges(),p>c?(t.addRange(i),t.extend(w.node,w.offset)):(i.setEnd(w.node,w.offset),t.addRange(i)))}}for(i=[],t=o;t=t.parentNode;)t.nodeType===1&&i.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<i.length;o++)t=i[o],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Rv=u&&"documentMode"in document&&11>=document.documentMode,os=null,lc=null,po=null,cc=!1;function cd(t,i,o){var c=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;cc||os==null||os!==kt(c)||(c=os,"selectionStart"in c&&ac(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),po&&ho(po,c)||(po=c,c=ma(lc,"onSelect"),0<c.length&&(i=new Jl("onSelect","select",null,i,o),t.push({event:i,listeners:c}),i.target=os)))}function da(t,i){var o={};return o[t.toLowerCase()]=i.toLowerCase(),o["Webkit"+t]="webkit"+i,o["Moz"+t]="moz"+i,o}var as={animationend:da("Animation","AnimationEnd"),animationiteration:da("Animation","AnimationIteration"),animationstart:da("Animation","AnimationStart"),transitionend:da("Transition","TransitionEnd")},uc={},ud={};u&&(ud=document.createElement("div").style,"AnimationEvent"in window||(delete as.animationend.animation,delete as.animationiteration.animation,delete as.animationstart.animation),"TransitionEvent"in window||delete as.transitionend.transition);function ha(t){if(uc[t])return uc[t];if(!as[t])return t;var i=as[t],o;for(o in i)if(i.hasOwnProperty(o)&&o in ud)return uc[t]=i[o];return t}var fd=ha("animationend"),dd=ha("animationiteration"),hd=ha("animationstart"),pd=ha("transitionend"),md=new Map,gd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Qi(t,i){md.set(t,i),l(i,[t])}for(var fc=0;fc<gd.length;fc++){var dc=gd[fc],Pv=dc.toLowerCase(),Lv=dc[0].toUpperCase()+dc.slice(1);Qi(Pv,"on"+Lv)}Qi(fd,"onAnimationEnd"),Qi(dd,"onAnimationIteration"),Qi(hd,"onAnimationStart"),Qi("dblclick","onDoubleClick"),Qi("focusin","onFocus"),Qi("focusout","onBlur"),Qi(pd,"onTransitionEnd"),f("onMouseEnter",["mouseout","mouseover"]),f("onMouseLeave",["mouseout","mouseover"]),f("onPointerEnter",["pointerout","pointerover"]),f("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var mo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Nv=new Set("cancel close invalid load scroll toggle".split(" ").concat(mo));function vd(t,i,o){var c=t.type||"unknown-event";t.currentTarget=o,Xl(c,i,void 0,t),t.currentTarget=null}function _d(t,i){i=(i&4)!==0;for(var o=0;o<t.length;o++){var c=t[o],d=c.event;c=c.listeners;e:{var p=void 0;if(i)for(var w=c.length-1;0<=w;w--){var I=c[w],H=I.instance,le=I.currentTarget;if(I=I.listener,H!==p&&d.isPropagationStopped())break e;vd(d,I,le),p=H}else for(w=0;w<c.length;w++){if(I=c[w],H=I.instance,le=I.currentTarget,I=I.listener,H!==p&&d.isPropagationStopped())break e;vd(d,I,le),p=H}}}if(br)throw t=ji,br=!1,ji=null,t}function Lt(t,i){var o=i[yc];o===void 0&&(o=i[yc]=new Set);var c=t+"__bubble";o.has(c)||(xd(i,t,2,!1),o.add(c))}function hc(t,i,o){var c=0;i&&(c|=4),xd(o,t,c,i)}var pa="_reactListening"+Math.random().toString(36).slice(2);function go(t){if(!t[pa]){t[pa]=!0,s.forEach(function(o){o!=="selectionchange"&&(Nv.has(o)||hc(o,!1,t),hc(o,!0,t))});var i=t.nodeType===9?t:t.ownerDocument;i===null||i[pa]||(i[pa]=!0,hc("selectionchange",!1,i))}}function xd(t,i,o,c){switch(Gf(i)){case 1:var d=Xg;break;case 4:d=qg;break;default:d=Kl}o=d.bind(null,i,o,t),d=void 0,!$t||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(d=!0),c?d!==void 0?t.addEventListener(i,o,{capture:!0,passive:d}):t.addEventListener(i,o,!0):d!==void 0?t.addEventListener(i,o,{passive:d}):t.addEventListener(i,o,!1)}function pc(t,i,o,c,d){var p=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var w=c.tag;if(w===3||w===4){var I=c.stateNode.containerInfo;if(I===d||I.nodeType===8&&I.parentNode===d)break;if(w===4)for(w=c.return;w!==null;){var H=w.tag;if((H===3||H===4)&&(H=w.stateNode.containerInfo,H===d||H.nodeType===8&&H.parentNode===d))return;w=w.return}for(;I!==null;){if(w=Rr(I),w===null)return;if(H=w.tag,H===5||H===6){c=p=w;continue e}I=I.parentNode}}c=c.return}en(function(){var le=p,xe=ct(o),Se=[];e:{var ve=md.get(t);if(ve!==void 0){var ke=Jl,Xe=t;switch(t){case"keypress":if(la(o)===0)break e;case"keydown":case"keyup":ke=lv;break;case"focusin":Xe="focus",ke=nc;break;case"focusout":Xe="blur",ke=nc;break;case"beforeblur":case"afterblur":ke=nc;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ke=jf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ke=Kg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ke=fv;break;case fd:case dd:case hd:ke=Jg;break;case pd:ke=hv;break;case"scroll":ke=$g;break;case"wheel":ke=mv;break;case"copy":case"cut":case"paste":ke=tv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ke=qf}var $e=(i&4)!==0,jt=!$e&&t==="scroll",J=$e?ve!==null?ve+"Capture":null:ve;$e=[];for(var q=le,se;q!==null;){se=q;var Ee=se.stateNode;if(se.tag===5&&Ee!==null&&(se=Ee,J!==null&&(Ee=yt(q,J),Ee!=null&&$e.push(vo(q,Ee,se)))),jt)break;q=q.return}0<$e.length&&(ve=new ke(ve,Xe,null,o,xe),Se.push({event:ve,listeners:$e}))}}if((i&7)===0){e:{if(ve=t==="mouseover"||t==="pointerover",ke=t==="mouseout"||t==="pointerout",ve&&o!==Ct&&(Xe=o.relatedTarget||o.fromElement)&&(Rr(Xe)||Xe[Ai]))break e;if((ke||ve)&&(ve=xe.window===xe?xe:(ve=xe.ownerDocument)?ve.defaultView||ve.parentWindow:window,ke?(Xe=o.relatedTarget||o.toElement,ke=le,Xe=Xe?Rr(Xe):null,Xe!==null&&(jt=wi(Xe),Xe!==jt||Xe.tag!==5&&Xe.tag!==6)&&(Xe=null)):(ke=null,Xe=le),ke!==Xe)){if($e=jf,Ee="onMouseLeave",J="onMouseEnter",q="mouse",(t==="pointerout"||t==="pointerover")&&($e=qf,Ee="onPointerLeave",J="onPointerEnter",q="pointer"),jt=ke==null?ve:us(ke),se=Xe==null?ve:us(Xe),ve=new $e(Ee,q+"leave",ke,o,xe),ve.target=jt,ve.relatedTarget=se,Ee=null,Rr(xe)===le&&($e=new $e(J,q+"enter",Xe,o,xe),$e.target=se,$e.relatedTarget=jt,Ee=$e),jt=Ee,ke&&Xe)t:{for($e=ke,J=Xe,q=0,se=$e;se;se=ls(se))q++;for(se=0,Ee=J;Ee;Ee=ls(Ee))se++;for(;0<q-se;)$e=ls($e),q--;for(;0<se-q;)J=ls(J),se--;for(;q--;){if($e===J||J!==null&&$e===J.alternate)break t;$e=ls($e),J=ls(J)}$e=null}else $e=null;ke!==null&&yd(Se,ve,ke,$e,!1),Xe!==null&&jt!==null&&yd(Se,jt,Xe,$e,!0)}}e:{if(ve=le?us(le):window,ke=ve.nodeName&&ve.nodeName.toLowerCase(),ke==="select"||ke==="input"&&ve.type==="file")var Ke=Mv;else if(Jf(ve))if(td)Ke=Av;else{Ke=wv;var tt=Ev}else(ke=ve.nodeName)&&ke.toLowerCase()==="input"&&(ve.type==="checkbox"||ve.type==="radio")&&(Ke=Tv);if(Ke&&(Ke=Ke(t,le))){ed(Se,Ke,o,xe);break e}tt&&tt(t,ve,le),t==="focusout"&&(tt=ve._wrapperState)&&tt.controlled&&ve.type==="number"&&P(ve,"number",ve.value)}switch(tt=le?us(le):window,t){case"focusin":(Jf(tt)||tt.contentEditable==="true")&&(os=tt,lc=le,po=null);break;case"focusout":po=lc=os=null;break;case"mousedown":cc=!0;break;case"contextmenu":case"mouseup":case"dragend":cc=!1,cd(Se,o,xe);break;case"selectionchange":if(Rv)break;case"keydown":case"keyup":cd(Se,o,xe)}var nt;if(rc)e:{switch(t){case"compositionstart":var ot="onCompositionStart";break e;case"compositionend":ot="onCompositionEnd";break e;case"compositionupdate":ot="onCompositionUpdate";break e}ot=void 0}else ss?Zf(t,o)&&(ot="onCompositionEnd"):t==="keydown"&&o.keyCode===229&&(ot="onCompositionStart");ot&&($f&&o.locale!=="ko"&&(ss||ot!=="onCompositionStart"?ot==="onCompositionEnd"&&ss&&(nt=Vf()):(Zi=xe,Ql="value"in Zi?Zi.value:Zi.textContent,ss=!0)),tt=ma(le,ot),0<tt.length&&(ot=new Xf(ot,t,null,o,xe),Se.push({event:ot,listeners:tt}),nt?ot.data=nt:(nt=Qf(o),nt!==null&&(ot.data=nt)))),(nt=vv?_v(t,o):xv(t,o))&&(le=ma(le,"onBeforeInput"),0<le.length&&(xe=new Xf("onBeforeInput","beforeinput",null,o,xe),Se.push({event:xe,listeners:le}),xe.data=nt))}_d(Se,i)})}function vo(t,i,o){return{instance:t,listener:i,currentTarget:o}}function ma(t,i){for(var o=i+"Capture",c=[];t!==null;){var d=t,p=d.stateNode;d.tag===5&&p!==null&&(d=p,p=yt(t,o),p!=null&&c.unshift(vo(t,p,d)),p=yt(t,i),p!=null&&c.push(vo(t,p,d))),t=t.return}return c}function ls(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function yd(t,i,o,c,d){for(var p=i._reactName,w=[];o!==null&&o!==c;){var I=o,H=I.alternate,le=I.stateNode;if(H!==null&&H===c)break;I.tag===5&&le!==null&&(I=le,d?(H=yt(o,p),H!=null&&w.unshift(vo(o,H,I))):d||(H=yt(o,p),H!=null&&w.push(vo(o,H,I)))),o=o.return}w.length!==0&&t.push({event:i,listeners:w})}var Dv=/\r\n?/g,Iv=/\u0000|\uFFFD/g;function Sd(t){return(typeof t=="string"?t:""+t).replace(Dv,`
`).replace(Iv,"")}function ga(t,i,o){if(i=Sd(i),Sd(t)!==i&&o)throw Error(n(425))}function va(){}var mc=null,gc=null;function vc(t,i){return t==="textarea"||t==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var _c=typeof setTimeout=="function"?setTimeout:void 0,Uv=typeof clearTimeout=="function"?clearTimeout:void 0,Md=typeof Promise=="function"?Promise:void 0,Fv=typeof queueMicrotask=="function"?queueMicrotask:typeof Md<"u"?function(t){return Md.resolve(null).then(t).catch(Ov)}:_c;function Ov(t){setTimeout(function(){throw t})}function xc(t,i){var o=i,c=0;do{var d=o.nextSibling;if(t.removeChild(o),d&&d.nodeType===8)if(o=d.data,o==="/$"){if(c===0){t.removeChild(d),oo(i);return}c--}else o!=="$"&&o!=="$?"&&o!=="$!"||c++;o=d}while(o);oo(i)}function Ji(t){for(;t!=null;t=t.nextSibling){var i=t.nodeType;if(i===1||i===3)break;if(i===8){if(i=t.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return t}function Ed(t){t=t.previousSibling;for(var i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="$"||o==="$!"||o==="$?"){if(i===0)return t;i--}else o==="/$"&&i++}t=t.previousSibling}return null}var cs=Math.random().toString(36).slice(2),gi="__reactFiber$"+cs,_o="__reactProps$"+cs,Ai="__reactContainer$"+cs,yc="__reactEvents$"+cs,kv="__reactListeners$"+cs,zv="__reactHandles$"+cs;function Rr(t){var i=t[gi];if(i)return i;for(var o=t.parentNode;o;){if(i=o[Ai]||o[gi]){if(o=i.alternate,i.child!==null||o!==null&&o.child!==null)for(t=Ed(t);t!==null;){if(o=t[gi])return o;t=Ed(t)}return i}t=o,o=t.parentNode}return null}function xo(t){return t=t[gi]||t[Ai],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function us(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(n(33))}function _a(t){return t[_o]||null}var Sc=[],fs=-1;function er(t){return{current:t}}function Nt(t){0>fs||(t.current=Sc[fs],Sc[fs]=null,fs--)}function Pt(t,i){fs++,Sc[fs]=t.current,t.current=i}var tr={},fn=er(tr),An=er(!1),Pr=tr;function ds(t,i){var o=t.type.contextTypes;if(!o)return tr;var c=t.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var d={},p;for(p in o)d[p]=i[p];return c&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=d),d}function bn(t){return t=t.childContextTypes,t!=null}function xa(){Nt(An),Nt(fn)}function wd(t,i,o){if(fn.current!==tr)throw Error(n(168));Pt(fn,i),Pt(An,o)}function Td(t,i,o){var c=t.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return o;c=c.getChildContext();for(var d in c)if(!(d in i))throw Error(n(108,Te(t)||"Unknown",d));return j({},o,c)}function ya(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||tr,Pr=fn.current,Pt(fn,t),Pt(An,An.current),!0}function Ad(t,i,o){var c=t.stateNode;if(!c)throw Error(n(169));o?(t=Td(t,i,Pr),c.__reactInternalMemoizedMergedChildContext=t,Nt(An),Nt(fn),Pt(fn,t)):Nt(An),Pt(An,o)}var bi=null,Sa=!1,Mc=!1;function bd(t){bi===null?bi=[t]:bi.push(t)}function Bv(t){Sa=!0,bd(t)}function nr(){if(!Mc&&bi!==null){Mc=!0;var t=0,i=Tt;try{var o=bi;for(Tt=1;t<o.length;t++){var c=o[t];do c=c(!0);while(c!==null)}bi=null,Sa=!1}catch(d){throw bi!==null&&(bi=bi.slice(t+1)),ce(at,nr),d}finally{Tt=i,Mc=!1}}return null}var hs=[],ps=0,Ma=null,Ea=0,Vn=[],Wn=0,Lr=null,Ci=1,Ri="";function Nr(t,i){hs[ps++]=Ea,hs[ps++]=Ma,Ma=t,Ea=i}function Cd(t,i,o){Vn[Wn++]=Ci,Vn[Wn++]=Ri,Vn[Wn++]=Lr,Lr=t;var c=Ci;t=Ri;var d=32-_n(c)-1;c&=~(1<<d),o+=1;var p=32-_n(i)+d;if(30<p){var w=d-d%5;p=(c&(1<<w)-1).toString(32),c>>=w,d-=w,Ci=1<<32-_n(i)+d|o<<d|c,Ri=p+t}else Ci=1<<p|o<<d|c,Ri=t}function Ec(t){t.return!==null&&(Nr(t,1),Cd(t,1,0))}function wc(t){for(;t===Ma;)Ma=hs[--ps],hs[ps]=null,Ea=hs[--ps],hs[ps]=null;for(;t===Lr;)Lr=Vn[--Wn],Vn[Wn]=null,Ri=Vn[--Wn],Vn[Wn]=null,Ci=Vn[--Wn],Vn[Wn]=null}var Fn=null,On=null,Ot=!1,ii=null;function Rd(t,i){var o=$n(5,null,null,0);o.elementType="DELETED",o.stateNode=i,o.return=t,i=t.deletions,i===null?(t.deletions=[o],t.flags|=16):i.push(o)}function Pd(t,i){switch(t.tag){case 5:var o=t.type;return i=i.nodeType!==1||o.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(t.stateNode=i,Fn=t,On=Ji(i.firstChild),!0):!1;case 6:return i=t.pendingProps===""||i.nodeType!==3?null:i,i!==null?(t.stateNode=i,Fn=t,On=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(o=Lr!==null?{id:Ci,overflow:Ri}:null,t.memoizedState={dehydrated:i,treeContext:o,retryLane:1073741824},o=$n(18,null,null,0),o.stateNode=i,o.return=t,t.child=o,Fn=t,On=null,!0):!1;default:return!1}}function Tc(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Ac(t){if(Ot){var i=On;if(i){var o=i;if(!Pd(t,i)){if(Tc(t))throw Error(n(418));i=Ji(o.nextSibling);var c=Fn;i&&Pd(t,i)?Rd(c,o):(t.flags=t.flags&-4097|2,Ot=!1,Fn=t)}}else{if(Tc(t))throw Error(n(418));t.flags=t.flags&-4097|2,Ot=!1,Fn=t}}}function Ld(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Fn=t}function wa(t){if(t!==Fn)return!1;if(!Ot)return Ld(t),Ot=!0,!1;var i;if((i=t.tag!==3)&&!(i=t.tag!==5)&&(i=t.type,i=i!=="head"&&i!=="body"&&!vc(t.type,t.memoizedProps)),i&&(i=On)){if(Tc(t))throw Nd(),Error(n(418));for(;i;)Rd(t,i),i=Ji(i.nextSibling)}if(Ld(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(n(317));e:{for(t=t.nextSibling,i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="/$"){if(i===0){On=Ji(t.nextSibling);break e}i--}else o!=="$"&&o!=="$!"&&o!=="$?"||i++}t=t.nextSibling}On=null}}else On=Fn?Ji(t.stateNode.nextSibling):null;return!0}function Nd(){for(var t=On;t;)t=Ji(t.nextSibling)}function ms(){On=Fn=null,Ot=!1}function bc(t){ii===null?ii=[t]:ii.push(t)}var Hv=D.ReactCurrentBatchConfig;function yo(t,i,o){if(t=o.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(n(309));var c=o.stateNode}if(!c)throw Error(n(147,t));var d=c,p=""+t;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===p?i.ref:(i=function(w){var I=d.refs;w===null?delete I[p]:I[p]=w},i._stringRef=p,i)}if(typeof t!="string")throw Error(n(284));if(!o._owner)throw Error(n(290,t))}return t}function Ta(t,i){throw t=Object.prototype.toString.call(i),Error(n(31,t==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":t))}function Dd(t){var i=t._init;return i(t._payload)}function Id(t){function i(J,q){if(t){var se=J.deletions;se===null?(J.deletions=[q],J.flags|=16):se.push(q)}}function o(J,q){if(!t)return null;for(;q!==null;)i(J,q),q=q.sibling;return null}function c(J,q){for(J=new Map;q!==null;)q.key!==null?J.set(q.key,q):J.set(q.index,q),q=q.sibling;return J}function d(J,q){return J=ur(J,q),J.index=0,J.sibling=null,J}function p(J,q,se){return J.index=se,t?(se=J.alternate,se!==null?(se=se.index,se<q?(J.flags|=2,q):se):(J.flags|=2,q)):(J.flags|=1048576,q)}function w(J){return t&&J.alternate===null&&(J.flags|=2),J}function I(J,q,se,Ee){return q===null||q.tag!==6?(q=_u(se,J.mode,Ee),q.return=J,q):(q=d(q,se),q.return=J,q)}function H(J,q,se,Ee){var Ke=se.type;return Ke===k?xe(J,q,se.props.children,Ee,se.key):q!==null&&(q.elementType===Ke||typeof Ke=="object"&&Ke!==null&&Ke.$$typeof===Q&&Dd(Ke)===q.type)?(Ee=d(q,se.props),Ee.ref=yo(J,q,se),Ee.return=J,Ee):(Ee=Ya(se.type,se.key,se.props,null,J.mode,Ee),Ee.ref=yo(J,q,se),Ee.return=J,Ee)}function le(J,q,se,Ee){return q===null||q.tag!==4||q.stateNode.containerInfo!==se.containerInfo||q.stateNode.implementation!==se.implementation?(q=xu(se,J.mode,Ee),q.return=J,q):(q=d(q,se.children||[]),q.return=J,q)}function xe(J,q,se,Ee,Ke){return q===null||q.tag!==7?(q=Br(se,J.mode,Ee,Ke),q.return=J,q):(q=d(q,se),q.return=J,q)}function Se(J,q,se){if(typeof q=="string"&&q!==""||typeof q=="number")return q=_u(""+q,J.mode,se),q.return=J,q;if(typeof q=="object"&&q!==null){switch(q.$$typeof){case X:return se=Ya(q.type,q.key,q.props,null,J.mode,se),se.ref=yo(J,null,q),se.return=J,se;case O:return q=xu(q,J.mode,se),q.return=J,q;case Q:var Ee=q._init;return Se(J,Ee(q._payload),se)}if(T(q)||z(q))return q=Br(q,J.mode,se,null),q.return=J,q;Ta(J,q)}return null}function ve(J,q,se,Ee){var Ke=q!==null?q.key:null;if(typeof se=="string"&&se!==""||typeof se=="number")return Ke!==null?null:I(J,q,""+se,Ee);if(typeof se=="object"&&se!==null){switch(se.$$typeof){case X:return se.key===Ke?H(J,q,se,Ee):null;case O:return se.key===Ke?le(J,q,se,Ee):null;case Q:return Ke=se._init,ve(J,q,Ke(se._payload),Ee)}if(T(se)||z(se))return Ke!==null?null:xe(J,q,se,Ee,null);Ta(J,se)}return null}function ke(J,q,se,Ee,Ke){if(typeof Ee=="string"&&Ee!==""||typeof Ee=="number")return J=J.get(se)||null,I(q,J,""+Ee,Ke);if(typeof Ee=="object"&&Ee!==null){switch(Ee.$$typeof){case X:return J=J.get(Ee.key===null?se:Ee.key)||null,H(q,J,Ee,Ke);case O:return J=J.get(Ee.key===null?se:Ee.key)||null,le(q,J,Ee,Ke);case Q:var tt=Ee._init;return ke(J,q,se,tt(Ee._payload),Ke)}if(T(Ee)||z(Ee))return J=J.get(se)||null,xe(q,J,Ee,Ke,null);Ta(q,Ee)}return null}function Xe(J,q,se,Ee){for(var Ke=null,tt=null,nt=q,ot=q=0,rn=null;nt!==null&&ot<se.length;ot++){nt.index>ot?(rn=nt,nt=null):rn=nt.sibling;var St=ve(J,nt,se[ot],Ee);if(St===null){nt===null&&(nt=rn);break}t&&nt&&St.alternate===null&&i(J,nt),q=p(St,q,ot),tt===null?Ke=St:tt.sibling=St,tt=St,nt=rn}if(ot===se.length)return o(J,nt),Ot&&Nr(J,ot),Ke;if(nt===null){for(;ot<se.length;ot++)nt=Se(J,se[ot],Ee),nt!==null&&(q=p(nt,q,ot),tt===null?Ke=nt:tt.sibling=nt,tt=nt);return Ot&&Nr(J,ot),Ke}for(nt=c(J,nt);ot<se.length;ot++)rn=ke(nt,J,ot,se[ot],Ee),rn!==null&&(t&&rn.alternate!==null&&nt.delete(rn.key===null?ot:rn.key),q=p(rn,q,ot),tt===null?Ke=rn:tt.sibling=rn,tt=rn);return t&&nt.forEach(function(fr){return i(J,fr)}),Ot&&Nr(J,ot),Ke}function $e(J,q,se,Ee){var Ke=z(se);if(typeof Ke!="function")throw Error(n(150));if(se=Ke.call(se),se==null)throw Error(n(151));for(var tt=Ke=null,nt=q,ot=q=0,rn=null,St=se.next();nt!==null&&!St.done;ot++,St=se.next()){nt.index>ot?(rn=nt,nt=null):rn=nt.sibling;var fr=ve(J,nt,St.value,Ee);if(fr===null){nt===null&&(nt=rn);break}t&&nt&&fr.alternate===null&&i(J,nt),q=p(fr,q,ot),tt===null?Ke=fr:tt.sibling=fr,tt=fr,nt=rn}if(St.done)return o(J,nt),Ot&&Nr(J,ot),Ke;if(nt===null){for(;!St.done;ot++,St=se.next())St=Se(J,St.value,Ee),St!==null&&(q=p(St,q,ot),tt===null?Ke=St:tt.sibling=St,tt=St);return Ot&&Nr(J,ot),Ke}for(nt=c(J,nt);!St.done;ot++,St=se.next())St=ke(nt,J,ot,St.value,Ee),St!==null&&(t&&St.alternate!==null&&nt.delete(St.key===null?ot:St.key),q=p(St,q,ot),tt===null?Ke=St:tt.sibling=St,tt=St);return t&&nt.forEach(function(y_){return i(J,y_)}),Ot&&Nr(J,ot),Ke}function jt(J,q,se,Ee){if(typeof se=="object"&&se!==null&&se.type===k&&se.key===null&&(se=se.props.children),typeof se=="object"&&se!==null){switch(se.$$typeof){case X:e:{for(var Ke=se.key,tt=q;tt!==null;){if(tt.key===Ke){if(Ke=se.type,Ke===k){if(tt.tag===7){o(J,tt.sibling),q=d(tt,se.props.children),q.return=J,J=q;break e}}else if(tt.elementType===Ke||typeof Ke=="object"&&Ke!==null&&Ke.$$typeof===Q&&Dd(Ke)===tt.type){o(J,tt.sibling),q=d(tt,se.props),q.ref=yo(J,tt,se),q.return=J,J=q;break e}o(J,tt);break}else i(J,tt);tt=tt.sibling}se.type===k?(q=Br(se.props.children,J.mode,Ee,se.key),q.return=J,J=q):(Ee=Ya(se.type,se.key,se.props,null,J.mode,Ee),Ee.ref=yo(J,q,se),Ee.return=J,J=Ee)}return w(J);case O:e:{for(tt=se.key;q!==null;){if(q.key===tt)if(q.tag===4&&q.stateNode.containerInfo===se.containerInfo&&q.stateNode.implementation===se.implementation){o(J,q.sibling),q=d(q,se.children||[]),q.return=J,J=q;break e}else{o(J,q);break}else i(J,q);q=q.sibling}q=xu(se,J.mode,Ee),q.return=J,J=q}return w(J);case Q:return tt=se._init,jt(J,q,tt(se._payload),Ee)}if(T(se))return Xe(J,q,se,Ee);if(z(se))return $e(J,q,se,Ee);Ta(J,se)}return typeof se=="string"&&se!==""||typeof se=="number"?(se=""+se,q!==null&&q.tag===6?(o(J,q.sibling),q=d(q,se),q.return=J,J=q):(o(J,q),q=_u(se,J.mode,Ee),q.return=J,J=q),w(J)):o(J,q)}return jt}var gs=Id(!0),Ud=Id(!1),Aa=er(null),ba=null,vs=null,Cc=null;function Rc(){Cc=vs=ba=null}function Pc(t){var i=Aa.current;Nt(Aa),t._currentValue=i}function Lc(t,i,o){for(;t!==null;){var c=t.alternate;if((t.childLanes&i)!==i?(t.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),t===o)break;t=t.return}}function _s(t,i){ba=t,Cc=vs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&((t.lanes&i)!==0&&(Cn=!0),t.firstContext=null)}function jn(t){var i=t._currentValue;if(Cc!==t)if(t={context:t,memoizedValue:i,next:null},vs===null){if(ba===null)throw Error(n(308));vs=t,ba.dependencies={lanes:0,firstContext:t}}else vs=vs.next=t;return i}var Dr=null;function Nc(t){Dr===null?Dr=[t]:Dr.push(t)}function Fd(t,i,o,c){var d=i.interleaved;return d===null?(o.next=o,Nc(i)):(o.next=d.next,d.next=o),i.interleaved=o,Pi(t,c)}function Pi(t,i){t.lanes|=i;var o=t.alternate;for(o!==null&&(o.lanes|=i),o=t,t=t.return;t!==null;)t.childLanes|=i,o=t.alternate,o!==null&&(o.childLanes|=i),o=t,t=t.return;return o.tag===3?o.stateNode:null}var ir=!1;function Dc(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Od(t,i){t=t.updateQueue,i.updateQueue===t&&(i.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Li(t,i){return{eventTime:t,lane:i,tag:0,payload:null,callback:null,next:null}}function rr(t,i,o){var c=t.updateQueue;if(c===null)return null;if(c=c.shared,(_t&2)!==0){var d=c.pending;return d===null?i.next=i:(i.next=d.next,d.next=i),c.pending=i,Pi(t,o)}return d=c.interleaved,d===null?(i.next=i,Nc(c)):(i.next=d.next,d.next=i),c.interleaved=i,Pi(t,o)}function Ca(t,i,o){if(i=i.updateQueue,i!==null&&(i=i.shared,(o&4194240)!==0)){var c=i.lanes;c&=t.pendingLanes,o|=c,i.lanes=o,ql(t,o)}}function kd(t,i){var o=t.updateQueue,c=t.alternate;if(c!==null&&(c=c.updateQueue,o===c)){var d=null,p=null;if(o=o.firstBaseUpdate,o!==null){do{var w={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};p===null?d=p=w:p=p.next=w,o=o.next}while(o!==null);p===null?d=p=i:p=p.next=i}else d=p=i;o={baseState:c.baseState,firstBaseUpdate:d,lastBaseUpdate:p,shared:c.shared,effects:c.effects},t.updateQueue=o;return}t=o.lastBaseUpdate,t===null?o.firstBaseUpdate=i:t.next=i,o.lastBaseUpdate=i}function Ra(t,i,o,c){var d=t.updateQueue;ir=!1;var p=d.firstBaseUpdate,w=d.lastBaseUpdate,I=d.shared.pending;if(I!==null){d.shared.pending=null;var H=I,le=H.next;H.next=null,w===null?p=le:w.next=le,w=H;var xe=t.alternate;xe!==null&&(xe=xe.updateQueue,I=xe.lastBaseUpdate,I!==w&&(I===null?xe.firstBaseUpdate=le:I.next=le,xe.lastBaseUpdate=H))}if(p!==null){var Se=d.baseState;w=0,xe=le=H=null,I=p;do{var ve=I.lane,ke=I.eventTime;if((c&ve)===ve){xe!==null&&(xe=xe.next={eventTime:ke,lane:0,tag:I.tag,payload:I.payload,callback:I.callback,next:null});e:{var Xe=t,$e=I;switch(ve=i,ke=o,$e.tag){case 1:if(Xe=$e.payload,typeof Xe=="function"){Se=Xe.call(ke,Se,ve);break e}Se=Xe;break e;case 3:Xe.flags=Xe.flags&-65537|128;case 0:if(Xe=$e.payload,ve=typeof Xe=="function"?Xe.call(ke,Se,ve):Xe,ve==null)break e;Se=j({},Se,ve);break e;case 2:ir=!0}}I.callback!==null&&I.lane!==0&&(t.flags|=64,ve=d.effects,ve===null?d.effects=[I]:ve.push(I))}else ke={eventTime:ke,lane:ve,tag:I.tag,payload:I.payload,callback:I.callback,next:null},xe===null?(le=xe=ke,H=Se):xe=xe.next=ke,w|=ve;if(I=I.next,I===null){if(I=d.shared.pending,I===null)break;ve=I,I=ve.next,ve.next=null,d.lastBaseUpdate=ve,d.shared.pending=null}}while(!0);if(xe===null&&(H=Se),d.baseState=H,d.firstBaseUpdate=le,d.lastBaseUpdate=xe,i=d.shared.interleaved,i!==null){d=i;do w|=d.lane,d=d.next;while(d!==i)}else p===null&&(d.shared.lanes=0);Fr|=w,t.lanes=w,t.memoizedState=Se}}function zd(t,i,o){if(t=i.effects,i.effects=null,t!==null)for(i=0;i<t.length;i++){var c=t[i],d=c.callback;if(d!==null){if(c.callback=null,c=o,typeof d!="function")throw Error(n(191,d));d.call(c)}}}var So={},vi=er(So),Mo=er(So),Eo=er(So);function Ir(t){if(t===So)throw Error(n(174));return t}function Ic(t,i){switch(Pt(Eo,i),Pt(Mo,t),Pt(vi,So),t=i.nodeType,t){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:Be(null,"");break;default:t=t===8?i.parentNode:i,i=t.namespaceURI||null,t=t.tagName,i=Be(i,t)}Nt(vi),Pt(vi,i)}function xs(){Nt(vi),Nt(Mo),Nt(Eo)}function Bd(t){Ir(Eo.current);var i=Ir(vi.current),o=Be(i,t.type);i!==o&&(Pt(Mo,t),Pt(vi,o))}function Uc(t){Mo.current===t&&(Nt(vi),Nt(Mo))}var zt=er(0);function Pa(t){for(var i=t;i!==null;){if(i.tag===13){var o=i.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Fc=[];function Oc(){for(var t=0;t<Fc.length;t++)Fc[t]._workInProgressVersionPrimary=null;Fc.length=0}var La=D.ReactCurrentDispatcher,kc=D.ReactCurrentBatchConfig,Ur=0,Bt=null,Yt=null,tn=null,Na=!1,wo=!1,To=0,Gv=0;function dn(){throw Error(n(321))}function zc(t,i){if(i===null)return!1;for(var o=0;o<i.length&&o<t.length;o++)if(!ni(t[o],i[o]))return!1;return!0}function Bc(t,i,o,c,d,p){if(Ur=p,Bt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,La.current=t===null||t.memoizedState===null?Xv:qv,t=o(c,d),wo){p=0;do{if(wo=!1,To=0,25<=p)throw Error(n(301));p+=1,tn=Yt=null,i.updateQueue=null,La.current=$v,t=o(c,d)}while(wo)}if(La.current=Ua,i=Yt!==null&&Yt.next!==null,Ur=0,tn=Yt=Bt=null,Na=!1,i)throw Error(n(300));return t}function Hc(){var t=To!==0;return To=0,t}function _i(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return tn===null?Bt.memoizedState=tn=t:tn=tn.next=t,tn}function Xn(){if(Yt===null){var t=Bt.alternate;t=t!==null?t.memoizedState:null}else t=Yt.next;var i=tn===null?Bt.memoizedState:tn.next;if(i!==null)tn=i,Yt=t;else{if(t===null)throw Error(n(310));Yt=t,t={memoizedState:Yt.memoizedState,baseState:Yt.baseState,baseQueue:Yt.baseQueue,queue:Yt.queue,next:null},tn===null?Bt.memoizedState=tn=t:tn=tn.next=t}return tn}function Ao(t,i){return typeof i=="function"?i(t):i}function Gc(t){var i=Xn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var c=Yt,d=c.baseQueue,p=o.pending;if(p!==null){if(d!==null){var w=d.next;d.next=p.next,p.next=w}c.baseQueue=d=p,o.pending=null}if(d!==null){p=d.next,c=c.baseState;var I=w=null,H=null,le=p;do{var xe=le.lane;if((Ur&xe)===xe)H!==null&&(H=H.next={lane:0,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null}),c=le.hasEagerState?le.eagerState:t(c,le.action);else{var Se={lane:xe,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null};H===null?(I=H=Se,w=c):H=H.next=Se,Bt.lanes|=xe,Fr|=xe}le=le.next}while(le!==null&&le!==p);H===null?w=c:H.next=I,ni(c,i.memoizedState)||(Cn=!0),i.memoizedState=c,i.baseState=w,i.baseQueue=H,o.lastRenderedState=c}if(t=o.interleaved,t!==null){d=t;do p=d.lane,Bt.lanes|=p,Fr|=p,d=d.next;while(d!==t)}else d===null&&(o.lanes=0);return[i.memoizedState,o.dispatch]}function Vc(t){var i=Xn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var c=o.dispatch,d=o.pending,p=i.memoizedState;if(d!==null){o.pending=null;var w=d=d.next;do p=t(p,w.action),w=w.next;while(w!==d);ni(p,i.memoizedState)||(Cn=!0),i.memoizedState=p,i.baseQueue===null&&(i.baseState=p),o.lastRenderedState=p}return[p,c]}function Hd(){}function Gd(t,i){var o=Bt,c=Xn(),d=i(),p=!ni(c.memoizedState,d);if(p&&(c.memoizedState=d,Cn=!0),c=c.queue,Wc(jd.bind(null,o,c,t),[t]),c.getSnapshot!==i||p||tn!==null&&tn.memoizedState.tag&1){if(o.flags|=2048,bo(9,Wd.bind(null,o,c,d,i),void 0,null),nn===null)throw Error(n(349));(Ur&30)!==0||Vd(o,i,d)}return d}function Vd(t,i,o){t.flags|=16384,t={getSnapshot:i,value:o},i=Bt.updateQueue,i===null?(i={lastEffect:null,stores:null},Bt.updateQueue=i,i.stores=[t]):(o=i.stores,o===null?i.stores=[t]:o.push(t))}function Wd(t,i,o,c){i.value=o,i.getSnapshot=c,Xd(i)&&qd(t)}function jd(t,i,o){return o(function(){Xd(i)&&qd(t)})}function Xd(t){var i=t.getSnapshot;t=t.value;try{var o=i();return!ni(t,o)}catch{return!0}}function qd(t){var i=Pi(t,1);i!==null&&ai(i,t,1,-1)}function $d(t){var i=_i();return typeof t=="function"&&(t=t()),i.memoizedState=i.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ao,lastRenderedState:t},i.queue=t,t=t.dispatch=jv.bind(null,Bt,t),[i.memoizedState,t]}function bo(t,i,o,c){return t={tag:t,create:i,destroy:o,deps:c,next:null},i=Bt.updateQueue,i===null?(i={lastEffect:null,stores:null},Bt.updateQueue=i,i.lastEffect=t.next=t):(o=i.lastEffect,o===null?i.lastEffect=t.next=t:(c=o.next,o.next=t,t.next=c,i.lastEffect=t)),t}function Yd(){return Xn().memoizedState}function Da(t,i,o,c){var d=_i();Bt.flags|=t,d.memoizedState=bo(1|i,o,void 0,c===void 0?null:c)}function Ia(t,i,o,c){var d=Xn();c=c===void 0?null:c;var p=void 0;if(Yt!==null){var w=Yt.memoizedState;if(p=w.destroy,c!==null&&zc(c,w.deps)){d.memoizedState=bo(i,o,p,c);return}}Bt.flags|=t,d.memoizedState=bo(1|i,o,p,c)}function Kd(t,i){return Da(8390656,8,t,i)}function Wc(t,i){return Ia(2048,8,t,i)}function Zd(t,i){return Ia(4,2,t,i)}function Qd(t,i){return Ia(4,4,t,i)}function Jd(t,i){if(typeof i=="function")return t=t(),i(t),function(){i(null)};if(i!=null)return t=t(),i.current=t,function(){i.current=null}}function eh(t,i,o){return o=o!=null?o.concat([t]):null,Ia(4,4,Jd.bind(null,i,t),o)}function jc(){}function th(t,i){var o=Xn();i=i===void 0?null:i;var c=o.memoizedState;return c!==null&&i!==null&&zc(i,c[1])?c[0]:(o.memoizedState=[t,i],t)}function nh(t,i){var o=Xn();i=i===void 0?null:i;var c=o.memoizedState;return c!==null&&i!==null&&zc(i,c[1])?c[0]:(t=t(),o.memoizedState=[t,i],t)}function ih(t,i,o){return(Ur&21)===0?(t.baseState&&(t.baseState=!1,Cn=!0),t.memoizedState=o):(ni(o,i)||(o=na(),Bt.lanes|=o,Fr|=o,t.baseState=!0),i)}function Vv(t,i){var o=Tt;Tt=o!==0&&4>o?o:4,t(!0);var c=kc.transition;kc.transition={};try{t(!1),i()}finally{Tt=o,kc.transition=c}}function rh(){return Xn().memoizedState}function Wv(t,i,o){var c=lr(t);if(o={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null},sh(t))oh(i,o);else if(o=Fd(t,i,o,c),o!==null){var d=yn();ai(o,t,c,d),ah(o,i,c)}}function jv(t,i,o){var c=lr(t),d={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null};if(sh(t))oh(i,d);else{var p=t.alternate;if(t.lanes===0&&(p===null||p.lanes===0)&&(p=i.lastRenderedReducer,p!==null))try{var w=i.lastRenderedState,I=p(w,o);if(d.hasEagerState=!0,d.eagerState=I,ni(I,w)){var H=i.interleaved;H===null?(d.next=d,Nc(i)):(d.next=H.next,H.next=d),i.interleaved=d;return}}catch{}finally{}o=Fd(t,i,d,c),o!==null&&(d=yn(),ai(o,t,c,d),ah(o,i,c))}}function sh(t){var i=t.alternate;return t===Bt||i!==null&&i===Bt}function oh(t,i){wo=Na=!0;var o=t.pending;o===null?i.next=i:(i.next=o.next,o.next=i),t.pending=i}function ah(t,i,o){if((o&4194240)!==0){var c=i.lanes;c&=t.pendingLanes,o|=c,i.lanes=o,ql(t,o)}}var Ua={readContext:jn,useCallback:dn,useContext:dn,useEffect:dn,useImperativeHandle:dn,useInsertionEffect:dn,useLayoutEffect:dn,useMemo:dn,useReducer:dn,useRef:dn,useState:dn,useDebugValue:dn,useDeferredValue:dn,useTransition:dn,useMutableSource:dn,useSyncExternalStore:dn,useId:dn,unstable_isNewReconciler:!1},Xv={readContext:jn,useCallback:function(t,i){return _i().memoizedState=[t,i===void 0?null:i],t},useContext:jn,useEffect:Kd,useImperativeHandle:function(t,i,o){return o=o!=null?o.concat([t]):null,Da(4194308,4,Jd.bind(null,i,t),o)},useLayoutEffect:function(t,i){return Da(4194308,4,t,i)},useInsertionEffect:function(t,i){return Da(4,2,t,i)},useMemo:function(t,i){var o=_i();return i=i===void 0?null:i,t=t(),o.memoizedState=[t,i],t},useReducer:function(t,i,o){var c=_i();return i=o!==void 0?o(i):i,c.memoizedState=c.baseState=i,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:i},c.queue=t,t=t.dispatch=Wv.bind(null,Bt,t),[c.memoizedState,t]},useRef:function(t){var i=_i();return t={current:t},i.memoizedState=t},useState:$d,useDebugValue:jc,useDeferredValue:function(t){return _i().memoizedState=t},useTransition:function(){var t=$d(!1),i=t[0];return t=Vv.bind(null,t[1]),_i().memoizedState=t,[i,t]},useMutableSource:function(){},useSyncExternalStore:function(t,i,o){var c=Bt,d=_i();if(Ot){if(o===void 0)throw Error(n(407));o=o()}else{if(o=i(),nn===null)throw Error(n(349));(Ur&30)!==0||Vd(c,i,o)}d.memoizedState=o;var p={value:o,getSnapshot:i};return d.queue=p,Kd(jd.bind(null,c,p,t),[t]),c.flags|=2048,bo(9,Wd.bind(null,c,p,o,i),void 0,null),o},useId:function(){var t=_i(),i=nn.identifierPrefix;if(Ot){var o=Ri,c=Ci;o=(c&~(1<<32-_n(c)-1)).toString(32)+o,i=":"+i+"R"+o,o=To++,0<o&&(i+="H"+o.toString(32)),i+=":"}else o=Gv++,i=":"+i+"r"+o.toString(32)+":";return t.memoizedState=i},unstable_isNewReconciler:!1},qv={readContext:jn,useCallback:th,useContext:jn,useEffect:Wc,useImperativeHandle:eh,useInsertionEffect:Zd,useLayoutEffect:Qd,useMemo:nh,useReducer:Gc,useRef:Yd,useState:function(){return Gc(Ao)},useDebugValue:jc,useDeferredValue:function(t){var i=Xn();return ih(i,Yt.memoizedState,t)},useTransition:function(){var t=Gc(Ao)[0],i=Xn().memoizedState;return[t,i]},useMutableSource:Hd,useSyncExternalStore:Gd,useId:rh,unstable_isNewReconciler:!1},$v={readContext:jn,useCallback:th,useContext:jn,useEffect:Wc,useImperativeHandle:eh,useInsertionEffect:Zd,useLayoutEffect:Qd,useMemo:nh,useReducer:Vc,useRef:Yd,useState:function(){return Vc(Ao)},useDebugValue:jc,useDeferredValue:function(t){var i=Xn();return Yt===null?i.memoizedState=t:ih(i,Yt.memoizedState,t)},useTransition:function(){var t=Vc(Ao)[0],i=Xn().memoizedState;return[t,i]},useMutableSource:Hd,useSyncExternalStore:Gd,useId:rh,unstable_isNewReconciler:!1};function ri(t,i){if(t&&t.defaultProps){i=j({},i),t=t.defaultProps;for(var o in t)i[o]===void 0&&(i[o]=t[o]);return i}return i}function Xc(t,i,o,c){i=t.memoizedState,o=o(c,i),o=o==null?i:j({},i,o),t.memoizedState=o,t.lanes===0&&(t.updateQueue.baseState=o)}var Fa={isMounted:function(t){return(t=t._reactInternals)?wi(t)===t:!1},enqueueSetState:function(t,i,o){t=t._reactInternals;var c=yn(),d=lr(t),p=Li(c,d);p.payload=i,o!=null&&(p.callback=o),i=rr(t,p,d),i!==null&&(ai(i,t,d,c),Ca(i,t,d))},enqueueReplaceState:function(t,i,o){t=t._reactInternals;var c=yn(),d=lr(t),p=Li(c,d);p.tag=1,p.payload=i,o!=null&&(p.callback=o),i=rr(t,p,d),i!==null&&(ai(i,t,d,c),Ca(i,t,d))},enqueueForceUpdate:function(t,i){t=t._reactInternals;var o=yn(),c=lr(t),d=Li(o,c);d.tag=2,i!=null&&(d.callback=i),i=rr(t,d,c),i!==null&&(ai(i,t,c,o),Ca(i,t,c))}};function lh(t,i,o,c,d,p,w){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(c,p,w):i.prototype&&i.prototype.isPureReactComponent?!ho(o,c)||!ho(d,p):!0}function ch(t,i,o){var c=!1,d=tr,p=i.contextType;return typeof p=="object"&&p!==null?p=jn(p):(d=bn(i)?Pr:fn.current,c=i.contextTypes,p=(c=c!=null)?ds(t,d):tr),i=new i(o,p),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Fa,t.stateNode=i,i._reactInternals=t,c&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=d,t.__reactInternalMemoizedMaskedChildContext=p),i}function uh(t,i,o,c){t=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(o,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(o,c),i.state!==t&&Fa.enqueueReplaceState(i,i.state,null)}function qc(t,i,o,c){var d=t.stateNode;d.props=o,d.state=t.memoizedState,d.refs={},Dc(t);var p=i.contextType;typeof p=="object"&&p!==null?d.context=jn(p):(p=bn(i)?Pr:fn.current,d.context=ds(t,p)),d.state=t.memoizedState,p=i.getDerivedStateFromProps,typeof p=="function"&&(Xc(t,i,p,o),d.state=t.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(i=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),i!==d.state&&Fa.enqueueReplaceState(d,d.state,null),Ra(t,o,d,c),d.state=t.memoizedState),typeof d.componentDidMount=="function"&&(t.flags|=4194308)}function ys(t,i){try{var o="",c=i;do o+=me(c),c=c.return;while(c);var d=o}catch(p){d=`
Error generating stack: `+p.message+`
`+p.stack}return{value:t,source:i,stack:d,digest:null}}function $c(t,i,o){return{value:t,source:null,stack:o??null,digest:i??null}}function Yc(t,i){try{console.error(i.value)}catch(o){setTimeout(function(){throw o})}}var Yv=typeof WeakMap=="function"?WeakMap:Map;function fh(t,i,o){o=Li(-1,o),o.tag=3,o.payload={element:null};var c=i.value;return o.callback=function(){Va||(Va=!0,uu=c),Yc(t,i)},o}function dh(t,i,o){o=Li(-1,o),o.tag=3;var c=t.type.getDerivedStateFromError;if(typeof c=="function"){var d=i.value;o.payload=function(){return c(d)},o.callback=function(){Yc(t,i)}}var p=t.stateNode;return p!==null&&typeof p.componentDidCatch=="function"&&(o.callback=function(){Yc(t,i),typeof c!="function"&&(or===null?or=new Set([this]):or.add(this));var w=i.stack;this.componentDidCatch(i.value,{componentStack:w!==null?w:""})}),o}function hh(t,i,o){var c=t.pingCache;if(c===null){c=t.pingCache=new Yv;var d=new Set;c.set(i,d)}else d=c.get(i),d===void 0&&(d=new Set,c.set(i,d));d.has(o)||(d.add(o),t=c_.bind(null,t,i,o),i.then(t,t))}function ph(t){do{var i;if((i=t.tag===13)&&(i=t.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return t;t=t.return}while(t!==null);return null}function mh(t,i,o,c,d){return(t.mode&1)===0?(t===i?t.flags|=65536:(t.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(i=Li(-1,1),i.tag=2,rr(o,i,1))),o.lanes|=1),t):(t.flags|=65536,t.lanes=d,t)}var Kv=D.ReactCurrentOwner,Cn=!1;function xn(t,i,o,c){i.child=t===null?Ud(i,null,o,c):gs(i,t.child,o,c)}function gh(t,i,o,c,d){o=o.render;var p=i.ref;return _s(i,d),c=Bc(t,i,o,c,p,d),o=Hc(),t!==null&&!Cn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~d,Ni(t,i,d)):(Ot&&o&&Ec(i),i.flags|=1,xn(t,i,c,d),i.child)}function vh(t,i,o,c,d){if(t===null){var p=o.type;return typeof p=="function"&&!vu(p)&&p.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(i.tag=15,i.type=p,_h(t,i,p,c,d)):(t=Ya(o.type,null,c,i,i.mode,d),t.ref=i.ref,t.return=i,i.child=t)}if(p=t.child,(t.lanes&d)===0){var w=p.memoizedProps;if(o=o.compare,o=o!==null?o:ho,o(w,c)&&t.ref===i.ref)return Ni(t,i,d)}return i.flags|=1,t=ur(p,c),t.ref=i.ref,t.return=i,i.child=t}function _h(t,i,o,c,d){if(t!==null){var p=t.memoizedProps;if(ho(p,c)&&t.ref===i.ref)if(Cn=!1,i.pendingProps=c=p,(t.lanes&d)!==0)(t.flags&131072)!==0&&(Cn=!0);else return i.lanes=t.lanes,Ni(t,i,d)}return Kc(t,i,o,c,d)}function xh(t,i,o){var c=i.pendingProps,d=c.children,p=t!==null?t.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Pt(Ms,kn),kn|=o;else{if((o&1073741824)===0)return t=p!==null?p.baseLanes|o:o,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:t,cachePool:null,transitions:null},i.updateQueue=null,Pt(Ms,kn),kn|=t,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=p!==null?p.baseLanes:o,Pt(Ms,kn),kn|=c}else p!==null?(c=p.baseLanes|o,i.memoizedState=null):c=o,Pt(Ms,kn),kn|=c;return xn(t,i,d,o),i.child}function yh(t,i){var o=i.ref;(t===null&&o!==null||t!==null&&t.ref!==o)&&(i.flags|=512,i.flags|=2097152)}function Kc(t,i,o,c,d){var p=bn(o)?Pr:fn.current;return p=ds(i,p),_s(i,d),o=Bc(t,i,o,c,p,d),c=Hc(),t!==null&&!Cn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~d,Ni(t,i,d)):(Ot&&c&&Ec(i),i.flags|=1,xn(t,i,o,d),i.child)}function Sh(t,i,o,c,d){if(bn(o)){var p=!0;ya(i)}else p=!1;if(_s(i,d),i.stateNode===null)ka(t,i),ch(i,o,c),qc(i,o,c,d),c=!0;else if(t===null){var w=i.stateNode,I=i.memoizedProps;w.props=I;var H=w.context,le=o.contextType;typeof le=="object"&&le!==null?le=jn(le):(le=bn(o)?Pr:fn.current,le=ds(i,le));var xe=o.getDerivedStateFromProps,Se=typeof xe=="function"||typeof w.getSnapshotBeforeUpdate=="function";Se||typeof w.UNSAFE_componentWillReceiveProps!="function"&&typeof w.componentWillReceiveProps!="function"||(I!==c||H!==le)&&uh(i,w,c,le),ir=!1;var ve=i.memoizedState;w.state=ve,Ra(i,c,w,d),H=i.memoizedState,I!==c||ve!==H||An.current||ir?(typeof xe=="function"&&(Xc(i,o,xe,c),H=i.memoizedState),(I=ir||lh(i,o,I,c,ve,H,le))?(Se||typeof w.UNSAFE_componentWillMount!="function"&&typeof w.componentWillMount!="function"||(typeof w.componentWillMount=="function"&&w.componentWillMount(),typeof w.UNSAFE_componentWillMount=="function"&&w.UNSAFE_componentWillMount()),typeof w.componentDidMount=="function"&&(i.flags|=4194308)):(typeof w.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=H),w.props=c,w.state=H,w.context=le,c=I):(typeof w.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{w=i.stateNode,Od(t,i),I=i.memoizedProps,le=i.type===i.elementType?I:ri(i.type,I),w.props=le,Se=i.pendingProps,ve=w.context,H=o.contextType,typeof H=="object"&&H!==null?H=jn(H):(H=bn(o)?Pr:fn.current,H=ds(i,H));var ke=o.getDerivedStateFromProps;(xe=typeof ke=="function"||typeof w.getSnapshotBeforeUpdate=="function")||typeof w.UNSAFE_componentWillReceiveProps!="function"&&typeof w.componentWillReceiveProps!="function"||(I!==Se||ve!==H)&&uh(i,w,c,H),ir=!1,ve=i.memoizedState,w.state=ve,Ra(i,c,w,d);var Xe=i.memoizedState;I!==Se||ve!==Xe||An.current||ir?(typeof ke=="function"&&(Xc(i,o,ke,c),Xe=i.memoizedState),(le=ir||lh(i,o,le,c,ve,Xe,H)||!1)?(xe||typeof w.UNSAFE_componentWillUpdate!="function"&&typeof w.componentWillUpdate!="function"||(typeof w.componentWillUpdate=="function"&&w.componentWillUpdate(c,Xe,H),typeof w.UNSAFE_componentWillUpdate=="function"&&w.UNSAFE_componentWillUpdate(c,Xe,H)),typeof w.componentDidUpdate=="function"&&(i.flags|=4),typeof w.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof w.componentDidUpdate!="function"||I===t.memoizedProps&&ve===t.memoizedState||(i.flags|=4),typeof w.getSnapshotBeforeUpdate!="function"||I===t.memoizedProps&&ve===t.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=Xe),w.props=c,w.state=Xe,w.context=H,c=le):(typeof w.componentDidUpdate!="function"||I===t.memoizedProps&&ve===t.memoizedState||(i.flags|=4),typeof w.getSnapshotBeforeUpdate!="function"||I===t.memoizedProps&&ve===t.memoizedState||(i.flags|=1024),c=!1)}return Zc(t,i,o,c,p,d)}function Zc(t,i,o,c,d,p){yh(t,i);var w=(i.flags&128)!==0;if(!c&&!w)return d&&Ad(i,o,!1),Ni(t,i,p);c=i.stateNode,Kv.current=i;var I=w&&typeof o.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,t!==null&&w?(i.child=gs(i,t.child,null,p),i.child=gs(i,null,I,p)):xn(t,i,I,p),i.memoizedState=c.state,d&&Ad(i,o,!0),i.child}function Mh(t){var i=t.stateNode;i.pendingContext?wd(t,i.pendingContext,i.pendingContext!==i.context):i.context&&wd(t,i.context,!1),Ic(t,i.containerInfo)}function Eh(t,i,o,c,d){return ms(),bc(d),i.flags|=256,xn(t,i,o,c),i.child}var Qc={dehydrated:null,treeContext:null,retryLane:0};function Jc(t){return{baseLanes:t,cachePool:null,transitions:null}}function wh(t,i,o){var c=i.pendingProps,d=zt.current,p=!1,w=(i.flags&128)!==0,I;if((I=w)||(I=t!==null&&t.memoizedState===null?!1:(d&2)!==0),I?(p=!0,i.flags&=-129):(t===null||t.memoizedState!==null)&&(d|=1),Pt(zt,d&1),t===null)return Ac(i),t=i.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?((i.mode&1)===0?i.lanes=1:t.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(w=c.children,t=c.fallback,p?(c=i.mode,p=i.child,w={mode:"hidden",children:w},(c&1)===0&&p!==null?(p.childLanes=0,p.pendingProps=w):p=Ka(w,c,0,null),t=Br(t,c,o,null),p.return=i,t.return=i,p.sibling=t,i.child=p,i.child.memoizedState=Jc(o),i.memoizedState=Qc,t):eu(i,w));if(d=t.memoizedState,d!==null&&(I=d.dehydrated,I!==null))return Zv(t,i,w,c,I,d,o);if(p){p=c.fallback,w=i.mode,d=t.child,I=d.sibling;var H={mode:"hidden",children:c.children};return(w&1)===0&&i.child!==d?(c=i.child,c.childLanes=0,c.pendingProps=H,i.deletions=null):(c=ur(d,H),c.subtreeFlags=d.subtreeFlags&14680064),I!==null?p=ur(I,p):(p=Br(p,w,o,null),p.flags|=2),p.return=i,c.return=i,c.sibling=p,i.child=c,c=p,p=i.child,w=t.child.memoizedState,w=w===null?Jc(o):{baseLanes:w.baseLanes|o,cachePool:null,transitions:w.transitions},p.memoizedState=w,p.childLanes=t.childLanes&~o,i.memoizedState=Qc,c}return p=t.child,t=p.sibling,c=ur(p,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=o),c.return=i,c.sibling=null,t!==null&&(o=i.deletions,o===null?(i.deletions=[t],i.flags|=16):o.push(t)),i.child=c,i.memoizedState=null,c}function eu(t,i){return i=Ka({mode:"visible",children:i},t.mode,0,null),i.return=t,t.child=i}function Oa(t,i,o,c){return c!==null&&bc(c),gs(i,t.child,null,o),t=eu(i,i.pendingProps.children),t.flags|=2,i.memoizedState=null,t}function Zv(t,i,o,c,d,p,w){if(o)return i.flags&256?(i.flags&=-257,c=$c(Error(n(422))),Oa(t,i,w,c)):i.memoizedState!==null?(i.child=t.child,i.flags|=128,null):(p=c.fallback,d=i.mode,c=Ka({mode:"visible",children:c.children},d,0,null),p=Br(p,d,w,null),p.flags|=2,c.return=i,p.return=i,c.sibling=p,i.child=c,(i.mode&1)!==0&&gs(i,t.child,null,w),i.child.memoizedState=Jc(w),i.memoizedState=Qc,p);if((i.mode&1)===0)return Oa(t,i,w,null);if(d.data==="$!"){if(c=d.nextSibling&&d.nextSibling.dataset,c)var I=c.dgst;return c=I,p=Error(n(419)),c=$c(p,c,void 0),Oa(t,i,w,c)}if(I=(w&t.childLanes)!==0,Cn||I){if(c=nn,c!==null){switch(w&-w){case 4:d=2;break;case 16:d=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:d=32;break;case 536870912:d=268435456;break;default:d=0}d=(d&(c.suspendedLanes|w))!==0?0:d,d!==0&&d!==p.retryLane&&(p.retryLane=d,Pi(t,d),ai(c,t,d,-1))}return gu(),c=$c(Error(n(421))),Oa(t,i,w,c)}return d.data==="$?"?(i.flags|=128,i.child=t.child,i=u_.bind(null,t),d._reactRetry=i,null):(t=p.treeContext,On=Ji(d.nextSibling),Fn=i,Ot=!0,ii=null,t!==null&&(Vn[Wn++]=Ci,Vn[Wn++]=Ri,Vn[Wn++]=Lr,Ci=t.id,Ri=t.overflow,Lr=i),i=eu(i,c.children),i.flags|=4096,i)}function Th(t,i,o){t.lanes|=i;var c=t.alternate;c!==null&&(c.lanes|=i),Lc(t.return,i,o)}function tu(t,i,o,c,d){var p=t.memoizedState;p===null?t.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:o,tailMode:d}:(p.isBackwards=i,p.rendering=null,p.renderingStartTime=0,p.last=c,p.tail=o,p.tailMode=d)}function Ah(t,i,o){var c=i.pendingProps,d=c.revealOrder,p=c.tail;if(xn(t,i,c.children,o),c=zt.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=i.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Th(t,o,i);else if(t.tag===19)Th(t,o,i);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===i)break e;for(;t.sibling===null;){if(t.return===null||t.return===i)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}c&=1}if(Pt(zt,c),(i.mode&1)===0)i.memoizedState=null;else switch(d){case"forwards":for(o=i.child,d=null;o!==null;)t=o.alternate,t!==null&&Pa(t)===null&&(d=o),o=o.sibling;o=d,o===null?(d=i.child,i.child=null):(d=o.sibling,o.sibling=null),tu(i,!1,d,o,p);break;case"backwards":for(o=null,d=i.child,i.child=null;d!==null;){if(t=d.alternate,t!==null&&Pa(t)===null){i.child=d;break}t=d.sibling,d.sibling=o,o=d,d=t}tu(i,!0,o,null,p);break;case"together":tu(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function ka(t,i){(i.mode&1)===0&&t!==null&&(t.alternate=null,i.alternate=null,i.flags|=2)}function Ni(t,i,o){if(t!==null&&(i.dependencies=t.dependencies),Fr|=i.lanes,(o&i.childLanes)===0)return null;if(t!==null&&i.child!==t.child)throw Error(n(153));if(i.child!==null){for(t=i.child,o=ur(t,t.pendingProps),i.child=o,o.return=i;t.sibling!==null;)t=t.sibling,o=o.sibling=ur(t,t.pendingProps),o.return=i;o.sibling=null}return i.child}function Qv(t,i,o){switch(i.tag){case 3:Mh(i),ms();break;case 5:Bd(i);break;case 1:bn(i.type)&&ya(i);break;case 4:Ic(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,d=i.memoizedProps.value;Pt(Aa,c._currentValue),c._currentValue=d;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(Pt(zt,zt.current&1),i.flags|=128,null):(o&i.child.childLanes)!==0?wh(t,i,o):(Pt(zt,zt.current&1),t=Ni(t,i,o),t!==null?t.sibling:null);Pt(zt,zt.current&1);break;case 19:if(c=(o&i.childLanes)!==0,(t.flags&128)!==0){if(c)return Ah(t,i,o);i.flags|=128}if(d=i.memoizedState,d!==null&&(d.rendering=null,d.tail=null,d.lastEffect=null),Pt(zt,zt.current),c)break;return null;case 22:case 23:return i.lanes=0,xh(t,i,o)}return Ni(t,i,o)}var bh,nu,Ch,Rh;bh=function(t,i){for(var o=i.child;o!==null;){if(o.tag===5||o.tag===6)t.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===i)break;for(;o.sibling===null;){if(o.return===null||o.return===i)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},nu=function(){},Ch=function(t,i,o,c){var d=t.memoizedProps;if(d!==c){t=i.stateNode,Ir(vi.current);var p=null;switch(o){case"input":d=Ce(t,d),c=Ce(t,c),p=[];break;case"select":d=j({},d,{value:void 0}),c=j({},c,{value:void 0}),p=[];break;case"textarea":d=ye(t,d),c=ye(t,c),p=[];break;default:typeof d.onClick!="function"&&typeof c.onClick=="function"&&(t.onclick=va)}Je(o,c);var w;o=null;for(le in d)if(!c.hasOwnProperty(le)&&d.hasOwnProperty(le)&&d[le]!=null)if(le==="style"){var I=d[le];for(w in I)I.hasOwnProperty(w)&&(o||(o={}),o[w]="")}else le!=="dangerouslySetInnerHTML"&&le!=="children"&&le!=="suppressContentEditableWarning"&&le!=="suppressHydrationWarning"&&le!=="autoFocus"&&(a.hasOwnProperty(le)?p||(p=[]):(p=p||[]).push(le,null));for(le in c){var H=c[le];if(I=d!=null?d[le]:void 0,c.hasOwnProperty(le)&&H!==I&&(H!=null||I!=null))if(le==="style")if(I){for(w in I)!I.hasOwnProperty(w)||H&&H.hasOwnProperty(w)||(o||(o={}),o[w]="");for(w in H)H.hasOwnProperty(w)&&I[w]!==H[w]&&(o||(o={}),o[w]=H[w])}else o||(p||(p=[]),p.push(le,o)),o=H;else le==="dangerouslySetInnerHTML"?(H=H?H.__html:void 0,I=I?I.__html:void 0,H!=null&&I!==H&&(p=p||[]).push(le,H)):le==="children"?typeof H!="string"&&typeof H!="number"||(p=p||[]).push(le,""+H):le!=="suppressContentEditableWarning"&&le!=="suppressHydrationWarning"&&(a.hasOwnProperty(le)?(H!=null&&le==="onScroll"&&Lt("scroll",t),p||I===H||(p=[])):(p=p||[]).push(le,H))}o&&(p=p||[]).push("style",o);var le=p;(i.updateQueue=le)&&(i.flags|=4)}},Rh=function(t,i,o,c){o!==c&&(i.flags|=4)};function Co(t,i){if(!Ot)switch(t.tailMode){case"hidden":i=t.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?t.tail=null:o.sibling=null;break;case"collapsed":o=t.tail;for(var c=null;o!==null;)o.alternate!==null&&(c=o),o=o.sibling;c===null?i||t.tail===null?t.tail=null:t.tail.sibling=null:c.sibling=null}}function hn(t){var i=t.alternate!==null&&t.alternate.child===t.child,o=0,c=0;if(i)for(var d=t.child;d!==null;)o|=d.lanes|d.childLanes,c|=d.subtreeFlags&14680064,c|=d.flags&14680064,d.return=t,d=d.sibling;else for(d=t.child;d!==null;)o|=d.lanes|d.childLanes,c|=d.subtreeFlags,c|=d.flags,d.return=t,d=d.sibling;return t.subtreeFlags|=c,t.childLanes=o,i}function Jv(t,i,o){var c=i.pendingProps;switch(wc(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return hn(i),null;case 1:return bn(i.type)&&xa(),hn(i),null;case 3:return c=i.stateNode,xs(),Nt(An),Nt(fn),Oc(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(t===null||t.child===null)&&(wa(i)?i.flags|=4:t===null||t.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,ii!==null&&(hu(ii),ii=null))),nu(t,i),hn(i),null;case 5:Uc(i);var d=Ir(Eo.current);if(o=i.type,t!==null&&i.stateNode!=null)Ch(t,i,o,c,d),t.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(n(166));return hn(i),null}if(t=Ir(vi.current),wa(i)){c=i.stateNode,o=i.type;var p=i.memoizedProps;switch(c[gi]=i,c[_o]=p,t=(i.mode&1)!==0,o){case"dialog":Lt("cancel",c),Lt("close",c);break;case"iframe":case"object":case"embed":Lt("load",c);break;case"video":case"audio":for(d=0;d<mo.length;d++)Lt(mo[d],c);break;case"source":Lt("error",c);break;case"img":case"image":case"link":Lt("error",c),Lt("load",c);break;case"details":Lt("toggle",c);break;case"input":it(c,p),Lt("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!p.multiple},Lt("invalid",c);break;case"textarea":_e(c,p),Lt("invalid",c)}Je(o,p),d=null;for(var w in p)if(p.hasOwnProperty(w)){var I=p[w];w==="children"?typeof I=="string"?c.textContent!==I&&(p.suppressHydrationWarning!==!0&&ga(c.textContent,I,t),d=["children",I]):typeof I=="number"&&c.textContent!==""+I&&(p.suppressHydrationWarning!==!0&&ga(c.textContent,I,t),d=["children",""+I]):a.hasOwnProperty(w)&&I!=null&&w==="onScroll"&&Lt("scroll",c)}switch(o){case"input":Pe(c),je(c,p,!0);break;case"textarea":Pe(c),Ye(c);break;case"select":case"option":break;default:typeof p.onClick=="function"&&(c.onclick=va)}c=d,i.updateQueue=c,c!==null&&(i.flags|=4)}else{w=d.nodeType===9?d:d.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Ie(o)),t==="http://www.w3.org/1999/xhtml"?o==="script"?(t=w.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof c.is=="string"?t=w.createElement(o,{is:c.is}):(t=w.createElement(o),o==="select"&&(w=t,c.multiple?w.multiple=!0:c.size&&(w.size=c.size))):t=w.createElementNS(t,o),t[gi]=i,t[_o]=c,bh(t,i,!1,!1),i.stateNode=t;e:{switch(w=gt(o,c),o){case"dialog":Lt("cancel",t),Lt("close",t),d=c;break;case"iframe":case"object":case"embed":Lt("load",t),d=c;break;case"video":case"audio":for(d=0;d<mo.length;d++)Lt(mo[d],t);d=c;break;case"source":Lt("error",t),d=c;break;case"img":case"image":case"link":Lt("error",t),Lt("load",t),d=c;break;case"details":Lt("toggle",t),d=c;break;case"input":it(t,c),d=Ce(t,c),Lt("invalid",t);break;case"option":d=c;break;case"select":t._wrapperState={wasMultiple:!!c.multiple},d=j({},c,{value:void 0}),Lt("invalid",t);break;case"textarea":_e(t,c),d=ye(t,c),Lt("invalid",t);break;default:d=c}Je(o,d),I=d;for(p in I)if(I.hasOwnProperty(p)){var H=I[p];p==="style"?qe(t,H):p==="dangerouslySetInnerHTML"?(H=H?H.__html:void 0,H!=null&&ue(t,H)):p==="children"?typeof H=="string"?(o!=="textarea"||H!=="")&&K(t,H):typeof H=="number"&&K(t,""+H):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(a.hasOwnProperty(p)?H!=null&&p==="onScroll"&&Lt("scroll",t):H!=null&&b(t,p,H,w))}switch(o){case"input":Pe(t),je(t,c,!1);break;case"textarea":Pe(t),Ye(t);break;case"option":c.value!=null&&t.setAttribute("value",""+Ae(c.value));break;case"select":t.multiple=!!c.multiple,p=c.value,p!=null?oe(t,!!c.multiple,p,!1):c.defaultValue!=null&&oe(t,!!c.multiple,c.defaultValue,!0);break;default:typeof d.onClick=="function"&&(t.onclick=va)}switch(o){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return hn(i),null;case 6:if(t&&i.stateNode!=null)Rh(t,i,t.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(n(166));if(o=Ir(Eo.current),Ir(vi.current),wa(i)){if(c=i.stateNode,o=i.memoizedProps,c[gi]=i,(p=c.nodeValue!==o)&&(t=Fn,t!==null))switch(t.tag){case 3:ga(c.nodeValue,o,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&ga(c.nodeValue,o,(t.mode&1)!==0)}p&&(i.flags|=4)}else c=(o.nodeType===9?o:o.ownerDocument).createTextNode(c),c[gi]=i,i.stateNode=c}return hn(i),null;case 13:if(Nt(zt),c=i.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ot&&On!==null&&(i.mode&1)!==0&&(i.flags&128)===0)Nd(),ms(),i.flags|=98560,p=!1;else if(p=wa(i),c!==null&&c.dehydrated!==null){if(t===null){if(!p)throw Error(n(318));if(p=i.memoizedState,p=p!==null?p.dehydrated:null,!p)throw Error(n(317));p[gi]=i}else ms(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;hn(i),p=!1}else ii!==null&&(hu(ii),ii=null),p=!0;if(!p)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=o,i):(c=c!==null,c!==(t!==null&&t.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(t===null||(zt.current&1)!==0?Kt===0&&(Kt=3):gu())),i.updateQueue!==null&&(i.flags|=4),hn(i),null);case 4:return xs(),nu(t,i),t===null&&go(i.stateNode.containerInfo),hn(i),null;case 10:return Pc(i.type._context),hn(i),null;case 17:return bn(i.type)&&xa(),hn(i),null;case 19:if(Nt(zt),p=i.memoizedState,p===null)return hn(i),null;if(c=(i.flags&128)!==0,w=p.rendering,w===null)if(c)Co(p,!1);else{if(Kt!==0||t!==null&&(t.flags&128)!==0)for(t=i.child;t!==null;){if(w=Pa(t),w!==null){for(i.flags|=128,Co(p,!1),c=w.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=o,o=i.child;o!==null;)p=o,t=c,p.flags&=14680066,w=p.alternate,w===null?(p.childLanes=0,p.lanes=t,p.child=null,p.subtreeFlags=0,p.memoizedProps=null,p.memoizedState=null,p.updateQueue=null,p.dependencies=null,p.stateNode=null):(p.childLanes=w.childLanes,p.lanes=w.lanes,p.child=w.child,p.subtreeFlags=0,p.deletions=null,p.memoizedProps=w.memoizedProps,p.memoizedState=w.memoizedState,p.updateQueue=w.updateQueue,p.type=w.type,t=w.dependencies,p.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),o=o.sibling;return Pt(zt,zt.current&1|2),i.child}t=t.sibling}p.tail!==null&&He()>Es&&(i.flags|=128,c=!0,Co(p,!1),i.lanes=4194304)}else{if(!c)if(t=Pa(w),t!==null){if(i.flags|=128,c=!0,o=t.updateQueue,o!==null&&(i.updateQueue=o,i.flags|=4),Co(p,!0),p.tail===null&&p.tailMode==="hidden"&&!w.alternate&&!Ot)return hn(i),null}else 2*He()-p.renderingStartTime>Es&&o!==1073741824&&(i.flags|=128,c=!0,Co(p,!1),i.lanes=4194304);p.isBackwards?(w.sibling=i.child,i.child=w):(o=p.last,o!==null?o.sibling=w:i.child=w,p.last=w)}return p.tail!==null?(i=p.tail,p.rendering=i,p.tail=i.sibling,p.renderingStartTime=He(),i.sibling=null,o=zt.current,Pt(zt,c?o&1|2:o&1),i):(hn(i),null);case 22:case 23:return mu(),c=i.memoizedState!==null,t!==null&&t.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(kn&1073741824)!==0&&(hn(i),i.subtreeFlags&6&&(i.flags|=8192)):hn(i),null;case 24:return null;case 25:return null}throw Error(n(156,i.tag))}function e_(t,i){switch(wc(i),i.tag){case 1:return bn(i.type)&&xa(),t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 3:return xs(),Nt(An),Nt(fn),Oc(),t=i.flags,(t&65536)!==0&&(t&128)===0?(i.flags=t&-65537|128,i):null;case 5:return Uc(i),null;case 13:if(Nt(zt),t=i.memoizedState,t!==null&&t.dehydrated!==null){if(i.alternate===null)throw Error(n(340));ms()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 19:return Nt(zt),null;case 4:return xs(),null;case 10:return Pc(i.type._context),null;case 22:case 23:return mu(),null;case 24:return null;default:return null}}var za=!1,pn=!1,t_=typeof WeakSet=="function"?WeakSet:Set,Ge=null;function Ss(t,i){var o=t.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(c){Vt(t,i,c)}else o.current=null}function iu(t,i,o){try{o()}catch(c){Vt(t,i,c)}}var Ph=!1;function n_(t,i){if(mc=sa,t=ld(),ac(t)){if("selectionStart"in t)var o={start:t.selectionStart,end:t.selectionEnd};else e:{o=(o=t.ownerDocument)&&o.defaultView||window;var c=o.getSelection&&o.getSelection();if(c&&c.rangeCount!==0){o=c.anchorNode;var d=c.anchorOffset,p=c.focusNode;c=c.focusOffset;try{o.nodeType,p.nodeType}catch{o=null;break e}var w=0,I=-1,H=-1,le=0,xe=0,Se=t,ve=null;t:for(;;){for(var ke;Se!==o||d!==0&&Se.nodeType!==3||(I=w+d),Se!==p||c!==0&&Se.nodeType!==3||(H=w+c),Se.nodeType===3&&(w+=Se.nodeValue.length),(ke=Se.firstChild)!==null;)ve=Se,Se=ke;for(;;){if(Se===t)break t;if(ve===o&&++le===d&&(I=w),ve===p&&++xe===c&&(H=w),(ke=Se.nextSibling)!==null)break;Se=ve,ve=Se.parentNode}Se=ke}o=I===-1||H===-1?null:{start:I,end:H}}else o=null}o=o||{start:0,end:0}}else o=null;for(gc={focusedElem:t,selectionRange:o},sa=!1,Ge=i;Ge!==null;)if(i=Ge,t=i.child,(i.subtreeFlags&1028)!==0&&t!==null)t.return=i,Ge=t;else for(;Ge!==null;){i=Ge;try{var Xe=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(Xe!==null){var $e=Xe.memoizedProps,jt=Xe.memoizedState,J=i.stateNode,q=J.getSnapshotBeforeUpdate(i.elementType===i.type?$e:ri(i.type,$e),jt);J.__reactInternalSnapshotBeforeUpdate=q}break;case 3:var se=i.stateNode.containerInfo;se.nodeType===1?se.textContent="":se.nodeType===9&&se.documentElement&&se.removeChild(se.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(n(163))}}catch(Ee){Vt(i,i.return,Ee)}if(t=i.sibling,t!==null){t.return=i.return,Ge=t;break}Ge=i.return}return Xe=Ph,Ph=!1,Xe}function Ro(t,i,o){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var d=c=c.next;do{if((d.tag&t)===t){var p=d.destroy;d.destroy=void 0,p!==void 0&&iu(i,o,p)}d=d.next}while(d!==c)}}function Ba(t,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&t)===t){var c=o.create;o.destroy=c()}o=o.next}while(o!==i)}}function ru(t){var i=t.ref;if(i!==null){var o=t.stateNode;switch(t.tag){case 5:t=o;break;default:t=o}typeof i=="function"?i(t):i.current=t}}function Lh(t){var i=t.alternate;i!==null&&(t.alternate=null,Lh(i)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(i=t.stateNode,i!==null&&(delete i[gi],delete i[_o],delete i[yc],delete i[kv],delete i[zv])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Nh(t){return t.tag===5||t.tag===3||t.tag===4}function Dh(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Nh(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function su(t,i,o){var c=t.tag;if(c===5||c===6)t=t.stateNode,i?o.nodeType===8?o.parentNode.insertBefore(t,i):o.insertBefore(t,i):(o.nodeType===8?(i=o.parentNode,i.insertBefore(t,o)):(i=o,i.appendChild(t)),o=o._reactRootContainer,o!=null||i.onclick!==null||(i.onclick=va));else if(c!==4&&(t=t.child,t!==null))for(su(t,i,o),t=t.sibling;t!==null;)su(t,i,o),t=t.sibling}function ou(t,i,o){var c=t.tag;if(c===5||c===6)t=t.stateNode,i?o.insertBefore(t,i):o.appendChild(t);else if(c!==4&&(t=t.child,t!==null))for(ou(t,i,o),t=t.sibling;t!==null;)ou(t,i,o),t=t.sibling}var on=null,si=!1;function sr(t,i,o){for(o=o.child;o!==null;)Ih(t,i,o),o=o.sibling}function Ih(t,i,o){if(vt&&typeof vt.onCommitFiberUnmount=="function")try{vt.onCommitFiberUnmount(wn,o)}catch{}switch(o.tag){case 5:pn||Ss(o,i);case 6:var c=on,d=si;on=null,sr(t,i,o),on=c,si=d,on!==null&&(si?(t=on,o=o.stateNode,t.nodeType===8?t.parentNode.removeChild(o):t.removeChild(o)):on.removeChild(o.stateNode));break;case 18:on!==null&&(si?(t=on,o=o.stateNode,t.nodeType===8?xc(t.parentNode,o):t.nodeType===1&&xc(t,o),oo(t)):xc(on,o.stateNode));break;case 4:c=on,d=si,on=o.stateNode.containerInfo,si=!0,sr(t,i,o),on=c,si=d;break;case 0:case 11:case 14:case 15:if(!pn&&(c=o.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){d=c=c.next;do{var p=d,w=p.destroy;p=p.tag,w!==void 0&&((p&2)!==0||(p&4)!==0)&&iu(o,i,w),d=d.next}while(d!==c)}sr(t,i,o);break;case 1:if(!pn&&(Ss(o,i),c=o.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=o.memoizedProps,c.state=o.memoizedState,c.componentWillUnmount()}catch(I){Vt(o,i,I)}sr(t,i,o);break;case 21:sr(t,i,o);break;case 22:o.mode&1?(pn=(c=pn)||o.memoizedState!==null,sr(t,i,o),pn=c):sr(t,i,o);break;default:sr(t,i,o)}}function Uh(t){var i=t.updateQueue;if(i!==null){t.updateQueue=null;var o=t.stateNode;o===null&&(o=t.stateNode=new t_),i.forEach(function(c){var d=f_.bind(null,t,c);o.has(c)||(o.add(c),c.then(d,d))})}}function oi(t,i){var o=i.deletions;if(o!==null)for(var c=0;c<o.length;c++){var d=o[c];try{var p=t,w=i,I=w;e:for(;I!==null;){switch(I.tag){case 5:on=I.stateNode,si=!1;break e;case 3:on=I.stateNode.containerInfo,si=!0;break e;case 4:on=I.stateNode.containerInfo,si=!0;break e}I=I.return}if(on===null)throw Error(n(160));Ih(p,w,d),on=null,si=!1;var H=d.alternate;H!==null&&(H.return=null),d.return=null}catch(le){Vt(d,i,le)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)Fh(i,t),i=i.sibling}function Fh(t,i){var o=t.alternate,c=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(oi(i,t),xi(t),c&4){try{Ro(3,t,t.return),Ba(3,t)}catch($e){Vt(t,t.return,$e)}try{Ro(5,t,t.return)}catch($e){Vt(t,t.return,$e)}}break;case 1:oi(i,t),xi(t),c&512&&o!==null&&Ss(o,o.return);break;case 5:if(oi(i,t),xi(t),c&512&&o!==null&&Ss(o,o.return),t.flags&32){var d=t.stateNode;try{K(d,"")}catch($e){Vt(t,t.return,$e)}}if(c&4&&(d=t.stateNode,d!=null)){var p=t.memoizedProps,w=o!==null?o.memoizedProps:p,I=t.type,H=t.updateQueue;if(t.updateQueue=null,H!==null)try{I==="input"&&p.type==="radio"&&p.name!=null&&We(d,p),gt(I,w);var le=gt(I,p);for(w=0;w<H.length;w+=2){var xe=H[w],Se=H[w+1];xe==="style"?qe(d,Se):xe==="dangerouslySetInnerHTML"?ue(d,Se):xe==="children"?K(d,Se):b(d,xe,Se,le)}switch(I){case"input":xt(d,p);break;case"textarea":ge(d,p);break;case"select":var ve=d._wrapperState.wasMultiple;d._wrapperState.wasMultiple=!!p.multiple;var ke=p.value;ke!=null?oe(d,!!p.multiple,ke,!1):ve!==!!p.multiple&&(p.defaultValue!=null?oe(d,!!p.multiple,p.defaultValue,!0):oe(d,!!p.multiple,p.multiple?[]:"",!1))}d[_o]=p}catch($e){Vt(t,t.return,$e)}}break;case 6:if(oi(i,t),xi(t),c&4){if(t.stateNode===null)throw Error(n(162));d=t.stateNode,p=t.memoizedProps;try{d.nodeValue=p}catch($e){Vt(t,t.return,$e)}}break;case 3:if(oi(i,t),xi(t),c&4&&o!==null&&o.memoizedState.isDehydrated)try{oo(i.containerInfo)}catch($e){Vt(t,t.return,$e)}break;case 4:oi(i,t),xi(t);break;case 13:oi(i,t),xi(t),d=t.child,d.flags&8192&&(p=d.memoizedState!==null,d.stateNode.isHidden=p,!p||d.alternate!==null&&d.alternate.memoizedState!==null||(cu=He())),c&4&&Uh(t);break;case 22:if(xe=o!==null&&o.memoizedState!==null,t.mode&1?(pn=(le=pn)||xe,oi(i,t),pn=le):oi(i,t),xi(t),c&8192){if(le=t.memoizedState!==null,(t.stateNode.isHidden=le)&&!xe&&(t.mode&1)!==0)for(Ge=t,xe=t.child;xe!==null;){for(Se=Ge=xe;Ge!==null;){switch(ve=Ge,ke=ve.child,ve.tag){case 0:case 11:case 14:case 15:Ro(4,ve,ve.return);break;case 1:Ss(ve,ve.return);var Xe=ve.stateNode;if(typeof Xe.componentWillUnmount=="function"){c=ve,o=ve.return;try{i=c,Xe.props=i.memoizedProps,Xe.state=i.memoizedState,Xe.componentWillUnmount()}catch($e){Vt(c,o,$e)}}break;case 5:Ss(ve,ve.return);break;case 22:if(ve.memoizedState!==null){zh(Se);continue}}ke!==null?(ke.return=ve,Ge=ke):zh(Se)}xe=xe.sibling}e:for(xe=null,Se=t;;){if(Se.tag===5){if(xe===null){xe=Se;try{d=Se.stateNode,le?(p=d.style,typeof p.setProperty=="function"?p.setProperty("display","none","important"):p.display="none"):(I=Se.stateNode,H=Se.memoizedProps.style,w=H!=null&&H.hasOwnProperty("display")?H.display:null,I.style.display=Qe("display",w))}catch($e){Vt(t,t.return,$e)}}}else if(Se.tag===6){if(xe===null)try{Se.stateNode.nodeValue=le?"":Se.memoizedProps}catch($e){Vt(t,t.return,$e)}}else if((Se.tag!==22&&Se.tag!==23||Se.memoizedState===null||Se===t)&&Se.child!==null){Se.child.return=Se,Se=Se.child;continue}if(Se===t)break e;for(;Se.sibling===null;){if(Se.return===null||Se.return===t)break e;xe===Se&&(xe=null),Se=Se.return}xe===Se&&(xe=null),Se.sibling.return=Se.return,Se=Se.sibling}}break;case 19:oi(i,t),xi(t),c&4&&Uh(t);break;case 21:break;default:oi(i,t),xi(t)}}function xi(t){var i=t.flags;if(i&2){try{e:{for(var o=t.return;o!==null;){if(Nh(o)){var c=o;break e}o=o.return}throw Error(n(160))}switch(c.tag){case 5:var d=c.stateNode;c.flags&32&&(K(d,""),c.flags&=-33);var p=Dh(t);ou(t,p,d);break;case 3:case 4:var w=c.stateNode.containerInfo,I=Dh(t);su(t,I,w);break;default:throw Error(n(161))}}catch(H){Vt(t,t.return,H)}t.flags&=-3}i&4096&&(t.flags&=-4097)}function i_(t,i,o){Ge=t,Oh(t)}function Oh(t,i,o){for(var c=(t.mode&1)!==0;Ge!==null;){var d=Ge,p=d.child;if(d.tag===22&&c){var w=d.memoizedState!==null||za;if(!w){var I=d.alternate,H=I!==null&&I.memoizedState!==null||pn;I=za;var le=pn;if(za=w,(pn=H)&&!le)for(Ge=d;Ge!==null;)w=Ge,H=w.child,w.tag===22&&w.memoizedState!==null?Bh(d):H!==null?(H.return=w,Ge=H):Bh(d);for(;p!==null;)Ge=p,Oh(p),p=p.sibling;Ge=d,za=I,pn=le}kh(t)}else(d.subtreeFlags&8772)!==0&&p!==null?(p.return=d,Ge=p):kh(t)}}function kh(t){for(;Ge!==null;){var i=Ge;if((i.flags&8772)!==0){var o=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:pn||Ba(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!pn)if(o===null)c.componentDidMount();else{var d=i.elementType===i.type?o.memoizedProps:ri(i.type,o.memoizedProps);c.componentDidUpdate(d,o.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var p=i.updateQueue;p!==null&&zd(i,p,c);break;case 3:var w=i.updateQueue;if(w!==null){if(o=null,i.child!==null)switch(i.child.tag){case 5:o=i.child.stateNode;break;case 1:o=i.child.stateNode}zd(i,w,o)}break;case 5:var I=i.stateNode;if(o===null&&i.flags&4){o=I;var H=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":H.autoFocus&&o.focus();break;case"img":H.src&&(o.src=H.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var le=i.alternate;if(le!==null){var xe=le.memoizedState;if(xe!==null){var Se=xe.dehydrated;Se!==null&&oo(Se)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(n(163))}pn||i.flags&512&&ru(i)}catch(ve){Vt(i,i.return,ve)}}if(i===t){Ge=null;break}if(o=i.sibling,o!==null){o.return=i.return,Ge=o;break}Ge=i.return}}function zh(t){for(;Ge!==null;){var i=Ge;if(i===t){Ge=null;break}var o=i.sibling;if(o!==null){o.return=i.return,Ge=o;break}Ge=i.return}}function Bh(t){for(;Ge!==null;){var i=Ge;try{switch(i.tag){case 0:case 11:case 15:var o=i.return;try{Ba(4,i)}catch(H){Vt(i,o,H)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var d=i.return;try{c.componentDidMount()}catch(H){Vt(i,d,H)}}var p=i.return;try{ru(i)}catch(H){Vt(i,p,H)}break;case 5:var w=i.return;try{ru(i)}catch(H){Vt(i,w,H)}}}catch(H){Vt(i,i.return,H)}if(i===t){Ge=null;break}var I=i.sibling;if(I!==null){I.return=i.return,Ge=I;break}Ge=i.return}}var r_=Math.ceil,Ha=D.ReactCurrentDispatcher,au=D.ReactCurrentOwner,qn=D.ReactCurrentBatchConfig,_t=0,nn=null,Xt=null,an=0,kn=0,Ms=er(0),Kt=0,Po=null,Fr=0,Ga=0,lu=0,Lo=null,Rn=null,cu=0,Es=1/0,Di=null,Va=!1,uu=null,or=null,Wa=!1,ar=null,ja=0,No=0,fu=null,Xa=-1,qa=0;function yn(){return(_t&6)!==0?He():Xa!==-1?Xa:Xa=He()}function lr(t){return(t.mode&1)===0?1:(_t&2)!==0&&an!==0?an&-an:Hv.transition!==null?(qa===0&&(qa=na()),qa):(t=Tt,t!==0||(t=window.event,t=t===void 0?16:Gf(t.type)),t)}function ai(t,i,o,c){if(50<No)throw No=0,fu=null,Error(n(185));to(t,o,c),((_t&2)===0||t!==nn)&&(t===nn&&((_t&2)===0&&(Ga|=o),Kt===4&&cr(t,an)),Pn(t,c),o===1&&_t===0&&(i.mode&1)===0&&(Es=He()+500,Sa&&nr()))}function Pn(t,i){var o=t.callbackNode;Tn(t,i);var c=Gn(t,t===nn?an:0);if(c===0)o!==null&&Oe(o),t.callbackNode=null,t.callbackPriority=0;else if(i=c&-c,t.callbackPriority!==i){if(o!=null&&Oe(o),i===1)t.tag===0?Bv(Gh.bind(null,t)):bd(Gh.bind(null,t)),Fv(function(){(_t&6)===0&&nr()}),o=null;else{switch(If(c)){case 1:o=at;break;case 4:o=lt;break;case 16:o=Rt;break;case 536870912:o=Wt;break;default:o=Rt}o=Kh(o,Hh.bind(null,t))}t.callbackPriority=i,t.callbackNode=o}}function Hh(t,i){if(Xa=-1,qa=0,(_t&6)!==0)throw Error(n(327));var o=t.callbackNode;if(ws()&&t.callbackNode!==o)return null;var c=Gn(t,t===nn?an:0);if(c===0)return null;if((c&30)!==0||(c&t.expiredLanes)!==0||i)i=$a(t,c);else{i=c;var d=_t;_t|=2;var p=Wh();(nn!==t||an!==i)&&(Di=null,Es=He()+500,kr(t,i));do try{a_();break}catch(I){Vh(t,I)}while(!0);Rc(),Ha.current=p,_t=d,Xt!==null?i=0:(nn=null,an=0,i=Kt)}if(i!==0){if(i===2&&(d=Cr(t),d!==0&&(c=d,i=du(t,d))),i===1)throw o=Po,kr(t,0),cr(t,c),Pn(t,He()),o;if(i===6)cr(t,c);else{if(d=t.current.alternate,(c&30)===0&&!s_(d)&&(i=$a(t,c),i===2&&(p=Cr(t),p!==0&&(c=p,i=du(t,p))),i===1))throw o=Po,kr(t,0),cr(t,c),Pn(t,He()),o;switch(t.finishedWork=d,t.finishedLanes=c,i){case 0:case 1:throw Error(n(345));case 2:zr(t,Rn,Di);break;case 3:if(cr(t,c),(c&130023424)===c&&(i=cu+500-He(),10<i)){if(Gn(t,0)!==0)break;if(d=t.suspendedLanes,(d&c)!==c){yn(),t.pingedLanes|=t.suspendedLanes&d;break}t.timeoutHandle=_c(zr.bind(null,t,Rn,Di),i);break}zr(t,Rn,Di);break;case 4:if(cr(t,c),(c&4194240)===c)break;for(i=t.eventTimes,d=-1;0<c;){var w=31-_n(c);p=1<<w,w=i[w],w>d&&(d=w),c&=~p}if(c=d,c=He()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*r_(c/1960))-c,10<c){t.timeoutHandle=_c(zr.bind(null,t,Rn,Di),c);break}zr(t,Rn,Di);break;case 5:zr(t,Rn,Di);break;default:throw Error(n(329))}}}return Pn(t,He()),t.callbackNode===o?Hh.bind(null,t):null}function du(t,i){var o=Lo;return t.current.memoizedState.isDehydrated&&(kr(t,i).flags|=256),t=$a(t,i),t!==2&&(i=Rn,Rn=o,i!==null&&hu(i)),t}function hu(t){Rn===null?Rn=t:Rn.push.apply(Rn,t)}function s_(t){for(var i=t;;){if(i.flags&16384){var o=i.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var c=0;c<o.length;c++){var d=o[c],p=d.getSnapshot;d=d.value;try{if(!ni(p(),d))return!1}catch{return!1}}}if(o=i.child,i.subtreeFlags&16384&&o!==null)o.return=i,i=o;else{if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function cr(t,i){for(i&=~lu,i&=~Ga,t.suspendedLanes|=i,t.pingedLanes&=~i,t=t.expirationTimes;0<i;){var o=31-_n(i),c=1<<o;t[o]=-1,i&=~c}}function Gh(t){if((_t&6)!==0)throw Error(n(327));ws();var i=Gn(t,0);if((i&1)===0)return Pn(t,He()),null;var o=$a(t,i);if(t.tag!==0&&o===2){var c=Cr(t);c!==0&&(i=c,o=du(t,c))}if(o===1)throw o=Po,kr(t,0),cr(t,i),Pn(t,He()),o;if(o===6)throw Error(n(345));return t.finishedWork=t.current.alternate,t.finishedLanes=i,zr(t,Rn,Di),Pn(t,He()),null}function pu(t,i){var o=_t;_t|=1;try{return t(i)}finally{_t=o,_t===0&&(Es=He()+500,Sa&&nr())}}function Or(t){ar!==null&&ar.tag===0&&(_t&6)===0&&ws();var i=_t;_t|=1;var o=qn.transition,c=Tt;try{if(qn.transition=null,Tt=1,t)return t()}finally{Tt=c,qn.transition=o,_t=i,(_t&6)===0&&nr()}}function mu(){kn=Ms.current,Nt(Ms)}function kr(t,i){t.finishedWork=null,t.finishedLanes=0;var o=t.timeoutHandle;if(o!==-1&&(t.timeoutHandle=-1,Uv(o)),Xt!==null)for(o=Xt.return;o!==null;){var c=o;switch(wc(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&xa();break;case 3:xs(),Nt(An),Nt(fn),Oc();break;case 5:Uc(c);break;case 4:xs();break;case 13:Nt(zt);break;case 19:Nt(zt);break;case 10:Pc(c.type._context);break;case 22:case 23:mu()}o=o.return}if(nn=t,Xt=t=ur(t.current,null),an=kn=i,Kt=0,Po=null,lu=Ga=Fr=0,Rn=Lo=null,Dr!==null){for(i=0;i<Dr.length;i++)if(o=Dr[i],c=o.interleaved,c!==null){o.interleaved=null;var d=c.next,p=o.pending;if(p!==null){var w=p.next;p.next=d,c.next=w}o.pending=c}Dr=null}return t}function Vh(t,i){do{var o=Xt;try{if(Rc(),La.current=Ua,Na){for(var c=Bt.memoizedState;c!==null;){var d=c.queue;d!==null&&(d.pending=null),c=c.next}Na=!1}if(Ur=0,tn=Yt=Bt=null,wo=!1,To=0,au.current=null,o===null||o.return===null){Kt=1,Po=i,Xt=null;break}e:{var p=t,w=o.return,I=o,H=i;if(i=an,I.flags|=32768,H!==null&&typeof H=="object"&&typeof H.then=="function"){var le=H,xe=I,Se=xe.tag;if((xe.mode&1)===0&&(Se===0||Se===11||Se===15)){var ve=xe.alternate;ve?(xe.updateQueue=ve.updateQueue,xe.memoizedState=ve.memoizedState,xe.lanes=ve.lanes):(xe.updateQueue=null,xe.memoizedState=null)}var ke=ph(w);if(ke!==null){ke.flags&=-257,mh(ke,w,I,p,i),ke.mode&1&&hh(p,le,i),i=ke,H=le;var Xe=i.updateQueue;if(Xe===null){var $e=new Set;$e.add(H),i.updateQueue=$e}else Xe.add(H);break e}else{if((i&1)===0){hh(p,le,i),gu();break e}H=Error(n(426))}}else if(Ot&&I.mode&1){var jt=ph(w);if(jt!==null){(jt.flags&65536)===0&&(jt.flags|=256),mh(jt,w,I,p,i),bc(ys(H,I));break e}}p=H=ys(H,I),Kt!==4&&(Kt=2),Lo===null?Lo=[p]:Lo.push(p),p=w;do{switch(p.tag){case 3:p.flags|=65536,i&=-i,p.lanes|=i;var J=fh(p,H,i);kd(p,J);break e;case 1:I=H;var q=p.type,se=p.stateNode;if((p.flags&128)===0&&(typeof q.getDerivedStateFromError=="function"||se!==null&&typeof se.componentDidCatch=="function"&&(or===null||!or.has(se)))){p.flags|=65536,i&=-i,p.lanes|=i;var Ee=dh(p,I,i);kd(p,Ee);break e}}p=p.return}while(p!==null)}Xh(o)}catch(Ke){i=Ke,Xt===o&&o!==null&&(Xt=o=o.return);continue}break}while(!0)}function Wh(){var t=Ha.current;return Ha.current=Ua,t===null?Ua:t}function gu(){(Kt===0||Kt===3||Kt===2)&&(Kt=4),nn===null||(Fr&268435455)===0&&(Ga&268435455)===0||cr(nn,an)}function $a(t,i){var o=_t;_t|=2;var c=Wh();(nn!==t||an!==i)&&(Di=null,kr(t,i));do try{o_();break}catch(d){Vh(t,d)}while(!0);if(Rc(),_t=o,Ha.current=c,Xt!==null)throw Error(n(261));return nn=null,an=0,Kt}function o_(){for(;Xt!==null;)jh(Xt)}function a_(){for(;Xt!==null&&!Ze();)jh(Xt)}function jh(t){var i=Yh(t.alternate,t,kn);t.memoizedProps=t.pendingProps,i===null?Xh(t):Xt=i,au.current=null}function Xh(t){var i=t;do{var o=i.alternate;if(t=i.return,(i.flags&32768)===0){if(o=Jv(o,i,kn),o!==null){Xt=o;return}}else{if(o=e_(o,i),o!==null){o.flags&=32767,Xt=o;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Kt=6,Xt=null;return}}if(i=i.sibling,i!==null){Xt=i;return}Xt=i=t}while(i!==null);Kt===0&&(Kt=5)}function zr(t,i,o){var c=Tt,d=qn.transition;try{qn.transition=null,Tt=1,l_(t,i,o,c)}finally{qn.transition=d,Tt=c}return null}function l_(t,i,o,c){do ws();while(ar!==null);if((_t&6)!==0)throw Error(n(327));o=t.finishedWork;var d=t.finishedLanes;if(o===null)return null;if(t.finishedWork=null,t.finishedLanes=0,o===t.current)throw Error(n(177));t.callbackNode=null,t.callbackPriority=0;var p=o.lanes|o.childLanes;if(Gg(t,p),t===nn&&(Xt=nn=null,an=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||Wa||(Wa=!0,Kh(Rt,function(){return ws(),null})),p=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||p){p=qn.transition,qn.transition=null;var w=Tt;Tt=1;var I=_t;_t|=4,au.current=null,n_(t,o),Fh(o,t),Cv(gc),sa=!!mc,gc=mc=null,t.current=o,i_(o),rt(),_t=I,Tt=w,qn.transition=p}else t.current=o;if(Wa&&(Wa=!1,ar=t,ja=d),p=t.pendingLanes,p===0&&(or=null),dt(o.stateNode),Pn(t,He()),i!==null)for(c=t.onRecoverableError,o=0;o<i.length;o++)d=i[o],c(d.value,{componentStack:d.stack,digest:d.digest});if(Va)throw Va=!1,t=uu,uu=null,t;return(ja&1)!==0&&t.tag!==0&&ws(),p=t.pendingLanes,(p&1)!==0?t===fu?No++:(No=0,fu=t):No=0,nr(),null}function ws(){if(ar!==null){var t=If(ja),i=qn.transition,o=Tt;try{if(qn.transition=null,Tt=16>t?16:t,ar===null)var c=!1;else{if(t=ar,ar=null,ja=0,(_t&6)!==0)throw Error(n(331));var d=_t;for(_t|=4,Ge=t.current;Ge!==null;){var p=Ge,w=p.child;if((Ge.flags&16)!==0){var I=p.deletions;if(I!==null){for(var H=0;H<I.length;H++){var le=I[H];for(Ge=le;Ge!==null;){var xe=Ge;switch(xe.tag){case 0:case 11:case 15:Ro(8,xe,p)}var Se=xe.child;if(Se!==null)Se.return=xe,Ge=Se;else for(;Ge!==null;){xe=Ge;var ve=xe.sibling,ke=xe.return;if(Lh(xe),xe===le){Ge=null;break}if(ve!==null){ve.return=ke,Ge=ve;break}Ge=ke}}}var Xe=p.alternate;if(Xe!==null){var $e=Xe.child;if($e!==null){Xe.child=null;do{var jt=$e.sibling;$e.sibling=null,$e=jt}while($e!==null)}}Ge=p}}if((p.subtreeFlags&2064)!==0&&w!==null)w.return=p,Ge=w;else e:for(;Ge!==null;){if(p=Ge,(p.flags&2048)!==0)switch(p.tag){case 0:case 11:case 15:Ro(9,p,p.return)}var J=p.sibling;if(J!==null){J.return=p.return,Ge=J;break e}Ge=p.return}}var q=t.current;for(Ge=q;Ge!==null;){w=Ge;var se=w.child;if((w.subtreeFlags&2064)!==0&&se!==null)se.return=w,Ge=se;else e:for(w=q;Ge!==null;){if(I=Ge,(I.flags&2048)!==0)try{switch(I.tag){case 0:case 11:case 15:Ba(9,I)}}catch(Ke){Vt(I,I.return,Ke)}if(I===w){Ge=null;break e}var Ee=I.sibling;if(Ee!==null){Ee.return=I.return,Ge=Ee;break e}Ge=I.return}}if(_t=d,nr(),vt&&typeof vt.onPostCommitFiberRoot=="function")try{vt.onPostCommitFiberRoot(wn,t)}catch{}c=!0}return c}finally{Tt=o,qn.transition=i}}return!1}function qh(t,i,o){i=ys(o,i),i=fh(t,i,1),t=rr(t,i,1),i=yn(),t!==null&&(to(t,1,i),Pn(t,i))}function Vt(t,i,o){if(t.tag===3)qh(t,t,o);else for(;i!==null;){if(i.tag===3){qh(i,t,o);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(or===null||!or.has(c))){t=ys(o,t),t=dh(i,t,1),i=rr(i,t,1),t=yn(),i!==null&&(to(i,1,t),Pn(i,t));break}}i=i.return}}function c_(t,i,o){var c=t.pingCache;c!==null&&c.delete(i),i=yn(),t.pingedLanes|=t.suspendedLanes&o,nn===t&&(an&o)===o&&(Kt===4||Kt===3&&(an&130023424)===an&&500>He()-cu?kr(t,0):lu|=o),Pn(t,i)}function $h(t,i){i===0&&((t.mode&1)===0?i=1:(i=Xi,Xi<<=1,(Xi&130023424)===0&&(Xi=4194304)));var o=yn();t=Pi(t,i),t!==null&&(to(t,i,o),Pn(t,o))}function u_(t){var i=t.memoizedState,o=0;i!==null&&(o=i.retryLane),$h(t,o)}function f_(t,i){var o=0;switch(t.tag){case 13:var c=t.stateNode,d=t.memoizedState;d!==null&&(o=d.retryLane);break;case 19:c=t.stateNode;break;default:throw Error(n(314))}c!==null&&c.delete(i),$h(t,o)}var Yh;Yh=function(t,i,o){if(t!==null)if(t.memoizedProps!==i.pendingProps||An.current)Cn=!0;else{if((t.lanes&o)===0&&(i.flags&128)===0)return Cn=!1,Qv(t,i,o);Cn=(t.flags&131072)!==0}else Cn=!1,Ot&&(i.flags&1048576)!==0&&Cd(i,Ea,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;ka(t,i),t=i.pendingProps;var d=ds(i,fn.current);_s(i,o),d=Bc(null,i,c,t,d,o);var p=Hc();return i.flags|=1,typeof d=="object"&&d!==null&&typeof d.render=="function"&&d.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,bn(c)?(p=!0,ya(i)):p=!1,i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,Dc(i),d.updater=Fa,i.stateNode=d,d._reactInternals=i,qc(i,c,t,o),i=Zc(null,i,c,!0,p,o)):(i.tag=0,Ot&&p&&Ec(i),xn(null,i,d,o),i=i.child),i;case 16:c=i.elementType;e:{switch(ka(t,i),t=i.pendingProps,d=c._init,c=d(c._payload),i.type=c,d=i.tag=h_(c),t=ri(c,t),d){case 0:i=Kc(null,i,c,t,o);break e;case 1:i=Sh(null,i,c,t,o);break e;case 11:i=gh(null,i,c,t,o);break e;case 14:i=vh(null,i,c,ri(c.type,t),o);break e}throw Error(n(306,c,""))}return i;case 0:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ri(c,d),Kc(t,i,c,d,o);case 1:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ri(c,d),Sh(t,i,c,d,o);case 3:e:{if(Mh(i),t===null)throw Error(n(387));c=i.pendingProps,p=i.memoizedState,d=p.element,Od(t,i),Ra(i,c,null,o);var w=i.memoizedState;if(c=w.element,p.isDehydrated)if(p={element:c,isDehydrated:!1,cache:w.cache,pendingSuspenseBoundaries:w.pendingSuspenseBoundaries,transitions:w.transitions},i.updateQueue.baseState=p,i.memoizedState=p,i.flags&256){d=ys(Error(n(423)),i),i=Eh(t,i,c,o,d);break e}else if(c!==d){d=ys(Error(n(424)),i),i=Eh(t,i,c,o,d);break e}else for(On=Ji(i.stateNode.containerInfo.firstChild),Fn=i,Ot=!0,ii=null,o=Ud(i,null,c,o),i.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(ms(),c===d){i=Ni(t,i,o);break e}xn(t,i,c,o)}i=i.child}return i;case 5:return Bd(i),t===null&&Ac(i),c=i.type,d=i.pendingProps,p=t!==null?t.memoizedProps:null,w=d.children,vc(c,d)?w=null:p!==null&&vc(c,p)&&(i.flags|=32),yh(t,i),xn(t,i,w,o),i.child;case 6:return t===null&&Ac(i),null;case 13:return wh(t,i,o);case 4:return Ic(i,i.stateNode.containerInfo),c=i.pendingProps,t===null?i.child=gs(i,null,c,o):xn(t,i,c,o),i.child;case 11:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ri(c,d),gh(t,i,c,d,o);case 7:return xn(t,i,i.pendingProps,o),i.child;case 8:return xn(t,i,i.pendingProps.children,o),i.child;case 12:return xn(t,i,i.pendingProps.children,o),i.child;case 10:e:{if(c=i.type._context,d=i.pendingProps,p=i.memoizedProps,w=d.value,Pt(Aa,c._currentValue),c._currentValue=w,p!==null)if(ni(p.value,w)){if(p.children===d.children&&!An.current){i=Ni(t,i,o);break e}}else for(p=i.child,p!==null&&(p.return=i);p!==null;){var I=p.dependencies;if(I!==null){w=p.child;for(var H=I.firstContext;H!==null;){if(H.context===c){if(p.tag===1){H=Li(-1,o&-o),H.tag=2;var le=p.updateQueue;if(le!==null){le=le.shared;var xe=le.pending;xe===null?H.next=H:(H.next=xe.next,xe.next=H),le.pending=H}}p.lanes|=o,H=p.alternate,H!==null&&(H.lanes|=o),Lc(p.return,o,i),I.lanes|=o;break}H=H.next}}else if(p.tag===10)w=p.type===i.type?null:p.child;else if(p.tag===18){if(w=p.return,w===null)throw Error(n(341));w.lanes|=o,I=w.alternate,I!==null&&(I.lanes|=o),Lc(w,o,i),w=p.sibling}else w=p.child;if(w!==null)w.return=p;else for(w=p;w!==null;){if(w===i){w=null;break}if(p=w.sibling,p!==null){p.return=w.return,w=p;break}w=w.return}p=w}xn(t,i,d.children,o),i=i.child}return i;case 9:return d=i.type,c=i.pendingProps.children,_s(i,o),d=jn(d),c=c(d),i.flags|=1,xn(t,i,c,o),i.child;case 14:return c=i.type,d=ri(c,i.pendingProps),d=ri(c.type,d),vh(t,i,c,d,o);case 15:return _h(t,i,i.type,i.pendingProps,o);case 17:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ri(c,d),ka(t,i),i.tag=1,bn(c)?(t=!0,ya(i)):t=!1,_s(i,o),ch(i,c,d),qc(i,c,d,o),Zc(null,i,c,!0,t,o);case 19:return Ah(t,i,o);case 22:return xh(t,i,o)}throw Error(n(156,i.tag))};function Kh(t,i){return ce(t,i)}function d_(t,i,o,c){this.tag=t,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $n(t,i,o,c){return new d_(t,i,o,c)}function vu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function h_(t){if(typeof t=="function")return vu(t)?1:0;if(t!=null){if(t=t.$$typeof,t===ee)return 11;if(t===Y)return 14}return 2}function ur(t,i){var o=t.alternate;return o===null?(o=$n(t.tag,i,t.key,t.mode),o.elementType=t.elementType,o.type=t.type,o.stateNode=t.stateNode,o.alternate=t,t.alternate=o):(o.pendingProps=i,o.type=t.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=t.flags&14680064,o.childLanes=t.childLanes,o.lanes=t.lanes,o.child=t.child,o.memoizedProps=t.memoizedProps,o.memoizedState=t.memoizedState,o.updateQueue=t.updateQueue,i=t.dependencies,o.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},o.sibling=t.sibling,o.index=t.index,o.ref=t.ref,o}function Ya(t,i,o,c,d,p){var w=2;if(c=t,typeof t=="function")vu(t)&&(w=1);else if(typeof t=="string")w=5;else e:switch(t){case k:return Br(o.children,d,p,i);case he:w=8,d|=8;break;case C:return t=$n(12,o,i,d|2),t.elementType=C,t.lanes=p,t;case W:return t=$n(13,o,i,d),t.elementType=W,t.lanes=p,t;case F:return t=$n(19,o,i,d),t.elementType=F,t.lanes=p,t;case ie:return Ka(o,d,p,i);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case A:w=10;break e;case re:w=9;break e;case ee:w=11;break e;case Y:w=14;break e;case Q:w=16,c=null;break e}throw Error(n(130,t==null?t:typeof t,""))}return i=$n(w,o,i,d),i.elementType=t,i.type=c,i.lanes=p,i}function Br(t,i,o,c){return t=$n(7,t,c,i),t.lanes=o,t}function Ka(t,i,o,c){return t=$n(22,t,c,i),t.elementType=ie,t.lanes=o,t.stateNode={isHidden:!1},t}function _u(t,i,o){return t=$n(6,t,null,i),t.lanes=o,t}function xu(t,i,o){return i=$n(4,t.children!==null?t.children:[],t.key,i),i.lanes=o,i.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},i}function p_(t,i,o,c,d){this.tag=i,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ns(0),this.expirationTimes=ns(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ns(0),this.identifierPrefix=c,this.onRecoverableError=d,this.mutableSourceEagerHydrationData=null}function yu(t,i,o,c,d,p,w,I,H){return t=new p_(t,i,o,I,H),i===1?(i=1,p===!0&&(i|=8)):i=0,p=$n(3,null,null,i),t.current=p,p.stateNode=t,p.memoizedState={element:c,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},Dc(p),t}function m_(t,i,o){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:O,key:c==null?null:""+c,children:t,containerInfo:i,implementation:o}}function Zh(t){if(!t)return tr;t=t._reactInternals;e:{if(wi(t)!==t||t.tag!==1)throw Error(n(170));var i=t;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(bn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(n(171))}if(t.tag===1){var o=t.type;if(bn(o))return Td(t,o,i)}return i}function Qh(t,i,o,c,d,p,w,I,H){return t=yu(o,c,!0,t,d,p,w,I,H),t.context=Zh(null),o=t.current,c=yn(),d=lr(o),p=Li(c,d),p.callback=i??null,rr(o,p,d),t.current.lanes=d,to(t,d,c),Pn(t,c),t}function Za(t,i,o,c){var d=i.current,p=yn(),w=lr(d);return o=Zh(o),i.context===null?i.context=o:i.pendingContext=o,i=Li(p,w),i.payload={element:t},c=c===void 0?null:c,c!==null&&(i.callback=c),t=rr(d,i,w),t!==null&&(ai(t,d,w,p),Ca(t,d,w)),w}function Qa(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Jh(t,i){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var o=t.retryLane;t.retryLane=o!==0&&o<i?o:i}}function Su(t,i){Jh(t,i),(t=t.alternate)&&Jh(t,i)}function g_(){return null}var ep=typeof reportError=="function"?reportError:function(t){console.error(t)};function Mu(t){this._internalRoot=t}Ja.prototype.render=Mu.prototype.render=function(t){var i=this._internalRoot;if(i===null)throw Error(n(409));Za(t,i,null,null)},Ja.prototype.unmount=Mu.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var i=t.containerInfo;Or(function(){Za(null,t,null,null)}),i[Ai]=null}};function Ja(t){this._internalRoot=t}Ja.prototype.unstable_scheduleHydration=function(t){if(t){var i=Of();t={blockedOn:null,target:t,priority:i};for(var o=0;o<Ki.length&&i!==0&&i<Ki[o].priority;o++);Ki.splice(o,0,t),o===0&&Bf(t)}};function Eu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function el(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function tp(){}function v_(t,i,o,c,d){if(d){if(typeof c=="function"){var p=c;c=function(){var le=Qa(w);p.call(le)}}var w=Qh(i,c,t,0,null,!1,!1,"",tp);return t._reactRootContainer=w,t[Ai]=w.current,go(t.nodeType===8?t.parentNode:t),Or(),w}for(;d=t.lastChild;)t.removeChild(d);if(typeof c=="function"){var I=c;c=function(){var le=Qa(H);I.call(le)}}var H=yu(t,0,!1,null,null,!1,!1,"",tp);return t._reactRootContainer=H,t[Ai]=H.current,go(t.nodeType===8?t.parentNode:t),Or(function(){Za(i,H,o,c)}),H}function tl(t,i,o,c,d){var p=o._reactRootContainer;if(p){var w=p;if(typeof d=="function"){var I=d;d=function(){var H=Qa(w);I.call(H)}}Za(i,w,t,d)}else w=v_(o,i,t,d,c);return Qa(w)}Uf=function(t){switch(t.tag){case 3:var i=t.stateNode;if(i.current.memoizedState.isDehydrated){var o=Gt(i.pendingLanes);o!==0&&(ql(i,o|1),Pn(i,He()),(_t&6)===0&&(Es=He()+500,nr()))}break;case 13:Or(function(){var c=Pi(t,1);if(c!==null){var d=yn();ai(c,t,1,d)}}),Su(t,1)}},$l=function(t){if(t.tag===13){var i=Pi(t,134217728);if(i!==null){var o=yn();ai(i,t,134217728,o)}Su(t,134217728)}},Ff=function(t){if(t.tag===13){var i=lr(t),o=Pi(t,i);if(o!==null){var c=yn();ai(o,t,i,c)}Su(t,i)}},Of=function(){return Tt},kf=function(t,i){var o=Tt;try{return Tt=t,i()}finally{Tt=o}},be=function(t,i,o){switch(i){case"input":if(xt(t,o),i=o.name,o.type==="radio"&&i!=null){for(o=t;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<o.length;i++){var c=o[i];if(c!==t&&c.form===t.form){var d=_a(c);if(!d)throw Error(n(90));ne(c),xt(c,d)}}}break;case"textarea":ge(t,o);break;case"select":i=o.value,i!=null&&oe(t,!!o.multiple,i,!1)}},Et=pu,wt=Or;var __={usingClientEntryPoint:!1,Events:[xo,us,_a,st,et,pu]},Do={findFiberByHostInstance:Rr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},x_={bundleType:Do.bundleType,version:Do.version,rendererPackageName:Do.rendererPackageName,rendererConfig:Do.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:D.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=fe(t),t===null?null:t.stateNode},findFiberByHostInstance:Do.findFiberByHostInstance||g_,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var nl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!nl.isDisabled&&nl.supportsFiber)try{wn=nl.inject(x_),vt=nl}catch{}}return Ln.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=__,Ln.createPortal=function(t,i){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Eu(i))throw Error(n(200));return m_(t,i,null,o)},Ln.createRoot=function(t,i){if(!Eu(t))throw Error(n(299));var o=!1,c="",d=ep;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(d=i.onRecoverableError)),i=yu(t,1,!1,null,null,o,!1,c,d),t[Ai]=i.current,go(t.nodeType===8?t.parentNode:t),new Mu(i)},Ln.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var i=t._reactInternals;if(i===void 0)throw typeof t.render=="function"?Error(n(188)):(t=Object.keys(t).join(","),Error(n(268,t)));return t=fe(i),t=t===null?null:t.stateNode,t},Ln.flushSync=function(t){return Or(t)},Ln.hydrate=function(t,i,o){if(!el(i))throw Error(n(200));return tl(null,t,i,!0,o)},Ln.hydrateRoot=function(t,i,o){if(!Eu(t))throw Error(n(405));var c=o!=null&&o.hydratedSources||null,d=!1,p="",w=ep;if(o!=null&&(o.unstable_strictMode===!0&&(d=!0),o.identifierPrefix!==void 0&&(p=o.identifierPrefix),o.onRecoverableError!==void 0&&(w=o.onRecoverableError)),i=Qh(i,null,t,1,o??null,d,!1,p,w),t[Ai]=i.current,go(t),c)for(t=0;t<c.length;t++)o=c[t],d=o._getVersion,d=d(o._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[o,d]:i.mutableSourceEagerHydrationData.push(o,d);return new Ja(i)},Ln.render=function(t,i,o){if(!el(i))throw Error(n(200));return tl(null,t,i,!1,o)},Ln.unmountComponentAtNode=function(t){if(!el(t))throw Error(n(40));return t._reactRootContainer?(Or(function(){tl(null,null,t,!1,function(){t._reactRootContainer=null,t[Ai]=null})}),!0):!1},Ln.unstable_batchedUpdates=pu,Ln.unstable_renderSubtreeIntoContainer=function(t,i,o,c){if(!el(o))throw Error(n(200));if(t==null||t._reactInternals===void 0)throw Error(n(38));return tl(t,i,o,!1,c)},Ln.version="18.3.1-next-f1338f8080-20240426",Ln}var cp;function C_(){if(cp)return Au.exports;cp=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Au.exports=b_(),Au.exports}var up;function R_(){if(up)return il;up=1;var r=C_();return il.createRoot=r.createRoot,il.hydrateRoot=r.hydrateRoot,il}var P_=R_();const L_=Qm(P_);function Nl(r){if(!r)return"";let e=r.replace(/\/+$/,"");e=e.replace(/\\/g,"/");const n=e.lastIndexOf("/");return n===-1?e:e.slice(n+1)}function N_(r){if(!r)return".";let e=r.replace(/\\/g,"/");e=e.replace(/\/+$/,"");const n=e.lastIndexOf("/");return n===-1?".":n===0?"/":e.slice(0,n)}function D_(r){const e=Nl(r),n=e.lastIndexOf(".");return n<=0?"":e.slice(n)}function fp(r){const e=r.length,n=r.filter(s=>s.status==="passed").length;return{passed:n,total:e,text:`${n}/${e}`}}function I_(r){if(r.cwd){const s=Nl(r.cwd);if(s)return s}const e=N_(r.workflowPath),n=Nl(e);return n||Nl(r.workflowPath)}function dp(r){return r.title?r.title:r.workflowId}function hp(r){switch(r){case"running":return{symbol:"●",color:"#0080FF",label:"running"};case"paused":return{symbol:"◐",color:"#FFCC00",label:"paused"};case"done":return{symbol:"✔",color:"#00CC00",label:"done"};case"aborted":return{symbol:"✘",color:"#FF4444",label:"aborted"};default:return{symbol:"?",color:"#888888",label:r}}}function U_(r){return r==="skipped"}function F_(r,e){const n=e!=null&&r.stepKey===e,s=U_(r.status);let a;switch(r.status){case"passed":a="#00CC00";break;case"running":a="#0080FF";break;case"failed":a="#FF4444";break;case"skipped":a="#888888";break;case"pending":default:a="#666666";break}return s?a="#999999":n&&(a="#FFCC00"),{borderColor:a,isCurrent:n,isSkipped:s}}const O_=[".md",".txt",".json",".yaml",".yml",".toml",".ts",".js",".tsx",".jsx",".sql",".css",".html"],k_=new Set(O_);function z_(r,e){const n=D_(r).toLowerCase();if(!k_.has(n))return`unsupported extension: ${n||"(none)"}`}function Ru(r){return`プレビュー非対応: ${r}`}function B_(r,e){return`${r.artifactKey}: ${r.filePath} (${e?"存在✓":"欠損✗"})`}const Ii=10;function pp(r,e,n){const s=[];for(const a of r){const l=a.startedAt??a.endedAt??"",f=n==null?void 0:n.get(a.stepId);s.push({kind:"attempt",timestamp:l,attempt:a,stepKey:f})}for(const a of e){const l=a.createdAt??"",f={id:a.id,stepKey:a.stepKey,event:a.event,answersJson:a.answersJson??null,createdAt:a.createdAt};s.push({kind:"gate_event",timestamp:l,gateEvent:f})}return s.sort((a,l)=>{if(a.timestamp!==l.timestamp)return a.timestamp<l.timestamp?-1:1;const f=a.kind==="attempt"?a.attempt.id??0:a.gateEvent.id??0,u=l.kind==="attempt"?l.attempt.id??0:l.gateEvent.id??0;return f-u}),s.reverse(),s.slice(0,20)}function H_(r){if(!r)return"-";try{const e=JSON.parse(r);if(!e||typeof e!="object"||Array.isArray(e))return String(r);const n=e,s=[];for(const[a,l]of Object.entries(n))if(typeof l=="string")s.push(`${a}: ${l}`);else if(l&&typeof l=="object"&&"value"in l){const f=l;f.input!=null&&f.input!==""?s.push(`${a}: ${f.value} (${f.input})`):s.push(`${a}: ${f.value}`)}else s.push(`${a}: ${JSON.stringify(l)}`);return s.length>0?s.join(", "):"-"}catch{return String(r)}}function G_(r){if(r.kind==="attempt"){const s=r.attempt,a=r.stepKey??String(s.stepId),l=s.checkStatus??"-";return`${r.timestamp} [attempt] ${a} #${s.attemptNumber} check:${l}`}const e=r.gateEvent,n=H_(e.answersJson??null);return`${r.timestamp} [gate] ${e.stepKey} ${e.event} answers:${n==="-"?"-":" "+n}`}function V_(r,e){const n=new Map;for(const l of e)n.set(l.id,l);const s=new Set;let a=r.parentStepId;for(;a!=null;){if(s.has(a))return null;s.add(a);const l=n.get(a);if(!l)return null;if(l.type==="loop")return{key:l.stepKey,iteration:l.loopIteration,maxIterations:l.maxIterations};a=l.parentStepId}return null}function mp(r,e){return e==null?`iteration ${r}`:`iteration ${r}/${e}`}const gp=180,Pu=72,vp=56,W_=16,_p=24,Lu=24;function j_(r){var S;if(r.length===0)return{nodes:[],edges:[],width:0,height:0};const e=[],n=new Map;for(const M of r){const E=M.phase??"__none__";n.has(E)||(n.set(E,e.length),e.push(E))}const s=new Map;for(const M of r){const E=M.phase??"__none__",_=s.get(E);_?_.push(M):s.set(E,[M])}const a=[];for(const M of r){const E=M.phase??"__none__",_=n.get(E),g=s.get(E),L=g.findIndex(O=>O.key===M.key&&O.index===M.index),b=g.length,D=_p+_*(gp+vp),X=Lu+L*(Pu+W_);a.push({key:M.key,phase:M.phase,type:M.type,index:M.index,phaseIndex:_,withinPhaseIndex:L>=0?L:0,phaseSize:b,x:D,y:X,parentKey:M.parentKey??null})}const l=[],f=[];for(const M of r){const E=f.length>0?f[f.length-1]:void 0;E&&E.phase===M.phase?E.steps.push(M):f.push({phase:M.phase,steps:[M]})}for(let M=0;M<f.length;M++){const E=f[M],_=f[M+1];if(_){if(E.steps.length===1&&_.steps.length===1)l.push({from:E.steps[0].key,to:_.steps[0].key});else if(E.steps.length===1&&_.steps.length>1)for(const g of _.steps)l.push({from:E.steps[0].key,to:g.key});else if(E.steps.length>1&&_.steps.length===1)for(const g of E.steps)l.push({from:g.key,to:_.steps[0].key});else for(const g of E.steps){for(const L of _.steps)if(l.push({from:g.key,to:L.key}),l.length>60)break;if(l.length>60)break}if(l.length>60)break}}if(l.length===0&&r.length>1)for(let M=0;M<r.length-1;M++)l.push({from:r[M].key,to:r[M+1].key});const u=new Map;for(const M of r)u.set(M.key,M);for(const M of r){if(M.type!=="loop")continue;let E;for(const _ of r){if(_.key===M.key)continue;let g=_.parentKey??null;const L=new Set;for(;g!=null&&!L.has(g);){if(g===M.key){E=_;break}L.add(g),g=((S=u.get(g))==null?void 0:S.parentKey)??null}}E&&l.push({from:E.key,to:M.key,kind:"loop-back"})}const h=Math.max(...a.map(M=>M.phaseIndex)),m=new Map;for(const M of a){const E=m.get(M.phaseIndex)??0;m.set(M.phaseIndex,Math.max(E,M.y+Pu))}const v=Math.max(...Array.from(m.values()),Lu+Pu),y=_p*2+(h+1)*gp+h*vp,x=v+Lu;return{nodes:a,edges:l,width:y,height:x}}function Jm(r){var e,n,s="";if(typeof r=="string"||typeof r=="number")s+=r;else if(typeof r=="object")if(Array.isArray(r)){var a=r.length;for(e=0;e<a;e++)r[e]&&(n=Jm(r[e]))&&(s&&(s+=" "),s+=n)}else for(n in r)r[n]&&(s&&(s+=" "),s+=n);return s}function eg(){for(var r,e,n=0,s="",a=arguments.length;n<a;n++)(r=arguments[n])&&(e=Jm(r))&&(s&&(s+=" "),s+=e);return s}const Af="-",X_=r=>{const e=$_(r),{conflictingClassGroups:n,conflictingClassGroupModifiers:s}=r;return{getClassGroupId:f=>{const u=f.split(Af);return u[0]===""&&u.length!==1&&u.shift(),tg(u,e)||q_(f)},getConflictingClassGroupIds:(f,u)=>{const h=n[f]||[];return u&&s[f]?[...h,...s[f]]:h}}},tg=(r,e)=>{var f;if(r.length===0)return e.classGroupId;const n=r[0],s=e.nextPart.get(n),a=s?tg(r.slice(1),s):void 0;if(a)return a;if(e.validators.length===0)return;const l=r.join(Af);return(f=e.validators.find(({validator:u})=>u(l)))==null?void 0:f.classGroupId},xp=/^\[(.+)\]$/,q_=r=>{if(xp.test(r)){const e=xp.exec(r)[1],n=e==null?void 0:e.substring(0,e.indexOf(":"));if(n)return"arbitrary.."+n}},$_=r=>{const{theme:e,prefix:n}=r,s={nextPart:new Map,validators:[]};return K_(Object.entries(r.classGroups),n).forEach(([l,f])=>{hf(f,s,l,e)}),s},hf=(r,e,n,s)=>{r.forEach(a=>{if(typeof a=="string"){const l=a===""?e:yp(e,a);l.classGroupId=n;return}if(typeof a=="function"){if(Y_(a)){hf(a(s),e,n,s);return}e.validators.push({validator:a,classGroupId:n});return}Object.entries(a).forEach(([l,f])=>{hf(f,yp(e,l),n,s)})})},yp=(r,e)=>{let n=r;return e.split(Af).forEach(s=>{n.nextPart.has(s)||n.nextPart.set(s,{nextPart:new Map,validators:[]}),n=n.nextPart.get(s)}),n},Y_=r=>r.isThemeGetter,K_=(r,e)=>e?r.map(([n,s])=>{const a=s.map(l=>typeof l=="string"?e+l:typeof l=="object"?Object.fromEntries(Object.entries(l).map(([f,u])=>[e+f,u])):l);return[n,a]}):r,Z_=r=>{if(r<1)return{get:()=>{},set:()=>{}};let e=0,n=new Map,s=new Map;const a=(l,f)=>{n.set(l,f),e++,e>r&&(e=0,s=n,n=new Map)};return{get(l){let f=n.get(l);if(f!==void 0)return f;if((f=s.get(l))!==void 0)return a(l,f),f},set(l,f){n.has(l)?n.set(l,f):a(l,f)}}},ng="!",Q_=r=>{const{separator:e,experimentalParseClassName:n}=r,s=e.length===1,a=e[0],l=e.length,f=u=>{const h=[];let m=0,v=0,y;for(let _=0;_<u.length;_++){let g=u[_];if(m===0){if(g===a&&(s||u.slice(_,_+l)===e)){h.push(u.slice(v,_)),v=_+l;continue}if(g==="/"){y=_;continue}}g==="["?m++:g==="]"&&m--}const x=h.length===0?u:u.substring(v),S=x.startsWith(ng),M=S?x.substring(1):x,E=y&&y>v?y-v:void 0;return{modifiers:h,hasImportantModifier:S,baseClassName:M,maybePostfixModifierPosition:E}};return n?u=>n({className:u,parseClassName:f}):f},J_=r=>{if(r.length<=1)return r;const e=[];let n=[];return r.forEach(s=>{s[0]==="["?(e.push(...n.sort(),s),n=[]):n.push(s)}),e.push(...n.sort()),e},ex=r=>({cache:Z_(r.cacheSize),parseClassName:Q_(r),...X_(r)}),tx=/\s+/,nx=(r,e)=>{const{parseClassName:n,getClassGroupId:s,getConflictingClassGroupIds:a}=e,l=[],f=r.trim().split(tx);let u="";for(let h=f.length-1;h>=0;h-=1){const m=f[h],{modifiers:v,hasImportantModifier:y,baseClassName:x,maybePostfixModifierPosition:S}=n(m);let M=!!S,E=s(M?x.substring(0,S):x);if(!E){if(!M){u=m+(u.length>0?" "+u:u);continue}if(E=s(x),!E){u=m+(u.length>0?" "+u:u);continue}M=!1}const _=J_(v).join(":"),g=y?_+ng:_,L=g+E;if(l.includes(L))continue;l.push(L);const b=a(E,M);for(let D=0;D<b.length;++D){const X=b[D];l.push(g+X)}u=m+(u.length>0?" "+u:u)}return u};function ix(){let r=0,e,n,s="";for(;r<arguments.length;)(e=arguments[r++])&&(n=ig(e))&&(s&&(s+=" "),s+=n);return s}const ig=r=>{if(typeof r=="string")return r;let e,n="";for(let s=0;s<r.length;s++)r[s]&&(e=ig(r[s]))&&(n&&(n+=" "),n+=e);return n};function rx(r,...e){let n,s,a,l=f;function f(h){const m=e.reduce((v,y)=>y(v),r());return n=ex(m),s=n.cache.get,a=n.cache.set,l=u,u(h)}function u(h){const m=s(h);if(m)return m;const v=nx(h,n);return a(h,v),v}return function(){return l(ix.apply(null,arguments))}}const Dt=r=>{const e=n=>n[r]||[];return e.isThemeGetter=!0,e},rg=/^\[(?:([a-z-]+):)?(.+)\]$/i,sx=/^\d+\/\d+$/,ox=new Set(["px","full","screen"]),ax=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,lx=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,cx=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,ux=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,fx=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,Ui=r=>Vs(r)||ox.has(r)||sx.test(r),dr=r=>Ks(r,"length",xx),Vs=r=>!!r&&!Number.isNaN(Number(r)),Nu=r=>Ks(r,"number",Vs),Uo=r=>!!r&&Number.isInteger(Number(r)),dx=r=>r.endsWith("%")&&Vs(r.slice(0,-1)),ft=r=>rg.test(r),hr=r=>ax.test(r),hx=new Set(["length","size","percentage"]),px=r=>Ks(r,hx,sg),mx=r=>Ks(r,"position",sg),gx=new Set(["image","url"]),vx=r=>Ks(r,gx,Sx),_x=r=>Ks(r,"",yx),Fo=()=>!0,Ks=(r,e,n)=>{const s=rg.exec(r);return s?s[1]?typeof e=="string"?s[1]===e:e.has(s[1]):n(s[2]):!1},xx=r=>lx.test(r)&&!cx.test(r),sg=()=>!1,yx=r=>ux.test(r),Sx=r=>fx.test(r),Mx=()=>{const r=Dt("colors"),e=Dt("spacing"),n=Dt("blur"),s=Dt("brightness"),a=Dt("borderColor"),l=Dt("borderRadius"),f=Dt("borderSpacing"),u=Dt("borderWidth"),h=Dt("contrast"),m=Dt("grayscale"),v=Dt("hueRotate"),y=Dt("invert"),x=Dt("gap"),S=Dt("gradientColorStops"),M=Dt("gradientColorStopPositions"),E=Dt("inset"),_=Dt("margin"),g=Dt("opacity"),L=Dt("padding"),b=Dt("saturate"),D=Dt("scale"),X=Dt("sepia"),O=Dt("skew"),k=Dt("space"),he=Dt("translate"),C=()=>["auto","contain","none"],A=()=>["auto","hidden","clip","visible","scroll"],re=()=>["auto",ft,e],ee=()=>[ft,e],W=()=>["",Ui,dr],F=()=>["auto",Vs,ft],Y=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],Q=()=>["solid","dashed","dotted","double","none"],ie=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],V=()=>["start","end","center","between","around","evenly","stretch"],z=()=>["","0",ft],j=()=>["auto","avoid","all","avoid-page","page","left","right","column"],N=()=>[Vs,ft];return{cacheSize:500,separator:":",theme:{colors:[Fo],spacing:[Ui,dr],blur:["none","",hr,ft],brightness:N(),borderColor:[r],borderRadius:["none","","full",hr,ft],borderSpacing:ee(),borderWidth:W(),contrast:N(),grayscale:z(),hueRotate:N(),invert:z(),gap:ee(),gradientColorStops:[r],gradientColorStopPositions:[dx,dr],inset:re(),margin:re(),opacity:N(),padding:ee(),saturate:N(),scale:N(),sepia:z(),skew:N(),space:ee(),translate:ee()},classGroups:{aspect:[{aspect:["auto","square","video",ft]}],container:["container"],columns:[{columns:[hr]}],"break-after":[{"break-after":j()}],"break-before":[{"break-before":j()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...Y(),ft]}],overflow:[{overflow:A()}],"overflow-x":[{"overflow-x":A()}],"overflow-y":[{"overflow-y":A()}],overscroll:[{overscroll:C()}],"overscroll-x":[{"overscroll-x":C()}],"overscroll-y":[{"overscroll-y":C()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[E]}],"inset-x":[{"inset-x":[E]}],"inset-y":[{"inset-y":[E]}],start:[{start:[E]}],end:[{end:[E]}],top:[{top:[E]}],right:[{right:[E]}],bottom:[{bottom:[E]}],left:[{left:[E]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",Uo,ft]}],basis:[{basis:re()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",ft]}],grow:[{grow:z()}],shrink:[{shrink:z()}],order:[{order:["first","last","none",Uo,ft]}],"grid-cols":[{"grid-cols":[Fo]}],"col-start-end":[{col:["auto",{span:["full",Uo,ft]},ft]}],"col-start":[{"col-start":F()}],"col-end":[{"col-end":F()}],"grid-rows":[{"grid-rows":[Fo]}],"row-start-end":[{row:["auto",{span:[Uo,ft]},ft]}],"row-start":[{"row-start":F()}],"row-end":[{"row-end":F()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",ft]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",ft]}],gap:[{gap:[x]}],"gap-x":[{"gap-x":[x]}],"gap-y":[{"gap-y":[x]}],"justify-content":[{justify:["normal",...V()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...V(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...V(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[L]}],px:[{px:[L]}],py:[{py:[L]}],ps:[{ps:[L]}],pe:[{pe:[L]}],pt:[{pt:[L]}],pr:[{pr:[L]}],pb:[{pb:[L]}],pl:[{pl:[L]}],m:[{m:[_]}],mx:[{mx:[_]}],my:[{my:[_]}],ms:[{ms:[_]}],me:[{me:[_]}],mt:[{mt:[_]}],mr:[{mr:[_]}],mb:[{mb:[_]}],ml:[{ml:[_]}],"space-x":[{"space-x":[k]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[k]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",ft,e]}],"min-w":[{"min-w":[ft,e,"min","max","fit"]}],"max-w":[{"max-w":[ft,e,"none","full","min","max","fit","prose",{screen:[hr]},hr]}],h:[{h:[ft,e,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[ft,e,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[ft,e,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[ft,e,"auto","min","max","fit"]}],"font-size":[{text:["base",hr,dr]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",Nu]}],"font-family":[{font:[Fo]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",ft]}],"line-clamp":[{"line-clamp":["none",Vs,Nu]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",Ui,ft]}],"list-image":[{"list-image":["none",ft]}],"list-style-type":[{list:["none","disc","decimal",ft]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[r]}],"placeholder-opacity":[{"placeholder-opacity":[g]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[r]}],"text-opacity":[{"text-opacity":[g]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...Q(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",Ui,dr]}],"underline-offset":[{"underline-offset":["auto",Ui,ft]}],"text-decoration-color":[{decoration:[r]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:ee()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",ft]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",ft]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[g]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...Y(),mx]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",px]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},vx]}],"bg-color":[{bg:[r]}],"gradient-from-pos":[{from:[M]}],"gradient-via-pos":[{via:[M]}],"gradient-to-pos":[{to:[M]}],"gradient-from":[{from:[S]}],"gradient-via":[{via:[S]}],"gradient-to":[{to:[S]}],rounded:[{rounded:[l]}],"rounded-s":[{"rounded-s":[l]}],"rounded-e":[{"rounded-e":[l]}],"rounded-t":[{"rounded-t":[l]}],"rounded-r":[{"rounded-r":[l]}],"rounded-b":[{"rounded-b":[l]}],"rounded-l":[{"rounded-l":[l]}],"rounded-ss":[{"rounded-ss":[l]}],"rounded-se":[{"rounded-se":[l]}],"rounded-ee":[{"rounded-ee":[l]}],"rounded-es":[{"rounded-es":[l]}],"rounded-tl":[{"rounded-tl":[l]}],"rounded-tr":[{"rounded-tr":[l]}],"rounded-br":[{"rounded-br":[l]}],"rounded-bl":[{"rounded-bl":[l]}],"border-w":[{border:[u]}],"border-w-x":[{"border-x":[u]}],"border-w-y":[{"border-y":[u]}],"border-w-s":[{"border-s":[u]}],"border-w-e":[{"border-e":[u]}],"border-w-t":[{"border-t":[u]}],"border-w-r":[{"border-r":[u]}],"border-w-b":[{"border-b":[u]}],"border-w-l":[{"border-l":[u]}],"border-opacity":[{"border-opacity":[g]}],"border-style":[{border:[...Q(),"hidden"]}],"divide-x":[{"divide-x":[u]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[u]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[g]}],"divide-style":[{divide:Q()}],"border-color":[{border:[a]}],"border-color-x":[{"border-x":[a]}],"border-color-y":[{"border-y":[a]}],"border-color-s":[{"border-s":[a]}],"border-color-e":[{"border-e":[a]}],"border-color-t":[{"border-t":[a]}],"border-color-r":[{"border-r":[a]}],"border-color-b":[{"border-b":[a]}],"border-color-l":[{"border-l":[a]}],"divide-color":[{divide:[a]}],"outline-style":[{outline:["",...Q()]}],"outline-offset":[{"outline-offset":[Ui,ft]}],"outline-w":[{outline:[Ui,dr]}],"outline-color":[{outline:[r]}],"ring-w":[{ring:W()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[r]}],"ring-opacity":[{"ring-opacity":[g]}],"ring-offset-w":[{"ring-offset":[Ui,dr]}],"ring-offset-color":[{"ring-offset":[r]}],shadow:[{shadow:["","inner","none",hr,_x]}],"shadow-color":[{shadow:[Fo]}],opacity:[{opacity:[g]}],"mix-blend":[{"mix-blend":[...ie(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":ie()}],filter:[{filter:["","none"]}],blur:[{blur:[n]}],brightness:[{brightness:[s]}],contrast:[{contrast:[h]}],"drop-shadow":[{"drop-shadow":["","none",hr,ft]}],grayscale:[{grayscale:[m]}],"hue-rotate":[{"hue-rotate":[v]}],invert:[{invert:[y]}],saturate:[{saturate:[b]}],sepia:[{sepia:[X]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[n]}],"backdrop-brightness":[{"backdrop-brightness":[s]}],"backdrop-contrast":[{"backdrop-contrast":[h]}],"backdrop-grayscale":[{"backdrop-grayscale":[m]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[v]}],"backdrop-invert":[{"backdrop-invert":[y]}],"backdrop-opacity":[{"backdrop-opacity":[g]}],"backdrop-saturate":[{"backdrop-saturate":[b]}],"backdrop-sepia":[{"backdrop-sepia":[X]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[f]}],"border-spacing-x":[{"border-spacing-x":[f]}],"border-spacing-y":[{"border-spacing-y":[f]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",ft]}],duration:[{duration:N()}],ease:[{ease:["linear","in","out","in-out",ft]}],delay:[{delay:N()}],animate:[{animate:["none","spin","ping","pulse","bounce",ft]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[D]}],"scale-x":[{"scale-x":[D]}],"scale-y":[{"scale-y":[D]}],rotate:[{rotate:[Uo,ft]}],"translate-x":[{"translate-x":[he]}],"translate-y":[{"translate-y":[he]}],"skew-x":[{"skew-x":[O]}],"skew-y":[{"skew-y":[O]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",ft]}],accent:[{accent:["auto",r]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",ft]}],"caret-color":[{caret:[r]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":ee()}],"scroll-mx":[{"scroll-mx":ee()}],"scroll-my":[{"scroll-my":ee()}],"scroll-ms":[{"scroll-ms":ee()}],"scroll-me":[{"scroll-me":ee()}],"scroll-mt":[{"scroll-mt":ee()}],"scroll-mr":[{"scroll-mr":ee()}],"scroll-mb":[{"scroll-mb":ee()}],"scroll-ml":[{"scroll-ml":ee()}],"scroll-p":[{"scroll-p":ee()}],"scroll-px":[{"scroll-px":ee()}],"scroll-py":[{"scroll-py":ee()}],"scroll-ps":[{"scroll-ps":ee()}],"scroll-pe":[{"scroll-pe":ee()}],"scroll-pt":[{"scroll-pt":ee()}],"scroll-pr":[{"scroll-pr":ee()}],"scroll-pb":[{"scroll-pb":ee()}],"scroll-pl":[{"scroll-pl":ee()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",ft]}],fill:[{fill:[r,"none"]}],"stroke-w":[{stroke:[Ui,dr,Nu]}],stroke:[{stroke:[r,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},Ex=rx(Mx);function Ut(...r){return Ex(eg(r))}const Xr=Fe.forwardRef(({className:r,...e},n)=>U.jsx("div",{ref:n,className:Ut("rounded-lg border border-catppuccin-surface1 bg-catppuccin-surface0 text-catppuccin-text shadow-sm",r),...e}));Xr.displayName="Card";const wx=Fe.forwardRef(({className:r,...e},n)=>U.jsx("div",{ref:n,className:Ut("flex flex-col space-y-1.5 p-4",r),...e}));wx.displayName="CardHeader";const Tx=Fe.forwardRef(({className:r,...e},n)=>U.jsx("h3",{ref:n,className:Ut("font-semibold leading-none tracking-tight",r),...e}));Tx.displayName="CardTitle";const Ax=Fe.forwardRef(({className:r,...e},n)=>U.jsx("p",{ref:n,className:Ut("text-sm text-catppuccin-subtext0",r),...e}));Ax.displayName="CardDescription";const bx=Fe.forwardRef(({className:r,...e},n)=>U.jsx("div",{ref:n,className:Ut("p-4 pt-0",r),...e}));bx.displayName="CardContent";const Cx=Fe.forwardRef(({className:r,...e},n)=>U.jsx("div",{ref:n,className:Ut("flex items-center p-4 pt-0",r),...e}));Cx.displayName="CardFooter";const Sp=r=>typeof r=="boolean"?`${r}`:r===0?"0":r,Mp=eg,Rx=(r,e)=>n=>{var s;if((e==null?void 0:e.variants)==null)return Mp(r,n==null?void 0:n.class,n==null?void 0:n.className);const{variants:a,defaultVariants:l}=e,f=Object.keys(a).map(m=>{const v=n==null?void 0:n[m],y=l==null?void 0:l[m];if(v===null)return null;const x=Sp(v)||Sp(y);return a[m][x]}),u=n&&Object.entries(n).reduce((m,v)=>{let[y,x]=v;return x===void 0||(m[y]=x),m},{}),h=e==null||(s=e.compoundVariants)===null||s===void 0?void 0:s.reduce((m,v)=>{let{class:y,className:x,...S}=v;return Object.entries(S).every(M=>{let[E,_]=M;return Array.isArray(_)?_.includes({...l,...u}[E]):{...l,...u}[E]===_})?[...m,y,x]:m},[]);return Mp(r,f,h,n==null?void 0:n.class,n==null?void 0:n.className)},Px=Rx("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-catppuccin-mauve text-catppuccin-crust",secondary:"border-transparent bg-catppuccin-surface1 text-catppuccin-text",destructive:"border-transparent bg-catppuccin-red text-catppuccin-crust",outline:"text-catppuccin-text",passed:"border-transparent bg-catppuccin-green text-catppuccin-base",running:"border-transparent bg-catppuccin-blue text-catppuccin-base",failed:"border-transparent bg-catppuccin-red text-catppuccin-base",pending:"border-transparent bg-catppuccin-surface2 text-catppuccin-text",skipped:"border border-catppuccin-overlay0 bg-transparent text-catppuccin-subtext0"}},defaultVariants:{variant:"default"}});function Hr({className:r,variant:e,...n}){return U.jsx("div",{className:Ut(Px({variant:e}),r),...n})}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const bf="160",Lx=0,Ep=1,Nx=2,og=1,Dx=2,Hi=3,Tr=0,In=1,Gi=2,Mr=0,Ws=1,wp=2,Tp=3,Ap=4,Ix=5,Yr=100,Ux=101,Fx=102,bp=103,Cp=104,Ox=200,kx=201,zx=202,Bx=203,pf=204,mf=205,Hx=206,Gx=207,Vx=208,Wx=209,jx=210,Xx=211,qx=212,$x=213,Yx=214,Kx=0,Zx=1,Qx=2,Il=3,Jx=4,e0=5,t0=6,n0=7,ag=0,i0=1,r0=2,Er=0,s0=1,o0=2,a0=3,l0=4,c0=5,u0=6,lg=300,Xs=301,qs=302,gf=303,vf=304,Gl=306,_f=1e3,di=1001,xf=1002,Mn=1003,Rp=1004,Du=1005,Kn=1006,f0=1007,Wo=1008,wr=1009,d0=1010,h0=1011,Cf=1012,cg=1013,yr=1014,Sr=1015,jo=1016,ug=1017,fg=1018,Zr=1020,p0=1021,hi=1023,m0=1024,g0=1025,Qr=1026,$s=1027,v0=1028,dg=1029,_0=1030,hg=1031,pg=1033,Iu=33776,Uu=33777,Fu=33778,Ou=33779,Pp=35840,Lp=35841,Np=35842,Dp=35843,mg=36196,Ip=37492,Up=37496,Fp=37808,Op=37809,kp=37810,zp=37811,Bp=37812,Hp=37813,Gp=37814,Vp=37815,Wp=37816,jp=37817,Xp=37818,qp=37819,$p=37820,Yp=37821,ku=36492,Kp=36494,Zp=36495,x0=36283,Qp=36284,Jp=36285,em=36286,gg=3e3,Jr=3001,y0=3200,S0=3201,M0=0,E0=1,Jn="",ln="srgb",Wi="srgb-linear",Rf="display-p3",Vl="display-p3-linear",Ul="linear",It="srgb",Fl="rec709",Ol="p3",Ts=7680,tm=519,w0=512,T0=513,A0=514,vg=515,b0=516,C0=517,R0=518,P0=519,nm=35044,im="300 es",yf=1035,Vi=2e3,kl=2001;class Zs{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(n)===-1&&s[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const s=this._listeners;return s[e]!==void 0&&s[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const a=this._listeners[e];if(a!==void 0){const l=a.indexOf(n);l!==-1&&a.splice(l,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const s=this._listeners[e.type];if(s!==void 0){e.target=this;const a=s.slice(0);for(let l=0,f=a.length;l<f;l++)a[l].call(this,e);e.target=null}}}const mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zu=Math.PI/180,Sf=180/Math.PI;function Xo(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(mn[r&255]+mn[r>>8&255]+mn[r>>16&255]+mn[r>>24&255]+"-"+mn[e&255]+mn[e>>8&255]+"-"+mn[e>>16&15|64]+mn[e>>24&255]+"-"+mn[n&63|128]+mn[n>>8&255]+"-"+mn[n>>16&255]+mn[n>>24&255]+mn[s&255]+mn[s>>8&255]+mn[s>>16&255]+mn[s>>24&255]).toLowerCase()}function Dn(r,e,n){return Math.max(e,Math.min(n,r))}function L0(r,e){return(r%e+e)%e}function Bu(r,e,n){return(1-n)*r+n*e}function rm(r){return(r&r-1)===0&&r!==0}function Mf(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Oo(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Nn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class bt{constructor(e=0,n=0){bt.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,s=this.y,a=e.elements;return this.x=a[0]*n+a[3]*s+a[6],this.y=a[1]*n+a[4]*s+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(n,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const s=this.dot(e)/n;return Math.acos(Dn(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,s=this.y-e.y;return n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,s){return this.x=e.x+(n.x-e.x)*s,this.y=e.y+(n.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const s=Math.cos(n),a=Math.sin(n),l=this.x-e.x,f=this.y-e.y;return this.x=l*s-f*a+e.x,this.y=l*a+f*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class mt{constructor(e,n,s,a,l,f,u,h,m){mt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,s,a,l,f,u,h,m)}set(e,n,s,a,l,f,u,h,m){const v=this.elements;return v[0]=e,v[1]=a,v[2]=u,v[3]=n,v[4]=l,v[5]=h,v[6]=s,v[7]=f,v[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,s=e.elements;return n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],n[4]=s[4],n[5]=s[5],n[6]=s[6],n[7]=s[7],n[8]=s[8],this}extractBasis(e,n,s){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const s=e.elements,a=n.elements,l=this.elements,f=s[0],u=s[3],h=s[6],m=s[1],v=s[4],y=s[7],x=s[2],S=s[5],M=s[8],E=a[0],_=a[3],g=a[6],L=a[1],b=a[4],D=a[7],X=a[2],O=a[5],k=a[8];return l[0]=f*E+u*L+h*X,l[3]=f*_+u*b+h*O,l[6]=f*g+u*D+h*k,l[1]=m*E+v*L+y*X,l[4]=m*_+v*b+y*O,l[7]=m*g+v*D+y*k,l[2]=x*E+S*L+M*X,l[5]=x*_+S*b+M*O,l[8]=x*g+S*D+M*k,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],s=e[1],a=e[2],l=e[3],f=e[4],u=e[5],h=e[6],m=e[7],v=e[8];return n*f*v-n*u*m-s*l*v+s*u*h+a*l*m-a*f*h}invert(){const e=this.elements,n=e[0],s=e[1],a=e[2],l=e[3],f=e[4],u=e[5],h=e[6],m=e[7],v=e[8],y=v*f-u*m,x=u*h-v*l,S=m*l-f*h,M=n*y+s*x+a*S;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/M;return e[0]=y*E,e[1]=(a*m-v*s)*E,e[2]=(u*s-a*f)*E,e[3]=x*E,e[4]=(v*n-a*h)*E,e[5]=(a*l-u*n)*E,e[6]=S*E,e[7]=(s*h-m*n)*E,e[8]=(f*n-s*l)*E,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,s,a,l,f,u){const h=Math.cos(l),m=Math.sin(l);return this.set(s*h,s*m,-s*(h*f+m*u)+f+e,-a*m,a*h,-a*(-m*f+h*u)+u+n,0,0,1),this}scale(e,n){return this.premultiply(Hu.makeScale(e,n)),this}rotate(e){return this.premultiply(Hu.makeRotation(-e)),this}translate(e,n){return this.premultiply(Hu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),s=Math.sin(e);return this.set(n,-s,0,s,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,s=e.elements;for(let a=0;a<9;a++)if(n[a]!==s[a])return!1;return!0}fromArray(e,n=0){for(let s=0;s<9;s++)this.elements[s]=e[s+n];return this}toArray(e=[],n=0){const s=this.elements;return e[n]=s[0],e[n+1]=s[1],e[n+2]=s[2],e[n+3]=s[3],e[n+4]=s[4],e[n+5]=s[5],e[n+6]=s[6],e[n+7]=s[7],e[n+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Hu=new mt;function _g(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function zl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function N0(){const r=zl("canvas");return r.style.display="block",r}const sm={};function Vo(r){r in sm||(sm[r]=!0,console.warn(r))}const om=new mt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),am=new mt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),rl={[Wi]:{transfer:Ul,primaries:Fl,toReference:r=>r,fromReference:r=>r},[ln]:{transfer:It,primaries:Fl,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Vl]:{transfer:Ul,primaries:Ol,toReference:r=>r.applyMatrix3(am),fromReference:r=>r.applyMatrix3(om)},[Rf]:{transfer:It,primaries:Ol,toReference:r=>r.convertSRGBToLinear().applyMatrix3(am),fromReference:r=>r.applyMatrix3(om).convertLinearToSRGB()}},D0=new Set([Wi,Vl]),At={enabled:!0,_workingColorSpace:Wi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!D0.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,n){if(this.enabled===!1||e===n||!e||!n)return r;const s=rl[e].toReference,a=rl[n].fromReference;return a(s(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return rl[r].primaries},getTransfer:function(r){return r===Jn?Ul:rl[r].transfer}};function js(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Gu(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let As;class xg{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{As===void 0&&(As=zl("canvas")),As.width=e.width,As.height=e.height;const s=As.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=As}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=zl("canvas");n.width=e.width,n.height=e.height;const s=n.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const a=s.getImageData(0,0,e.width,e.height),l=a.data;for(let f=0;f<l.length;f++)l[f]=js(l[f]/255)*255;return s.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let s=0;s<n.length;s++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[s]=Math.floor(js(n[s]/255)*255):n[s]=js(n[s]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let I0=0;class yg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:I0++}),this.uuid=Xo(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},a=this.data;if(a!==null){let l;if(Array.isArray(a)){l=[];for(let f=0,u=a.length;f<u;f++)a[f].isDataTexture?l.push(Vu(a[f].image)):l.push(Vu(a[f]))}else l=Vu(a);s.url=l}return n||(e.images[this.uuid]=s),s}}function Vu(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?xg.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let U0=0;class Hn extends Zs{constructor(e=Hn.DEFAULT_IMAGE,n=Hn.DEFAULT_MAPPING,s=di,a=di,l=Kn,f=Wo,u=hi,h=wr,m=Hn.DEFAULT_ANISOTROPY,v=Jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:U0++}),this.uuid=Xo(),this.name="",this.source=new yg(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=s,this.wrapT=a,this.magFilter=l,this.minFilter=f,this.anisotropy=m,this.format=u,this.internalFormat=null,this.type=h,this.offset=new bt(0,0),this.repeat=new bt(1,1),this.center=new bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new mt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof v=="string"?this.colorSpace=v:(Vo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=v===Jr?ln:Jn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),n||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==lg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case _f:e.x=e.x-Math.floor(e.x);break;case di:e.x=e.x<0?0:1;break;case xf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case _f:e.y=e.y-Math.floor(e.y);break;case di:e.y=e.y<0?0:1;break;case xf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Vo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ln?Jr:gg}set encoding(e){Vo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Jr?ln:Jn}}Hn.DEFAULT_IMAGE=null;Hn.DEFAULT_MAPPING=lg;Hn.DEFAULT_ANISOTROPY=1;class cn{constructor(e=0,n=0,s=0,a=1){cn.prototype.isVector4=!0,this.x=e,this.y=n,this.z=s,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,s,a){return this.x=e,this.y=n,this.z=s,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,s=this.y,a=this.z,l=this.w,f=e.elements;return this.x=f[0]*n+f[4]*s+f[8]*a+f[12]*l,this.y=f[1]*n+f[5]*s+f[9]*a+f[13]*l,this.z=f[2]*n+f[6]*s+f[10]*a+f[14]*l,this.w=f[3]*n+f[7]*s+f[11]*a+f[15]*l,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,s,a,l;const h=e.elements,m=h[0],v=h[4],y=h[8],x=h[1],S=h[5],M=h[9],E=h[2],_=h[6],g=h[10];if(Math.abs(v-x)<.01&&Math.abs(y-E)<.01&&Math.abs(M-_)<.01){if(Math.abs(v+x)<.1&&Math.abs(y+E)<.1&&Math.abs(M+_)<.1&&Math.abs(m+S+g-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const b=(m+1)/2,D=(S+1)/2,X=(g+1)/2,O=(v+x)/4,k=(y+E)/4,he=(M+_)/4;return b>D&&b>X?b<.01?(s=0,a=.707106781,l=.707106781):(s=Math.sqrt(b),a=O/s,l=k/s):D>X?D<.01?(s=.707106781,a=0,l=.707106781):(a=Math.sqrt(D),s=O/a,l=he/a):X<.01?(s=.707106781,a=.707106781,l=0):(l=Math.sqrt(X),s=k/l,a=he/l),this.set(s,a,l,n),this}let L=Math.sqrt((_-M)*(_-M)+(y-E)*(y-E)+(x-v)*(x-v));return Math.abs(L)<.001&&(L=1),this.x=(_-M)/L,this.y=(y-E)/L,this.z=(x-v)/L,this.w=Math.acos((m+S+g-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(n,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,s){return this.x=e.x+(n.x-e.x)*s,this.y=e.y+(n.y-e.y)*s,this.z=e.z+(n.z-e.z)*s,this.w=e.w+(n.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class F0 extends Zs{constructor(e=1,n=1,s={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new cn(0,0,e,n),this.scissorTest=!1,this.viewport=new cn(0,0,e,n);const a={width:e,height:n,depth:1};s.encoding!==void 0&&(Vo("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),s.colorSpace=s.encoding===Jr?ln:Jn),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},s),this.texture=new Hn(a,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=s.generateMipmaps,this.texture.internalFormat=s.internalFormat,this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.depthTexture=s.depthTexture,this.samples=s.samples}setSize(e,n,s=1){(this.width!==e||this.height!==n||this.depth!==s)&&(this.width=e,this.height=n,this.depth=s,this.texture.image.width=e,this.texture.image.height=n,this.texture.image.depth=s,this.dispose()),this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new yg(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class es extends F0{constructor(e=1,n=1,s={}){super(e,n,s),this.isWebGLRenderTarget=!0}}class Sg extends Hn{constructor(e=null,n=1,s=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:s,depth:a},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class O0 extends Hn{constructor(e=null,n=1,s=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:s,depth:a},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qo{constructor(e=0,n=0,s=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=s,this._w=a}static slerpFlat(e,n,s,a,l,f,u){let h=s[a+0],m=s[a+1],v=s[a+2],y=s[a+3];const x=l[f+0],S=l[f+1],M=l[f+2],E=l[f+3];if(u===0){e[n+0]=h,e[n+1]=m,e[n+2]=v,e[n+3]=y;return}if(u===1){e[n+0]=x,e[n+1]=S,e[n+2]=M,e[n+3]=E;return}if(y!==E||h!==x||m!==S||v!==M){let _=1-u;const g=h*x+m*S+v*M+y*E,L=g>=0?1:-1,b=1-g*g;if(b>Number.EPSILON){const X=Math.sqrt(b),O=Math.atan2(X,g*L);_=Math.sin(_*O)/X,u=Math.sin(u*O)/X}const D=u*L;if(h=h*_+x*D,m=m*_+S*D,v=v*_+M*D,y=y*_+E*D,_===1-u){const X=1/Math.sqrt(h*h+m*m+v*v+y*y);h*=X,m*=X,v*=X,y*=X}}e[n]=h,e[n+1]=m,e[n+2]=v,e[n+3]=y}static multiplyQuaternionsFlat(e,n,s,a,l,f){const u=s[a],h=s[a+1],m=s[a+2],v=s[a+3],y=l[f],x=l[f+1],S=l[f+2],M=l[f+3];return e[n]=u*M+v*y+h*S-m*x,e[n+1]=h*M+v*x+m*y-u*S,e[n+2]=m*M+v*S+u*x-h*y,e[n+3]=v*M-u*y-h*x-m*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,s,a){return this._x=e,this._y=n,this._z=s,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const s=e._x,a=e._y,l=e._z,f=e._order,u=Math.cos,h=Math.sin,m=u(s/2),v=u(a/2),y=u(l/2),x=h(s/2),S=h(a/2),M=h(l/2);switch(f){case"XYZ":this._x=x*v*y+m*S*M,this._y=m*S*y-x*v*M,this._z=m*v*M+x*S*y,this._w=m*v*y-x*S*M;break;case"YXZ":this._x=x*v*y+m*S*M,this._y=m*S*y-x*v*M,this._z=m*v*M-x*S*y,this._w=m*v*y+x*S*M;break;case"ZXY":this._x=x*v*y-m*S*M,this._y=m*S*y+x*v*M,this._z=m*v*M+x*S*y,this._w=m*v*y-x*S*M;break;case"ZYX":this._x=x*v*y-m*S*M,this._y=m*S*y+x*v*M,this._z=m*v*M-x*S*y,this._w=m*v*y+x*S*M;break;case"YZX":this._x=x*v*y+m*S*M,this._y=m*S*y+x*v*M,this._z=m*v*M-x*S*y,this._w=m*v*y-x*S*M;break;case"XZY":this._x=x*v*y-m*S*M,this._y=m*S*y-x*v*M,this._z=m*v*M+x*S*y,this._w=m*v*y+x*S*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const s=n/2,a=Math.sin(s);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,s=n[0],a=n[4],l=n[8],f=n[1],u=n[5],h=n[9],m=n[2],v=n[6],y=n[10],x=s+u+y;if(x>0){const S=.5/Math.sqrt(x+1);this._w=.25/S,this._x=(v-h)*S,this._y=(l-m)*S,this._z=(f-a)*S}else if(s>u&&s>y){const S=2*Math.sqrt(1+s-u-y);this._w=(v-h)/S,this._x=.25*S,this._y=(a+f)/S,this._z=(l+m)/S}else if(u>y){const S=2*Math.sqrt(1+u-s-y);this._w=(l-m)/S,this._x=(a+f)/S,this._y=.25*S,this._z=(h+v)/S}else{const S=2*Math.sqrt(1+y-s-u);this._w=(f-a)/S,this._x=(l+m)/S,this._y=(h+v)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let s=e.dot(n)+1;return s<Number.EPSILON?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Dn(this.dot(e),-1,1)))}rotateTowards(e,n){const s=this.angleTo(e);if(s===0)return this;const a=Math.min(1,n/s);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const s=e._x,a=e._y,l=e._z,f=e._w,u=n._x,h=n._y,m=n._z,v=n._w;return this._x=s*v+f*u+a*m-l*h,this._y=a*v+f*h+l*u-s*m,this._z=l*v+f*m+s*h-a*u,this._w=f*v-s*u-a*h-l*m,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const s=this._x,a=this._y,l=this._z,f=this._w;let u=f*e._w+s*e._x+a*e._y+l*e._z;if(u<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,u=-u):this.copy(e),u>=1)return this._w=f,this._x=s,this._y=a,this._z=l,this;const h=1-u*u;if(h<=Number.EPSILON){const S=1-n;return this._w=S*f+n*this._w,this._x=S*s+n*this._x,this._y=S*a+n*this._y,this._z=S*l+n*this._z,this.normalize(),this}const m=Math.sqrt(h),v=Math.atan2(m,u),y=Math.sin((1-n)*v)/m,x=Math.sin(n*v)/m;return this._w=f*y+this._w*x,this._x=s*y+this._x*x,this._y=a*y+this._y*x,this._z=l*y+this._z*x,this._onChangeCallback(),this}slerpQuaternions(e,n,s){return this.copy(e).slerp(n,s)}random(){const e=Math.random(),n=Math.sqrt(1-e),s=Math.sqrt(e),a=2*Math.PI*Math.random(),l=2*Math.PI*Math.random();return this.set(n*Math.cos(a),s*Math.sin(l),s*Math.cos(l),n*Math.sin(a))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ae{constructor(e=0,n=0,s=0){ae.prototype.isVector3=!0,this.x=e,this.y=n,this.z=s}set(e,n,s){return s===void 0&&(s=this.z),this.x=e,this.y=n,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(lm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(lm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,s=this.y,a=this.z,l=e.elements;return this.x=l[0]*n+l[3]*s+l[6]*a,this.y=l[1]*n+l[4]*s+l[7]*a,this.z=l[2]*n+l[5]*s+l[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,s=this.y,a=this.z,l=e.elements,f=1/(l[3]*n+l[7]*s+l[11]*a+l[15]);return this.x=(l[0]*n+l[4]*s+l[8]*a+l[12])*f,this.y=(l[1]*n+l[5]*s+l[9]*a+l[13])*f,this.z=(l[2]*n+l[6]*s+l[10]*a+l[14])*f,this}applyQuaternion(e){const n=this.x,s=this.y,a=this.z,l=e.x,f=e.y,u=e.z,h=e.w,m=2*(f*a-u*s),v=2*(u*n-l*a),y=2*(l*s-f*n);return this.x=n+h*m+f*y-u*v,this.y=s+h*v+u*m-l*y,this.z=a+h*y+l*v-f*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,s=this.y,a=this.z,l=e.elements;return this.x=l[0]*n+l[4]*s+l[8]*a,this.y=l[1]*n+l[5]*s+l[9]*a,this.z=l[2]*n+l[6]*s+l[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(n,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,s){return this.x=e.x+(n.x-e.x)*s,this.y=e.y+(n.y-e.y)*s,this.z=e.z+(n.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const s=e.x,a=e.y,l=e.z,f=n.x,u=n.y,h=n.z;return this.x=a*h-l*u,this.y=l*f-s*h,this.z=s*u-a*f,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const s=e.dot(this)/n;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return Wu.copy(this).projectOnVector(e),this.sub(Wu)}reflect(e){return this.sub(Wu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const s=this.dot(e)/n;return Math.acos(Dn(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,s=this.y-e.y,a=this.z-e.z;return n*n+s*s+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,s){const a=Math.sin(n)*e;return this.x=a*Math.sin(s),this.y=Math.cos(n)*e,this.z=a*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,s){return this.x=e*Math.sin(n),this.y=s,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=s,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,s=Math.sqrt(1-e**2);return this.x=s*Math.cos(n),this.y=s*Math.sin(n),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wu=new ae,lm=new qo;class $o{constructor(e=new ae(1/0,1/0,1/0),n=new ae(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,s=e.length;n<s;n+=3)this.expandByPoint(li.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,s=e.count;n<s;n++)this.expandByPoint(li.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,s=e.length;n<s;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const s=li.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const l=s.getAttribute("position");if(n===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let f=0,u=l.count;f<u;f++)e.isMesh===!0?e.getVertexPosition(f,li):li.fromBufferAttribute(l,f),li.applyMatrix4(e.matrixWorld),this.expandByPoint(li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),sl.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),sl.copy(s.boundingBox)),sl.applyMatrix4(e.matrixWorld),this.union(sl)}const a=e.children;for(let l=0,f=a.length;l<f;l++)this.expandByObject(a[l],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,li),li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,s;return e.normal.x>0?(n=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),n<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ko),ol.subVectors(this.max,ko),bs.subVectors(e.a,ko),Cs.subVectors(e.b,ko),Rs.subVectors(e.c,ko),pr.subVectors(Cs,bs),mr.subVectors(Rs,Cs),Gr.subVectors(bs,Rs);let n=[0,-pr.z,pr.y,0,-mr.z,mr.y,0,-Gr.z,Gr.y,pr.z,0,-pr.x,mr.z,0,-mr.x,Gr.z,0,-Gr.x,-pr.y,pr.x,0,-mr.y,mr.x,0,-Gr.y,Gr.x,0];return!ju(n,bs,Cs,Rs,ol)||(n=[1,0,0,0,1,0,0,0,1],!ju(n,bs,Cs,Rs,ol))?!1:(al.crossVectors(pr,mr),n=[al.x,al.y,al.z],ju(n,bs,Cs,Rs,ol))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Fi=[new ae,new ae,new ae,new ae,new ae,new ae,new ae,new ae],li=new ae,sl=new $o,bs=new ae,Cs=new ae,Rs=new ae,pr=new ae,mr=new ae,Gr=new ae,ko=new ae,ol=new ae,al=new ae,Vr=new ae;function ju(r,e,n,s,a){for(let l=0,f=r.length-3;l<=f;l+=3){Vr.fromArray(r,l);const u=a.x*Math.abs(Vr.x)+a.y*Math.abs(Vr.y)+a.z*Math.abs(Vr.z),h=e.dot(Vr),m=n.dot(Vr),v=s.dot(Vr);if(Math.max(-Math.max(h,m,v),Math.min(h,m,v))>u)return!1}return!0}const k0=new $o,zo=new ae,Xu=new ae;class Yo{constructor(e=new ae,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const s=this.center;n!==void 0?s.copy(n):k0.setFromPoints(e).getCenter(s);let a=0;for(let l=0,f=e.length;l<f;l++)a=Math.max(a,s.distanceToSquared(e[l]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const s=this.center.distanceToSquared(e);return n.copy(e),s>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zo.subVectors(e,this.center);const n=zo.lengthSq();if(n>this.radius*this.radius){const s=Math.sqrt(n),a=(s-this.radius)*.5;this.center.addScaledVector(zo,a/s),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zo.copy(e.center).add(Xu)),this.expandByPoint(zo.copy(e.center).sub(Xu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Oi=new ae,qu=new ae,ll=new ae,gr=new ae,$u=new ae,cl=new ae,Yu=new ae;class Pf{constructor(e=new ae,n=new ae(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Oi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const s=n.dot(this.direction);return s<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Oi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Oi.copy(this.origin).addScaledVector(this.direction,n),Oi.distanceToSquared(e))}distanceSqToSegment(e,n,s,a){qu.copy(e).add(n).multiplyScalar(.5),ll.copy(n).sub(e).normalize(),gr.copy(this.origin).sub(qu);const l=e.distanceTo(n)*.5,f=-this.direction.dot(ll),u=gr.dot(this.direction),h=-gr.dot(ll),m=gr.lengthSq(),v=Math.abs(1-f*f);let y,x,S,M;if(v>0)if(y=f*h-u,x=f*u-h,M=l*v,y>=0)if(x>=-M)if(x<=M){const E=1/v;y*=E,x*=E,S=y*(y+f*x+2*u)+x*(f*y+x+2*h)+m}else x=l,y=Math.max(0,-(f*x+u)),S=-y*y+x*(x+2*h)+m;else x=-l,y=Math.max(0,-(f*x+u)),S=-y*y+x*(x+2*h)+m;else x<=-M?(y=Math.max(0,-(-f*l+u)),x=y>0?-l:Math.min(Math.max(-l,-h),l),S=-y*y+x*(x+2*h)+m):x<=M?(y=0,x=Math.min(Math.max(-l,-h),l),S=x*(x+2*h)+m):(y=Math.max(0,-(f*l+u)),x=y>0?l:Math.min(Math.max(-l,-h),l),S=-y*y+x*(x+2*h)+m);else x=f>0?-l:l,y=Math.max(0,-(f*x+u)),S=-y*y+x*(x+2*h)+m;return s&&s.copy(this.origin).addScaledVector(this.direction,y),a&&a.copy(qu).addScaledVector(ll,x),S}intersectSphere(e,n){Oi.subVectors(e.center,this.origin);const s=Oi.dot(this.direction),a=Oi.dot(Oi)-s*s,l=e.radius*e.radius;if(a>l)return null;const f=Math.sqrt(l-a),u=s-f,h=s+f;return h<0?null:u<0?this.at(h,n):this.at(u,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/n;return s>=0?s:null}intersectPlane(e,n){const s=this.distanceToPlane(e);return s===null?null:this.at(s,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let s,a,l,f,u,h;const m=1/this.direction.x,v=1/this.direction.y,y=1/this.direction.z,x=this.origin;return m>=0?(s=(e.min.x-x.x)*m,a=(e.max.x-x.x)*m):(s=(e.max.x-x.x)*m,a=(e.min.x-x.x)*m),v>=0?(l=(e.min.y-x.y)*v,f=(e.max.y-x.y)*v):(l=(e.max.y-x.y)*v,f=(e.min.y-x.y)*v),s>f||l>a||((l>s||isNaN(s))&&(s=l),(f<a||isNaN(a))&&(a=f),y>=0?(u=(e.min.z-x.z)*y,h=(e.max.z-x.z)*y):(u=(e.max.z-x.z)*y,h=(e.min.z-x.z)*y),s>h||u>a)||((u>s||s!==s)&&(s=u),(h<a||a!==a)&&(a=h),a<0)?null:this.at(s>=0?s:a,n)}intersectsBox(e){return this.intersectBox(e,Oi)!==null}intersectTriangle(e,n,s,a,l){$u.subVectors(n,e),cl.subVectors(s,e),Yu.crossVectors($u,cl);let f=this.direction.dot(Yu),u;if(f>0){if(a)return null;u=1}else if(f<0)u=-1,f=-f;else return null;gr.subVectors(this.origin,e);const h=u*this.direction.dot(cl.crossVectors(gr,cl));if(h<0)return null;const m=u*this.direction.dot($u.cross(gr));if(m<0||h+m>f)return null;const v=-u*gr.dot(Yu);return v<0?null:this.at(v/f,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Zt{constructor(e,n,s,a,l,f,u,h,m,v,y,x,S,M,E,_){Zt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,s,a,l,f,u,h,m,v,y,x,S,M,E,_)}set(e,n,s,a,l,f,u,h,m,v,y,x,S,M,E,_){const g=this.elements;return g[0]=e,g[4]=n,g[8]=s,g[12]=a,g[1]=l,g[5]=f,g[9]=u,g[13]=h,g[2]=m,g[6]=v,g[10]=y,g[14]=x,g[3]=S,g[7]=M,g[11]=E,g[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Zt().fromArray(this.elements)}copy(e){const n=this.elements,s=e.elements;return n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],n[4]=s[4],n[5]=s[5],n[6]=s[6],n[7]=s[7],n[8]=s[8],n[9]=s[9],n[10]=s[10],n[11]=s[11],n[12]=s[12],n[13]=s[13],n[14]=s[14],n[15]=s[15],this}copyPosition(e){const n=this.elements,s=e.elements;return n[12]=s[12],n[13]=s[13],n[14]=s[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,s){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,n,s){return this.set(e.x,n.x,s.x,0,e.y,n.y,s.y,0,e.z,n.z,s.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,s=e.elements,a=1/Ps.setFromMatrixColumn(e,0).length(),l=1/Ps.setFromMatrixColumn(e,1).length(),f=1/Ps.setFromMatrixColumn(e,2).length();return n[0]=s[0]*a,n[1]=s[1]*a,n[2]=s[2]*a,n[3]=0,n[4]=s[4]*l,n[5]=s[5]*l,n[6]=s[6]*l,n[7]=0,n[8]=s[8]*f,n[9]=s[9]*f,n[10]=s[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,s=e.x,a=e.y,l=e.z,f=Math.cos(s),u=Math.sin(s),h=Math.cos(a),m=Math.sin(a),v=Math.cos(l),y=Math.sin(l);if(e.order==="XYZ"){const x=f*v,S=f*y,M=u*v,E=u*y;n[0]=h*v,n[4]=-h*y,n[8]=m,n[1]=S+M*m,n[5]=x-E*m,n[9]=-u*h,n[2]=E-x*m,n[6]=M+S*m,n[10]=f*h}else if(e.order==="YXZ"){const x=h*v,S=h*y,M=m*v,E=m*y;n[0]=x+E*u,n[4]=M*u-S,n[8]=f*m,n[1]=f*y,n[5]=f*v,n[9]=-u,n[2]=S*u-M,n[6]=E+x*u,n[10]=f*h}else if(e.order==="ZXY"){const x=h*v,S=h*y,M=m*v,E=m*y;n[0]=x-E*u,n[4]=-f*y,n[8]=M+S*u,n[1]=S+M*u,n[5]=f*v,n[9]=E-x*u,n[2]=-f*m,n[6]=u,n[10]=f*h}else if(e.order==="ZYX"){const x=f*v,S=f*y,M=u*v,E=u*y;n[0]=h*v,n[4]=M*m-S,n[8]=x*m+E,n[1]=h*y,n[5]=E*m+x,n[9]=S*m-M,n[2]=-m,n[6]=u*h,n[10]=f*h}else if(e.order==="YZX"){const x=f*h,S=f*m,M=u*h,E=u*m;n[0]=h*v,n[4]=E-x*y,n[8]=M*y+S,n[1]=y,n[5]=f*v,n[9]=-u*v,n[2]=-m*v,n[6]=S*y+M,n[10]=x-E*y}else if(e.order==="XZY"){const x=f*h,S=f*m,M=u*h,E=u*m;n[0]=h*v,n[4]=-y,n[8]=m*v,n[1]=x*y+E,n[5]=f*v,n[9]=S*y-M,n[2]=M*y-S,n[6]=u*v,n[10]=E*y+x}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(z0,e,B0)}lookAt(e,n,s){const a=this.elements;return zn.subVectors(e,n),zn.lengthSq()===0&&(zn.z=1),zn.normalize(),vr.crossVectors(s,zn),vr.lengthSq()===0&&(Math.abs(s.z)===1?zn.x+=1e-4:zn.z+=1e-4,zn.normalize(),vr.crossVectors(s,zn)),vr.normalize(),ul.crossVectors(zn,vr),a[0]=vr.x,a[4]=ul.x,a[8]=zn.x,a[1]=vr.y,a[5]=ul.y,a[9]=zn.y,a[2]=vr.z,a[6]=ul.z,a[10]=zn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const s=e.elements,a=n.elements,l=this.elements,f=s[0],u=s[4],h=s[8],m=s[12],v=s[1],y=s[5],x=s[9],S=s[13],M=s[2],E=s[6],_=s[10],g=s[14],L=s[3],b=s[7],D=s[11],X=s[15],O=a[0],k=a[4],he=a[8],C=a[12],A=a[1],re=a[5],ee=a[9],W=a[13],F=a[2],Y=a[6],Q=a[10],ie=a[14],V=a[3],z=a[7],j=a[11],N=a[15];return l[0]=f*O+u*A+h*F+m*V,l[4]=f*k+u*re+h*Y+m*z,l[8]=f*he+u*ee+h*Q+m*j,l[12]=f*C+u*W+h*ie+m*N,l[1]=v*O+y*A+x*F+S*V,l[5]=v*k+y*re+x*Y+S*z,l[9]=v*he+y*ee+x*Q+S*j,l[13]=v*C+y*W+x*ie+S*N,l[2]=M*O+E*A+_*F+g*V,l[6]=M*k+E*re+_*Y+g*z,l[10]=M*he+E*ee+_*Q+g*j,l[14]=M*C+E*W+_*ie+g*N,l[3]=L*O+b*A+D*F+X*V,l[7]=L*k+b*re+D*Y+X*z,l[11]=L*he+b*ee+D*Q+X*j,l[15]=L*C+b*W+D*ie+X*N,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],s=e[4],a=e[8],l=e[12],f=e[1],u=e[5],h=e[9],m=e[13],v=e[2],y=e[6],x=e[10],S=e[14],M=e[3],E=e[7],_=e[11],g=e[15];return M*(+l*h*y-a*m*y-l*u*x+s*m*x+a*u*S-s*h*S)+E*(+n*h*S-n*m*x+l*f*x-a*f*S+a*m*v-l*h*v)+_*(+n*m*y-n*u*S-l*f*y+s*f*S+l*u*v-s*m*v)+g*(-a*u*v-n*h*y+n*u*x+a*f*y-s*f*x+s*h*v)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,s){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=s),this}invert(){const e=this.elements,n=e[0],s=e[1],a=e[2],l=e[3],f=e[4],u=e[5],h=e[6],m=e[7],v=e[8],y=e[9],x=e[10],S=e[11],M=e[12],E=e[13],_=e[14],g=e[15],L=y*_*m-E*x*m+E*h*S-u*_*S-y*h*g+u*x*g,b=M*x*m-v*_*m-M*h*S+f*_*S+v*h*g-f*x*g,D=v*E*m-M*y*m+M*u*S-f*E*S-v*u*g+f*y*g,X=M*y*h-v*E*h-M*u*x+f*E*x+v*u*_-f*y*_,O=n*L+s*b+a*D+l*X;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/O;return e[0]=L*k,e[1]=(E*x*l-y*_*l-E*a*S+s*_*S+y*a*g-s*x*g)*k,e[2]=(u*_*l-E*h*l+E*a*m-s*_*m-u*a*g+s*h*g)*k,e[3]=(y*h*l-u*x*l-y*a*m+s*x*m+u*a*S-s*h*S)*k,e[4]=b*k,e[5]=(v*_*l-M*x*l+M*a*S-n*_*S-v*a*g+n*x*g)*k,e[6]=(M*h*l-f*_*l-M*a*m+n*_*m+f*a*g-n*h*g)*k,e[7]=(f*x*l-v*h*l+v*a*m-n*x*m-f*a*S+n*h*S)*k,e[8]=D*k,e[9]=(M*y*l-v*E*l-M*s*S+n*E*S+v*s*g-n*y*g)*k,e[10]=(f*E*l-M*u*l+M*s*m-n*E*m-f*s*g+n*u*g)*k,e[11]=(v*u*l-f*y*l-v*s*m+n*y*m+f*s*S-n*u*S)*k,e[12]=X*k,e[13]=(v*E*a-M*y*a+M*s*x-n*E*x-v*s*_+n*y*_)*k,e[14]=(M*u*a-f*E*a-M*s*h+n*E*h+f*s*_-n*u*_)*k,e[15]=(f*y*a-v*u*a+v*s*h-n*y*h-f*s*x+n*u*x)*k,this}scale(e){const n=this.elements,s=e.x,a=e.y,l=e.z;return n[0]*=s,n[4]*=a,n[8]*=l,n[1]*=s,n[5]*=a,n[9]*=l,n[2]*=s,n[6]*=a,n[10]*=l,n[3]*=s,n[7]*=a,n[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,s,a))}makeTranslation(e,n,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,s,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,n,-s,0,0,s,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),s=Math.sin(e);return this.set(n,0,s,0,0,1,0,0,-s,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),s=Math.sin(e);return this.set(n,-s,0,0,s,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const s=Math.cos(n),a=Math.sin(n),l=1-s,f=e.x,u=e.y,h=e.z,m=l*f,v=l*u;return this.set(m*f+s,m*u-a*h,m*h+a*u,0,m*u+a*h,v*u+s,v*h-a*f,0,m*h-a*u,v*h+a*f,l*h*h+s,0,0,0,0,1),this}makeScale(e,n,s){return this.set(e,0,0,0,0,n,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,n,s,a,l,f){return this.set(1,s,l,0,e,1,f,0,n,a,1,0,0,0,0,1),this}compose(e,n,s){const a=this.elements,l=n._x,f=n._y,u=n._z,h=n._w,m=l+l,v=f+f,y=u+u,x=l*m,S=l*v,M=l*y,E=f*v,_=f*y,g=u*y,L=h*m,b=h*v,D=h*y,X=s.x,O=s.y,k=s.z;return a[0]=(1-(E+g))*X,a[1]=(S+D)*X,a[2]=(M-b)*X,a[3]=0,a[4]=(S-D)*O,a[5]=(1-(x+g))*O,a[6]=(_+L)*O,a[7]=0,a[8]=(M+b)*k,a[9]=(_-L)*k,a[10]=(1-(x+E))*k,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,s){const a=this.elements;let l=Ps.set(a[0],a[1],a[2]).length();const f=Ps.set(a[4],a[5],a[6]).length(),u=Ps.set(a[8],a[9],a[10]).length();this.determinant()<0&&(l=-l),e.x=a[12],e.y=a[13],e.z=a[14],ci.copy(this);const m=1/l,v=1/f,y=1/u;return ci.elements[0]*=m,ci.elements[1]*=m,ci.elements[2]*=m,ci.elements[4]*=v,ci.elements[5]*=v,ci.elements[6]*=v,ci.elements[8]*=y,ci.elements[9]*=y,ci.elements[10]*=y,n.setFromRotationMatrix(ci),s.x=l,s.y=f,s.z=u,this}makePerspective(e,n,s,a,l,f,u=Vi){const h=this.elements,m=2*l/(n-e),v=2*l/(s-a),y=(n+e)/(n-e),x=(s+a)/(s-a);let S,M;if(u===Vi)S=-(f+l)/(f-l),M=-2*f*l/(f-l);else if(u===kl)S=-f/(f-l),M=-f*l/(f-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+u);return h[0]=m,h[4]=0,h[8]=y,h[12]=0,h[1]=0,h[5]=v,h[9]=x,h[13]=0,h[2]=0,h[6]=0,h[10]=S,h[14]=M,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,n,s,a,l,f,u=Vi){const h=this.elements,m=1/(n-e),v=1/(s-a),y=1/(f-l),x=(n+e)*m,S=(s+a)*v;let M,E;if(u===Vi)M=(f+l)*y,E=-2*y;else if(u===kl)M=l*y,E=-1*y;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+u);return h[0]=2*m,h[4]=0,h[8]=0,h[12]=-x,h[1]=0,h[5]=2*v,h[9]=0,h[13]=-S,h[2]=0,h[6]=0,h[10]=E,h[14]=-M,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const n=this.elements,s=e.elements;for(let a=0;a<16;a++)if(n[a]!==s[a])return!1;return!0}fromArray(e,n=0){for(let s=0;s<16;s++)this.elements[s]=e[s+n];return this}toArray(e=[],n=0){const s=this.elements;return e[n]=s[0],e[n+1]=s[1],e[n+2]=s[2],e[n+3]=s[3],e[n+4]=s[4],e[n+5]=s[5],e[n+6]=s[6],e[n+7]=s[7],e[n+8]=s[8],e[n+9]=s[9],e[n+10]=s[10],e[n+11]=s[11],e[n+12]=s[12],e[n+13]=s[13],e[n+14]=s[14],e[n+15]=s[15],e}}const Ps=new ae,ci=new Zt,z0=new ae(0,0,0),B0=new ae(1,1,1),vr=new ae,ul=new ae,zn=new ae,cm=new Zt,um=new qo;class Wl{constructor(e=0,n=0,s=0,a=Wl.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=s,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,s,a=this._order){return this._x=e,this._y=n,this._z=s,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,s=!0){const a=e.elements,l=a[0],f=a[4],u=a[8],h=a[1],m=a[5],v=a[9],y=a[2],x=a[6],S=a[10];switch(n){case"XYZ":this._y=Math.asin(Dn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-v,S),this._z=Math.atan2(-f,l)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-Dn(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(u,S),this._z=Math.atan2(h,m)):(this._y=Math.atan2(-y,l),this._z=0);break;case"ZXY":this._x=Math.asin(Dn(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-y,S),this._z=Math.atan2(-f,m)):(this._y=0,this._z=Math.atan2(h,l));break;case"ZYX":this._y=Math.asin(-Dn(y,-1,1)),Math.abs(y)<.9999999?(this._x=Math.atan2(x,S),this._z=Math.atan2(h,l)):(this._x=0,this._z=Math.atan2(-f,m));break;case"YZX":this._z=Math.asin(Dn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-v,m),this._y=Math.atan2(-y,l)):(this._x=0,this._y=Math.atan2(u,S));break;case"XZY":this._z=Math.asin(-Dn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(u,l)):(this._x=Math.atan2(-v,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,s){return cm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cm,n,s)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return um.setFromEuler(this),this.setFromQuaternion(um,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wl.DEFAULT_ORDER="XYZ";class Mg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let H0=0;const fm=new ae,Ls=new qo,ki=new Zt,fl=new ae,Bo=new ae,G0=new ae,V0=new qo,dm=new ae(1,0,0),hm=new ae(0,1,0),pm=new ae(0,0,1),W0={type:"added"},j0={type:"removed"};class En extends Zs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:H0++}),this.uuid=Xo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=En.DEFAULT_UP.clone();const e=new ae,n=new Wl,s=new qo,a=new ae(1,1,1);function l(){s.setFromEuler(n,!1)}function f(){n.setFromQuaternion(s,void 0,!1)}n._onChange(l),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Zt},normalMatrix:{value:new mt}}),this.matrix=new Zt,this.matrixWorld=new Zt,this.matrixAutoUpdate=En.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=En.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Mg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Ls.setFromAxisAngle(e,n),this.quaternion.multiply(Ls),this}rotateOnWorldAxis(e,n){return Ls.setFromAxisAngle(e,n),this.quaternion.premultiply(Ls),this}rotateX(e){return this.rotateOnAxis(dm,e)}rotateY(e){return this.rotateOnAxis(hm,e)}rotateZ(e){return this.rotateOnAxis(pm,e)}translateOnAxis(e,n){return fm.copy(e).applyQuaternion(this.quaternion),this.position.add(fm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(dm,e)}translateY(e){return this.translateOnAxis(hm,e)}translateZ(e){return this.translateOnAxis(pm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ki.copy(this.matrixWorld).invert())}lookAt(e,n,s){e.isVector3?fl.copy(e):fl.set(e,n,s);const a=this.parent;this.updateWorldMatrix(!0,!1),Bo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ki.lookAt(Bo,fl,this.up):ki.lookAt(fl,Bo,this.up),this.quaternion.setFromRotationMatrix(ki),a&&(ki.extractRotation(a.matrixWorld),Ls.setFromRotationMatrix(ki),this.quaternion.premultiply(Ls.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(W0)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(j0)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ki.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ki.multiply(e.parent.matrixWorld)),e.applyMatrix4(ki),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let s=0,a=this.children.length;s<a;s++){const f=this.children[s].getObjectByProperty(e,n);if(f!==void 0)return f}}getObjectsByProperty(e,n,s=[]){this[e]===n&&s.push(this);const a=this.children;for(let l=0,f=a.length;l<f;l++)a[l].getObjectsByProperty(e,n,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bo,e,G0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bo,V0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let s=0,a=n.length;s<a;s++)n[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let s=0,a=n.length;s<a;s++)n[s].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let s=0,a=n.length;s<a;s++){const l=n[s];(l.matrixWorldAutoUpdate===!0||e===!0)&&l.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const s=this.parent;if(e===!0&&s!==null&&s.matrixWorldAutoUpdate===!0&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const a=this.children;for(let l=0,f=a.length;l<f;l++){const u=a[l];u.matrixWorldAutoUpdate===!0&&u.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",s={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(u=>({boxInitialized:u.boxInitialized,boxMin:u.box.min.toArray(),boxMax:u.box.max.toArray(),sphereInitialized:u.sphereInitialized,sphereRadius:u.sphere.radius,sphereCenter:u.sphere.center.toArray()})),a.maxGeometryCount=this._maxGeometryCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function l(u,h){return u[h.uuid]===void 0&&(u[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=l(e.geometries,this.geometry);const u=this.geometry.parameters;if(u!==void 0&&u.shapes!==void 0){const h=u.shapes;if(Array.isArray(h))for(let m=0,v=h.length;m<v;m++){const y=h[m];l(e.shapes,y)}else l(e.shapes,h)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const u=[];for(let h=0,m=this.material.length;h<m;h++)u.push(l(e.materials,this.material[h]));a.material=u}else a.material=l(e.materials,this.material);if(this.children.length>0){a.children=[];for(let u=0;u<this.children.length;u++)a.children.push(this.children[u].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let u=0;u<this.animations.length;u++){const h=this.animations[u];a.animations.push(l(e.animations,h))}}if(n){const u=f(e.geometries),h=f(e.materials),m=f(e.textures),v=f(e.images),y=f(e.shapes),x=f(e.skeletons),S=f(e.animations),M=f(e.nodes);u.length>0&&(s.geometries=u),h.length>0&&(s.materials=h),m.length>0&&(s.textures=m),v.length>0&&(s.images=v),y.length>0&&(s.shapes=y),x.length>0&&(s.skeletons=x),S.length>0&&(s.animations=S),M.length>0&&(s.nodes=M)}return s.object=a,s;function f(u){const h=[];for(const m in u){const v=u[m];delete v.metadata,h.push(v)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let s=0;s<e.children.length;s++){const a=e.children[s];this.add(a.clone())}return this}}En.DEFAULT_UP=new ae(0,1,0);En.DEFAULT_MATRIX_AUTO_UPDATE=!0;En.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ui=new ae,zi=new ae,Ku=new ae,Bi=new ae,Ns=new ae,Ds=new ae,mm=new ae,Zu=new ae,Qu=new ae,Ju=new ae;let dl=!1;class fi{constructor(e=new ae,n=new ae,s=new ae){this.a=e,this.b=n,this.c=s}static getNormal(e,n,s,a){a.subVectors(s,n),ui.subVectors(e,n),a.cross(ui);const l=a.lengthSq();return l>0?a.multiplyScalar(1/Math.sqrt(l)):a.set(0,0,0)}static getBarycoord(e,n,s,a,l){ui.subVectors(a,n),zi.subVectors(s,n),Ku.subVectors(e,n);const f=ui.dot(ui),u=ui.dot(zi),h=ui.dot(Ku),m=zi.dot(zi),v=zi.dot(Ku),y=f*m-u*u;if(y===0)return l.set(0,0,0),null;const x=1/y,S=(m*h-u*v)*x,M=(f*v-u*h)*x;return l.set(1-S-M,M,S)}static containsPoint(e,n,s,a){return this.getBarycoord(e,n,s,a,Bi)===null?!1:Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getUV(e,n,s,a,l,f,u,h){return dl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),dl=!0),this.getInterpolation(e,n,s,a,l,f,u,h)}static getInterpolation(e,n,s,a,l,f,u,h){return this.getBarycoord(e,n,s,a,Bi)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(l,Bi.x),h.addScaledVector(f,Bi.y),h.addScaledVector(u,Bi.z),h)}static isFrontFacing(e,n,s,a){return ui.subVectors(s,n),zi.subVectors(e,n),ui.cross(zi).dot(a)<0}set(e,n,s){return this.a.copy(e),this.b.copy(n),this.c.copy(s),this}setFromPointsAndIndices(e,n,s,a){return this.a.copy(e[n]),this.b.copy(e[s]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,s,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ui.subVectors(this.c,this.b),zi.subVectors(this.a,this.b),ui.cross(zi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return fi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return fi.getBarycoord(e,this.a,this.b,this.c,n)}getUV(e,n,s,a,l){return dl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),dl=!0),fi.getInterpolation(e,this.a,this.b,this.c,n,s,a,l)}getInterpolation(e,n,s,a,l){return fi.getInterpolation(e,this.a,this.b,this.c,n,s,a,l)}containsPoint(e){return fi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return fi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const s=this.a,a=this.b,l=this.c;let f,u;Ns.subVectors(a,s),Ds.subVectors(l,s),Zu.subVectors(e,s);const h=Ns.dot(Zu),m=Ds.dot(Zu);if(h<=0&&m<=0)return n.copy(s);Qu.subVectors(e,a);const v=Ns.dot(Qu),y=Ds.dot(Qu);if(v>=0&&y<=v)return n.copy(a);const x=h*y-v*m;if(x<=0&&h>=0&&v<=0)return f=h/(h-v),n.copy(s).addScaledVector(Ns,f);Ju.subVectors(e,l);const S=Ns.dot(Ju),M=Ds.dot(Ju);if(M>=0&&S<=M)return n.copy(l);const E=S*m-h*M;if(E<=0&&m>=0&&M<=0)return u=m/(m-M),n.copy(s).addScaledVector(Ds,u);const _=v*M-S*y;if(_<=0&&y-v>=0&&S-M>=0)return mm.subVectors(l,a),u=(y-v)/(y-v+(S-M)),n.copy(a).addScaledVector(mm,u);const g=1/(_+E+x);return f=E*g,u=x*g,n.copy(s).addScaledVector(Ns,f).addScaledVector(Ds,u)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Eg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_r={h:0,s:0,l:0},hl={h:0,s:0,l:0};function ef(r,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(e-r)*6*n:n<1/2?e:n<2/3?r+(e-r)*6*(2/3-n):r}class Mt{constructor(e,n,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,s)}set(e,n,s){if(n===void 0&&s===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=ln){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,At.toWorkingColorSpace(this,n),this}setRGB(e,n,s,a=At.workingColorSpace){return this.r=e,this.g=n,this.b=s,At.toWorkingColorSpace(this,a),this}setHSL(e,n,s,a=At.workingColorSpace){if(e=L0(e,1),n=Dn(n,0,1),s=Dn(s,0,1),n===0)this.r=this.g=this.b=s;else{const l=s<=.5?s*(1+n):s+n-s*n,f=2*s-l;this.r=ef(f,l,e+1/3),this.g=ef(f,l,e),this.b=ef(f,l,e-1/3)}return At.toWorkingColorSpace(this,a),this}setStyle(e,n=ln){function s(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const f=a[1],u=a[2];switch(f){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return s(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,n);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return s(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,n);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return s(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=a[1],f=l.length;if(f===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(l,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=ln){const s=Eg[e.toLowerCase()];return s!==void 0?this.setHex(s,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=js(e.r),this.g=js(e.g),this.b=js(e.b),this}copyLinearToSRGB(e){return this.r=Gu(e.r),this.g=Gu(e.g),this.b=Gu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ln){return At.fromWorkingColorSpace(gn.copy(this),e),Math.round(Dn(gn.r*255,0,255))*65536+Math.round(Dn(gn.g*255,0,255))*256+Math.round(Dn(gn.b*255,0,255))}getHexString(e=ln){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=At.workingColorSpace){At.fromWorkingColorSpace(gn.copy(this),n);const s=gn.r,a=gn.g,l=gn.b,f=Math.max(s,a,l),u=Math.min(s,a,l);let h,m;const v=(u+f)/2;if(u===f)h=0,m=0;else{const y=f-u;switch(m=v<=.5?y/(f+u):y/(2-f-u),f){case s:h=(a-l)/y+(a<l?6:0);break;case a:h=(l-s)/y+2;break;case l:h=(s-a)/y+4;break}h/=6}return e.h=h,e.s=m,e.l=v,e}getRGB(e,n=At.workingColorSpace){return At.fromWorkingColorSpace(gn.copy(this),n),e.r=gn.r,e.g=gn.g,e.b=gn.b,e}getStyle(e=ln){At.fromWorkingColorSpace(gn.copy(this),e);const n=gn.r,s=gn.g,a=gn.b;return e!==ln?`color(${e} ${n.toFixed(3)} ${s.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(s*255)},${Math.round(a*255)})`}offsetHSL(e,n,s){return this.getHSL(_r),this.setHSL(_r.h+e,_r.s+n,_r.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,s){return this.r=e.r+(n.r-e.r)*s,this.g=e.g+(n.g-e.g)*s,this.b=e.b+(n.b-e.b)*s,this}lerpHSL(e,n){this.getHSL(_r),e.getHSL(hl);const s=Bu(_r.h,hl.h,n),a=Bu(_r.s,hl.s,n),l=Bu(_r.l,hl.l,n);return this.setHSL(s,a,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,s=this.g,a=this.b,l=e.elements;return this.r=l[0]*n+l[3]*s+l[6]*a,this.g=l[1]*n+l[4]*s+l[7]*a,this.b=l[2]*n+l[5]*s+l[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gn=new Mt;Mt.NAMES=Eg;let X0=0;class Qs extends Zs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:X0++}),this.uuid=Xo(),this.name="",this.type="Material",this.blending=Ws,this.side=Tr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pf,this.blendDst=mf,this.blendEquation=Yr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Mt(0,0,0),this.blendAlpha=0,this.depthFunc=Il,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ts,this.stencilZFail=Ts,this.stencilZPass=Ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const s=e[n];if(s===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(s):a&&a.isVector3&&s&&s.isVector3?a.copy(s):this[n]=s}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Ws&&(s.blending=this.blending),this.side!==Tr&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==pf&&(s.blendSrc=this.blendSrc),this.blendDst!==mf&&(s.blendDst=this.blendDst),this.blendEquation!==Yr&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Il&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==tm&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ts&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Ts&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Ts&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function a(l){const f=[];for(const u in l){const h=l[u];delete h.metadata,f.push(h)}return f}if(n){const l=a(e.textures),f=a(e.images);l.length>0&&(s.textures=l),f.length>0&&(s.images=f)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let s=null;if(n!==null){const a=n.length;s=new Array(a);for(let l=0;l!==a;++l)s[l]=n[l].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Bl extends Qs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ag,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const qt=new ae,pl=new bt;class ei{constructor(e,n,s=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=s,this.usage=nm,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Sr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,s){e*=this.itemSize,s*=n.itemSize;for(let a=0,l=this.itemSize;a<l;a++)this.array[e+a]=n.array[s+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,s=this.count;n<s;n++)pl.fromBufferAttribute(this,n),pl.applyMatrix3(e),this.setXY(n,pl.x,pl.y);else if(this.itemSize===3)for(let n=0,s=this.count;n<s;n++)qt.fromBufferAttribute(this,n),qt.applyMatrix3(e),this.setXYZ(n,qt.x,qt.y,qt.z);return this}applyMatrix4(e){for(let n=0,s=this.count;n<s;n++)qt.fromBufferAttribute(this,n),qt.applyMatrix4(e),this.setXYZ(n,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let n=0,s=this.count;n<s;n++)qt.fromBufferAttribute(this,n),qt.applyNormalMatrix(e),this.setXYZ(n,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let n=0,s=this.count;n<s;n++)qt.fromBufferAttribute(this,n),qt.transformDirection(e),this.setXYZ(n,qt.x,qt.y,qt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let s=this.array[e*this.itemSize+n];return this.normalized&&(s=Oo(s,this.array)),s}setComponent(e,n,s){return this.normalized&&(s=Nn(s,this.array)),this.array[e*this.itemSize+n]=s,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Oo(n,this.array)),n}setX(e,n){return this.normalized&&(n=Nn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Oo(n,this.array)),n}setY(e,n){return this.normalized&&(n=Nn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Oo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Nn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Oo(n,this.array)),n}setW(e,n){return this.normalized&&(n=Nn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,s){return e*=this.itemSize,this.normalized&&(n=Nn(n,this.array),s=Nn(s,this.array)),this.array[e+0]=n,this.array[e+1]=s,this}setXYZ(e,n,s,a){return e*=this.itemSize,this.normalized&&(n=Nn(n,this.array),s=Nn(s,this.array),a=Nn(a,this.array)),this.array[e+0]=n,this.array[e+1]=s,this.array[e+2]=a,this}setXYZW(e,n,s,a,l){return e*=this.itemSize,this.normalized&&(n=Nn(n,this.array),s=Nn(s,this.array),a=Nn(a,this.array),l=Nn(l,this.array)),this.array[e+0]=n,this.array[e+1]=s,this.array[e+2]=a,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==nm&&(e.usage=this.usage),e}}class wg extends ei{constructor(e,n,s){super(new Uint16Array(e),n,s)}}class Tg extends ei{constructor(e,n,s){super(new Uint32Array(e),n,s)}}class pi extends ei{constructor(e,n,s){super(new Float32Array(e),n,s)}}let q0=0;const Yn=new Zt,tf=new En,Is=new ae,Bn=new $o,Ho=new $o,sn=new ae;class ti extends Zs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:q0++}),this.uuid=Xo(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_g(e)?Tg:wg)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,s=0){this.groups.push({start:e,count:n,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const l=new mt().getNormalMatrix(e);s.applyNormalMatrix(l),s.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Yn.makeRotationFromQuaternion(e),this.applyMatrix4(Yn),this}rotateX(e){return Yn.makeRotationX(e),this.applyMatrix4(Yn),this}rotateY(e){return Yn.makeRotationY(e),this.applyMatrix4(Yn),this}rotateZ(e){return Yn.makeRotationZ(e),this.applyMatrix4(Yn),this}translate(e,n,s){return Yn.makeTranslation(e,n,s),this.applyMatrix4(Yn),this}scale(e,n,s){return Yn.makeScale(e,n,s),this.applyMatrix4(Yn),this}lookAt(e){return tf.lookAt(e),tf.updateMatrix(),this.applyMatrix4(tf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Is).negate(),this.translate(Is.x,Is.y,Is.z),this}setFromPoints(e){const n=[];for(let s=0,a=e.length;s<a;s++){const l=e[s];n.push(l.x,l.y,l.z||0)}return this.setAttribute("position",new pi(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $o);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new ae(-1/0,-1/0,-1/0),new ae(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const l=n[s];Bn.setFromBufferAttribute(l),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,Bn.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,Bn.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(Bn.min),this.boundingBox.expandByPoint(Bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new ae,1/0);return}if(e){const s=this.boundingSphere.center;if(Bn.setFromBufferAttribute(e),n)for(let l=0,f=n.length;l<f;l++){const u=n[l];Ho.setFromBufferAttribute(u),this.morphTargetsRelative?(sn.addVectors(Bn.min,Ho.min),Bn.expandByPoint(sn),sn.addVectors(Bn.max,Ho.max),Bn.expandByPoint(sn)):(Bn.expandByPoint(Ho.min),Bn.expandByPoint(Ho.max))}Bn.getCenter(s);let a=0;for(let l=0,f=e.count;l<f;l++)sn.fromBufferAttribute(e,l),a=Math.max(a,s.distanceToSquared(sn));if(n)for(let l=0,f=n.length;l<f;l++){const u=n[l],h=this.morphTargetsRelative;for(let m=0,v=u.count;m<v;m++)sn.fromBufferAttribute(u,m),h&&(Is.fromBufferAttribute(e,m),sn.add(Is)),a=Math.max(a,s.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=e.array,a=n.position.array,l=n.normal.array,f=n.uv.array,u=a.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ei(new Float32Array(4*u),4));const h=this.getAttribute("tangent").array,m=[],v=[];for(let A=0;A<u;A++)m[A]=new ae,v[A]=new ae;const y=new ae,x=new ae,S=new ae,M=new bt,E=new bt,_=new bt,g=new ae,L=new ae;function b(A,re,ee){y.fromArray(a,A*3),x.fromArray(a,re*3),S.fromArray(a,ee*3),M.fromArray(f,A*2),E.fromArray(f,re*2),_.fromArray(f,ee*2),x.sub(y),S.sub(y),E.sub(M),_.sub(M);const W=1/(E.x*_.y-_.x*E.y);isFinite(W)&&(g.copy(x).multiplyScalar(_.y).addScaledVector(S,-E.y).multiplyScalar(W),L.copy(S).multiplyScalar(E.x).addScaledVector(x,-_.x).multiplyScalar(W),m[A].add(g),m[re].add(g),m[ee].add(g),v[A].add(L),v[re].add(L),v[ee].add(L))}let D=this.groups;D.length===0&&(D=[{start:0,count:s.length}]);for(let A=0,re=D.length;A<re;++A){const ee=D[A],W=ee.start,F=ee.count;for(let Y=W,Q=W+F;Y<Q;Y+=3)b(s[Y+0],s[Y+1],s[Y+2])}const X=new ae,O=new ae,k=new ae,he=new ae;function C(A){k.fromArray(l,A*3),he.copy(k);const re=m[A];X.copy(re),X.sub(k.multiplyScalar(k.dot(re))).normalize(),O.crossVectors(he,re);const W=O.dot(v[A])<0?-1:1;h[A*4]=X.x,h[A*4+1]=X.y,h[A*4+2]=X.z,h[A*4+3]=W}for(let A=0,re=D.length;A<re;++A){const ee=D[A],W=ee.start,F=ee.count;for(let Y=W,Q=W+F;Y<Q;Y+=3)C(s[Y+0]),C(s[Y+1]),C(s[Y+2])}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new ei(new Float32Array(n.count*3),3),this.setAttribute("normal",s);else for(let x=0,S=s.count;x<S;x++)s.setXYZ(x,0,0,0);const a=new ae,l=new ae,f=new ae,u=new ae,h=new ae,m=new ae,v=new ae,y=new ae;if(e)for(let x=0,S=e.count;x<S;x+=3){const M=e.getX(x+0),E=e.getX(x+1),_=e.getX(x+2);a.fromBufferAttribute(n,M),l.fromBufferAttribute(n,E),f.fromBufferAttribute(n,_),v.subVectors(f,l),y.subVectors(a,l),v.cross(y),u.fromBufferAttribute(s,M),h.fromBufferAttribute(s,E),m.fromBufferAttribute(s,_),u.add(v),h.add(v),m.add(v),s.setXYZ(M,u.x,u.y,u.z),s.setXYZ(E,h.x,h.y,h.z),s.setXYZ(_,m.x,m.y,m.z)}else for(let x=0,S=n.count;x<S;x+=3)a.fromBufferAttribute(n,x+0),l.fromBufferAttribute(n,x+1),f.fromBufferAttribute(n,x+2),v.subVectors(f,l),y.subVectors(a,l),v.cross(y),s.setXYZ(x+0,v.x,v.y,v.z),s.setXYZ(x+1,v.x,v.y,v.z),s.setXYZ(x+2,v.x,v.y,v.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,s=e.count;n<s;n++)sn.fromBufferAttribute(e,n),sn.normalize(),e.setXYZ(n,sn.x,sn.y,sn.z)}toNonIndexed(){function e(u,h){const m=u.array,v=u.itemSize,y=u.normalized,x=new m.constructor(h.length*v);let S=0,M=0;for(let E=0,_=h.length;E<_;E++){u.isInterleavedBufferAttribute?S=h[E]*u.data.stride+u.offset:S=h[E]*v;for(let g=0;g<v;g++)x[M++]=m[S++]}return new ei(x,v,y)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new ti,s=this.index.array,a=this.attributes;for(const u in a){const h=a[u],m=e(h,s);n.setAttribute(u,m)}const l=this.morphAttributes;for(const u in l){const h=[],m=l[u];for(let v=0,y=m.length;v<y;v++){const x=m[v],S=e(x,s);h.push(S)}n.morphAttributes[u]=h}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let u=0,h=f.length;u<h;u++){const m=f[u];n.addGroup(m.start,m.count,m.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const m in h)h[m]!==void 0&&(e[m]=h[m]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const s=this.attributes;for(const h in s){const m=s[h];e.data.attributes[h]=m.toJSON(e.data)}const a={};let l=!1;for(const h in this.morphAttributes){const m=this.morphAttributes[h],v=[];for(let y=0,x=m.length;y<x;y++){const S=m[y];v.push(S.toJSON(e.data))}v.length>0&&(a[h]=v,l=!0)}l&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const u=this.boundingSphere;return u!==null&&(e.data.boundingSphere={center:u.center.toArray(),radius:u.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone(n));const a=e.attributes;for(const m in a){const v=a[m];this.setAttribute(m,v.clone(n))}const l=e.morphAttributes;for(const m in l){const v=[],y=l[m];for(let x=0,S=y.length;x<S;x++)v.push(y[x].clone(n));this.morphAttributes[m]=v}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let m=0,v=f.length;m<v;m++){const y=f[m];this.addGroup(y.start,y.count,y.materialIndex)}const u=e.boundingBox;u!==null&&(this.boundingBox=u.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const gm=new Zt,Wr=new Pf,ml=new Yo,vm=new ae,Us=new ae,Fs=new ae,Os=new ae,nf=new ae,gl=new ae,vl=new bt,_l=new bt,xl=new bt,_m=new ae,xm=new ae,ym=new ae,yl=new ae,Sl=new ae;class Mi extends En{constructor(e=new ti,n=new Bl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const a=n[s[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,f=a.length;l<f;l++){const u=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=l}}}}getVertexPosition(e,n){const s=this.geometry,a=s.attributes.position,l=s.morphAttributes.position,f=s.morphTargetsRelative;n.fromBufferAttribute(a,e);const u=this.morphTargetInfluences;if(l&&u){gl.set(0,0,0);for(let h=0,m=l.length;h<m;h++){const v=u[h],y=l[h];v!==0&&(nf.fromBufferAttribute(y,e),f?gl.addScaledVector(nf,v):gl.addScaledVector(nf.sub(n),v))}n.add(gl)}return n}raycast(e,n){const s=this.geometry,a=this.material,l=this.matrixWorld;a!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),ml.copy(s.boundingSphere),ml.applyMatrix4(l),Wr.copy(e.ray).recast(e.near),!(ml.containsPoint(Wr.origin)===!1&&(Wr.intersectSphere(ml,vm)===null||Wr.origin.distanceToSquared(vm)>(e.far-e.near)**2))&&(gm.copy(l).invert(),Wr.copy(e.ray).applyMatrix4(gm),!(s.boundingBox!==null&&Wr.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,n,Wr)))}_computeIntersections(e,n,s){let a;const l=this.geometry,f=this.material,u=l.index,h=l.attributes.position,m=l.attributes.uv,v=l.attributes.uv1,y=l.attributes.normal,x=l.groups,S=l.drawRange;if(u!==null)if(Array.isArray(f))for(let M=0,E=x.length;M<E;M++){const _=x[M],g=f[_.materialIndex],L=Math.max(_.start,S.start),b=Math.min(u.count,Math.min(_.start+_.count,S.start+S.count));for(let D=L,X=b;D<X;D+=3){const O=u.getX(D),k=u.getX(D+1),he=u.getX(D+2);a=Ml(this,g,e,s,m,v,y,O,k,he),a&&(a.faceIndex=Math.floor(D/3),a.face.materialIndex=_.materialIndex,n.push(a))}}else{const M=Math.max(0,S.start),E=Math.min(u.count,S.start+S.count);for(let _=M,g=E;_<g;_+=3){const L=u.getX(_),b=u.getX(_+1),D=u.getX(_+2);a=Ml(this,f,e,s,m,v,y,L,b,D),a&&(a.faceIndex=Math.floor(_/3),n.push(a))}}else if(h!==void 0)if(Array.isArray(f))for(let M=0,E=x.length;M<E;M++){const _=x[M],g=f[_.materialIndex],L=Math.max(_.start,S.start),b=Math.min(h.count,Math.min(_.start+_.count,S.start+S.count));for(let D=L,X=b;D<X;D+=3){const O=D,k=D+1,he=D+2;a=Ml(this,g,e,s,m,v,y,O,k,he),a&&(a.faceIndex=Math.floor(D/3),a.face.materialIndex=_.materialIndex,n.push(a))}}else{const M=Math.max(0,S.start),E=Math.min(h.count,S.start+S.count);for(let _=M,g=E;_<g;_+=3){const L=_,b=_+1,D=_+2;a=Ml(this,f,e,s,m,v,y,L,b,D),a&&(a.faceIndex=Math.floor(_/3),n.push(a))}}}}function $0(r,e,n,s,a,l,f,u){let h;if(e.side===In?h=s.intersectTriangle(f,l,a,!0,u):h=s.intersectTriangle(a,l,f,e.side===Tr,u),h===null)return null;Sl.copy(u),Sl.applyMatrix4(r.matrixWorld);const m=n.ray.origin.distanceTo(Sl);return m<n.near||m>n.far?null:{distance:m,point:Sl.clone(),object:r}}function Ml(r,e,n,s,a,l,f,u,h,m){r.getVertexPosition(u,Us),r.getVertexPosition(h,Fs),r.getVertexPosition(m,Os);const v=$0(r,e,n,s,Us,Fs,Os,yl);if(v){a&&(vl.fromBufferAttribute(a,u),_l.fromBufferAttribute(a,h),xl.fromBufferAttribute(a,m),v.uv=fi.getInterpolation(yl,Us,Fs,Os,vl,_l,xl,new bt)),l&&(vl.fromBufferAttribute(l,u),_l.fromBufferAttribute(l,h),xl.fromBufferAttribute(l,m),v.uv1=fi.getInterpolation(yl,Us,Fs,Os,vl,_l,xl,new bt),v.uv2=v.uv1),f&&(_m.fromBufferAttribute(f,u),xm.fromBufferAttribute(f,h),ym.fromBufferAttribute(f,m),v.normal=fi.getInterpolation(yl,Us,Fs,Os,_m,xm,ym,new ae),v.normal.dot(s.direction)>0&&v.normal.multiplyScalar(-1));const y={a:u,b:h,c:m,normal:new ae,materialIndex:0};fi.getNormal(Us,Fs,Os,y.normal),v.face=y}return v}class Ko extends ti{constructor(e=1,n=1,s=1,a=1,l=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:s,widthSegments:a,heightSegments:l,depthSegments:f};const u=this;a=Math.floor(a),l=Math.floor(l),f=Math.floor(f);const h=[],m=[],v=[],y=[];let x=0,S=0;M("z","y","x",-1,-1,s,n,e,f,l,0),M("z","y","x",1,-1,s,n,-e,f,l,1),M("x","z","y",1,1,e,s,n,a,f,2),M("x","z","y",1,-1,e,s,-n,a,f,3),M("x","y","z",1,-1,e,n,s,a,l,4),M("x","y","z",-1,-1,e,n,-s,a,l,5),this.setIndex(h),this.setAttribute("position",new pi(m,3)),this.setAttribute("normal",new pi(v,3)),this.setAttribute("uv",new pi(y,2));function M(E,_,g,L,b,D,X,O,k,he,C){const A=D/k,re=X/he,ee=D/2,W=X/2,F=O/2,Y=k+1,Q=he+1;let ie=0,V=0;const z=new ae;for(let j=0;j<Q;j++){const N=j*re-W;for(let $=0;$<Y;$++){const Z=$*A-ee;z[E]=Z*L,z[_]=N*b,z[g]=F,m.push(z.x,z.y,z.z),z[E]=0,z[_]=0,z[g]=O>0?1:-1,v.push(z.x,z.y,z.z),y.push($/k),y.push(1-j/he),ie+=1}}for(let j=0;j<he;j++)for(let N=0;N<k;N++){const $=x+N+Y*j,Z=x+N+Y*(j+1),de=x+(N+1)+Y*(j+1),me=x+(N+1)+Y*j;h.push($,Z,me),h.push(Z,de,me),V+=6}u.addGroup(S,V,C),S+=V,x+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ko(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ys(r){const e={};for(const n in r){e[n]={};for(const s in r[n]){const a=r[n][s];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][s]=null):e[n][s]=a.clone():Array.isArray(a)?e[n][s]=a.slice():e[n][s]=a}}return e}function Sn(r){const e={};for(let n=0;n<r.length;n++){const s=Ys(r[n]);for(const a in s)e[a]=s[a]}return e}function Y0(r){const e=[];for(let n=0;n<r.length;n++)e.push(r[n].clone());return e}function Ag(r){return r.getRenderTarget()===null?r.outputColorSpace:At.workingColorSpace}const K0={clone:Ys,merge:Sn};var Z0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Q0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ts extends Qs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Z0,this.fragmentShader=Q0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ys(e.uniforms),this.uniformsGroups=Y0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const f=this.uniforms[a].value;f&&f.isTexture?n.uniforms[a]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?n.uniforms[a]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[a]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[a]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[a]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[a]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[a]={type:"m4",value:f.toArray()}:n.uniforms[a]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const s={};for(const a in this.extensions)this.extensions[a]===!0&&(s[a]=!0);return Object.keys(s).length>0&&(n.extensions=s),n}}class bg extends En{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Zt,this.projectionMatrix=new Zt,this.projectionMatrixInverse=new Zt,this.coordinateSystem=Vi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Zn extends bg{constructor(e=50,n=1,s=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Sf*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Sf*2*Math.atan(Math.tan(zu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,n,s,a,l,f){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=s,this.view.offsetY=a,this.view.width=l,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(zu*.5*this.fov)/this.zoom,s=2*n,a=this.aspect*s,l=-.5*a;const f=this.view;if(this.view!==null&&this.view.enabled){const h=f.fullWidth,m=f.fullHeight;l+=f.offsetX*a/h,n-=f.offsetY*s/m,a*=f.width/h,s*=f.height/m}const u=this.filmOffset;u!==0&&(l+=e*u/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+a,n,n-s,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const ks=-90,zs=1;class J0 extends En{constructor(e,n,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Zn(ks,zs,e,n);a.layers=this.layers,this.add(a);const l=new Zn(ks,zs,e,n);l.layers=this.layers,this.add(l);const f=new Zn(ks,zs,e,n);f.layers=this.layers,this.add(f);const u=new Zn(ks,zs,e,n);u.layers=this.layers,this.add(u);const h=new Zn(ks,zs,e,n);h.layers=this.layers,this.add(h);const m=new Zn(ks,zs,e,n);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[s,a,l,f,u,h]=n;for(const m of n)this.remove(m);if(e===Vi)s.up.set(0,1,0),s.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),u.up.set(0,1,0),u.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===kl)s.up.set(0,-1,0),s.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),u.up.set(0,-1,0),u.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of n)this.add(m),m.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,f,u,h,m,v]=this.children,y=e.getRenderTarget(),x=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const E=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,e.setRenderTarget(s,0,a),e.render(n,l),e.setRenderTarget(s,1,a),e.render(n,f),e.setRenderTarget(s,2,a),e.render(n,u),e.setRenderTarget(s,3,a),e.render(n,h),e.setRenderTarget(s,4,a),e.render(n,m),s.texture.generateMipmaps=E,e.setRenderTarget(s,5,a),e.render(n,v),e.setRenderTarget(y,x,S),e.xr.enabled=M,s.texture.needsPMREMUpdate=!0}}class Cg extends Hn{constructor(e,n,s,a,l,f,u,h,m,v){e=e!==void 0?e:[],n=n!==void 0?n:Xs,super(e,n,s,a,l,f,u,h,m,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ey extends es{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},a=[s,s,s,s,s,s];n.encoding!==void 0&&(Vo("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Jr?ln:Jn),this.texture=new Cg(a,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Kn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new Ko(5,5,5),l=new ts({name:"CubemapFromEquirect",uniforms:Ys(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:In,blending:Mr});l.uniforms.tEquirect.value=n;const f=new Mi(a,l),u=n.minFilter;return n.minFilter===Wo&&(n.minFilter=Kn),new J0(1,10,this).update(e,f),n.minFilter=u,f.geometry.dispose(),f.material.dispose(),this}clear(e,n,s,a){const l=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(n,s,a);e.setRenderTarget(l)}}const rf=new ae,ty=new ae,ny=new mt;class qr{constructor(e=new ae(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,s,a){return this.normal.set(e,n,s),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,s){const a=rf.subVectors(s,n).cross(ty.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const s=e.delta(rf),a=this.normal.dot(s);if(a===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/a;return l<0||l>1?null:n.copy(e.start).addScaledVector(s,l)}intersectsLine(e){const n=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return n<0&&s>0||s<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const s=n||ny.getNormalMatrix(e),a=this.coplanarPoint(rf).applyMatrix4(e),l=this.normal.applyMatrix3(s).normalize();return this.constant=-a.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jr=new Yo,El=new ae;class Rg{constructor(e=new qr,n=new qr,s=new qr,a=new qr,l=new qr,f=new qr){this.planes=[e,n,s,a,l,f]}set(e,n,s,a,l,f){const u=this.planes;return u[0].copy(e),u[1].copy(n),u[2].copy(s),u[3].copy(a),u[4].copy(l),u[5].copy(f),this}copy(e){const n=this.planes;for(let s=0;s<6;s++)n[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,n=Vi){const s=this.planes,a=e.elements,l=a[0],f=a[1],u=a[2],h=a[3],m=a[4],v=a[5],y=a[6],x=a[7],S=a[8],M=a[9],E=a[10],_=a[11],g=a[12],L=a[13],b=a[14],D=a[15];if(s[0].setComponents(h-l,x-m,_-S,D-g).normalize(),s[1].setComponents(h+l,x+m,_+S,D+g).normalize(),s[2].setComponents(h+f,x+v,_+M,D+L).normalize(),s[3].setComponents(h-f,x-v,_-M,D-L).normalize(),s[4].setComponents(h-u,x-y,_-E,D-b).normalize(),n===Vi)s[5].setComponents(h+u,x+y,_+E,D+b).normalize();else if(n===kl)s[5].setComponents(u,y,E,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),jr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),jr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(jr)}intersectsSprite(e){return jr.center.set(0,0,0),jr.radius=.7071067811865476,jr.applyMatrix4(e.matrixWorld),this.intersectsSphere(jr)}intersectsSphere(e){const n=this.planes,s=e.center,a=-e.radius;for(let l=0;l<6;l++)if(n[l].distanceToPoint(s)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let s=0;s<6;s++){const a=n[s];if(El.x=a.normal.x>0?e.max.x:e.min.x,El.y=a.normal.y>0?e.max.y:e.min.y,El.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(El)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let s=0;s<6;s++)if(n[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Pg(){let r=null,e=!1,n=null,s=null;function a(l,f){n(l,f),s=r.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&(s=r.requestAnimationFrame(a),e=!0)},stop:function(){r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(l){n=l},setContext:function(l){r=l}}}function iy(r,e){const n=e.isWebGL2,s=new WeakMap;function a(m,v){const y=m.array,x=m.usage,S=y.byteLength,M=r.createBuffer();r.bindBuffer(v,M),r.bufferData(v,y,x),m.onUploadCallback();let E;if(y instanceof Float32Array)E=r.FLOAT;else if(y instanceof Uint16Array)if(m.isFloat16BufferAttribute)if(n)E=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else E=r.UNSIGNED_SHORT;else if(y instanceof Int16Array)E=r.SHORT;else if(y instanceof Uint32Array)E=r.UNSIGNED_INT;else if(y instanceof Int32Array)E=r.INT;else if(y instanceof Int8Array)E=r.BYTE;else if(y instanceof Uint8Array)E=r.UNSIGNED_BYTE;else if(y instanceof Uint8ClampedArray)E=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+y);return{buffer:M,type:E,bytesPerElement:y.BYTES_PER_ELEMENT,version:m.version,size:S}}function l(m,v,y){const x=v.array,S=v._updateRange,M=v.updateRanges;if(r.bindBuffer(y,m),S.count===-1&&M.length===0&&r.bufferSubData(y,0,x),M.length!==0){for(let E=0,_=M.length;E<_;E++){const g=M[E];n?r.bufferSubData(y,g.start*x.BYTES_PER_ELEMENT,x,g.start,g.count):r.bufferSubData(y,g.start*x.BYTES_PER_ELEMENT,x.subarray(g.start,g.start+g.count))}v.clearUpdateRanges()}S.count!==-1&&(n?r.bufferSubData(y,S.offset*x.BYTES_PER_ELEMENT,x,S.offset,S.count):r.bufferSubData(y,S.offset*x.BYTES_PER_ELEMENT,x.subarray(S.offset,S.offset+S.count)),S.count=-1),v.onUploadCallback()}function f(m){return m.isInterleavedBufferAttribute&&(m=m.data),s.get(m)}function u(m){m.isInterleavedBufferAttribute&&(m=m.data);const v=s.get(m);v&&(r.deleteBuffer(v.buffer),s.delete(m))}function h(m,v){if(m.isGLBufferAttribute){const x=s.get(m);(!x||x.version<m.version)&&s.set(m,{buffer:m.buffer,type:m.type,bytesPerElement:m.elementSize,version:m.version});return}m.isInterleavedBufferAttribute&&(m=m.data);const y=s.get(m);if(y===void 0)s.set(m,a(m,v));else if(y.version<m.version){if(y.size!==m.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");l(y.buffer,m,v),y.version=m.version}}return{get:f,remove:u,update:h}}class Lf extends ti{constructor(e=1,n=1,s=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:s,heightSegments:a};const l=e/2,f=n/2,u=Math.floor(s),h=Math.floor(a),m=u+1,v=h+1,y=e/u,x=n/h,S=[],M=[],E=[],_=[];for(let g=0;g<v;g++){const L=g*x-f;for(let b=0;b<m;b++){const D=b*y-l;M.push(D,-L,0),E.push(0,0,1),_.push(b/u),_.push(1-g/h)}}for(let g=0;g<h;g++)for(let L=0;L<u;L++){const b=L+m*g,D=L+m*(g+1),X=L+1+m*(g+1),O=L+1+m*g;S.push(b,D,O),S.push(D,X,O)}this.setIndex(S),this.setAttribute("position",new pi(M,3)),this.setAttribute("normal",new pi(E,3)),this.setAttribute("uv",new pi(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lf(e.width,e.height,e.widthSegments,e.heightSegments)}}var ry=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,oy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ay=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ly=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,cy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,fy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dy=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,py=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,my=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,vy=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,_y=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,xy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,yy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,My=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ey=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,wy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ty=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Ay=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,by=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Cy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ry=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Py=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ly=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ny=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Dy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Iy="gl_FragColor = linearToOutputTexel( gl_FragColor );",Uy=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Fy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Oy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ky=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,zy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,By=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Hy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Xy=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,qy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$y=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ky=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Zy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Qy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,eS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,tS=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,nS=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,iS=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,rS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,sS=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,oS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,aS=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lS=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cS=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,uS=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,fS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,dS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,pS=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vS=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_S=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,xS=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,yS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,SS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,MS=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ES=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,TS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,AS=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,bS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,CS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,RS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,PS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,LS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,NS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,DS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,IS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,US=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,FS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,OS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,BS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,HS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,GS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,VS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,WS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,XS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$S=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,YS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,KS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ZS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,QS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,JS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,eM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,nM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const iM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,oM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,uM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,fM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,dM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,hM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_M=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,MM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,EM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,wM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,TM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,AM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,CM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,RM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,PM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,LM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,NM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,DM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,IM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,UM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,FM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ht={alphahash_fragment:ry,alphahash_pars_fragment:sy,alphamap_fragment:oy,alphamap_pars_fragment:ay,alphatest_fragment:ly,alphatest_pars_fragment:cy,aomap_fragment:uy,aomap_pars_fragment:fy,batching_pars_vertex:dy,batching_vertex:hy,begin_vertex:py,beginnormal_vertex:my,bsdfs:gy,iridescence_fragment:vy,bumpmap_pars_fragment:_y,clipping_planes_fragment:xy,clipping_planes_pars_fragment:yy,clipping_planes_pars_vertex:Sy,clipping_planes_vertex:My,color_fragment:Ey,color_pars_fragment:wy,color_pars_vertex:Ty,color_vertex:Ay,common:by,cube_uv_reflection_fragment:Cy,defaultnormal_vertex:Ry,displacementmap_pars_vertex:Py,displacementmap_vertex:Ly,emissivemap_fragment:Ny,emissivemap_pars_fragment:Dy,colorspace_fragment:Iy,colorspace_pars_fragment:Uy,envmap_fragment:Fy,envmap_common_pars_fragment:Oy,envmap_pars_fragment:ky,envmap_pars_vertex:zy,envmap_physical_pars_fragment:Zy,envmap_vertex:By,fog_vertex:Hy,fog_pars_vertex:Gy,fog_fragment:Vy,fog_pars_fragment:Wy,gradientmap_pars_fragment:jy,lightmap_fragment:Xy,lightmap_pars_fragment:qy,lights_lambert_fragment:$y,lights_lambert_pars_fragment:Yy,lights_pars_begin:Ky,lights_toon_fragment:Qy,lights_toon_pars_fragment:Jy,lights_phong_fragment:eS,lights_phong_pars_fragment:tS,lights_physical_fragment:nS,lights_physical_pars_fragment:iS,lights_fragment_begin:rS,lights_fragment_maps:sS,lights_fragment_end:oS,logdepthbuf_fragment:aS,logdepthbuf_pars_fragment:lS,logdepthbuf_pars_vertex:cS,logdepthbuf_vertex:uS,map_fragment:fS,map_pars_fragment:dS,map_particle_fragment:hS,map_particle_pars_fragment:pS,metalnessmap_fragment:mS,metalnessmap_pars_fragment:gS,morphcolor_vertex:vS,morphnormal_vertex:_S,morphtarget_pars_vertex:xS,morphtarget_vertex:yS,normal_fragment_begin:SS,normal_fragment_maps:MS,normal_pars_fragment:ES,normal_pars_vertex:wS,normal_vertex:TS,normalmap_pars_fragment:AS,clearcoat_normal_fragment_begin:bS,clearcoat_normal_fragment_maps:CS,clearcoat_pars_fragment:RS,iridescence_pars_fragment:PS,opaque_fragment:LS,packing:NS,premultiplied_alpha_fragment:DS,project_vertex:IS,dithering_fragment:US,dithering_pars_fragment:FS,roughnessmap_fragment:OS,roughnessmap_pars_fragment:kS,shadowmap_pars_fragment:zS,shadowmap_pars_vertex:BS,shadowmap_vertex:HS,shadowmask_pars_fragment:GS,skinbase_vertex:VS,skinning_pars_vertex:WS,skinning_vertex:jS,skinnormal_vertex:XS,specularmap_fragment:qS,specularmap_pars_fragment:$S,tonemapping_fragment:YS,tonemapping_pars_fragment:KS,transmission_fragment:ZS,transmission_pars_fragment:QS,uv_pars_fragment:JS,uv_pars_vertex:eM,uv_vertex:tM,worldpos_vertex:nM,background_vert:iM,background_frag:rM,backgroundCube_vert:sM,backgroundCube_frag:oM,cube_vert:aM,cube_frag:lM,depth_vert:cM,depth_frag:uM,distanceRGBA_vert:fM,distanceRGBA_frag:dM,equirect_vert:hM,equirect_frag:pM,linedashed_vert:mM,linedashed_frag:gM,meshbasic_vert:vM,meshbasic_frag:_M,meshlambert_vert:xM,meshlambert_frag:yM,meshmatcap_vert:SM,meshmatcap_frag:MM,meshnormal_vert:EM,meshnormal_frag:wM,meshphong_vert:TM,meshphong_frag:AM,meshphysical_vert:bM,meshphysical_frag:CM,meshtoon_vert:RM,meshtoon_frag:PM,points_vert:LM,points_frag:NM,shadow_vert:DM,shadow_frag:IM,sprite_vert:UM,sprite_frag:FM},De={common:{diffuse:{value:new Mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new mt},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new mt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new mt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new mt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new mt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new mt},normalScale:{value:new bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new mt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new mt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new mt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new mt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0},uvTransform:{value:new mt}},sprite:{diffuse:{value:new Mt(16777215)},opacity:{value:1},center:{value:new bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new mt},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0}}},Si={basic:{uniforms:Sn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:Sn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Mt(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:Sn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Mt(0)},specular:{value:new Mt(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:Sn([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new Mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:Sn([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new Mt(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:Sn([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:Sn([De.points,De.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:Sn([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:Sn([De.common,De.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:Sn([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:Sn([De.sprite,De.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new mt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:Sn([De.common,De.displacementmap,{referencePosition:{value:new ae},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:Sn([De.lights,De.fog,{color:{value:new Mt(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};Si.physical={uniforms:Sn([Si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new mt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new mt},clearcoatNormalScale:{value:new bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new mt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new mt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new mt},sheen:{value:0},sheenColor:{value:new Mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new mt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new mt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new mt},transmissionSamplerSize:{value:new bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new mt},attenuationDistance:{value:0},attenuationColor:{value:new Mt(0)},specularColor:{value:new Mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new mt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new mt},anisotropyVector:{value:new bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new mt}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const wl={r:0,b:0,g:0};function OM(r,e,n,s,a,l,f){const u=new Mt(0);let h=l===!0?0:1,m,v,y=null,x=0,S=null;function M(_,g){let L=!1,b=g.isScene===!0?g.background:null;b&&b.isTexture&&(b=(g.backgroundBlurriness>0?n:e).get(b)),b===null?E(u,h):b&&b.isColor&&(E(b,1),L=!0);const D=r.xr.getEnvironmentBlendMode();D==="additive"?s.buffers.color.setClear(0,0,0,1,f):D==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,f),(r.autoClear||L)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),b&&(b.isCubeTexture||b.mapping===Gl)?(v===void 0&&(v=new Mi(new Ko(1,1,1),new ts({name:"BackgroundCubeMaterial",uniforms:Ys(Si.backgroundCube.uniforms),vertexShader:Si.backgroundCube.vertexShader,fragmentShader:Si.backgroundCube.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1})),v.geometry.deleteAttribute("normal"),v.geometry.deleteAttribute("uv"),v.onBeforeRender=function(X,O,k){this.matrixWorld.copyPosition(k.matrixWorld)},Object.defineProperty(v.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(v)),v.material.uniforms.envMap.value=b,v.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,v.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,v.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,v.material.toneMapped=At.getTransfer(b.colorSpace)!==It,(y!==b||x!==b.version||S!==r.toneMapping)&&(v.material.needsUpdate=!0,y=b,x=b.version,S=r.toneMapping),v.layers.enableAll(),_.unshift(v,v.geometry,v.material,0,0,null)):b&&b.isTexture&&(m===void 0&&(m=new Mi(new Lf(2,2),new ts({name:"BackgroundMaterial",uniforms:Ys(Si.background.uniforms),vertexShader:Si.background.vertexShader,fragmentShader:Si.background.fragmentShader,side:Tr,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=b,m.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,m.material.toneMapped=At.getTransfer(b.colorSpace)!==It,b.matrixAutoUpdate===!0&&b.updateMatrix(),m.material.uniforms.uvTransform.value.copy(b.matrix),(y!==b||x!==b.version||S!==r.toneMapping)&&(m.material.needsUpdate=!0,y=b,x=b.version,S=r.toneMapping),m.layers.enableAll(),_.unshift(m,m.geometry,m.material,0,0,null))}function E(_,g){_.getRGB(wl,Ag(r)),s.buffers.color.setClear(wl.r,wl.g,wl.b,g,f)}return{getClearColor:function(){return u},setClearColor:function(_,g=1){u.set(_),h=g,E(u,h)},getClearAlpha:function(){return h},setClearAlpha:function(_){h=_,E(u,h)},render:M}}function kM(r,e,n,s){const a=r.getParameter(r.MAX_VERTEX_ATTRIBS),l=s.isWebGL2?null:e.get("OES_vertex_array_object"),f=s.isWebGL2||l!==null,u={},h=_(null);let m=h,v=!1;function y(F,Y,Q,ie,V){let z=!1;if(f){const j=E(ie,Q,Y);m!==j&&(m=j,S(m.object)),z=g(F,ie,Q,V),z&&L(F,ie,Q,V)}else{const j=Y.wireframe===!0;(m.geometry!==ie.id||m.program!==Q.id||m.wireframe!==j)&&(m.geometry=ie.id,m.program=Q.id,m.wireframe=j,z=!0)}V!==null&&n.update(V,r.ELEMENT_ARRAY_BUFFER),(z||v)&&(v=!1,he(F,Y,Q,ie),V!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,n.get(V).buffer))}function x(){return s.isWebGL2?r.createVertexArray():l.createVertexArrayOES()}function S(F){return s.isWebGL2?r.bindVertexArray(F):l.bindVertexArrayOES(F)}function M(F){return s.isWebGL2?r.deleteVertexArray(F):l.deleteVertexArrayOES(F)}function E(F,Y,Q){const ie=Q.wireframe===!0;let V=u[F.id];V===void 0&&(V={},u[F.id]=V);let z=V[Y.id];z===void 0&&(z={},V[Y.id]=z);let j=z[ie];return j===void 0&&(j=_(x()),z[ie]=j),j}function _(F){const Y=[],Q=[],ie=[];for(let V=0;V<a;V++)Y[V]=0,Q[V]=0,ie[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Y,enabledAttributes:Q,attributeDivisors:ie,object:F,attributes:{},index:null}}function g(F,Y,Q,ie){const V=m.attributes,z=Y.attributes;let j=0;const N=Q.getAttributes();for(const $ in N)if(N[$].location>=0){const de=V[$];let me=z[$];if(me===void 0&&($==="instanceMatrix"&&F.instanceMatrix&&(me=F.instanceMatrix),$==="instanceColor"&&F.instanceColor&&(me=F.instanceColor)),de===void 0||de.attribute!==me||me&&de.data!==me.data)return!0;j++}return m.attributesNum!==j||m.index!==ie}function L(F,Y,Q,ie){const V={},z=Y.attributes;let j=0;const N=Q.getAttributes();for(const $ in N)if(N[$].location>=0){let de=z[$];de===void 0&&($==="instanceMatrix"&&F.instanceMatrix&&(de=F.instanceMatrix),$==="instanceColor"&&F.instanceColor&&(de=F.instanceColor));const me={};me.attribute=de,de&&de.data&&(me.data=de.data),V[$]=me,j++}m.attributes=V,m.attributesNum=j,m.index=ie}function b(){const F=m.newAttributes;for(let Y=0,Q=F.length;Y<Q;Y++)F[Y]=0}function D(F){X(F,0)}function X(F,Y){const Q=m.newAttributes,ie=m.enabledAttributes,V=m.attributeDivisors;Q[F]=1,ie[F]===0&&(r.enableVertexAttribArray(F),ie[F]=1),V[F]!==Y&&((s.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[s.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](F,Y),V[F]=Y)}function O(){const F=m.newAttributes,Y=m.enabledAttributes;for(let Q=0,ie=Y.length;Q<ie;Q++)Y[Q]!==F[Q]&&(r.disableVertexAttribArray(Q),Y[Q]=0)}function k(F,Y,Q,ie,V,z,j){j===!0?r.vertexAttribIPointer(F,Y,Q,V,z):r.vertexAttribPointer(F,Y,Q,ie,V,z)}function he(F,Y,Q,ie){if(s.isWebGL2===!1&&(F.isInstancedMesh||ie.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;b();const V=ie.attributes,z=Q.getAttributes(),j=Y.defaultAttributeValues;for(const N in z){const $=z[N];if($.location>=0){let Z=V[N];if(Z===void 0&&(N==="instanceMatrix"&&F.instanceMatrix&&(Z=F.instanceMatrix),N==="instanceColor"&&F.instanceColor&&(Z=F.instanceColor)),Z!==void 0){const de=Z.normalized,me=Z.itemSize,Me=n.get(Z);if(Me===void 0)continue;const Te=Me.buffer,Ae=Me.type,ze=Me.bytesPerElement,Ve=s.isWebGL2===!0&&(Ae===r.INT||Ae===r.UNSIGNED_INT||Z.gpuType===cg);if(Z.isInterleavedBufferAttribute){const Pe=Z.data,ne=Pe.stride,kt=Z.offset;if(Pe.isInstancedInterleavedBuffer){for(let Ce=0;Ce<$.locationSize;Ce++)X($.location+Ce,Pe.meshPerAttribute);F.isInstancedMesh!==!0&&ie._maxInstanceCount===void 0&&(ie._maxInstanceCount=Pe.meshPerAttribute*Pe.count)}else for(let Ce=0;Ce<$.locationSize;Ce++)D($.location+Ce);r.bindBuffer(r.ARRAY_BUFFER,Te);for(let Ce=0;Ce<$.locationSize;Ce++)k($.location+Ce,me/$.locationSize,Ae,de,ne*ze,(kt+me/$.locationSize*Ce)*ze,Ve)}else{if(Z.isInstancedBufferAttribute){for(let Pe=0;Pe<$.locationSize;Pe++)X($.location+Pe,Z.meshPerAttribute);F.isInstancedMesh!==!0&&ie._maxInstanceCount===void 0&&(ie._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Pe=0;Pe<$.locationSize;Pe++)D($.location+Pe);r.bindBuffer(r.ARRAY_BUFFER,Te);for(let Pe=0;Pe<$.locationSize;Pe++)k($.location+Pe,me/$.locationSize,Ae,de,me*ze,me/$.locationSize*Pe*ze,Ve)}}else if(j!==void 0){const de=j[N];if(de!==void 0)switch(de.length){case 2:r.vertexAttrib2fv($.location,de);break;case 3:r.vertexAttrib3fv($.location,de);break;case 4:r.vertexAttrib4fv($.location,de);break;default:r.vertexAttrib1fv($.location,de)}}}}O()}function C(){ee();for(const F in u){const Y=u[F];for(const Q in Y){const ie=Y[Q];for(const V in ie)M(ie[V].object),delete ie[V];delete Y[Q]}delete u[F]}}function A(F){if(u[F.id]===void 0)return;const Y=u[F.id];for(const Q in Y){const ie=Y[Q];for(const V in ie)M(ie[V].object),delete ie[V];delete Y[Q]}delete u[F.id]}function re(F){for(const Y in u){const Q=u[Y];if(Q[F.id]===void 0)continue;const ie=Q[F.id];for(const V in ie)M(ie[V].object),delete ie[V];delete Q[F.id]}}function ee(){W(),v=!0,m!==h&&(m=h,S(m.object))}function W(){h.geometry=null,h.program=null,h.wireframe=!1}return{setup:y,reset:ee,resetDefaultState:W,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:re,initAttributes:b,enableAttribute:D,disableUnusedAttributes:O}}function zM(r,e,n,s){const a=s.isWebGL2;let l;function f(v){l=v}function u(v,y){r.drawArrays(l,v,y),n.update(y,l,1)}function h(v,y,x){if(x===0)return;let S,M;if(a)S=r,M="drawArraysInstanced";else if(S=e.get("ANGLE_instanced_arrays"),M="drawArraysInstancedANGLE",S===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}S[M](l,v,y,x),n.update(y,l,x)}function m(v,y,x){if(x===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let M=0;M<x;M++)this.render(v[M],y[M]);else{S.multiDrawArraysWEBGL(l,v,0,y,0,x);let M=0;for(let E=0;E<x;E++)M+=y[E];n.update(M,l,1)}}this.setMode=f,this.render=u,this.renderInstances=h,this.renderMultiDraw=m}function BM(r,e,n){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const k=e.get("EXT_texture_filter_anisotropic");s=r.getParameter(k.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function l(k){if(k==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";k="mediump"}return k==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const f=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let u=n.precision!==void 0?n.precision:"highp";const h=l(u);h!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",h,"instead."),u=h);const m=f||e.has("WEBGL_draw_buffers"),v=n.logarithmicDepthBuffer===!0,y=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=r.getParameter(r.MAX_TEXTURE_SIZE),M=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),E=r.getParameter(r.MAX_VERTEX_ATTRIBS),_=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),g=r.getParameter(r.MAX_VARYING_VECTORS),L=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),b=x>0,D=f||e.has("OES_texture_float"),X=b&&D,O=f?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:f,drawBuffers:m,getMaxAnisotropy:a,getMaxPrecision:l,precision:u,logarithmicDepthBuffer:v,maxTextures:y,maxVertexTextures:x,maxTextureSize:S,maxCubemapSize:M,maxAttributes:E,maxVertexUniforms:_,maxVaryings:g,maxFragmentUniforms:L,vertexTextures:b,floatFragmentTextures:D,floatVertexTextures:X,maxSamples:O}}function HM(r){const e=this;let n=null,s=0,a=!1,l=!1;const f=new qr,u=new mt,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(y,x){const S=y.length!==0||x||s!==0||a;return a=x,s=y.length,S},this.beginShadows=function(){l=!0,v(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(y,x){n=v(y,x,0)},this.setState=function(y,x,S){const M=y.clippingPlanes,E=y.clipIntersection,_=y.clipShadows,g=r.get(y);if(!a||M===null||M.length===0||l&&!_)l?v(null):m();else{const L=l?0:s,b=L*4;let D=g.clippingState||null;h.value=D,D=v(M,x,b,S);for(let X=0;X!==b;++X)D[X]=n[X];g.clippingState=D,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=L}};function m(){h.value!==n&&(h.value=n,h.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function v(y,x,S,M){const E=y!==null?y.length:0;let _=null;if(E!==0){if(_=h.value,M!==!0||_===null){const g=S+E*4,L=x.matrixWorldInverse;u.getNormalMatrix(L),(_===null||_.length<g)&&(_=new Float32Array(g));for(let b=0,D=S;b!==E;++b,D+=4)f.copy(y[b]).applyMatrix4(L,u),f.normal.toArray(_,D),_[D+3]=f.constant}h.value=_,h.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,_}}function GM(r){let e=new WeakMap;function n(f,u){return u===gf?f.mapping=Xs:u===vf&&(f.mapping=qs),f}function s(f){if(f&&f.isTexture){const u=f.mapping;if(u===gf||u===vf)if(e.has(f)){const h=e.get(f).texture;return n(h,f.mapping)}else{const h=f.image;if(h&&h.height>0){const m=new ey(h.height/2);return m.fromEquirectangularTexture(r,f),e.set(f,m),f.addEventListener("dispose",a),n(m.texture,f.mapping)}else return null}}return f}function a(f){const u=f.target;u.removeEventListener("dispose",a);const h=e.get(u);h!==void 0&&(e.delete(u),h.dispose())}function l(){e=new WeakMap}return{get:s,dispose:l}}class Lg extends bg{constructor(e=-1,n=1,s=1,a=-1,l=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=s,this.bottom=a,this.near=l,this.far=f,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,s,a,l,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=s,this.view.offsetY=a,this.view.width=l,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let l=s-e,f=s+e,u=a+n,h=a-n;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=m*this.view.offsetX,f=l+m*this.view.width,u-=v*this.view.offsetY,h=u-v*this.view.height}this.projectionMatrix.makeOrthographic(l,f,u,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Hs=4,Sm=[.125,.215,.35,.446,.526,.582],Kr=20,sf=new Lg,Mm=new Mt;let of=null,af=0,lf=0;const $r=(1+Math.sqrt(5))/2,Bs=1/$r,Em=[new ae(1,1,1),new ae(-1,1,1),new ae(1,1,-1),new ae(-1,1,-1),new ae(0,$r,Bs),new ae(0,$r,-Bs),new ae(Bs,0,$r),new ae(-Bs,0,$r),new ae($r,Bs,0),new ae(-$r,Bs,0)];class wm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,s=.1,a=100){of=this._renderer.getRenderTarget(),af=this._renderer.getActiveCubeFace(),lf=this._renderer.getActiveMipmapLevel(),this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,s,a,l),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Am(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(of,af,lf),e.scissorTest=!1,Tl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Xs||e.mapping===qs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),of=this._renderer.getRenderTarget(),af=this._renderer.getActiveCubeFace(),lf=this._renderer.getActiveMipmapLevel();const s=n||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,s={magFilter:Kn,minFilter:Kn,generateMipmaps:!1,type:jo,format:hi,colorSpace:Wi,depthBuffer:!1},a=Tm(e,n,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tm(e,n,s);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=VM(l)),this._blurMaterial=WM(l,e,n)}return a}_compileMaterial(e){const n=new Mi(this._lodPlanes[0],e);this._renderer.compile(n,sf)}_sceneToCubeUV(e,n,s,a){const u=new Zn(90,1,n,s),h=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],v=this._renderer,y=v.autoClear,x=v.toneMapping;v.getClearColor(Mm),v.toneMapping=Er,v.autoClear=!1;const S=new Bl({name:"PMREM.Background",side:In,depthWrite:!1,depthTest:!1}),M=new Mi(new Ko,S);let E=!1;const _=e.background;_?_.isColor&&(S.color.copy(_),e.background=null,E=!0):(S.color.copy(Mm),E=!0);for(let g=0;g<6;g++){const L=g%3;L===0?(u.up.set(0,h[g],0),u.lookAt(m[g],0,0)):L===1?(u.up.set(0,0,h[g]),u.lookAt(0,m[g],0)):(u.up.set(0,h[g],0),u.lookAt(0,0,m[g]));const b=this._cubeSize;Tl(a,L*b,g>2?b:0,b,b),v.setRenderTarget(a),E&&v.render(M,u),v.render(e,u)}M.geometry.dispose(),M.material.dispose(),v.toneMapping=x,v.autoClear=y,e.background=_}_textureToCubeUV(e,n){const s=this._renderer,a=e.mapping===Xs||e.mapping===qs;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=bm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Am());const l=a?this._cubemapMaterial:this._equirectMaterial,f=new Mi(this._lodPlanes[0],l),u=l.uniforms;u.envMap.value=e;const h=this._cubeSize;Tl(n,0,0,3*h,2*h),s.setRenderTarget(n),s.render(f,sf)}_applyPMREM(e){const n=this._renderer,s=n.autoClear;n.autoClear=!1;for(let a=1;a<this._lodPlanes.length;a++){const l=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),f=Em[(a-1)%Em.length];this._blur(e,a-1,a,l,f)}n.autoClear=s}_blur(e,n,s,a,l){const f=this._pingPongRenderTarget;this._halfBlur(e,f,n,s,a,"latitudinal",l),this._halfBlur(f,e,s,s,a,"longitudinal",l)}_halfBlur(e,n,s,a,l,f,u){const h=this._renderer,m=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const v=3,y=new Mi(this._lodPlanes[a],m),x=m.uniforms,S=this._sizeLods[s]-1,M=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*Kr-1),E=l/M,_=isFinite(l)?1+Math.floor(v*E):Kr;_>Kr&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${Kr}`);const g=[];let L=0;for(let k=0;k<Kr;++k){const he=k/E,C=Math.exp(-he*he/2);g.push(C),k===0?L+=C:k<_&&(L+=2*C)}for(let k=0;k<g.length;k++)g[k]=g[k]/L;x.envMap.value=e.texture,x.samples.value=_,x.weights.value=g,x.latitudinal.value=f==="latitudinal",u&&(x.poleAxis.value=u);const{_lodMax:b}=this;x.dTheta.value=M,x.mipInt.value=b-s;const D=this._sizeLods[a],X=3*D*(a>b-Hs?a-b+Hs:0),O=4*(this._cubeSize-D);Tl(n,X,O,3*D,2*D),h.setRenderTarget(n),h.render(y,sf)}}function VM(r){const e=[],n=[],s=[];let a=r;const l=r-Hs+1+Sm.length;for(let f=0;f<l;f++){const u=Math.pow(2,a);n.push(u);let h=1/u;f>r-Hs?h=Sm[f-r+Hs-1]:f===0&&(h=0),s.push(h);const m=1/(u-2),v=-m,y=1+m,x=[v,v,y,v,y,y,v,v,y,y,v,y],S=6,M=6,E=3,_=2,g=1,L=new Float32Array(E*M*S),b=new Float32Array(_*M*S),D=new Float32Array(g*M*S);for(let O=0;O<S;O++){const k=O%3*2/3-1,he=O>2?0:-1,C=[k,he,0,k+2/3,he,0,k+2/3,he+1,0,k,he,0,k+2/3,he+1,0,k,he+1,0];L.set(C,E*M*O),b.set(x,_*M*O);const A=[O,O,O,O,O,O];D.set(A,g*M*O)}const X=new ti;X.setAttribute("position",new ei(L,E)),X.setAttribute("uv",new ei(b,_)),X.setAttribute("faceIndex",new ei(D,g)),e.push(X),a>Hs&&a--}return{lodPlanes:e,sizeLods:n,sigmas:s}}function Tm(r,e,n){const s=new es(r,e,n);return s.texture.mapping=Gl,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Tl(r,e,n,s,a){r.viewport.set(e,n,s,a),r.scissor.set(e,n,s,a)}function WM(r,e,n){const s=new Float32Array(Kr),a=new ae(0,1,0);return new ts({name:"SphericalGaussianBlur",defines:{n:Kr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Nf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function Am(){return new ts({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function bm(){return new ts({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function Nf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jM(r){let e=new WeakMap,n=null;function s(u){if(u&&u.isTexture){const h=u.mapping,m=h===gf||h===vf,v=h===Xs||h===qs;if(m||v)if(u.isRenderTargetTexture&&u.needsPMREMUpdate===!0){u.needsPMREMUpdate=!1;let y=e.get(u);return n===null&&(n=new wm(r)),y=m?n.fromEquirectangular(u,y):n.fromCubemap(u,y),e.set(u,y),y.texture}else{if(e.has(u))return e.get(u).texture;{const y=u.image;if(m&&y&&y.height>0||v&&y&&a(y)){n===null&&(n=new wm(r));const x=m?n.fromEquirectangular(u):n.fromCubemap(u);return e.set(u,x),u.addEventListener("dispose",l),x.texture}else return null}}}return u}function a(u){let h=0;const m=6;for(let v=0;v<m;v++)u[v]!==void 0&&h++;return h===m}function l(u){const h=u.target;h.removeEventListener("dispose",l);const m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function f(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function XM(r){const e={};function n(s){if(e[s]!==void 0)return e[s];let a;switch(s){case"WEBGL_depth_texture":a=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=r.getExtension(s)}return e[s]=a,a}return{has:function(s){return n(s)!==null},init:function(s){s.isWebGL2?(n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance")):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(s){const a=n(s);return a===null&&console.warn("THREE.WebGLRenderer: "+s+" extension not supported."),a}}}function qM(r,e,n,s){const a={},l=new WeakMap;function f(y){const x=y.target;x.index!==null&&e.remove(x.index);for(const M in x.attributes)e.remove(x.attributes[M]);for(const M in x.morphAttributes){const E=x.morphAttributes[M];for(let _=0,g=E.length;_<g;_++)e.remove(E[_])}x.removeEventListener("dispose",f),delete a[x.id];const S=l.get(x);S&&(e.remove(S),l.delete(x)),s.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,n.memory.geometries--}function u(y,x){return a[x.id]===!0||(x.addEventListener("dispose",f),a[x.id]=!0,n.memory.geometries++),x}function h(y){const x=y.attributes;for(const M in x)e.update(x[M],r.ARRAY_BUFFER);const S=y.morphAttributes;for(const M in S){const E=S[M];for(let _=0,g=E.length;_<g;_++)e.update(E[_],r.ARRAY_BUFFER)}}function m(y){const x=[],S=y.index,M=y.attributes.position;let E=0;if(S!==null){const L=S.array;E=S.version;for(let b=0,D=L.length;b<D;b+=3){const X=L[b+0],O=L[b+1],k=L[b+2];x.push(X,O,O,k,k,X)}}else if(M!==void 0){const L=M.array;E=M.version;for(let b=0,D=L.length/3-1;b<D;b+=3){const X=b+0,O=b+1,k=b+2;x.push(X,O,O,k,k,X)}}else return;const _=new(_g(x)?Tg:wg)(x,1);_.version=E;const g=l.get(y);g&&e.remove(g),l.set(y,_)}function v(y){const x=l.get(y);if(x){const S=y.index;S!==null&&x.version<S.version&&m(y)}else m(y);return l.get(y)}return{get:u,update:h,getWireframeAttribute:v}}function $M(r,e,n,s){const a=s.isWebGL2;let l;function f(S){l=S}let u,h;function m(S){u=S.type,h=S.bytesPerElement}function v(S,M){r.drawElements(l,M,u,S*h),n.update(M,l,1)}function y(S,M,E){if(E===0)return;let _,g;if(a)_=r,g="drawElementsInstanced";else if(_=e.get("ANGLE_instanced_arrays"),g="drawElementsInstancedANGLE",_===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[g](l,M,u,S*h,E),n.update(M,l,E)}function x(S,M,E){if(E===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let g=0;g<E;g++)this.render(S[g]/h,M[g]);else{_.multiDrawElementsWEBGL(l,M,0,u,S,0,E);let g=0;for(let L=0;L<E;L++)g+=M[L];n.update(g,l,1)}}this.setMode=f,this.setIndex=m,this.render=v,this.renderInstances=y,this.renderMultiDraw=x}function YM(r){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function s(l,f,u){switch(n.calls++,f){case r.TRIANGLES:n.triangles+=u*(l/3);break;case r.LINES:n.lines+=u*(l/2);break;case r.LINE_STRIP:n.lines+=u*(l-1);break;case r.LINE_LOOP:n.lines+=u*l;break;case r.POINTS:n.points+=u*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:s}}function KM(r,e){return r[0]-e[0]}function ZM(r,e){return Math.abs(e[1])-Math.abs(r[1])}function QM(r,e,n){const s={},a=new Float32Array(8),l=new WeakMap,f=new cn,u=[];for(let m=0;m<8;m++)u[m]=[m,0];function h(m,v,y){const x=m.morphTargetInfluences;if(e.isWebGL2===!0){const M=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,E=M!==void 0?M.length:0;let _=l.get(v);if(_===void 0||_.count!==E){let Y=function(){W.dispose(),l.delete(v),v.removeEventListener("dispose",Y)};var S=Y;_!==void 0&&_.texture.dispose();const b=v.morphAttributes.position!==void 0,D=v.morphAttributes.normal!==void 0,X=v.morphAttributes.color!==void 0,O=v.morphAttributes.position||[],k=v.morphAttributes.normal||[],he=v.morphAttributes.color||[];let C=0;b===!0&&(C=1),D===!0&&(C=2),X===!0&&(C=3);let A=v.attributes.position.count*C,re=1;A>e.maxTextureSize&&(re=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const ee=new Float32Array(A*re*4*E),W=new Sg(ee,A,re,E);W.type=Sr,W.needsUpdate=!0;const F=C*4;for(let Q=0;Q<E;Q++){const ie=O[Q],V=k[Q],z=he[Q],j=A*re*4*Q;for(let N=0;N<ie.count;N++){const $=N*F;b===!0&&(f.fromBufferAttribute(ie,N),ee[j+$+0]=f.x,ee[j+$+1]=f.y,ee[j+$+2]=f.z,ee[j+$+3]=0),D===!0&&(f.fromBufferAttribute(V,N),ee[j+$+4]=f.x,ee[j+$+5]=f.y,ee[j+$+6]=f.z,ee[j+$+7]=0),X===!0&&(f.fromBufferAttribute(z,N),ee[j+$+8]=f.x,ee[j+$+9]=f.y,ee[j+$+10]=f.z,ee[j+$+11]=z.itemSize===4?f.w:1)}}_={count:E,texture:W,size:new bt(A,re)},l.set(v,_),v.addEventListener("dispose",Y)}let g=0;for(let b=0;b<x.length;b++)g+=x[b];const L=v.morphTargetsRelative?1:1-g;y.getUniforms().setValue(r,"morphTargetBaseInfluence",L),y.getUniforms().setValue(r,"morphTargetInfluences",x),y.getUniforms().setValue(r,"morphTargetsTexture",_.texture,n),y.getUniforms().setValue(r,"morphTargetsTextureSize",_.size)}else{const M=x===void 0?0:x.length;let E=s[v.id];if(E===void 0||E.length!==M){E=[];for(let D=0;D<M;D++)E[D]=[D,0];s[v.id]=E}for(let D=0;D<M;D++){const X=E[D];X[0]=D,X[1]=x[D]}E.sort(ZM);for(let D=0;D<8;D++)D<M&&E[D][1]?(u[D][0]=E[D][0],u[D][1]=E[D][1]):(u[D][0]=Number.MAX_SAFE_INTEGER,u[D][1]=0);u.sort(KM);const _=v.morphAttributes.position,g=v.morphAttributes.normal;let L=0;for(let D=0;D<8;D++){const X=u[D],O=X[0],k=X[1];O!==Number.MAX_SAFE_INTEGER&&k?(_&&v.getAttribute("morphTarget"+D)!==_[O]&&v.setAttribute("morphTarget"+D,_[O]),g&&v.getAttribute("morphNormal"+D)!==g[O]&&v.setAttribute("morphNormal"+D,g[O]),a[D]=k,L+=k):(_&&v.hasAttribute("morphTarget"+D)===!0&&v.deleteAttribute("morphTarget"+D),g&&v.hasAttribute("morphNormal"+D)===!0&&v.deleteAttribute("morphNormal"+D),a[D]=0)}const b=v.morphTargetsRelative?1:1-L;y.getUniforms().setValue(r,"morphTargetBaseInfluence",b),y.getUniforms().setValue(r,"morphTargetInfluences",a)}}return{update:h}}function JM(r,e,n,s){let a=new WeakMap;function l(h){const m=s.render.frame,v=h.geometry,y=e.get(h,v);if(a.get(y)!==m&&(e.update(y),a.set(y,m)),h.isInstancedMesh&&(h.hasEventListener("dispose",u)===!1&&h.addEventListener("dispose",u),a.get(h)!==m&&(n.update(h.instanceMatrix,r.ARRAY_BUFFER),h.instanceColor!==null&&n.update(h.instanceColor,r.ARRAY_BUFFER),a.set(h,m))),h.isSkinnedMesh){const x=h.skeleton;a.get(x)!==m&&(x.update(),a.set(x,m))}return y}function f(){a=new WeakMap}function u(h){const m=h.target;m.removeEventListener("dispose",u),n.remove(m.instanceMatrix),m.instanceColor!==null&&n.remove(m.instanceColor)}return{update:l,dispose:f}}class Ng extends Hn{constructor(e,n,s,a,l,f,u,h,m,v){if(v=v!==void 0?v:Qr,v!==Qr&&v!==$s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&v===Qr&&(s=yr),s===void 0&&v===$s&&(s=Zr),super(null,a,l,f,u,h,v,s,m),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=u!==void 0?u:Mn,this.minFilter=h!==void 0?h:Mn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const Dg=new Hn,Ig=new Ng(1,1);Ig.compareFunction=vg;const Ug=new Sg,Fg=new O0,Og=new Cg,Cm=[],Rm=[],Pm=new Float32Array(16),Lm=new Float32Array(9),Nm=new Float32Array(4);function Js(r,e,n){const s=r[0];if(s<=0||s>0)return r;const a=e*n;let l=Cm[a];if(l===void 0&&(l=new Float32Array(a),Cm[a]=l),e!==0){s.toArray(l,0);for(let f=1,u=0;f!==e;++f)u+=n,r[f].toArray(l,u)}return l}function Qt(r,e){if(r.length!==e.length)return!1;for(let n=0,s=r.length;n<s;n++)if(r[n]!==e[n])return!1;return!0}function Jt(r,e){for(let n=0,s=e.length;n<s;n++)r[n]=e[n]}function jl(r,e){let n=Rm[e];n===void 0&&(n=new Int32Array(e),Rm[e]=n);for(let s=0;s!==e;++s)n[s]=r.allocateTextureUnit();return n}function eE(r,e){const n=this.cache;n[0]!==e&&(r.uniform1f(this.addr,e),n[0]=e)}function tE(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Qt(n,e))return;r.uniform2fv(this.addr,e),Jt(n,e)}}function nE(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Qt(n,e))return;r.uniform3fv(this.addr,e),Jt(n,e)}}function iE(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Qt(n,e))return;r.uniform4fv(this.addr,e),Jt(n,e)}}function rE(r,e){const n=this.cache,s=e.elements;if(s===void 0){if(Qt(n,e))return;r.uniformMatrix2fv(this.addr,!1,e),Jt(n,e)}else{if(Qt(n,s))return;Nm.set(s),r.uniformMatrix2fv(this.addr,!1,Nm),Jt(n,s)}}function sE(r,e){const n=this.cache,s=e.elements;if(s===void 0){if(Qt(n,e))return;r.uniformMatrix3fv(this.addr,!1,e),Jt(n,e)}else{if(Qt(n,s))return;Lm.set(s),r.uniformMatrix3fv(this.addr,!1,Lm),Jt(n,s)}}function oE(r,e){const n=this.cache,s=e.elements;if(s===void 0){if(Qt(n,e))return;r.uniformMatrix4fv(this.addr,!1,e),Jt(n,e)}else{if(Qt(n,s))return;Pm.set(s),r.uniformMatrix4fv(this.addr,!1,Pm),Jt(n,s)}}function aE(r,e){const n=this.cache;n[0]!==e&&(r.uniform1i(this.addr,e),n[0]=e)}function lE(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Qt(n,e))return;r.uniform2iv(this.addr,e),Jt(n,e)}}function cE(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Qt(n,e))return;r.uniform3iv(this.addr,e),Jt(n,e)}}function uE(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Qt(n,e))return;r.uniform4iv(this.addr,e),Jt(n,e)}}function fE(r,e){const n=this.cache;n[0]!==e&&(r.uniform1ui(this.addr,e),n[0]=e)}function dE(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Qt(n,e))return;r.uniform2uiv(this.addr,e),Jt(n,e)}}function hE(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Qt(n,e))return;r.uniform3uiv(this.addr,e),Jt(n,e)}}function pE(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Qt(n,e))return;r.uniform4uiv(this.addr,e),Jt(n,e)}}function mE(r,e,n){const s=this.cache,a=n.allocateTextureUnit();s[0]!==a&&(r.uniform1i(this.addr,a),s[0]=a);const l=this.type===r.SAMPLER_2D_SHADOW?Ig:Dg;n.setTexture2D(e||l,a)}function gE(r,e,n){const s=this.cache,a=n.allocateTextureUnit();s[0]!==a&&(r.uniform1i(this.addr,a),s[0]=a),n.setTexture3D(e||Fg,a)}function vE(r,e,n){const s=this.cache,a=n.allocateTextureUnit();s[0]!==a&&(r.uniform1i(this.addr,a),s[0]=a),n.setTextureCube(e||Og,a)}function _E(r,e,n){const s=this.cache,a=n.allocateTextureUnit();s[0]!==a&&(r.uniform1i(this.addr,a),s[0]=a),n.setTexture2DArray(e||Ug,a)}function xE(r){switch(r){case 5126:return eE;case 35664:return tE;case 35665:return nE;case 35666:return iE;case 35674:return rE;case 35675:return sE;case 35676:return oE;case 5124:case 35670:return aE;case 35667:case 35671:return lE;case 35668:case 35672:return cE;case 35669:case 35673:return uE;case 5125:return fE;case 36294:return dE;case 36295:return hE;case 36296:return pE;case 35678:case 36198:case 36298:case 36306:case 35682:return mE;case 35679:case 36299:case 36307:return gE;case 35680:case 36300:case 36308:case 36293:return vE;case 36289:case 36303:case 36311:case 36292:return _E}}function yE(r,e){r.uniform1fv(this.addr,e)}function SE(r,e){const n=Js(e,this.size,2);r.uniform2fv(this.addr,n)}function ME(r,e){const n=Js(e,this.size,3);r.uniform3fv(this.addr,n)}function EE(r,e){const n=Js(e,this.size,4);r.uniform4fv(this.addr,n)}function wE(r,e){const n=Js(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function TE(r,e){const n=Js(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function AE(r,e){const n=Js(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function bE(r,e){r.uniform1iv(this.addr,e)}function CE(r,e){r.uniform2iv(this.addr,e)}function RE(r,e){r.uniform3iv(this.addr,e)}function PE(r,e){r.uniform4iv(this.addr,e)}function LE(r,e){r.uniform1uiv(this.addr,e)}function NE(r,e){r.uniform2uiv(this.addr,e)}function DE(r,e){r.uniform3uiv(this.addr,e)}function IE(r,e){r.uniform4uiv(this.addr,e)}function UE(r,e,n){const s=this.cache,a=e.length,l=jl(n,a);Qt(s,l)||(r.uniform1iv(this.addr,l),Jt(s,l));for(let f=0;f!==a;++f)n.setTexture2D(e[f]||Dg,l[f])}function FE(r,e,n){const s=this.cache,a=e.length,l=jl(n,a);Qt(s,l)||(r.uniform1iv(this.addr,l),Jt(s,l));for(let f=0;f!==a;++f)n.setTexture3D(e[f]||Fg,l[f])}function OE(r,e,n){const s=this.cache,a=e.length,l=jl(n,a);Qt(s,l)||(r.uniform1iv(this.addr,l),Jt(s,l));for(let f=0;f!==a;++f)n.setTextureCube(e[f]||Og,l[f])}function kE(r,e,n){const s=this.cache,a=e.length,l=jl(n,a);Qt(s,l)||(r.uniform1iv(this.addr,l),Jt(s,l));for(let f=0;f!==a;++f)n.setTexture2DArray(e[f]||Ug,l[f])}function zE(r){switch(r){case 5126:return yE;case 35664:return SE;case 35665:return ME;case 35666:return EE;case 35674:return wE;case 35675:return TE;case 35676:return AE;case 5124:case 35670:return bE;case 35667:case 35671:return CE;case 35668:case 35672:return RE;case 35669:case 35673:return PE;case 5125:return LE;case 36294:return NE;case 36295:return DE;case 36296:return IE;case 35678:case 36198:case 36298:case 36306:case 35682:return UE;case 35679:case 36299:case 36307:return FE;case 35680:case 36300:case 36308:case 36293:return OE;case 36289:case 36303:case 36311:case 36292:return kE}}class BE{constructor(e,n,s){this.id=e,this.addr=s,this.cache=[],this.type=n.type,this.setValue=xE(n.type)}}class HE{constructor(e,n,s){this.id=e,this.addr=s,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=zE(n.type)}}class GE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,s){const a=this.seq;for(let l=0,f=a.length;l!==f;++l){const u=a[l];u.setValue(e,n[u.id],s)}}}const cf=/(\w+)(\])?(\[|\.)?/g;function Dm(r,e){r.seq.push(e),r.map[e.id]=e}function VE(r,e,n){const s=r.name,a=s.length;for(cf.lastIndex=0;;){const l=cf.exec(s),f=cf.lastIndex;let u=l[1];const h=l[2]==="]",m=l[3];if(h&&(u=u|0),m===void 0||m==="["&&f+2===a){Dm(n,m===void 0?new BE(u,r,e):new HE(u,r,e));break}else{let y=n.map[u];y===void 0&&(y=new GE(u),Dm(n,y)),n=y}}}class Dl{constructor(e,n){this.seq=[],this.map={};const s=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<s;++a){const l=e.getActiveUniform(n,a),f=e.getUniformLocation(n,l.name);VE(l,f,this)}}setValue(e,n,s,a){const l=this.map[n];l!==void 0&&l.setValue(e,s,a)}setOptional(e,n,s){const a=n[s];a!==void 0&&this.setValue(e,s,a)}static upload(e,n,s,a){for(let l=0,f=n.length;l!==f;++l){const u=n[l],h=s[u.id];h.needsUpdate!==!1&&u.setValue(e,h.value,a)}}static seqWithValue(e,n){const s=[];for(let a=0,l=e.length;a!==l;++a){const f=e[a];f.id in n&&s.push(f)}return s}}function Im(r,e,n){const s=r.createShader(e);return r.shaderSource(s,n),r.compileShader(s),s}const WE=37297;let jE=0;function XE(r,e){const n=r.split(`
`),s=[],a=Math.max(e-6,0),l=Math.min(e+6,n.length);for(let f=a;f<l;f++){const u=f+1;s.push(`${u===e?">":" "} ${u}: ${n[f]}`)}return s.join(`
`)}function qE(r){const e=At.getPrimaries(At.workingColorSpace),n=At.getPrimaries(r);let s;switch(e===n?s="":e===Ol&&n===Fl?s="LinearDisplayP3ToLinearSRGB":e===Fl&&n===Ol&&(s="LinearSRGBToLinearDisplayP3"),r){case Wi:case Vl:return[s,"LinearTransferOETF"];case ln:case Rf:return[s,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[s,"LinearTransferOETF"]}}function Um(r,e,n){const s=r.getShaderParameter(e,r.COMPILE_STATUS),a=r.getShaderInfoLog(e).trim();if(s&&a==="")return"";const l=/ERROR: 0:(\d+)/.exec(a);if(l){const f=parseInt(l[1]);return n.toUpperCase()+`

`+a+`

`+XE(r.getShaderSource(e),f)}else return a}function $E(r,e){const n=qE(e);return`vec4 ${r}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function YE(r,e){let n;switch(e){case s0:n="Linear";break;case o0:n="Reinhard";break;case a0:n="OptimizedCineon";break;case l0:n="ACESFilmic";break;case u0:n="AgX";break;case c0:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function KE(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Gs).join(`
`)}function ZE(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Gs).join(`
`)}function QE(r){const e=[];for(const n in r){const s=r[n];s!==!1&&e.push("#define "+n+" "+s)}return e.join(`
`)}function JE(r,e){const n={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let a=0;a<s;a++){const l=r.getActiveAttrib(e,a),f=l.name;let u=1;l.type===r.FLOAT_MAT2&&(u=2),l.type===r.FLOAT_MAT3&&(u=3),l.type===r.FLOAT_MAT4&&(u=4),n[f]={type:l.type,location:r.getAttribLocation(e,f),locationSize:u}}return n}function Gs(r){return r!==""}function Fm(r,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Om(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ew=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ef(r){return r.replace(ew,nw)}const tw=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function nw(r,e){let n=ht[e];if(n===void 0){const s=tw.get(e);if(s!==void 0)n=ht[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return Ef(n)}const iw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function km(r){return r.replace(iw,rw)}function rw(r,e,n,s){let a="";for(let l=parseInt(e);l<parseInt(n);l++)a+=s.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return a}function zm(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function sw(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===og?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Dx?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Hi&&(e="SHADOWMAP_TYPE_VSM"),e}function ow(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Xs:case qs:e="ENVMAP_TYPE_CUBE";break;case Gl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function aw(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case qs:e="ENVMAP_MODE_REFRACTION";break}return e}function lw(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case ag:e="ENVMAP_BLENDING_MULTIPLY";break;case i0:e="ENVMAP_BLENDING_MIX";break;case r0:e="ENVMAP_BLENDING_ADD";break}return e}function cw(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:s,maxMip:n}}function uw(r,e,n,s){const a=r.getContext(),l=n.defines;let f=n.vertexShader,u=n.fragmentShader;const h=sw(n),m=ow(n),v=aw(n),y=lw(n),x=cw(n),S=n.isWebGL2?"":KE(n),M=ZE(n),E=QE(l),_=a.createProgram();let g,L,b=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(Gs).join(`
`),g.length>0&&(g+=`
`),L=[S,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(Gs).join(`
`),L.length>0&&(L+=`
`)):(g=[zm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+v:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gs).join(`
`),L=[S,zm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+m:"",n.envMap?"#define "+v:"",n.envMap?"#define "+y:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Er?"#define TONE_MAPPING":"",n.toneMapping!==Er?ht.tonemapping_pars_fragment:"",n.toneMapping!==Er?YE("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,$E("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Gs).join(`
`)),f=Ef(f),f=Fm(f,n),f=Om(f,n),u=Ef(u),u=Fm(u,n),u=Om(u,n),f=km(f),u=km(u),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,g=[M,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,L=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===im?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===im?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+L);const D=b+g+f,X=b+L+u,O=Im(a,a.VERTEX_SHADER,D),k=Im(a,a.FRAGMENT_SHADER,X);a.attachShader(_,O),a.attachShader(_,k),n.index0AttributeName!==void 0?a.bindAttribLocation(_,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(_,0,"position"),a.linkProgram(_);function he(ee){if(r.debug.checkShaderErrors){const W=a.getProgramInfoLog(_).trim(),F=a.getShaderInfoLog(O).trim(),Y=a.getShaderInfoLog(k).trim();let Q=!0,ie=!0;if(a.getProgramParameter(_,a.LINK_STATUS)===!1)if(Q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(a,_,O,k);else{const V=Um(a,O,"vertex"),z=Um(a,k,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(_,a.VALIDATE_STATUS)+`

Program Info Log: `+W+`
`+V+`
`+z)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(F===""||Y==="")&&(ie=!1);ie&&(ee.diagnostics={runnable:Q,programLog:W,vertexShader:{log:F,prefix:g},fragmentShader:{log:Y,prefix:L}})}a.deleteShader(O),a.deleteShader(k),C=new Dl(a,_),A=JE(a,_)}let C;this.getUniforms=function(){return C===void 0&&he(this),C};let A;this.getAttributes=function(){return A===void 0&&he(this),A};let re=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return re===!1&&(re=a.getProgramParameter(_,WE)),re},this.destroy=function(){s.releaseStatesOfProgram(this),a.deleteProgram(_),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=jE++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=O,this.fragmentShader=k,this}let fw=0;class dw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,s=e.fragmentShader,a=this._getShaderStage(n),l=this._getShaderStage(s),f=this._getShaderCacheForMaterial(e);return f.has(a)===!1&&(f.add(a),a.usedTimes++),f.has(l)===!1&&(f.add(l),l.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const s of n)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let s=n.get(e);return s===void 0&&(s=new Set,n.set(e,s)),s}_getShaderStage(e){const n=this.shaderCache;let s=n.get(e);return s===void 0&&(s=new hw(e),n.set(e,s)),s}}class hw{constructor(e){this.id=fw++,this.code=e,this.usedTimes=0}}function pw(r,e,n,s,a,l,f){const u=new Mg,h=new dw,m=[],v=a.isWebGL2,y=a.logarithmicDepthBuffer,x=a.vertexTextures;let S=a.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(C){return C===0?"uv":`uv${C}`}function _(C,A,re,ee,W){const F=ee.fog,Y=W.geometry,Q=C.isMeshStandardMaterial?ee.environment:null,ie=(C.isMeshStandardMaterial?n:e).get(C.envMap||Q),V=ie&&ie.mapping===Gl?ie.image.height:null,z=M[C.type];C.precision!==null&&(S=a.getMaxPrecision(C.precision),S!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",S,"instead."));const j=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,N=j!==void 0?j.length:0;let $=0;Y.morphAttributes.position!==void 0&&($=1),Y.morphAttributes.normal!==void 0&&($=2),Y.morphAttributes.color!==void 0&&($=3);let Z,de,me,Me;if(z){const en=Si[z];Z=en.vertexShader,de=en.fragmentShader}else Z=C.vertexShader,de=C.fragmentShader,h.update(C),me=h.getVertexShaderID(C),Me=h.getFragmentShaderID(C);const Te=r.getRenderTarget(),Ae=W.isInstancedMesh===!0,ze=W.isBatchedMesh===!0,Ve=!!C.map,Pe=!!C.matcap,ne=!!ie,kt=!!C.aoMap,Ce=!!C.lightMap,it=!!C.bumpMap,We=!!C.normalMap,xt=!!C.displacementMap,je=!!C.emissiveMap,P=!!C.metalnessMap,T=!!C.roughnessMap,oe=C.anisotropy>0,ye=C.clearcoat>0,_e=C.iridescence>0,ge=C.sheen>0,Ye=C.transmission>0,Ie=oe&&!!C.anisotropyMap,Be=ye&&!!C.clearcoatMap,B=ye&&!!C.clearcoatNormalMap,ue=ye&&!!C.clearcoatRoughnessMap,K=_e&&!!C.iridescenceMap,Re=_e&&!!C.iridescenceThicknessMap,we=ge&&!!C.sheenColorMap,Qe=ge&&!!C.sheenRoughnessMap,qe=!!C.specularMap,Le=!!C.specularColorMap,Je=!!C.specularIntensityMap,gt=Ye&&!!C.transmissionMap,Ct=Ye&&!!C.thicknessMap,ct=!!C.gradientMap,be=!!C.alphaMap,G=C.alphaTest>0,Ne=!!C.alphaHash,Ue=!!C.extensions,st=!!Y.attributes.uv1,et=!!Y.attributes.uv2,Et=!!Y.attributes.uv3;let wt=Er;return C.toneMapped&&(Te===null||Te.isXRRenderTarget===!0)&&(wt=r.toneMapping),{isWebGL2:v,shaderID:z,shaderType:C.type,shaderName:C.name,vertexShader:Z,fragmentShader:de,defines:C.defines,customVertexShaderID:me,customFragmentShaderID:Me,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:S,batching:ze,instancing:Ae,instancingColor:Ae&&W.instanceColor!==null,supportsVertexTextures:x,outputColorSpace:Te===null?r.outputColorSpace:Te.isXRRenderTarget===!0?Te.texture.colorSpace:Wi,map:Ve,matcap:Pe,envMap:ne,envMapMode:ne&&ie.mapping,envMapCubeUVHeight:V,aoMap:kt,lightMap:Ce,bumpMap:it,normalMap:We,displacementMap:x&&xt,emissiveMap:je,normalMapObjectSpace:We&&C.normalMapType===E0,normalMapTangentSpace:We&&C.normalMapType===M0,metalnessMap:P,roughnessMap:T,anisotropy:oe,anisotropyMap:Ie,clearcoat:ye,clearcoatMap:Be,clearcoatNormalMap:B,clearcoatRoughnessMap:ue,iridescence:_e,iridescenceMap:K,iridescenceThicknessMap:Re,sheen:ge,sheenColorMap:we,sheenRoughnessMap:Qe,specularMap:qe,specularColorMap:Le,specularIntensityMap:Je,transmission:Ye,transmissionMap:gt,thicknessMap:Ct,gradientMap:ct,opaque:C.transparent===!1&&C.blending===Ws,alphaMap:be,alphaTest:G,alphaHash:Ne,combine:C.combine,mapUv:Ve&&E(C.map.channel),aoMapUv:kt&&E(C.aoMap.channel),lightMapUv:Ce&&E(C.lightMap.channel),bumpMapUv:it&&E(C.bumpMap.channel),normalMapUv:We&&E(C.normalMap.channel),displacementMapUv:xt&&E(C.displacementMap.channel),emissiveMapUv:je&&E(C.emissiveMap.channel),metalnessMapUv:P&&E(C.metalnessMap.channel),roughnessMapUv:T&&E(C.roughnessMap.channel),anisotropyMapUv:Ie&&E(C.anisotropyMap.channel),clearcoatMapUv:Be&&E(C.clearcoatMap.channel),clearcoatNormalMapUv:B&&E(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&E(C.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&E(C.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&E(C.iridescenceThicknessMap.channel),sheenColorMapUv:we&&E(C.sheenColorMap.channel),sheenRoughnessMapUv:Qe&&E(C.sheenRoughnessMap.channel),specularMapUv:qe&&E(C.specularMap.channel),specularColorMapUv:Le&&E(C.specularColorMap.channel),specularIntensityMapUv:Je&&E(C.specularIntensityMap.channel),transmissionMapUv:gt&&E(C.transmissionMap.channel),thicknessMapUv:Ct&&E(C.thicknessMap.channel),alphaMapUv:be&&E(C.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(We||oe),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,vertexUv1s:st,vertexUv2s:et,vertexUv3s:Et,pointsUvs:W.isPoints===!0&&!!Y.attributes.uv&&(Ve||be),fog:!!F,useFog:C.fog===!0,fogExp2:F&&F.isFogExp2,flatShading:C.flatShading===!0,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:y,skinning:W.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:$,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:C.dithering,shadowMapEnabled:r.shadowMap.enabled&&re.length>0,shadowMapType:r.shadowMap.type,toneMapping:wt,useLegacyLights:r._useLegacyLights,decodeVideoTexture:Ve&&C.map.isVideoTexture===!0&&At.getTransfer(C.map.colorSpace)===It,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===Gi,flipSided:C.side===In,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionDerivatives:Ue&&C.extensions.derivatives===!0,extensionFragDepth:Ue&&C.extensions.fragDepth===!0,extensionDrawBuffers:Ue&&C.extensions.drawBuffers===!0,extensionShaderTextureLOD:Ue&&C.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Ue&&C.extensions.clipCullDistance&&s.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:v||s.has("EXT_frag_depth"),rendererExtensionDrawBuffers:v||s.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:v||s.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()}}function g(C){const A=[];if(C.shaderID?A.push(C.shaderID):(A.push(C.customVertexShaderID),A.push(C.customFragmentShaderID)),C.defines!==void 0)for(const re in C.defines)A.push(re),A.push(C.defines[re]);return C.isRawShaderMaterial===!1&&(L(A,C),b(A,C),A.push(r.outputColorSpace)),A.push(C.customProgramCacheKey),A.join()}function L(C,A){C.push(A.precision),C.push(A.outputColorSpace),C.push(A.envMapMode),C.push(A.envMapCubeUVHeight),C.push(A.mapUv),C.push(A.alphaMapUv),C.push(A.lightMapUv),C.push(A.aoMapUv),C.push(A.bumpMapUv),C.push(A.normalMapUv),C.push(A.displacementMapUv),C.push(A.emissiveMapUv),C.push(A.metalnessMapUv),C.push(A.roughnessMapUv),C.push(A.anisotropyMapUv),C.push(A.clearcoatMapUv),C.push(A.clearcoatNormalMapUv),C.push(A.clearcoatRoughnessMapUv),C.push(A.iridescenceMapUv),C.push(A.iridescenceThicknessMapUv),C.push(A.sheenColorMapUv),C.push(A.sheenRoughnessMapUv),C.push(A.specularMapUv),C.push(A.specularColorMapUv),C.push(A.specularIntensityMapUv),C.push(A.transmissionMapUv),C.push(A.thicknessMapUv),C.push(A.combine),C.push(A.fogExp2),C.push(A.sizeAttenuation),C.push(A.morphTargetsCount),C.push(A.morphAttributeCount),C.push(A.numDirLights),C.push(A.numPointLights),C.push(A.numSpotLights),C.push(A.numSpotLightMaps),C.push(A.numHemiLights),C.push(A.numRectAreaLights),C.push(A.numDirLightShadows),C.push(A.numPointLightShadows),C.push(A.numSpotLightShadows),C.push(A.numSpotLightShadowsWithMaps),C.push(A.numLightProbes),C.push(A.shadowMapType),C.push(A.toneMapping),C.push(A.numClippingPlanes),C.push(A.numClipIntersection),C.push(A.depthPacking)}function b(C,A){u.disableAll(),A.isWebGL2&&u.enable(0),A.supportsVertexTextures&&u.enable(1),A.instancing&&u.enable(2),A.instancingColor&&u.enable(3),A.matcap&&u.enable(4),A.envMap&&u.enable(5),A.normalMapObjectSpace&&u.enable(6),A.normalMapTangentSpace&&u.enable(7),A.clearcoat&&u.enable(8),A.iridescence&&u.enable(9),A.alphaTest&&u.enable(10),A.vertexColors&&u.enable(11),A.vertexAlphas&&u.enable(12),A.vertexUv1s&&u.enable(13),A.vertexUv2s&&u.enable(14),A.vertexUv3s&&u.enable(15),A.vertexTangents&&u.enable(16),A.anisotropy&&u.enable(17),A.alphaHash&&u.enable(18),A.batching&&u.enable(19),C.push(u.mask),u.disableAll(),A.fog&&u.enable(0),A.useFog&&u.enable(1),A.flatShading&&u.enable(2),A.logarithmicDepthBuffer&&u.enable(3),A.skinning&&u.enable(4),A.morphTargets&&u.enable(5),A.morphNormals&&u.enable(6),A.morphColors&&u.enable(7),A.premultipliedAlpha&&u.enable(8),A.shadowMapEnabled&&u.enable(9),A.useLegacyLights&&u.enable(10),A.doubleSided&&u.enable(11),A.flipSided&&u.enable(12),A.useDepthPacking&&u.enable(13),A.dithering&&u.enable(14),A.transmission&&u.enable(15),A.sheen&&u.enable(16),A.opaque&&u.enable(17),A.pointsUvs&&u.enable(18),A.decodeVideoTexture&&u.enable(19),C.push(u.mask)}function D(C){const A=M[C.type];let re;if(A){const ee=Si[A];re=K0.clone(ee.uniforms)}else re=C.uniforms;return re}function X(C,A){let re;for(let ee=0,W=m.length;ee<W;ee++){const F=m[ee];if(F.cacheKey===A){re=F,++re.usedTimes;break}}return re===void 0&&(re=new uw(r,A,C,l),m.push(re)),re}function O(C){if(--C.usedTimes===0){const A=m.indexOf(C);m[A]=m[m.length-1],m.pop(),C.destroy()}}function k(C){h.remove(C)}function he(){h.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:D,acquireProgram:X,releaseProgram:O,releaseShaderCache:k,programs:m,dispose:he}}function mw(){let r=new WeakMap;function e(l){let f=r.get(l);return f===void 0&&(f={},r.set(l,f)),f}function n(l){r.delete(l)}function s(l,f,u){r.get(l)[f]=u}function a(){r=new WeakMap}return{get:e,remove:n,update:s,dispose:a}}function gw(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Bm(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Hm(){const r=[];let e=0;const n=[],s=[],a=[];function l(){e=0,n.length=0,s.length=0,a.length=0}function f(y,x,S,M,E,_){let g=r[e];return g===void 0?(g={id:y.id,object:y,geometry:x,material:S,groupOrder:M,renderOrder:y.renderOrder,z:E,group:_},r[e]=g):(g.id=y.id,g.object=y,g.geometry=x,g.material=S,g.groupOrder=M,g.renderOrder=y.renderOrder,g.z=E,g.group=_),e++,g}function u(y,x,S,M,E,_){const g=f(y,x,S,M,E,_);S.transmission>0?s.push(g):S.transparent===!0?a.push(g):n.push(g)}function h(y,x,S,M,E,_){const g=f(y,x,S,M,E,_);S.transmission>0?s.unshift(g):S.transparent===!0?a.unshift(g):n.unshift(g)}function m(y,x){n.length>1&&n.sort(y||gw),s.length>1&&s.sort(x||Bm),a.length>1&&a.sort(x||Bm)}function v(){for(let y=e,x=r.length;y<x;y++){const S=r[y];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:n,transmissive:s,transparent:a,init:l,push:u,unshift:h,finish:v,sort:m}}function vw(){let r=new WeakMap;function e(s,a){const l=r.get(s);let f;return l===void 0?(f=new Hm,r.set(s,[f])):a>=l.length?(f=new Hm,l.push(f)):f=l[a],f}function n(){r=new WeakMap}return{get:e,dispose:n}}function _w(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new ae,color:new Mt};break;case"SpotLight":n={position:new ae,direction:new ae,color:new Mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new ae,color:new Mt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new ae,skyColor:new Mt,groundColor:new Mt};break;case"RectAreaLight":n={color:new Mt,position:new ae,halfWidth:new ae,halfHeight:new ae};break}return r[e.id]=n,n}}}function xw(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=n,n}}}let yw=0;function Sw(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Mw(r,e){const n=new _w,s=xw(),a={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let v=0;v<9;v++)a.probe.push(new ae);const l=new ae,f=new Zt,u=new Zt;function h(v,y){let x=0,S=0,M=0;for(let ee=0;ee<9;ee++)a.probe[ee].set(0,0,0);let E=0,_=0,g=0,L=0,b=0,D=0,X=0,O=0,k=0,he=0,C=0;v.sort(Sw);const A=y===!0?Math.PI:1;for(let ee=0,W=v.length;ee<W;ee++){const F=v[ee],Y=F.color,Q=F.intensity,ie=F.distance,V=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)x+=Y.r*Q*A,S+=Y.g*Q*A,M+=Y.b*Q*A;else if(F.isLightProbe){for(let z=0;z<9;z++)a.probe[z].addScaledVector(F.sh.coefficients[z],Q);C++}else if(F.isDirectionalLight){const z=n.get(F);if(z.color.copy(F.color).multiplyScalar(F.intensity*A),F.castShadow){const j=F.shadow,N=s.get(F);N.shadowBias=j.bias,N.shadowNormalBias=j.normalBias,N.shadowRadius=j.radius,N.shadowMapSize=j.mapSize,a.directionalShadow[E]=N,a.directionalShadowMap[E]=V,a.directionalShadowMatrix[E]=F.shadow.matrix,D++}a.directional[E]=z,E++}else if(F.isSpotLight){const z=n.get(F);z.position.setFromMatrixPosition(F.matrixWorld),z.color.copy(Y).multiplyScalar(Q*A),z.distance=ie,z.coneCos=Math.cos(F.angle),z.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),z.decay=F.decay,a.spot[g]=z;const j=F.shadow;if(F.map&&(a.spotLightMap[k]=F.map,k++,j.updateMatrices(F),F.castShadow&&he++),a.spotLightMatrix[g]=j.matrix,F.castShadow){const N=s.get(F);N.shadowBias=j.bias,N.shadowNormalBias=j.normalBias,N.shadowRadius=j.radius,N.shadowMapSize=j.mapSize,a.spotShadow[g]=N,a.spotShadowMap[g]=V,O++}g++}else if(F.isRectAreaLight){const z=n.get(F);z.color.copy(Y).multiplyScalar(Q),z.halfWidth.set(F.width*.5,0,0),z.halfHeight.set(0,F.height*.5,0),a.rectArea[L]=z,L++}else if(F.isPointLight){const z=n.get(F);if(z.color.copy(F.color).multiplyScalar(F.intensity*A),z.distance=F.distance,z.decay=F.decay,F.castShadow){const j=F.shadow,N=s.get(F);N.shadowBias=j.bias,N.shadowNormalBias=j.normalBias,N.shadowRadius=j.radius,N.shadowMapSize=j.mapSize,N.shadowCameraNear=j.camera.near,N.shadowCameraFar=j.camera.far,a.pointShadow[_]=N,a.pointShadowMap[_]=V,a.pointShadowMatrix[_]=F.shadow.matrix,X++}a.point[_]=z,_++}else if(F.isHemisphereLight){const z=n.get(F);z.skyColor.copy(F.color).multiplyScalar(Q*A),z.groundColor.copy(F.groundColor).multiplyScalar(Q*A),a.hemi[b]=z,b++}}L>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=De.LTC_FLOAT_1,a.rectAreaLTC2=De.LTC_FLOAT_2):(a.rectAreaLTC1=De.LTC_HALF_1,a.rectAreaLTC2=De.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=De.LTC_FLOAT_1,a.rectAreaLTC2=De.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(a.rectAreaLTC1=De.LTC_HALF_1,a.rectAreaLTC2=De.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),a.ambient[0]=x,a.ambient[1]=S,a.ambient[2]=M;const re=a.hash;(re.directionalLength!==E||re.pointLength!==_||re.spotLength!==g||re.rectAreaLength!==L||re.hemiLength!==b||re.numDirectionalShadows!==D||re.numPointShadows!==X||re.numSpotShadows!==O||re.numSpotMaps!==k||re.numLightProbes!==C)&&(a.directional.length=E,a.spot.length=g,a.rectArea.length=L,a.point.length=_,a.hemi.length=b,a.directionalShadow.length=D,a.directionalShadowMap.length=D,a.pointShadow.length=X,a.pointShadowMap.length=X,a.spotShadow.length=O,a.spotShadowMap.length=O,a.directionalShadowMatrix.length=D,a.pointShadowMatrix.length=X,a.spotLightMatrix.length=O+k-he,a.spotLightMap.length=k,a.numSpotLightShadowsWithMaps=he,a.numLightProbes=C,re.directionalLength=E,re.pointLength=_,re.spotLength=g,re.rectAreaLength=L,re.hemiLength=b,re.numDirectionalShadows=D,re.numPointShadows=X,re.numSpotShadows=O,re.numSpotMaps=k,re.numLightProbes=C,a.version=yw++)}function m(v,y){let x=0,S=0,M=0,E=0,_=0;const g=y.matrixWorldInverse;for(let L=0,b=v.length;L<b;L++){const D=v[L];if(D.isDirectionalLight){const X=a.directional[x];X.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),X.direction.sub(l),X.direction.transformDirection(g),x++}else if(D.isSpotLight){const X=a.spot[M];X.position.setFromMatrixPosition(D.matrixWorld),X.position.applyMatrix4(g),X.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),X.direction.sub(l),X.direction.transformDirection(g),M++}else if(D.isRectAreaLight){const X=a.rectArea[E];X.position.setFromMatrixPosition(D.matrixWorld),X.position.applyMatrix4(g),u.identity(),f.copy(D.matrixWorld),f.premultiply(g),u.extractRotation(f),X.halfWidth.set(D.width*.5,0,0),X.halfHeight.set(0,D.height*.5,0),X.halfWidth.applyMatrix4(u),X.halfHeight.applyMatrix4(u),E++}else if(D.isPointLight){const X=a.point[S];X.position.setFromMatrixPosition(D.matrixWorld),X.position.applyMatrix4(g),S++}else if(D.isHemisphereLight){const X=a.hemi[_];X.direction.setFromMatrixPosition(D.matrixWorld),X.direction.transformDirection(g),_++}}}return{setup:h,setupView:m,state:a}}function Gm(r,e){const n=new Mw(r,e),s=[],a=[];function l(){s.length=0,a.length=0}function f(y){s.push(y)}function u(y){a.push(y)}function h(y){n.setup(s,y)}function m(y){n.setupView(s,y)}return{init:l,state:{lightsArray:s,shadowsArray:a,lights:n},setupLights:h,setupLightsView:m,pushLight:f,pushShadow:u}}function Ew(r,e){let n=new WeakMap;function s(l,f=0){const u=n.get(l);let h;return u===void 0?(h=new Gm(r,e),n.set(l,[h])):f>=u.length?(h=new Gm(r,e),u.push(h)):h=u[f],h}function a(){n=new WeakMap}return{get:s,dispose:a}}class ww extends Qs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=y0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Tw extends Qs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Aw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Cw(r,e,n){let s=new Rg;const a=new bt,l=new bt,f=new cn,u=new ww({depthPacking:S0}),h=new Tw,m={},v=n.maxTextureSize,y={[Tr]:In,[In]:Tr,[Gi]:Gi},x=new ts({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new bt},radius:{value:4}},vertexShader:Aw,fragmentShader:bw}),S=x.clone();S.defines.HORIZONTAL_PASS=1;const M=new ti;M.setAttribute("position",new ei(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new Mi(M,x),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=og;let g=this.type;this.render=function(O,k,he){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||O.length===0)return;const C=r.getRenderTarget(),A=r.getActiveCubeFace(),re=r.getActiveMipmapLevel(),ee=r.state;ee.setBlending(Mr),ee.buffers.color.setClear(1,1,1,1),ee.buffers.depth.setTest(!0),ee.setScissorTest(!1);const W=g!==Hi&&this.type===Hi,F=g===Hi&&this.type!==Hi;for(let Y=0,Q=O.length;Y<Q;Y++){const ie=O[Y],V=ie.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;a.copy(V.mapSize);const z=V.getFrameExtents();if(a.multiply(z),l.copy(V.mapSize),(a.x>v||a.y>v)&&(a.x>v&&(l.x=Math.floor(v/z.x),a.x=l.x*z.x,V.mapSize.x=l.x),a.y>v&&(l.y=Math.floor(v/z.y),a.y=l.y*z.y,V.mapSize.y=l.y)),V.map===null||W===!0||F===!0){const N=this.type!==Hi?{minFilter:Mn,magFilter:Mn}:{};V.map!==null&&V.map.dispose(),V.map=new es(a.x,a.y,N),V.map.texture.name=ie.name+".shadowMap",V.camera.updateProjectionMatrix()}r.setRenderTarget(V.map),r.clear();const j=V.getViewportCount();for(let N=0;N<j;N++){const $=V.getViewport(N);f.set(l.x*$.x,l.y*$.y,l.x*$.z,l.y*$.w),ee.viewport(f),V.updateMatrices(ie,N),s=V.getFrustum(),D(k,he,V.camera,ie,this.type)}V.isPointLightShadow!==!0&&this.type===Hi&&L(V,he),V.needsUpdate=!1}g=this.type,_.needsUpdate=!1,r.setRenderTarget(C,A,re)};function L(O,k){const he=e.update(E);x.defines.VSM_SAMPLES!==O.blurSamples&&(x.defines.VSM_SAMPLES=O.blurSamples,S.defines.VSM_SAMPLES=O.blurSamples,x.needsUpdate=!0,S.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new es(a.x,a.y)),x.uniforms.shadow_pass.value=O.map.texture,x.uniforms.resolution.value=O.mapSize,x.uniforms.radius.value=O.radius,r.setRenderTarget(O.mapPass),r.clear(),r.renderBufferDirect(k,null,he,x,E,null),S.uniforms.shadow_pass.value=O.mapPass.texture,S.uniforms.resolution.value=O.mapSize,S.uniforms.radius.value=O.radius,r.setRenderTarget(O.map),r.clear(),r.renderBufferDirect(k,null,he,S,E,null)}function b(O,k,he,C){let A=null;const re=he.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(re!==void 0)A=re;else if(A=he.isPointLight===!0?h:u,r.localClippingEnabled&&k.clipShadows===!0&&Array.isArray(k.clippingPlanes)&&k.clippingPlanes.length!==0||k.displacementMap&&k.displacementScale!==0||k.alphaMap&&k.alphaTest>0||k.map&&k.alphaTest>0){const ee=A.uuid,W=k.uuid;let F=m[ee];F===void 0&&(F={},m[ee]=F);let Y=F[W];Y===void 0&&(Y=A.clone(),F[W]=Y,k.addEventListener("dispose",X)),A=Y}if(A.visible=k.visible,A.wireframe=k.wireframe,C===Hi?A.side=k.shadowSide!==null?k.shadowSide:k.side:A.side=k.shadowSide!==null?k.shadowSide:y[k.side],A.alphaMap=k.alphaMap,A.alphaTest=k.alphaTest,A.map=k.map,A.clipShadows=k.clipShadows,A.clippingPlanes=k.clippingPlanes,A.clipIntersection=k.clipIntersection,A.displacementMap=k.displacementMap,A.displacementScale=k.displacementScale,A.displacementBias=k.displacementBias,A.wireframeLinewidth=k.wireframeLinewidth,A.linewidth=k.linewidth,he.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const ee=r.properties.get(A);ee.light=he}return A}function D(O,k,he,C,A){if(O.visible===!1)return;if(O.layers.test(k.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&A===Hi)&&(!O.frustumCulled||s.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(he.matrixWorldInverse,O.matrixWorld);const W=e.update(O),F=O.material;if(Array.isArray(F)){const Y=W.groups;for(let Q=0,ie=Y.length;Q<ie;Q++){const V=Y[Q],z=F[V.materialIndex];if(z&&z.visible){const j=b(O,z,C,A);O.onBeforeShadow(r,O,k,he,W,j,V),r.renderBufferDirect(he,null,W,j,O,V),O.onAfterShadow(r,O,k,he,W,j,V)}}}else if(F.visible){const Y=b(O,F,C,A);O.onBeforeShadow(r,O,k,he,W,Y,null),r.renderBufferDirect(he,null,W,Y,O,null),O.onAfterShadow(r,O,k,he,W,Y,null)}}const ee=O.children;for(let W=0,F=ee.length;W<F;W++)D(ee[W],k,he,C,A)}function X(O){O.target.removeEventListener("dispose",X);for(const he in m){const C=m[he],A=O.target.uuid;A in C&&(C[A].dispose(),delete C[A])}}}function Rw(r,e,n){const s=n.isWebGL2;function a(){let G=!1;const Ne=new cn;let Ue=null;const st=new cn(0,0,0,0);return{setMask:function(et){Ue!==et&&!G&&(r.colorMask(et,et,et,et),Ue=et)},setLocked:function(et){G=et},setClear:function(et,Et,wt,Ht,en){en===!0&&(et*=Ht,Et*=Ht,wt*=Ht),Ne.set(et,Et,wt,Ht),st.equals(Ne)===!1&&(r.clearColor(et,Et,wt,Ht),st.copy(Ne))},reset:function(){G=!1,Ue=null,st.set(-1,0,0,0)}}}function l(){let G=!1,Ne=null,Ue=null,st=null;return{setTest:function(et){et?ze(r.DEPTH_TEST):Ve(r.DEPTH_TEST)},setMask:function(et){Ne!==et&&!G&&(r.depthMask(et),Ne=et)},setFunc:function(et){if(Ue!==et){switch(et){case Kx:r.depthFunc(r.NEVER);break;case Zx:r.depthFunc(r.ALWAYS);break;case Qx:r.depthFunc(r.LESS);break;case Il:r.depthFunc(r.LEQUAL);break;case Jx:r.depthFunc(r.EQUAL);break;case e0:r.depthFunc(r.GEQUAL);break;case t0:r.depthFunc(r.GREATER);break;case n0:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Ue=et}},setLocked:function(et){G=et},setClear:function(et){st!==et&&(r.clearDepth(et),st=et)},reset:function(){G=!1,Ne=null,Ue=null,st=null}}}function f(){let G=!1,Ne=null,Ue=null,st=null,et=null,Et=null,wt=null,Ht=null,en=null;return{setTest:function(yt){G||(yt?ze(r.STENCIL_TEST):Ve(r.STENCIL_TEST))},setMask:function(yt){Ne!==yt&&!G&&(r.stencilMask(yt),Ne=yt)},setFunc:function(yt,$t,un){(Ue!==yt||st!==$t||et!==un)&&(r.stencilFunc(yt,$t,un),Ue=yt,st=$t,et=un)},setOp:function(yt,$t,un){(Et!==yt||wt!==$t||Ht!==un)&&(r.stencilOp(yt,$t,un),Et=yt,wt=$t,Ht=un)},setLocked:function(yt){G=yt},setClear:function(yt){en!==yt&&(r.clearStencil(yt),en=yt)},reset:function(){G=!1,Ne=null,Ue=null,st=null,et=null,Et=null,wt=null,Ht=null,en=null}}}const u=new a,h=new l,m=new f,v=new WeakMap,y=new WeakMap;let x={},S={},M=new WeakMap,E=[],_=null,g=!1,L=null,b=null,D=null,X=null,O=null,k=null,he=null,C=new Mt(0,0,0),A=0,re=!1,ee=null,W=null,F=null,Y=null,Q=null;const ie=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,z=0;const j=r.getParameter(r.VERSION);j.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(j)[1]),V=z>=1):j.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),V=z>=2);let N=null,$={};const Z=r.getParameter(r.SCISSOR_BOX),de=r.getParameter(r.VIEWPORT),me=new cn().fromArray(Z),Me=new cn().fromArray(de);function Te(G,Ne,Ue,st){const et=new Uint8Array(4),Et=r.createTexture();r.bindTexture(G,Et),r.texParameteri(G,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(G,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let wt=0;wt<Ue;wt++)s&&(G===r.TEXTURE_3D||G===r.TEXTURE_2D_ARRAY)?r.texImage3D(Ne,0,r.RGBA,1,1,st,0,r.RGBA,r.UNSIGNED_BYTE,et):r.texImage2D(Ne+wt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,et);return Et}const Ae={};Ae[r.TEXTURE_2D]=Te(r.TEXTURE_2D,r.TEXTURE_2D,1),Ae[r.TEXTURE_CUBE_MAP]=Te(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),s&&(Ae[r.TEXTURE_2D_ARRAY]=Te(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ae[r.TEXTURE_3D]=Te(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),u.setClear(0,0,0,1),h.setClear(1),m.setClear(0),ze(r.DEPTH_TEST),h.setFunc(Il),je(!1),P(Ep),ze(r.CULL_FACE),We(Mr);function ze(G){x[G]!==!0&&(r.enable(G),x[G]=!0)}function Ve(G){x[G]!==!1&&(r.disable(G),x[G]=!1)}function Pe(G,Ne){return S[G]!==Ne?(r.bindFramebuffer(G,Ne),S[G]=Ne,s&&(G===r.DRAW_FRAMEBUFFER&&(S[r.FRAMEBUFFER]=Ne),G===r.FRAMEBUFFER&&(S[r.DRAW_FRAMEBUFFER]=Ne)),!0):!1}function ne(G,Ne){let Ue=E,st=!1;if(G)if(Ue=M.get(Ne),Ue===void 0&&(Ue=[],M.set(Ne,Ue)),G.isWebGLMultipleRenderTargets){const et=G.texture;if(Ue.length!==et.length||Ue[0]!==r.COLOR_ATTACHMENT0){for(let Et=0,wt=et.length;Et<wt;Et++)Ue[Et]=r.COLOR_ATTACHMENT0+Et;Ue.length=et.length,st=!0}}else Ue[0]!==r.COLOR_ATTACHMENT0&&(Ue[0]=r.COLOR_ATTACHMENT0,st=!0);else Ue[0]!==r.BACK&&(Ue[0]=r.BACK,st=!0);st&&(n.isWebGL2?r.drawBuffers(Ue):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Ue))}function kt(G){return _!==G?(r.useProgram(G),_=G,!0):!1}const Ce={[Yr]:r.FUNC_ADD,[Ux]:r.FUNC_SUBTRACT,[Fx]:r.FUNC_REVERSE_SUBTRACT};if(s)Ce[bp]=r.MIN,Ce[Cp]=r.MAX;else{const G=e.get("EXT_blend_minmax");G!==null&&(Ce[bp]=G.MIN_EXT,Ce[Cp]=G.MAX_EXT)}const it={[Ox]:r.ZERO,[kx]:r.ONE,[zx]:r.SRC_COLOR,[pf]:r.SRC_ALPHA,[jx]:r.SRC_ALPHA_SATURATE,[Vx]:r.DST_COLOR,[Hx]:r.DST_ALPHA,[Bx]:r.ONE_MINUS_SRC_COLOR,[mf]:r.ONE_MINUS_SRC_ALPHA,[Wx]:r.ONE_MINUS_DST_COLOR,[Gx]:r.ONE_MINUS_DST_ALPHA,[Xx]:r.CONSTANT_COLOR,[qx]:r.ONE_MINUS_CONSTANT_COLOR,[$x]:r.CONSTANT_ALPHA,[Yx]:r.ONE_MINUS_CONSTANT_ALPHA};function We(G,Ne,Ue,st,et,Et,wt,Ht,en,yt){if(G===Mr){g===!0&&(Ve(r.BLEND),g=!1);return}if(g===!1&&(ze(r.BLEND),g=!0),G!==Ix){if(G!==L||yt!==re){if((b!==Yr||O!==Yr)&&(r.blendEquation(r.FUNC_ADD),b=Yr,O=Yr),yt)switch(G){case Ws:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case wp:r.blendFunc(r.ONE,r.ONE);break;case Tp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ap:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case Ws:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case wp:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Tp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ap:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}D=null,X=null,k=null,he=null,C.set(0,0,0),A=0,L=G,re=yt}return}et=et||Ne,Et=Et||Ue,wt=wt||st,(Ne!==b||et!==O)&&(r.blendEquationSeparate(Ce[Ne],Ce[et]),b=Ne,O=et),(Ue!==D||st!==X||Et!==k||wt!==he)&&(r.blendFuncSeparate(it[Ue],it[st],it[Et],it[wt]),D=Ue,X=st,k=Et,he=wt),(Ht.equals(C)===!1||en!==A)&&(r.blendColor(Ht.r,Ht.g,Ht.b,en),C.copy(Ht),A=en),L=G,re=!1}function xt(G,Ne){G.side===Gi?Ve(r.CULL_FACE):ze(r.CULL_FACE);let Ue=G.side===In;Ne&&(Ue=!Ue),je(Ue),G.blending===Ws&&G.transparent===!1?We(Mr):We(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),h.setFunc(G.depthFunc),h.setTest(G.depthTest),h.setMask(G.depthWrite),u.setMask(G.colorWrite);const st=G.stencilWrite;m.setTest(st),st&&(m.setMask(G.stencilWriteMask),m.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),m.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),oe(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?ze(r.SAMPLE_ALPHA_TO_COVERAGE):Ve(r.SAMPLE_ALPHA_TO_COVERAGE)}function je(G){ee!==G&&(G?r.frontFace(r.CW):r.frontFace(r.CCW),ee=G)}function P(G){G!==Lx?(ze(r.CULL_FACE),G!==W&&(G===Ep?r.cullFace(r.BACK):G===Nx?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ve(r.CULL_FACE),W=G}function T(G){G!==F&&(V&&r.lineWidth(G),F=G)}function oe(G,Ne,Ue){G?(ze(r.POLYGON_OFFSET_FILL),(Y!==Ne||Q!==Ue)&&(r.polygonOffset(Ne,Ue),Y=Ne,Q=Ue)):Ve(r.POLYGON_OFFSET_FILL)}function ye(G){G?ze(r.SCISSOR_TEST):Ve(r.SCISSOR_TEST)}function _e(G){G===void 0&&(G=r.TEXTURE0+ie-1),N!==G&&(r.activeTexture(G),N=G)}function ge(G,Ne,Ue){Ue===void 0&&(N===null?Ue=r.TEXTURE0+ie-1:Ue=N);let st=$[Ue];st===void 0&&(st={type:void 0,texture:void 0},$[Ue]=st),(st.type!==G||st.texture!==Ne)&&(N!==Ue&&(r.activeTexture(Ue),N=Ue),r.bindTexture(G,Ne||Ae[G]),st.type=G,st.texture=Ne)}function Ye(){const G=$[N];G!==void 0&&G.type!==void 0&&(r.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function Ie(){try{r.compressedTexImage2D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Be(){try{r.compressedTexImage3D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function B(){try{r.texSubImage2D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ue(){try{r.texSubImage3D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function K(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Re(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function we(){try{r.texStorage2D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Qe(){try{r.texStorage3D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function qe(){try{r.texImage2D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Le(){try{r.texImage3D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Je(G){me.equals(G)===!1&&(r.scissor(G.x,G.y,G.z,G.w),me.copy(G))}function gt(G){Me.equals(G)===!1&&(r.viewport(G.x,G.y,G.z,G.w),Me.copy(G))}function Ct(G,Ne){let Ue=y.get(Ne);Ue===void 0&&(Ue=new WeakMap,y.set(Ne,Ue));let st=Ue.get(G);st===void 0&&(st=r.getUniformBlockIndex(Ne,G.name),Ue.set(G,st))}function ct(G,Ne){const st=y.get(Ne).get(G);v.get(Ne)!==st&&(r.uniformBlockBinding(Ne,st,G.__bindingPointIndex),v.set(Ne,st))}function be(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),s===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),x={},N=null,$={},S={},M=new WeakMap,E=[],_=null,g=!1,L=null,b=null,D=null,X=null,O=null,k=null,he=null,C=new Mt(0,0,0),A=0,re=!1,ee=null,W=null,F=null,Y=null,Q=null,me.set(0,0,r.canvas.width,r.canvas.height),Me.set(0,0,r.canvas.width,r.canvas.height),u.reset(),h.reset(),m.reset()}return{buffers:{color:u,depth:h,stencil:m},enable:ze,disable:Ve,bindFramebuffer:Pe,drawBuffers:ne,useProgram:kt,setBlending:We,setMaterial:xt,setFlipSided:je,setCullFace:P,setLineWidth:T,setPolygonOffset:oe,setScissorTest:ye,activeTexture:_e,bindTexture:ge,unbindTexture:Ye,compressedTexImage2D:Ie,compressedTexImage3D:Be,texImage2D:qe,texImage3D:Le,updateUBOMapping:Ct,uniformBlockBinding:ct,texStorage2D:we,texStorage3D:Qe,texSubImage2D:B,texSubImage3D:ue,compressedTexSubImage2D:K,compressedTexSubImage3D:Re,scissor:Je,viewport:gt,reset:be}}function Pw(r,e,n,s,a,l,f){const u=a.isWebGL2,h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),v=new WeakMap;let y;const x=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(P,T){return S?new OffscreenCanvas(P,T):zl("canvas")}function E(P,T,oe,ye){let _e=1;if((P.width>ye||P.height>ye)&&(_e=ye/Math.max(P.width,P.height)),_e<1||T===!0)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap){const ge=T?Mf:Math.floor,Ye=ge(_e*P.width),Ie=ge(_e*P.height);y===void 0&&(y=M(Ye,Ie));const Be=oe?M(Ye,Ie):y;return Be.width=Ye,Be.height=Ie,Be.getContext("2d").drawImage(P,0,0,Ye,Ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+Ye+"x"+Ie+")."),Be}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),P;return P}function _(P){return rm(P.width)&&rm(P.height)}function g(P){return u?!1:P.wrapS!==di||P.wrapT!==di||P.minFilter!==Mn&&P.minFilter!==Kn}function L(P,T){return P.generateMipmaps&&T&&P.minFilter!==Mn&&P.minFilter!==Kn}function b(P){r.generateMipmap(P)}function D(P,T,oe,ye,_e=!1){if(u===!1)return T;if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ge=T;if(T===r.RED&&(oe===r.FLOAT&&(ge=r.R32F),oe===r.HALF_FLOAT&&(ge=r.R16F),oe===r.UNSIGNED_BYTE&&(ge=r.R8)),T===r.RED_INTEGER&&(oe===r.UNSIGNED_BYTE&&(ge=r.R8UI),oe===r.UNSIGNED_SHORT&&(ge=r.R16UI),oe===r.UNSIGNED_INT&&(ge=r.R32UI),oe===r.BYTE&&(ge=r.R8I),oe===r.SHORT&&(ge=r.R16I),oe===r.INT&&(ge=r.R32I)),T===r.RG&&(oe===r.FLOAT&&(ge=r.RG32F),oe===r.HALF_FLOAT&&(ge=r.RG16F),oe===r.UNSIGNED_BYTE&&(ge=r.RG8)),T===r.RGBA){const Ye=_e?Ul:At.getTransfer(ye);oe===r.FLOAT&&(ge=r.RGBA32F),oe===r.HALF_FLOAT&&(ge=r.RGBA16F),oe===r.UNSIGNED_BYTE&&(ge=Ye===It?r.SRGB8_ALPHA8:r.RGBA8),oe===r.UNSIGNED_SHORT_4_4_4_4&&(ge=r.RGBA4),oe===r.UNSIGNED_SHORT_5_5_5_1&&(ge=r.RGB5_A1)}return(ge===r.R16F||ge===r.R32F||ge===r.RG16F||ge===r.RG32F||ge===r.RGBA16F||ge===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ge}function X(P,T,oe){return L(P,oe)===!0||P.isFramebufferTexture&&P.minFilter!==Mn&&P.minFilter!==Kn?Math.log2(Math.max(T.width,T.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?T.mipmaps.length:1}function O(P){return P===Mn||P===Rp||P===Du?r.NEAREST:r.LINEAR}function k(P){const T=P.target;T.removeEventListener("dispose",k),C(T),T.isVideoTexture&&v.delete(T)}function he(P){const T=P.target;T.removeEventListener("dispose",he),re(T)}function C(P){const T=s.get(P);if(T.__webglInit===void 0)return;const oe=P.source,ye=x.get(oe);if(ye){const _e=ye[T.__cacheKey];_e.usedTimes--,_e.usedTimes===0&&A(P),Object.keys(ye).length===0&&x.delete(oe)}s.remove(P)}function A(P){const T=s.get(P);r.deleteTexture(T.__webglTexture);const oe=P.source,ye=x.get(oe);delete ye[T.__cacheKey],f.memory.textures--}function re(P){const T=P.texture,oe=s.get(P),ye=s.get(T);if(ye.__webglTexture!==void 0&&(r.deleteTexture(ye.__webglTexture),f.memory.textures--),P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let _e=0;_e<6;_e++){if(Array.isArray(oe.__webglFramebuffer[_e]))for(let ge=0;ge<oe.__webglFramebuffer[_e].length;ge++)r.deleteFramebuffer(oe.__webglFramebuffer[_e][ge]);else r.deleteFramebuffer(oe.__webglFramebuffer[_e]);oe.__webglDepthbuffer&&r.deleteRenderbuffer(oe.__webglDepthbuffer[_e])}else{if(Array.isArray(oe.__webglFramebuffer))for(let _e=0;_e<oe.__webglFramebuffer.length;_e++)r.deleteFramebuffer(oe.__webglFramebuffer[_e]);else r.deleteFramebuffer(oe.__webglFramebuffer);if(oe.__webglDepthbuffer&&r.deleteRenderbuffer(oe.__webglDepthbuffer),oe.__webglMultisampledFramebuffer&&r.deleteFramebuffer(oe.__webglMultisampledFramebuffer),oe.__webglColorRenderbuffer)for(let _e=0;_e<oe.__webglColorRenderbuffer.length;_e++)oe.__webglColorRenderbuffer[_e]&&r.deleteRenderbuffer(oe.__webglColorRenderbuffer[_e]);oe.__webglDepthRenderbuffer&&r.deleteRenderbuffer(oe.__webglDepthRenderbuffer)}if(P.isWebGLMultipleRenderTargets)for(let _e=0,ge=T.length;_e<ge;_e++){const Ye=s.get(T[_e]);Ye.__webglTexture&&(r.deleteTexture(Ye.__webglTexture),f.memory.textures--),s.remove(T[_e])}s.remove(T),s.remove(P)}let ee=0;function W(){ee=0}function F(){const P=ee;return P>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+a.maxTextures),ee+=1,P}function Y(P){const T=[];return T.push(P.wrapS),T.push(P.wrapT),T.push(P.wrapR||0),T.push(P.magFilter),T.push(P.minFilter),T.push(P.anisotropy),T.push(P.internalFormat),T.push(P.format),T.push(P.type),T.push(P.generateMipmaps),T.push(P.premultiplyAlpha),T.push(P.flipY),T.push(P.unpackAlignment),T.push(P.colorSpace),T.join()}function Q(P,T){const oe=s.get(P);if(P.isVideoTexture&&xt(P),P.isRenderTargetTexture===!1&&P.version>0&&oe.__version!==P.version){const ye=P.image;if(ye===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ye.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{me(oe,P,T);return}}n.bindTexture(r.TEXTURE_2D,oe.__webglTexture,r.TEXTURE0+T)}function ie(P,T){const oe=s.get(P);if(P.version>0&&oe.__version!==P.version){me(oe,P,T);return}n.bindTexture(r.TEXTURE_2D_ARRAY,oe.__webglTexture,r.TEXTURE0+T)}function V(P,T){const oe=s.get(P);if(P.version>0&&oe.__version!==P.version){me(oe,P,T);return}n.bindTexture(r.TEXTURE_3D,oe.__webglTexture,r.TEXTURE0+T)}function z(P,T){const oe=s.get(P);if(P.version>0&&oe.__version!==P.version){Me(oe,P,T);return}n.bindTexture(r.TEXTURE_CUBE_MAP,oe.__webglTexture,r.TEXTURE0+T)}const j={[_f]:r.REPEAT,[di]:r.CLAMP_TO_EDGE,[xf]:r.MIRRORED_REPEAT},N={[Mn]:r.NEAREST,[Rp]:r.NEAREST_MIPMAP_NEAREST,[Du]:r.NEAREST_MIPMAP_LINEAR,[Kn]:r.LINEAR,[f0]:r.LINEAR_MIPMAP_NEAREST,[Wo]:r.LINEAR_MIPMAP_LINEAR},$={[w0]:r.NEVER,[P0]:r.ALWAYS,[T0]:r.LESS,[vg]:r.LEQUAL,[A0]:r.EQUAL,[R0]:r.GEQUAL,[b0]:r.GREATER,[C0]:r.NOTEQUAL};function Z(P,T,oe){if(oe?(r.texParameteri(P,r.TEXTURE_WRAP_S,j[T.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,j[T.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,j[T.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,N[T.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,N[T.minFilter])):(r.texParameteri(P,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(P,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(T.wrapS!==di||T.wrapT!==di)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(P,r.TEXTURE_MAG_FILTER,O(T.magFilter)),r.texParameteri(P,r.TEXTURE_MIN_FILTER,O(T.minFilter)),T.minFilter!==Mn&&T.minFilter!==Kn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),T.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,$[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ye=e.get("EXT_texture_filter_anisotropic");if(T.magFilter===Mn||T.minFilter!==Du&&T.minFilter!==Wo||T.type===Sr&&e.has("OES_texture_float_linear")===!1||u===!1&&T.type===jo&&e.has("OES_texture_half_float_linear")===!1)return;(T.anisotropy>1||s.get(T).__currentAnisotropy)&&(r.texParameterf(P,ye.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,a.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy)}}function de(P,T){let oe=!1;P.__webglInit===void 0&&(P.__webglInit=!0,T.addEventListener("dispose",k));const ye=T.source;let _e=x.get(ye);_e===void 0&&(_e={},x.set(ye,_e));const ge=Y(T);if(ge!==P.__cacheKey){_e[ge]===void 0&&(_e[ge]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,oe=!0),_e[ge].usedTimes++;const Ye=_e[P.__cacheKey];Ye!==void 0&&(_e[P.__cacheKey].usedTimes--,Ye.usedTimes===0&&A(T)),P.__cacheKey=ge,P.__webglTexture=_e[ge].texture}return oe}function me(P,T,oe){let ye=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ye=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ye=r.TEXTURE_3D);const _e=de(P,T),ge=T.source;n.bindTexture(ye,P.__webglTexture,r.TEXTURE0+oe);const Ye=s.get(ge);if(ge.version!==Ye.__version||_e===!0){n.activeTexture(r.TEXTURE0+oe);const Ie=At.getPrimaries(At.workingColorSpace),Be=T.colorSpace===Jn?null:At.getPrimaries(T.colorSpace),B=T.colorSpace===Jn||Ie===Be?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,B);const ue=g(T)&&_(T.image)===!1;let K=E(T.image,ue,!1,a.maxTextureSize);K=je(T,K);const Re=_(K)||u,we=l.convert(T.format,T.colorSpace);let Qe=l.convert(T.type),qe=D(T.internalFormat,we,Qe,T.colorSpace,T.isVideoTexture);Z(ye,T,Re);let Le;const Je=T.mipmaps,gt=u&&T.isVideoTexture!==!0&&qe!==mg,Ct=Ye.__version===void 0||_e===!0,ct=X(T,K,Re);if(T.isDepthTexture)qe=r.DEPTH_COMPONENT,u?T.type===Sr?qe=r.DEPTH_COMPONENT32F:T.type===yr?qe=r.DEPTH_COMPONENT24:T.type===Zr?qe=r.DEPTH24_STENCIL8:qe=r.DEPTH_COMPONENT16:T.type===Sr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),T.format===Qr&&qe===r.DEPTH_COMPONENT&&T.type!==Cf&&T.type!==yr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),T.type=yr,Qe=l.convert(T.type)),T.format===$s&&qe===r.DEPTH_COMPONENT&&(qe=r.DEPTH_STENCIL,T.type!==Zr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),T.type=Zr,Qe=l.convert(T.type))),Ct&&(gt?n.texStorage2D(r.TEXTURE_2D,1,qe,K.width,K.height):n.texImage2D(r.TEXTURE_2D,0,qe,K.width,K.height,0,we,Qe,null));else if(T.isDataTexture)if(Je.length>0&&Re){gt&&Ct&&n.texStorage2D(r.TEXTURE_2D,ct,qe,Je[0].width,Je[0].height);for(let be=0,G=Je.length;be<G;be++)Le=Je[be],gt?n.texSubImage2D(r.TEXTURE_2D,be,0,0,Le.width,Le.height,we,Qe,Le.data):n.texImage2D(r.TEXTURE_2D,be,qe,Le.width,Le.height,0,we,Qe,Le.data);T.generateMipmaps=!1}else gt?(Ct&&n.texStorage2D(r.TEXTURE_2D,ct,qe,K.width,K.height),n.texSubImage2D(r.TEXTURE_2D,0,0,0,K.width,K.height,we,Qe,K.data)):n.texImage2D(r.TEXTURE_2D,0,qe,K.width,K.height,0,we,Qe,K.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){gt&&Ct&&n.texStorage3D(r.TEXTURE_2D_ARRAY,ct,qe,Je[0].width,Je[0].height,K.depth);for(let be=0,G=Je.length;be<G;be++)Le=Je[be],T.format!==hi?we!==null?gt?n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,be,0,0,0,Le.width,Le.height,K.depth,we,Le.data,0,0):n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,be,qe,Le.width,Le.height,K.depth,0,Le.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?n.texSubImage3D(r.TEXTURE_2D_ARRAY,be,0,0,0,Le.width,Le.height,K.depth,we,Qe,Le.data):n.texImage3D(r.TEXTURE_2D_ARRAY,be,qe,Le.width,Le.height,K.depth,0,we,Qe,Le.data)}else{gt&&Ct&&n.texStorage2D(r.TEXTURE_2D,ct,qe,Je[0].width,Je[0].height);for(let be=0,G=Je.length;be<G;be++)Le=Je[be],T.format!==hi?we!==null?gt?n.compressedTexSubImage2D(r.TEXTURE_2D,be,0,0,Le.width,Le.height,we,Le.data):n.compressedTexImage2D(r.TEXTURE_2D,be,qe,Le.width,Le.height,0,Le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?n.texSubImage2D(r.TEXTURE_2D,be,0,0,Le.width,Le.height,we,Qe,Le.data):n.texImage2D(r.TEXTURE_2D,be,qe,Le.width,Le.height,0,we,Qe,Le.data)}else if(T.isDataArrayTexture)gt?(Ct&&n.texStorage3D(r.TEXTURE_2D_ARRAY,ct,qe,K.width,K.height,K.depth),n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,we,Qe,K.data)):n.texImage3D(r.TEXTURE_2D_ARRAY,0,qe,K.width,K.height,K.depth,0,we,Qe,K.data);else if(T.isData3DTexture)gt?(Ct&&n.texStorage3D(r.TEXTURE_3D,ct,qe,K.width,K.height,K.depth),n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,we,Qe,K.data)):n.texImage3D(r.TEXTURE_3D,0,qe,K.width,K.height,K.depth,0,we,Qe,K.data);else if(T.isFramebufferTexture){if(Ct)if(gt)n.texStorage2D(r.TEXTURE_2D,ct,qe,K.width,K.height);else{let be=K.width,G=K.height;for(let Ne=0;Ne<ct;Ne++)n.texImage2D(r.TEXTURE_2D,Ne,qe,be,G,0,we,Qe,null),be>>=1,G>>=1}}else if(Je.length>0&&Re){gt&&Ct&&n.texStorage2D(r.TEXTURE_2D,ct,qe,Je[0].width,Je[0].height);for(let be=0,G=Je.length;be<G;be++)Le=Je[be],gt?n.texSubImage2D(r.TEXTURE_2D,be,0,0,we,Qe,Le):n.texImage2D(r.TEXTURE_2D,be,qe,we,Qe,Le);T.generateMipmaps=!1}else gt?(Ct&&n.texStorage2D(r.TEXTURE_2D,ct,qe,K.width,K.height),n.texSubImage2D(r.TEXTURE_2D,0,0,0,we,Qe,K)):n.texImage2D(r.TEXTURE_2D,0,qe,we,Qe,K);L(T,Re)&&b(ye),Ye.__version=ge.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function Me(P,T,oe){if(T.image.length!==6)return;const ye=de(P,T),_e=T.source;n.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+oe);const ge=s.get(_e);if(_e.version!==ge.__version||ye===!0){n.activeTexture(r.TEXTURE0+oe);const Ye=At.getPrimaries(At.workingColorSpace),Ie=T.colorSpace===Jn?null:At.getPrimaries(T.colorSpace),Be=T.colorSpace===Jn||Ye===Ie?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be);const B=T.isCompressedTexture||T.image[0].isCompressedTexture,ue=T.image[0]&&T.image[0].isDataTexture,K=[];for(let be=0;be<6;be++)!B&&!ue?K[be]=E(T.image[be],!1,!0,a.maxCubemapSize):K[be]=ue?T.image[be].image:T.image[be],K[be]=je(T,K[be]);const Re=K[0],we=_(Re)||u,Qe=l.convert(T.format,T.colorSpace),qe=l.convert(T.type),Le=D(T.internalFormat,Qe,qe,T.colorSpace),Je=u&&T.isVideoTexture!==!0,gt=ge.__version===void 0||ye===!0;let Ct=X(T,Re,we);Z(r.TEXTURE_CUBE_MAP,T,we);let ct;if(B){Je&&gt&&n.texStorage2D(r.TEXTURE_CUBE_MAP,Ct,Le,Re.width,Re.height);for(let be=0;be<6;be++){ct=K[be].mipmaps;for(let G=0;G<ct.length;G++){const Ne=ct[G];T.format!==hi?Qe!==null?Je?n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,G,0,0,Ne.width,Ne.height,Qe,Ne.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,G,Le,Ne.width,Ne.height,0,Ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Je?n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,G,0,0,Ne.width,Ne.height,Qe,qe,Ne.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,G,Le,Ne.width,Ne.height,0,Qe,qe,Ne.data)}}}else{ct=T.mipmaps,Je&&gt&&(ct.length>0&&Ct++,n.texStorage2D(r.TEXTURE_CUBE_MAP,Ct,Le,K[0].width,K[0].height));for(let be=0;be<6;be++)if(ue){Je?n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,K[be].width,K[be].height,Qe,qe,K[be].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Le,K[be].width,K[be].height,0,Qe,qe,K[be].data);for(let G=0;G<ct.length;G++){const Ue=ct[G].image[be].image;Je?n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,G+1,0,0,Ue.width,Ue.height,Qe,qe,Ue.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,G+1,Le,Ue.width,Ue.height,0,Qe,qe,Ue.data)}}else{Je?n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,Qe,qe,K[be]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Le,Qe,qe,K[be]);for(let G=0;G<ct.length;G++){const Ne=ct[G];Je?n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,G+1,0,0,Qe,qe,Ne.image[be]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,G+1,Le,Qe,qe,Ne.image[be])}}}L(T,we)&&b(r.TEXTURE_CUBE_MAP),ge.__version=_e.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function Te(P,T,oe,ye,_e,ge){const Ye=l.convert(oe.format,oe.colorSpace),Ie=l.convert(oe.type),Be=D(oe.internalFormat,Ye,Ie,oe.colorSpace);if(!s.get(T).__hasExternalTextures){const ue=Math.max(1,T.width>>ge),K=Math.max(1,T.height>>ge);_e===r.TEXTURE_3D||_e===r.TEXTURE_2D_ARRAY?n.texImage3D(_e,ge,Be,ue,K,T.depth,0,Ye,Ie,null):n.texImage2D(_e,ge,Be,ue,K,0,Ye,Ie,null)}n.bindFramebuffer(r.FRAMEBUFFER,P),We(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ye,_e,s.get(oe).__webglTexture,0,it(T)):(_e===r.TEXTURE_2D||_e>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&_e<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ye,_e,s.get(oe).__webglTexture,ge),n.bindFramebuffer(r.FRAMEBUFFER,null)}function Ae(P,T,oe){if(r.bindRenderbuffer(r.RENDERBUFFER,P),T.depthBuffer&&!T.stencilBuffer){let ye=u===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(oe||We(T)){const _e=T.depthTexture;_e&&_e.isDepthTexture&&(_e.type===Sr?ye=r.DEPTH_COMPONENT32F:_e.type===yr&&(ye=r.DEPTH_COMPONENT24));const ge=it(T);We(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ge,ye,T.width,T.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,ge,ye,T.width,T.height)}else r.renderbufferStorage(r.RENDERBUFFER,ye,T.width,T.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,P)}else if(T.depthBuffer&&T.stencilBuffer){const ye=it(T);oe&&We(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ye,r.DEPTH24_STENCIL8,T.width,T.height):We(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ye,r.DEPTH24_STENCIL8,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,P)}else{const ye=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let _e=0;_e<ye.length;_e++){const ge=ye[_e],Ye=l.convert(ge.format,ge.colorSpace),Ie=l.convert(ge.type),Be=D(ge.internalFormat,Ye,Ie,ge.colorSpace),B=it(T);oe&&We(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,B,Be,T.width,T.height):We(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,B,Be,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,Be,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ze(P,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(r.FRAMEBUFFER,P),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!s.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),Q(T.depthTexture,0);const ye=s.get(T.depthTexture).__webglTexture,_e=it(T);if(T.depthTexture.format===Qr)We(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ye,0,_e):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ye,0);else if(T.depthTexture.format===$s)We(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ye,0,_e):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ye,0);else throw new Error("Unknown depthTexture format")}function Ve(P){const T=s.get(P),oe=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!T.__autoAllocateDepthBuffer){if(oe)throw new Error("target.depthTexture not supported in Cube render targets");ze(T.__webglFramebuffer,P)}else if(oe){T.__webglDepthbuffer=[];for(let ye=0;ye<6;ye++)n.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[ye]),T.__webglDepthbuffer[ye]=r.createRenderbuffer(),Ae(T.__webglDepthbuffer[ye],P,!1)}else n.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=r.createRenderbuffer(),Ae(T.__webglDepthbuffer,P,!1);n.bindFramebuffer(r.FRAMEBUFFER,null)}function Pe(P,T,oe){const ye=s.get(P);T!==void 0&&Te(ye.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),oe!==void 0&&Ve(P)}function ne(P){const T=P.texture,oe=s.get(P),ye=s.get(T);P.addEventListener("dispose",he),P.isWebGLMultipleRenderTargets!==!0&&(ye.__webglTexture===void 0&&(ye.__webglTexture=r.createTexture()),ye.__version=T.version,f.memory.textures++);const _e=P.isWebGLCubeRenderTarget===!0,ge=P.isWebGLMultipleRenderTargets===!0,Ye=_(P)||u;if(_e){oe.__webglFramebuffer=[];for(let Ie=0;Ie<6;Ie++)if(u&&T.mipmaps&&T.mipmaps.length>0){oe.__webglFramebuffer[Ie]=[];for(let Be=0;Be<T.mipmaps.length;Be++)oe.__webglFramebuffer[Ie][Be]=r.createFramebuffer()}else oe.__webglFramebuffer[Ie]=r.createFramebuffer()}else{if(u&&T.mipmaps&&T.mipmaps.length>0){oe.__webglFramebuffer=[];for(let Ie=0;Ie<T.mipmaps.length;Ie++)oe.__webglFramebuffer[Ie]=r.createFramebuffer()}else oe.__webglFramebuffer=r.createFramebuffer();if(ge)if(a.drawBuffers){const Ie=P.texture;for(let Be=0,B=Ie.length;Be<B;Be++){const ue=s.get(Ie[Be]);ue.__webglTexture===void 0&&(ue.__webglTexture=r.createTexture(),f.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(u&&P.samples>0&&We(P)===!1){const Ie=ge?T:[T];oe.__webglMultisampledFramebuffer=r.createFramebuffer(),oe.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,oe.__webglMultisampledFramebuffer);for(let Be=0;Be<Ie.length;Be++){const B=Ie[Be];oe.__webglColorRenderbuffer[Be]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,oe.__webglColorRenderbuffer[Be]);const ue=l.convert(B.format,B.colorSpace),K=l.convert(B.type),Re=D(B.internalFormat,ue,K,B.colorSpace,P.isXRRenderTarget===!0),we=it(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,we,Re,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Be,r.RENDERBUFFER,oe.__webglColorRenderbuffer[Be])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(oe.__webglDepthRenderbuffer=r.createRenderbuffer(),Ae(oe.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(_e){n.bindTexture(r.TEXTURE_CUBE_MAP,ye.__webglTexture),Z(r.TEXTURE_CUBE_MAP,T,Ye);for(let Ie=0;Ie<6;Ie++)if(u&&T.mipmaps&&T.mipmaps.length>0)for(let Be=0;Be<T.mipmaps.length;Be++)Te(oe.__webglFramebuffer[Ie][Be],P,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,Be);else Te(oe.__webglFramebuffer[Ie],P,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0);L(T,Ye)&&b(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ge){const Ie=P.texture;for(let Be=0,B=Ie.length;Be<B;Be++){const ue=Ie[Be],K=s.get(ue);n.bindTexture(r.TEXTURE_2D,K.__webglTexture),Z(r.TEXTURE_2D,ue,Ye),Te(oe.__webglFramebuffer,P,ue,r.COLOR_ATTACHMENT0+Be,r.TEXTURE_2D,0),L(ue,Ye)&&b(r.TEXTURE_2D)}n.unbindTexture()}else{let Ie=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(u?Ie=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(Ie,ye.__webglTexture),Z(Ie,T,Ye),u&&T.mipmaps&&T.mipmaps.length>0)for(let Be=0;Be<T.mipmaps.length;Be++)Te(oe.__webglFramebuffer[Be],P,T,r.COLOR_ATTACHMENT0,Ie,Be);else Te(oe.__webglFramebuffer,P,T,r.COLOR_ATTACHMENT0,Ie,0);L(T,Ye)&&b(Ie),n.unbindTexture()}P.depthBuffer&&Ve(P)}function kt(P){const T=_(P)||u,oe=P.isWebGLMultipleRenderTargets===!0?P.texture:[P.texture];for(let ye=0,_e=oe.length;ye<_e;ye++){const ge=oe[ye];if(L(ge,T)){const Ye=P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,Ie=s.get(ge).__webglTexture;n.bindTexture(Ye,Ie),b(Ye),n.unbindTexture()}}}function Ce(P){if(u&&P.samples>0&&We(P)===!1){const T=P.isWebGLMultipleRenderTargets?P.texture:[P.texture],oe=P.width,ye=P.height;let _e=r.COLOR_BUFFER_BIT;const ge=[],Ye=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ie=s.get(P),Be=P.isWebGLMultipleRenderTargets===!0;if(Be)for(let B=0;B<T.length;B++)n.bindFramebuffer(r.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+B,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,Ie.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+B,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let B=0;B<T.length;B++){ge.push(r.COLOR_ATTACHMENT0+B),P.depthBuffer&&ge.push(Ye);const ue=Ie.__ignoreDepthValues!==void 0?Ie.__ignoreDepthValues:!1;if(ue===!1&&(P.depthBuffer&&(_e|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&(_e|=r.STENCIL_BUFFER_BIT)),Be&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ie.__webglColorRenderbuffer[B]),ue===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[Ye]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[Ye])),Be){const K=s.get(T[B]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,K,0)}r.blitFramebuffer(0,0,oe,ye,0,0,oe,ye,_e,r.NEAREST),m&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ge)}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Be)for(let B=0;B<T.length;B++){n.bindFramebuffer(r.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+B,r.RENDERBUFFER,Ie.__webglColorRenderbuffer[B]);const ue=s.get(T[B]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,Ie.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+B,r.TEXTURE_2D,ue,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}}function it(P){return Math.min(a.maxSamples,P.samples)}function We(P){const T=s.get(P);return u&&P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function xt(P){const T=f.render.frame;v.get(P)!==T&&(v.set(P,T),P.update())}function je(P,T){const oe=P.colorSpace,ye=P.format,_e=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||P.format===yf||oe!==Wi&&oe!==Jn&&(At.getTransfer(oe)===It?u===!1?e.has("EXT_sRGB")===!0&&ye===hi?(P.format=yf,P.minFilter=Kn,P.generateMipmaps=!1):T=xg.sRGBToLinear(T):(ye!==hi||_e!==wr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",oe)),T}this.allocateTextureUnit=F,this.resetTextureUnits=W,this.setTexture2D=Q,this.setTexture2DArray=ie,this.setTexture3D=V,this.setTextureCube=z,this.rebindTextures=Pe,this.setupRenderTarget=ne,this.updateRenderTargetMipmap=kt,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=Ve,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=We}function Lw(r,e,n){const s=n.isWebGL2;function a(l,f=Jn){let u;const h=At.getTransfer(f);if(l===wr)return r.UNSIGNED_BYTE;if(l===ug)return r.UNSIGNED_SHORT_4_4_4_4;if(l===fg)return r.UNSIGNED_SHORT_5_5_5_1;if(l===d0)return r.BYTE;if(l===h0)return r.SHORT;if(l===Cf)return r.UNSIGNED_SHORT;if(l===cg)return r.INT;if(l===yr)return r.UNSIGNED_INT;if(l===Sr)return r.FLOAT;if(l===jo)return s?r.HALF_FLOAT:(u=e.get("OES_texture_half_float"),u!==null?u.HALF_FLOAT_OES:null);if(l===p0)return r.ALPHA;if(l===hi)return r.RGBA;if(l===m0)return r.LUMINANCE;if(l===g0)return r.LUMINANCE_ALPHA;if(l===Qr)return r.DEPTH_COMPONENT;if(l===$s)return r.DEPTH_STENCIL;if(l===yf)return u=e.get("EXT_sRGB"),u!==null?u.SRGB_ALPHA_EXT:null;if(l===v0)return r.RED;if(l===dg)return r.RED_INTEGER;if(l===_0)return r.RG;if(l===hg)return r.RG_INTEGER;if(l===pg)return r.RGBA_INTEGER;if(l===Iu||l===Uu||l===Fu||l===Ou)if(h===It)if(u=e.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(l===Iu)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(l===Uu)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(l===Fu)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(l===Ou)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=e.get("WEBGL_compressed_texture_s3tc"),u!==null){if(l===Iu)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(l===Uu)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(l===Fu)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(l===Ou)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(l===Pp||l===Lp||l===Np||l===Dp)if(u=e.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(l===Pp)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(l===Lp)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(l===Np)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(l===Dp)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(l===mg)return u=e.get("WEBGL_compressed_texture_etc1"),u!==null?u.COMPRESSED_RGB_ETC1_WEBGL:null;if(l===Ip||l===Up)if(u=e.get("WEBGL_compressed_texture_etc"),u!==null){if(l===Ip)return h===It?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(l===Up)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(l===Fp||l===Op||l===kp||l===zp||l===Bp||l===Hp||l===Gp||l===Vp||l===Wp||l===jp||l===Xp||l===qp||l===$p||l===Yp)if(u=e.get("WEBGL_compressed_texture_astc"),u!==null){if(l===Fp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(l===Op)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(l===kp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(l===zp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(l===Bp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(l===Hp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(l===Gp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(l===Vp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(l===Wp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(l===jp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(l===Xp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(l===qp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(l===$p)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(l===Yp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(l===ku||l===Kp||l===Zp)if(u=e.get("EXT_texture_compression_bptc"),u!==null){if(l===ku)return h===It?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(l===Kp)return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(l===Zp)return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(l===x0||l===Qp||l===Jp||l===em)if(u=e.get("EXT_texture_compression_rgtc"),u!==null){if(l===ku)return u.COMPRESSED_RED_RGTC1_EXT;if(l===Qp)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(l===Jp)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(l===em)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return l===Zr?s?r.UNSIGNED_INT_24_8:(u=e.get("WEBGL_depth_texture"),u!==null?u.UNSIGNED_INT_24_8_WEBGL:null):r[l]!==void 0?r[l]:null}return{convert:a}}class Nw extends Zn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Al extends En{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Dw={type:"move"};class uf{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Al,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Al,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ae,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ae),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Al,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ae,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ae),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const s of e.hand.values())this._getHandJoint(n,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,s){let a=null,l=null,f=null;const u=this._targetRay,h=this._grip,m=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(m&&e.hand){f=!0;for(const E of e.hand.values()){const _=n.getJointPose(E,s),g=this._getHandJoint(m,E);_!==null&&(g.matrix.fromArray(_.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=_.radius),g.visible=_!==null}const v=m.joints["index-finger-tip"],y=m.joints["thumb-tip"],x=v.position.distanceTo(y.position),S=.02,M=.005;m.inputState.pinching&&x>S+M?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&x<=S-M&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(l=n.getPose(e.gripSpace,s),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1));u!==null&&(a=n.getPose(e.targetRaySpace,s),a===null&&l!==null&&(a=l),a!==null&&(u.matrix.fromArray(a.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,a.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(a.linearVelocity)):u.hasLinearVelocity=!1,a.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(a.angularVelocity)):u.hasAngularVelocity=!1,this.dispatchEvent(Dw)))}return u!==null&&(u.visible=a!==null),h!==null&&(h.visible=l!==null),m!==null&&(m.visible=f!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const s=new Al;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[n.jointName]=s,e.add(s)}return e.joints[n.jointName]}}class Iw extends Zs{constructor(e,n){super();const s=this;let a=null,l=1,f=null,u="local-floor",h=1,m=null,v=null,y=null,x=null,S=null,M=null;const E=n.getContextAttributes();let _=null,g=null;const L=[],b=[],D=new bt;let X=null;const O=new Zn;O.layers.enable(1),O.viewport=new cn;const k=new Zn;k.layers.enable(2),k.viewport=new cn;const he=[O,k],C=new Nw;C.layers.enable(1),C.layers.enable(2);let A=null,re=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let de=L[Z];return de===void 0&&(de=new uf,L[Z]=de),de.getTargetRaySpace()},this.getControllerGrip=function(Z){let de=L[Z];return de===void 0&&(de=new uf,L[Z]=de),de.getGripSpace()},this.getHand=function(Z){let de=L[Z];return de===void 0&&(de=new uf,L[Z]=de),de.getHandSpace()};function ee(Z){const de=b.indexOf(Z.inputSource);if(de===-1)return;const me=L[de];me!==void 0&&(me.update(Z.inputSource,Z.frame,m||f),me.dispatchEvent({type:Z.type,data:Z.inputSource}))}function W(){a.removeEventListener("select",ee),a.removeEventListener("selectstart",ee),a.removeEventListener("selectend",ee),a.removeEventListener("squeeze",ee),a.removeEventListener("squeezestart",ee),a.removeEventListener("squeezeend",ee),a.removeEventListener("end",W),a.removeEventListener("inputsourceschange",F);for(let Z=0;Z<L.length;Z++){const de=b[Z];de!==null&&(b[Z]=null,L[Z].disconnect(de))}A=null,re=null,e.setRenderTarget(_),S=null,x=null,y=null,a=null,g=null,$.stop(),s.isPresenting=!1,e.setPixelRatio(X),e.setSize(D.width,D.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){l=Z,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){u=Z,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||f},this.setReferenceSpace=function(Z){m=Z},this.getBaseLayer=function(){return x!==null?x:S},this.getBinding=function(){return y},this.getFrame=function(){return M},this.getSession=function(){return a},this.setSession=async function(Z){if(a=Z,a!==null){if(_=e.getRenderTarget(),a.addEventListener("select",ee),a.addEventListener("selectstart",ee),a.addEventListener("selectend",ee),a.addEventListener("squeeze",ee),a.addEventListener("squeezestart",ee),a.addEventListener("squeezeend",ee),a.addEventListener("end",W),a.addEventListener("inputsourceschange",F),E.xrCompatible!==!0&&await n.makeXRCompatible(),X=e.getPixelRatio(),e.getSize(D),a.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const de={antialias:a.renderState.layers===void 0?E.antialias:!0,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(a,n,de),a.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),g=new es(S.framebufferWidth,S.framebufferHeight,{format:hi,type:wr,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil})}else{let de=null,me=null,Me=null;E.depth&&(Me=E.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,de=E.stencil?$s:Qr,me=E.stencil?Zr:yr);const Te={colorFormat:n.RGBA8,depthFormat:Me,scaleFactor:l};y=new XRWebGLBinding(a,n),x=y.createProjectionLayer(Te),a.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),g=new es(x.textureWidth,x.textureHeight,{format:hi,type:wr,depthTexture:new Ng(x.textureWidth,x.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0});const Ae=e.properties.get(g);Ae.__ignoreDepthValues=x.ignoreDepthValues}g.isXRRenderTarget=!0,this.setFoveation(h),m=null,f=await a.requestReferenceSpace(u),$.setContext(a),$.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode};function F(Z){for(let de=0;de<Z.removed.length;de++){const me=Z.removed[de],Me=b.indexOf(me);Me>=0&&(b[Me]=null,L[Me].disconnect(me))}for(let de=0;de<Z.added.length;de++){const me=Z.added[de];let Me=b.indexOf(me);if(Me===-1){for(let Ae=0;Ae<L.length;Ae++)if(Ae>=b.length){b.push(me),Me=Ae;break}else if(b[Ae]===null){b[Ae]=me,Me=Ae;break}if(Me===-1)break}const Te=L[Me];Te&&Te.connect(me)}}const Y=new ae,Q=new ae;function ie(Z,de,me){Y.setFromMatrixPosition(de.matrixWorld),Q.setFromMatrixPosition(me.matrixWorld);const Me=Y.distanceTo(Q),Te=de.projectionMatrix.elements,Ae=me.projectionMatrix.elements,ze=Te[14]/(Te[10]-1),Ve=Te[14]/(Te[10]+1),Pe=(Te[9]+1)/Te[5],ne=(Te[9]-1)/Te[5],kt=(Te[8]-1)/Te[0],Ce=(Ae[8]+1)/Ae[0],it=ze*kt,We=ze*Ce,xt=Me/(-kt+Ce),je=xt*-kt;de.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(je),Z.translateZ(xt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert();const P=ze+xt,T=Ve+xt,oe=it-je,ye=We+(Me-je),_e=Pe*Ve/T*P,ge=ne*Ve/T*P;Z.projectionMatrix.makePerspective(oe,ye,_e,ge,P,T),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}function V(Z,de){de===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(de.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(a===null)return;C.near=k.near=O.near=Z.near,C.far=k.far=O.far=Z.far,(A!==C.near||re!==C.far)&&(a.updateRenderState({depthNear:C.near,depthFar:C.far}),A=C.near,re=C.far);const de=Z.parent,me=C.cameras;V(C,de);for(let Me=0;Me<me.length;Me++)V(me[Me],de);me.length===2?ie(C,O,k):C.projectionMatrix.copy(O.projectionMatrix),z(Z,C,de)};function z(Z,de,me){me===null?Z.matrix.copy(de.matrixWorld):(Z.matrix.copy(me.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(de.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(de.projectionMatrix),Z.projectionMatrixInverse.copy(de.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Sf*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(x===null&&S===null))return h},this.setFoveation=function(Z){h=Z,x!==null&&(x.fixedFoveation=Z),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=Z)};let j=null;function N(Z,de){if(v=de.getViewerPose(m||f),M=de,v!==null){const me=v.views;S!==null&&(e.setRenderTargetFramebuffer(g,S.framebuffer),e.setRenderTarget(g));let Me=!1;me.length!==C.cameras.length&&(C.cameras.length=0,Me=!0);for(let Te=0;Te<me.length;Te++){const Ae=me[Te];let ze=null;if(S!==null)ze=S.getViewport(Ae);else{const Pe=y.getViewSubImage(x,Ae);ze=Pe.viewport,Te===0&&(e.setRenderTargetTextures(g,Pe.colorTexture,x.ignoreDepthValues?void 0:Pe.depthStencilTexture),e.setRenderTarget(g))}let Ve=he[Te];Ve===void 0&&(Ve=new Zn,Ve.layers.enable(Te),Ve.viewport=new cn,he[Te]=Ve),Ve.matrix.fromArray(Ae.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Ae.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(ze.x,ze.y,ze.width,ze.height),Te===0&&(C.matrix.copy(Ve.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),Me===!0&&C.cameras.push(Ve)}}for(let me=0;me<L.length;me++){const Me=b[me],Te=L[me];Me!==null&&Te!==void 0&&Te.update(Me,de,m||f)}j&&j(Z,de),de.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:de}),M=null}const $=new Pg;$.setAnimationLoop(N),this.setAnimationLoop=function(Z){j=Z},this.dispose=function(){}}}function Uw(r,e){function n(_,g){_.matrixAutoUpdate===!0&&_.updateMatrix(),g.value.copy(_.matrix)}function s(_,g){g.color.getRGB(_.fogColor.value,Ag(r)),g.isFog?(_.fogNear.value=g.near,_.fogFar.value=g.far):g.isFogExp2&&(_.fogDensity.value=g.density)}function a(_,g,L,b,D){g.isMeshBasicMaterial||g.isMeshLambertMaterial?l(_,g):g.isMeshToonMaterial?(l(_,g),y(_,g)):g.isMeshPhongMaterial?(l(_,g),v(_,g)):g.isMeshStandardMaterial?(l(_,g),x(_,g),g.isMeshPhysicalMaterial&&S(_,g,D)):g.isMeshMatcapMaterial?(l(_,g),M(_,g)):g.isMeshDepthMaterial?l(_,g):g.isMeshDistanceMaterial?(l(_,g),E(_,g)):g.isMeshNormalMaterial?l(_,g):g.isLineBasicMaterial?(f(_,g),g.isLineDashedMaterial&&u(_,g)):g.isPointsMaterial?h(_,g,L,b):g.isSpriteMaterial?m(_,g):g.isShadowMaterial?(_.color.value.copy(g.color),_.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function l(_,g){_.opacity.value=g.opacity,g.color&&_.diffuse.value.copy(g.color),g.emissive&&_.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(_.map.value=g.map,n(g.map,_.mapTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,n(g.alphaMap,_.alphaMapTransform)),g.bumpMap&&(_.bumpMap.value=g.bumpMap,n(g.bumpMap,_.bumpMapTransform),_.bumpScale.value=g.bumpScale,g.side===In&&(_.bumpScale.value*=-1)),g.normalMap&&(_.normalMap.value=g.normalMap,n(g.normalMap,_.normalMapTransform),_.normalScale.value.copy(g.normalScale),g.side===In&&_.normalScale.value.negate()),g.displacementMap&&(_.displacementMap.value=g.displacementMap,n(g.displacementMap,_.displacementMapTransform),_.displacementScale.value=g.displacementScale,_.displacementBias.value=g.displacementBias),g.emissiveMap&&(_.emissiveMap.value=g.emissiveMap,n(g.emissiveMap,_.emissiveMapTransform)),g.specularMap&&(_.specularMap.value=g.specularMap,n(g.specularMap,_.specularMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest);const L=e.get(g).envMap;if(L&&(_.envMap.value=L,_.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=g.reflectivity,_.ior.value=g.ior,_.refractionRatio.value=g.refractionRatio),g.lightMap){_.lightMap.value=g.lightMap;const b=r._useLegacyLights===!0?Math.PI:1;_.lightMapIntensity.value=g.lightMapIntensity*b,n(g.lightMap,_.lightMapTransform)}g.aoMap&&(_.aoMap.value=g.aoMap,_.aoMapIntensity.value=g.aoMapIntensity,n(g.aoMap,_.aoMapTransform))}function f(_,g){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,g.map&&(_.map.value=g.map,n(g.map,_.mapTransform))}function u(_,g){_.dashSize.value=g.dashSize,_.totalSize.value=g.dashSize+g.gapSize,_.scale.value=g.scale}function h(_,g,L,b){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,_.size.value=g.size*L,_.scale.value=b*.5,g.map&&(_.map.value=g.map,n(g.map,_.uvTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,n(g.alphaMap,_.alphaMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest)}function m(_,g){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,_.rotation.value=g.rotation,g.map&&(_.map.value=g.map,n(g.map,_.mapTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,n(g.alphaMap,_.alphaMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest)}function v(_,g){_.specular.value.copy(g.specular),_.shininess.value=Math.max(g.shininess,1e-4)}function y(_,g){g.gradientMap&&(_.gradientMap.value=g.gradientMap)}function x(_,g){_.metalness.value=g.metalness,g.metalnessMap&&(_.metalnessMap.value=g.metalnessMap,n(g.metalnessMap,_.metalnessMapTransform)),_.roughness.value=g.roughness,g.roughnessMap&&(_.roughnessMap.value=g.roughnessMap,n(g.roughnessMap,_.roughnessMapTransform)),e.get(g).envMap&&(_.envMapIntensity.value=g.envMapIntensity)}function S(_,g,L){_.ior.value=g.ior,g.sheen>0&&(_.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),_.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(_.sheenColorMap.value=g.sheenColorMap,n(g.sheenColorMap,_.sheenColorMapTransform)),g.sheenRoughnessMap&&(_.sheenRoughnessMap.value=g.sheenRoughnessMap,n(g.sheenRoughnessMap,_.sheenRoughnessMapTransform))),g.clearcoat>0&&(_.clearcoat.value=g.clearcoat,_.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(_.clearcoatMap.value=g.clearcoatMap,n(g.clearcoatMap,_.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,n(g.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(_.clearcoatNormalMap.value=g.clearcoatNormalMap,n(g.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===In&&_.clearcoatNormalScale.value.negate())),g.iridescence>0&&(_.iridescence.value=g.iridescence,_.iridescenceIOR.value=g.iridescenceIOR,_.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(_.iridescenceMap.value=g.iridescenceMap,n(g.iridescenceMap,_.iridescenceMapTransform)),g.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=g.iridescenceThicknessMap,n(g.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),g.transmission>0&&(_.transmission.value=g.transmission,_.transmissionSamplerMap.value=L.texture,_.transmissionSamplerSize.value.set(L.width,L.height),g.transmissionMap&&(_.transmissionMap.value=g.transmissionMap,n(g.transmissionMap,_.transmissionMapTransform)),_.thickness.value=g.thickness,g.thicknessMap&&(_.thicknessMap.value=g.thicknessMap,n(g.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=g.attenuationDistance,_.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(_.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(_.anisotropyMap.value=g.anisotropyMap,n(g.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=g.specularIntensity,_.specularColor.value.copy(g.specularColor),g.specularColorMap&&(_.specularColorMap.value=g.specularColorMap,n(g.specularColorMap,_.specularColorMapTransform)),g.specularIntensityMap&&(_.specularIntensityMap.value=g.specularIntensityMap,n(g.specularIntensityMap,_.specularIntensityMapTransform))}function M(_,g){g.matcap&&(_.matcap.value=g.matcap)}function E(_,g){const L=e.get(g).light;_.referencePosition.value.setFromMatrixPosition(L.matrixWorld),_.nearDistance.value=L.shadow.camera.near,_.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:a}}function Fw(r,e,n,s){let a={},l={},f=[];const u=n.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function h(L,b){const D=b.program;s.uniformBlockBinding(L,D)}function m(L,b){let D=a[L.id];D===void 0&&(M(L),D=v(L),a[L.id]=D,L.addEventListener("dispose",_));const X=b.program;s.updateUBOMapping(L,X);const O=e.render.frame;l[L.id]!==O&&(x(L),l[L.id]=O)}function v(L){const b=y();L.__bindingPointIndex=b;const D=r.createBuffer(),X=L.__size,O=L.usage;return r.bindBuffer(r.UNIFORM_BUFFER,D),r.bufferData(r.UNIFORM_BUFFER,X,O),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,b,D),D}function y(){for(let L=0;L<u;L++)if(f.indexOf(L)===-1)return f.push(L),L;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(L){const b=a[L.id],D=L.uniforms,X=L.__cache;r.bindBuffer(r.UNIFORM_BUFFER,b);for(let O=0,k=D.length;O<k;O++){const he=Array.isArray(D[O])?D[O]:[D[O]];for(let C=0,A=he.length;C<A;C++){const re=he[C];if(S(re,O,C,X)===!0){const ee=re.__offset,W=Array.isArray(re.value)?re.value:[re.value];let F=0;for(let Y=0;Y<W.length;Y++){const Q=W[Y],ie=E(Q);typeof Q=="number"||typeof Q=="boolean"?(re.__data[0]=Q,r.bufferSubData(r.UNIFORM_BUFFER,ee+F,re.__data)):Q.isMatrix3?(re.__data[0]=Q.elements[0],re.__data[1]=Q.elements[1],re.__data[2]=Q.elements[2],re.__data[3]=0,re.__data[4]=Q.elements[3],re.__data[5]=Q.elements[4],re.__data[6]=Q.elements[5],re.__data[7]=0,re.__data[8]=Q.elements[6],re.__data[9]=Q.elements[7],re.__data[10]=Q.elements[8],re.__data[11]=0):(Q.toArray(re.__data,F),F+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,ee,re.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function S(L,b,D,X){const O=L.value,k=b+"_"+D;if(X[k]===void 0)return typeof O=="number"||typeof O=="boolean"?X[k]=O:X[k]=O.clone(),!0;{const he=X[k];if(typeof O=="number"||typeof O=="boolean"){if(he!==O)return X[k]=O,!0}else if(he.equals(O)===!1)return he.copy(O),!0}return!1}function M(L){const b=L.uniforms;let D=0;const X=16;for(let k=0,he=b.length;k<he;k++){const C=Array.isArray(b[k])?b[k]:[b[k]];for(let A=0,re=C.length;A<re;A++){const ee=C[A],W=Array.isArray(ee.value)?ee.value:[ee.value];for(let F=0,Y=W.length;F<Y;F++){const Q=W[F],ie=E(Q),V=D%X;V!==0&&X-V<ie.boundary&&(D+=X-V),ee.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),ee.__offset=D,D+=ie.storage}}}const O=D%X;return O>0&&(D+=X-O),L.__size=D,L.__cache={},this}function E(L){const b={boundary:0,storage:0};return typeof L=="number"||typeof L=="boolean"?(b.boundary=4,b.storage=4):L.isVector2?(b.boundary=8,b.storage=8):L.isVector3||L.isColor?(b.boundary=16,b.storage=12):L.isVector4?(b.boundary=16,b.storage=16):L.isMatrix3?(b.boundary=48,b.storage=48):L.isMatrix4?(b.boundary=64,b.storage=64):L.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",L),b}function _(L){const b=L.target;b.removeEventListener("dispose",_);const D=f.indexOf(b.__bindingPointIndex);f.splice(D,1),r.deleteBuffer(a[b.id]),delete a[b.id],delete l[b.id]}function g(){for(const L in a)r.deleteBuffer(a[L]);f=[],a={},l={}}return{bind:h,update:m,dispose:g}}class Df{constructor(e={}){const{canvas:n=N0(),context:s=null,depth:a=!0,stencil:l=!0,alpha:f=!1,antialias:u=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:m=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:y=!1}=e;this.isWebGLRenderer=!0;let x;s!==null?x=s.getContextAttributes().alpha:x=f;const S=new Uint32Array(4),M=new Int32Array(4);let E=null,_=null;const g=[],L=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ln,this._useLegacyLights=!1,this.toneMapping=Er,this.toneMappingExposure=1;const b=this;let D=!1,X=0,O=0,k=null,he=-1,C=null;const A=new cn,re=new cn;let ee=null;const W=new Mt(0);let F=0,Y=n.width,Q=n.height,ie=1,V=null,z=null;const j=new cn(0,0,Y,Q),N=new cn(0,0,Y,Q);let $=!1;const Z=new Rg;let de=!1,me=!1,Me=null;const Te=new Zt,Ae=new bt,ze=new ae,Ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Pe(){return k===null?ie:1}let ne=s;function kt(R,te){for(let fe=0;fe<R.length;fe++){const pe=R[fe],ce=n.getContext(pe,te);if(ce!==null)return ce}return null}try{const R={alpha:!0,depth:a,stencil:l,antialias:u,premultipliedAlpha:h,preserveDrawingBuffer:m,powerPreference:v,failIfMajorPerformanceCaveat:y};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${bf}`),n.addEventListener("webglcontextlost",be,!1),n.addEventListener("webglcontextrestored",G,!1),n.addEventListener("webglcontextcreationerror",Ne,!1),ne===null){const te=["webgl2","webgl","experimental-webgl"];if(b.isWebGL1Renderer===!0&&te.shift(),ne=kt(te,R),ne===null)throw kt(te)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&ne instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),ne.getShaderPrecisionFormat===void 0&&(ne.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Ce,it,We,xt,je,P,T,oe,ye,_e,ge,Ye,Ie,Be,B,ue,K,Re,we,Qe,qe,Le,Je,gt;function Ct(){Ce=new XM(ne),it=new BM(ne,Ce,e),Ce.init(it),Le=new Lw(ne,Ce,it),We=new Rw(ne,Ce,it),xt=new YM(ne),je=new mw,P=new Pw(ne,Ce,We,je,it,Le,xt),T=new GM(b),oe=new jM(b),ye=new iy(ne,it),Je=new kM(ne,Ce,ye,it),_e=new qM(ne,ye,xt,Je),ge=new JM(ne,_e,ye,xt),we=new QM(ne,it,P),ue=new HM(je),Ye=new pw(b,T,oe,Ce,it,Je,ue),Ie=new Uw(b,je),Be=new vw,B=new Ew(Ce,it),Re=new OM(b,T,oe,We,ge,x,h),K=new Cw(b,ge,it),gt=new Fw(ne,xt,it,We),Qe=new zM(ne,Ce,xt,it),qe=new $M(ne,Ce,xt,it),xt.programs=Ye.programs,b.capabilities=it,b.extensions=Ce,b.properties=je,b.renderLists=Be,b.shadowMap=K,b.state=We,b.info=xt}Ct();const ct=new Iw(b,ne);this.xr=ct,this.getContext=function(){return ne},this.getContextAttributes=function(){return ne.getContextAttributes()},this.forceContextLoss=function(){const R=Ce.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Ce.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(R){R!==void 0&&(ie=R,this.setSize(Y,Q,!1))},this.getSize=function(R){return R.set(Y,Q)},this.setSize=function(R,te,fe=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=R,Q=te,n.width=Math.floor(R*ie),n.height=Math.floor(te*ie),fe===!0&&(n.style.width=R+"px",n.style.height=te+"px"),this.setViewport(0,0,R,te)},this.getDrawingBufferSize=function(R){return R.set(Y*ie,Q*ie).floor()},this.setDrawingBufferSize=function(R,te,fe){Y=R,Q=te,ie=fe,n.width=Math.floor(R*fe),n.height=Math.floor(te*fe),this.setViewport(0,0,R,te)},this.getCurrentViewport=function(R){return R.copy(A)},this.getViewport=function(R){return R.copy(j)},this.setViewport=function(R,te,fe,pe){R.isVector4?j.set(R.x,R.y,R.z,R.w):j.set(R,te,fe,pe),We.viewport(A.copy(j).multiplyScalar(ie).floor())},this.getScissor=function(R){return R.copy(N)},this.setScissor=function(R,te,fe,pe){R.isVector4?N.set(R.x,R.y,R.z,R.w):N.set(R,te,fe,pe),We.scissor(re.copy(N).multiplyScalar(ie).floor())},this.getScissorTest=function(){return $},this.setScissorTest=function(R){We.setScissorTest($=R)},this.setOpaqueSort=function(R){V=R},this.setTransparentSort=function(R){z=R},this.getClearColor=function(R){return R.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor.apply(Re,arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha.apply(Re,arguments)},this.clear=function(R=!0,te=!0,fe=!0){let pe=0;if(R){let ce=!1;if(k!==null){const Oe=k.texture.format;ce=Oe===pg||Oe===hg||Oe===dg}if(ce){const Oe=k.texture.type,Ze=Oe===wr||Oe===yr||Oe===Cf||Oe===Zr||Oe===ug||Oe===fg,rt=Re.getClearColor(),He=Re.getClearAlpha(),ut=rt.r,at=rt.g,lt=rt.b;Ze?(S[0]=ut,S[1]=at,S[2]=lt,S[3]=He,ne.clearBufferuiv(ne.COLOR,0,S)):(M[0]=ut,M[1]=at,M[2]=lt,M[3]=He,ne.clearBufferiv(ne.COLOR,0,M))}else pe|=ne.COLOR_BUFFER_BIT}te&&(pe|=ne.DEPTH_BUFFER_BIT),fe&&(pe|=ne.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne.clear(pe)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",be,!1),n.removeEventListener("webglcontextrestored",G,!1),n.removeEventListener("webglcontextcreationerror",Ne,!1),Be.dispose(),B.dispose(),je.dispose(),T.dispose(),oe.dispose(),ge.dispose(),Je.dispose(),gt.dispose(),Ye.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",en),ct.removeEventListener("sessionend",yt),Me&&(Me.dispose(),Me=null),$t.stop()};function be(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function G(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const R=xt.autoReset,te=K.enabled,fe=K.autoUpdate,pe=K.needsUpdate,ce=K.type;Ct(),xt.autoReset=R,K.enabled=te,K.autoUpdate=fe,K.needsUpdate=pe,K.type=ce}function Ne(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Ue(R){const te=R.target;te.removeEventListener("dispose",Ue),st(te)}function st(R){et(R),je.remove(R)}function et(R){const te=je.get(R).programs;te!==void 0&&(te.forEach(function(fe){Ye.releaseProgram(fe)}),R.isShaderMaterial&&Ye.releaseShaderCache(R))}this.renderBufferDirect=function(R,te,fe,pe,ce,Oe){te===null&&(te=Ve);const Ze=ce.isMesh&&ce.matrixWorld.determinant()<0,rt=Xl(R,te,fe,pe,ce);We.setMaterial(pe,Ze);let He=fe.index,ut=1;if(pe.wireframe===!0){if(He=_e.getWireframeAttribute(fe),He===void 0)return;ut=2}const at=fe.drawRange,lt=fe.attributes.position;let Rt=at.start*ut,vn=(at.start+at.count)*ut;Oe!==null&&(Rt=Math.max(Rt,Oe.start*ut),vn=Math.min(vn,(Oe.start+Oe.count)*ut)),He!==null?(Rt=Math.max(Rt,0),vn=Math.min(vn,He.count)):lt!=null&&(Rt=Math.max(Rt,0),vn=Math.min(vn,lt.count));const Wt=vn-Rt;if(Wt<0||Wt===1/0)return;Je.setup(ce,pe,rt,fe,He);let wn,vt=Qe;if(He!==null&&(wn=ye.get(He),vt=qe,vt.setIndex(wn)),ce.isMesh)pe.wireframe===!0?(We.setLineWidth(pe.wireframeLinewidth*Pe()),vt.setMode(ne.LINES)):vt.setMode(ne.TRIANGLES);else if(ce.isLine){let dt=pe.linewidth;dt===void 0&&(dt=1),We.setLineWidth(dt*Pe()),ce.isLineSegments?vt.setMode(ne.LINES):ce.isLineLoop?vt.setMode(ne.LINE_LOOP):vt.setMode(ne.LINE_STRIP)}else ce.isPoints?vt.setMode(ne.POINTS):ce.isSprite&&vt.setMode(ne.TRIANGLES);if(ce.isBatchedMesh)vt.renderMultiDraw(ce._multiDrawStarts,ce._multiDrawCounts,ce._multiDrawCount);else if(ce.isInstancedMesh)vt.renderInstances(Rt,Wt,ce.count);else if(fe.isInstancedBufferGeometry){const dt=fe._maxInstanceCount!==void 0?fe._maxInstanceCount:1/0,_n=Math.min(fe.instanceCount,dt);vt.renderInstances(Rt,Wt,_n)}else vt.render(Rt,Wt)};function Et(R,te,fe){R.transparent===!0&&R.side===Gi&&R.forceSinglePass===!1?(R.side=In,R.needsUpdate=!0,ji(R,te,fe),R.side=Tr,R.needsUpdate=!0,ji(R,te,fe),R.side=Gi):ji(R,te,fe)}this.compile=function(R,te,fe=null){fe===null&&(fe=R),_=B.get(fe),_.init(),L.push(_),fe.traverseVisible(function(ce){ce.isLight&&ce.layers.test(te.layers)&&(_.pushLight(ce),ce.castShadow&&_.pushShadow(ce))}),R!==fe&&R.traverseVisible(function(ce){ce.isLight&&ce.layers.test(te.layers)&&(_.pushLight(ce),ce.castShadow&&_.pushShadow(ce))}),_.setupLights(b._useLegacyLights);const pe=new Set;return R.traverse(function(ce){const Oe=ce.material;if(Oe)if(Array.isArray(Oe))for(let Ze=0;Ze<Oe.length;Ze++){const rt=Oe[Ze];Et(rt,fe,ce),pe.add(rt)}else Et(Oe,fe,ce),pe.add(Oe)}),L.pop(),_=null,pe},this.compileAsync=function(R,te,fe=null){const pe=this.compile(R,te,fe);return new Promise(ce=>{function Oe(){if(pe.forEach(function(Ze){je.get(Ze).currentProgram.isReady()&&pe.delete(Ze)}),pe.size===0){ce(R);return}setTimeout(Oe,10)}Ce.get("KHR_parallel_shader_compile")!==null?Oe():setTimeout(Oe,10)})};let wt=null;function Ht(R){wt&&wt(R)}function en(){$t.stop()}function yt(){$t.start()}const $t=new Pg;$t.setAnimationLoop(Ht),typeof self<"u"&&$t.setContext(self),this.setAnimationLoop=function(R){wt=R,ct.setAnimationLoop(R),R===null?$t.stop():$t.start()},ct.addEventListener("sessionstart",en),ct.addEventListener("sessionend",yt),this.render=function(R,te){if(te!==void 0&&te.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),te.parent===null&&te.matrixWorldAutoUpdate===!0&&te.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(te),te=ct.getCamera()),R.isScene===!0&&R.onBeforeRender(b,R,te,k),_=B.get(R,L.length),_.init(),L.push(_),Te.multiplyMatrices(te.projectionMatrix,te.matrixWorldInverse),Z.setFromProjectionMatrix(Te),me=this.localClippingEnabled,de=ue.init(this.clippingPlanes,me),E=Be.get(R,g.length),E.init(),g.push(E),un(R,te,0,b.sortObjects),E.finish(),b.sortObjects===!0&&E.sort(V,z),this.info.render.frame++,de===!0&&ue.beginShadows();const fe=_.state.shadowsArray;if(K.render(fe,R,te),de===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset(),Re.render(E,R),_.setupLights(b._useLegacyLights),te.isArrayCamera){const pe=te.cameras;for(let ce=0,Oe=pe.length;ce<Oe;ce++){const Ze=pe[ce];Zo(E,R,Ze,Ze.viewport)}}else Zo(E,R,te);k!==null&&(P.updateMultisampleRenderTarget(k),P.updateRenderTargetMipmap(k)),R.isScene===!0&&R.onAfterRender(b,R,te),Je.resetDefaultState(),he=-1,C=null,L.pop(),L.length>0?_=L[L.length-1]:_=null,g.pop(),g.length>0?E=g[g.length-1]:E=null};function un(R,te,fe,pe){if(R.visible===!1)return;if(R.layers.test(te.layers)){if(R.isGroup)fe=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(te);else if(R.isLight)_.pushLight(R),R.castShadow&&_.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Z.intersectsSprite(R)){pe&&ze.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Te);const Ze=ge.update(R),rt=R.material;rt.visible&&E.push(R,Ze,rt,fe,ze.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Z.intersectsObject(R))){const Ze=ge.update(R),rt=R.material;if(pe&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),ze.copy(R.boundingSphere.center)):(Ze.boundingSphere===null&&Ze.computeBoundingSphere(),ze.copy(Ze.boundingSphere.center)),ze.applyMatrix4(R.matrixWorld).applyMatrix4(Te)),Array.isArray(rt)){const He=Ze.groups;for(let ut=0,at=He.length;ut<at;ut++){const lt=He[ut],Rt=rt[lt.materialIndex];Rt&&Rt.visible&&E.push(R,Ze,Rt,fe,ze.z,lt)}}else rt.visible&&E.push(R,Ze,rt,fe,ze.z,null)}}const Oe=R.children;for(let Ze=0,rt=Oe.length;Ze<rt;Ze++)un(Oe[Ze],te,fe,pe)}function Zo(R,te,fe,pe){const ce=R.opaque,Oe=R.transmissive,Ze=R.transparent;_.setupLightsView(fe),de===!0&&ue.setGlobalState(b.clippingPlanes,fe),Oe.length>0&&Ar(ce,Oe,te,fe),pe&&We.viewport(A.copy(pe)),ce.length>0&&Ei(ce,te,fe),Oe.length>0&&Ei(Oe,te,fe),Ze.length>0&&Ei(Ze,te,fe),We.buffers.depth.setTest(!0),We.buffers.depth.setMask(!0),We.buffers.color.setMask(!0),We.setPolygonOffset(!1)}function Ar(R,te,fe,pe){if((fe.isScene===!0?fe.overrideMaterial:null)!==null)return;const Oe=it.isWebGL2;Me===null&&(Me=new es(1,1,{generateMipmaps:!0,type:Ce.has("EXT_color_buffer_half_float")?jo:wr,minFilter:Wo,samples:Oe?4:0})),b.getDrawingBufferSize(Ae),Oe?Me.setSize(Ae.x,Ae.y):Me.setSize(Mf(Ae.x),Mf(Ae.y));const Ze=b.getRenderTarget();b.setRenderTarget(Me),b.getClearColor(W),F=b.getClearAlpha(),F<1&&b.setClearColor(16777215,.5),b.clear();const rt=b.toneMapping;b.toneMapping=Er,Ei(R,fe,pe),P.updateMultisampleRenderTarget(Me),P.updateRenderTargetMipmap(Me);let He=!1;for(let ut=0,at=te.length;ut<at;ut++){const lt=te[ut],Rt=lt.object,vn=lt.geometry,Wt=lt.material,wn=lt.group;if(Wt.side===Gi&&Rt.layers.test(pe.layers)){const vt=Wt.side;Wt.side=In,Wt.needsUpdate=!0,br(Rt,fe,pe,vn,Wt,wn),Wt.side=vt,Wt.needsUpdate=!0,He=!0}}He===!0&&(P.updateMultisampleRenderTarget(Me),P.updateRenderTargetMipmap(Me)),b.setRenderTarget(Ze),b.setClearColor(W,F),b.toneMapping=rt}function Ei(R,te,fe){const pe=te.isScene===!0?te.overrideMaterial:null;for(let ce=0,Oe=R.length;ce<Oe;ce++){const Ze=R[ce],rt=Ze.object,He=Ze.geometry,ut=pe===null?Ze.material:pe,at=Ze.group;rt.layers.test(fe.layers)&&br(rt,te,fe,He,ut,at)}}function br(R,te,fe,pe,ce,Oe){R.onBeforeRender(b,te,fe,pe,ce,Oe),R.modelViewMatrix.multiplyMatrices(fe.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ce.onBeforeRender(b,te,fe,pe,R,Oe),ce.transparent===!0&&ce.side===Gi&&ce.forceSinglePass===!1?(ce.side=In,ce.needsUpdate=!0,b.renderBufferDirect(fe,te,pe,ce,R,Oe),ce.side=Tr,ce.needsUpdate=!0,b.renderBufferDirect(fe,te,pe,ce,R,Oe),ce.side=Gi):b.renderBufferDirect(fe,te,pe,ce,R,Oe),R.onAfterRender(b,te,fe,pe,ce,Oe)}function ji(R,te,fe){te.isScene!==!0&&(te=Ve);const pe=je.get(R),ce=_.state.lights,Oe=_.state.shadowsArray,Ze=ce.state.version,rt=Ye.getParameters(R,ce.state,Oe,te,fe),He=Ye.getProgramCacheKey(rt);let ut=pe.programs;pe.environment=R.isMeshStandardMaterial?te.environment:null,pe.fog=te.fog,pe.envMap=(R.isMeshStandardMaterial?oe:T).get(R.envMap||pe.environment),ut===void 0&&(R.addEventListener("dispose",Ue),ut=new Map,pe.programs=ut);let at=ut.get(He);if(at!==void 0){if(pe.currentProgram===at&&pe.lightsStateVersion===Ze)return Jo(R,rt),at}else rt.uniforms=Ye.getUniforms(R),R.onBuild(fe,rt,b),R.onBeforeCompile(rt,b),at=Ye.acquireProgram(rt,He),ut.set(He,at),pe.uniforms=rt.uniforms;const lt=pe.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(lt.clippingPlanes=ue.uniform),Jo(R,rt),pe.needsLights=ea(R),pe.lightsStateVersion=Ze,pe.needsLights&&(lt.ambientLightColor.value=ce.state.ambient,lt.lightProbe.value=ce.state.probe,lt.directionalLights.value=ce.state.directional,lt.directionalLightShadows.value=ce.state.directionalShadow,lt.spotLights.value=ce.state.spot,lt.spotLightShadows.value=ce.state.spotShadow,lt.rectAreaLights.value=ce.state.rectArea,lt.ltc_1.value=ce.state.rectAreaLTC1,lt.ltc_2.value=ce.state.rectAreaLTC2,lt.pointLights.value=ce.state.point,lt.pointLightShadows.value=ce.state.pointShadow,lt.hemisphereLights.value=ce.state.hemi,lt.directionalShadowMap.value=ce.state.directionalShadowMap,lt.directionalShadowMatrix.value=ce.state.directionalShadowMatrix,lt.spotShadowMap.value=ce.state.spotShadowMap,lt.spotLightMatrix.value=ce.state.spotLightMatrix,lt.spotLightMap.value=ce.state.spotLightMap,lt.pointShadowMap.value=ce.state.pointShadowMap,lt.pointShadowMatrix.value=ce.state.pointShadowMatrix),pe.currentProgram=at,pe.uniformsList=null,at}function Qo(R){if(R.uniformsList===null){const te=R.currentProgram.getUniforms();R.uniformsList=Dl.seqWithValue(te.seq,R.uniforms)}return R.uniformsList}function Jo(R,te){const fe=je.get(R);fe.outputColorSpace=te.outputColorSpace,fe.batching=te.batching,fe.instancing=te.instancing,fe.instancingColor=te.instancingColor,fe.skinning=te.skinning,fe.morphTargets=te.morphTargets,fe.morphNormals=te.morphNormals,fe.morphColors=te.morphColors,fe.morphTargetsCount=te.morphTargetsCount,fe.numClippingPlanes=te.numClippingPlanes,fe.numIntersection=te.numClipIntersection,fe.vertexAlphas=te.vertexAlphas,fe.vertexTangents=te.vertexTangents,fe.toneMapping=te.toneMapping}function Xl(R,te,fe,pe,ce){te.isScene!==!0&&(te=Ve),P.resetTextureUnits();const Oe=te.fog,Ze=pe.isMeshStandardMaterial?te.environment:null,rt=k===null?b.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:Wi,He=(pe.isMeshStandardMaterial?oe:T).get(pe.envMap||Ze),ut=pe.vertexColors===!0&&!!fe.attributes.color&&fe.attributes.color.itemSize===4,at=!!fe.attributes.tangent&&(!!pe.normalMap||pe.anisotropy>0),lt=!!fe.morphAttributes.position,Rt=!!fe.morphAttributes.normal,vn=!!fe.morphAttributes.color;let Wt=Er;pe.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(Wt=b.toneMapping);const wn=fe.morphAttributes.position||fe.morphAttributes.normal||fe.morphAttributes.color,vt=wn!==void 0?wn.length:0,dt=je.get(pe),_n=_.state.lights;if(de===!0&&(me===!0||R!==C)){const Tn=R===C&&pe.id===he;ue.setState(pe,R,Tn)}let Ft=!1;pe.version===dt.__version?(dt.needsLights&&dt.lightsStateVersion!==_n.state.version||dt.outputColorSpace!==rt||ce.isBatchedMesh&&dt.batching===!1||!ce.isBatchedMesh&&dt.batching===!0||ce.isInstancedMesh&&dt.instancing===!1||!ce.isInstancedMesh&&dt.instancing===!0||ce.isSkinnedMesh&&dt.skinning===!1||!ce.isSkinnedMesh&&dt.skinning===!0||ce.isInstancedMesh&&dt.instancingColor===!0&&ce.instanceColor===null||ce.isInstancedMesh&&dt.instancingColor===!1&&ce.instanceColor!==null||dt.envMap!==He||pe.fog===!0&&dt.fog!==Oe||dt.numClippingPlanes!==void 0&&(dt.numClippingPlanes!==ue.numPlanes||dt.numIntersection!==ue.numIntersection)||dt.vertexAlphas!==ut||dt.vertexTangents!==at||dt.morphTargets!==lt||dt.morphNormals!==Rt||dt.morphColors!==vn||dt.toneMapping!==Wt||it.isWebGL2===!0&&dt.morphTargetsCount!==vt)&&(Ft=!0):(Ft=!0,dt.__version=pe.version);let Ti=dt.currentProgram;Ft===!0&&(Ti=ji(pe,te,ce));let ta=!1,mi=!1,Xi=!1;const Gt=Ti.getUniforms(),Gn=dt.uniforms;if(We.useProgram(Ti.program)&&(ta=!0,mi=!0,Xi=!0),pe.id!==he&&(he=pe.id,mi=!0),ta||C!==R){Gt.setValue(ne,"projectionMatrix",R.projectionMatrix),Gt.setValue(ne,"viewMatrix",R.matrixWorldInverse);const Tn=Gt.map.cameraPosition;Tn!==void 0&&Tn.setValue(ne,ze.setFromMatrixPosition(R.matrixWorld)),it.logarithmicDepthBuffer&&Gt.setValue(ne,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(pe.isMeshPhongMaterial||pe.isMeshToonMaterial||pe.isMeshLambertMaterial||pe.isMeshBasicMaterial||pe.isMeshStandardMaterial||pe.isShaderMaterial)&&Gt.setValue(ne,"isOrthographic",R.isOrthographicCamera===!0),C!==R&&(C=R,mi=!0,Xi=!0)}if(ce.isSkinnedMesh){Gt.setOptional(ne,ce,"bindMatrix"),Gt.setOptional(ne,ce,"bindMatrixInverse");const Tn=ce.skeleton;Tn&&(it.floatVertexTextures?(Tn.boneTexture===null&&Tn.computeBoneTexture(),Gt.setValue(ne,"boneTexture",Tn.boneTexture,P)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}ce.isBatchedMesh&&(Gt.setOptional(ne,ce,"batchingTexture"),Gt.setValue(ne,"batchingTexture",ce._matricesTexture,P));const eo=fe.morphAttributes;if((eo.position!==void 0||eo.normal!==void 0||eo.color!==void 0&&it.isWebGL2===!0)&&we.update(ce,fe,Ti),(mi||dt.receiveShadow!==ce.receiveShadow)&&(dt.receiveShadow=ce.receiveShadow,Gt.setValue(ne,"receiveShadow",ce.receiveShadow)),pe.isMeshGouraudMaterial&&pe.envMap!==null&&(Gn.envMap.value=He,Gn.flipEnvMap.value=He.isCubeTexture&&He.isRenderTargetTexture===!1?-1:1),mi&&(Gt.setValue(ne,"toneMappingExposure",b.toneMappingExposure),dt.needsLights&&wi(Gn,Xi),Oe&&pe.fog===!0&&Ie.refreshFogUniforms(Gn,Oe),Ie.refreshMaterialUniforms(Gn,pe,ie,Q,Me),Dl.upload(ne,Qo(dt),Gn,P)),pe.isShaderMaterial&&pe.uniformsNeedUpdate===!0&&(Dl.upload(ne,Qo(dt),Gn,P),pe.uniformsNeedUpdate=!1),pe.isSpriteMaterial&&Gt.setValue(ne,"center",ce.center),Gt.setValue(ne,"modelViewMatrix",ce.modelViewMatrix),Gt.setValue(ne,"normalMatrix",ce.normalMatrix),Gt.setValue(ne,"modelMatrix",ce.matrixWorld),pe.isShaderMaterial||pe.isRawShaderMaterial){const Tn=pe.uniformsGroups;for(let Cr=0,na=Tn.length;Cr<na;Cr++)if(it.isWebGL2){const ns=Tn[Cr];gt.update(ns,Ti),gt.bind(ns,Ti)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ti}function wi(R,te){R.ambientLightColor.needsUpdate=te,R.lightProbe.needsUpdate=te,R.directionalLights.needsUpdate=te,R.directionalLightShadows.needsUpdate=te,R.pointLights.needsUpdate=te,R.pointLightShadows.needsUpdate=te,R.spotLights.needsUpdate=te,R.spotLightShadows.needsUpdate=te,R.rectAreaLights.needsUpdate=te,R.hemisphereLights.needsUpdate=te}function ea(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(R,te,fe){je.get(R.texture).__webglTexture=te,je.get(R.depthTexture).__webglTexture=fe;const pe=je.get(R);pe.__hasExternalTextures=!0,pe.__hasExternalTextures&&(pe.__autoAllocateDepthBuffer=fe===void 0,pe.__autoAllocateDepthBuffer||Ce.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),pe.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,te){const fe=je.get(R);fe.__webglFramebuffer=te,fe.__useDefaultFramebuffer=te===void 0},this.setRenderTarget=function(R,te=0,fe=0){k=R,X=te,O=fe;let pe=!0,ce=null,Oe=!1,Ze=!1;if(R){const He=je.get(R);He.__useDefaultFramebuffer!==void 0?(We.bindFramebuffer(ne.FRAMEBUFFER,null),pe=!1):He.__webglFramebuffer===void 0?P.setupRenderTarget(R):He.__hasExternalTextures&&P.rebindTextures(R,je.get(R.texture).__webglTexture,je.get(R.depthTexture).__webglTexture);const ut=R.texture;(ut.isData3DTexture||ut.isDataArrayTexture||ut.isCompressedArrayTexture)&&(Ze=!0);const at=je.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(at[te])?ce=at[te][fe]:ce=at[te],Oe=!0):it.isWebGL2&&R.samples>0&&P.useMultisampledRTT(R)===!1?ce=je.get(R).__webglMultisampledFramebuffer:Array.isArray(at)?ce=at[fe]:ce=at,A.copy(R.viewport),re.copy(R.scissor),ee=R.scissorTest}else A.copy(j).multiplyScalar(ie).floor(),re.copy(N).multiplyScalar(ie).floor(),ee=$;if(We.bindFramebuffer(ne.FRAMEBUFFER,ce)&&it.drawBuffers&&pe&&We.drawBuffers(R,ce),We.viewport(A),We.scissor(re),We.setScissorTest(ee),Oe){const He=je.get(R.texture);ne.framebufferTexture2D(ne.FRAMEBUFFER,ne.COLOR_ATTACHMENT0,ne.TEXTURE_CUBE_MAP_POSITIVE_X+te,He.__webglTexture,fe)}else if(Ze){const He=je.get(R.texture),ut=te||0;ne.framebufferTextureLayer(ne.FRAMEBUFFER,ne.COLOR_ATTACHMENT0,He.__webglTexture,fe||0,ut)}he=-1},this.readRenderTargetPixels=function(R,te,fe,pe,ce,Oe,Ze){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let rt=je.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ze!==void 0&&(rt=rt[Ze]),rt){We.bindFramebuffer(ne.FRAMEBUFFER,rt);try{const He=R.texture,ut=He.format,at=He.type;if(ut!==hi&&Le.convert(ut)!==ne.getParameter(ne.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const lt=at===jo&&(Ce.has("EXT_color_buffer_half_float")||it.isWebGL2&&Ce.has("EXT_color_buffer_float"));if(at!==wr&&Le.convert(at)!==ne.getParameter(ne.IMPLEMENTATION_COLOR_READ_TYPE)&&!(at===Sr&&(it.isWebGL2||Ce.has("OES_texture_float")||Ce.has("WEBGL_color_buffer_float")))&&!lt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}te>=0&&te<=R.width-pe&&fe>=0&&fe<=R.height-ce&&ne.readPixels(te,fe,pe,ce,Le.convert(ut),Le.convert(at),Oe)}finally{const He=k!==null?je.get(k).__webglFramebuffer:null;We.bindFramebuffer(ne.FRAMEBUFFER,He)}}},this.copyFramebufferToTexture=function(R,te,fe=0){const pe=Math.pow(2,-fe),ce=Math.floor(te.image.width*pe),Oe=Math.floor(te.image.height*pe);P.setTexture2D(te,0),ne.copyTexSubImage2D(ne.TEXTURE_2D,fe,0,0,R.x,R.y,ce,Oe),We.unbindTexture()},this.copyTextureToTexture=function(R,te,fe,pe=0){const ce=te.image.width,Oe=te.image.height,Ze=Le.convert(fe.format),rt=Le.convert(fe.type);P.setTexture2D(fe,0),ne.pixelStorei(ne.UNPACK_FLIP_Y_WEBGL,fe.flipY),ne.pixelStorei(ne.UNPACK_PREMULTIPLY_ALPHA_WEBGL,fe.premultiplyAlpha),ne.pixelStorei(ne.UNPACK_ALIGNMENT,fe.unpackAlignment),te.isDataTexture?ne.texSubImage2D(ne.TEXTURE_2D,pe,R.x,R.y,ce,Oe,Ze,rt,te.image.data):te.isCompressedTexture?ne.compressedTexSubImage2D(ne.TEXTURE_2D,pe,R.x,R.y,te.mipmaps[0].width,te.mipmaps[0].height,Ze,te.mipmaps[0].data):ne.texSubImage2D(ne.TEXTURE_2D,pe,R.x,R.y,Ze,rt,te.image),pe===0&&fe.generateMipmaps&&ne.generateMipmap(ne.TEXTURE_2D),We.unbindTexture()},this.copyTextureToTexture3D=function(R,te,fe,pe,ce=0){if(b.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Oe=R.max.x-R.min.x+1,Ze=R.max.y-R.min.y+1,rt=R.max.z-R.min.z+1,He=Le.convert(pe.format),ut=Le.convert(pe.type);let at;if(pe.isData3DTexture)P.setTexture3D(pe,0),at=ne.TEXTURE_3D;else if(pe.isDataArrayTexture||pe.isCompressedArrayTexture)P.setTexture2DArray(pe,0),at=ne.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}ne.pixelStorei(ne.UNPACK_FLIP_Y_WEBGL,pe.flipY),ne.pixelStorei(ne.UNPACK_PREMULTIPLY_ALPHA_WEBGL,pe.premultiplyAlpha),ne.pixelStorei(ne.UNPACK_ALIGNMENT,pe.unpackAlignment);const lt=ne.getParameter(ne.UNPACK_ROW_LENGTH),Rt=ne.getParameter(ne.UNPACK_IMAGE_HEIGHT),vn=ne.getParameter(ne.UNPACK_SKIP_PIXELS),Wt=ne.getParameter(ne.UNPACK_SKIP_ROWS),wn=ne.getParameter(ne.UNPACK_SKIP_IMAGES),vt=fe.isCompressedTexture?fe.mipmaps[ce]:fe.image;ne.pixelStorei(ne.UNPACK_ROW_LENGTH,vt.width),ne.pixelStorei(ne.UNPACK_IMAGE_HEIGHT,vt.height),ne.pixelStorei(ne.UNPACK_SKIP_PIXELS,R.min.x),ne.pixelStorei(ne.UNPACK_SKIP_ROWS,R.min.y),ne.pixelStorei(ne.UNPACK_SKIP_IMAGES,R.min.z),fe.isDataTexture||fe.isData3DTexture?ne.texSubImage3D(at,ce,te.x,te.y,te.z,Oe,Ze,rt,He,ut,vt.data):fe.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),ne.compressedTexSubImage3D(at,ce,te.x,te.y,te.z,Oe,Ze,rt,He,vt.data)):ne.texSubImage3D(at,ce,te.x,te.y,te.z,Oe,Ze,rt,He,ut,vt),ne.pixelStorei(ne.UNPACK_ROW_LENGTH,lt),ne.pixelStorei(ne.UNPACK_IMAGE_HEIGHT,Rt),ne.pixelStorei(ne.UNPACK_SKIP_PIXELS,vn),ne.pixelStorei(ne.UNPACK_SKIP_ROWS,Wt),ne.pixelStorei(ne.UNPACK_SKIP_IMAGES,wn),ce===0&&pe.generateMipmaps&&ne.generateMipmap(at),We.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?P.setTextureCube(R,0):R.isData3DTexture?P.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?P.setTexture2DArray(R,0):P.setTexture2D(R,0),We.unbindTexture()},this.resetState=function(){X=0,O=0,k=null,We.reset(),Je.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===Rf?"display-p3":"srgb",n.unpackColorSpace=At.workingColorSpace===Vl?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ln?Jr:gg}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Jr?ln:Wi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Ow extends Df{}Ow.prototype.isWebGL1Renderer=!0;class kg extends En{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n}}class zg extends Qs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Mt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Vm=new ae,Wm=new ae,jm=new Zt,ff=new Pf,bl=new Yo;class kw extends En{constructor(e=new ti,n=new zg){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,s=[0];for(let a=1,l=n.count;a<l;a++)Vm.fromBufferAttribute(n,a-1),Wm.fromBufferAttribute(n,a),s[a]=s[a-1],s[a]+=Vm.distanceTo(Wm);e.setAttribute("lineDistance",new pi(s,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const s=this.geometry,a=this.matrixWorld,l=e.params.Line.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),bl.copy(s.boundingSphere),bl.applyMatrix4(a),bl.radius+=l,e.ray.intersectsSphere(bl)===!1)return;jm.copy(a).invert(),ff.copy(e.ray).applyMatrix4(jm);const u=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=u*u,m=new ae,v=new ae,y=new ae,x=new ae,S=this.isLineSegments?2:1,M=s.index,_=s.attributes.position;if(M!==null){const g=Math.max(0,f.start),L=Math.min(M.count,f.start+f.count);for(let b=g,D=L-1;b<D;b+=S){const X=M.getX(b),O=M.getX(b+1);if(m.fromBufferAttribute(_,X),v.fromBufferAttribute(_,O),ff.distanceSqToSegment(m,v,x,y)>h)continue;x.applyMatrix4(this.matrixWorld);const he=e.ray.origin.distanceTo(x);he<e.near||he>e.far||n.push({distance:he,point:y.clone().applyMatrix4(this.matrixWorld),index:b,face:null,faceIndex:null,object:this})}}else{const g=Math.max(0,f.start),L=Math.min(_.count,f.start+f.count);for(let b=g,D=L-1;b<D;b+=S){if(m.fromBufferAttribute(_,b),v.fromBufferAttribute(_,b+1),ff.distanceSqToSegment(m,v,x,y)>h)continue;x.applyMatrix4(this.matrixWorld);const O=e.ray.origin.distanceTo(x);O<e.near||O>e.far||n.push({distance:O,point:y.clone().applyMatrix4(this.matrixWorld),index:b,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const a=n[s[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,f=a.length;l<f;l++){const u=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=l}}}}}class Bg extends Qs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Mt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Xm=new Zt,wf=new Pf,Cl=new Yo,Rl=new ae;class zw extends En{constructor(e=new ti,n=new Bg){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const s=this.geometry,a=this.matrixWorld,l=e.params.Points.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Cl.copy(s.boundingSphere),Cl.applyMatrix4(a),Cl.radius+=l,e.ray.intersectsSphere(Cl)===!1)return;Xm.copy(a).invert(),wf.copy(e.ray).applyMatrix4(Xm);const u=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=u*u,m=s.index,y=s.attributes.position;if(m!==null){const x=Math.max(0,f.start),S=Math.min(m.count,f.start+f.count);for(let M=x,E=S;M<E;M++){const _=m.getX(M);Rl.fromBufferAttribute(y,_),qm(Rl,_,h,a,e,n,this)}}else{const x=Math.max(0,f.start),S=Math.min(y.count,f.start+f.count);for(let M=x,E=S;M<E;M++)Rl.fromBufferAttribute(y,M),qm(Rl,M,h,a,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const a=n[s[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,f=a.length;l<f;l++){const u=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=l}}}}}function qm(r,e,n,s,a,l,f){const u=wf.distanceSqToPoint(r);if(u<n){const h=new ae;wf.closestPointToPoint(r,h),h.applyMatrix4(s);const m=a.ray.origin.distanceTo(h);if(m<a.near||m>a.far)return;l.push({distance:m,distanceToRay:Math.sqrt(u),point:h,index:e,face:null,object:f})}}class Hl extends ti{constructor(e=1,n=32,s=16,a=0,l=Math.PI*2,f=0,u=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:s,phiStart:a,phiLength:l,thetaStart:f,thetaLength:u},n=Math.max(3,Math.floor(n)),s=Math.max(2,Math.floor(s));const h=Math.min(f+u,Math.PI);let m=0;const v=[],y=new ae,x=new ae,S=[],M=[],E=[],_=[];for(let g=0;g<=s;g++){const L=[],b=g/s;let D=0;g===0&&f===0?D=.5/n:g===s&&h===Math.PI&&(D=-.5/n);for(let X=0;X<=n;X++){const O=X/n;y.x=-e*Math.cos(a+O*l)*Math.sin(f+b*u),y.y=e*Math.cos(f+b*u),y.z=e*Math.sin(a+O*l)*Math.sin(f+b*u),M.push(y.x,y.y,y.z),x.copy(y).normalize(),E.push(x.x,x.y,x.z),_.push(O+D,1-b),L.push(m++)}v.push(L)}for(let g=0;g<s;g++)for(let L=0;L<n;L++){const b=v[g][L+1],D=v[g][L],X=v[g+1][L],O=v[g+1][L+1];(g!==0||f>0)&&S.push(b,D,O),(g!==s-1||h<Math.PI)&&S.push(D,X,O)}this.setIndex(S),this.setAttribute("position",new pi(M,3)),this.setAttribute("normal",new pi(E,3)),this.setAttribute("uv",new pi(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hl(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Hg{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=$m(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=$m();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function $m(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=bf);const Bw={base:"#1e1e2e",mantle:"#181825",crust:"#11111b",surface0:"#313244",surface1:"#45475a",surface2:"#585b70",overlay0:"#6c7086",overlay1:"#7f849c",subtext0:"#a6adc8",subtext1:"#bac2de",text:"#cdd6f4",lavender:"#b4befe",blue:"#89b4fa",sapphire:"#74c7ec",sky:"#89dceb",teal:"#94e2d5",green:"#a6e3a1",yellow:"#f9e2af",peach:"#fab387",maroon:"#eba0ac",red:"#f38ba8",mauve:"#cba6f7",pink:"#f5c2e7",flamingo:"#f2cdcd",rosewater:"#f5e0dc"},Qn={base:1973806,mantle:1579045,crust:1118491,surface0:3224132,surface1:4540250,surface2:5790576,overlay0:7106694,overlay1:8357020,subtext0:10923464,subtext1:12239582,text:13489908,lavender:11845374,blue:9024762,sapphire:7653356,sky:9034987,teal:9757397,green:10937249,yellow:16376495,peach:16429959,maroon:15442092,red:15961e3,mauve:13346551,pink:16106215,flamingo:15912397,rosewater:16113884},Ym={design:"mauve",implement:"blue",verify:"green",default:"lavender"};function Go(r){return Bw[Ym[r]??Ym.default]}const Km=[Qn.mauve,Qn.blue,Qn.pink,Qn.teal,Qn.lavender,Qn.sapphire];function Hw(r){return[r>>16&255,r>>8&255,r&255].map(e=>e/255)}function Gw(){const r=Fe.useRef(null),[e,n]=Fe.useState(!1);return Fe.useEffect(()=>{const s=r.current;if(!s)return;const a=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let l=null,f=0,u=!1,h=!1;try{const m=new kg,v=new Zn(65,window.innerWidth/window.innerHeight,.1,1e3);v.position.z=60,l=new Df({canvas:s,antialias:!1,alpha:!0}),l.setSize(window.innerWidth,window.innerHeight),l.setPixelRatio(1),l.setClearColor(Qn.base,0);const y=60,x=new ti,S=new Float32Array(y*3),M=new Float32Array(y*3),E=new Float32Array(y),_=new Float32Array(y),g=new Float32Array(y);for(let he=0;he<y;he++){const C=(Math.random()-.5)*140,A=(Math.random()-.5)*90,re=(Math.random()-.5)*20;S[he*3]=C,S[he*3+1]=A,S[he*3+2]=re,_[he]=C,E[he]=A,g[he]=Math.random()*Math.PI*2;const ee=Km[Math.floor(Math.random()*Km.length)],[W,F,Y]=Hw(ee);M[he*3]=W,M[he*3+1]=F,M[he*3+2]=Y}x.setAttribute("position",new ei(S,3)),x.setAttribute("color",new ei(M,3));const L=new Bg({size:2.2,vertexColors:!0,transparent:!0,opacity:.58,sizeAttenuation:!0}),b=new zw(x,L);m.add(b);const D=new Hg,X=()=>{if(u)return;if(h||document.hidden){f=requestAnimationFrame(X);return}f=requestAnimationFrame(X);const he=D.getElapsedTime();if(!a){const C=x.getAttribute("position");for(let A=0;A<y;A++){const re=g[A],ee=E[A]+Math.sin(he*.3+re)*4,W=_[A]+Math.cos(he*.22+re*.7)*1.8;C.setXYZ(A,W,ee,S[A*3+2])}C.needsUpdate=!0,L.opacity=.48+Math.sin(he*.5)*.12}l.render(m,v)};X();const O=()=>{u||!l||(v.aspect=window.innerWidth/window.innerHeight,v.updateProjectionMatrix(),l.setSize(window.innerWidth,window.innerHeight))};window.addEventListener("resize",O);const k=()=>{document.hidden?h=!0:(h=!1,D.getDelta())};return document.addEventListener("visibilitychange",k),()=>{u=!0,cancelAnimationFrame(f),window.removeEventListener("resize",O),document.removeEventListener("visibilitychange",k);try{l==null||l.dispose()}catch{}try{x.dispose()}catch{}try{L.dispose()}catch{}}}catch{if(n(!0),l)try{l.dispose()}catch{}}return()=>{if(u=!0,f&&cancelAnimationFrame(f),l)try{l.dispose()}catch{}}},[]),e?U.jsx("div",{className:"fixed inset-0 -z-10 bg-gradient-to-br from-catppuccin-base via-catppuccin-mantle to-catppuccin-crust","aria-hidden":"true"}):U.jsx("canvas",{ref:r,"aria-hidden":"true",style:{position:"fixed",inset:0,width:"100%",height:"100%",zIndex:-1,pointerEvents:"none",display:"block"}})}const Zm=180,df=72,Pl=[Qn.mauve,Qn.blue,Qn.teal,Qn.pink];function Vw({nodes:r,edges:e,width:n,height:s,currentKey:a}){const l=Fe.useRef(null),[f,u]=Fe.useState(!1);return Fe.useEffect(()=>{const h=l.current;if(!h||r.length===0||e.length===0)return;const m=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let v=null,y=0,x=!1,S=!1;try{const M=new kg,E=s,_=n,g=new Lg(-_/2,_/2,E/2,-E/2,.1,100);g.position.set(n/2,s/2,10),g.lookAt(n/2,s/2,0),v=new Df({canvas:h,antialias:!0,alpha:!0}),v.setSize(n,s),v.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),v.setClearColor(0,0);const L=new Map;for(const A of r)L.set(A.key,A);const b=[],D=[],X=new Hl(3.2,8,8);for(let A=0;A<e.length;A++){const re=e[A];if(re.kind==="loop-back")continue;const ee=L.get(re.from),W=L.get(re.to);if(!ee||!W)continue;const F=ee.x+Zm,Y=ee.y+df/2,Q=W.x,ie=W.y+df/2,V=(F+Q)/2,z=[],j=12;for(let Te=0;Te<=j;Te++){const Ae=Te/j,ze=(1-Ae)**2*F+2*(1-Ae)*Ae*V+Ae**2*Q,Ve=(1-Ae)*Y+Ae*ie+Math.sin(Ae*Math.PI)*2;z.push(new ae(ze,Ve,ee.phaseIndex*.1))}const N=new ti().setFromPoints(z),$=Pl[A%Pl.length],Z=new zg({color:$,transparent:!0,opacity:.55}),de=new kw(N,Z);M.add(de),b.push(de);const me=new Bl({color:Pl[(A+1)%Pl.length],transparent:!0,opacity:.7}),Me=new Mi(X.clone(),me);Me.position.set(V,(Y+ie)/2,.6),Me._ph=Math.random()*Math.PI*2,M.add(Me),D.push(Me)}let O=null;if(a){const A=L.get(a);if(A){const re=new Hl(9,12,12),ee=new Bl({color:Qn.yellow,transparent:!0,opacity:.32});O=new Mi(re,ee),O.position.set(A.x+Zm/2,A.y+df/2,1),M.add(O)}}const k=new Hg,he=()=>{if(!x){if(S||document.hidden){y=requestAnimationFrame(he);return}if(y=requestAnimationFrame(he),!m){const A=k.getElapsedTime();for(let re=0;re<D.length;re++){const ee=D[re],W=ee._ph,F=ee.material;F.opacity=.5+Math.sin(A*1.2+W)*.25,ee.scale.setScalar(.9+Math.sin(A*.9+W)*.18)}for(let re=0;re<b.length;re++){const W=b[re].material;W.opacity=.35+Math.sin(A*.7+re)*.12}if(O){const re=1+Math.sin(A*2)*.15;O.scale.setScalar(re);const ee=O.material;ee.opacity=.26+Math.sin(A*1.6)*.08}}v.render(M,g)}};he();const C=()=>{S=document.hidden,S||k.getDelta()};return document.addEventListener("visibilitychange",C),()=>{x=!0,cancelAnimationFrame(y),document.removeEventListener("visibilitychange",C);try{v==null||v.dispose()}catch{}for(const A of b)try{A.geometry.dispose(),A.material.dispose()}catch{}for(const A of D)try{A.geometry.dispose(),A.material.dispose()}catch{}if(O)try{O.geometry.dispose(),O.material.dispose()}catch{}try{X.dispose()}catch{}}}catch{if(u(!0),v)try{v.dispose()}catch{}}return()=>{if(x=!0,y&&cancelAnimationFrame(y),v)try{v.dispose()}catch{}}},[r,e,n,s,a]),f||r.length===0||e.length===0?null:U.jsx("canvas",{ref:l,width:n,height:s,"aria-hidden":"true",style:{position:"absolute",left:0,top:0,width:n,height:s,pointerEvents:"none",display:"block"}})}const xr=180,yi=72;function Ww(r){switch(r){case"passed":return"#a6e3a1";case"running":return"#89b4fa";case"failed":return"#f38ba8";case"skipped":return"#6c7086";default:return"#6c7086"}}function jw({workflowSteps:r,stepStatuses:e,currentStepKey:n,selectedKey:s,onSelectKey:a}){const[l,f]=Fe.useState(1),[u,h]=Fe.useState({x:0,y:0}),[m,v]=Fe.useState(!1),y=Fe.useRef(null),x=Fe.useRef(null),S=Fe.useMemo(()=>r.map((W,F)=>({key:W.key,phase:W.phase,type:W.type,index:F,parentKey:W.parentKey??null})),[r]),{nodes:M,edges:E,width:_,height:g}=Fe.useMemo(()=>j_(S),[S]),L=Fe.useMemo(()=>{const W=new Map;for(const F of e??[])W.set(F.stepKey,F.status);return W},[e]),b=Fe.useMemo(()=>{const W=new Map;for(const F of e??[])F.maxIterations!=null&&W.set(F.stepKey,{iteration:F.loopIteration??1,maxIterations:F.maxIterations});return W},[e]),D=Fe.useMemo(()=>{const W=new Map;for(const F of M)W.set(F.key,F);return W},[M]),X=Fe.useMemo(()=>E.filter(W=>W.kind!=="loop-back"),[E]),O=Fe.useMemo(()=>E.filter(W=>W.kind==="loop-back"),[E]),k=Fe.useMemo(()=>{const W=new Map;for(const F of M){const Y=F.phase??"(none)";W.has(Y)||W.set(Y,F.phaseIndex)}return Array.from(W.entries()).sort((F,Y)=>F[1]-Y[1])},[M]),he=Fe.useCallback(W=>{if(W.ctrlKey||W.metaKey){W.preventDefault();const F=-W.deltaY*.0015;f(Y=>Math.min(2,Math.max(.35,Y+F)))}},[]),C=Fe.useCallback(W=>{W.target.closest("[data-node]")||(v(!0),y.current={x:W.clientX,y:W.clientY,panX:u.x,panY:u.y},W.target.setPointerCapture(W.pointerId))},[u.x,u.y]),A=Fe.useCallback(W=>{if(!m||!y.current)return;const F=W.clientX-y.current.x,Y=W.clientY-y.current.y;h({x:y.current.panX+F,y:y.current.panY+Y})},[m]),re=Fe.useCallback(()=>{v(!1),y.current=null},[]),ee=Fe.useCallback(()=>{if(!x.current)return;const W=x.current.getBoundingClientRect(),F=W.width/Math.max(_,1),Y=W.height/Math.max(g,1),Q=Math.min(1,Math.min(F,Y)*.92);f(Math.max(.35,Q)),h({x:0,y:0})},[_,g]);return r.length===0?U.jsxs("div",{className:"flex h-full flex-col items-center justify-center gap-2 p-6 text-sm text-catppuccin-subtext0",children:[U.jsx("div",{className:"text-catppuccin-overlay0",children:"ワークフロー定義がありません。ワークフローを選択してください。"}),U.jsx("div",{className:"text-xs text-catppuccin-overlay0",children:"左側の定義ブラウザからワークフロー → セッションを選択するとキャンバスに表示されます。"})]}):U.jsxs("div",{className:"flex h-full flex-col overflow-hidden bg-catppuccin-base",children:[U.jsxs("div",{className:"flex shrink-0 items-center gap-2 border-b border-catppuccin-surface0 bg-catppuccin-mantle px-3 py-2",children:[U.jsx("div",{className:"text-xs font-semibold tracking-widest text-catppuccin-subtext0",children:"DEFINITION CANVAS"}),U.jsxs("div",{className:"ml-auto flex items-center gap-1",children:[U.jsx("button",{onClick:()=>f(W=>Math.max(.35,W-.15)),className:"rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2",title:"Zoom out",children:"−"}),U.jsxs("span",{className:"min-w-[52px] text-center font-mono text-xs text-catppuccin-subtext0",children:[Math.round(l*100),"%"]}),U.jsx("button",{onClick:()=>f(W=>Math.min(2,W+.15)),className:"rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2",title:"Zoom in",children:"＋"}),U.jsx("button",{onClick:ee,className:"rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2",children:"Fit"}),U.jsx("button",{onClick:()=>{h({x:0,y:0}),f(1)},className:"rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2",children:"100%"})]})]}),k.length>0&&U.jsxs("div",{className:"flex shrink-0 flex-wrap items-center gap-2 border-b border-catppuccin-surface0 bg-catppuccin-base px-3 py-1.5",children:[k.map(([W,F])=>U.jsxs("span",{className:"inline-flex items-center gap-1 text-[11px]",children:[U.jsx("span",{className:"inline-block h-2 w-2 rounded-full",style:{background:Go(W)}}),U.jsx("span",{className:"text-catppuccin-subtext0",children:W}),U.jsxs("span",{className:"font-mono text-catppuccin-overlay0",children:["depth ",F]})]},W)),U.jsxs("span",{className:"inline-flex items-center gap-1 text-[11px] text-catppuccin-mauve",children:[U.jsx("span",{children:"↻ loop"}),U.jsx("span",{className:"text-catppuccin-overlay0",children:"破線=本体末尾から反復"})]}),U.jsx("span",{className:"ml-auto text-[11px] text-catppuccin-overlay0",children:"横=進行(→) 縦=並列 Phase=色/深度 Threeエッジあり"})]}),U.jsxs("div",{ref:x,className:Ut("relative flex-1 overflow-hidden",m?"cursor-grabbing":"cursor-grab"),onWheel:he,onPointerDown:C,onPointerMove:A,onPointerUp:re,onPointerLeave:re,style:{background:"radial-gradient(circle at 1px 1px, rgba(205,214,244,0.08) 1px, transparent 0)",backgroundSize:"22px 22px"},children:[U.jsxs("div",{className:"absolute left-0 top-0",style:{width:_,height:g,transform:`translate(${u.x}px, ${u.y}px) scale(${l})`,transformOrigin:"top left"},children:[U.jsxs("svg",{width:_,height:g,className:"absolute inset-0",style:{pointerEvents:"none"},children:[O.length>0&&U.jsx("defs",{children:U.jsx("marker",{id:"loop-back-arrow",viewBox:"0 0 10 10",refX:"9",refY:"5",markerWidth:"6",markerHeight:"6",orient:"auto-start-reverse",children:U.jsx("path",{d:"M 0 0 L 10 5 L 0 10 z",fill:"#cba6f7"})})}),X.map((W,F)=>{const Y=D.get(W.from),Q=D.get(W.to);if(!Y||!Q)return null;const ie=Y.x+xr,V=Y.y+yi/2,z=Q.x,j=Q.y+yi/2,N=(ie+z)/2,$=`M ${ie} ${V} C ${N} ${V}, ${N} ${j}, ${z} ${j}`,Z=Go(Q.phase??"");return U.jsx("path",{d:$,stroke:Z,strokeWidth:1.4,fill:"none",opacity:.45,strokeDasharray:(Y.phase===Q.phase,"0")},`${W.from}-${W.to}-${F}`)}),O.map((W,F)=>{const Y=D.get(W.from),Q=D.get(W.to);if(!Y||!Q)return null;const ie=Y.x+xr/2,V=Y.y+yi,z=Q.x+xr/2,j=Q.y+yi,N=26,$=`M ${ie} ${V} C ${ie} ${V+N}, ${z} ${j+N}, ${z} ${j}`;return U.jsx("path",{d:$,stroke:"#cba6f7",strokeWidth:1.4,strokeDasharray:"5 4",fill:"none",opacity:.8,markerEnd:"url(#loop-back-arrow)"},`loop-back-${W.from}-${W.to}-${F}`)})]}),U.jsx(Vw,{nodes:M,edges:E,width:_,height:g,currentKey:n}),M.map(W=>{const F=L.get(W.key)??"pending",Y=F_({status:F,stepKey:W.key},n),Q=s===W.key,ie=Y.isCurrent,V=W.type==="loop",z=b.get(W.key),j=Go(W.phase??""),N=Math.max(.9,1-W.phaseIndex*.06);return U.jsxs("button",{"data-node":!0,onClick:()=>a==null?void 0:a(W.key),className:Ut("absolute flex flex-col justify-between rounded-md border bg-catppuccin-surface0 p-2 text-left shadow-sm transition-shadow",Q?"ring-2 ring-catppuccin-yellow shadow-md":"hover:shadow-md",ie?"animate-pulse":""),style:{left:W.x,top:W.y,width:xr,height:yi,borderColor:Q?"#f9e2af":Y.borderColor,borderWidth:ie||Q?2:1,borderStyle:Y.isSkipped?"dashed":"solid",outline:V?"1px dashed #cba6f7":void 0,outlineOffset:V?"-4px":void 0,opacity:N,boxShadow:ie?`0 0 12px ${j}55, 0 2px 8px rgba(0,0,0,0.35)`:Q?"0 0 10px rgba(249,226,175,0.35)":void 0,zIndex:W.phaseIndex+(ie?10:0)+(Q?5:0)},children:[U.jsxs("div",{className:"flex items-center gap-1.5",children:[U.jsx("span",{className:"h-2 w-2 shrink-0 rounded-full",style:{background:j},title:W.phase??""}),U.jsx("span",{className:"truncate text-[11px] font-bold",style:{color:j},children:W.phase??"-"}),U.jsx("span",{className:Ut("ml-auto h-2 w-2 rounded-full",F==="running"?"animate-ping":""),style:{background:Ww(F)}})]}),U.jsx("div",{className:"truncate font-mono text-xs font-bold text-catppuccin-text",title:W.key,children:W.key}),U.jsxs("div",{className:"flex items-center gap-1 text-[10px]",children:[U.jsx("span",{className:Ut("rounded bg-catppuccin-surface1 px-1 py-0.5 font-mono",V?"text-catppuccin-mauve":"text-catppuccin-subtext0"),children:V?"↻ loop":W.type}),W.parentKey&&U.jsxs("span",{className:"truncate rounded bg-catppuccin-surface1 px-1 py-0.5 font-mono text-catppuccin-mauve",title:`loop 本体: ${W.parentKey}`,children:["↻ ",W.parentKey]}),U.jsx("span",{className:"ml-auto shrink-0 font-mono text-catppuccin-overlay0",children:z?`${z.iteration}/${z.maxIterations}`:F}),ie&&U.jsx("span",{className:"font-bold text-catppuccin-yellow",children:"●"})]})]},W.key)})]}),U.jsxs("div",{className:"absolute bottom-3 right-3 flex h-[96px] w-[148px] flex-col rounded border border-catppuccin-surface1 bg-catppuccin-mantle/90 p-1 shadow-lg backdrop-blur",children:[U.jsx("div",{className:"mb-1 text-[9px] font-semibold tracking-widest text-catppuccin-overlay0",children:"MINIMAP"}),U.jsx("div",{className:"relative flex-1 overflow-hidden rounded bg-catppuccin-base",children:U.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${_} ${g}`,preserveAspectRatio:"xMidYMid meet",children:[E.map((W,F)=>{const Y=D.get(W.from),Q=D.get(W.to);if(!Y||!Q)return null;const ie=W.kind==="loop-back",V=Y.x+(ie?xr/2:xr),z=Y.y+(ie?yi:yi/2),j=Q.x+(ie?xr/2:0),N=Q.y+(ie?yi:yi/2);return U.jsx("line",{x1:V,y1:z,x2:j,y2:N,stroke:ie?"#cba6f7":Go(Q.phase??""),strokeWidth:ie?1:1.2,strokeDasharray:ie?"3 2":void 0,opacity:ie?.9:.5},`mm-${F}`)}),M.map(W=>{const F=W.key===n,Y=W.key===s;return U.jsx("rect",{x:W.x,y:W.y,width:xr,height:yi,rx:4,fill:Y?"#f9e2af":F?"#89b4fa":Go(W.phase??""),opacity:Y||F?.95:.72,stroke:Y?"#f9e2af":F?"#89b4fa":"#313244",strokeWidth:Y||F?1.5:.6},`mm-n-${W.key}`)}),(()=>{if(!x.current)return null;const W=x.current.getBoundingClientRect(),F=-u.x/l,Y=-u.y/l,Q=W.width/l,ie=W.height/l;return U.jsx("rect",{x:F,y:Y,width:Q,height:ie,fill:"none",stroke:"#f9e2af",strokeWidth:1.2,opacity:.85,rx:2})})()]})}),U.jsxs("div",{className:"mt-0.5 text-center font-mono text-[9px] text-catppuccin-overlay0",children:[M.length," nodes · ",E.length," edges"]})]}),U.jsx("div",{className:"pointer-events-none absolute left-3 bottom-3 rounded bg-catppuccin-mantle/85 px-2 py-1 text-[10px] text-catppuccin-overlay0",children:"Drag: pan · Ctrl+Wheel: zoom · Click node: detail"})]})]})}function Ll(r,e){return r.length<=e?r:r.slice(0,e-1)+"…"}function Xw(r){return I_(r)}function qw(r){switch(r){case"passed":return"passed";case"running":return"running";case"failed":return"destructive";case"skipped":return"skipped";case"pending":return"pending";default:return"secondary"}}const $w=["task","human_gate","parallel","loop"];function Yw(r){return $w.includes(r)}function Kw(){const[r,e]=Fe.useState(null),[n,s]=Fe.useState(null),[a,l]=Fe.useState(null),[f,u]=Fe.useState(null),[h,m]=Fe.useState(""),[v,y]=Fe.useState(""),[x,S]=Fe.useState(null),[M,E]=Fe.useState(0),[_,g]=Fe.useState(!1),[L,b]=Fe.useState(!1),[D,X]=Fe.useState(null),[O,k]=Fe.useState(!1),[he,C]=Fe.useState([]),[A,re]=Fe.useState(null),[ee,W]=Fe.useState(!1),F=Fe.useRef(null);F.current=a;const Y=Fe.useRef(null),Q=Fe.useRef(0),ie=Fe.useCallback(async()=>{var ue;(ue=Y.current)==null||ue.abort();const B=new AbortController;Y.current=B;try{const K=new URLSearchParams;K.set("limit","200"),F.current&&K.set("focusId",F.current);const Re=await fetch(`/api/snapshot?${K.toString()}`,{signal:B.signal});if(!Re.ok)throw new Error(`HTTP ${Re.status}`);const we=await Re.json();e(we),s(null),Q.current=0,!F.current&&we.selectedSession?(l(we.selectedSession.id),E(0),g(!1),b(!1),!f&&we.selectedSession.workflowId&&u(we.selectedSession.workflowId)):F.current?!we.sessions.some(qe=>qe.id===F.current)&&we.selectedSession&&(l(we.selectedSession.id),E(0),g(!1),we.selectedSession.workflowId&&u(we.selectedSession.workflowId)):!we.selectedSession&&we.sessions.length>0&&(l(we.sessions[0].id),!f&&we.sessions[0]&&u(we.sessions[0].workflowId))}catch(K){if(K instanceof DOMException&&K.name==="AbortError")return;Q.current+=1,s(K instanceof Error?K.message:String(K))}},[f]),V=Fe.useCallback(async()=>{try{const B=await fetch("/api/workflows");if(!B.ok)return;const ue=await B.json();C(ue.workflows??[]),!f&&ue.workflows.length>0&&F.current}catch{}},[f]);Fe.useEffect(()=>{let B,ue=!1;const K=()=>{if(ue)return;const we=Q.current===0?1e3:Math.min(1e3*Math.pow(2,Q.current),1e4);B=window.setTimeout(async()=>{if(document.hidden){K();return}await ie(),K()},we)};ie(),K();const Re=()=>{document.hidden||(B&&window.clearTimeout(B),ie(),K())};return document.addEventListener("visibilitychange",Re),()=>{var we;ue=!0,B&&window.clearTimeout(B),document.removeEventListener("visibilitychange",Re),(we=Y.current)==null||we.abort()}},[ie]),Fe.useEffect(()=>{V();const B=window.setInterval(V,1e4);return()=>window.clearInterval(B)},[V]),Fe.useEffect(()=>{if(!f){re(null);return}let B=!1;return W(!0),fetch(`/api/workflows/${encodeURIComponent(f)}`).then(ue=>{if(!ue.ok)throw new Error(`HTTP ${ue.status}`);return ue.json()}).then(ue=>{B||re(ue)}).catch(()=>{B||re(null)}).finally(()=>{B||W(!1)}),()=>{B=!0}},[f]);const z=(()=>{if(r)return a?r.sessions.find(B=>B.id===a):r.selectedSession??void 0})(),j=(()=>{var ue;if(!z||!r)return(r==null?void 0:r.selectedSteps)??[];const B=r.stepsBySession[z.id];return B||(((ue=r.selectedSession)==null?void 0:ue.id)===z.id?r.selectedSteps:[])})(),N=(()=>{var ue;if(!z||!r)return(r==null?void 0:r.selectedArtifacts)??[];const B=r.artifactsBySession[z.id];return B||(((ue=r.selectedSession)==null?void 0:ue.id)===z.id?r.selectedArtifacts:[])})(),$=(()=>{var ue;if(!z||!r)return(r==null?void 0:r.selectedGateEvents)??[];const B=r.gateEventsBySession[z.id];return B||(((ue=r.selectedSession)==null?void 0:ue.id)===z.id?r.selectedGateEvents:[])})(),Z=(()=>{var ue;if(!z||!r)return(r==null?void 0:r.selectedAttempts)??[];const B=r.attemptsBySession[z.id];return B||(((ue=r.selectedSession)==null?void 0:ue.id)===z.id?r.selectedAttempts:[])})();Fe.useEffect(()=>{S(null),E(0),g(!1),X(null),b(!1)},[a,f]),Fe.useEffect(()=>{!x&&(z!=null&&z.currentStep)},[x,z==null?void 0:z.currentStep]);const de=(()=>{var K;const B=new Map;if(!r||!z)return B;const ue=(K=r.artifactExists)==null?void 0:K[z.id];if(ue){for(const[Re,we]of Object.entries(ue))B.set(Re,we);return B}return B})();function me(B){if(de.has(B.filePath))return de.get(B.filePath)}function Me(B,ue){return ue===void 0?`${B.artifactKey}: ${B.filePath} (判定中…)`:B_(B,ue)}const Te=Fe.useMemo(()=>{const B=new Map;if(!r)return B;for(const ue of r.sessions){const K=B.get(ue.workflowId);K?K.push(ue):B.set(ue.workflowId,[ue])}return B},[r]),Ae=Fe.useMemo(()=>{let B=he;if(h.trim()){const ue=h.trim().toLowerCase();B=B.filter(K=>K.id.toLowerCase().includes(ue)||(K.description??"").toLowerCase().includes(ue))}if(!h.trim()&&r){const ue=new Set(r.sessions.map(K=>K.workflowId));for(const K of ue)B.some(Re=>Re.id===K)||(B=[...B,{id:K,workflowPath:"",steps:[]}])}return B=[...B].sort((ue,K)=>ue.id.localeCompare(K.id)),B},[he,h,r]),ze=Fe.useMemo(()=>{if(ee)return[];const B=()=>{const K=new Map(j.map(Re=>[Re.id,Re.stepKey]));return j.map(Re=>({key:Re.stepKey,phase:Re.phase,type:Re.type,parentKey:Re.parentStepId!=null?K.get(Re.parentStepId)??null:null}))};if(A&&f===A.id)return A.steps.map(K=>({key:K.key,phase:K.phase,type:K.type,parentKey:K.parentKey??null}));if(f&&A&&A.id!==f)return[];if(z&&j.length>0&&(!f||z.workflowId===f))return B();if(A)return A.steps.map(K=>({key:K.key,phase:K.phase,type:K.type,parentKey:K.parentKey??null}));const ue=he.find(K=>K.id===f);return ue?ue.steps.map(K=>({key:K.key,phase:K.phase,type:K.type,parentKey:K.parentKey??null})):[]},[A,ee,f,z,j,he]),Ve=Fe.useMemo(()=>{if(j.length!==0&&!(z&&f&&z.workflowId!==f))return j.map(B=>({stepKey:B.stepKey,status:B.status,loopIteration:B.loopIteration,maxIterations:B.maxIterations}))},[j,z,f]),Pe=Fe.useMemo(()=>!x||!A||f!==A.id?null:A.steps.find(B=>B.key===x)??null,[x,A,f]),ne=Fe.useMemo(()=>{if(!x)return null;const B=j.find(K=>K.stepKey===x);if(!B||!Yw(B.type))return null;const ue=B.parentStepId!=null?j.find(K=>K.id===B.parentStepId):void 0;return{key:B.stepKey,phase:B.phase??"",type:B.type,parentKey:(ue==null?void 0:ue.stepKey)??null,maxRetries:B.maxRetries,maxIterations:B.maxIterations,onExhausted:B.onExhausted}},[x,j]),kt=(Pe==null?void 0:Pe.type)??(ne==null?void 0:ne.type)??null,Ce=Fe.useMemo(()=>x?j.find(B=>B.stepKey===x)??null:null,[x,j]),it=Fe.useMemo(()=>Ce?V_(Ce,j):null,[Ce,j]),We=Fe.useMemo(()=>Ce?Z.filter(B=>B.stepId===Ce.id):[],[Ce,Z]),xt=Fe.useMemo(()=>x?$.filter(B=>B.stepKey===x):[],[x,$]),je=Fe.useMemo(()=>{if(!x)return N;const B=N.filter(ue=>ue.stepKey===x);return B.length>0?B:[]},[x,N]);Fe.useEffect(()=>{M>=je.length&&je.length>0&&E(je.length-1),je.length===0&&E(0)},[je.length,M]),Fe.useEffect(()=>{je.length>Ii&&!L&&M>=Ii&&b(!0)},[M,je.length,L]);const P=je[M],T=P==null?void 0:P.filePath;if(Fe.useEffect(()=>{if(!_||!z||!T){X(null);return}const B=P;if(!B){X(null);return}const ue=new AbortController;k(!0);const K=new URLSearchParams;return K.set("filePath",B.filePath),K.set("sessionId",z.id),fetch(`/api/preview?${K.toString()}`,{signal:ue.signal}).then(Re=>Re.json()).then(Re=>{X(Re),k(!1)}).catch(Re=>{Re instanceof DOMException&&Re.name==="AbortError"||(X({ok:!1,reason:Re instanceof Error?Re.message:String(Re)}),k(!1))}),()=>ue.abort()},[_,M,z==null?void 0:z.id,T,P]),Fe.useEffect(()=>{E(0),g(!1),X(null),b(!1)},[a,x]),Fe.useEffect(()=>{const B=ue=>{var Qe,qe;if(!r||r.sessions.length===0)return;const K=r.sessions,Re=a?K.findIndex(Le=>Le.id===a):0;if(ue.key==="Tab")return;if(ue.key==="a"||ue.key==="A"){je.length>Ii&&b(Le=>!Le);return}if(ue.key==="r"||ue.key==="R"){ie(),V();return}if(ue.key==="Enter"){je.length>0&&g(Le=>!Le);return}const we=(qe=(Qe=ue.target)==null?void 0:Qe.tagName)==null?void 0:qe.toLowerCase();if(!(we==="input"||we==="textarea")){if(ue.key==="j"||ue.key==="ArrowDown"){ue.preventDefault();const Le=Math.min(Re+1,K.length-1);if(Le!==Re){const Je=K[Le].id;l(Je);const gt=K[Le];u(gt.workflowId)}}else if(ue.key==="k"||ue.key==="ArrowUp"){ue.preventDefault();const Le=Math.max(Re-1,0);if(Le!==Re){const Je=K[Le].id;l(Je);const gt=K[Le];u(gt.workflowId)}}}};return window.addEventListener("keydown",B),()=>window.removeEventListener("keydown",B)},[r,a,je.length,ie,V]),!r)return U.jsx("div",{className:"flex h-screen items-center justify-center bg-catppuccin-base text-catppuccin-text",children:U.jsx("div",{className:"text-sm text-catppuccin-subtext0",children:n?`Error: ${n}`:"Loading..."})});const oe=r.totalSessions,ye=fp(j),_e=z?hp(z.status):null,ge=je.length,Ye=ge>Ii&&!L,Ie=Ye?Ii:ge,Be=(()=>{if(!Ce){const ue=new Map;for(const K of j)ue.set(K.id,K.stepKey);return pp(Z,$,ue)}const B=new Map;return B.set(Ce.id,Ce.stepKey),pp(We,xt,B)})();return U.jsxs("div",{className:"relative flex h-screen bg-transparent text-catppuccin-text overflow-hidden",children:[U.jsx(Gw,{}),U.jsxs("div",{className:"flex w-[320px] shrink-0 flex-col border-r bg-catppuccin-mantle border-catppuccin-surface0",children:[U.jsxs("div",{className:"border-b border-catppuccin-surface0 px-3 py-2",children:[U.jsx("h2",{className:"text-xs font-semibold tracking-widest text-catppuccin-subtext0",children:"DEFINITION BROWSER"}),U.jsxs("div",{className:"mt-2 flex flex-col gap-1.5",children:[U.jsx("input",{value:h,onChange:B=>m(B.target.value),placeholder:"ワークフロー検索 (id/説明)",className:"w-full rounded border border-catppuccin-surface1 bg-catppuccin-base px-2 py-1 text-xs text-catppuccin-text placeholder:text-catppuccin-overlay0 focus:border-catppuccin-mauve focus:outline-none"}),U.jsx("input",{value:v,onChange:B=>y(B.target.value),placeholder:"セッション検索 (title/id)",className:"w-full rounded border border-catppuccin-surface1 bg-catppuccin-base px-2 py-1 text-xs text-catppuccin-text placeholder:text-catppuccin-overlay0 focus:border-catppuccin-mauve focus:outline-none"})]}),U.jsxs("div",{className:"mt-2 flex items-center gap-2 text-[10px] text-catppuccin-overlay0",children:[U.jsxs("span",{children:["workflows ",Ae.length]}),U.jsx("span",{children:"·"}),U.jsxs("span",{children:["sessions ",oe]}),(h||v)&&U.jsx("button",{onClick:()=>{m(""),y("")},className:"ml-auto rounded bg-catppuccin-surface1 px-1.5 py-0.5 text-catppuccin-text hover:bg-catppuccin-surface2",children:"clear"})]})]}),U.jsx("div",{className:"flex-1 overflow-auto",children:r.dbMissing&&Ae.length===0?U.jsxs("div",{className:"p-4 text-sm text-catppuccin-subtext0",children:[U.jsx("span",{children:"セッションがありません。`tado init --title` で作成してください"}),r.error&&U.jsx("div",{className:"mt-2 text-catppuccin-red",children:r.error}),n&&U.jsx("div",{className:"mt-2 text-catppuccin-red",children:n})]}):Ae.length===0?U.jsx("div",{className:"p-4 text-xs text-catppuccin-overlay0",children:"ワークフローが見つかりません。"}):U.jsx("div",{className:"flex flex-col",children:Ae.map(B=>{const ue=(Te.get(B.id)??[]).filter(we=>{if(!v.trim())return!0;const Qe=v.trim().toLowerCase();return(we.title??we.workflowId).toLowerCase().includes(Qe)||we.id.toLowerCase().includes(Qe)}),K=f===B.id,Re=ue.length>0;return U.jsxs("div",{className:Ut("border-b border-catppuccin-surface0/60",K?"bg-catppuccin-surface0/60":""),children:[U.jsxs("button",{onClick:()=>{u(B.id),S(null)},className:Ut("flex w-full items-center gap-2 px-3 py-2 text-left",K?"bg-catppuccin-surface0 text-catppuccin-text":"hover:bg-catppuccin-surface0/40 text-catppuccin-subtext1"),children:[U.jsx("span",{className:Ut("shrink-0 text-[10px]",K?"text-catppuccin-mauve":"text-catppuccin-overlay0"),children:K?"●":"○"}),U.jsx("span",{className:Ut("flex-1 truncate font-mono text-xs",K?"font-bold text-catppuccin-text":""),children:B.id}),U.jsx("span",{className:"shrink-0 rounded bg-catppuccin-surface1 px-1 py-0.5 font-mono text-[10px] text-catppuccin-subtext0",children:ue.length})]}),B.description&&U.jsx("div",{className:"px-6 pb-1 text-[11px] leading-tight text-catppuccin-overlay0",children:Ll(B.description,80)}),U.jsxs("div",{className:"px-2 pb-1 text-[10px] font-mono text-catppuccin-overlay0 truncate",children:[B.workflowPath||"(no path)"," · steps"," ",B.steps.length||((A==null?void 0:A.id)===B.id?A.steps.length:"?")]}),Re?U.jsx("div",{className:"ml-3 flex flex-col border-l border-catppuccin-surface1/60 pl-2",children:ue.map(we=>{const Qe=Xw(we),qe=fp(r.stepsBySession[we.id]??[]),Le=hp(we.status),Je=we.id===a;return U.jsxs("button",{onClick:()=>{l(we.id),u(we.workflowId)},className:Ut("flex w-full items-center gap-1.5 border-l-2 px-2 py-1.5 text-left text-xs",Je?"border-catppuccin-mauve bg-catppuccin-surface0 text-catppuccin-text":"border-transparent hover:bg-catppuccin-surface0/50 text-catppuccin-subtext1"),children:[U.jsx("span",{className:Ut("shrink-0",Je?"text-catppuccin-mauve":"text-transparent"),children:"▸"}),U.jsx("span",{className:"w-[72px] shrink-0 truncate font-mono text-[11px] text-catppuccin-subtext0",children:Ll(Qe,10)}),U.jsx("span",{className:"shrink-0 font-mono text-[11px] text-catppuccin-green",children:qe.text}),U.jsx("span",{className:"shrink-0 text-[11px]",style:{color:Le.color},children:Le.symbol}),U.jsx("span",{className:Ut("truncate text-[11px]",Je?"font-bold text-catppuccin-text":""),children:Ll(dp(we),16)})]},we.id)})}):U.jsx("div",{className:"ml-6 px-2 pb-2 text-[11px] italic text-catppuccin-overlay0",children:"セッションなし — ブラウズモード（定義のみ表示）"})]},B.id)})})}),U.jsx("div",{className:"border-t border-catppuccin-surface0 px-3 py-2 text-[10px] text-catppuccin-overlay0",children:"j/k: session   Enter: preview   a: expand   r: reload"})]}),U.jsxs("div",{className:"flex flex-1 flex-col overflow-hidden border-r border-catppuccin-surface0 bg-catppuccin-base",children:[U.jsx("div",{className:"shrink-0 border-b border-catppuccin-surface0 bg-catppuccin-mantle px-3 py-2",children:z?U.jsxs("div",{children:[U.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[U.jsx("h1",{className:"text-sm font-bold text-catppuccin-text",children:dp(z)}),U.jsxs("span",{className:"font-mono text-xs text-catppuccin-subtext0",children:["(",z.id.slice(0,8),")"]}),_e&&U.jsxs("span",{className:"inline-flex items-center gap-1 text-xs",style:{color:_e.color},children:[U.jsx("span",{children:_e.symbol}),U.jsx("span",{children:_e.label})]}),U.jsx(Hr,{variant:"secondary",className:"font-mono text-[11px]",children:ye.text}),U.jsxs("span",{className:"ml-auto text-[11px] text-catppuccin-overlay0",children:["current: ",z.currentStep??"-"]})]}),U.jsxs("div",{className:"mt-1 font-mono text-[11px] text-catppuccin-subtext0 truncate",children:[U.jsx("span",{className:"text-catppuccin-overlay1",children:"cwd:"})," ",(z.cwd??z.workflowPath.replace(/\/[^/]*$/,"")??"")||"(none)",U.jsx("span",{className:"ml-2 text-catppuccin-overlay1",children:"workflow:"})," ",z.workflowPath,ee&&U.jsx("span",{className:"ml-2 text-catppuccin-yellow",children:"loading def…"})]}),n&&U.jsx("div",{className:"mt-1 text-xs text-catppuccin-red",children:n})]}):f?U.jsxs("div",{children:[U.jsxs("div",{className:"flex items-center gap-2",children:[U.jsx("h1",{className:"text-sm font-bold text-catppuccin-text",children:f}),U.jsx(Hr,{variant:"secondary",className:"font-mono text-[11px]",children:"browsing"}),ee&&U.jsx("span",{className:"text-xs text-catppuccin-yellow",children:"loading…"}),A&&U.jsxs("span",{className:"text-xs text-catppuccin-subtext0",children:[A.steps.length," steps · ",A.workflowPath]})]}),U.jsx("div",{className:"font-mono text-[11px] text-catppuccin-overlay0",children:"定義ブラウズモード — セッションを選択すると進捗が重なります"})]}):U.jsx("div",{className:"text-xs text-catppuccin-subtext0",children:"ワークフローまたはセッションを選択してください。"})}),U.jsx("div",{className:"flex-1 overflow-hidden",children:U.jsx(jw,{workflowSteps:ze,stepStatuses:Ve,currentStepKey:(z==null?void 0:z.currentStep)??null,selectedKey:x,onSelectKey:S})})]}),U.jsxs("div",{className:"flex w-[360px] shrink-0 flex-col overflow-hidden bg-catppuccin-mantle",children:[U.jsxs("div",{className:"border-b border-catppuccin-surface0 px-3 py-2",children:[U.jsx("h2",{className:"text-xs font-semibold tracking-widest text-catppuccin-subtext0",children:"DETAIL — 三位一体"}),x?U.jsxs("div",{className:"mt-1 flex items-center gap-2",children:[U.jsx("span",{className:"font-mono text-xs font-bold text-catppuccin-text",children:x}),kt&&U.jsx(Hr,{variant:qw((Ce==null?void 0:Ce.status)??"pending"),className:"text-[11px]",children:(Ce==null?void 0:Ce.status)??kt}),U.jsx("button",{onClick:()=>S(null),className:"ml-auto rounded bg-catppuccin-surface1 px-1.5 py-0.5 text-[11px] text-catppuccin-text hover:bg-catppuccin-surface2",children:"clear"})]}):U.jsx("div",{className:"mt-1 text-xs text-catppuccin-overlay0",children:"キャンバスのノードを選択すると、上:定義 / 中:進捗 / 下:成果物 が表示されます。"})]}),U.jsx("div",{className:"flex-1 overflow-auto",children:x?U.jsxs("div",{className:"flex flex-col gap-3 p-3",children:[U.jsxs("div",{children:[U.jsx("h3",{className:"mb-1 text-xs font-bold tracking-wide text-catppuccin-lavender",children:"① 定義"}),Pe?U.jsxs(Xr,{className:"bg-catppuccin-surface0 p-2",children:[U.jsxs("div",{className:"flex flex-wrap gap-1.5 text-xs",children:[U.jsxs(Hr,{variant:"secondary",className:"font-mono text-[11px]",children:["phase: ",Pe.phase||"-"]}),U.jsx(Hr,{variant:Pe.type==="loop"?"secondary":"outline",className:Ut("font-mono text-[11px]",Pe.type==="loop"?"text-catppuccin-mauve":""),children:Pe.type==="loop"?"↻ type: loop":`type: ${Pe.type}`}),Pe.parentKey&&U.jsxs("span",{className:"rounded bg-catppuccin-surface1 px-1 py-0.5 font-mono text-[11px] text-catppuccin-mauve",children:["↻ loop: ",Pe.parentKey]}),Pe.type!=="loop"&&U.jsxs("span",{className:"font-mono text-[11px] text-catppuccin-overlay0",children:["maxRetries: ",String(Pe.maxRetries)]}),Pe.type!=="loop"&&Pe.hasCondition&&U.jsx("span",{className:"rounded bg-catppuccin-surface1 px-1 py-0.5 text-[11px]",children:"condition ✓"}),Pe.type!=="loop"&&Pe.hasBeforeStep&&U.jsx("span",{className:"rounded bg-catppuccin-surface1 px-1 py-0.5 text-[11px]",children:"beforeStep ✓"}),Pe.type!=="loop"&&Pe.hasAfterStep&&U.jsx("span",{className:"rounded bg-catppuccin-surface1 px-1 py-0.5 text-[11px]",children:"afterStep ✓"})]}),(Pe.type==="task"||Pe.type==="parallel")&&Pe.task&&U.jsxs("div",{className:"mt-2 rounded bg-catppuccin-base p-2 font-mono text-xs",children:[U.jsx("div",{className:"font-semibold text-catppuccin-subtext0",children:"task"}),U.jsxs("div",{children:["action: ",Ll(Pe.task.action,120)]}),Pe.task.subagentType&&U.jsxs("div",{children:["subagent: ",Pe.task.subagentType]}),Pe.task.readonly!=null&&U.jsxs("div",{children:["readonly: ",String(Pe.task.readonly)]})]}),Pe.type==="human_gate"&&U.jsxs("div",{className:"mt-2 rounded bg-catppuccin-base p-2 text-xs",children:[U.jsx("div",{className:"font-semibold text-catppuccin-subtext0",children:"humanGate"}),U.jsxs("div",{className:"font-mono",children:["present: ",Pe.humanGate.presentArtifacts.join(", ")||"-"]}),U.jsxs("div",{className:"font-mono",children:["outcomeKey: ",Pe.humanGate.outcomeQuestionKey]}),Pe.humanGate.reviseTargetStep&&U.jsxs("div",{className:"font-mono",children:["reviseTarget: ",Pe.humanGate.reviseTargetStep]}),U.jsxs("div",{className:"font-mono",children:["questions: ",Pe.humanGate.questions.length]})]}),Pe.type==="parallel"&&U.jsxs("div",{className:"mt-2 rounded bg-catppuccin-base p-2 text-xs",children:[U.jsx("div",{className:"font-semibold text-catppuccin-subtext0",children:"parallel"}),Pe.parallel.subtasks.map(B=>U.jsxs("div",{className:"font-mono",children:["- ",B.key," (",B.subagentType,") ",B.readonly?"[readonly]":""]},B.key))]}),Pe.type==="loop"&&U.jsxs("div",{className:"mt-2 rounded bg-catppuccin-base p-2 text-xs",children:[U.jsx("div",{className:"font-semibold text-catppuccin-mauve",children:"loop（本体を反復）"}),U.jsxs("div",{className:"font-mono",children:["maxIterations: ",Pe.maxIterations]}),U.jsxs("div",{className:"font-mono",children:["onExhausted: ",Pe.onExhausted]}),U.jsxs("div",{className:"font-mono",children:["body: ",Pe.bodyKeys.join(", ")||"-"]})]}),Pe.type!=="loop"&&U.jsxs("div",{className:"mt-1 font-mono text-[11px] text-catppuccin-overlay0",children:["onFail: ",JSON.stringify(Pe.onFail)]})]}):ne?U.jsxs(Xr,{className:"bg-catppuccin-surface0 p-2",children:[U.jsxs("div",{className:"flex flex-wrap gap-1.5 text-xs",children:[U.jsxs(Hr,{variant:"secondary",className:"font-mono text-[11px]",children:["phase: ",ne.phase||"-"]}),U.jsx(Hr,{variant:ne.type==="loop"?"secondary":"outline",className:Ut("font-mono text-[11px]",ne.type==="loop"?"text-catppuccin-mauve":""),children:ne.type==="loop"?"↻ type: loop":`type: ${ne.type}`}),ne.parentKey&&U.jsxs("span",{className:"rounded bg-catppuccin-surface1 px-1 py-0.5 font-mono text-[11px] text-catppuccin-mauve",children:["↻ loop: ",ne.parentKey]}),ne.type!=="loop"&&U.jsxs("span",{className:"font-mono text-[11px] text-catppuccin-overlay0",children:["maxRetries: ",String(ne.maxRetries)]})]}),ne.type==="loop"&&U.jsxs("div",{className:"mt-2 rounded bg-catppuccin-base p-2 text-xs",children:[U.jsxs("div",{className:"font-mono",children:["maxIterations: ",ne.maxIterations??"-"]}),U.jsxs("div",{className:"font-mono",children:["onExhausted: ",ne.onExhausted??"-"]})]}),U.jsx("div",{className:"mt-1 font-mono text-[11px] text-catppuccin-overlay0",children:"source: session snapshot（ワークフロー定義は未取得）"})]}):U.jsx("div",{className:"text-xs text-catppuccin-overlay0",children:"(no definition)"})]}),U.jsxs("div",{children:[U.jsx("h3",{className:"mb-1 text-xs font-bold tracking-wide text-catppuccin-lavender",children:"② 進捗"}),Ce?U.jsxs(Xr,{className:"bg-catppuccin-surface0 p-2",children:[U.jsxs("div",{className:"flex items-center gap-2 text-xs",children:[U.jsx("span",{className:"font-bold",style:{color:Ce.status==="passed"?"#a6e3a1":Ce.status==="failed"?"#f38ba8":Ce.status==="running"?"#89b4fa":"#6c7086"},children:Ce.status}),Ce.type==="loop"?U.jsxs("span",{className:"font-mono text-catppuccin-mauve",children:["↻"," ",mp(Ce.loopIteration,Ce.maxIterations)]}):U.jsxs("span",{className:"font-mono text-catppuccin-overlay0",children:["attempts ",Ce.retryCount,"/",String(Ce.maxRetries)]}),U.jsxs("span",{className:"ml-auto font-mono text-[11px] text-catppuccin-subtext0",children:["idx ",Ce.stepIndex]})]}),it&&Ce.type!=="loop"&&U.jsxs("div",{className:"mt-1 font-mono text-[11px] text-catppuccin-mauve",children:["↻ loop ",it.key,":"," ",mp(it.iteration,it.maxIterations)]}),We.length>0&&U.jsxs("div",{className:"mt-2",children:[U.jsxs("div",{className:"text-[11px] font-semibold text-catppuccin-subtext0",children:["attempts (",We.length,")"]}),U.jsx("div",{className:"flex flex-col gap-1 font-mono text-[11px]",children:We.map(B=>U.jsxs("div",{className:"truncate",children:[U.jsxs("span",{className:"text-catppuccin-text",children:[B.startedAt??""," #",B.attemptNumber," check:"]}),U.jsx("span",{className:Ut(B.checkStatus==="continue"?"text-catppuccin-mauve":B.checkStatus==="pass"?"text-catppuccin-green":B.checkStatus==="fail"||B.checkStatus==="error"?"text-catppuccin-red":"text-catppuccin-text"),children:B.checkStatus??"-"})]},B.id))})]}),xt.length>0&&U.jsxs("div",{className:"mt-2",children:[U.jsxs("div",{className:"text-[11px] font-semibold text-catppuccin-subtext0",children:["gateEvents (",xt.length,")"]}),U.jsx("div",{className:"flex flex-col gap-1 font-mono text-[11px]",children:xt.map(B=>U.jsxs("div",{className:"truncate text-catppuccin-yellow",children:[B.createdAt??""," ",B.event," ",B.choice??""]},B.id))})]}),U.jsxs("div",{className:"mt-2",children:[U.jsx("div",{className:"text-[11px] font-semibold text-catppuccin-subtext0",children:"history (filtered, latest 20)"}),Be.length===0?U.jsx("div",{className:"text-xs text-catppuccin-subtext0",children:"(no history)"}):U.jsx("div",{className:"flex flex-col gap-1 font-mono text-[11px]",children:Be.map((B,ue)=>U.jsx("div",{className:Ut("truncate",B.kind==="attempt"?"text-catppuccin-text":"text-catppuccin-yellow"),children:G_(B)},ue))})]})]}):U.jsx(Xr,{className:"bg-catppuccin-surface0 p-2",children:U.jsx("div",{className:"text-xs text-catppuccin-overlay0",children:"セッション未選択またはステップ進捗なし（定義のみブラウズ中）"})})]}),U.jsxs("div",{children:[U.jsxs("div",{className:"mb-1 flex flex-wrap items-center gap-2",children:[U.jsx("h3",{className:"text-xs font-bold tracking-wide text-catppuccin-lavender",children:"③ 成果物"}),U.jsxs("span",{className:"text-xs font-normal text-catppuccin-subtext0",children:["(",ge,")"]}),ge>0&&U.jsxs(U.Fragment,{children:[(()=>{let B=0,ue=0;for(const Re of je){const we=me(Re);we===!0?B++:we===void 0&&ue++}const K=ge-B-ue;return ue>0?U.jsxs("span",{className:"text-xs text-catppuccin-subtext0",children:["— 存在 ",B," / 欠損 ",K," / 判定中 ",ue]}):U.jsxs("span",{className:"text-xs text-catppuccin-subtext0",children:["— 存在 ",B," / 欠損 ",K]})})(),ge>Ii&&U.jsx("button",{onClick:()=>b(B=>!B),className:"rounded bg-catppuccin-surface1 px-2 py-0.5 text-xs text-catppuccin-text hover:bg-catppuccin-surface2",children:L?"a: collapse":`… 他${ge-Ii}件 (aで展開)`})]})]}),ge===0?U.jsx("div",{className:"text-xs text-catppuccin-subtext0",children:z?"(no artifacts for this step)":"(no session)"}):U.jsxs("div",{className:"flex flex-col gap-1",children:[je.slice(0,Ie).map((B,ue)=>{const K=me(B),Re=Me(B,K),we=ue===M;return U.jsxs("button",{onClick:()=>{E(ue)},onDoubleClick:()=>{E(ue),g(!0)},className:Ut("flex w-full items-center gap-2 rounded px-2 py-1 text-left font-mono text-xs",we?"bg-[#334433] font-bold":"hover:bg-catppuccin-surface0",we?"ring-1 ring-catppuccin-yellow":""),children:[U.jsx("span",{className:Ut("shrink-0",we?"text-catppuccin-yellow":"text-transparent"),children:"▸"}),U.jsx("span",{className:Ut("truncate",K===!0?"text-catppuccin-sky":K===!1?"text-catppuccin-red":"text-catppuccin-overlay0"),children:Re})]},`${B.artifactKey}-${ue}`)}),Ye&&U.jsx("div",{className:"px-2 py-1 font-mono text-xs text-catppuccin-overlay0",children:(()=>{const B=ge-Ii;let ue=0,K=0;for(let Re=Ii;Re<ge;Re++){const we=me(je[Re]);we===!1?ue++:we===void 0&&K++}return K>0?`… 他 ${B}件 (欠損 ${ue} / 判定中 ${K}) (aで展開)`:ue===B?`… 他 ${B}件は欠損 (aで展開)`:`… 他 ${B}件 (欠損 ${ue}) (aで展開)`})()}),_&&je[M]&&U.jsxs(Xr,{className:"mt-2 border-catppuccin-surface2 bg-catppuccin-mantle",children:[U.jsxs("div",{className:"border-b border-catppuccin-surface1 px-3 py-1 text-xs font-semibold text-catppuccin-subtext0",children:["Preview: ",je[M].artifactKey," ",U.jsx("span",{className:"font-mono font-normal text-catppuccin-overlay0",children:je[M].filePath})]}),U.jsx("div",{className:"max-h-[50vh] overflow-auto p-3 font-mono text-xs",children:O?U.jsx("div",{className:"text-catppuccin-subtext0",children:"loading..."}):D!=null&&D.ok?(()=>{const B=D.content??"";if(!B)return U.jsx("div",{className:"text-catppuccin-subtext0",children:"(empty file)"});const ue=B.split(`
`);return U.jsx("div",{className:"flex flex-col",children:ue.map((K,Re)=>U.jsx("div",{className:"whitespace-pre-wrap break-all text-catppuccin-text",children:K||" "},Re))})})():D?U.jsx("div",{className:"text-catppuccin-yellow",children:Ru(D.reason??"unknown")}):U.jsx("div",{className:"text-catppuccin-subtext0",children:"no preview"})}),U.jsx("div",{className:"border-t border-catppuccin-surface1 px-3 py-1 text-[10px] text-catppuccin-overlay0",children:"Enter: collapse"})]}),!_&&je[M]&&U.jsx("div",{className:"px-2 py-1 font-mono text-xs",children:(()=>{const B=je[M],ue=me(B);if(ue===!1)return U.jsx("span",{className:"text-catppuccin-red",children:Ru("file not found")});if(ue===void 0)return U.jsx("span",{className:"text-catppuccin-overlay0",children:"判定中…"});const K=z_(B.filePath);return K?U.jsx("span",{className:"text-catppuccin-yellow",children:Ru(K)}):U.jsxs("span",{className:"text-catppuccin-overlay0",children:["Press Enter to preview ",B.filePath]})})()}),je.length>0&&!_&&U.jsx("button",{onClick:()=>g(!0),className:"mt-1 rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2",children:"Preview"}),_&&U.jsx("button",{onClick:()=>g(!1),className:"mt-1 rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2",children:"Close preview"})]})]})]}):U.jsx("div",{className:"p-4 text-sm text-catppuccin-subtext0",children:z?U.jsxs("div",{className:"flex flex-col gap-2",children:[U.jsx("div",{className:"text-xs font-semibold text-catppuccin-lavender",children:"Session overview"}),U.jsxs(Xr,{className:"bg-catppuccin-surface0 p-2",children:[U.jsxs("div",{className:"font-mono text-xs",children:["id: ",z.id]}),U.jsxs("div",{className:"font-mono text-xs",children:["workflow: ",z.workflowId]}),U.jsxs("div",{className:"font-mono text-xs",children:["status: ",z.status]}),U.jsxs("div",{className:"font-mono text-xs",children:["currentStep: ",z.currentStep??"-"]}),U.jsxs("div",{className:"font-mono text-xs",children:["steps: ",j.length]})]}),U.jsx("div",{className:"text-xs text-catppuccin-overlay0",children:"ノードクリックで詳細を表示。右ペインは選択中ノードの三位一体表示です。"})]}):U.jsx("div",{children:"ノードを選択してください。"})})})]})]})}L_.createRoot(document.getElementById("root")).render(U.jsx(w_.StrictMode,{children:U.jsx(Kw,{})}));
